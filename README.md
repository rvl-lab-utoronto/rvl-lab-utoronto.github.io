# RVL Website

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

1. Install [node.js](https://nodejs.org/en/)

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

After setting up and initialization to GitHub pages, deploy the app using ```npm run deploy``` to update the website with any changes.

You can always test your changes before by running ```npm start```

# Configuration
* All assets are stored in `public/assets/`
* All data files are stored in `src/data/`
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
1. Open `src/data/blogs.js` in an editor
2. Add Blog object to the list (2 types)

### Creating a Document based on the Distill Template
* Create a new Distill Template HTML file to be used in the Blog posts
* Use the template below and create a `.html` file
* This HTML file should be located in `public/`. For example: `public/assets/blog-pages/blogPage0.html`.
* All HTML formatting is supported
* Read about the Distill Template and formatting tags: https://distill.pub/guide/

```
<!doctype html>
<meta charset="utf-8">
<script src="https://distill.pub/template.v1.js"></script>
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
<style>
  p, h1, h2, h3, h4, h5, dt-byline{ max-width: 900px !important; width:90% !important; margin-left:0 !important; margin-right:0 !important;}
  dt-article{max-width: 900px !important; width:90% !important; margin-left:auto !important; margin-right:auto !important;}
  img {width: 100% !important; max-width: 700px; margin-left:auto !important; margin-right:auto !important; background-color: bisque !important;}
  iframe {width: 80% !important; max-width: 560px; height:315px; margin-left:auto !important; margin-right:auto !important;}
  h1 {font-family: "Helvetica", "Arial", sans-serif !important; font-weight: 700 !important;}
  h2 {font-family: "Helvetica", "Arial", sans-serif !important; font-weight: 600 !important;}
  h3 {font-family: "Helvetica", "Arial", sans-serif !important; font-weight: 700 !important; font-size: 20px !important;}
  p {font-family: "Helvetica", "Arial", sans-serif !important; font-weight: 400 !important;}
  dt-banner {display: none !important;}
  .column{display:block; flex-direction: column; min-width: 150px; margin: 0px !important;}
  .article-data{margin:0px 2%; display: flex; flex-wrap: wrap; row-gap: 20px; column-gap: 20px;}
  .article-data h4{margin:0px !important;font-size: 12px;margin-bottom: 3px;text-transform: uppercase;}
  .article-data h3{margin:0px !important;margin: 3px 0px;font-size: 15px !important;font-weight: 300 !important;text-decoration: none !important;font-style: normal !important;}
  hr{width: 100%;height: 1px;background-color: var(--light-dark-accent-color);border: 0px solid #ffffff00;margin: 30px 0px !important;}
</style>

<dt-article>
  <h1>Continual Model-Based Reinforcement Learning with Hypernetworks</h1>
  <hr/>
  <div class="article-data">
    <div class="column">
      <h4>Authors</h4>
      <h3>Author 1</h3>
      <h3>Author 2</h3>
    </div>
    <div class="column">
      <h4>Affiliations</h4>
      <h3>Affiliation 1</h3>
    </div>
    <div class="column">
      <h4>Published</h4>
      <h3>January 25, 2020</h3>
    </div>
  </div>
  <hr/>
  <p>This is the first paragraph of the article.</p>
  <p>We can also cite <dt-cite key="gregor2015draw"></dt-cite> external publications.</p>
</dt-article>

<dt-appendix>
</dt-appendix>

<script type="text/bibliography">
  @article{gregor2015draw,
    title={DRAW: A recurrent neural network for image generation},
    author={Gregor, Karol and Danihelka, Ivo and Graves, Alex and Rezende, Danilo Jimenez and Wierstra, Daan},
    journal={arXivreprint arXiv:1502.04623},
    year={2015},
    url={https://arxiv.org/pdf/1502.04623.pdf}
  }
</script>
```

### Blog Object 1 - Distill Template HTML
* Link the created Distill Template clog write-up
* Create a blog entry in the list that links to this created HTML file
```
   {
    "title": "Blog Title To Distill HTML",
    "date": "August 20, 2021",
    "webLocation": "blogPage1",
    "asset": "assets/blog-pages/blogPage0.html",
    "description": "Some description.",
  },
```
| attribute | type | notes | example value  |
|---|---|---|---|
| title | string | The title to be shown in the list of Blog Pages | `"Blog Title To Distill HTML"` |
| date | string | No specific format | `"August 20, 2021"` |
| webLocation | string | The URL of that page (will be `exampleWebsite.com/blog/webLocation`) | `"blogPage1"` |
| asset | string | All locations should point to where assets are stored: `public/` | `"assets/blog-pages/blogPage0.html"`
| description | string (optional) | A description | `"Some description."`

### Blog Object 2 - External Link
* Create a blog entry in the list that links to another website
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

### Blog Object 3 - Readme File
* Create a blog entry in the list that links to a readme file
* Markdown supports inline code blocks, and code blocks
* Also supports math markup using katex: https://katex.org/docs/supported.html
```
{
  "title": "Blog Title To Readme",
  "date": "September 20, 2020",
  "webLocation": "blogPage2", 
  "asset": "assets/blog-pages/blogPage2.md",
  "articleData":{
    "title": "Blog Title",
    "date": "September 20, 2020",
    "authors":["Author 1", "Author 2"],
    "affiliations":["University of Toronto"],
  }
},
```
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
1. Open `src/data/joining.md` in an editor
2. Edit the markdown file to edit content

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
