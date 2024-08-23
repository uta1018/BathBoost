import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../../providers/Provider';
// import "./css/RoomInfo.css";

const RoomInfo = () => {
  // グローバル変数を取得
  const { userID, roomID } = useContext(Context);

  const navigate = useNavigate();

  // 読み込み時に実行
  useEffect(() => {
    // ログインしていなかったらログイン画面へリダイレクト
    if (!userID) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="roominfo-container">
      <div className="header">
        <div className="logo-box">
          <img src="/logo.png" className="logoImg"></img>
          <div className="logo">BATH BOOST</div>
        </div>
      </div>
      <div className="content">
        <div className="speech-bubble">
          <p>ルームIDは</p>
          <h1>{roomID}</h1>
          <p>です</p>
        </div>
        <img src="/tellID.png" className="tell-id-img" />
        <p>友達にルームIDをシェアしよう！</p>
      {/* ルーム画面へのリンク */}
      <Link to="/room" className="room-link">ルームへ</Link>
      </div>
      <div className="footer">
        <p>@ライラック</p>
      </div>
    </div>
  )
};

export default RoomInfo
