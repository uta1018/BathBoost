import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import SelectRoom from "./SelectRoom";
import Logout from "../user/Logout";
import Navbar from "../common/Navbar";
import { Context } from "../../providers/Provider";
// import "./css/Home.css";

const Home = () => {
  // グローバル変数を取得
  const { userID } = useContext(Context);

  const navigate = useNavigate();
  console.log("ホーム画面");

  // 読み込み時に実行
  useEffect(() => {
    // ログインしていなかったら、ログイン画面へリダイレクト
    if (!userID) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="home-container">
      <div className="header">
        <div className="logo-box">
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
        <Navbar currentPage="home" />
      </div>
    </div>
  );
};

export default Home;
