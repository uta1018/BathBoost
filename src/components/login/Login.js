import { signInWithPopup } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth, db, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Context } from "../../providers/Provider";
import { doc, getDoc } from "firebase/firestore";
import FirstLogin from "./FirstLogin";
import Tutorial from "./Tutorial";
// import "./css/Login.css";

const Login = () => {
  // グローバル変数を取得
  const { userID, setUserID } = useContext(Context);
  // ポップアップの表示を管理する変数
  const [showFirstLogin, setShowFirstLogin] = useState(false);

  const navigate = useNavigate();
  console.log("ログイン画面");

  // ログイン済のときホーム画面へ
  useEffect(() => {
    if (userID) {
      navigate("/");
    }
  }, []);

  // ログインボタンを押したときの関数
  const logInWithGoogle = async () => {
    // ログインする
    await signInWithPopup(auth, provider);
    const user = auth.currentUser;

    // ローカルストレージに保存する
    localStorage.setItem("userID", user.uid);
    // グローバル変数を変更
    setUserID(user.uid);

    // DBのuserコレクションからログインしたユーザーのドキュメントを取得
    const userDocRef = doc(db, "user", user.uid);
    const docSnap = await getDoc(userDocRef);

    // ユーザードキュメントが存在しなかったらポップアップを表示するように変数切り替え
    if (!docSnap.exists()) {
      setShowFirstLogin(true);
    } else {
      // ホーム画面にリダイレクト
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <div className="logo-box">
          <img src="/logo.png" className="logoImg" width={100}></img>
          <img src="/login/logo_text.png" className="logoImg" width={100}></img>
        </div>
      </div>
      <div className="content">
        <div className="image-container">
          <div className="circle"></div>
          <img
            src="/login/cat_frog_bathboost.png"
            alt="Animal"
            width={200}
            className="login_image"
          />
        </div>
        <button onClick={logInWithGoogle} className="login-button">
          Googleアカウントで<br></br>ログイン
        </button>
        <Tutorial />
      </div>
      <div className="footer">
        <p>@ライラック</p>
      </div>
      {/* ポップアップ */}
      {showFirstLogin ? <FirstLogin /> : <></>}
    </div>
  );
};

export default Login;
