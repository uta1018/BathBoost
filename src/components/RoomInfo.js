import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../providers/Provider';
import "./css/RoomInfo.css";

const RoomInfo = () => {
  const { roomID } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("isAuth")) {
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
        <p>友達にリンク、ルームIDをシェアしよう！</p>
      <Link to="/room" className="room-link">ルームへ</Link>
      </div>
      <div className="footer">
        <p>@ライラック</p>
      </div>
    </div>
  )
};

export default RoomInfo
