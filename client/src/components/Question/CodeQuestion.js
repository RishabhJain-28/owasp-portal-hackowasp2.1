import React, { Fragment } from "react";
import QuestionSection from "./QuestionSection";
import AnswerSection from "./AnswerSection";
import { connect } from "react-redux";

const CodeQuestion = ({ team: { currentQuestion } }) => {
  return (
    <Fragment>
      <div className="row">
        <QuestionSection question={currentQuestion} />
        <AnswerSection question={currentQuestion} />
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  team: state.team,
});

export default connect(mapStateToProps, {})(CodeQuestion);
