import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getLeaderboard } from "../../actions/teamAction";
import TeamItem from "./TeamItem";
import "./lb.css";
import logo from "../../assets/images/logo.png";

const TeamCollection = ({ team: { eventTeams }, getLeaderboard }) => {
  useEffect(() => {
    getLeaderboard();
  }, [eventTeams]);
  return (
    <Fragment>
      <div className="total">
        <div className="bar">
          <img className="logo" src={logo} />
        </div>
        <div className="leaderboard">
          {eventTeams.map((team) => (
            <TeamItem team={team} key={team._id} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  team: state.team,
});

export default connect(mapStateToProps, { getLeaderboard })(TeamCollection);
