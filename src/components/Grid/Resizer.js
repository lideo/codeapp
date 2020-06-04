import React, { Children } from "react";
import PropTypes from "prop-types";

const Resizer = React.forwardRef(
  ({ id = "", type, onMouseDownCallback = () => {} }, ref) => {
    return (
      <div
        ref={ref}
        className={`resizer ${type}`}
        id={id}
        onMouseDown={(event) => {
          onMouseDownCallback(event, type, id, ref);
        }}
      />
    );
  }
);
Resizer.displayName = "Resizer";

Resizer.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  onMouseDownCallback: PropTypes.func,
};

export default Resizer;
