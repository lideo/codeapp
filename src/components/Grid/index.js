import React, { Children } from "react";
import PropTypes from "prop-types";

import Resizer from "./Resizer";
import Cell from "./Cell";

function Grid({
  children,
  className = "",
  onMouseUpCallback = () => {},
  onMouseMoveCallback = () => {},
}) {
  function getTemplateAreas(areas) {
    const rows = areas.map((row) => row.join(" "));
    const columns = rows.join("' '");
    return "'" + columns + "'";
  }

  return (
    <div
      className={`grid-container ${className}`}
      onMouseUp={onMouseUpCallback}
      onMouseMove={onMouseMoveCallback}
    >
      {children}
    </div>
  );
}

Grid.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onMouseUpCallback: PropTypes.func,
  onMouseMoveCallback: PropTypes.func,
};

export { Grid, Resizer, Cell };
