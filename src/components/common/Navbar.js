import React from "react";
import { useNavigate } from "react-router-dom";

//アイコンのインポート
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ currentPage }) => {
  const navigate = useNavigate();

  // ボタンの色を変更する関数
  const buttonStyle = (page) => {
    // 現在のページと一致する場合、背景色を変更
    return currentPage === page ? { backgroundColor: "#97D0BE" } : {};
  };

  return (
    <nav>
      {/* ユーザーボタン */}
      <button onClick={() => navigate("/user")}>
        <FontAwesomeIcon icon={faGear} color="red"/>
        せってい
      </button>

      {/* ホームボタン */}
      <button onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faHouse} color="red"/>
        ホーム
      </button>

      {/* ログボタン */}
      <button onClick={() => navigate("/log")}>
        <FontAwesomeIcon icon={faFilePen} color="red"/>
        きろく
      </button>
    </nav>
  );
};

export default Navbar;
