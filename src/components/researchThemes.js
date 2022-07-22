import React,{Component} from 'react'
import './researchThemes.css';
import {dataResearchThemes} from "../data/researchThemes.js"
// import ReactWordcloud from 'react-wordcloud';
// import BubbleUI from "react-bubble-ui";
// import "react-bubble-ui/dist/index.css";

export default class ResearchThemes extends Component {
  render(){
    return(
      <>
        <h2 className="research-theme-title">Research Themes</h2>
        <div className="research-themes-box-container">
          {
            dataResearchThemes.map((item, index)=>{
              if(this.props.indexesToShow===undefined || this.props.indexesToShow.includes(index))
                return <>
                  <ResearchThemeComponent
                    themes={dataResearchThemes[index].content} 
                    theme={item}
                  />
                </>
              else
                return <div/>
            })
          }
        </div>
      </>
    )
  }
}

class ResearchThemeComponent extends Component {
  render(){
    return(
      <div className={"research-themes-box"} >
        <h3>{this.props.theme.title}</h3>
        {this.props.themes.map((data, i) => {
          return <p>{data}</p>
        })}
      </div>
    )
  }
}