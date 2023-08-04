import React from "react";
import { FaRegStar } from "react-icons/fa";

const SaveStarButton = ({ isSaved, handleSave }) => {
  return (
    <FaRegStar
      className={isSaved ? "saved-star" : "save-star"}
      onClick={handleSave}
    />
  );
};

export default SaveStarButton;
