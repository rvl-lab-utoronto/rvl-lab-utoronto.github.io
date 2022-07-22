import React,{Component} from 'react'
import './blogEntry.css';
import {Link} from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import ReactDOMServer from 'react-dom/server';
import {decode} from 'html-entities';
import { NavbarSpace } from './navbar';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export class BlogEntry extends Component {
  render(){
    let children = <>
      <div style={{height:"5px"}}/>
      <h2>{this.props.blog.title}</h2>
      {this.props.blog.date?<p style={{margin:"1px", marginTop:"5px", marginBottom:"5px", color:"black"}}>{this.props.blog.date}</p>:<></>}
      {this.props.blog.description?<p style={{margin:"1px", color:"black"}}>{this.props.blog.description}</p>:<></>}
      <div style={{height:"25px"}}/>
      <hr/>
    </>
    if(this.props.blog.asset!==undefined && this.props.blog.asset!=="" && this.props.blog.webLocation!==undefined && this.props.blog.webLocation!==""){
      return <Link className="blog-entry-link" to={"/blog/"+this.props.blog.webLocation}>
        {children}
      </Link>
    } else if (this.props.blog.link!==undefined && this.props.blog.link!==""){
      return <a className="blog-entry-link" href={this.props.blog.link}>
        {children}
      </a>
    } else {
      return children
    }
  }
}

function filterText(text){
  // let outputText = text;
  // let indexFound = 0
  // let indexToCheck = 0
  // let tag = ""
  // let newTag = ""
  // while(indexFound!==-1){
  //   indexFound = text.indexOf("<img",indexToCheck);
  //   if(indexFound!==-1){
  //     tag = text.substring(indexFound, text.indexOf(">",indexFound))
  //     newTag = tag.replace("src=\"","src=\""+process.env.PUBLIC_URL+"/")
  //     newTag = newTag.replace("src='","src='"+process.env.PUBLIC_URL+"/")
  //     outputText = outputText.replaceAll(tag, newTag)
  //     indexToCheck = indexFound
  //   }
  //   indexToCheck=indexToCheck+1
  // }

  
  // indexFound = 0
  // indexToCheck = 0
  // while(indexFound!==-1){
  //   indexFound = text.indexOf("<a",indexToCheck);
  //   if(indexFound!==-1){
  //     tag = text.substring(indexFound, text.indexOf(">",indexFound))
  //     newTag = tag.replace("href=\"assets/","href=\""+process.env.PUBLIC_URL+"/assets/")
  //     outputText = outputText.replaceAll(tag, newTag)
  //     indexToCheck = indexFound
  //   }
  //   indexToCheck=indexToCheck+1
  // }

  let outputText = text.replaceAll("\"assets/", "\""+process.env.PUBLIC_URL+"/assets/")
  outputText = outputText.replaceAll("'assets/", "'"+process.env.PUBLIC_URL+"/assets/")
  return outputText
}

export class BlogEntryPage extends Component {
  constructor(props) {
    super(props)
    this.state = {text: ""}
  }

  async componentDidMount(){
    if(!this.props.distill){
      const response = await fetch(this.props.src);
      let text = await response.text();

      let rawText = decode(ReactDOMServer.renderToString(<>
        <ReactMarkdown 
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {text}
        </ReactMarkdown>
      </>))

      rawText = filterText(rawText)

      let codeSplit = rawText.split("<pre><code>")
      const htmlSplit = [codeSplit[0]]
      for(const codeBlock of codeSplit.splice(1)) {
        const addCodeBack = "<pre><code>" + codeBlock;
        const splitClosingCodeTag = addCodeBack.split('</code></pre>')
        const removeNewline = splitClosingCodeTag[0].trimEnd()
        htmlSplit.push(removeNewline)
        htmlSplit.push(splitClosingCodeTag[1])
      }
      
      this.setState({
        htmlSplit: htmlSplit,
      })
    }
  }

  render(){
    if(this.props.distill){
      return <>
        <div style={{height:"55px"}}/>
        <iframe id="iframe" style={{width:"100vw", height:"calc(100vh - 8px - 55px)"}} title="blogPost" src={this.props.src}></iframe>
      </>
    } else if (this.state.htmlSplit!==""){
      return <>
        <NavbarSpace/>
        <div>
        <div className="center">
          <div className="horizontal-padding max-width-blog blog-entry-page">
            {this.props.removeExtraSpace===true?<div/>:<div style={{height:"25px"}}/>}
            {this.props.articleData!==undefined?<>
              <h1 style={{fontWeight:600}}>{this.props.articleData?.title}</h1>
              {(this.props.articleData.authors!==undefined || this.props.articleData.date!==undefined ||  this.props.articleData.affiliations!==undefined) ? (<><div style={{height:"20px"}}/>
                <hr/>
                <div style={{height:"10px"}}/>
                <div className="article-data">
                  {this.props.articleData.authors!==undefined?
                  <div style={{display:"flex", flexDirection:"column"}}>
                    <h4 className="article-data-header">Authors</h4>
                    {this.props.articleData?.authors?.map((author)=>{
                      return <h3 className="article-data-label">{author}</h3>
                    })}
                  </div>
                  :
                  <></>
                  }
                  {this.props.articleData.affiliations!==undefined?
                  <div style={{display:"flex", flexDirection:"column"}}>
                    <h4 className="article-data-header">Affiliations</h4>
                    {this.props.articleData?.affiliations?.map((author)=>{
                      return <h3 className="article-data-label">{author}</h3>
                    })}
                  </div>
                  :
                  <></>}
                  {this.props.articleData.date!==undefined?
                  <div style={{display:"flex", flexDirection:"column"}}>
                    <h4 className="article-data-header">Published</h4>
                    <h3 className="article-data-label">{this.props.articleData?.date}</h3>
                  </div>
                  :
                  <></>}
                </div>
                <div style={{height:"10px"}}/>
                <hr/>
              </>)
            :<></>}
            <div style={{height:"16px"}}/></>:<></>}
            {this.state.htmlSplit && this.state.htmlSplit.map((html)=>{
              if(html.startsWith("<pre><code>")){
                let htmlRemoved = html.split("<pre><code>")[1]
                return <SyntaxHighlighter language="javascript" style={docco}>
                  {htmlRemoved}
                </SyntaxHighlighter>
              } else{
                return <div dangerouslySetInnerHTML={{__html: html}}/>
              }
            })}
          </div>
        </div>
        </div>
      </>
    } else {
      return <></>
    }
  }
}