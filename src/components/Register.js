import React from "react";
import "./Auth.css"; // Auth specific styles

const Register = () => {
  return (
    <div className="auth-container">
      <h1>Register</h1>
      <form>
        <input type="text" placeholder="Username" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
