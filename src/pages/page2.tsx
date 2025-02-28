import React from "react";
import Header from "../components/header";

const SecondPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="login-container">
        <h1>Second Page! Just For Routing!!</h1>
      </div>
    </>
  );
};

export default SecondPage;
