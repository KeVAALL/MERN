import React, { useEffect } from "react";
import "../App.css";

function Home() {
  async function getAuth() {
    try {
      const response = await fetch("http://localhost:4000/home");

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(error);
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
