// Handles the file upload process, parsing the shape data from the uploaded file and updating the state
export const handleFileUpload = (
  e,
  setFileName,
  setShapes,
  setOpenedFiles,
  parseShapeFile
) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const parsedShapes = parseShapeFile(e.target.result); // Parsing the file content to extract shapes
      setShapes((prevShapes) => [...prevShapes, ...parsedShapes]); // Updating the shapes state with the new shapes
    };
    reader.readAsText(file);
    setFileName(file.name); // Setting the uploaded file name in state

    setOpenedFiles((prevFiles) => {
      // Updating the list of opened files if the file is not already in the list
      if (!prevFiles.includes(file.name)) {
        return [...prevFiles, file.name];
      }
      return prevFiles;
    });
  }
};

// Triggers the file input click event to open the file selector dialog
export const triggerFileInputClick = (fileInputRef) => {
  if (fileInputRef.current) {
    fileInputRef.current.click();
  }
};

// Handles the submission of a new shape, updating the state with the new shape added to the list
export const handleShapeSubmit = (newShape, setShapes) => {
  setShapes((prevShapes) => [...prevShapes, newShape]);
};

// Handles the "Save As" functionality, converting the shape data into a downloadable file
export const handleSaveAs = (fileName, shapes) => {
  const shapeData = shapes
    .map((shape) => {
      if (shape.type === "Polygon") {
        const points = shape.points.map((p) => `${p.x},${p.y}`).join(" ");
        return `Polygon, ${shape.x}, ${shape.y}, ${
          shape.zIndex || 0
        }, [${points}], ${shape.color}`;
      } else {
        return `${shape.type}, ${shape.x}, ${shape.y}, ${shape.zIndex || 0}, ${
          shape.width
        }, ${shape.height}, ${shape.color}`;
      }
    })
    .join(";\n");

  // Creates a Blob with the shape data and generate a download link
  const blob = new Blob([shapeData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.shapefile`;
  a.click();
  URL.revokeObjectURL(url); // Revoking the URL after download to free up the memory
};

// Handles resetting the state of the application, clearing all shapes, files, and selected shape
export const handleReset = (
  setShapes,
  setOpenedFiles,
  setFileName,
  setSelectedShapeIndex,
  fileInputRef
) => {
  setShapes([]); // Clear all shapes where dependence array is set to empty
  setOpenedFiles([]); // Clear the list of opened files where dependence array is set to empty
  setFileName(""); // Reset the file name where dependence arry is set to empty
  setSelectedShapeIndex(null); // Deselect any selected shape where dependence array is set to empty
  if (fileInputRef.current) {
    fileInputRef.current.value = ""; // Resets the file input
  }
};

// Handles updating the shape state with new changes, such as position or rotation
export const handleShapeUpdate = (updatedShapes, setShapes) => {
  setShapes(updatedShapes);
};

// Handles rotating a selected shape by 45 degrees
export const handleRotate = (selectedShapeIndex, shapes, handleShapeUpdate) => {
  if (selectedShapeIndex !== null) {
    const newShapes = [...shapes];
    const shape = newShapes[selectedShapeIndex];

    shape.rotation = (shape.rotation || 0) + 45; // Increment the rotation by 45 degrees

    handleShapeUpdate(newShapes); // Update the shapes state with the rotated shape
  }
};
