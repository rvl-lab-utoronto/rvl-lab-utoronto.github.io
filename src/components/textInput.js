import React,{Component} from 'react'
import './textInput.css';

export default class TextInput extends Component {
  render(){
    return(<>
      <input value={this.props.value} style={{...this.props.style,fontSize:"15px"}} type="text" placeholder={this.props.placeholder} onChange={(event)=>this.props.onChange(event.target.value)}/>
    </>)
  }
}