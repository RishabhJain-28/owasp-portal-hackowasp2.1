import React, { Fragment, useEffect } from "react";
import "./event.css";
import Section from "./Section";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { startEvent } from "../../actions/teamAction";

const EventPage = ({ team: { questions }, startEvent }) => {
  let history = useHistory();
  useEffect(() => {
    const eventId = history.location.pathname.split("/")[2];
    startEvent(eventId);
  }, []);
  return (
    <Fragment>
      <div className="row ind2_row">
        <div className="col s12 l6 ind2_lt_sec"></div>
        <div className="col s12 l6 ind2_rt_sec">
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
