import React,{Component} from 'react'
import './projectEntry.css';
import {Link} from "react-router-dom";
import { BlogEntryPage } from './blogEntry';

export default class ProjectEntry extends Component {
  render(){
    let children = <div className="project-box">
      <img alt={this.props.project.name} className="project-image" src={process.env.PUBLIC_URL+"/"+this.props.project.image}/>
      <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
        <div className="project-box-content">
          <h2 style={{margin:0}}>{this.props.project.title}</h2>
          {this.props.project.description!==undefined&&this.props.project.description!==""?<p dangerouslySetInnerHTML={{__html: this.props.project.description}}/>:<></>}
        </div>
      </div>
    </div>
    if(this.props.project.link!==undefined && this.props.project.link!==""){
      return <a href={this.props.project.link} className="no-decoration">{children}</a>
    } else if (this.props.project.asset!==undefined && this.props.project.asset!=="" && this.props.project.webLocation!==undefined && this.props.project.webLocation!==""){
      return <Link className="no-decoration" to={"/research/"+this.props.project.webLocation}>
        {children}
      </Link>
    } else {
      return <div className="no-hover">{children}</div>
    }
  }
}

export class ProjectEntryPage extends Component {
  render(){
   return <BlogEntryPage src={this.props.src} removeExtraSpace/>
  }
}
