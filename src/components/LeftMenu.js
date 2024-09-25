import React from "react";
import PropTypes from "prop-types";

const LeftMenu = ({ openedFiles = [] }) => {
  return (
    <div className="left-menu">
      <ul>
        {openedFiles.length === 0 ? (
          <li>No files opened</li>
        ) : (
          openedFiles.map((file, index) => <li key={index}>{file}</li>)
        )}
      </ul>
    </div>
  );
};

LeftMenu.propTypes = {
  openedFiles: PropTypes.array,
};

export default LeftMenu;
