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
      const parsedShapes = parseShapeFile(e.target.result);
      setShapes((prevShapes) => [...prevShapes, ...parsedShapes]);
    };
    reader.readAsText(file);
    setFileName(file.name);

    setOpenedFiles((prevFiles) => {
      if (!prevFiles.includes(file.name)) {
        return [...prevFiles, file.name];
      }
      return prevFiles;
    });
  }
};

export const triggerFileInputClick = (fileInputRef) => {
  if (fileInputRef.current) {
    fileInputRef.current.click();
  }
};

export const handleShapeSubmit = (newShape, setShapes) => {
  setShapes((prevShapes) => [...prevShapes, newShape]);
};

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

  const blob = new Blob([shapeData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.shapefile`;
  a.click();
  URL.revokeObjectURL(url);
};

export const handleReset = (
  setShapes,
  setOpenedFiles,
  setFileName,
  setSelectedShapeIndex,
  fileInputRef
) => {
  setShapes([]);
  setOpenedFiles([]);
  setFileName("");
  setSelectedShapeIndex(null);
  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};

export const handleShapeUpdate = (updatedShapes, setShapes) => {
  setShapes(updatedShapes);
};

export const handleRotate = (selectedShapeIndex, shapes, handleShapeUpdate) => {
  if (selectedShapeIndex !== null) {
    const newShapes = [...shapes];
    const shape = newShapes[selectedShapeIndex];

    shape.rotation = (shape.rotation || 0) + 45;

    handleShapeUpdate(newShapes);
  }
};
