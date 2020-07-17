import React, { Component } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import axios from "axios";

import M from "materialize-css/dist/js/materialize.min.js";

class Compiler extends Component {
  state = {
    languages: ["PYTHON", "JAVASCRIPT_NODE", "CPP14"],
    value: `print('abc')
  `,
    output: "",
    input: "",
    current_lang: "PYTHON",
  };
  componentDidMount() {
    M.AutoInit();
  }
  onChange = (value) => {
    this.setState({ value });
  };
  runCode = async () => {
    const { data } = await axios.post(
      // "https://owasp-portal-hackowasp21.herokuapp.com/api/compile",
      "http://localhost:5000/api/compile",
      {
        code: this.state.value,
        input: this.state.input,
        lang: this.state.current_lang,
      }
    );
    console.log(data.run_status.output);
    console.log(data);
    this.setState({ output: data.run_status.output });
  };
  submit = async () => {
    let { data: compiled } = await axios.post(
      // "https://owasp-portal-hackowasp21.herokuapp.com/api/compile",
      "/api/compile/submitCode",
      {
        code: this.state.value,
        input: this.state.input,
        lang: this.state.current_lang,
      }
    );
    console.log(compiled.run_status.output);
    console.log(compiled);
    const id = 1;
    let { data } = await axios.post(
      // "https://owasp-portal-hackowasp21.herokuapp.com/api/compile",
      `/api/team/submit/${id}`,
      {
        submittedAnswer: compiled.run_status.output,
      }
    );
    alert(data);
  };
  onInputChange = (e) => {
    this.setState({ input: e.target.value });
  };
  selectLanguage = (e) => {
    this.setState({ current_lang: e.target.value });
  };
  getMode = () => {
    const lang = this.state.current_lang;
    if (lang === "PYTHON") return "python";
    if (lang === "CPP14") return "";
    if (lang === "JAVASCRIPT_NODE") return "javascript";
  };
  render() {
    return (
      <>
        <div class="input-field col s12">
          <select onChange={this.selectLanguage}>
            {/* <option value="" disabled selected>
              Choose your option
            </option> */}
            {this.state.languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <label>Select language</label>
        </div>
        <AceEditor
          placeholder="Placeholder Text"
          mode={this.getMode()}
          theme="monokai"
          name="blah2"
          onLoad={this.onLoad}
          onChange={this.onChange}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={this.state.value}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
        <button onClick={this.runCode}>run</button>
        <button onClick={this.submit}>Submit</button>
        <br />
        <label htmlFor="input">Input</label>
        <input
          // value={this.state.input}
          onChange={this.onInputChange}
          id="input"
          type="text"
        />
        <p>{this.state.output}</p>
      </>
    );
  }
}

export default Compiler;
