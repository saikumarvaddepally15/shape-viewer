export const parseShapeFile = (fileContent) => {
  const shapes = fileContent
    .trim()
    .split(";")
    .filter((line) => line.trim() !== "")
    .map((line) => {
      const [type, x, y, zIndex, width, height, color] = line
        .split(",")
        .map((value) => value.trim());
      return {
        type,
        x: parseInt(x, 10),
        y: parseInt(y, 10),
        zIndex: parseInt(zIndex, 10),
        width: parseInt(width, 10),
        height: parseInt(height, 10),
        color,
      };
    });
  return shapes;
};
