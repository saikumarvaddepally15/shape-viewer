import React from "react";

const Toolbar = ({ fileName, triggerFileInputClick, onRotate }) => {
  return (
    <div className="toolbar">
      <div className="app-name">Shape Editor</div>
      <div className="toolbar-center">
        <button className="rotate-button" onClick={onRotate}>
          &#x21bb; Rotate
        </button>
      </div>
      <div className="toolbar-right">
        <button className="open-file-button" onClick={triggerFileInputClick}>
          {fileName ? fileName : "Open shape file"}
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
