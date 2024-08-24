import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Subheading from "../common/Subheading";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Context } from "../../providers/Provider";

const FirstLogin = () => {
  const {userID} = useContext(Context);
  // 入力されたユーザーネームを保存する変数
  const [username, setUsername] = useState("");
  // 選択されたアイコンを保存する変数
  const [icon, setIcon] = useState("/icon/paw1.png");
  // バリデーションのメッセージを管理する変数
  const [usernameError, setUsernameError] = useState({
    message: "※8文字まで入力することができます。",
    color: "black",
  });

  const navigate = useNavigate();

  // usename のバリデーション関数
  const validateUsername = (name) => {
    if (name.length < 1) {
      return { message: "名前を入力してください。", color: "red" };
    } else if (1 <= name.length && name.length <= 8) {
      return { message: "※8文字まで入力することができます。", color: "black" };
    } else if (8 < name.length) {
      return { message: "名前は8文字以内で入力してください。", color: "red" };
    }
  };

  // username の入力変更時にバリデーションを実行
  const handleUsernameChange = (e) => {
    const name = e.target.value;
    setUsername(name);
    const error = validateUsername(name);
    setUsernameError(error);
  };

  // 決定ボタンを押したときの関数
  const handleFirstLogin = async () => {
    await setDoc(doc(db, "user", userID), {
      username: username,
      icon: icon,
      themeColor: "theme1",
      level: 0,
      highestLevel: 0,
      point: 0,
      date: new Date().getTime(),
      bathCount: 0,
      goalStreakCount: 0,
      rooms: [],
      setBathGoalStamp: ["/setBathGoalStamp/1.png"],
      startBathStamp: ["/startBathStamp/1.png"],
      endBathStamp: ["/endBathStamp/1.png"],
      iconList: ["/icon/paw1.png", "/icon/paw2.png", "/icon/paw3.png"],
      themeColorList: ["theme1"],
    });
    navigate("/");
  };

  return (
    <div>
      {/* タイトル */}
      <div>プロフィール設定</div>
      <div>※後で設定で変更できます</div>

      {/* ユーザーネーム入力エリア */}
      <Subheading title="ユーザーネーム" />
      <input
        type="text"
        placeholder="名前を入力してください"
        value={username}
        onChange={handleUsernameChange}
      />
      <p style={{ color: usernameError.color }}>{usernameError.message}</p>

      {/* アイコン選択エリア */}
      <Subheading title="アイコン" />
      <div>
        <p>アイコンを選択してください</p>
        <img
          src="/icon/paw1.png"
          alt="アイコン1"
          onClick={() => setIcon("/icon/paw1.png")}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            outlineOffset: "3px",
            outline: icon === "/icon/paw1.png" ? "3px solid #B9B9B9" : "",
            cursor: "pointer",
          }}
        />
        <img
          src="/icon/paw2.png"
          alt="アイコン2"
          onClick={() => setIcon("/icon/paw2.png")}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            outlineOffset: "3px",
            outline: icon === "/icon/paw2.png" ? "3px solid #B9B9B9" : "",
            cursor: "pointer",
          }}
        />
        <img
          src="/icon/paw3.png"
          alt="アイコン3"
          onClick={() => setIcon("/icon/paw3.png")}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            outlineOffset: "3px",
            outline: icon === "/icon/paw3.png" ? "3px solid #B9B9B9" : "",
            cursor: "pointer",
          }}
        />
      </div>

      {/* 決定ボタン */}
      <button
        onClick={handleFirstLogin}
        disabled={username.length < 1 || 8 < username.length}
      >
        決定
      </button>
    </div>
  );
};

export default FirstLogin;
