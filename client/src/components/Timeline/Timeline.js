import React from "react";
import TimelineNode from "./TimelineNode";

const Timeline = ({
  timeline,
  onNodeInputChange,
  editNode,
  addNode,
  deleteNode,
  markNode,
}) => {
  return (
    <React.Fragment>
      <div className="event">
        <button className="button  js_1"> {timeline.title}</button>
        <div className="timeline jsgo_1">
          <ul>
            {timeline.nodes &&
              timeline.nodes.map((node) => (
                <li key={node._id}>
                  <TimelineNode
                    onNodeInputChange={onNodeInputChange}
                    editNode={editNode}
                    deleteNode={deleteNode}
                    markNode={markNode}
                    node={node}
                  />
                </li>
              ))}
          </ul>
        </div>
        <button onClick={addNode}>add node</button>
      </div>
    </React.Fragment>
  );
};

export default Timeline;
