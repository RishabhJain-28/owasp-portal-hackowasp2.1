import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const TeamPage = ({ user: { currentTeam } }) => {
  return (
    <Fragment>
      {currentTeam ? (
        <div>
          <h3>Team Name</h3>
          <p>{currentTeam.teamName}</p>
          <h3>Team Members</h3>
          {currentTeam.members.map((member) => (
            <p key={member._id}>{member._id}</p>
          ))}
          <h3>Team Events</h3>
          {currentTeam.events.map((event) => (
            <Fragment key={event._id}>
              <p>{event.eventName}</p>
              {event.isActive ? (
                <Link to={`/eventPage/${event._id}`}>Start</Link>
              ) : null}
            </Fragment>
          ))}
        </div>
      ) : (
        <p>No current team set</p>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {})(TeamPage);
