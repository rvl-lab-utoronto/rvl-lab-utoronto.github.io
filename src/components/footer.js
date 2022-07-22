import React,{Component} from 'react'
import "./footer.css"
import { copyrightMessage } from '../data/copyright';

export default class Footer extends Component {
  render(){
    return (
      <div className="footer">
        <p className="accent-paragraph footer-copyright" style={{color:"gray"}}>{copyrightMessage}</p>
      </div>
    );
  }
}