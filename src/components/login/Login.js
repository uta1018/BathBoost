import { signInWithPopup } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { auth, db, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Context } from "../../providers/Provider";
import { doc, getDoc } from "firebase/firestore";
import Tutorial from "./Tutorial";
import { themeContext } from "../../providers/Theme";

const Login = () => {
  // グローバル変数を取得
  const { setUserID } = useContext(Context);
  const setThemeColor = useContext(themeContext);

  const navigate = useNavigate();
  console.log("ログイン画面");

  // ログイン済のときホーム画面へ
  useEffect(() => {
    if (localStorage.getItem("userID")) {
      navigate("/");
    }
    setThemeColor("theme1");
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
      setThemeColor("theme1");
      navigate("/first-login");
    } else {
      // ホーム画面にリダイレクト
      // ローカルストレージに保存する
      setThemeColor(docSnap.data().themeColor);
      localStorage.setItem("userID", user.uid);
      localStorage.setItem("themeColor", docSnap.data().themeColor);
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
    </div>
  );
};

export default Login;
