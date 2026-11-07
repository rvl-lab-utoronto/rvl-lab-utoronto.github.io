import React,{Component} from 'react'
import './labIntro.css';
import florian from '../assets/florian.jpg';
import { labIntroHtml } from '../data/labIntro';


export default class LabIntro extends Component {
  render(){
    return(
      <>

	    <div className="lab-intro-box-container">
		  <div className="lab-intro-box">
            <img src={florian} alt="Florian Shkurti" />
          </div>

	    

	    <div className="lab-intro-box-text">	
	
	    <h2>Welcome</h2>


	    <p dangerouslySetInnerHTML={{ __html: labIntroHtml }} />
  
        
	  </div>
        </div>
      </>
    )
  }
}
