import React,{Component} from 'react'
import {dataProjects} from "../data/projects"
import ProjectEntry from '../components/projectEntry';
import Masonry from 'react-masonry-css'

const breakpointColumnsObj = {
  default: 3,
  985: 2,
  600: 1,
};

export default class Projects extends Component {
  render(){
    return(<div className="center">
      <div className="horizontal-padding max-width">
        <div style={{height:"10px"}}/>
        <Masonry breakpointCols={breakpointColumnsObj} className="masonry-grid">
          {dataProjects.map((project)=>{
            return <ProjectEntry project={project}/>
          })}
        </Masonry>
      </div>
    </div>)
  }
}