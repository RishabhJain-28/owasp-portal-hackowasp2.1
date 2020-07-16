import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import { connect } from "react-redux";
import { loadUser, getMyTeams } from "../../actions/userAction";

const Navbar = ({
  user: { user, loadingUser, isAuthenticated, teams },
  loadUser,
  getMyTeams,
}) => {
  useEffect(() => {
    M.AutoInit();
    loadUser();
    getMyTeams();
  }, []);

  return (
    <Fragment>
      <nav className="black ">
        <div className="navbar-fixed">
          <div className="nav-wrapper ">
            <Link to="#!" className="brand-logo center " id="brand-logo">
              Event Portal{" "}
            </Link>
            <ul id="nav-mobile" className="right">
              {loadingUser === false &&
              isAuthenticated === true &&
              user !== null ? (
                <li>
                  <a href="http://localhost:5000/api/user/logout">Logout</a>
                </li>
              ) : (
                <li>
                  {" "}
                  <a href="http://localhost:5000/api/user/login">
                    Login With Google
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { loadUser, getMyTeams })(Navbar);
