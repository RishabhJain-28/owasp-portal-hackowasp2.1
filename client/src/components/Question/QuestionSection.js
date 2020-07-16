import React, { Fragment } from "react";

const QuestionSection = ({ question }) => {
  return (
    <Fragment>
      <div className="col s12 l5 eve_lt_sec">
        <h3>Question...</h3>
        <h5 className="grey-text">{question.question.title}</h5>
        <div className="grey-text">
          <p>{question.question.statement}</p>
          <p>{question.question.points}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default QuestionSection;
