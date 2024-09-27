import React from "react";

// Toolbar component that renders the top bar with application name, rotate button, and file upload button
const Toolbar = ({ fileName, triggerFileInputClick, onRotate }) => {
  return (
    <div className="toolbar">
      {/* Displays the application name on the left side of the toolbar */}
      <div className="app-name">Shape Editor</div>

      {/* Center section of the toolbar containing the rotate button */}
      <div className="toolbar-center">
        {/* Rotate button to trigger shape rotation when clicked */}
        <button className="rotate-button" onClick={onRotate}>
          &#x21bb; Rotate {/* Unicode character for a circular arrow */}
        </button>
      </div>

      {/* Right side of the toolbar containing the file upload button */}
      <div className="toolbar-right">
        {/* Button to trigger file input click; displays the file name if a file is loaded, otherwise "Open shape file" */}
        <button className="open-file-button" onClick={triggerFileInputClick}>
          {fileName ? fileName : "Open shape file"}
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
