import React from "react";

const ShapeViewport = ({ shapes }) => {
  console.log("Shapes on render:", shapes);
  return (
    <div
      className="shape-viewport"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {shapes.map((shape, index) => {
        console.log("Rendering shape:", shape);

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
          console.log("Polygon points:", points);
          const minX = Math.min(...shape.points.map((p) => p.x));
          const minY = Math.min(...shape.points.map((p) => p.y));
          const maxX = Math.max(...shape.points.map((p) => p.x));
          const maxY = Math.max(...shape.points.map((p) => p.y));

          const adjustedPoints = shape.points
            .map((p) => `${p.x - minX},${p.y - minY}`)
            .join(" ");

          return (
            <svg
              key={index}
              style={{
                ...commonStyles,
                left: `${shape.x + minX}px`,
                top: `${shape.y + minY}px`,
              }}
              width={maxX - minX}
              height={maxY - minY}
            >
              <polygon points={adjustedPoints} fill={`#${shape.color}`} />
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
