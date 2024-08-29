import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import SelectRoom from "./SelectRoom";
import Navbar from "../common/Navbar";
import { Context } from "../../providers/Provider";
import PageHeader from "../common/PageHeader";
import Help from "../common/Help";
import RoomID from "./RoomID";
import RoomInfo from "./RoomInfo";
// import "./css/Home.css";

//アイコンのインポート
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  // グローバル変数を取得
  const { userID } = useContext(Context);
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
        <PageHeader title={"ホーム"} />
      </div>
      <Help />
      {/* 画像やテキスト */}
      <img
        src="/home/frog_front.png"
        alt="カエルの画像"
        className="ID-img"
        width={100}
      ></img>
      <div className="content">
        <p>入室するルームを選んでください</p>
        <button onClick={openCreateRoom}>
          <FontAwesomeIcon icon={faPlus} />
          <div>
            <div>ルームを作成する</div>
            <div>新しいルームを作成する</div>
          </div>
        </button>
        <button onClick={openJoinRoom}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <div>
            <div>IDでルームを探す</div>
            <div>作成済みのルームをIDで探す</div>
          </div>
        </button>
        <SelectRoom />
      </div>
      <div className="footer">
        <Navbar currentPage="home" />
      </div>
      {showCreateRoom && (
        <CreateRoom closeCreateRoom={closeCreateRoom} openRoomID={openRoomID} />
      )}
      {showJoinRoom && (
        <JoinRoom
          closeJoinRoom={closeJoinRoom}
          openRoomInfo={openRoomInfo}
          settingRoomID={settingRoomID}
        />
      )}
      {showRoomID && <RoomID />}
      {showRoomInfo && (
        <RoomInfo joinRoomID={joinRoomID} closeRoomInfo={closeRoomInfo} />
      )}
    </div>
  );
};

export default Home;
