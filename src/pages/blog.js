import React,{Component} from 'react'
import { BlogEntry } from '../components/blogEntry'
import Footer from '../components/footer'
import { NavbarSpace } from '../components/navbar'
import { dataBlog } from '../data/blogs'

export default class Blog extends Component {
  render(){
    return <div className="center">
      <div className="horizontal-padding max-width">
        <div style={{minHeight: "100vh"}}>
          <NavbarSpace/>
          <div style={{height:"1px"}}/>
          {dataBlog.map((blog)=>{
            return <BlogEntry blog={blog}/>
          })}
        </div>
        <div style={{position:"absolute", left:0, width:"100vw"}}>
          <Footer/>
        </div>
      </div>
    </div>
  }
}