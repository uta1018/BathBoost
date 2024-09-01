import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import SelectRoom from "./SelectRoom";
import Navbar from "../common/Navbar";
import PageHeader from "../common/PageHeader";
import Help from "../common/Help";
import RoomID from "./RoomID";
import RoomInfo from "./RoomInfo";
import Overlay from "../common/Overlay";

//アイコンのインポート
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import Tutorial from "../login/Tutorial";

const Home = () => {
  // グローバル変数を取得
  const [showOverlay, setShowOverlay] = useState(false);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showJoinRoom, setShowJoinRoom] = useState(false);
  const [showRoomID, setShowRoomID] = useState(false);
  const [showRoomInfo, setShowRoomInfo] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  // ルーム検索で見つかったルームのIDをJoinRoomからRoomIDにわたす
  const [joinRoomID, setJoinRoomID] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  console.log("ホーム画面");

  // 読み込み時に実行
  useEffect(() => {
    // ログインしていなかったら、ログイン画面へリダイレクト
    if (!localStorage.getItem("userID")) {
      navigate("/login");
    }
    if (location.state?.tutorial) {
      setShowTutorial(true);
      setShowOverlay(true);
    }
  }, []);

  const closeTutorial = () => {
    setShowTutorial(false);
    setShowOverlay(false);
  };

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
      <PageHeader title={"ホーム"} />
      <Help currentPage="home" />
      <div className="flex-box">
        <div className="text-wrapper">
          <img src="/home/frog_front.png" alt="カエルの画像"></img>
          <p>
            入室するルームを
            <br />
            選んでください
          </p>
        </div>
        <button
          onClick={() => {
            openCreateRoom();
            applyOverlay();
          }}
          className="home-button"
        >
          <FontAwesomeIcon icon={faPlus} />
          <div>
            <h3>ルームを作成する</h3>
            <p>新しいルームを作成する</p>
          </div>
        </button>
        <button
          onClick={() => {
            openJoinRoom();
            applyOverlay();
          }}
          className="home-button"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <div>
            <h3>IDでルームを探す</h3>
            <p>作成済みのルームをIDで探す</p>
          </div>
        </button>
        <SelectRoom />
      </div>
      <Navbar currentPage="home" />
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
          removeOverlay={removeOverlay}
        />
      )}
      {showRoomID && <RoomID removeOverlay={removeOverlay} />}
      {showRoomInfo && (
        <RoomInfo
          joinRoomID={joinRoomID}
          closeRoomInfo={closeRoomInfo}
          removeOverlay={removeOverlay}
        />
      )}
      {showTutorial && (
        <Tutorial closeHelp={closeTutorial} showCloseButton={true} />
      )}
    </div>
  );
};

export default Home;
