# RVL Website

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

1. Install [node.js](https://nodejs.org/en/) (version 22.11.0 as of Dec 2024)

2. Verify installation with
    ```shell
    $ npm
    ```

3. Install project dependencies with
    ```shell
    $ npm install
    ```

## Available Scripts

In the project directory, you can run:

```shell
$ npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## GitHub Pages

1. Add/edit ``homepage`` attribute in ```package.json```
    ```
    {
      "homepage":"http://{username}.github.io/{repo-name}",
      "name": "website name",
      "version": "0.1.0",
      ...
    }
    ```
2. Create a GitHub repository with the same name and initialize`
    ```shell
    $ git init
    ```
3. Add this as remote
    ```shell
    $ git remote add origin git@github.com:{username}/{repo-name}.git
    ```
4. Deploy with:
    ```shell
    $ npm run deploy
    ```

## Pushing Changes to GitHub Pages

The site deploys automatically: every push to the `source` branch runs `.github/workflows/deploy.yml`, which builds the site on GitHub's servers and publishes it to GitHub Pages. Progress and errors show up in the repository's Actions tab; a deploy usually takes a few minutes. The workflow can also be started by hand from the Actions tab ("Build and deploy site" → "Run workflow").

Pull requests into `source` run the same build without deploying, so a broken data file shows up as a failed check before it is merged.

This requires Settings → Pages → Build and deployment → Source to be set to "GitHub Actions". With that setting, `npm run deploy` (which pushes to the `gh-pages` branch) no longer changes the live site.

You can always test your changes before by running ```npm start```, or check the production build locally with ```npm run build``` followed by ```npx serve -s build```.

# Configuration
* All assets are stored in `public/assets/`
* All data files are stored in `src/data/`
* Files in `src/data/` must stay plain JavaScript: no JSX and no `import`s. Besides the app, they are read at build time by `scripts/generate-route-pages.mjs`, and `npm run build` / `npm run deploy` fail with an explanatory message if one of them can't be loaded. The same applies to `src/util/parsePublications.js`, which may only import npm packages.

## What the build produces
`npm run build` runs `scripts/generate-route-pages.mjs` afterwards (the `postbuild` script). It writes a separate `build/<route>/index.html` for every page, including each blog post and research page, so that GitHub Pages serves them with status 200 instead of 404. Each file has its own title, description, and canonical URL, plus a plain-HTML copy of the page's content that search engines and LLM agents can read without running JavaScript. React replaces it when the app loads. The script also writes `build/sitemap.xml` and `build/llms.txt`. Nothing needs to be done by hand: new publications, team members, news, blog posts, and research pages are picked up automatically. A publication whose BibTeX can't be parsed fails the build with a message naming the entry. On the live site it would simply be skipped.

## Pages
The main pages (navbar order, titles, and search-engine descriptions) are listed in `src/data/pageMeta.js`. To add a page, add an entry there and map its `link` to a component in `src/util/pages.js`.
## News Entries
1. Open `src/data/news.js` in an editor
2. Add News objects to the list

### News Object
```
  {
    "date":"2021-08-12",
    "content":"Lorem ipsum...",
  },
```
| attribute | type | notes | example value  |
|---|---|---|---|
| `date` | string | Date is of the form: year-month-day | `"2021-08-12"` |
| `content` | string | Content supports inline html | `"Lorem ipsum..."` |


## Slideshow Images
1. Open `src/data/slideshow.js` in an editor
2. Add image location to the list
```
  [
    "assets/slideshow/image0.png",
    "assets/slideshow/image2.png",
  ]
```

| exported variable | type | notes | example value  |
|---|---|---|---|
| dataSlideshow | list of string | All locations should point to where assets are stored: `public/` | `["assets/slideshow/husky_utm_2020.png"]` |

## Blog Pages
The RVL Blog supports 3 types of blog posts: a local .html file, a local .md markdown file or a link to an external post:

### Blog Page (type 1, PREFERRED): Creating a local `.html` file from a Quarto `.qmd` markdown file
* If you haven't done this already, install [Quarto](https://quarto.org/docs/get-started/) on your machine
* If you are working from VSCode, also install the [Quarto extension for VSCode](https://quarto.org/docs/tools/vscode.html)
* Create a new directory (let's call it `hypercrl`) for your blog page under `public/assets/blog-pages/`, for example `public/assets/blog-pages/hypercrl`  
* Create a `.qmd` markdown file in that directory, for example `public/assets/blog-pages/hypercrl/hypercrl.qmd`. This type of markdown supports math. See this [example html page](https://quarto-dev.github.io/quarto-gallery/page-layout/tufte.html) that resulted from [this .qmd file](https://raw.githubusercontent.com/quarto-dev/quarto-gallery/main/page-layout/tufte.qmd) 
* Compile the `.qmd` file into an `.html` file, either via the command line, or through the VSCode Quarto extension (see Preview Format here)
* This will create the `.html` file and related media files, found under `public/assets/blog-pages/hypercrl/hypercrl_files`
* You should commit the `.qmd` file, the `.html` file, and the `hypercrl_files` folder to the repository, both are necessary
* Now you can declare the generated `.html` file as a blog page in `src/data/blogs.js`. For example:

```
   {
    "title": "Continual Model-Based Reinforcement Learning with Hypernetworks",
    "date": "August 18, 2020",
    "webLocation": "blogpage", 
    "asset": "assets/blog-pages/hypercrl/hypercrl.html",
   },
```
* Your blog page will be accessible at `https://rvl.cs.toronto.edu/blog/blogpage`
   

| attribute | type | notes | example value  |
|---|---|---|---|
| title | string | The title to be shown in the list of Blog Pages | `"Continual Model-Based Reinforcement Learning with Hypernetworks"` |
| date | string | No specific format | `"August 18, 2020"` |
| webLocation | string | The URL of that page (will be `exampleWebsite.com/blog/webLocation`) | `"hypercrl"` |
| asset | string | All locations should point to where assets are stored: `public/` | `"assets/blog-pages/project_name/hypercrl.html"`
| description | string (optional) | A description | `"Some description."`

### Blog Page (type 2): Creating a local .md markdown file
* It's best to avoid using this option unless you really know what you're doing with CSS. The Quarto -> html option (type 1) looks much better than this one by default.
* If you decide to go ahead with this, then
* Create a new directory for your blog page under `public/assets/blog-pages/`, for example `public/assets/blog-pages/hypercrl`  
* Create a `.md` markdown file in that directory, for example `public/assets/blog-pages/hypercrl/hypercrl.md`. This markdown supports math markup using katex: https://katex.org/docs/supported.html
* You should commit the `.md` file to the repository
* Declare the generated `.md` file as a blog page in `src/data/blogs.js`. For example:

```
   {
    "title": "Continual Model-Based Reinforcement Learning with Hypernetworks",
    "date": "August 18, 2020",
    "webLocation": "blogpage", 
    "asset": "assets/blog-pages/hypercrl/hypercrl.md",
    "articleData":{
      "title": "Blog Title",
      "date": "September 20, 2020",
      "authors":["Author 1", "Author 2"],
      "affiliations":["University of Toronto"],
   },
```
* Your blog page will be accessible at `https://rvl.cs.toronto.edu/blog/blogpage`
  
| attribute | type | notes | example value  |
|---|---|---|---|
| title | string | The title to be shown in the list of Blog Pages | `"Test Entry To Readme Blog"` |
| date | string | No specific format | `"September 20, 2020"` |
| webLocation | string | The URL of that page (will be `exampleWebsite.com/blog/webLocation`) | `"blogPage2"` |
| asset | string | All locations should point to where assets are stored: `public/` | `"assets/blog-pages/blogPage2.md"`
| description | string (optional) | A description | `"Some description."`
| articleData | object (optional) | Metadata for the article | See below

#### Article Data Object
| attribute | type | notes | example value  |
|---|---|---|---|
| title | string (optional) | The title to be shown in the Blog Pages | `"Blog Title"` |
| date | string (optional) | No specific format | `"September 20, 2020"` |
| authors | list of string (optional) | Authors of the article | `["Author 1", "Author 2"]` |
| affiliations | list of string (optional) | Affiliations of the article | `["University of Toronto"]` |


### Blog Page (type 3): External Link
* Create a blog entry in `src/data/blogs.js` that links to another website
```
  {
    "title": "Blog Title To External Link",
    "date": "September 20, 2020",
    "link": "https://google.ca",
    "description": "Some description.",
  },
```
| attribute | type | notes | example value  |
|---|---|---|---|
| title | string | The title to be shown in the list of Blog Pages | `"Blog Title To External Link"` |
| date | string | No specific format | `"September 20, 2020"` |
| link | string | Should be a URL starting with `http` | `"https://google.ca"`
| description | string (optional) | A description | `"Some description."`


## Publication Entries
1. Open `src/data/publications.js` in an editor
2. Add publication object to the list

### Publication Object
```
  {
    "bibtex":`
      @InProceedings{id,
        author = "author",
        title = "title",
        booktitle = "booktitle",
        pages = "0--100",
        year = "2020",
        month = "October",
      }
    `,
    "pdf":"assets/pdf/iros2012_multirobot_env_monitoring.pdf",
    "code":"https://github.com"
    "video":"https://www.youtube.com",
    "project":"https://google.com",
    "tags":["tag1","tag2"],
    "thumbnail":"assets/publication-thumbnails/thumbnail.png",
    "description":"Lorem ipsum...",
  },
```
| attribute | type | notes | example value  |
|---|---|---|---|
| `bibtex` | string | The bibtex of the publication | `"@InProceeding{...}"` |
| `pdf` | string (optional) | A PDF location from `public/` assets. | `"assets/pdf/iros2012_multirobot_env_monitoring.pdf"` |
| `html` | string (optional) | A URL leading to a pdf | `"https://www.google.ca"` |
| `code` | string (optional) | Content supports inline html | `"https://github.com"` |
| `video` | string (optional) | A URL leading to a video | `"https://www.youtube.com"` |
| `project` | string (optional) | A URL leading to a project | `""https://google.com"` |
| `tags` | list of string | Tags used for tag searching | `["tag1","tag2"]` |
| `thumbnail` | string | A thumbnail image location from `public/` assets. | `"assets/publication-thumbnails/thumbnail.png"` |
| `description` | string | Unused as of now | `"Lorem ipsum..."` |

## Research Themes
1. Open `src/data/researchThemes.js` in an editor
2. Add research object to the list
### Research Object
```
  {
    "title": "Theme Title",
    "content": [
      "theme1",
      "theme2",
    ],
  },
```
| attribute | type | notes | example value  |
|---|---|---|---|
| `title` | string | The title of the grouping of research themes | `"Theme Title"` |
| `content` | list of string | The themes listed | `["theme1","theme2",]` |

## Team Members
1. Open `src/data/team.js` in an editor
2. Add team object to the list
### Team Member Object
```
  {
    "name":"Name",
    "image":"assets/team/name.jpg",
    "description":"Lorem ipsum...",
    "website":"http://www.google.ca",
    "email":"email@email.com",
    "twitter":"http://www.twitter.com",
    "linkedIn":"http://www.linkedin.com",
    "googleScholar":"http://www.google.ca",
  }
```
| attribute | type | notes | example value  |
|---|---|---|---|
| `name` | string | The name of the member | `"Name"` |
| `image` | string | The members image. All locations should point to where assets are stored: `public/` | `"assets/team/name.jpg"` |
| `description` | string (optional) | A description under the name | `"Lorem ipsum..."` |
| `website` | string (optional) | The team member's personal website | `"http://www.google.ca"` |
| `email` | string (optional) | The team member's email | `"email@email.com"` |
| `twitter` | string (optional) | The team member's Twitter | `"http://www.twitter.com"` |
| `linkedIn` | string (optional) | The team member's LinkedIn | `"http://www.linkedin.com"` |
| `googleScholar` | string (optional) | The team member's Google Scholar | `"http://www.google.ca"` |

## Project/Research Entries
1. Open `src/data/projects.js` in an editor
2. Add project object to the list (2 types)

### Creating a Markdown Document for a Project
* Create a new markdown (`.md`) file to be used for the project
* This markdown file should be located in `public/`. For example: `public/assets/project-assets/pages/test.md`.
* All markdown formatting is supported
* Markdown supports inline code blocks, and code blocks
* Also supports math markup using katex: https://katex.org/docs/supported.html

### Project Object 1 - Local Markdown
```
  {
    "title":"Project 1",
    "description":"a project with a background image",
    "image":"assets/project-assets/images/placeholder1.jpg",
    "asset":"assets/project-assets/pages/test.md",
    "webLocation":"project1",
  },
```
| attribute | type | notes | example value  |
|---|---|---|---|
| `title` | string | The title of the project | `"Project 1"` |
| `description` | string | The description of the project | `"a project with a background image"` |
| `image` | string | The thumbnail image. All locations should point to where assets are stored: `public/` | `"assets/project-assets/images/placeholder1.jpg"` |
| `asset` | string | The markdown of the page. All locations should point to where assets are stored: `public/` | `"assets/project-assets/pages/test.md"` |
| `webLocation` | string | The URL of that page (will be `exampleWebsite.com/projects/webLocation`) | `"project1"` |

### Project Object 2 - External Link
* Also supports just an image, title, and description - with no link
* `link` is optional
```
  {
    "title":"Project 2",
    "description":"a project that redirects to another website",
    "image":"assets/project-assets/images/placeholder2.jpg",
    "link":"https://google.ca",
  }
```
| attribute | type | notes | example value  |
|---|---|---|---|
| `title` | string | The title of the project | `"Project 2"` |
| `description` | string | The description of the project | `"a project that redirects to another website"` |
| `image` | string | The thumbnail image. All locations should point to where assets are stored: `public/` | `"assets/project-assets/images/placeholder2.jpg"` |
| `link` | string (optional) | A URL leading to a project | `"https://google.ca"` |

## Joining
1. Open `src/data/joining-faq.js` in an editor
2. Edit `joiningIntro` (markdown, inline HTML allowed) for the text at the top of the page, and the FAQ lists below it

## Homepage Welcome Text
1. Open `src/data/labIntro.js` in an editor
2. Edit `labIntroHtml` (supports inline HTML)

## Socials
1. Open `src/data/socials.js` in an editor
2. Add socials object to the list

### Socials Object
```
  {
    "link":"https://www.youtube.com/",
    "name":"YouTube",
    "icon":"assets/social-icons/youtube.png",
  },
```
| attribute | type | notes | example value  |
|---|---|---|---|
| `link` | string | A URL leading to that social | `"https://www.youtube.com/"` |
| `name` | string | The label of that social | `"YouTube"` |
| `icon` | string | The icon image. All locations should point to where assets are stored: `public/` | `"assets/social-icons/youtube.png"` |

## Copyright / Footer Note
1. Open `src/data/copyright.js` in an editor
2. Edit the string `copyrightMessage` as needed

## Converting Images to WebP
This project includes a WebP converter script `webp-converter.js` to optimize images for faster web loading. WebP is a modern image format providing smaller file sizes compared to JPEG and PNG formats.

The converter script is located at `public/assets/webp-converter.js` and uses the [sharp](https://github.com/lovell/sharp) node.js module to convert images. 

### Usage
1. Navigate to the assets directory:
   ```bash
   cd public/assets
   ```

2. Configure the script by editing `webp-converter.js`:
   - Set the `input folder` variable to specify where your source images are located
   - Set the `output folder` variable to specify where converted images should be saved

3. Run the converter:
   ```bash
   node webp-converter.js
   ```
   
It will automatically process all supported image format('.jpeg', '.jpg', '.png', and '.gif') in the specified input folder.

### Publication thumbnails
Thumbnails are displayed at 170x150, so large files only slow the Publications page down. Keep each one under ~500 KB. After adding a publication, run from the repository root:

```bash
node scripts/optimize-thumbnails.mjs
```

It resizes every referenced thumbnail over 500 KB to 340x300 WebP (animations stay animated), updates the path in `src/data/publications.js` when a `.gif`/`.png` becomes `.webp`, and skips files that are also used elsewhere. For long animations that are still over 1 MB, redo a single file with fewer frames and lower quality, e.g. `node scripts/optimize-thumbnails.mjs --quality 50 --frame-step 2 my-thumbnail.gif`. Use `--dry-run` to preview.
