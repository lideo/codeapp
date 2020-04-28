import React from "react";
import PropTypes from "prop-types";

import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/addon/selection/active-line";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/scroll/simplescrollbars";

function Editor({ mode, autofocus, onChange, value }) {
  const defaultOptions = {
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    theme: "monokai",
    gutter: true,
    lineWrapping: true,
    scrollbarStyle: "simple",
    htmlMode: mode === "xml" ? true : false,
    screenReaderLabel: `${mode} Editor`,
    autocorrect: true,
  };

  const options = Object.assign(
    {
      mode: mode,
    },
    defaultOptions
  );

  return (
    <div className={`codeEditor ${mode}Editor`}>
      <CodeMirror
        value={value}
        className="codeEditorInner"
        options={options}
        onChange={onChange}
        editorDidMount={(editor) => {
          if (autofocus) {
            editor.focus();
          }
        }}
      />
    </div>
  );
}

Editor.propTypes = {
  mode: PropTypes.string,
  value: PropTypes.string,
  autofocus: PropTypes.bool,
  onChange: PropTypes.func,
};

Editor.defaultProps = {
  mode: "javascript",
  onChange: () => {},
  autofocus: false,
  value: "",
};

export default Editor;
