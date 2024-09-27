import React, { useState } from "react";
import PropTypes from "prop-types";

const ShapeForm = ({ onShapeSubmit }) => {
  const [shapeType, setShapeType] = useState("Rectangle");
  const [formData, setFormData] = useState({
    x: "",
    y: "",
    width: "",
    height: "",
    color: "#000000",
    points: "",
    zIndex: 0,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const newErrors = { ...errors };

    if (name === "x" && value < 0) {
      newErrors.x = "X coordinate cannot be negative";
    } else if (name === "y" && value < 0) {
      newErrors.y = "Y coordinate cannot be negative";
    } else if (name === "width" && value <= 0 && shapeType !== "Polygon") {
      newErrors.width = "Width must be a positive number";
    } else if (name === "height" && value <= 0 && shapeType !== "Polygon") {
      newErrors.height = "Height must be a positive number";
    } else {
      newErrors[name] = "";
    }

    setErrors(newErrors);
  };

  const handleColorChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, color: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(errors).some((key) => errors[key])) {
      return;
    }

    const newShape = {
      type: shapeType,
      x: parseInt(formData.x, 10),
      y: parseInt(formData.y, 10),
      zIndex: parseInt(formData.zIndex, 10),
      width: shapeType !== "Polygon" ? parseInt(formData.width, 10) : undefined,
      height:
        shapeType !== "Polygon" ? parseInt(formData.height, 10) : undefined,
      color: formData.color.replace("#", ""),
      points:
        shapeType === "Polygon"
          ? formData.points.split(" ").map((p) => {
              const [px, py] = p.split(",");
              return { x: parseInt(px, 10), y: parseInt(py, 10) };
            })
          : [],
    };

    onShapeSubmit(newShape);
    setFormData({
      x: "",
      y: "",
      width: "",
      height: "",
      color: "#000000",
      points: "",
      zIndex: 0,
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Shape Type:</label>
        <select
          name="shapeType"
          value={shapeType}
          onChange={(e) => setShapeType(e.target.value)}
          required
        >
          <option value="Rectangle">Rectangle</option>
          <option value="Triangle">Triangle</option>
          <option value="Polygon">Polygon</option>
        </select>
      </div>
      <div>
        <label>x:</label>
        <input
          type="number"
          name="x"
          value={formData.x}
          onChange={handleInputChange}
          placeholder="Enter x coordinate"
          required
        />
        {errors.x && <span className="error">{errors.x}</span>}
      </div>
      <div>
        <label>y:</label>
        <input
          type="number"
          name="y"
          value={formData.y}
          onChange={handleInputChange}
          placeholder="Enter y coordinate"
          required
        />
        {errors.y && <span className="error">{errors.y}</span>}
      </div>
      <div>
        <label>zIndex:</label>
        <input
          type="number"
          name="zIndex"
          value={formData.zIndex}
          onChange={handleInputChange}
          placeholder="Enter z-index (e.g., 0)"
          required
        />
        {errors.zIndex && <span className="error">{errors.zIndex}</span>}
      </div>
      {shapeType !== "Polygon" && (
        <>
          <div>
            <label>Width:</label>
            <input
              type="number"
              name="width"
              value={formData.width}
              onChange={handleInputChange}
              placeholder="Enter width"
              required
            />
            {errors.width && <span className="error">{errors.width}</span>}
          </div>
          <div>
            <label>Height:</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              placeholder="Enter height"
              required
            />
            {errors.height && <span className="error">{errors.height}</span>}
          </div>
        </>
      )}
      {shapeType === "Polygon" && (
        <div>
          <label>Points (format: x1,y1 x2,y2 ...):</label>
          <input
            type="text"
            name="points"
            value={formData.points}
            onChange={handleInputChange}
            placeholder="e.g., 10,10 20,20 30,30"
            required
          />
        </div>
      )}
      <div>
        <label>Color:</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleColorChange}
            placeholder="Enter color hex code (e.g., ff0000)"
            required
            style={{ marginRight: "10px" }}
          />
          <input
            type="color"
            value={formData.color}
            onChange={handleColorChange}
            required
            style={{ width: "40px", height: "40px", padding: "0" }}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={Object.keys(errors).some((key) => errors[key])}
      >
        Add Shape
      </button>
    </form>
  );
};

ShapeForm.propTypes = {
  onShapeSubmit: PropTypes.func.isRequired,
};

export default ShapeForm;
