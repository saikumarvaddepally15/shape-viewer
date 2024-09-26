import React, { useState } from "react";
import PropTypes from "prop-types";
import ShapeForm from "./ShapeForm";

const LeftMenu = ({
  openedFiles = [],
  onShapeSubmit,
  onSaveAs,
  onReset,
  shapes,
}) => {
  const [showForm, setShowForm] = useState(false);

  const handleSaveAs = () => {
    const fileName = prompt("Enter a file name to save as:");
    if (fileName) {
      onSaveAs(fileName);
    }
  };

  return (
    <div className="left-menu">
      <ul>
        {openedFiles.length === 0 ? (
          <li>No files opened</li>
        ) : (
          openedFiles.map((file, index) => <li key={index}>{file}</li>)
        )}
      </ul>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Add Shape"}
      </button>
      {showForm && <ShapeForm onShapeSubmit={onShapeSubmit} />}
      <button onClick={handleSaveAs} disabled={shapes.length === 0}>
        Save as
      </button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};

LeftMenu.propTypes = {
  openedFiles: PropTypes.array,
  onShapeSubmit: PropTypes.func.isRequired,
  onSaveAs: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  shapes: PropTypes.array.isRequired,
};

export default LeftMenu;
