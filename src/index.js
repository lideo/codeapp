import React, { Fragment, useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";

import Header from "./components/Header";
import Grid from "./components/Grid";
import Editor from "./components/Editor";
import Preview from "./components/Preview";

import { storageAvailable } from "./utils";

const htmlCodeKey = "codeapp:htmlCode";
const cssCodeKey = "codeapp:cssCode";
const jsCodeKey = "codeapp:jsCode";

const initialValues = {
  htmlCode: storageAvailable("localStorage")
    ? localStorage.getItem(htmlCodeKey)
      ? localStorage.getItem(htmlCodeKey)
      : ""
    : "" || "",
  cssCode: storageAvailable("localStorage")
    ? localStorage.getItem(cssCodeKey)
      ? localStorage.getItem(cssCodeKey)
      : ""
    : "" || "",
  jsCode: storageAvailable("localStorage")
    ? localStorage.getItem(jsCodeKey)
      ? localStorage.getItem(jsCodeKey)
      : ""
    : "" || "",
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

  function updatePreview() {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
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
    if (storageAvailable("localStorage")) {
      localStorage.setItem(htmlCodeKey, htmlCode);
      localStorage.setItem(cssCodeKey, cssCode);
      localStorage.setItem(jsCodeKey, jsCode);
    }
  }, [htmlCode, cssCode, jsCode]);

  const htmlEditor = (
    <Editor
      mode="text/html"
      autofocus={true}
      onChange={handleChange}
      value={initialValues.htmlCode}
      ref={htmlCodeEditorRef}
    />
  );

  const cssEditor = (
    <Editor
      mode="css"
      onChange={handleChange}
      value={initialValues.cssCode}
      ref={cssCodeEditorRef}
    />
  );

  const jsEditor = (
    <Editor
      mode="javascript"
      onChange={handleChange}
      value={initialValues.jsCode}
      ref={jsCodeEditorRef}
    />
  );

  const preview = (
    <Preview cssCode={cssCode} htmlCode={htmlCode} jsCode={jsCode} />
  );

  return (
    <Fragment>
      <Header />
      <Grid
        htmlEditor={htmlEditor}
        cssEditor={cssEditor}
        jsEditor={jsEditor}
        preview={preview}
      />
    </Fragment>
  );
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
