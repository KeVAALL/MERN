import React, { useEffect } from "react";
import "../App.css";

function Logout() {
  async function logOut() {
    try {
      const response = await fetch("http://localhost:4000/logout");

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    logOut();
  }, []);
  return (
    <>
      <h1>Logout!</h1>
    </>
  );
}

export default Logout;
