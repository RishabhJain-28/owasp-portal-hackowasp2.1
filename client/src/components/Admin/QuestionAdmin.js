import React, { Component } from "react";
import axios from "axios";

class QuestionAdmin extends Component {
  state = {
    questions: [],
    current: {
      title: "",
      statement: "",
      type: "",
      answer: "",
      points: 0,
      forEvent: this.props.match.params.id,
    },
  };
  async componentDidMount() {
    const { data } = await axios.get(
      `https://owasp-portal-hackowasp21.herokuapp.com/api/question/eventQuestions/${this.props.match.params.id}`
    );
    console.log(data);
    this.setState({ questions: data });
  }
  onChange = (e) => {
    const current = { ...this.state.current };
    current[e.target.name] = e.target.value;
    this.setState({ current });
  };
  createQuestion = async () => {
    const questions = [...this.state.questions];
    const { data } = await axios.post(
      "https://owasp-portal-hackowasp21.herokuapp.com/api/question/new",
      this.state.current
    );
    console.log(data);
    questions.push(data);
    this.setState({ questions });
  };
  deleteQuestion = async (id) => {
    let questions = [...this.state.questions];
    const { data } = await axios.delete(
      `https://owasp-portal-hackowasp21.herokuapp.com/api/question/delete/${id}`,
      this.state.current
    );
    console.log(data);

    questions = questions.filter((q) => q._id !== id);

    this.setState({ questions });
  };
  render() {
    return (
      <>
        <div className="row">
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Add question</span>
                <label htmlFor="title" className="label">
                  Title:
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="title...."
                  onChange={this.onChange}
                />
                <label htmlFor="statement" className="label">
                  Statement:
                </label>
                <input
                  id="statement"
                  name="statement"
                  type="text"
                  placeholder="statement..."
                  onChange={this.onChange}
                />
                <label htmlFor="type" className="label">
                  Type:
                </label>
                <input
                  id="type"
                  name="type"
                  type="text"
                  placeholder="type..."
                  onChange={this.onChange}
                />
                <label htmlFor="answer" className="label">
                  Answer:
                </label>
                <input
                  id="answer"
                  name="answer"
                  type="text"
                  placeholder="answer..."
                  onChange={this.onChange}
                />
                <label htmlFor="points" className="label">
                  points:
                </label>
                <input
                  id="points"
                  name="points"
                  type="text"
                  placeholder="points..."
                  onChange={this.onChange}
                />
              </div>
              <div className="card-action">
                <button onClick={this.createQuestion}>Add question</button>
              </div>
            </div>
          </div>
        </div>
        <ul>
          {this.state.questions.map((question) => (
            <li key={question._id}>
              <div className="row">
                <div className="col s12 m6">
                  <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                      <span className="card-title">{question.title}</span>
                      <p>{question.statement}</p>
                      <p>type: {question.type}</p>
                      <p>answer: {question.answer}</p>
                      <p>points: {question.points}</p>
                    </div>
                    <div className="card-action">
                      <button onClick={() => this.deleteQuestion(question._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default QuestionAdmin;
