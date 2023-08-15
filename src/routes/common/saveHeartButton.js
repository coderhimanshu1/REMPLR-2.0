import React from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import "../../styles/common/common.css";

const SaveHeartButton = ({ isSaved, handleSave, handleRemove }) => {
  return isSaved ? (
    <FaHeart className="saved-heart" onClick={handleRemove} />
  ) : (
    <FaRegHeart className="save-heart" onClick={handleSave} />
  );
};

export default SaveHeartButton;
