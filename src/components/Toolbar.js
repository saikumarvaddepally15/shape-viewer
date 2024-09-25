import React from "react";

const Toolbar = ({ fileName, triggerFileInputClick }) => {
  return (
    <div className="toolbar">
      <span className="app-name">Shape Viewer</span>
      <button className="open-file-button" onClick={triggerFileInputClick}>
        {fileName ? fileName : "Open shape file"}
      </button>
    </div>
  );
};

export default Toolbar;
