import { signInWithPopup } from "firebase/auth";
import React, { useContext } from "react";
import { auth, db, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Context } from "../providers/Provider";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "./css/Login.css";

const Login = () => {
  const { setIsAuth } = useContext(Context);
  const navigate = useNavigate();

  const logInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
    const user = auth.currentUser;

    localStorage.setItem("isAuth", "true");
    setIsAuth(true);

    const userDocRef = doc(db, "user", user.uid);
    const docSnap = await getDoc(userDocRef);

    if (!docSnap.exists()) {
      await setDoc(doc(db, "user", user.uid), {
        username: user.displayName,
        level: 0,
        point: 0,
        rooms: [],
      });
    }
  
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="header">
        <div className="logo-box">
          <div className="square"></div>
          <div className="logo">BATH BOOST</div>
        </div>
      </div>
      <div className="content">
        <div className="image-container">
          <div className="circle"></div>
          <img src="/img/login_img.png" alt="Animal" className="login_image" />
        </div>


        <div className="title">BATH BOOST</div>
          <button onClick={logInWithGoogle} className="login-button">
            Googleアカウントで<br></br>ログイン
          </button>
        </div>
      <div className="footer">
        <p>@ライラック</p>
      </div>
    </div>
  );
};

export default Login;
