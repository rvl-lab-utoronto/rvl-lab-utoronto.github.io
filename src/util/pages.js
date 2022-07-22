import Blog from "../pages/blog"
import Home from "../pages/home"
import Joining from "../pages/joining"
import Projects from "../pages/projects"
import Publications from "../pages/publications"
import Team from "../pages/team"

export const pages = {
  "main" : [
    {
      "title": "Home",
      "link": "/",
      "component" : <Home/>
    },
    {
      "title": "Blog",
      "link": "/blog",
      "component" : <Blog/>
    },
    {
      "title": "Publications",
      "link": "/publications",
      "component" : <Publications/>
    },
    {
      "title": "Team",
      "link": "/team",
      "component" : <Team/>
    },
    {
      "title": "Research",
      "link": "/research",
      "component" : <Projects/>
    },
    {
      "title": "Joining",
      "link": "/joining",
      "component" : <Joining/>
    },
    
  ],
  "hidden" : [
    
  ]
}