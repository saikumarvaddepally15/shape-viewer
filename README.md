---

# Shape Viewer Application

This is a React-based application for viewing, creating, and manipulating shapes on a viewport. Users can upload shape files, add new shapes, rotate shapes, and save their work. The application also supports various shape types, including rectangles, triangles, and polygons.

## Features

- **Upload Shape Files**: Upload custom shape files with details about various shapes.
- **Add Shapes**: Add new shapes (rectangles, triangles, polygons) through a form.
- **Shape Manipulation**: Move and rotate shapes in the viewport.
- **Save Shapes**: Save the current shapes as a `.shapefile`.
- **Reset Viewport**: Clear the viewport and start over.

## Installation

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [npm](https://www.npmjs.com/get-npm) (v6 or higher)

### Clone the Repository

```bash
git clone https://github.com/your-username/shape-viewer.git
cd shape-viewer
```

### Install Dependencies

Using npm:

```bash
npm install
```

## Running the Application

### Start the Development Server

To start the application locally, run:

Using npm:

```bash
npm start
```

This will start the development server and open the application in your default web browser. If it doesn’t, you can manually open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

To build the application for production, run:

Using npm:

```bash
npm run build
```

This will create an optimized build of your application in the `build` directory.

## Deployment

The application is hosted on the Vercel platform. You can access the deployed version of this application using the following link:

[Shape Viewer Application](https://shape-viewer-omega.vercel.app/)

## Project Structure

- `src/components/`: Contains all the React components used in the application.
- `src/utils/`: Contains utility functions, including the shape file parsing logic.
- `src/App.js`: Main application component where the overall structure and state management are handled.
- `src/index.js`: Entry point of the application.
- `test/`: Contains test files with different test cases for shape files.

## Test Files

The `test/` folder includes a variety of test files that represent different shape configurations. These files can be used to test the functionality of the application:

- **Rectangle Test Cases**: Various rectangles with different sizes, positions, and colors.(File name - rectangle-shape-file.shapefile)
- **Triangle Test Cases**: Triangles with varying dimensions and colors. (File name - triangle-shape-file.shapefile )
- **Polygon Test Cases**: Polygons with different numbers of sides and configurations. (File name - polygon-shape-file.shapefile )
- **Mixed Shape Files**: Files that contain a mixture of rectangles, triangles, and polygons. (File name - mixed-shape-file.shapefile)
- **large dataset shape Files**: Files that contain 500+ shapes which is generated using a python script. (File name - large-testcases.shapefile)

These test files are useful for verifying that the application correctly parses and displays different types of shapes.

## Usage

### Uploading a Shape File

Click the "Open file" button in the toolbar to upload a `.shapefile`. The shapes defined in the file will be displayed in the viewport.

### Adding a New Shape

Click the "Add Shape" button in the left menu to open the form. Select the shape type, fill in the details, and click "Add Shape" to add it to the viewport.

### Manipulating Shapes

- **Move**: Click and drag any shape to reposition it within the viewport.
- **Rotate**: Select a shape and click the "Rotate" button in the toolbar to rotate the shape 45 degrees.

### Saving Shapes

Click the "Save as" button in the left menu to save the current shapes as a new `.shapefile`.

### Resetting the Viewport

Click the "Reset" button in the left menu to clear all shapes from the viewport and reset the application.

## Additional Information

### How many assignment iterations did you complete?

I have completed all the iterations that are mentioned in the given document, which includes:
1. Assignment considerations.
2. User Interface Layout.
3. Shape File.
4. Shape Rendering.
5. Polygon Support.
6. UI Enhancement.

### Did you implement any bonus features/extra features? Which ones?

Yes, I have implemented all the bonus features mentioned in the assignment.

#### Bonus Features:
- **Shape Creation, Rotation, and Translation**: Added advanced manipulation features that allow users to create new shapes, rotate them, and translate (move) them across the viewport with precision.

#### Extra Features:
- **Dynamic Shape Highlighting**: The selected shape is highlighted with a dotted red border, making it easier for users to identify the shape they are working on.
- **Color Picker**: Integrated a color picker in the shape form, allowing users to choose a color via a visual interface or by entering a hex code.
- **Tooltip Display for Coordinates**: When a shape is moved or dragged within the viewport, a tooltip is displayed showing the current coordinates of the shape, providing real-time feedback to the user.
- **Tooltips and Error Messages**: Implemented tooltips for disabled buttons, and error messages appear when invalid values (e.g., negative numbers) are entered in the form fields.
- **Reset Viewport**: Clear the viewport and start over.

### Are there any major known problems with the solution?

As of the final iteration, there are no major known problems with the solution. However, some potential areas for further refinement include:
- **Viewport Boundary Handling**: The application currently prevents shapes from being dragged outside the viewport, but additional edge cases could be handled to improve user experience.
- **Z-Index Handling**: While the z-index is considered, the logic might require more robust testing with complex overlapping shapes to ensure all scenarios are correctly handled.

---
