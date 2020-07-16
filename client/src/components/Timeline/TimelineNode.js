import React, { Component } from "react";

class TimelineNode extends Component {
  state = {
    edit: false,
  };
  editNode = () => {
    this.setState({ edit: !this.state.edit });
  };
  save = (id) => {
    this.props.editNode(id);
    this.editNode();
  };
  render() {
    const { node, onNodeInputChange, deleteNode, markNode } = this.props;
    node.end = new Date(node.end).toLocaleDateString();
    return (
      <React.Fragment>
        {this.state.edit && (
          <React.Fragment>
            <div className="content">
              <h3>
                <label htmlFor="title" className="label">
                  title:
                </label>
                <input
                  onChange={(e) => onNodeInputChange(e, node._id)}
                  id="title"
                  name="title"
                  type="text"
                  className="white"
                  placeholder={node.title}
                />
              </h3>
              <p>
                <label htmlFor="content" className="label">
                  content:
                </label>
                <input
                  onChange={(e) => onNodeInputChange(e, node._id)}
                  id="content"
                  name="description"
                  type="text"
                  className="white"
                  placeholder={node.description}
                />
              </p>
            </div>

            <div className="date">
              <input
                onChange={(e) => onNodeInputChange(e, node._id)}
                id="date"
                name="end"
                type="date"
                className="white"
                placeholder={node.end}
              />
            </div>

            <button onClick={() => this.save(node._id)}>save</button>
          </React.Fragment>
        )}
        {!this.state.edit && (
          <React.Fragment>
            <div className="content ">
              <h3 className={node.done ? "green" : ""}>{node.title}</h3>
              <p className={node.done ? "green" : ""}>{node.description}</p>
            </div>
            <div className="point" />
            <div className="date">
              <h4 className={node.done ? "green" : ""}>{node.end}</h4>
              {!node.done && (
                <button onClick={() => markNode(node._id)}>mark</button>
              )}
              <button onClick={() => deleteNode(node._id)}>delete</button>
              <button onClick={this.editNode}>edit</button>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default TimelineNode;
