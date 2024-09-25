export const parseShapeFile = (fileContent) => {
  const shapes = fileContent
    .trim()
    .split(";")
    .filter((line) => {
      const isValidLine = line.trim() !== "";
      console.log("Validating line:", line, "Result:", isValidLine);
      return isValidLine;
    })
    .map((line) => {
      const parts = line.split(",").map((value) => value.trim());
      console.log("Line parts after splitting:", parts);

      const [type, x, y, zIndex] = parts.slice(0, 4);
      const color = parts[parts.length - 1];

      if (!type || !x || !y || !zIndex || !color) {
        console.error("Missing values in parts:", parts);
        return null;
      }

      if (type === "Polygon") {
        const sizeOrPoints = parts.slice(4, parts.length - 1).join(",");
        console.log("Polygon points string before parsing:", sizeOrPoints);

        const points = (sizeOrPoints.match(/\(\d+,\d+\)/g) || []).map(
          (point) => {
            const [px, py] = point.slice(1, -1).split(",").map(Number);
            return { x: px, y: py };
          }
        );

        console.log("Parsed Polygon points:", points);

        if (points.length === 0) {
          console.error("No valid points found for Polygon:", parts);
          return null;
        }

        return {
          type,
          x: parseInt(x, 10),
          y: parseInt(y, 10),
          zIndex: parseInt(zIndex, 10),
          points,
          color,
        };
      } else {
        const sizeOrPoints = parts.slice(4, 6).map((value) => value.trim());
        console.log("Size parts:", sizeOrPoints);

        if (sizeOrPoints.length !== 2) {
          console.error("Invalid size or points data for shape:", parts);
          return null;
        }

        const [width, height] = sizeOrPoints.map((value) =>
          parseInt(value, 10)
        );

        if (isNaN(width) || isNaN(height)) {
          console.error("Invalid width or height for shape:", parts);
          return null;
        }

        return {
          type,
          x: parseInt(x, 10),
          y: parseInt(y, 10),
          zIndex: parseInt(zIndex, 10),
          width,
          height,
          color,
        };
      }
    })
    .filter((shape) => {
      const isValidShape = shape !== null;
      console.log("Filtering shape:", shape, "Result:", isValidShape);
      return isValidShape;
    });

  console.log("Parsed shapes array:", shapes);
  return shapes;
};
