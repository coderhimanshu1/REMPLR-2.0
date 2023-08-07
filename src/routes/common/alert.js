import React from "react";
import "../../styles/common/alert.css";

function Alert({ type = "error", messages = [] }) {
  const alertClass =
    type === "success" ? "alert-custom-success" : "alert-custom-error";

  return (
    <div className={`alert ${alertClass}`} role="alert">
      {messages.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </div>
  );
}

export default Alert;
