import { signInWithPopup } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth, db, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Context } from "../../providers/Provider";
import { doc, getDoc } from "firebase/firestore";
import FirstLogin from "./FirstLogin";
import Tutorial from "./Tutorial";

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
      // ローカルストレージに保存する
      localStorage.setItem("userID", user.uid);
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <header>
        <div className="logo-wrapper">
          <img src="/logo.png" alt="ロゴ" className="logo"></img>
          <img
            src="/login/logo_text.png"
            alt="BATH BOOST"
            className="title"
          ></img>
        </div>
      </header>
      <div className="flex-box">
        <img src="/login/cat_frog_bathboost.png" alt="猫と蛙の画像" />
        <button onClick={logInWithGoogle} className="login-button">
          <p>Googleアカウントで</p>
          <p>ログイン</p>
        </button>
        <Tutorial />
      </div>
      <footer>
        <p>@ライラック</p>
      </footer>
      {/* ポップアップ */}
      {showFirstLogin ? <FirstLogin /> : <></>}
    </div>
  );
};

export default Login;
