import React, { useState } from "react";
import PropTypes from "prop-types";
import ShapeForm from "./ShapeForm";

// LeftMenu component provides a sidebar for managing files, adding shapes, saving shapes, and resetting the viewport
const LeftMenu = ({
  openedFiles = [],
  onShapeSubmit,
  onSaveAs,
  onReset,
  shapes,
}) => {
  const [showForm, setShowForm] = useState(false); // State to control the visibility of the shape form

  // Function handles saving shapes to a file
  const handleSaveAs = () => {
    const fileName = prompt("Enter a file name to save as:");
    if (fileName) {
      onSaveAs(fileName);
    }
  };

  return (
    <div className="left-menu">
      {/* Display list of opened files */}
      <ul>
        {openedFiles.length === 0 ? (
          <li>No files opened</li> // Show this message if no files are opened
        ) : (
          openedFiles.map((file, index) => <li key={index}>{file}</li>) // Render a list item for each opened file
        )}
      </ul>

      {/* Button to toggle shape form visibility */}
      <button onClick={() => setShowForm(!showForm)} className="button">
        {showForm ? "Close Form" : "Add Shape"}
      </button>

      {/* Render the shape form when showForm is true */}
      {showForm && <ShapeForm onShapeSubmit={onShapeSubmit} />}

      {/* Save as button with tooltip if no shapes are present */}
      <div className="tooltip-wrapper">
        <button
          onClick={handleSaveAs}
          disabled={shapes.length === 0} // Disables the button if there are no shapes
          className="button"
        >
          Save as
        </button>
        {/* Tooltip message if save button is disabled */}
        {shapes.length === 0 && (
          <span className="tooltip-text">Add shapes to save the file</span>
        )}
      </div>

      {/* Button to reset the viewport */}
      <button onClick={onReset} className="button">
        Reset
      </button>
    </div>
  );
};

// PropTypes for type checking of props passed to LeftMenu
LeftMenu.propTypes = {
  openedFiles: PropTypes.array,
  onShapeSubmit: PropTypes.func.isRequired,
  onSaveAs: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  shapes: PropTypes.array.isRequired,
};

export default LeftMenu;
