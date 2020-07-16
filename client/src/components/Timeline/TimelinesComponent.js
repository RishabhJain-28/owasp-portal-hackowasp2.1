import React, { Component } from "react";
import Timeline from "./Timeline";
import axios from "axios";
import "./CSS/timeline.css";

class TimelinesComponent extends Component {
  state = {
    currentTimeline: 0,
    isOpen: false,
    timelines: [],
  };

  async componentDidMount() {
    const { data: timelines } = await axios.get(
      "https://owasp-portal-hackowasp21.herokuapp.com/api/timeline"
    );
    // console.log(timelines);
    // if()

    this.setState({ timelines });
  }
  addNode = async () => {
    const timelines = [...this.state.timelines];
    // console.log("aadddd", timelines[this.state.currentTimeline]._id);
    const { data: node } = await axios.post(
      `https://owasp-portal-hackowasp21.herokuapp.com/api/timeline/node/create/${
        timelines[this.state.currentTimeline]._id
      }`,
      {
        users: ["5f0dc7f598b1200174339b04"],

        title: "title",
        description: " decription",
        end: timelines[this.state.currentTimeline].end,
      }
    );

    if (!timelines[this.state.currentTimeline].nodes)
      timelines[this.state.currentTimeline].nodes = [];
    timelines[this.state.currentTimeline].nodes.push(node);

    this.setState({ timelines });
  };
  editNode = async (id) => {
    const timelines = [...this.state.timelines];

    const nodes = timelines[this.state.currentTimeline].nodes;
    // const index = nodes.findIndex((n) => n.id === id);
    timelines[this.state.currentTimeline].nodes = nodes;

    //call edit node
    const t = timelines[this.state.currentTimeline];
    const tid = t._id;
    delete t._id;
    delete t.__v;
    const { data } = await axios.put(
      `https://owasp-portal-hackowasp21.herokuapp.com/api/timeline/${tid}`,
      t
    );
    // console.log(res);
    timelines[this.state.currentTimeline] = data;
    this.setState({ timelines });
  };
  onNodeInputChange = (e, id) => {
    const timelines = [...this.state.timelines];

    const nodes = timelines[this.state.currentTimeline].nodes;
    const index = nodes.findIndex((n) => n._id === id);
    timelines[this.state.currentTimeline].nodes[index][e.target.name] =
      e.target.value;

    this.setState({ timelines });
  };
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  changeCurrentTimeline = (i) => {
    this.setState({ currentTimeline: i, isOpen: true });
  };
  deleteNode = async (id) => {
    const timelines = [...this.state.timelines];

    timelines[this.state.currentTimeline].nodes = timelines[
      this.state.currentTimeline
    ].nodes.filter((n) => n._id !== id);
    // const index = nodes.findIndex((n) => n.id === id);
    // this.setState({ timelines });
    const t = timelines[this.state.currentTimeline];
    const tid = t._id;
    delete t._id;
    delete t.__v;
    const { data } = await axios.put(
      `https://owasp-portal-hackowasp21.herokuapp.com/api/timeline/${tid}`,
      t
    );
    // console.log(res);
    timelines[this.state.currentTimeline] = data;
    this.setState({ timelines });
  };
  createTimeline = async () => {
    const t = {
      title: "title",
      description: "description",
      start: new Date(Date.now()).toLocaleDateString(),
      end: new Date(Date.now()).toLocaleDateString(),
      users: ["5f0dc7f598b1200174339b04"],
    };
    console.log(t.start);
    console.log(t.end);
    const { data } = await axios.post(
      `https://owasp-portal-hackowasp21.herokuapp.com/api/timeline/create/`,
      t
    );
    const timelines = [...this.state.timelines];
    timelines.push(data);
    this.setState({ timelines });
  };
  closeTimeline = () => {
    // console.log("a");
    this.setState({ isOpen: false });
  };
  deleteTimeline = async () => {
    // if (!window.confirm("Are you sure you want to delete this timeline"))
    //   return;
    // return deleteTimeline();

    let current = this.state.currentTimeline;
    const res = await axios.delete(
      `https://owasp-portal-hackowasp21.herokuapp.com/api/timeline/${
        this.state.timelines[this.state.currentTimeline]._id
      }`
    );
    // console.log(res);

    const timelines = this.state.timelines.filter((t, i) => i !== current);
    // current--;
    this.setState({ timelines, currentTimeline: -1, isOpen: false });
  };
  onTimelineInputChange = (e, id) => {
    const timelines = [...this.state.timelines];

    timelines[this.state.currentTimeline][e.target.name] = e.target.value;

    this.setState({ timelines });
  };
  editTimeline = async () => {
    const timelines = [...this.state.timelines];
    const t = timelines[this.state.currentTimeline];
    const tid = t._id;
    delete t._id;
    delete t.__v;
    const { data } = await axios.put(
      `https://owasp-portal-hackowasp21.herokuapp.com/api/timeline/${tid}`,
      t
    );
    // console.log(data);
    timelines[this.state.currentTimeline] = data;
    this.setState({ timelines });
  };
  markNode = async (id) => {
    const timelines = [...this.state.timelines];
    const { data } = await axios.get(
      `https://owasp-portal-hackowasp21.herokuapp.com/api/timeline/node/done/${
        timelines[this.state.currentTimeline]._id
      }&${id}`
    );
    // console.log(data);
    timelines[this.state.currentTimeline] = data;
    this.setState({ timelines });
  };
  markTimeline = async () => {
    const timelines = [...this.state.timelines];
    const { data } = await axios.get(
      `https://owasp-portal-hackowasp21.herokuapp.com/api/timeline/done/${
        timelines[this.state.currentTimeline]._id
      }`
    );
    // console.log("marknode", data);
    timelines[this.state.currentTimeline] = data;

    this.setState({ timelines });
  };
  render() {
    return (
      <>
        {!this.state.isOpen && (
          <div>
            {this.state.timelines.map((timeline, i) => (
              <TimelineCard
                key={timeline._id}
                t={timeline}
                changeCurrentTimeline={() => this.changeCurrentTimeline(i)}
              />
            ))}
          </div>
        )}
        {this.state.isOpen && this.state.timelines.length && (
          <>
            <TimelineCard
              t={this.state.timelines[this.state.currentTimeline]}
              changeCurrentTimeline={() =>
                this.changeCurrentTimeline(this.state.currentTimeline)
              }
              closeTimeline={this.closeTimeline}
              isOpen={this.state.isOpen}
              deleteTimeline={this.deleteTimeline}
              onTimelineInputChange={this.onTimelineInputChange}
              editTimeline={this.editTimeline}
              markTimeline={this.markTimeline}
            />
            <Timeline
              addNode={this.addNode}
              onNodeInputChange={this.onNodeInputChange}
              editNode={this.editNode}
              deleteNode={this.deleteNode}
              markNode={this.markNode}
              timeline={this.state.timelines[this.state.currentTimeline]}
            />
          </>
        )}
        {!this.state.isOpen && (
          <button onClick={this.createTimeline}>Create TImeline</button>
        )}
      </>
    );
  }
}
export default TimelinesComponent;

class TimelineCard extends Component {
  state = {
    edit: false,
  };
  switchEdit = () => {
    // console.log("a");
    this.setState({ edit: !this.state.edit });
  };
  render() {
    const {
      t,
      changeCurrentTimeline,
      closeTimeline,
      isOpen,
      deleteTimeline,
      onTimelineInputChange,
      editTimeline,
      markTimeline,
    } = this.props;
    t.start = new Date(t.start).toLocaleDateString();
    t.end = new Date(t.end).toLocaleDateString();
    // console.log(t.done);
    return (
      <>
        {!this.state.edit && (
          <div key={t._id} className="row">
            <div className="col s12 m12 center ">
              <div
                className={
                  t.done ? "card darken-1  green " : "card darken-1 pink "
                }
              >
                <div
                  className="card-content white-text"
                  onClick={changeCurrentTimeline}
                >
                  <span className="card-title">{t.title}</span>
                  <p>{t.description}</p>
                  <p>start: {t.start}</p>
                  <p>end: {t.end}</p>
                </div>
                {isOpen && (
                  <div className="card-action">
                    <button onClick={deleteTimeline}>delete</button>
                    <button onClick={this.switchEdit}>edit</button>
                    <button onClick={closeTimeline}>close</button>
                    {!t.done && <button onClick={markTimeline}>done</button>}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {this.state.edit && (
          <div key={t._id} className="row">
            <div className="col s12 m12 center">
              <div className="card  pink darken-1 ">
                <div
                  className="card-content white-text"
                  onClick={changeCurrentTimeline}
                >
                  <span className="card-title">
                    <label htmlFor="title" className="label">
                      title:
                    </label>
                    <input
                      onChange={(e) => onTimelineInputChange(e, t._id)}
                      id="title"
                      name="title"
                      type="text"
                      placeholder={t.title}
                    />
                  </span>
                  <p>
                    <label htmlFor="description" className="label">
                      description:
                    </label>
                    <input
                      onChange={(e) => onTimelineInputChange(e, t._id)}
                      id="description"
                      name="description"
                      type="text"
                      placeholder={t.description}
                    />
                  </p>
                  <p>
                    <label htmlFor="start" className="label">
                      start:
                    </label>
                    <input
                      onChange={(e) => onTimelineInputChange(e, t._id)}
                      id="sart"
                      name="start"
                      type="date"
                      placeholder={t.start}
                    />
                  </p>
                  <p>
                    <label htmlFor="end" className="label">
                      end:
                    </label>
                    <input
                      onChange={(e) => onTimelineInputChange(e, t._id)}
                      id="sart"
                      name="end"
                      type="date"
                      placeholder={t.end}
                    />
                  </p>
                </div>
                {isOpen && (
                  <div className="card-action">
                    <button
                      onClick={() => {
                        this.switchEdit();
                        editTimeline();
                      }}
                    >
                      save
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
