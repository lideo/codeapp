import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";

import Editor from "./components/Editor";
import Preview from "./components/Preview";

const htmlCodeKey = "codeapp:htmlCode";
const cssCodeKey = "codeapp:cssCode";
const jsCodeKey = "codeapp:jsCode";

const initialValues = {
  htmlCode: localStorage.getItem(htmlCodeKey) || "",
  cssCode: localStorage.getItem(cssCodeKey) || "",
  jsCode: localStorage.getItem(jsCodeKey) || "",
};

const previewReloadDelay = 3000;

function App() {
  const [htmlCode, setHtmlCode] = useState(initialValues.htmlCode);
  const [cssCode, setCssCode] = useState(initialValues.cssCode);
  const [jsCode, setJsCode] = useState(initialValues.jsCode);

  const htmlCodeEditorRef = useRef(null);
  const cssCodeEditorRef = useRef(null);
  const jsCodeEditorRef = useRef(null);
  const timeoutRef = useRef(null);

  function debounceFunction(func, delay) {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(func, delay);
  }

  function updatePreview() {
    debounceFunction(() => {
      console.log(Date.now(), "updating...");

      setHtmlCode(htmlCodeEditorRef.current.editor.getValue());
      setCssCode(cssCodeEditorRef.current.editor.getValue());
      setJsCode(jsCodeEditorRef.current.editor.getValue());
    }, previewReloadDelay);
  }

  function handleChange() {
    updatePreview();
  }

  useEffect(() => {
    localStorage.setItem(htmlCodeKey, htmlCode);
    localStorage.setItem(cssCodeKey, cssCode);
    localStorage.setItem(jsCodeKey, jsCode);
  }, [htmlCode, cssCode, jsCode]);

  return (
    <React.Fragment>
      <div className="grid-container">
        <Editor
          mode="xml"
          autofocus={true}
          onChange={handleChange}
          value={initialValues.htmlCode}
          ref={htmlCodeEditorRef}
        />
        <Editor
          mode="css"
          onChange={handleChange}
          value={initialValues.cssCode}
          ref={cssCodeEditorRef}
        />
        <Editor
          mode="javascript"
          onChange={handleChange}
          value={initialValues.jsCode}
          ref={jsCodeEditorRef}
        />
        <Preview cssCode={cssCode} htmlCode={htmlCode} jsCode={jsCode} />
      </div>
    </React.Fragment>
  );
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
