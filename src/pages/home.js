import React,{Component} from 'react'
import './home.css';
import ResearchThemes from '../components/researchThemes';
import News from '../components/news';
import {Slideshow} from '../components/slideshow';

export default class Home extends Component {
  render(){
    return(<>
      <div className="desktop-view" >
        <div className="horizontal-padding max-width-home">
          <div style={{display:"flex",flexDirection:"row"}}>
            <div className="left-section">
              <Slideshow/>
              <div style={{height:"20px"}}/>
              <ResearchThemes/>
            </div>
            <div className="news-section">
              <News/>
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-view">
        <div className="horizontal-padding">
          <Slideshow/>
          <ResearchThemes/>
          <News/>
        </div>
      </div>
    </>)
  }
}
