import React,{Component} from 'react'
import "./pageHeader.css"

export default class PageHeader extends Component {
  render(){
    return <>
      <h1 className="page-header">{this.props.title}</h1>
      {this.props.children}
      {this.props.showBreak===false?<div/>:<hr/>}
    </>
  }
}