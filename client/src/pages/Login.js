import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function loginUser(event) {
    event.preventDefault();

    setEmailError("");
    setPasswordError("");

    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (data.user) {
      localStorage.setItem("jwt", data.user);
      alert("Login Successful");
    } else {
      if (data.errors.email) {
        setEmailError("Incorrect Email");
      } else {
        setPasswordError("Incorrect Password");
      }
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        {emailError && <p>Email Error</p>}
        <br />
        <input
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        {passwordError && <p>{passwordError}</p>}
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
