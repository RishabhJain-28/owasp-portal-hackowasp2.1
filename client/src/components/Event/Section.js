import React, { Fragment } from "react";
import "./event.css";
import InputAnswer from "./InputAnswer";
import McqAnswer from "./McqAnswer";

const Section = ({ question }) => {
  let answer;
  if (question.question.type === "SINGLE") {
    answer = <InputAnswer question={question} />;
  } else if (question.question.type === "MCQ") {
    answer = <McqAnswer question={question} />;
  }
  return (
    <Fragment>
      <div className="card ind2_qcards">
        <div className="card-title ind2_qcard_title">
          {question.question.title}
        </div>
        <div className="card-content grey-text">
          <p>{question.question.statement}</p>
          <br />
          <p>Points :- {question.question.points}</p>
          <br />
          <div className="row">{answer}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default Section;
