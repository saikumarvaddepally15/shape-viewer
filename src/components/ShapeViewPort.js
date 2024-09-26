import React, { useState } from "react";

const ShapeViewport = ({ shapes, onShapeUpdate }) => {
  const [dragging, setDragging] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  });

  const handleMouseDown = (e, index) => {
    const shape = shapes[index];
    setDragging(index);
    setOffset({
      x: e.clientX - shape.x,
      y: e.clientY - shape.y,
    });
    setTooltip({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      text: `(${shape.x}, ${shape.y})`,
    });
  };

  const handleMouseMove = (e) => {
    if (dragging !== null) {
      const newShapes = [...shapes];
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;

      newShapes[dragging].x = newX;
      newShapes[dragging].y = newY;
      onShapeUpdate(newShapes);

      setTooltip({
        visible: true,
        x: e.clientX + 10, // Slight offset for better visibility
        y: e.clientY + 10,
        text: `(${newX}, ${newY})`,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
    setTooltip({ visible: false, x: 0, y: 0, text: "" });
  };

  return (
    <div
      className="shape-viewport"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {shapes.map((shape, index) => {
        const commonStyles = {
          position: "absolute",
          left: `${shape.x}px`,
          top: `${shape.y}px`,
          zIndex: shape.zIndex,
          cursor: dragging === index ? "grabbing" : "grab",
        };

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
              onMouseDown={(e) => handleMouseDown(e, index)}
            />
          );
        } else if (shape.type === "Triangle") {
          return (
            <div
              key={index}
              style={{
                ...commonStyles,
                width: "0",
                height: "0",
                borderLeft: `${shape.width / 2}px solid transparent`,
                borderRight: `${shape.width / 2}px solid transparent`,
                borderBottom: `${shape.height}px solid #${shape.color}`,
              }}
              onMouseDown={(e) => handleMouseDown(e, index)}
            />
          );
        } else if (shape.type === "Polygon") {
          const points = shape.points.map((p) => `${p.x},${p.y}`).join(" ");
          return (
            <svg
              key={index}
              style={commonStyles}
              width={Math.max(...shape.points.map((p) => p.x))}
              height={Math.max(...shape.points.map((p) => p.y))}
              onMouseDown={(e) => handleMouseDown(e, index)}
            >
              <polygon points={points} fill={`#${shape.color}`} />
            </svg>
          );
        } else {
          return null;
        }
      })}

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
