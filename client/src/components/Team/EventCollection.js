import React, { Fragment } from "react";
import EventItem from "./EventItem";
import "./team.css";

const EventCollection = ({ team }) => {
  return (
    <Fragment>
      <div className="team_eventsec">
        <h3>Participating in -</h3>
        <div className="row">
          {team.events.map((event) => (
            <EventItem event={event} key={event._id} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default EventCollection;
