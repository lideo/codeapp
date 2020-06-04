import React from "react";
import PropTypes from "prop-types";

import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/selection/active-line";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/scroll/simplescrollbars";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/html-hint";
import "codemirror/addon/hint/css-hint";

const Editor = React.forwardRef(({ mode, autofocus, onChange, value }, ref) => {
  const defaultOptions = {
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    theme: "monokai",
    gutter: true,
    lineWrapping: true,
    scrollbarStyle: "simple",
    screenReaderLabel: `${mode} Editor`,
    autocorrect: true,
    extraKeys: { "Ctrl-Space": "autocomplete" },
  };

  const options = Object.assign(
    {
      mode: mode,
    },
    defaultOptions
  );

  return (
    <CodeMirror
      value={value}
      options={options}
      onChange={onChange}
      ref={ref}
      editorDidMount={(editor) => {
        if (autofocus) {
          editor.focus();
        }
      }}
    />
  );
});
Editor.displayName = "Editor";

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
