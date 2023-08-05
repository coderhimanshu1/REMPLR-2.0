import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import "../../styles/common/auth.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../common/alert";

const LoginForm = ({ login }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((l) => ({ ...l, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await login(formData);
    if (!result) return <div>loading...</div>;
    if (result.success) {
      navigate("/");
    } else {
      setFormErrors(result.errors);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>LOGIN</h1>
        <label>
          <FontAwesomeIcon icon={faUser} />
          <input
            type="username"
            name="username"
            placeholder="enter username"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <FontAwesomeIcon icon={faLock} />
          <input
            type="password"
            name="password"
            placeholder="enter password"
            onChange={handleChange}
            required
          />
        </label>
        {formErrors.length ? (
          <Alert type="error" messages={formErrors} />
        ) : null}
        <button type="submit" value="Log In">
          Login
        </button>

        <p>
          Don't Have an Account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
