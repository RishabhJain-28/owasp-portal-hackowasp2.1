import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./event.css";
import InputAnswer from "./InputAnswer";
import McqAnswer from "./McqAnswer";
import { setCurrentQuestion } from "../../actions/teamAction";
import { connect } from "react-redux";

const Section = ({ team: {}, setCurrentQuestion, question }) => {
  const linkClick = (e) => {
    setCurrentQuestion(question);
  };
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
        {question.question.type === "CODE" ? (
          <div className="card-content grey-text">
            Click To View Question
            <div className="right">
              <Link
                to={`/code/${question.question._id}`}
                className="btn  green white-text"
                onClick={linkClick}
              >
                Solve Challenge
              </Link>
            </div>
          </div>
        ) : (
          <div className="card-content grey-text">
            <p>{question.question.statement}</p>
            <br />
            <p>Points :- {question.question.points}</p>
            <br />
            <div className="row">{answer}</div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  team: state.team,
});

export default connect(mapStateToProps, { setCurrentQuestion })(Section);
