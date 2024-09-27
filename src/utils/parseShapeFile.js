// Function to parse integers with a default fallback
const parseIntOrDefault = (value, defaultValue = 0) => {
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

// Function to parse basic shape properties like x,y coordinates, Z index and the color
const parseBasicShapeProps = (parts) => {
  const [type, x, y, zIndex] = parts.slice(0, 4);
  const color = parts[parts.length - 1];

  if (!type || !x || !y || !zIndex || !color) {
    console.error("Missing values in parts:", parts);
    return null;
  }

  return {
    type,
    x: parseIntOrDefault(x),
    y: parseIntOrDefault(y),
    zIndex: parseIntOrDefault(zIndex),
    color,
  };
};

// Function to parse polygon points which are in the form of [(x1,y1),(x2,y2)]
const parsePolygonPoints = (sizeOrPoints) => {
  const points = (sizeOrPoints.match(/\(\d+,\d+\)/g) || []).map((point) => {
    const [px, py] = point.slice(1, -1).split(",").map(Number);
    return { x: px, y: py };
  });

  if (points.length === 0) {
    console.error("No valid points found for Polygon:", sizeOrPoints);
    return null;
  }

  return points;
};
//Function to parse the shape file which is uploaded
export const parseShapeFile = (fileContent) => {
  const shapes = fileContent
    .trim()
    .split(";")
    .filter((line) => line.trim() !== "")
    .map((line) => {
      const parts = line.split(",").map((value) => value.trim());
      console.log("Line parts after splitting:", parts);

      // Parsing common shape properties
      const basicProps = parseBasicShapeProps(parts);
      if (!basicProps) return null;
      // Parsing polygon shape properties
      if (basicProps.type === "Polygon") {
        const sizeOrPoints = parts.slice(4, parts.length - 1).join(",");
        console.log("Polygon points string before parsing:", sizeOrPoints);

        const points = parsePolygonPoints(sizeOrPoints);
        if (!points) return null;

        return {
          ...basicProps,
          points,
        };
      } else {
        const [width, height] = parts.slice(4, 6).map(parseIntOrDefault);

        if (isNaN(width) || isNaN(height)) {
          console.error("Invalid width or height for shape:", parts);
          return null;
        }

        return {
          ...basicProps,
          width,
          height,
        };
      }
    })
    .filter((shape) => shape !== null);

  console.log("Parsed shapes array:", shapes);
  return shapes;
};
