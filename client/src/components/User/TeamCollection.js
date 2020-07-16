import React, { Fragment } from "react";
import TeamItem from "./TeamItem";
import "./userpage.css";

const TeamCollection = ({ teams }) => {
  return (
    <Fragment>
      <div className="team_eventsec">
        <h3>My Teams</h3>
        <div className="row">
          {teams.map((team) => (
            <TeamItem team={team} key={team._id} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default TeamCollection;
