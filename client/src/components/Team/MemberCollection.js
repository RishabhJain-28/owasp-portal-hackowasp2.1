import React, { Fragment } from "react";
import MemberItem from "./MemberItem";
import "./team.css";

const MemberCollection = ({ team }) => {
  return (
    <Fragment>
      <div className="team_teamsec">
        <h3>Team Members</h3>
        <div className="row">
          {team.members.map((member) => (
            <MemberItem member={member} key={member._id} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default MemberCollection;
