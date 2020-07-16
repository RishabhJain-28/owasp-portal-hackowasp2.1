import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "./userpage.css";
import { connect } from "react-redux";
import { createTeam } from "../../actions/userAction";

const CreateTeam = ({ user: {}, createTeam }) => {
  const [teamName, setTeamName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    createTeam(teamName);
    setTeamName("");
  };

  const changeHandler = (e) => {
    setTeamName(e.target.value);
  };

  return (
    <Fragment>
      <div className="col l6 s12 ">
        <div className="card mypro_create">
          <h3>Create Team... </h3>
          <form onSubmit={submitHandler}>
            <div className="row">
              <div className="input-field col s12">
                <label htmlFor="teamName">Enter Team Name</label>
                <input
                  name="teamName"
                  type="text"
                  className="validate"
                  value={teamName}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="row center">
              <input type="submit" value="Create" className="btn center" />
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

export default connect(mapStateToProps, { createTeam })(CreateTeam);
