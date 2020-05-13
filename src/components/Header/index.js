import React, { useState } from "react";

import Modal from "../Modal";

function Header() {
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
            <button type="button" onClick={toggleShowHelp}>
              Help
            </button>
          </li>
          <li>
            <a href="https://github.com/lideo/codeapp">GitHub</a>
          </li>
        </ul>
      </nav>

      <Modal show={helpVisible} onCloseCallback={toggleShowHelp}>
        <h2>Help</h2>
        <p>Your changes are stored in the browser&apos;s localStorage.</p>
        <h3>Keyboard shortcuts</h3>
        <dl>
          <dt>
            <kbd>Ctrl</kbd>
            <kbd>Space</kbd>
          </dt>
          <dd>Activate autocomplete</dd>
        </dl>
      </Modal>
    </header>
  );
}

export default Header;
