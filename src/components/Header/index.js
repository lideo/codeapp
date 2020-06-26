import React, { useState } from "react";
import PropTypes from "prop-types";

import Modal from "../Modal";
import Download from "../Download";

function Header({ onDownload }) {
  const [helpVisible, setHelpVisible] = useState(false);

  function toggleShowHelp(event) {
    setHelpVisible(!helpVisible);
  }
  return (
    <header>
      <h1>
        Code<span>App</span>
      </h1>
      <nav>
        <ul>
          <li>
            <Download handleDownload={onDownload} />
          </li>
          <li>
            <button type="button" onClick={toggleShowHelp}>
              Help
            </button>
          </li>
        </ul>
      </nav>

      <Modal show={helpVisible} onCloseCallback={toggleShowHelp} title="Help">
        <p>
          Your changes are stored in the browser&apos;s localStorage, if
          available.
        </p>
        <h3>Keyboard shortcuts</h3>
        <dl>
          <dt>
            <kbd>Cmd</kbd>
            <kbd>s</kbd> / <kbd>Ctrl</kbd>
            <kbd>s</kbd>
          </dt>
          <dd>Download your code.</dd>
          <dt>
            <kbd>Ctrl</kbd>
            <kbd>Space</kbd>
          </dt>
          <dd>Activate autocomplete on current editor.</dd>
          <dt>
            <kbd>Esc</kbd>
          </dt>
          <dd>Close this modal.</dd>
        </dl>
        <p>
          <a
            href="https://github.com/lideo/codeapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </p>
      </Modal>
    </header>
  );
}

Header.propTypes = {
  onDownload: PropTypes.func,
};

Header.defaultProps = {
  onDownload: () => {},
};

export default Header;
