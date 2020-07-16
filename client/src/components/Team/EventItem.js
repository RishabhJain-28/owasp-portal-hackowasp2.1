import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "./team.css";

const EventItem = ({ event }) => {
  return (
    <Fragment>
      <div className="col s12 m6 l3">
        <div className="card">
          <div className="card-image">
            <img
              src="https://picsum.photos/400/300.jpg"
              className="responsive-img"
            />
            <span className="card-title">{event.eventName}</span>
          </div>
          <div className="card-content">
            <p>{event.eventDescription}</p>
            <br />
            <p>Scheduled on :- {event.eventDate}</p>
          </div>
          <div className="card-action">
            {event.isActive === true ? (
              <Link
                to={`/eventPage/${event._id}`}
                style={{ marginLeft: "auto" }}
              >
                Start
              </Link>
            ) : (
              <Link to="#!" style={{ marginLeft: "auto" }}>
                Not Active
              </Link>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EventItem;
