import React, { Fragment } from "react";
import "./lb.css";
import team_logo from "../../assets/images/team_logo.png";

const TeamItem = ({ team }) => {
  return (
    <Fragment>
      <div className="team">
        <img className="profile" src={team_logo} height="50px" width="50px" />
        <p className="Teamname">{team.teamName}</p>
        <p className="code">{team.score}</p>
        <div className="clearfix"></div>
      </div>
    </Fragment>
  );
};

export default TeamItem;
