import React, { Component } from 'react';
import { dataTeam } from "../data/team";
import TeamMember from '../components/teamMember';
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
  default: 3,
  1250: 2,
  950: 1,
};

export default class Team extends Component {
  render() {
    let keysIn = Object.keys(dataTeam);
    return (
      <div className="center">
        <div className="horizontal-padding max-width">
          <div style={{ height: "10px" }} />
          {keysIn.map((key) => (
            <div key={key}>
              <h2 style={{ marginBottom: "5px", marginTop: "10px", textTransform: "capitalize" }}>
                {key}
              </h2>
              <Masonry breakpointCols={breakpointColumnsObj} className="masonry-grid">
                {dataTeam[key].map((teamMember) => (
                  <TeamMember key={teamMember.name} teamMember={teamMember} />
                ))}
              </Masonry>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
