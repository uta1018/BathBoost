import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import SelectRoom from "./SelectRoom";
import Logout from "./Logout";
import { Context } from "../providers/Provider";

const Home = () => {
  const { setIsAuth } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuth(localStorage.getItem("isAuth"));
    if (!localStorage.getItem("isAuth")) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <CreateRoom />
      <JoinRoom />
      <SelectRoom />
      <Logout />
    </div>
  );
};

export default Home;
