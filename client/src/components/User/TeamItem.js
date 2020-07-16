import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentTeam } from "../../actions/userAction";
import "./userpage.css";

const TeamItem = ({ user: {}, setCurrentTeam, team }) => {
  const onClick = () => {
    setCurrentTeam(team);
  };
  return (
    <Fragment>
      <div className="col s12 m6 l3">
        <div className="card">
          <div className="card-image">
            <img
              src="https://picsum.photos/400/250.jpg"
              className="responsive-img"
            />
            <span className="card-title">{team.teamName}</span>
          </div>
          <div className="card-content">
            <p>With a total of {team.members.length} ninjas!</p>
          </div>
          <div className="card-action">
            <Link onClick={onClick} to={`/team/${team._id}`}>
              View
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { setCurrentTeam })(TeamItem);
