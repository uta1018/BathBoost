import React from "react";
import { useNavigate } from "react-router-dom";

const FirstLogin = () => {
  const navigate = useNavigate();
  // 決定ボタンを押したときの関数
  const handleFirstLogin = () => {
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
      FirstLogin
      {/* タイトル */}
      {/* ユーザーネーム入力エリア */}
      {/* アイコン選択エリア */}
      <button onClick={handleFirstLogin}>決定</button>
    </div>
  );
};

export default FirstLogin;
