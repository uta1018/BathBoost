import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Subheading from "../common/Subheading";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Context } from "../../providers/Provider";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FirstLogin = () => {
  const { userID } = useContext(Context);
  // 入力されたユーザーネームを保存する変数
  const [userName, setUserName] = useState("");
  // 選択されたアイコンを保存する変数
  const [icon, setIcon] = useState("/icon/paw1.png");
  // バリデーションのメッセージを管理する変数
  const [usernameError, setUsernameError] = useState({
    message: "※8文字まで入力することができます",
    className: "",
  });
  const inputRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('userID') || !userID) {
      navigate("/");
    }
    localStorage.setItem("themeColor", "theme1");
    inputRef.current.focus();
  }, []);

  // usename のバリデーション関数
  const validateUsername = (name) => {
    if (name.length < 1) {
      return {
        message: "名前を入力してください",
        className: "error-mesesage",
      };
    } else if (1 <= name.length && name.length <= 8) {
      return { message: "※8文字まで入力することができます", className: "" };
    } else if (8 < name.length) {
      return {
        message: "名前は8文字以内で入力してください",
        className: "error-mesesage",
      };
    }
  };

  // username の入力変更時にバリデーションを実行
  const handleUsernameChange = (e) => {
    const name = e.target.value;
    setUserName(name);
    const error = validateUsername(name);
    setUsernameError(error);
  };

  // 決定ボタンを押したときの関数
  const handleFirstLogin = async () => {
    await setDoc(doc(db, "user", userID), {
      userName: userName,
      icon: icon,
      themeColor: "theme1",
      level: 0,
      highestLevel: 0,
      point: 0,
      date: new Date().getTime(),
      bathCount: 0,
      goalStreakCount: 0,
      longestGoalStreakCount: 0,
      rooms: [],
      setBathGoalStamp: ["/setBathGoalStamp/1.png"],
      startBathStamp: ["/startBathStamp/1.png"],
      endBathStamp: ["/endBathStamp/1.png"],
      iconList: ["/icon/paw1.png", "/icon/paw2.png", "/icon/paw3.png"],
      themeColorList: ["theme1"],
    });

    // ローカルストレージに保存する
    localStorage.setItem("userID", userID);
    navigate("/", { state: { tutorial: true } });
  };

  return (
    <div className="first-login-container">
      <div className="flex-box">
        <div className="header">
          <div className="title">
            <FontAwesomeIcon icon={faPaw} />
            <h3>プロフィール設定</h3>
          </div>
          <p>※後で設定で変更できます</p>
        </div>
        <Subheading title="ユーザーネーム" />
        <input
          ref={inputRef}
          className="input"
          type="text"
          placeholder="名前を入力してください"
          value={userName}
          onChange={handleUsernameChange}
        />
        <p className={usernameError.className}>{usernameError.message}</p>
        <Subheading title="アイコン" />
        <h4>アイコンを選択してください</h4>
        <div className="icon-wrapper">
          <img
            src="/icon/paw1.png"
            alt="アイコン1"
            onClick={() => setIcon("/icon/paw1.png")}
            className={`icon ${
              icon === "/icon/paw1.png" ? "icon-selected" : ""
            }`}
          />
          <img
            src="/icon/paw2.png"
            alt="アイコン2"
            onClick={() => setIcon("/icon/paw2.png")}
            className={`icon ${
              icon === "/icon/paw2.png" ? "icon-selected" : ""
            }`}
          />
          <img
            src="/icon/paw3.png"
            alt="アイコン3"
            onClick={() => setIcon("/icon/paw3.png")}
            className={`icon ${
              icon === "/icon/paw3.png" ? "icon-selected" : ""
            }`}
          />
        </div>
        <button
          className="button button-w280 ok-button-main"
          onClick={handleFirstLogin}
          disabled={userName.length < 1 || 8 < userName.length}
        >
          決定
        </button>
      </div>
    </div>
  );
};

export default FirstLogin;
