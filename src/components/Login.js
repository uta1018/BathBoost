import { signInWithPopup } from "firebase/auth";
import React, { useContext } from "react";
import { auth, db, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Context } from "../providers/Provider";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
    <div>
      <p>ログインして始める</p>
      <button onClick={logInWithGoogle}>Googleでログイン</button>
    </div>
  );
};

export default Login;
