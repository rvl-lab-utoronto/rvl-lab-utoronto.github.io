// The list of main pages: navbar order, browser/search-engine titles, and descriptions.
// Components are attached in src/util/pages.js. Keep this file plain JS (no imports, no JSX):
// scripts/generate-route-pages.mjs reads it at build time.

export const siteName = "Robot Vision and Learning Lab";
export const siteUrl = "https://rvl.cs.toronto.edu";

export const pageMeta = [
  {
    "link": "/",
    "title": "Home",
    "seoTitle": "Robot Vision and Learning Lab (RVL) | University of Toronto",
    "description": "The Robot Vision and Learning (RVL) lab at the University of Toronto, led by Prof. Florian Shkurti, develops methods that let robots perceive, reason, and act effectively and safely.",
  },
  {
    "link": "/publications",
    "title": "Publications",
    "seoTitle": "Publications",
    "description": "Papers from the Robot Vision and Learning lab at the University of Toronto: robot learning, planning, 3D perception, lab automation, and field robotics.",
  },
  {
    "link": "/team",
    "title": "Team",
    "seoTitle": "Team",
    "description": "Faculty, postdocs, graduate and undergraduate students, visitors, and alumni of the Robot Vision and Learning lab at the University of Toronto.",
  },
  {
    "link": "/research",
    "title": "Research",
    "seoTitle": "Research",
    "description": "Research areas of the Robot Vision and Learning lab: reasoning and learning for robotics, safe robot learning, 3D vision and generative models, lab automation, and field robotics.",
  },
  {
    "link": "/joining",
    "title": "Joining",
    "seoTitle": "Joining the lab",
    "description": "Information and FAQs for prospective postdocs, MSc and PhD students, undergraduates, and visiting students interested in the Robot Vision and Learning lab.",
  },
  {
    "link": "/blog",
    "title": "Blog",
    "seoTitle": "Blog",
    "description": "Blog posts from the Robot Vision and Learning lab at the University of Toronto.",
  },
];

export function formatTitle(title) {
  return title.includes(siteName) ? title : `${title} | ${siteName}`;
}

// Title and description for any route, including /blog/<webLocation> and /research/<webLocation>.
export function metaForPath(pathname, dataBlog, dataProjects) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const page = pageMeta.find((p) => p.link === path);
  if (page) {
    return { title: formatTitle(page.seoTitle), description: page.description };
  }
  const [, section, slug] = path.split("/");
  const items = section === "blog" ? dataBlog : section === "research" ? dataProjects : [];
  const item = items.find((i) => i.webLocation === slug && i.asset);
  if (item) {
    return {
      title: formatTitle(item.articleData?.title ?? item.title),
      description: item.description || `${item.title}. ${pageMeta[0].description}`,
    };
  }
  return { title: formatTitle(pageMeta[0].seoTitle), description: pageMeta[0].description };
}
