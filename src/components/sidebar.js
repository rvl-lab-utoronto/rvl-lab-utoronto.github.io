import React,{Component} from 'react'
import './sidebar.css';
import {pages} from "../util/pages"
import {Link} from "react-router-dom";

export class Sidebar extends Component {
  constructor() {
    super();
    this.sidebarPages = pages;
    this.sidebarPagesTotal = [...this.sidebarPages["main"]]
    this.state = {open: false, currentLink: "", currentName: ""}
    this.firstOpen = true;
  }
  handlePageChange = (currentLink) => {
    let currentPage = this.getCurrentPageName(currentLink);
    this.setState({currentLink:currentLink, currentName: currentPage["title"]})
  }
  getCurrentPageName = (currentLink) => {
    let keys = Object.keys(pages)
    for(let i = 0; i < keys.length; i++){
      for(let j = 0; j < pages[keys[i]].length; j++){
        if(currentLink===pages[keys[i]][j]["link"]){
          return({"title":pages[keys[i]][j]["title"],"category":keys[i]});
        }
      }
    }
    return({"title":"","category":""});
  }
  render(){
    return(
      <div className="sidebar">
        <div className="sidebar-flex">
        <Link to="/"><img alt="RVL" style={{height:"50px", padding:"10px"}} src={require("../assets/RVL-icon.png").default}/></Link>
        <div style={{height:"50px"}}/>
        {
          this.sidebarPagesTotal.map((item,index)=>{
            return <SidebarLink selected={this.state.currentLink===item.link} title={item.title} link={item.link}/>
          })
        }
        </div>
      </div>
    )
  }
}

class SidebarLink extends Component {
  render(){
    return(
      <Link to={this.props.link} className={"sidebar-width sidebar-link-text " + (this.props.selected?"sidebar-link-text-selected":"")}>{this.props.title}</Link>
    )
  }
}

export class SidebarSpace extends Component {
  render(){
    return <>
      <div className={"sidebar-space-right"}>{this.props.children}</div>
    </>
  }
}