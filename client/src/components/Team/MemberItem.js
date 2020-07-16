import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { leaveTeam } from "../../actions/userAction";
import "./team.css";

const MemberItem = ({ user: { user, currentTeam }, leaveTeam, member }) => {
  const onClick = () => {
    leaveTeam(currentTeam._id);
  };
  return (
    <Fragment>
      <div className="col s12 m6 l3">
        <div className="card" id="team_teamseccards">
          <div className="card-image">
            <img
              src="https://picsum.photos/400/100.jpg"
              className="team_teamsec_bkg"
            />
          </div>
          <div className="card-content center team_teamctnt">
            <img
              src="https://picsum.photos/100/100.jpg"
              className="team_teamsec_avtr circle responsive-img"
            />
            <h4 className="team_teamsechd">{member.name}</h4>
            <h6 className="grey-text">Member of :-{currentTeam.teamName}</h6>
            <div className="card-action">
              {member._id === user._id ? (
                <Link to="/" style={{ marginLeft: "auto" }} onClick={onClick}>
                  Leave
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { leaveTeam })(MemberItem);
