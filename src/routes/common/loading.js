import React from "react";
import loadingGif from "../../images/loading.gif";

const LoadingScreen = () => {
  return (
    <div className="loading">
      <img src={loadingGif} alt="Loading..." />
    </div>
  );
};

export default LoadingScreen;
