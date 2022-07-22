import React,{Component} from 'react'
import './teamMember.css';

export default class TeamMember extends Component {
  render(){
    let socials = ["website","email","twitter","linkedIn","googleScholar"]

    let children = <div className="team-member-box">
      <div style={{display:"flex", flexDirection:"row"}}>
        <div>
          <img alt={this.props.teamMember.name} className="team-member-image" src={process.env.PUBLIC_URL+"/"+this.props.teamMember.image}/>
        </div>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
          <h3 className="team-member-title">{this.props.teamMember.name}</h3>
          {this.props.teamMember.description?<p dangerouslySetInnerHTML={{__html: this.props.teamMember.description}}/>:<></>}
          <div className="team-member-socials">
            {socials.map((social)=>{
              if(this.props.teamMember[social]!==undefined)
                return <TeamMemberSocial social={social} teamMember={this.props.teamMember}/>
              else
                return <></>
            })}
          </div>
        </div>
      </div>
    </div>
    if(this.props.teamMember.link!==undefined && this.props.teamMember.link!==""){
      return <a href={this.props.teamMember.link} className="no-decoration">{children}</a>
    } else {
      return <div className="no-hover">{children}</div>
    }
  }
}

class TeamMemberSocial extends Component {
  render(){
    return <a href={(this.props.social==="email" ? "mailto:" : "") + this.props.teamMember[this.props.social]}><img className="team-member-social-icon" alt={this.props.social} src={getSocialPhoto(this.props.social)}/></a>
  }
}

function getSocialPhoto(social){
  switch(social){
    case "website":
      return require("../assets/icons/globe-solid.svg").default
    case "email":
      return require("../assets/icons/envelope-solid.svg").default
    case "twitter":
      return require("../assets/icons/twitter-brands.svg").default
    case "linkedIn":
      return require("../assets/icons/linkedin-brands.svg").default
    case "googleScholar":
      return require("../assets/icons/graduation-cap-solid.svg").default
    default:
      return require("../assets/icons/globe-solid.svg").default
  }
}