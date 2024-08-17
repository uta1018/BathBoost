import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { Context } from '../providers/Provider'
import "./css/Home.css";

const Logout = () => {
  // グローバル変数を取得
  const { setIsAuth, setRoomID } = useContext(Context);
  const navigate = useNavigate();

  // ログアウトボタンを押したときの関数
  const logOut = () => {
    // ログアウトする
    signOut(auth).then(() => {
      // ローカルストレージをクリア
      localStorage.clear();
      // グローバル変数を変更
      setIsAuth(false);
      setRoomID("");
      // ログイン画面にリダイレクト
      navigate("/login");
    });
  }

  return (
    <div>
      <button className="logout-button" onClick={logOut}>ログアウト</button>
    </div>
  )
}

export default Logout;
