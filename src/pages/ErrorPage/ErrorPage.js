import React from "react";
import Error404 from "../../assets/images/errorpoke.gif";

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h1>404 Error Page</h1>
      <img src={Error404} alt="" />
    </div>
  );
};

export default ErrorPage;
