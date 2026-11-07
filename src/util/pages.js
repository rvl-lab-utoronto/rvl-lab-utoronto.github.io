import Blog from "../pages/blog"
import Home from "../pages/home"
import Joining from "../pages/joining"
import Projects from "../pages/projects"
import Publications from "../pages/publications"
import Team from "../pages/team"
import { pageMeta } from "../data/pageMeta"

// Add new pages to src/data/pageMeta.js, then map their link to a component here.
const components = {
  "/": <Home/>,
  "/publications": <Publications/>,
  "/team": <Team/>,
  "/research": <Projects/>,
  "/joining": <Joining/>,
  "/blog": <Blog/>,
}

for (const page of pageMeta) {
  if (!components[page.link] && process.env.NODE_ENV !== "production") {
    console.error(`src/util/pages.js: no component for "${page.link}" from src/data/pageMeta.js`)
  }
}

export const pages = {
  "main" : pageMeta
    .filter((page) => components[page.link])
    .map((page) => ({ ...page, "component": components[page.link] })),
  "hidden" : [

  ]
}
