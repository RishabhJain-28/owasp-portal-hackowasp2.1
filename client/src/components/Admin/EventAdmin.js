import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class EventAdmin extends Component {
  state = {
    events: [],
    current: {
      eventName: "",
      eventDescription: "",
      eventDate: "",
      isActive: false,
    },
  };
  async componentDidMount() {
    const { data } = await axios.get("http://localhost:5000/api/event/all");
    console.log(data);
    this.setState({ events: data });
  }
  onChange = (e) => {
    const current = { ...this.state.current };
    current[e.target.name] = e.target.value;
    this.setState({ current });
  };
  createEvent = async () => {
    const events = [...this.state.events];
    const { data } = await axios.post(
      "http://localhost:5000/api/event/new",
      this.state.current
    );
    console.log(data);
    events.push(data);
    this.setState({ events });
  };
  deleteEvent = async (id) => {
    let events = [...this.state.events];
    const { data } = await axios.delete(
      `http://localhost:5000/api/event/delete/${id}`,
      this.state.current
    );
    console.log(data);

    events = events.filter((e) => e._id !== id);

    this.setState({ events });
  };
  switchIsActive = async (id) => {
    const events = [...this.state.events];
    const index = events.findIndex((e) => e._id === id);
    const { data } = await axios.put(
      `http://localhost:5000/api/event/toggleActive/${id}`,
      {
        isActive: !events[index].isActive,
      }
    );
    console.log(data);
    events[index] = data;
    this.setState({ events });
  };

  render() {
    return (
      <>
        <div className="row">
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Create Event</span>
                <label htmlFor="eventName" className="label">
                  Name:
                </label>
                <input
                  id="eventName"
                  name="eventName"
                  type="text"
                  placeholder="Name...."
                  onChange={this.onChange}
                />
                <label htmlFor="eventDescription" className="label">
                  description:
                </label>
                <input
                  id="eventDescription"
                  name="eventDescription"
                  type="text"
                  placeholder="description..."
                  onChange={this.onChange}
                />
                <label htmlFor="eventDate" className="label">
                  date:
                </label>
                <input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  placeholder="date..."
                  onChange={this.onChange}
                />
              </div>
              <div className="card-action">
                <button onClick={this.createEvent}>Create Event</button>
              </div>
            </div>
          </div>
        </div>

        <ul>
          {this.state.events.map((event) => (
            <li key={event._id}>
              <div className="row">
                <div className="col s12 m6">
                  <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                      <span className="card-title">{event.eventname}</span>
                      <p>{event.eventDescription}</p>
                      <p>date: {event.eventDate}</p>
                      <p>isActive {event.isActive ? "Yes" : "No"}</p>
                    </div>
                    <div className="card-action">
                      <Link to={`/admin/event/${event._id}`}>Open</Link>
                      <button onClick={() => this.deleteEvent(event._id)}>
                        Delete
                      </button>
                      <button onClick={() => this.switchIsActive(event._id)}>
                        {event.isActive ? "Stop" : "Start"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default EventAdmin;
