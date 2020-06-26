import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

import { useHotkeys } from "react-hotkeys-hook";

function Download({ handleDownload }) {
  const ref = useRef(null);

  useHotkeys(
    "control+s, command+s",
    (event, handler) => {
      event.preventDefault();
      ref.current.click();
    },
    {
      filter: (event) => {
        return true;
      },
      // Need to listen for keydown events:
      // https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event
      // "Unlike the keypress event, the keydown event is fired for all keys, regardless of whether they produce a character value."
      keydown: true,
    }
  );

  useEffect(() => {
    // Listen for a message event from the preview iframe
    // to trigger the download event. It means the save
    // key combination was typedi while the preview area
    // was focused

    function handleTriggerDownload(event) {
      if (
        event.origin == window.location.origin &&
        event.data == "triggerDownload"
      ) {
        ref.current.click();
      }
    }

    window.addEventListener("message", handleTriggerDownload);

    return () => {
      window.removeEventListener("message", handleTriggerDownload);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={(event) => {
        handleDownload(event, ref);
      }}
      ref={ref}
    >
      Download your code
    </button>
  );
}

Download.propTypes = {
  handleDownload: PropTypes.func,
};

Download.defaultProps = {
  handleDownload: () => {},
};

export default Download;
