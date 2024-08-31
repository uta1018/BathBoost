import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Context } from "../../providers/Provider";

const Logout = () => {
  // グローバル変数を取得
  const { setUserID, setRoomID } = useContext(Context);
  const navigate = useNavigate();
  console.log("Logout");

  // ログアウトボタンを押したときの関数
  const logOut = () => {
    // ログアウトする
    signOut(auth).then(() => {
      // ローカルストレージをクリア
      localStorage.clear();
      // グローバル変数を変更
      setUserID(null);
      setRoomID(null);
      // ログイン画面にリダイレクト
      navigate("/login");
    });
  };

  return (
    <button className="logout-button" onClick={logOut}>
      ログアウト
    </button>
  );
};

export default Logout;
