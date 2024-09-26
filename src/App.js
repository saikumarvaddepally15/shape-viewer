import React, { useState, useRef } from "react";
import Toolbar from "./components/Toolbar";
import LeftMenu from "./components/LeftMenu";
import ShapeViewport from "./components/ShapeViewPort";
import { parseShapeFile } from "./utils/parseShapeFile";
import "./App.css";

const App = () => {
  const [fileName, setFileName] = useState("");
  const [shapes, setShapes] = useState([]);
  const [openedFiles, setOpenedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
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

  const triggerFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleShapeSubmit = (newShape) => {
    setShapes((prevShapes) => [...prevShapes, newShape]);
  };

  const handleSaveAs = (fileName) => {
    const shapeData = shapes
      .map((shape) => {
        if (shape.type === "Polygon") {
          const points = shape.points.map((p) => `${p.x},${p.y}`).join(" ");
          return `Polygon, ${shape.x}, ${shape.y}, ${
            shape.zIndex || 0
          }, [${points}], ${shape.color}`;
        } else {
          return `${shape.type}, ${shape.x}, ${shape.y}, ${
            shape.zIndex || 0
          }, ${shape.width}, ${shape.height}, ${shape.color}`;
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

  const handleReset = () => {
    setShapes([]);
  };

  const handleShapeUpdate = (updatedShapes) => {
    setShapes(updatedShapes);
  };

  return (
    <div className="app">
      <Toolbar
        fileName={fileName}
        triggerFileInputClick={triggerFileInputClick}
      />
      <div className="main-content">
        <LeftMenu
          openedFiles={openedFiles}
          onShapeSubmit={handleShapeSubmit}
          onSaveAs={handleSaveAs}
          onReset={handleReset}
          shapes={shapes}
        />
        <ShapeViewport shapes={shapes} onShapeUpdate={handleShapeUpdate} />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default App;
