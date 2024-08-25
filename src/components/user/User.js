import React from "react";
import Navbar from "../common/Navbar";
import Logout from "./Logout";
import PageHeader from "../common/PageHeader";
import PageSubheading from "../common/PageSubheading";
import Help from "../common/Help";
import Profile from "./Profile";
import SelectColor from "./SelectColor";
import SettingRoom from "./SettingRoom";

const User = () => {
  console.log("ユーザー画面");
  
  return (
    <div>
      <PageHeader title="きろく" />
      <Help />
      <Profile />
      <PageSubheading title="テーマカラー"/>
      <SelectColor />
      <PageSubheading title="ルーム"/>
      <SettingRoom />
      <Logout />
      <Navbar currentPage="user" />
    </div>
  );
};

export default User;
