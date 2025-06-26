import React from "react";

const CategoryButton = ({ category, isActive, onClick }) => {
  return (
    <button
      className={isActive ? "active" : ""}
      onClick={() => onClick(category)}
    >
      {category}
    </button>
  );
};

export default CategoryButton;
