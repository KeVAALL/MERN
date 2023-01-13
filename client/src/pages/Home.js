import React, { useEffect } from "react";
import jwtDecode from "jwt-decode";
import "../App.css";

function Home() {
  async function populate() {
    const req = await fetch("http://localhost:4000/home", {
      headers: {
        "x-access-token": localStorage.getItem("jwt"),
      },
    });

    const data = await req.json();

    console.log(data);
  }

  async function getAuth() {
    const token = localStorage.getItem("jwt");
    console.log(token);

    if (token) {
      const user = jwtDecode(token);
      if (!user) {
        localStorage.removeItem("jwt");
        window.location.href = "/login";
      } else {
        alert("Logged In!");
        populate();
      }
    } else {
      window.location.href = "/login";
    }
  }

  useEffect(() => {
    getAuth();
  }, []);
  return (
    <>
      <h1>Registered!</h1>
    </>
  );
}

export default Home;
