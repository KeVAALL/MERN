import React, { useState } from "react";
import "../App.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emptyInput = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const registerUser = async (e) => {
    e.preventDefault();

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

    console.log(data);
    emptyInput();
    // setName("");
  };

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
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default Register;
