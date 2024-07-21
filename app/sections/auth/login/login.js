"use client";

import { AuthContext } from "@/app/auth-context";
import { useAuthContext } from "@/app/use-auth-context";
import { useContext, useState } from "react";

const LoginPageView = () => {
  const { login } = useAuthContext();

  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    login({ ...inputValue, token: Date.now() });
  };
  return (
    <div className="center-container">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              onChange={handleChange}
              value={inputValue.username}
            />
          </div>
          <div className="input-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={handleChange}
              value={inputValue.password}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPageView;
