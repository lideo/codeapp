import React, { Children } from "react";
import PropTypes from "prop-types";

const Cell = React.forwardRef(({ id = "", label = "", children }, ref) => {
  return (
    <div className="cell" id={id} ref={ref}>
      {label && <span className="label">{label}</span>}
      {children}
    </div>
  );
});
Cell.displayName = "Cell";

Cell.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.node,
};

export default Cell;
