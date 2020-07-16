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
  const clickHandler = (e) => {};
  return (
    <Fragment>
      <nav className="black ">
        <div className="navbar-fixed">
          <div className="nav-wrapper ">
            <Link to="#!" className="brand-logo center " id="brand-logo">
              OWASP Portal{" "}
            </Link>
            <ul id="nav-mobile" className="right">
              {loadingUser === false &&
              isAuthenticated === true &&
              user !== null ? (
                <Fragment>
                  {user.permission !== "USER" ? (
                    <Fragment>
                      <li>
                        <Link to="/timeline">Management</Link>
                      </li>

                      <li>
                        <Link to="/admin">Admin Portal</Link>
                      </li>
                    </Fragment>
                  ) : null}

                  <li>
                    <Link to="/user">User</Link>
                  </li>

                  <li>
                    <a
                      href="https://owasp-portal-hackowasp21.herokuapp.com/api/user/logout"
                      onClick={clickHandler}
                    >
                      Logout
                    </a>
                  </li>
                </Fragment>
              ) : (
                <li>
                  {" "}
                  <a href="https://owasp-portal-hackowasp21.herokuapp.com/api/user/login">
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
