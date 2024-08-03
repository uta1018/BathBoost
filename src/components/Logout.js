import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { Context } from '../providers/Provider'

const Logout = () => {
  const { setIsAuth } = useContext(Context);
  const navigate = useNavigate();
  const logOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/login");
    });
  }

  return (
    <div>
      <p>ログアウトする</p>
      <button onClick={logOut}>ログアウト</button>
    </div>
  )
}

export default Logout;
