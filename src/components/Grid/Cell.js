import React, { Children } from "react";
import PropTypes from "prop-types";

function Cell({ id = "", children }) {
  return (
    <div className="cell" id={id}>
      {children}
    </div>
  );
}

Cell.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
};

export default Cell;
