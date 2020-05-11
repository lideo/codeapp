import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";

import { Grid, Resizer, Cell } from "./components/Grid";
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

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

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
    localStorage.setItem(htmlCodeKey, htmlCode);
    localStorage.setItem(cssCodeKey, cssCode);
    localStorage.setItem(jsCodeKey, jsCode);
  }, [htmlCode, cssCode, jsCode]);

  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      resetSizes();
    }, 100);
    window.addEventListener("resize", debouncedHandleResize);

    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  const noResizer = {
    isResizing: false,
    type: null,
    id: null,
  };

  const resizer = useRef(noResizer);

  function setResizeCursor(cursor) {
    document.querySelector("body").style.cursor = cursor;
  }

  function handleStartResize(event, resizerType, resizerId) {
    resizer.current = {
      isResizing: true,
      type: resizerType,
      id: resizerId,
    };

    const cursor = resizerType === "horizontal" ? "row-resize" : "col-resize";
    setResizeCursor(cursor);

    document.getElementById("previewArea").style.zIndex = -1;
  }

  function handleEndResize(event) {
    resizer.current = noResizer;

    setResizeCursor("auto");

    document.getElementById("previewArea").style.zIndex = "initial";
  }

  function computeSizes(
    resizerElementSize,
    prevIndex,
    nextIndex,
    cursorPosition,
    prevOffset,
    sizes
  ) {
    sizes = sizes.map((size) => parseFloat(size));

    let sizesNew = JSON.parse(JSON.stringify(sizes));
    let diff =
      cursorPosition - prevOffset - resizerElementSize - sizes[prevIndex];

    sizesNew[prevIndex] = sizesNew[prevIndex] + diff;
    sizesNew[nextIndex] = sizesNew[nextIndex] - diff;
    sizesNew = sizesNew.map((size) => size.toString() + "px").join(" ");

    return sizesNew;
  }

  function resetSizes() {
    const allGrids = document.querySelectorAll(".grid-container");

    allGrids.forEach((grid) => {
      grid.style.gridTemplateRows = "";
      grid.style.gridTemplateColumns = "";
    });
  }

  function handleResize(event) {
    if (resizer.current.isResizing) {
      const resizerElement = document.getElementById(resizer.current.id);
      const prevElement = resizerElement.previousSibling;
      const nextElement = resizerElement.nextSibling;
      const parentGrid = resizerElement.parentNode;
      const areas = getComputedStyle(parentGrid)
        .gridTemplateAreas.split('"')
        .join("")
        .split(" ");

      if (resizer.current.type === "horizontal") {
        let sizes = getComputedStyle(parentGrid).gridTemplateRows.split(" ");

        const sizesNew = computeSizes(
          resizerElement.clientHeight,
          areas.indexOf(prevElement.id),
          areas.indexOf(nextElement.id),
          event.clientY,
          prevElement.offsetTop,
          sizes
        );

        parentGrid.style.gridTemplateRows = sizesNew;
      } else {
        // Vertical
        let sizes = getComputedStyle(parentGrid).gridTemplateColumns.split(" ");

        const sizesNew = computeSizes(
          resizerElement.clientWidth,
          areas.indexOf(prevElement.id),
          areas.indexOf(nextElement.id),
          event.clientX,
          prevElement.offsetLeft,
          sizes
        );

        parentGrid.style.gridTemplateColumns = sizesNew;
      }

      event.preventDefault();
    }
  }

  return (
    <Grid
      className="main-grid"
      onMouseUpCallback={handleEndResize}
      onMouseMoveCallback={handleResize}
    >
      <Cell id="editorArea">
        <Grid className="editor-grid">
          <Cell id="htmlEditor">
            <Editor
              mode="xml"
              autofocus={true}
              onChange={handleChange}
              value={initialValues.htmlCode}
              ref={htmlCodeEditorRef}
            />
          </Cell>
          <Resizer
            id="resizer2"
            type="horizontal"
            onMouseDownCallback={handleStartResize}
          />
          <Cell id="cssEditor">
            <Editor
              mode="css"
              onChange={handleChange}
              value={initialValues.cssCode}
              ref={cssCodeEditorRef}
            />
          </Cell>
          <Resizer
            id="resizer3"
            type="horizontal"
            onMouseDownCallback={handleStartResize}
          />
          <Cell id="jsEditor">
            <Editor
              mode="javascript"
              onChange={handleChange}
              value={initialValues.jsCode}
              ref={jsCodeEditorRef}
            />
          </Cell>
        </Grid>
      </Cell>
      <Resizer
        id="resizer1"
        type="vertical"
        onMouseDownCallback={handleStartResize}
      />
      <Cell id="previewArea">
        <Preview cssCode={cssCode} htmlCode={htmlCode} jsCode={jsCode} />
      </Cell>
    </Grid>
  );
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
