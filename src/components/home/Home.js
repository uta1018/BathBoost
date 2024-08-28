import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import SelectRoom from "./SelectRoom";
import Logout from "../user/Logout";
import Navbar from "../common/Navbar";
import { Context } from "../../providers/Provider";
import PageHeader from "../common/PageHeader";
import Help from "../common/Help";
import RoomID from "./RoomID";
import RoomInfo from "./RoomInfo";
import Overlay from "../common/Overlay";
// import "./css/Home.css";

const Home = () => {
  // グローバル変数を取得
  const { userID } = useContext(Context);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showJoinRoom, setShowJoinRoom] = useState(false);
  const [showRoomID, setShowRoomID] = useState(false);
  const [showRoomInfo, setShowRoomInfo] = useState(false);
  // ルーム検索で見つかったルームのIDをJoinRoomからRoomIDにわたす
  const [joinRoomID, setJoinRoomID] = useState("");

  const navigate = useNavigate();
  console.log("ホーム画面");

  // 読み込み時に実行
  useEffect(() => {
    // ログインしていなかったら、ログイン画面へリダイレクト
    if (!userID) {
      navigate("/login");
    }
  }, []);

  const applyOverlay = () => {
    setShowOverlay(true);
  };

  const removeOverlay = () => {
    setShowOverlay(false);
  };

  const openCreateRoom = () => {
    setShowCreateRoom(true);
  };

  const closeCreateRoom = () => {
    setShowCreateRoom(false);
  };

  const openJoinRoom = () => {
    setShowJoinRoom(true);
  };

  const closeJoinRoom = () => {
    setShowJoinRoom(false);
  };

  const openRoomID = () => {
    setShowRoomID(true);
  };

  const openRoomInfo = () => {
    setShowRoomInfo(true);
  };

  const closeRoomInfo = () => {
    setShowRoomInfo(false);
  };

  const settingRoomID = (roomID) => {
    setJoinRoomID(roomID);
  };

  return (
    <div className="home-container">
      <div className="header">
        <Logout />
        <PageHeader title={"ホーム"} />
      </div>
      <Help />
      {/* 画像やテキスト */}
      <div className="content">
        <button
          onClick={() => {
            openCreateRoom();
            applyOverlay();
          }}
        >
          ルームを作成する
        </button>
        <button onClick={openJoinRoom}>ルームを検索する</button>
        <SelectRoom />
      </div>
      <div className="footer">
        <Navbar currentPage="home" />
      </div>
      {showOverlay && <Overlay />}
      {showCreateRoom && (
        <CreateRoom
          closeCreateRoom={closeCreateRoom}
          openRoomID={openRoomID}
          removeOverlay={removeOverlay}
        />
      )}
      {showJoinRoom && (
        <JoinRoom
          closeJoinRoom={closeJoinRoom}
          openRoomInfo={openRoomInfo}
          settingRoomID={settingRoomID}
        />
      )}
      {showRoomID && <RoomID removeOverlay={removeOverlay} />}
      {showRoomInfo && (
        <RoomInfo joinRoomID={joinRoomID} closeRoomInfo={closeRoomInfo} />
      )}
    </div>
  );
};

export default Home;
