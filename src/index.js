import React, { Fragment, useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";

import { saveAs } from "file-saver";

import Header from "./components/Header";
import Grid from "./components/Grid";
import Editor from "./components/Editor";
import Preview from "./components/Preview";

import {
  storageAvailable,
  generateHtmlCode,
  generateCssCode,
  generateJsCode,
  generateFileName,
} from "./utils";

const htmlCodeKey = "codeapp:htmlCode";
const cssCodeKey = "codeapp:cssCode";
const jsCodeKey = "codeapp:jsCode";

export function getInitialCode(key, fallbackCodeGenerator) {
  return storageAvailable("localStorage") && localStorage.getItem(key)
    ? localStorage.getItem(key)
    : fallbackCodeGenerator();
}

const initialValues = {
  htmlCode: getInitialCode(htmlCodeKey, generateHtmlCode),
  cssCode: getInitialCode(cssCodeKey, generateCssCode),
  jsCode: getInitialCode(jsCodeKey, generateJsCode),
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

  function handleDownload(event, downloadButtonRef) {
    const htmlCode2Save = localStorage.getItem(htmlCodeKey);
    const cssCode2Save = localStorage.getItem(cssCodeKey);
    const jsCode2Save = localStorage.getItem(jsCodeKey);

    const content = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${cssCode2Save}</style>
      </head>
      <body>${htmlCode2Save}
      <script>${jsCode2Save}</script>
      </body>
    </html>`;

    try {
      var isFileSaverSupported = !!new Blob();
    } catch (error) {
      console.error("This browser doesn't support file saving.\n", error);
    }

    if (isFileSaverSupported) {
      const fileName = generateFileName();
      const blob = new Blob([content], {
        type: "text/html;charset=utf-8",
      });
      saveAs.saveAs(blob, fileName);
    }
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
      <Header onDownload={handleDownload} />
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
