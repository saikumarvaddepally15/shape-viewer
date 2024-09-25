import React from "react";

const Shape = ({ type, x, y, width, height, color }) => {
  const styles = {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: `#${color}`,
  };

  return <div style={styles} className={`shape ${type.toLowerCase()}`} />;
};

export default Shape;
