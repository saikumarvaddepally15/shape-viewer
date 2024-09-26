import React, { useState } from "react";

const ShapeViewport = ({ shapes, onShapeUpdate }) => {
  const [dragging, setDragging] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e, index) => {
    const shape = shapes[index];
    setDragging(index);
    setOffset({
      x: e.clientX - shape.x,
      y: e.clientY - shape.y,
    });
  };

  const handleMouseMove = (e) => {
    if (dragging !== null) {
      const newShapes = [...shapes];
      newShapes[dragging].x = e.clientX - offset.x;
      newShapes[dragging].y = e.clientY - offset.y;
      onShapeUpdate(newShapes);
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
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
    </div>
  );
};

export default ShapeViewport;
