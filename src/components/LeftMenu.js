import React, { useState } from "react";
import PropTypes from "prop-types";

const LeftMenu = ({
  openedFiles = [],
  onShapeSubmit,
  onSaveAs,
  onReset,
  shapes,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [shapeType, setShapeType] = useState("Rectangle");
  const [formData, setFormData] = useState({
    x: "",
    y: "",
    width: "",
    height: "",
    color: "",
    points: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newShape = {
      type: shapeType,
      x: parseInt(formData.x, 10),
      y: parseInt(formData.y, 10),
      width: parseInt(formData.width, 10),
      height: parseInt(formData.height, 10),
      color: formData.color,
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
      color: "",
      points: "",
    });
    setShowForm(false);
  };

  const handleSaveAs = () => {
    const fileName = prompt("Enter a file name to save as:");
    if (fileName) {
      onSaveAs(fileName);
    }
  };

  return (
    <div className="left-menu">
      <ul>
        {openedFiles.length === 0 ? (
          <li>No files opened</li>
        ) : (
          openedFiles.map((file, index) => <li key={index}>{file}</li>)
        )}
      </ul>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Add Shape"}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Shape Type:</label>
            <select
              name="shapeType"
              value={shapeType}
              onChange={(e) => setShapeType(e.target.value)}
            >
              <option value="Rectangle">Rectangle</option>
              <option value="Triangle">Triangle</option>
              <option value="Polygon">Polygon</option>
            </select>
          </div>
          <div>
            <label>X:</label>
            <input
              type="number"
              name="x"
              value={formData.x}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Y:</label>
            <input
              type="number"
              name="y"
              value={formData.y}
              onChange={handleInputChange}
              required
            />
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
                  required
                />
              </div>
              <div>
                <label>Height:</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  required
                />
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
                required
              />
            </div>
          )}
          <div>
            <label>Color (Hex Code):</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Add Shape</button>
        </form>
      )}
      <button onClick={handleSaveAs} disabled={shapes.length === 0}>
        Save as
      </button>{" "}
      {/* Disabled when no shapes */}
      <button onClick={onReset}>Reset</button>
    </div>
  );
};

LeftMenu.propTypes = {
  openedFiles: PropTypes.array,
  onShapeSubmit: PropTypes.func.isRequired,
  onSaveAs: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  shapes: PropTypes.array.isRequired,
};

export default LeftMenu;
