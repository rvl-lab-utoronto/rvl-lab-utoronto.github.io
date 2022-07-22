import React,{Component} from 'react'
import './publicationEntry.css';
import useCollapse from 'react-collapsed'


export default function PublicationEntry(props){
  let extraParams = {"pdf":"pdf","html":"pdf", "bibtex":"bibtex", "video":"video", "project":"project", "code":"code"}

  const { getCollapseProps, getToggleProps} = useCollapse()
  let thumbnail = <></>
  if(props.publication["pdf"]!==undefined && props.publication["thumbnail"]!==undefined){
    thumbnail = <a href={process.env.PUBLIC_URL+"/"+props.publication["pdf"]}>
      <img className="publication-thumbnail" alt={props.publication["title"]} src={process.env.PUBLIC_URL+"/"+props.publication["thumbnail"]}/>
    </a>
  } else if(props.publication["html"]!==undefined && props.publication["thumbnail"]!==undefined){
    thumbnail = <a href={props.publication["html"]}>
      <img className="publication-thumbnail" alt={props.publication["title"]} src={process.env.PUBLIC_URL+"/"+props.publication["thumbnail"]}/>
    </a>
  } else if(props.publication["thumbnail"]!==undefined){
    thumbnail = <img className="publication-thumbnail" alt={props.publication["title"]} src={process.env.PUBLIC_URL+"/"+props.publication["thumbnail"]}/>
  }
  return <div className="publication-entry">
    {props.showYear?<><hr/><h2>{props.publication["year"]}</h2></>:<div/>}
    <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
      <div className="desktop-view">
        <div style={{paddingRight:"25px"}}>
          {thumbnail}
        </div>
      </div>
      <div>
        <h3>{props.publication["title"]}</h3>
        <p>{props.publication["author"]}</p>
        {props.publication["booktitle"]!==""?<p><i>{"In " + props.publication["booktitle"]}</i>{" " + props.publication["year"]}</p>:<div/>}
        {props.publication["journal"]!==""?<p><i>{props.publication["journal"]}</i>{" " + props.publication["year"]}</p>:<div/>}
        {props.publication["tags"]!==undefined?<div>{props.publication["tags"].map((tag)=>{
          return <PublicationTag tag={tag} selected={props.selectedTags.includes(tag)} addSelectedTag={props.addSelectedTag} removeSelectedTag={props.removeSelectedTag}/>
        })}</div>:<div/>}
        <div style={{marginLeft:"-3px", marginTop:"3px"}}>
          {Object.keys(extraParams).map((key)=>{
            if(props.publication[key]!==undefined && props.publication[key]!==""){
              if(key==="bibtex"){
                return <div key={key} style={{display:"inline", marginLeft:"3px"}}{...getToggleProps()}>[<div className="a" style={{display:"inline"}}>bibtex</div>]</div>
              }else if(key==="pdf"){
                return <div key={key} style={{display:"inline", marginLeft:"3px"}}>[<a href={process.env.PUBLIC_URL+"/"+props.publication[key]}>{extraParams[key]}</a>]</div>
              }
              return <div key={key} style={{display:"inline", marginLeft:"3px"}}>[<a href={props.publication[key]}>{extraParams[key]}</a>]</div>
            }
            return <></>
          })}
        </div>
        <div {...getCollapseProps()}><div className="bibtex-expand">{props.publication["bibtex"]}</div></div>
      </div>
    </div>
  </div>
}


export class PublicationTag extends Component{
  constructor(props){
    super(props)
    this.state={selected:this.props.selected??false}
  }

  componentDidUpdate(prevProps){
    if(this.props.selected!==prevProps.selected){
      this.setState({selected: this.props.selected})
    }
  }

  onClick = () => {
    if(!this.state.selected){
      this.props.addSelectedTag(this.props.tag)
    } else {
      this.props.removeSelectedTag(this.props.tag)
    }
    this.setState({selected:!this.state.selected})
  }

  render(){
    return(
      <div onClick={this.onClick} className={"publication-tag "+(this.state.selected?"publication-tag-selected":"")}>{this.props.tag}</div>
    )
  }
}