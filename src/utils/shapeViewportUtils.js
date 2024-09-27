// Function to handle mouse down event
export const handleMouseDown = (
  e,
  index,
  shapes,
  setDragging,
  setOffset,
  setTooltip,
  onShapeSelect
) => {
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
  onShapeSelect(index);
};

// Function to handle mouse move event
export const handleMouseMove = (
  e,
  dragging,
  shapes,
  offset,
  onShapeUpdate,
  setTooltip
) => {
  if (dragging !== null) {
    const newShapes = [...shapes];
    const newX = e.clientX - offset.x;
    const newY = e.clientY - offset.y;

    // Preventing shape from going out of viewport
    if (newX < 0 || newY < 0) return;

    newShapes[dragging].x = newX;
    newShapes[dragging].y = newY;
    onShapeUpdate(newShapes);

    setTooltip({
      visible: true,
      x: e.clientX + 10,
      y: e.clientY + 10,
      text: `(${newX}, ${newY})`,
    });
  }
};

// Function to handle mouse up event
export const handleMouseUp = (setDragging, setTooltip) => {
  setDragging(null);
  setTooltip({ visible: false, x: 0, y: 0, text: "" });
};
