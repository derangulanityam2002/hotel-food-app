import React from "react";
import "./Auth.css"; // Auth specific styles

const Login = () => {
  return (
    <div className="auth-container">
      <h1>Login</h1>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
