import React, { useContext, useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import Logout from "./Logout";
import PageHeader from "../common/PageHeader";
import PageSubheading from "../common/PageSubheading";
import Help from "../common/Help";
import Profile from "./Profile";
import SelectColor from "./SelectColor";
import SettingRoom from "./SettingRoom";
import { Context } from "../../providers/Provider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Loading from "../common/Loading";
import NotificationButton from "../common/NotificationButton";

const User = () => {
  const { userID } = useContext(Context);
  // ユーザー情報を保存
  const [userData, setUserData] = useState();
  // ユーザー情報の更新を感知
  const [changeData, setChangeData] = useState(false);

  const navigate = useNavigate();
  console.log("ユーザー画面");

  const changeLevelToggle = () => {
    console.log("トグル");
    setChangeData((prevChangeData) => !prevChangeData);
  };

  useEffect(() => {
    console.log("fetchData");
    // ログインしていなかったらログイン画面へ
    if (!localStorage.getItem('userID')) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      if (!userID) return;

      // ユーザー情報を取得
      const userDocRef = doc(db, "user", userID);
      const userDocSnap = await getDoc(userDocRef);
      const userData = { id: userDocSnap.id, ...userDocSnap.data() };

      setUserData(userData);
    };

    fetchData();
  }, [changeData]);

  if (!userData) {
    return <Loading />;
  }

  return (
    <div className="user-container">
      <PageHeader title="せってい" />
      <Help currentPage="setting"/>
      <div className="flex-box">
        <Profile changeLevelToggle={changeLevelToggle} {...userData} />
        <div className="for-position-wrapper">
          <img src="/user/cat_front.png" alt="猫のイラスト" />
          <PageSubheading title="テーマカラー" />
        </div>
        <SelectColor {...userData} />
        <PageSubheading title="ルーム" />
        <SettingRoom changeLevelToggle={changeLevelToggle} {...userData} />
        <PageSubheading title="通知" />
        <NotificationButton />
        <Logout />
      </div>
      <Navbar currentPage="user" />
    </div>
  );
};

export default User;
