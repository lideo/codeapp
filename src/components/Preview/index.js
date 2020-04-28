import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function Preview({ cssCode, htmlCode, jsCode }) {
  const iframeRef = useRef(null);

  function updateIframe() {
    const iframe = iframeRef.current;
    var win = iframe.contentWindow;
    var doc = iframe.contentDocument
      ? iframe.contentDocument
      : iframe.contentWindow.document;

    const iframeContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>${htmlCode}
        <script>${jsCode}</script>
        </body>
      </html>
    `;

    doc.open();
    doc.write(iframeContent);
    doc.close();
  }

  useEffect(() => {
    updateIframe();
  }, [cssCode, htmlCode, jsCode]);

  return <iframe className="preview" ref={iframeRef}></iframe>;
}

Preview.propTypes = {
  cssCode: PropTypes.string,
  htmlCode: PropTypes.string,
  jsCode: PropTypes.string,
};

export default Preview;
