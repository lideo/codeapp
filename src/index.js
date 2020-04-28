import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";

import Editor from "./components/Editor";
import Preview from "./components/Preview";

function App() {
  const [initialHtmlCode] = useState(localStorage.getItem("htmlCode") || "");
  const [initialCssCode] = useState(localStorage.getItem("cssCode") || "");
  const [initialJsCode] = useState(localStorage.getItem("jsCode") || "");

  const [htmlCode, setHtmlCode] = useState(initialHtmlCode);
  const [cssCode, setCssCode] = useState(initialCssCode);
  const [jsCode, setJsCode] = useState(initialJsCode);

  function handleHtmlChange(editor, data, value) {
    setHtmlCode(value);
  }

  function handleCssChange(editor, data, value) {
    setCssCode(value);
  }

  function handleJsChange(editor, data, value) {
    setJsCode(value);
  }

  useEffect(() => {
    localStorage.setItem("htmlCode", htmlCode);
    localStorage.setItem("cssCode", cssCode);
    localStorage.setItem("jsCode", jsCode);
  }, [htmlCode, cssCode, jsCode]);

  return (
    <React.Fragment>
      <div className="grid-container">
        <Editor
          mode="xml"
          autofocus={true}
          onChange={handleHtmlChange}
          value={initialHtmlCode}
        />
        <Editor mode="css" onChange={handleCssChange} value={initialCssCode} />
        <Editor
          mode="javascript"
          onChange={handleJsChange}
          value={initialJsCode}
        />
        <Preview cssCode={cssCode} htmlCode={htmlCode} jsCode={jsCode} />
      </div>
    </React.Fragment>
  );
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
