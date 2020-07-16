import React, { Fragment } from "react";
import "./event.css";

const QuestionSection = () => {
  return (
    <Fragment>
      <div className="col s12 l5 eve_lt_sec">
        <h3>Problem ...</h3>
        <h5>Question Title</h5>
        <p>Points :- Question Points</p>
        <div className="grey-text">
          <p className="">question statement</p>
        </div>
      </div>
    </Fragment>
  );
};

export default QuestionSection;
