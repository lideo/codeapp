import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import Resizer from "./Resizer";
import Cell from "./Cell";

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

const noResizer = {
  isResizing: false,
  type: null,
  id: null,
};

function Grid({
  htmlEditor = "",
  cssEditor = "",
  jsEditor = "",
  preview = "",
}) {
  const resizer = useRef(noResizer);

  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      resetSizes();
    }, 100);
    window.addEventListener("resize", debouncedHandleResize);

    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

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

    disablePreviewArea();
  }

  function handleEndResize(event) {
    resizer.current = noResizer;

    setResizeCursor("auto");

    enablePreviewArea();
  }

  function disablePreviewArea() {
    document.getElementById("previewArea").style.zIndex = -1;
  }
  function enablePreviewArea() {
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
    <div
      className="grid-container main-grid"
      onMouseUp={handleEndResize}
      onMouseMove={handleResize}
    >
      <Cell id="editorArea">
        <div className="grid-container editor-grid">
          <Cell id="htmlEditor">{htmlEditor}</Cell>
          <Resizer
            id="resizer2"
            type="horizontal"
            onMouseDownCallback={handleStartResize}
          />
          <Cell id="cssEditor">{cssEditor}</Cell>
          <Resizer
            id="resizer3"
            type="horizontal"
            onMouseDownCallback={handleStartResize}
          />
          <Cell id="jsEditor">{jsEditor}</Cell>
        </div>
      </Cell>
      <Resizer
        id="resizer1"
        type="vertical"
        onMouseDownCallback={handleStartResize}
      />
      <Cell id="previewArea">{preview}</Cell>
    </div>
  );
}

Grid.propTypes = {
  htmlEditor: PropTypes.object,
  cssEditor: PropTypes.object,
  jsEditor: PropTypes.object,
  preview: PropTypes.object,
};

export default Grid;
