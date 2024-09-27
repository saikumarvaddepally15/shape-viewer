import React, { useState } from "react";
import {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
} from "../utils/shapeViewportUtils";

// Component responsible for rendering and managing the shape viewport
const ShapeViewport = ({ shapes, onShapeUpdate, onShapeSelect }) => {
  const [dragging, setDragging] = useState(null); // Track which shape (if any) is currently being dragged
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // Track the offset between mouse position and shape position during dragging
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  }); // State for managing tooltip visibility and content

  return (
    <div
      className="shape-viewport"
      onMouseMove={(e) =>
        handleMouseMove(e, dragging, shapes, offset, onShapeUpdate, setTooltip)
      } // Handle shape movement when dragging
      onMouseUp={() => handleMouseUp(setDragging, setTooltip)} // Handle mouse up event to stop dragging
    >
      {/* Display a placeholder message when there are no shapes */}
      {shapes.length === 0 && (
        <div className="empty-viewport-message">
          <p>Upload shapes file or add a shape from the left menu</p>
        </div>
      )}

      {/* Map over the shapes array to render each shape */}
      {shapes.map((shape, index) => {
        const isSelected = dragging === index; // Check if the current shape is being dragged

        const commonStyles = {
          position: "absolute",
          left: `${shape.x}px`,
          top: `${shape.y}px`,
          zIndex: isSelected ? 1000 : shape.zIndex, // Bring the selected shape to the front
          cursor: isSelected ? "grabbing" : "grab",
          transform: `rotate(${shape.rotation || 0}deg)`,
          transformOrigin: "center",
          boxSizing: "border-box",
          border: isSelected ? "2px dotted red" : "none", // Highlight the selected shape with a red dotted border
        };

        // To Render Rectangle shape
        if (shape.type === "Rectangle") {
          return (
            <div
              key={index}
              style={{
                ...commonStyles,
                width: `${shape.width}px`,
                height: `${shape.height}px`,
                backgroundColor: `#${shape.color}`,
              }}
              onMouseDown={(e) =>
                handleMouseDown(
                  e,
                  index,
                  shapes,
                  setDragging,
                  setOffset,
                  setTooltip,
                  onShapeSelect
                )
              } // Start dragging the shape
            />
          );
        }

        // To Render Triangle shape
        else if (shape.type === "Triangle") {
          return (
            <div
              key={index}
              style={{
                ...commonStyles,
                width: `${shape.width}px`,
                height: `${shape.height}px`,
              }}
              onMouseDown={(e) =>
                handleMouseDown(
                  e,
                  index,
                  shapes,
                  setDragging,
                  setOffset,
                  setTooltip,
                  onShapeSelect
                )
              } // Start dragging the shape
            >
              <div
                style={{
                  width: "0",
                  height: "0",
                  borderLeft: `${shape.width / 2}px solid transparent`,
                  borderRight: `${shape.width / 2}px solid transparent`,
                  borderBottom: `${shape.height}px solid #${shape.color}`,
                  position: "absolute",
                  top: "0",
                  left: "0",
                  pointerEvents: "auto", // Ensure the shape is interactable
                }}
              />
            </div>
          );
        }

        // To Render Polygon shape
        else if (shape.type === "Polygon") {
          const points = shape.points.map((p) => `${p.x},${p.y}`).join(" ");
          return (
            <svg
              key={index}
              style={{
                ...commonStyles,
                width: `${Math.max(...shape.points.map((p) => p.x))}px`,
                height: `${Math.max(...shape.points.map((p) => p.y))}px`,
              }}
              onMouseDown={(e) =>
                handleMouseDown(
                  e,
                  index,
                  shapes,
                  setDragging,
                  setOffset,
                  setTooltip,
                  onShapeSelect
                )
              } // Start dragging the shape
            >
              <polygon points={points} fill={`#${shape.color}`} />
            </svg>
          );
        }

        // Returns null if shape type is not recognized
        else {
          return null;
        }
      })}

      {/* Displays the tooltip with the current coordinates during dragging */}
      {tooltip.visible && (
        <div
          style={{
            position: "fixed",
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            pointerEvents: "none",
            zIndex: 1000,
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
};

export default ShapeViewport;
