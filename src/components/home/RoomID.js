import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../providers/Provider";
import CopyButton from "../common/CopyButton";
import PopupHeader from "../common/PopupHeader";

const RoomID = ({ removeOverlay }) => {
  const { roomID } = useContext(Context);
  console.log("RoomID");

  return (
    <div className="popup-content roomid-container">
      <PopupHeader title="ルームの作成" />
      <div className="flex-box">
        <div className="text-wrapper">
          <h3>作成したルームのID</h3>
          <CopyButton text={roomID} className="button" />
        </div>
        <div className="id-wrapper">
          <h3>{roomID}</h3>
        </div>
        <p>ルームIDを共有しておふろ報告をしよう!</p>
        <Link to="/room" className="button ok-button-main button-w280">
          OK
        </Link>
      </div>
    </div>
  );
};

export default RoomID;
