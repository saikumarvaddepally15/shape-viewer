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
        const shapes = parseShapeFile(e.target.result);
        setShapes(shapes);
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

  return (
    <div className="app">
      <Toolbar
        fileName={fileName}
        triggerFileInputClick={triggerFileInputClick}
      />
      <div className="main-content">
        <LeftMenu openedFiles={openedFiles} />
        <ShapeViewport shapes={shapes} />
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
