import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import FocusTrap from "focus-trap-react";

import Backdrop from "./Backdrop";

function Modal({
  show = false,
  title = "",
  onCloseCallback = () => {},
  children,
}) {
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

  const icon = (
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
  );

  return (
    shouldRender && (
      <Fragment>
        <Backdrop show={show} onClick={onCloseCallback} />
        <FocusTrap
          focusTrapOptions={{
            allowOutsideClick: true,
            clickOutsideDeactivates: true,
          }}
        >
          <div
            role="dialog"
            aria-labelledby="modal-title"
            className={`modal ${show ? "show" : ""}`.trim()}
            onAnimationEnd={onAnimationEnd}
          >
            <div className="header">
              <button className="close" onClick={onCloseCallback}>
                <span className="with-icon">{icon} Close</span>
              </button>
            </div>
            <div className="content">
              {title && <h2 id="modal-title">{title}</h2>}
              {children}
            </div>
          </div>
        </FocusTrap>
      </Fragment>
    )
  );
}

Modal.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string,
  onCloseCallback: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
