import React from 'react';
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ScrollToTop from "./components/scrollToTop";
import { pages } from "./util/pages";
import Error404 from './pages/error404';
import { Navbar, NavbarSpace } from './components/navbar';
import Footer from "./components/footer";
import { dataBlog } from './data/blogs';
import { BlogEntryPage } from './components/blogEntry';
import { dataProjects } from './data/projects';
import { ProjectEntryPage } from './components/projectEntry';

function App() {
  const navbarRef = React.useRef();
  const location = useLocation();

  // 1. Ref for <CSSTransition> to avoid findDOMNode
  const nodeRef = React.useRef(null);
  const validRoutes = ['/', '/blog', '/research'];

  React.useEffect(() => {
    handlePageChange(location.pathname);
  }, [location]);

  function handlePageChange(link) {
    navbarRef.current?.handlePageChange(link);
  }

  return (
    <div style={{ position: "absolute", right: 0, left: 0, bottom: 0, top: 0 }}>
      <ScrollToTop />
      <Navbar ref={navbarRef} />
      <TransitionGroup component="div" className="App">
        <CSSTransition timeout={300} classNames="page" key={location.pathname} nodeRef={nodeRef}>
          <div ref={nodeRef} style={{ position: "relative", width: "100%", height: "100%" }}>

          <Routes location={location}>
            {[...pages["main"], ...pages["hidden"]].map((item) => (
              <Route
                path={item.link}
                key={item.link}
                element={
                  <div style={{ position: "absolute", right: 0, left: 0, bottom: 0, top: 0 }}>
                    <div style={{ minHeight: "calc(100vh - 162px)" }}>
                      {item.link !== "/blog" ? <NavbarSpace /> : <div />}
                      {item.component}
                    </div>
                    {item.link !== "/blog" ? <Footer /> : <div />}
                  </div>
                }
              />
            ))}

            {dataBlog.map((blog, index) => {
              if (blog.asset && blog.webLocation) {
                const distill = blog.asset.includes(".html");
                return (
                  <Route
                    path={`/blog/${blog.webLocation}`}
                    key={blog.title}
                    element={
                      <div style={{ position: "absolute", right: 0, left: 0, bottom: 0, top: 0 }}>
                        <div style={{ minHeight: "100vh" }}>
                          <BlogEntryPage
                            key={index}
                            articleData={blog.articleData}
                            distill={distill}
                            src={`${process.env.PUBLIC_URL}/${blog.asset}`}
                          />
                        </div>
                        {!distill && <Footer />}
                      </div>
                    }
                  />
                );
              }
              //return null;
            })}
            
            
            {dataProjects.map((project, index) => {
              if (project.asset && project.webLocation) {
                return (
                  <Route
                    path={`/research/${project.webLocation}`}
                    key={project.title}
                    element={
                      <div style={{ position: "absolute", right: 0, left: 0, bottom: 0, top: 0 }}>
                        <div style={{ minHeight: "100vh" }}>
                          <ProjectEntryPage src={`${process.env.PUBLIC_URL}/${project.asset}`} />
                        </div>
                        <Footer />
                      </div>
                    }
                  />
                );
              }
              //return null;
            })}
            
        
             {!location.pathname.includes("404.html") && !location.pathname.includes("/?/") && !validRoutes.includes(location.pathname) && (
  <Route path="*" element={<Error404 />} />
            )}

            {location.pathname.includes("404.html") && (
                <Route path="*" 
                       element={
                              <div class="container404">
                                  <p></p>  
                                  <p></p>  
                                  <h1>Error 404</h1>
                                  <p>Oops! The page you're looking for doesn't exist.</p>
                                  <p><a href="/">Go back to the homepage</a></p>
                              </div>
                              }
                  />
            )}


          </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
