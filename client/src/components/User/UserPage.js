import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CreateTeam from "./CreateTeam";
import JoinTeam from "./JoinTeam";
import "./userpage.css";
import Profile from "./Profile";
import TeamCollection from "./TeamCollection";

const UserPage = ({ user: { user, loadingUser, isAuthenticated, teams } }) => {
  return (
    <Fragment>
      {loadingUser === false && isAuthenticated === true && user !== null ? (
        <Fragment>
          <div className="row mypro_row" style={{ marginTop: "15px" }}>
            <Profile user={user} />
            <div className="col s12 l9" id="myprofile_seccol">
              <div className="row">
                <CreateTeam />
                <JoinTeam />
              </div>
              <div className="row">
                <TeamCollection teams={teams} />
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <h1>Login To View</h1>
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {})(UserPage);
