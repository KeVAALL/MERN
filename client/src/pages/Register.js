import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "../App.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emptyInput = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  async function registerUser(e) {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await response.json();

    if ((data.status = "Ok")) {
      window.location.href = "/login";
    }

    emptyInput();
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Name"
        />
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        {emailError && <p>Email Error</p>}
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        {passwordError && <p>{passwordError}</p>}
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default Register;
