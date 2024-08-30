import React from "react";
import { useNavigate } from "react-router-dom";

//アイコンのインポート
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faGear, faFilePen } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ currentPage }) => {
  const navigate = useNavigate();

  // 現在のページに基づいてクラス名を決定する関数
  const getIconClass = (page) => {
    return currentPage === page && "icon-active";
  };

  return (
    <nav className="navbar-container">
      {/* ユーザーボタン */}
      <button onClick={() => navigate("/user")} className={getIconClass("user")}>
        <FontAwesomeIcon
          icon={faGear}
          className="icon-user"
        />
        <p>せってい</p>
      </button>

      {/* ホームボタン */}
      <button onClick={() => navigate("/")} className={getIconClass("home")}>
        <FontAwesomeIcon
          icon={faHouse}
          className="icon-home"
        />
        <p>ホーム</p>
      </button>

      {/* ログボタン */}
      <button onClick={() => navigate("/log")} className={getIconClass("log")}>
        <FontAwesomeIcon
          icon={faFilePen}
          className="icon-log"
        />
        <p>きろく</p>
      </button>
    </nav>
  );
};

export default Navbar;
