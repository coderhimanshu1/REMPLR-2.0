import React from "react";
import "../../styles/common/alert.css";

function Alert({ type = "error", messages = [] }) {
  const alertClass =
    type === "success" ? "alert-custom-success" : "alert-custom-error";

  return (
    <div className={`alert ${alertClass}`} role="alert">
      {messages.map((msg, index) => (
        <p className="mb-0 small" key={index}>
          {msg}
        </p>
      ))}
    </div>
  );
}

export default Alert;
