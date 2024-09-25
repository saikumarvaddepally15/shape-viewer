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
          backgroundColor: `#${shape.color}`,
        };

        if (shape.type === "Rectangle") {
          return (
            <div
              key={index}
              style={{
                ...commonStyles,
                width: `${shape.width}px`,
                height: `${shape.height}px`,
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
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default ShapeViewport;
