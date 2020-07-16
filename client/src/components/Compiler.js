import React, { Component } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import axios from "axios";

class Compiler extends Component {
  state = {
    languages: [],
    value: `function onLoad(editor) {
    console.log("i've loaded");
  }`,
    output: "",
    input: "",
  };
  onChange = (value) => {
    this.setState({ value });
  };
  submitCode = async () => {
    const { data } = await axios.post("http://localhost:5000/api/compile", {
      code: this.state.value,
      input: this.state.input,
    });
    console.log(data.run_status.output);
    this.setState({ output: data.run_status.output });
  };
  onInputChange = (e) => {
    this.setState({ input: e.target.value });
  };
  render() {
    return (
      <>
        <AceEditor
          placeholder="Placeholder Text"
          mode="javascript"
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
        <button onClick={this.submitCode}>Submit</button>
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
