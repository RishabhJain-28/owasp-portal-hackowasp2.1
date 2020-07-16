import React, { Fragment, useEffect } from "react";
import "./event.css";
import Section from "./Section";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { startEvent } from "../../actions/teamAction";

const EventPage = ({ team: { questions, score, event }, startEvent }) => {
  let history = useHistory();
  useEffect(() => {
    if (!event) {
      const eventId = history.location.pathname.split("/")[2];
      startEvent(eventId);
    }
  }, []);
  return (
    <Fragment>
      <div className="row ind2_row">
        <div className="col s12 l6 ind2_lt_sec"></div>
        <div className="col s12 l6 ind2_rt_sec">
          <div>
            <p>Team Score = {score}</p>
            <br />
            <Link to="/leaderboard">View Leaderboard</Link>
          </div>
          {questions.map((question) => (
            <Section question={question} key={question.question._id} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  team: state.team,
});

export default connect(mapStateToProps, { startEvent })(EventPage);
