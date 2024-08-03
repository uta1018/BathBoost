import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import SelectRoom from "./SelectRoom";
import Logout from "./Logout";
import { Context } from "../providers/Provider";
import "./css/Home.css";

const Home = () => {
  const { setIsAuth } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuth(localStorage.getItem("isAuth"));
    if (!localStorage.getItem("isAuth")) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="home-container">
    <div className="header">
        <div className="logo-box">
          <img src="/logo.png" className="logoImg"></img>
          <div className="logo">BATH BOOST</div>
          <Logout />
        </div>
      </div>
    <div className="content">
      <CreateRoom />
      <JoinRoom />
      <SelectRoom />
    </div>
      <div className="footer">
        <p>@ライラック</p>
      </div>
  </div>
  );
};

export default Home;
