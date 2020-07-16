import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Profile from "../User/Profile";

const AdminPage = ({ user: { user, loadingUser, isAuthenticated, teams } }) => {
  return (
    <Fragment>
      {loadingUser === false && isAuthenticated === true && user !== null ? (
        <Fragment>
          <div className="row mypro_row" style={{ marginTop: "15px" }}>
            <Profile user={user} />
            <div className="col s12 l9" id="myprofile_seccol">
              <Link to="/admin/event">Events</Link>
              <br />
              <Link to="/timeline">Managment</Link>
              <br />
              <Link to="/admin/invite">Invite</Link>
              <br />
              <Link to="/admin/permissions">Change permissions</Link>
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

export default connect(mapStateToProps, {})(AdminPage);
