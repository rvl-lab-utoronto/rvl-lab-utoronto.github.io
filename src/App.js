import React from 'react'
import {Route, Redirect, Switch, BrowserRouter} from 'react-router-dom'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import ScrollToTop from "./components/scrollToTop"
import {pages} from "./util/pages"
import Error404 from './pages/error404'
import { Navbar, NavbarSpace } from './components/navbar'
import Footer from "./components/footer"
import { dataBlog } from './data/blogs'
import { BlogEntryPage } from './components/blogEntry'
import { dataProjects } from './data/projects'
import { ProjectEntryPage } from './components/projectEntry'

export default function App() {
  const navbarRef = React.useRef();

  React.useEffect(() => {
    handlePageChange(window.location.pathname);
  }, []);

  function handlePageChange(link){
    navbarRef.current?.handlePageChange(link);
  }
  
  return (
    <BrowserRouter>
      <Route render={({ location }) => {
        return(
        <div style={{position:"absolute",right:0, left:0, bottom:0, top:0}}>
          <ScrollToTop/>
          <Navbar ref={navbarRef}/>
          <TransitionGroup component="div" className="App">
            <CSSTransition timeout={300} classNames='page' key={location.pathname}> 
              <Switch location={location}>
                {[...pages["main"],...pages["hidden"]].map((item, index)=>{
                  return(<Route path={item.link} exact render={()=>{
                    handlePageChange(item.link); 
                    return (
                    <div style={{position:"absolute",right:0, left:0, bottom:0, top:0}}>
                      <div style={{minHeight: "calc(100vh - 162px)"}}>
                        {item.link!=="/blog"?<NavbarSpace/>:<div/>}
                        {item.component}
                      </div>
                      {item.link!=="/blog"?<Footer/>:<div/>}
                    </div>
                  )}} key={item.link}/>)
                })}
                {dataBlog.map((blog)=>{
                  if(blog.asset!==undefined && blog.asset!=="" && blog.webLocation!==undefined && blog.webLocation!==""){
                    return <Route path={"/blog/"+blog.webLocation} exact render={()=>{
                      handlePageChange("/blog"); 
                      let distill = blog.asset?.includes(".html")
                      return (
                      <div style={{position:"absolute",right:0, left:0, bottom:0, top:0}}>
                        <div style={{minHeight: "100vh"}}>
                          <BlogEntryPage articleData={blog.articleData} distill={distill} src={process.env.PUBLIC_URL+"/"+blog.asset}/>
                        </div>
                        {!distill?<Footer/>:<></>}

                      </div>
                    )}} key={blog.title}/>
                  } else {
                    return <Route key={"404"} path='/404' component={Error404} />
                  }
                })}
                {dataProjects.map((project)=>{
                  if(project.asset!==undefined && project.asset!=="" && project.webLocation!==undefined && project.webLocation!==""){
                    return <Route path={"/research/"+project.webLocation} exact render={()=>{
                      handlePageChange("/research"); 
                      return (
                      <div style={{position:"absolute",right:0, left:0, bottom:0, top:0}}>
                        <div style={{minHeight: "100vh",}}>
                          <ProjectEntryPage src={process.env.PUBLIC_URL+"/"+project.asset}/>
                        </div>
                        <Footer/>
                      </div>
                    )}} key={project.title}/>
                  } else {
                    return <Route key={"404"} path='/404' component={Error404} />
                  }
                })}
                <Route key={"404"} path='/404' component={Error404} />
                <Redirect from='*' to='/404' />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
      )}} />
    </BrowserRouter>
  );
}

