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

const User = () => {
  const { userID } = useContext(Context);
  // ユーザー情報を保存
  const [userData, setUserData] = useState();

  console.log("ユーザー画面");

  useEffect(() => {
    console.log("fetchData");
    const fetchData = async () => {
      if (!userID) return;

      // ユーザー情報を取得
      const userDocRef = doc(db, "user", userID);
      const userDocSnap = await getDoc(userDocRef);
      const userData = { id: userDocSnap.id, ...userDocSnap.data() };

      setUserData(userData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <PageHeader title="せってい" />
      <Help />
      <Profile {...userData}/>
      <PageSubheading title="テーマカラー" />
      <SelectColor {...userData}/>
      <PageSubheading title="ルーム" />
      <SettingRoom {...userData}/>
      <Logout />
      <Navbar currentPage="user" />
    </div>
  );
};

export default User;
