import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "./userpage.css";
import { joinTeam } from "../../actions/userAction";
import { connect } from "react-redux";

const JoinTeam = ({ user: {}, joinTeam }) => {
  const [teamCode, setTeamCode] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    joinTeam(teamCode);
    setTeamCode("");
  };

  const changeHandler = (e) => {
    setTeamCode(e.target.value);
  };
  return (
    <Fragment>
      <div className="col l6 s12 ">
        <div className="card mypro_create">
          <h3>Join Team...</h3>
          <form onSubmit={submitHandler}>
            <div className="row">
              <div className="input-field col s12">
                <label htmlFor="teamCode">Enter Team Code</label>
                <input
                  name="teamCode"
                  type="text"
                  className="validate"
                  value={teamCode}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="row center">
              <input type="submit" value="Join" className="btn center" />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { joinTeam })(JoinTeam);
