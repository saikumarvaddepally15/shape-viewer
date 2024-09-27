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

  // Function for input validation
  const validateInput = (name, value) => {
    let error = "";
    if ((name === "x" || name === "y") && value < 0) {
      error = `${name.toUpperCase()} coordinate cannot be negative`;
    } else if (
      (name === "width" || name === "height") &&
      value <= 0 &&
      shapeType !== "Polygon"
    ) {
      error = `${
        name.charAt(0).toUpperCase() + name.slice(1)
      } must be a positive number`;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validates input and update error state
    const error = validateInput(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleColorChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, color: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevents submission if there are any validation errors
    if (Object.values(errors).some((error) => error)) {
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
      {["x", "y", "zIndex"].map((field) => (
        <div key={field}>
          <label>{field}:</label>
          <input
            type="number"
            name={field}
            value={formData[field]}
            onChange={handleInputChange}
            placeholder={`Enter ${field}`}
            required
          />
          {errors[field] && <span className="error">{errors[field]}</span>}
        </div>
      ))}
      {shapeType !== "Polygon" &&
        ["width", "height"].map((field) => (
          <div key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input
              type="number"
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              placeholder={`Enter ${field}`}
              required
            />
            {errors[field] && <span className="error">{errors[field]}</span>}
          </div>
        ))}
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
        disabled={Object.values(errors).some((error) => error)}
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
