import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  startEvent,
  setCurrentQuestion,
  submitAnswer,
} from "../../actions/teamAction";

const EventPage = ({
  team: { event, questions, currentQuestion, score },
  startEvent,
  setCurrentQuestion,
  submitAnswer,
}) => {
  let history = useHistory();
  useEffect(() => {
    const eventId = history.location.pathname.split("/")[2];
    console.log(eventId);
    startEvent(eventId);
    setAnswer("");
  }, []);

  const clickHandler = (obj) => {
    console.log(obj);
    setCurrentQuestion(obj);
  };

  const [answer, setAnswer] = useState("");

  const onChange = (e) => {
    setAnswer(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    submitAnswer(currentQuestion.question._id, answer);
    setAnswer("");
  };

  return (
    <Fragment>
      <div>
        {questions.map((obj) => (
          <Link
            key={obj.question._id}
            to="#!"
            onClick={() => {
              clickHandler(obj);
            }}
          >
            Question
          </Link>
        ))}
      </div>
      {currentQuestion ? (
        <div>
          <h4>{currentQuestion.question.title}</h4>
          <p>{currentQuestion.question.statement}</p>
          <p>{currentQuestion.question.points}</p>
          <form onSubmit={onSubmit}>
            <label htmlFor="answer" />
            <input
              name="answer"
              type="text"
              onChange={onChange}
              value={answer}
            />
            <input type="submit" />
          </form>
        </div>
      ) : (
        <p>Click Question</p>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  team: state.team,
});

export default connect(mapStateToProps, {
  startEvent,
  setCurrentQuestion,
  submitAnswer,
})(EventPage);
