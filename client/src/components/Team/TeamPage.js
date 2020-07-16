import React, { Fragment } from "react";
import { connect } from "react-redux";
import MemberCollection from "./MemberCollection";
import EventCollection from "./EventCollection";
import "./team.css";

const TeamPage = ({ user: { currentTeam } }) => {
  return (
    <Fragment>
      <div className="team_bkg center">
        <h2 className="center-align white-text">{currentTeam.teamName}</h2>
        <h4 className="center-align blue-text white-text">
          Use code <span className="red-text">{currentTeam.teamCode}</span> to
          join this team
        </h4>
      </div>
      <EventCollection team={currentTeam} />
      <MemberCollection team={currentTeam} />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {})(TeamPage);
