import React from "react";

const ShapeViewport = ({ shapes }) => {
  return (
    <div className="shape-viewport">
      {shapes.map((shape, index) => {
        const commonStyles = {
          position: "absolute",
          left: `${shape.x}px`,
          top: `${shape.y}px`,
          zIndex: shape.zIndex,
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
