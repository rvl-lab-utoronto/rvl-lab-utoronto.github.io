import React,{Component} from 'react'
import './news.css';
import {dataNews} from "../data/news.js"

export default class News extends Component {
  constructor() {
    super();
    this.amountShow = 10;
    this.amountShowExpand = 10;
    this.state={show:this.amountShow}
  }
  render(){
    return(
      <>
        <h2 className="news-title">News</h2>
        <div className="news-box-container">
          {
            dataNews.map((item, index)=>{
              if(index >= this.state.show){
                return <></>
              } else {
                return <div className="news-box">
                  <p dangerouslySetInnerHTML={{__html: getMonth(item.date) + " " + getYear(item.date) + ": " + item.content}}/>
                </div>
              }
            })
          }
          {!(this.state.show>=dataNews.length)?
            <div style={{width:"100%", marginTop:"10px"}} className={"center"}>
              <div onClick={()=>{this.setState({show:this.state.show+this.amountShowExpand})}} className={"news-load-more-button"}>
                <img alt="more" style={{height:"24px", width:"24px"}} src={require('../assets/buttons/expand_more.svg').default}/>
              </div>
            </div>
            :
            <></>
          }
          
        </div>
      </>
    )
  }
}

//format: 2021-08-25 (year, month, day)
function getYear(date){
  if(date===undefined||date.split("-").length!==3){
    return "";
  }
  return date.split("-")[0];
}
const monthsShort = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
function getMonth(date){
  if(date===undefined||date.split("-").length!==3){
    return "";
  }
  return monthsShort[parseInt(date.split("-")[1])-1];
}