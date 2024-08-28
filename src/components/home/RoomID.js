import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { Context } from '../../providers/Provider';
import CopyButton from '../common/CopyButton';
import PopupHeader from '../common/PopupHeader';
import "../css/Popup.css";

const RoomID = ({ removeOverlay }) => {
  const { roomID } = useContext(Context);
  console.log("RoomID");

  return (
    <div className="popup-content">
      <div className="roominfo-container">
        <div className="content">
          <div className="speech-bubble">
            <PopupHeader title="ルームの作成" />
            <p>
              作成したルームのID
              {/* コピーボタン */}
              <CopyButton text={roomID} />
            </p>
            <h2>{roomID}</h2>
          </div>
          <p>ルームIDを共有しておふろ報告をしよう！</p>
          {/* ルーム画面へのリンク */}
          <Link to="/room" className="room-link" onClick={removeOverlay}>
            OK
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomID
