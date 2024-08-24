import React from "react";
import { useNavigate } from "react-router-dom";

//アイコンのインポート
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faGear, faFilePen } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ currentPage }) => {
  const navigate = useNavigate();

  // テキストとアイコンの色を変更する関数
  const getColor = (page) => {
    // 現在のページと一致する場合、"#97D0BE"を採用
    return currentPage === page ? "#97D0BE" : "#FFFFFF";
  };

  return (
    <nav>
      {/* ユーザーボタン */}
      <button onClick={() => navigate("/user")}>
        <FontAwesomeIcon icon={faGear} color={getColor("user")} />
        <span style={{ color: getColor("user") }}>せってい</span>
      </button>

      {/* ホームボタン */}
      <button onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faHouse} color={getColor("home")} />
        <span style={{ color: getColor("home") }}>ホーム</span>
      </button>

      {/* ログボタン */}
      <button onClick={() => navigate("/log")}>
        <FontAwesomeIcon icon={faFilePen} color={getColor("log")} />
        <span style={{ color: getColor("log") }}>きろく</span>
      </button>
    </nav>
  );
};

export default Navbar;
