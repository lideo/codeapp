import React, { Children } from "react";
import PropTypes from "prop-types";

function Resizer({ id = "", type, onMouseDownCallback = () => {} }) {
  return (
    <div
      className={`resizer ${type}`}
      id={id}
      onMouseDown={(event) => {
        onMouseDownCallback(event, type, id);
      }}
    />
  );
}

Resizer.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  onMouseDownCallback: PropTypes.function,
};

export default Resizer;
