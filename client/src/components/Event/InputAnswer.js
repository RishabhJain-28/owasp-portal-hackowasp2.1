import React, { Fragment, useState, useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { connect } from "react-redux";
import { submitAnswer } from "../../actions/teamAction";

const InputAnswer = ({ team: { alert }, submitAnswer, question }) => {
  useEffect(() => {
    if (alert) {
      M.toast({ html: alert.toString() });
    }
  }, [alert]);
  const [answer, setAnswer] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    submitAnswer(question.question._id, answer);
  };
  const onChange = (e) => {
    setAnswer(e.target.value.toString());
  };
  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div className="col s12">
          <div className="input-field col s12 ind2_input">
            <textarea
              name="answer"
              className="materialize-textarea"
              onChange={onChange}
              value={answer}
            />
            <label htmlFor="answer" className="active">Your answer goes here</label>
          </div>
        </div>
        <input type="submit" value="Submit" className="btn blue right" />
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  team: state.team,
});

export default connect(mapStateToProps, { submitAnswer })(InputAnswer);
