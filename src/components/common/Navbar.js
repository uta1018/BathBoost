import React from "react";
import { useNavigate } from "react-router-dom";

//アイコンのインポート
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faGear, faFilePen } from "@fortawesome/free-solid-svg-icons";
import { TbCrystalBall } from "react-icons/tb";

const Navbar = ({ currentPage }) => {
  const navigate = useNavigate();

  // 現在のページに基づいてクラス名を決定する関数
  const getIconClass = (page) => {
    return currentPage === page && "icon-active";
  };

  return (
    <nav className="navbar-container">
      {/* ホームボタン */}
      <button onClick={() => navigate("/")} className={getIconClass("home")}>
        <FontAwesomeIcon
          icon={faHouse}
          className="icon-home fontawesome-icon"
        />
        <p>ホーム</p>
      </button>

      {/* うらないボタン */}
      <button
        onClick={() => navigate("/fortune")}
        className={getIconClass("fortune")}
      >
        <div className="icon-fortune-container">
          <TbCrystalBall className="icon-fortune fill-icon" />
          <TbCrystalBall className="icon-fortune react-icon" />
        </div>
        <p>うらない</p>
      </button>

      {/* ログボタン */}
      <button onClick={() => navigate("/log")} className={getIconClass("log")}>
        <FontAwesomeIcon
          icon={faFilePen}
          className="icon-log fontawesome-icon"
        />
        <p>きろく</p>
      </button>

      {/* ユーザーボタン */}
      <button
        onClick={() => navigate("/user")}
        className={getIconClass("user")}
      >
        <FontAwesomeIcon icon={faGear} className="icon-user fontawesome-icon" />
        <p>せってい</p>
      </button>
    </nav>
  );
};

export default Navbar;
