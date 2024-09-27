import React, { useState, useRef } from "react";
import Toolbar from "./components/Toolbar";
import LeftMenu from "./components/LeftMenu";
import ShapeViewport from "./components/ShapeViewPort";
import { parseShapeFile } from "./utils/parseShapeFile";
import {
  handleFileUpload,
  triggerFileInputClick,
  handleShapeSubmit,
  handleSaveAs,
  handleReset,
  handleShapeUpdate,
  handleRotate,
} from "./utils/shapeUtils";
import "./App.css";

const App = () => {
  // State variables for managing file name, shapes, opened files, and selected shape index
  const [fileName, setFileName] = useState("");
  const [shapes, setShapes] = useState([]);
  const [openedFiles, setOpenedFiles] = useState([]);
  const [selectedShapeIndex, setSelectedShapeIndex] = useState(null);
  // Ref to handle the file input field
  const fileInputRef = useRef(null);

  return (
    <div className="app">
      {/* Toolbar component to display file name and provide actions like file upload and rotate shape */}
      <Toolbar
        fileName={fileName}
        triggerFileInputClick={() => triggerFileInputClick(fileInputRef)}
        onRotate={() => handleRotate(selectedShapeIndex, shapes, setShapes)}
      />
      <div className="main-content">
        {/* LeftMenu component to manage file-related actions and shape addition */}
        <LeftMenu
          openedFiles={openedFiles}
          onShapeSubmit={(newShape) => handleShapeSubmit(newShape, setShapes)}
          onSaveAs={(fileName) => handleSaveAs(fileName, shapes)}
          onReset={() =>
            handleReset(
              setShapes,
              setOpenedFiles,
              setFileName,
              setSelectedShapeIndex,
              fileInputRef
            )
          }
          shapes={shapes}
        />
        {/* ShapeViewport component to display and manage the shapes on the screen */}
        <ShapeViewport
          shapes={shapes}
          onShapeUpdate={(updatedShapes) =>
            handleShapeUpdate(updatedShapes, setShapes)
          }
          onShapeSelect={setSelectedShapeIndex}
        />
      </div>
      {/* Hidden file input for uploading shape files */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) =>
          handleFileUpload(
            e,
            setFileName,
            setShapes,
            setOpenedFiles,
            parseShapeFile
          )
        }
      />
    </div>
  );
};

export default App;
