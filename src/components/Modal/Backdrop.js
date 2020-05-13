import React from "react";
import PropTypes from "prop-types";

function Backdrop({ show, onClick = () => {} }) {
  return show ? <div className="backdrop" onClick={onClick}></div> : null;
}

Backdrop.propTypes = {
  show: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Backdrop;
