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
    });
    // console.log(JSON.parse(res));
    console.log(data.run_status.output);
    // console.log(data.run_status.output, "a");
    this.setState({ output: data.run_status.output });
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
        <p>{this.state.output}</p>
      </>
    );
  }
}

export default Compiler;
