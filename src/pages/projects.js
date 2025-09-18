import React,{Component} from 'react'
import {dataProjects} from "../data/projects"
import ProjectEntry from '../components/projectEntry';

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
        <div className="custom-grid">
          {dataProjects.map((project, index)=>{
            return <ProjectEntry key={index} project={project}/>
          })}
        </div>
      </div>
    </div>)
  }
}