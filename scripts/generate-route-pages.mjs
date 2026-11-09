// Runs after `npm run build` (the "postbuild" script). For every route it writes
// build/<route>/index.html with its own title, description, canonical URL, and a plain-HTML
// snapshot of the page content inside <div id="root">, so GitHub Pages answers with 200 instead
// of 404 and crawlers / LLM agents that don't run JavaScript can read the page. React's
// createRoot replaces the snapshot when the app loads. Also writes sitemap.xml and llms.txt.

import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const BUILD = path.join(ROOT, "build");
const PUBLIC = path.join(ROOT, "public");
const CACHE = path.join(ROOT, "node_modules/.cache/route-pages");

function fail(message) {
  console.error(`\ngenerate-route-pages: ${message}\n`);
  process.exit(1);
}

// src/ files are ES modules without a .mjs extension; copy them so Node can import them.
// Bare imports (e.g. bibtex-parse-js) still resolve from the project's node_modules.
async function loadSource(relativePath) {
  fs.mkdirSync(CACHE, { recursive: true });
  const target = path.join(CACHE, relativePath.replace(/[\\/]/g, "__").replace(/\.js$/, ".mjs"));
  fs.copyFileSync(path.join(ROOT, relativePath), target);
  try {
    return await import(`${target}?t=${Date.now()}`);
  } catch (error) {
    fail(
      `could not load ${relativePath}: ${error.message}\n` +
        `Files in src/data/ (and src/util/parsePublications.js) are read by this build script, ` +
        `so they must stay plain JavaScript: no JSX and no imports of other src/ files or assets.`
    );
  }
}

const { pageMeta, siteName, siteUrl, metaForPath } = await loadSource("src/data/pageMeta.js");
const { dataBlog } = await loadSource("src/data/blogs.js");
const { dataProjects } = await loadSource("src/data/projects.js");
const { dataPublications } = await loadSource("src/data/publications.js");
const { dataTeam } = await loadSource("src/data/team.js");
const { dataNews } = await loadSource("src/data/news.js");
const { dataResearchThemes, dataApplicationAreas } = await loadSource("src/data/researchThemes.js");
const { labIntroHtml } = await loadSource("src/data/labIntro.js");
const joining = await loadSource("src/data/joining-faq.js");
const { parsePublications } = await loadSource("src/util/parsePublications.js");

let publications;
try {
  publications = parsePublications(dataPublications, { strict: true });
} catch (error) {
  fail(`${error.message}\nFix this entry in src/data/publications.js.`);
}

// ---------------------------------------------------------------------------------------------
// HTML helpers

const escapeHtml = (text) =>
  String(text ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const decodeEntities = (text) =>
  text
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

const BLOCK_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "ul", "ol", "li", "figure", "figcaption",
  "pre", "blockquote", "table", "thead", "tbody", "tr", "th", "td", "hr", "br"];
const INLINE_TAGS = ["a", "img", "code", "em", "strong", "b", "i"];
const DROP_WITH_CONTENT = ["script", "style", "svg", "nav", "button", "noscript", "head", "template", "form", "select"];

// Resolves a URL from page content to an absolute site path (or leaves external URLs alone).
function resolveUrl(url, baseUrl) {
  url = decodeEntities(url.trim());
  if (/^(javascript|data|vbscript):/i.test(url)) return null;
  if (/^(https?:|mailto:|#)/i.test(url) || url.startsWith("//")) return url;
  const resolved = new URL(url, `https://site${baseUrl}`);
  return resolved.pathname + resolved.search + resolved.hash;
}

// Reduces arbitrary HTML to an allowlist of tags with only href/src/alt attributes.
function sanitizeHtml(html, { baseUrl = "/", allowedTags = [...BLOCK_TAGS, ...INLINE_TAGS] } = {}) {
  let out = html.replace(/<!--[\s\S]*?-->/g, "");
  for (const tag of DROP_WITH_CONTENT) {
    out = out.replace(new RegExp(`<${tag}\\b[\\s\\S]*?</${tag}>`, "gi"), " ");
  }
  return out.replace(/<(\/?)([a-zA-Z][a-zA-Z0-9-]*)([^>]*)>/g, (match, closing, rawName, rawAttrs) => {
    const name = rawName.toLowerCase();
    const attrs = {};
    for (const [, key, , dq, sq, bare] of rawAttrs.matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
      attrs[key.toLowerCase()] = dq ?? sq ?? bare;
    }
    if (name === "iframe" && !closing && attrs.src && allowedTags.includes("a")) {
      const src = resolveUrl(attrs.src, baseUrl);
      return src ? ` <a href="${escapeHtml(src)}">Embedded video</a> ` : " ";
    }
    if (!allowedTags.includes(name)) return BLOCK_TAGS.includes(name) || /^(div|section|article|header|footer|main|aside|span)$/.test(name) ? " " : "";
    if (closing) return `</${name}>`;
    let kept = "";
    for (const key of ["href", "src"]) {
      if (attrs[key] === undefined) continue;
      const url = resolveUrl(attrs[key], baseUrl);
      if (url) kept += ` ${key}="${escapeHtml(url)}"`;
    }
    if (attrs.alt !== undefined) kept += ` alt="${escapeHtml(decodeEntities(attrs.alt))}"`;
    if (name === "img") kept += ' loading="lazy" style="max-width:100%;height:auto"';
    return `<${name}${kept}>`;
  });
}

// For inline HTML in data files: keep links, reduce everything else to text.
const inlineHtml = (html) => sanitizeHtml(String(html ?? ""), { allowedTags: ["a"] }).replace(/\s+/g, " ").trim();

const htmlToText = (html) =>
  decodeEntities(sanitizeHtml(String(html ?? ""), { allowedTags: [] })).replace(/\s+/g, " ").trim();

function renderMarkdown(markdown, baseUrl) {
  const html = ReactDOMServer.renderToStaticMarkup(
    React.createElement(ReactMarkdown, { remarkPlugins: [remarkMath], rehypePlugins: [rehypeRaw] }, markdown)
  );
  return sanitizeHtml(html, { baseUrl });
}

const pagePath = (route) => (route === "/" ? "/" : `${route}/`);
const canonicalUrl = (route) => siteUrl + pagePath(route);

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const newsDate = (date) => {
  const [year, month] = String(date ?? "").split("-");
  return MONTHS[Number(month) - 1] ? `${MONTHS[Number(month) - 1]} ${year}` : "";
};

// ---------------------------------------------------------------------------------------------
// Page snapshots

function publicationLinks(publication) {
  const links = [];
  const pdf = publication.pdf ? resolveUrl(publication.pdf, "/") : publication.html;
  if (pdf) links.push(["pdf", pdf]);
  for (const key of ["code", "video", "project"]) {
    if (publication[key]) links.push([key, publication[key]]);
  }
  return links;
}

const presentationLabels = { oral: "Oral", spotlight: "Spotlight", cover: "Cover Article" };

function publicationVenue(publication, { withYear = false } = {}) {
  let venue = publication.booktitle || publication.journal;
  if (!venue) return venue;
  if (withYear && publication.year) venue += `, ${publication.year}`;
  const label = presentationLabels[(publication.presentation || "").toLowerCase()];
  return label ? `${venue} (${label})` : venue;
}

function publicationsSnapshot() {
  let html = '<h1 class="page-header">Publications</h1>';
  let previousYear = null;
  for (const publication of publications) {
    html += '<article class="publication-entry">';
    if (publication.year !== previousYear) {
      previousYear = publication.year;
      html += `<hr><h2>${escapeHtml(publication.year)}</h2>`;
    }
    html += `<h3>${escapeHtml(publication.title)}</h3><p>${escapeHtml(publication.author)}</p>`;
    const venue = publicationVenue(publication, { withYear: true });
    if (venue) html += `<p><span>${escapeHtml(venue)}</span></p>`;
    const links = publicationLinks(publication);
    if (links.length) {
      html += `<p>${links.map(([label, url]) => `[<a href="${escapeHtml(url)}">${label}</a>]`).join(" ")}</p>`;
    }
    html += "</article>";
  }
  return html;
}

function teamSnapshot() {
  let html = '<h1 class="page-header">Team</h1>';
  for (const [group, members] of Object.entries(dataTeam)) {
    html += `<section><h2 style="text-transform:capitalize">${escapeHtml(group)}</h2><ul>`;
    for (const member of members) {
      const name = member.website
        ? `<a href="${escapeHtml(member.website)}">${escapeHtml(member.name)}</a>`
        : escapeHtml(member.name);
      const description = member.description ? `: ${inlineHtml(member.description)}` : "";
      html += `<li><strong class="team-member-title">${name}</strong>${description}</li>`;
    }
    html += "</ul></section>";
  }
  return html;
}

function themeList(themes) {
  return `<ul>${themes
    .map((theme) => `<li><a href="${escapeHtml(pagePath(theme.web))}">${escapeHtml(theme.title.trim())}</a></li>`)
    .join("")}</ul>`;
}

function homeSnapshot() {
  let html = `<h1>${escapeHtml(siteName)}</h1>`;
  html += `<h2>Welcome</h2><p>${inlineHtml(labIntroHtml)}</p>`;
  html += `<h2>Research Themes</h2>${themeList(dataResearchThemes)}`;
  html += `<h2>Application Areas</h2>${themeList(dataApplicationAreas)}`;
  html += "<h2>News</h2><ul>";
  for (const item of dataNews.slice(0, 10)) {
    html += `<li><strong>${escapeHtml(newsDate(item.date))}</strong>: ${inlineHtml(item.content)}</li>`;
  }
  return html + "</ul>";
}

function projectHref(project) {
  if (project.link) return project.link;
  if (project.asset && project.webLocation) return pagePath(`/research/${project.webLocation}`);
  return null;
}

function researchSnapshot() {
  let html = '<h1 class="page-header">Research</h1><ul>';
  for (const project of dataProjects) {
    const href = projectHref(project);
    const title = href ? `<a href="${escapeHtml(href)}">${escapeHtml(project.title)}</a>` : escapeHtml(project.title);
    html += `<li><h3>${title}</h3>${project.description ? `<p>${inlineHtml(project.description)}</p>` : ""}</li>`;
  }
  return html + "</ul>";
}

function blogHref(blog) {
  if (blog.asset && blog.webLocation) return pagePath(`/blog/${blog.webLocation}`);
  return blog.link || null;
}

function blogSnapshot() {
  let html = '<h1 class="page-header">Blog</h1>';
  for (const blog of dataBlog) {
    const href = blogHref(blog);
    const title = href ? `<a href="${escapeHtml(href)}">${escapeHtml(blog.title)}</a>` : escapeHtml(blog.title);
    html += `<article><h2>${title}</h2>`;
    if (blog.date) html += `<p>${escapeHtml(blog.date)}</p>`;
    if (blog.description) html += `<p>${escapeHtml(blog.description)}</p>`;
    html += "<hr></article>";
  }
  return html;
}

function joiningSnapshot() {
  let html = renderMarkdown(joining.joiningIntro, "/");
  const sections = [
    ["FAQ for prospective postdocs", joining.postdocFAQ],
    ["FAQ for prospective MSc and PhD students", joining.gradFAQ],
    ["FAQ for prospective undergraduate students", joining.undergraduateFAQ],
    ["FAQ for prospective visiting students", joining.visitorFAQ],
  ];
  for (const [heading, faq] of sections) {
    html += `<h3>${heading}</h3>`;
    for (const qa of faq ?? []) {
      html += `<h4>${escapeHtml(qa.question)}</h4>${renderMarkdown(qa.answer, "/")}`;
    }
  }
  return html;
}

function readAsset(asset) {
  const file = path.join(PUBLIC, asset);
  if (!fs.existsSync(file)) fail(`asset not found: public/${asset}`);
  return fs.readFileSync(file, "utf8");
}

// Markdown assets use paths relative to public/ (e.g. "assets/..."), as the app does.
function articleSnapshot(item) {
  const assetUrl = `/${item.asset}`;
  let html = "";
  if (item.asset.endsWith(".md")) {
    if (item.articleData?.title) html += `<h1>${escapeHtml(item.articleData.title)}</h1>`;
    html += renderMarkdown(readAsset(item.asset), "/");
  } else {
    const source = readAsset(item.asset);
    const main =
      source.match(/<main\b[^>]*id="quarto-document-content"[^>]*>([\s\S]*?)<\/main>/i)?.[1] ??
      source.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ??
      source;
    html += sanitizeHtml(main, { baseUrl: assetUrl });
    html += `<p><a href="${escapeHtml(assetUrl)}">View the full interactive post</a></p>`;
  }
  return html;
}

// ---------------------------------------------------------------------------------------------
// Routes

const routes = new Map();
const addRoute = (route, render, width = "max-width") => {
  if (!routes.has(route)) routes.set(route, { render, width });
};

const mainSnapshots = {
  "/": homeSnapshot,
  "/publications": publicationsSnapshot,
  "/team": teamSnapshot,
  "/research": researchSnapshot,
  "/joining": joiningSnapshot,
  "/blog": blogSnapshot,
};
for (const page of pageMeta) {
  addRoute(page.link, mainSnapshots[page.link] ?? (() => `<h1>${escapeHtml(page.title)}</h1>`));
}
for (const blog of dataBlog) {
  if (blog.asset && blog.webLocation) addRoute(`/blog/${blog.webLocation}`, () => articleSnapshot(blog), "max-width-blog");
}
for (const project of dataProjects) {
  if (project.asset && project.webLocation) addRoute(`/research/${project.webLocation}`, () => articleSnapshot(project), "max-width-blog");
}

function navSnapshot() {
  const links = pageMeta
    .map((page) => `<a href="${escapeHtml(pagePath(page.link))}" style="margin-right:18px">${escapeHtml(page.title)}</a>`)
    .join("");
  return `<nav class="horizontal-padding" style="padding-top:20px;padding-bottom:10px">${links}</nav>`;
}

function setHead(html, route) {
  const { title, description } = metaForPath(route, dataBlog, dataProjects);
  const tags =
    `<link rel="canonical" href="${escapeHtml(canonicalUrl(route))}">` +
    `<meta property="og:type" content="website">` +
    `<meta property="og:site_name" content="${escapeHtml(siteName)}">` +
    `<meta property="og:title" content="${escapeHtml(title)}">` +
    `<meta property="og:description" content="${escapeHtml(description)}">` +
    `<meta property="og:url" content="${escapeHtml(canonicalUrl(route))}">`;
  let out = html.replace(/<title>[\s\S]*?<\/title>/i, () => `<title>${escapeHtml(title)}</title>`);
  out = out.replace(/<meta\s+name="description"[^>]*>/i, () => `<meta name="description" content="${escapeHtml(description)}">`);
  return out.replace("</head>", () => `${tags}</head>`);
}

const templatePath = path.join(BUILD, "index.html");
if (!fs.existsSync(templatePath)) fail("build/index.html not found; run `npm run build` first.");
const template = fs.readFileSync(templatePath, "utf8");
if (!template.includes('<div id="root"></div>')) {
  fail('build/index.html has no empty <div id="root"></div>. Was this script already run on this build?');
}

for (const [route, { render, width }] of routes) {
  let content;
  try {
    content = render();
  } catch (error) {
    fail(`failed to render the snapshot for ${route}: ${error.stack ?? error}`);
  }
  const snapshot =
    `<div id="root">${navSnapshot()}` +
    `<main class="center"><div class="horizontal-padding ${width}">${content}</div></main></div>`;
  const html = setHead(template, route).replace('<div id="root"></div>', () => snapshot);
  const outFile = route === "/" ? templatePath : path.join(BUILD, route.slice(1), "index.html");
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
}

// ---------------------------------------------------------------------------------------------
// sitemap.xml and llms.txt

const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  [...routes.keys()].map((route) => `  <url><loc>${escapeHtml(canonicalUrl(route))}</loc></url>`).join("\n") +
  "\n</urlset>\n";
fs.writeFileSync(path.join(BUILD, "sitemap.xml"), sitemap);

const md = (text) => String(text ?? "").replace(/\s+/g, " ").replace(/([[\]])/g, "\\$1").trim();
const absolute = (url) => (/^https?:/i.test(url) ? url : siteUrl + (url.startsWith("/") ? url : `/${url}`));

const llms = [];
llms.push(`# ${siteName} (RVL), University of Toronto`, "");
llms.push(`> ${htmlToText(labIntroHtml)}`, "");
llms.push("## Pages", "");
for (const page of pageMeta) llms.push(`- [${md(page.title)}](${canonicalUrl(page.link)}): ${md(page.description)}`);
llms.push("", "## Research areas", "");
for (const project of dataProjects) {
  const href = projectHref(project);
  const description = project.description ? `: ${md(htmlToText(project.description))}` : "";
  llms.push(href ? `- [${md(project.title)}](${absolute(href)})${description}` : `- ${md(project.title)}${description}`);
}
llms.push("", "## People", "");
for (const [group, members] of Object.entries(dataTeam)) {
  if (group.toLowerCase().startsWith("alumni")) continue;
  llms.push(`### ${group.charAt(0).toUpperCase()}${group.slice(1)}`, "");
  for (const member of members) {
    const name = member.website ? `[${md(member.name)}](${member.website})` : md(member.name);
    const description = member.description ? `: ${md(htmlToText(member.description))}` : "";
    llms.push(`- ${name}${description}`);
  }
  llms.push("");
}
llms.push(`Alumni are listed on the [team page](${canonicalUrl("/team")}).`, "");
llms.push("## Publications", "");
for (const publication of publications) {
  const link = publicationLinks(publication).find(([label]) => label === "pdf" || label === "project")?.[1];
  const title = link ? `[${md(publication.title)}](${absolute(link)})` : md(publication.title);
  const venue = publicationVenue(publication);
  llms.push(`- ${title}: ${md(publication.author)}.${venue ? ` ${md(venue)},` : ""} ${md(publication.year)}.`);
}
llms.push("", "## Blog", "");
for (const blog of dataBlog.filter((b, i, all) => all.findIndex((o) => o.title === b.title) === i)) {
  const href = blogHref(blog);
  const title = href ? `[${md(blog.title)}](${absolute(href)})` : md(blog.title);
  llms.push(`- ${title}${blog.date ? ` (${md(blog.date)})` : ""}${blog.description ? `: ${md(blog.description)}` : ""}`);
}
fs.writeFileSync(path.join(BUILD, "llms.txt"), llms.join("\n") + "\n");

console.log(`generate-route-pages: wrote ${routes.size} pages, sitemap.xml, and llms.txt`);
