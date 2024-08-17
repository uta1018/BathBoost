import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import SelectRoom from "./SelectRoom";
import Logout from "./Logout";
import { Context } from "../providers/Provider";
import "./css/Home.css";

const Home = () => {
  // グローバル変数を取得
  const { setIsAuth } = useContext(Context);
  const navigate = useNavigate();

  // 読み込み時に実行
  useEffect(() => {
    // ローカルストレージからログインしているか確認
    setIsAuth(localStorage.getItem("isAuth"));
    // ログインしていなかったら、ログイン画面へリダイレクト
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
