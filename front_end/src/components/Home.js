import React, { useState, useEffect } from "react";

import UserService from "../services/userService";
import logo from "../assets/Paypay_logo.png";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        {/* <h3>{content}</h3> */}
        <img alt="" src={logo} />
      </header>
    </div>
  );
};

export default Home;
