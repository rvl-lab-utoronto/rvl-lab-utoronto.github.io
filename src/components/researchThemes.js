import React, { Component } from 'react';
import './researchThemes.css';
import { Link } from 'react-router-dom';
import { dataResearchThemes } from '../data/researchThemes.js';

export default class ResearchThemes extends Component {
  render() {
    return (
      <>
        <div className="research-themes">
          <h2 className="research-theme-title">Research Themes</h2>
          <div className="research-themes-box-container">
            {dataResearchThemes.map((item, index) => {
              if (
                this.props.indexesToShow === undefined ||
                this.props.indexesToShow.includes(index)
              )
                return (
                  <React.Fragment key={index}>
                    <ResearchThemeComponent
                      themes={dataResearchThemes[index].content}
                      theme={item}
                    />
                  </React.Fragment>
                );
              else return <div key={index} />;
            })}
          </div>
        </div>
      </>
    );
  }
}

class ResearchThemeComponent extends Component {
  render() {
    return (
      <div className={'research-themes-box'}>
        <h3>
          <Link to={this.props.theme.web}>{this.props.theme.title}</Link>
        </h3>
        {this.props.themes.map((data, i) => {
          return <p key={i}>{data}</p>;
        })}
      </div>
    );
  }
}

