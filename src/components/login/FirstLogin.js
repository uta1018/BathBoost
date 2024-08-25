import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

const FirstLogin = () => {
  const navigate = useNavigate();

  // username を管理する変数
  const [username, setUsername] = useState("");
  // icon を管理する変数
  const [icon, setIcon] = useState(null);
  // バリデーションのエラーを管理する変数
  const [error, setError] = useState("");
  // 決定ボタンのクリックが可能かを判別する変数
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const validationError = validateUsername(username);
    setError(validationError);
    setIsButtonDisabled(validationError !== "" || !icon);
  }, [username, icon]);

  // usename のバリデーション関数
  const validateUsername = (name) => {
    if (name.length < 1) {
      return " ";
    } else if (name.length > 8) {
      return "名前は8文字以内で入力してください。";
    }
    return "";
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
      <h3>プロフィール設定</h3>
      {/* ユーザーネーム入力エリア */}
      <input
        type="text"
        placeholder="名前を入力してください"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div>※全角8文字まで入力することができます</div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* アイコン選択エリア */}
      <div>
        <p>アイコンを選択してください</p>
        {/* アイコン選択例 */}
        <img
          src="/logo.png"
          width={100}
          alt="アイコン1"
          onClick={() => setIcon("/logo.png")}
          style={{ border: icon === "/logo.png" ? "2px solid #B9B9B9" : "" }}
        />
        <img
          src="/tellID.png"
          width={100}
          alt="アイコン2"
          onClick={() => setIcon("/tellID.png")}
          style={{ border: icon === "/tellID.png" ? "2px solid #B9B9B9" : "" }}
        />
      </div>
      <button 
        onClick={handleFirstLogin}
        disabled={isButtonDisabled}
      >
        決定
      </button>
    </div>
  );
};

export default FirstLogin;
