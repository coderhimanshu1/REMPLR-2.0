import React from "react";
import { FaRegHeart } from "react-icons/fa"; // Importing hollow heart icon

const SaveHeartButton = ({ isSaved, handleSave }) => {
  return (
    <FaRegHeart
      className={isSaved ? "saved-heart" : "save-heart"} // Updated class names
      onClick={handleSave}
    />
  );
};

export default SaveHeartButton; // Updated export name
