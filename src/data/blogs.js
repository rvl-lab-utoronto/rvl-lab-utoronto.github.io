/**
webLocation is the webpage link for e.g. "webLocation": "hypercrl" -> rvl.cs.toronto.edu/blog/hypercrl/
if asset is empty and a link is provided, it will redirect to an outside website

Examples: 
{
  "title": "Blog Entry",
  "date": "August 18, 2020",
  "webLocation": "hypercrl", 
  "asset": "assets/blog-pages/hypercrl.html",
},
{
  "title": "Test Entry To External Link",
  "date": "September 20, 2020",
  "link": "https://google.ca", 
}

**/


export const dataBlog = [
  {
    "title": "Learning to Search in Task and Motion Planning with Streams",
    "date": "September 14, 2021",
    "link": "https://rvl.cs.toronto.edu/learning-based-tamp/", 
  },
  // {
  //   "title": "Backwards Reachability Tutorial",
  //   "date": "September 1, 2020",
  //   "link": "https://rvl.cs.toronto.edu/backwards-reachability/",
  //   "description": "Using reachability analysis to compute safety guarantees for safety critical dynamic systems."
  // },
  {
    "title": "Continual Model-Based Reinforcement Learning with Hypernetworks",
    "date": "August 18, 2020",
    "webLocation": "hypercrl-md", 
    "asset": "assets/blog-pages/hypercrl.md",
    "articleData":{
      "title": "Continual Model-Based Reinforcement Learning with Hypernetworks",
      "date": "August 18, 2020",
      "authors":["Yizhou (Philip) Huang","Kevin Xie","Homanga Bharadhwaj","Florian Shkurti"],
      "affiliations":["University of Toronto"],
    },
  },
  //{
  //  "title": "Continual Model-Based Reinforcement Learning with Hypernetworks",
  //  "date": "August 18, 2020",
  //  "webLocation": "hypercrl-html", 
  //  "asset": "assets/blog-pages/hypercrl.html",
  //},
]
