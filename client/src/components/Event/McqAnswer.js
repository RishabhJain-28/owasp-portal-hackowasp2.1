import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { submitAnswer } from "../../actions/teamAction";

const McqAnswer = ({ team: {}, submitAnswer, question }) => {
  const [answer, setAnswer] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(answer);
    submitAnswer(question.question._id, answer);
  };
  const onChange = (e) => {
    console.log("changed");
    setAnswer(e.target.name.toString());
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <p>
          <label>
            <input
              name={question.question.options[0]}
              type="radio"
              onChange={onChange}
              checked={answer === question.question.options[0].toString()}
            />
            <span>{question.question.options[0]}</span>
          </label>
        </p>
        <p>
          <label>
            <input
              name={question.question.options[1]}
              type="radio"
              onChange={onChange}
              checked={answer === question.question.options[1].toString()}
            />
            <span>{question.question.options[1]}</span>
          </label>
        </p>
        <p>
          <label>
            <input
              name={question.question.options[2]}
              type="radio"
              onChange={onChange}
              checked={answer === question.question.options[2].toString()}
            />
            <span>{question.question.options[2]}</span>
          </label>
        </p>
        <p>
          <label>
            <input
              name={question.question.options[3]}
              type="radio"
              onChange={onChange}
              checked={answer === question.question.options[3].toString()}
            />
            <span>{question.question.options[3]}</span>
          </label>
        </p>
        <input type="submit" value="Submit" className="btn blue right" />
      </form>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  team: state.team,
});

export default connect(mapStateToProps, { submitAnswer })(McqAnswer);
