import React, { Fragment, useEffect, useState } from "react";
import Compiler from "../Compiler";
import { connect } from "react-redux";
import { submitAnswer } from "../../actions/teamAction";
import M from "materialize-css/dist/js/materialize.min.js";

const AnswerSection = ({ team: { alert }, submitAnswer, question }) => {
  useEffect(() => {
    if (alert) {
      M.toast({ html: alert.toString() });
    }
  }, [alert]);

  const [answer, setAnswer] = useState("");

  const onChange = (e) => {
    setAnswer(e.target.value.toString());
  };

  const onSubmit = (e) => {
    e.preventDefault();
    submitAnswer(question.question._id, answer);
  };

  return (
    <Fragment>
      <div className="col s12 l7 eve_rt_sec">
        <div className="card blur lighten-5">
          <br /> <br /> <br />
          <div className="">
            <div className="white black-text container eve_rt_container">
              <Compiler />
            </div>
            <br />
            <div className="row">
              <form className="col s12" onSubmit={onSubmit}>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      name="answer"
                      type="text"
                      onChange={onChange}
                      value={answer}
                    />
                    <label htmlFor="answer" className="active">
                      Your answer goes here
                    </label>
                    <input
                      type="submit"
                      value="Submit"
                      className="btn blue right"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  team: state.team,
});

export default connect(mapStateToProps, { submitAnswer })(AnswerSection);
