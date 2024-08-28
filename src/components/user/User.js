import React from "react";
import Navbar from "../common/Navbar";
import Logout from "./Logout";

const User = () => {
  return (
    <div>
      <div>ユーザー画面</div>
      <Logout />
      <Navbar currentPage="user" />
    </div>
  );
};

export default User;
