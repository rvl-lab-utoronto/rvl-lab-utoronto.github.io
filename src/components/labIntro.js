import React,{Component} from 'react'
import './labIntro.css';
// import ReactWordcloud from 'react-wordcloud';
// import BubbleUI from "react-bubble-ui";
// import "react-bubble-ui/dist/index.css";

export default class LabIntro extends Component {
  render(){
    return(
      <>

	    <div className="lab-intro-box-container">
             

	    <div className="lab-intro-box" >
	        <img src={require('../assets/florian.jpg').default} alt="" />      
              </div>

	
	    <div className="lab-intro-box-text" >
	    <h2>Welcome</h2>


	

	    <p> Welcome to the Robot Vision and Learning (RVL) lab. We are part of the <a href="https://web.cs.toronto.edu/">computer science department</a> at the <a href="https://www.utoronto.ca/">University of Toronto</a>, as well as the <a href="https://robotics.utoronto.ca/">UofT Robotics Institute</a>. The group is led by <a href="http://www.cs.toronto.edu/~florian/">Prof. Florian Shkurti</a>, and consists of students with backgrounds in artificial intelligence, robotics, engineering, control theory, or physics.
	    </p>

	    <p>We develop methods that enable robots to perceive, reason, and act effectively and safely, particularly in dynamic environments and alongside humans. Application areas include field robotics for environmental monitoring, visual navigation for autonomous vehicles, and mobile manipulation.   
	    </p>
  
        </div>

	
        </div>
      </>
    )
  }
}
