import React, { Children } from "react";
import PropTypes from "prop-types";

function Cell({ id = "", label = "", children }) {
  return (
    <div className="cell" id={id}>
      {label && <span className="label">{label}</span>}
      {children}
    </div>
  );
}

Cell.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.node,
};

export default Cell;
