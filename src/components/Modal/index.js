import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";

import Backdrop from "./Backdrop";

function Modal({ show = false, onCloseCallback = () => {}, children }) {
  const [shouldRender, setShouldRender] = useState(show);

  const handleUserKeyPress = (event) => {
    if (show && event.keyCode === 27) {
      onCloseCallback(event);
    }
  };

  useEffect(() => {
    if (show) {
      setShouldRender(true);
      window.addEventListener("keydown", handleUserKeyPress);
    }

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setShouldRender(false);
  };

  return (
    shouldRender && (
      <Fragment>
        <Backdrop show={show} onClick={onCloseCallback} />
        <div
          className={`modal ${show ? "show" : ""}`.trim()}
          onAnimationEnd={onAnimationEnd}
        >
          <div className="header">
            <button className="close" onClick={onCloseCallback}>
              <span className="with-icon">
                <svg
                  className="icon"
                  viewBox="0 0 10 10"
                  width="2em"
                  height="2em"
                  stroke="currentColor"
                  strokeWidth="2"
                  title="Close menu"
                >
                  <path d="M1,1 9,9 M9,1 1,9" />
                </svg>
                Close
              </span>
            </button>
          </div>
          <div className="content">{children}</div>
        </div>
      </Fragment>
    )
  );
}

Modal.propTypes = {
  show: PropTypes.bool,
  onCloseCallback: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
