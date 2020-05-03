import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";

import Editor from "./components/Editor";
import Preview from "./components/Preview";

function App() {
  const htmlCodeRef = useRef(localStorage.getItem("codeapp:htmlCode") || "");
  const cssCodeRef = useRef(localStorage.getItem("codeapp:cssCode") || "");
  const jsCodeRef = useRef(localStorage.getItem("codeapp:jsCode") || "");
  const timeoutRef = useRef(null);
  const previewReload = useRef(3000);

  const [htmlCode, setHtmlCode] = useState(htmlCodeRef.current);
  const [cssCode, setCssCode] = useState(cssCodeRef.current);
  const [jsCode, setJsCode] = useState(jsCodeRef.current);

  function updatePreview(editor, setCodeCb) {
    if (timeoutRef.current !== null) {
      return;
    }
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;

      console.log(Date.now(), "updating...");

      setCodeCb(editor.getValue());
    }, previewReload.current);
  }

  function handleHtmlChange(editor, data, value) {
    updatePreview(editor, setHtmlCode);
  }

  function handleCssChange(editor, data, value) {
    updatePreview(editor, setCssCode);
  }

  function handleJsChange(editor, data, value) {
    updatePreview(editor, setJsCode);
  }

  useEffect(() => {
    localStorage.setItem("codeapp:htmlCode", htmlCode);
  }, [htmlCode]);

  useEffect(() => {
    localStorage.setItem("codeapp:cssCode", cssCode);
  }, [cssCode]);

  useEffect(() => {
    localStorage.setItem("codeapp:jsCode", jsCode);
  }, [jsCode]);

  return (
    <React.Fragment>
      <div className="grid-container">
        <Editor
          mode="xml"
          autofocus={true}
          onChange={handleHtmlChange}
          value={htmlCodeRef.current}
        />
        <Editor
          mode="css"
          onChange={handleCssChange}
          value={cssCodeRef.current}
        />
        <Editor
          mode="javascript"
          onChange={handleJsChange}
          value={jsCodeRef.current}
        />
        <Preview cssCode={cssCode} htmlCode={htmlCode} jsCode={jsCode} />
      </div>
    </React.Fragment>
  );
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
