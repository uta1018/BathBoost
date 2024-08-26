import React, {  useState } from 'react'
import { useNavigate } from "react-router-dom";
import Subheading from "../common/Subheading";

const FirstLogin = () => {
  const navigate = useNavigate();

  // 入力されたユーザーネームを保存する変数
  const [username, setUsername] = useState("");
  // 選択されたアイコンを保存する変数
  const [icon, setIcon] = useState(null);
  // バリデーションのエラーを管理する変数
  const [usernameError, setUsernameError] = useState("名前を入力してください。");
  // アイコン未選択のエラーを管理する変数
  const [iconError, setIconError] = useState("アイコンを1つ選択する必要があります。");

  // usename のバリデーション関数
  const validateUsername = (name) => {
    if (name.length < 1) {
      return "名前を入力してください。";
    } else if (name.length > 8) {
      return "名前は8文字以内で入力してください。";
    }
    return "";
  };

  // username の入力変更時にバリデーションを実行
  const handleUsernameChange = (e) => {
    const name = e.target.value;
    setUsername(name);
    const error = validateUsername(name);
    setUsernameError(error);
  };

  // アイコンが選択された時にエラーメッセージをクリア
  const handleIconSelect = (selectedIcon) => {
    setIcon(selectedIcon);
    setIconError("");
  };

  // 決定ボタンを押したときの関数
  const handleFirstLogin = () => {

    // console.log("username:", username);
    // console.log("icon:", icon);

    // 入力エリアの情報を読み取って、userに保存
    // 例 await setDoc(doc(db, "user", user.uid), {
      //   username: user.displayName,
      //   level: 0,
      //   point: 0,
      //   rooms: [],
      // });
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
      <div>※全角8文字まで入力することができます</div>
      {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}

      {/* アイコン選択エリア */}
      <Subheading title="アイコン" />
      <div>
        <p>アイコンを選択してください</p>
        <img
          src="/icon/paw1.png"
          width={100}
          alt="アイコン1"
          onClick={() => handleIconSelect("/icon/paw1.png")}
          style={{ 
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            outlineOffset: "3px",
            outline: icon === "/icon/paw1.png" ? "3px solid #B9B9B9" : "",
            cursor: "pointer"
          }}
        />
        <img
          src="/icon/paw2.png"
          width={100}
          alt="アイコン2"
          onClick={() => handleIconSelect("/icon/paw2.png")}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            outlineOffset: "3px",
            outline: icon === "/icon/paw2.png" ? "3px solid #B9B9B9" : "",
            cursor: "pointer"
          }}
        />
        <img
          src="/icon/paw3.png"
          width={100}
          alt="アイコン3"
          onClick={() => handleIconSelect("/icon/paw3.png")}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            outlineOffset: "3px",
            outline: icon === "/icon/paw3.png" ? "3px solid #B9B9B9" : "",
            cursor: "pointer"
          }}
        />
        {iconError && <p style={{ color: "red" }}>{iconError}</p>}
      </div>

      {/* 決定ボタン */}
      <button 
        onClick={handleFirstLogin}
        disabled={usernameError !== "" || icon === null}
      >
        決定
      </button>
    </div>
  );
};

export default FirstLogin;
