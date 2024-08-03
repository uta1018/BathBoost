import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Room from "./components/Room";
import RoomInfo from "./components/RoomInfo";
import TimeSelect from "./components/TimeSelect";
import { Provider } from "./providers/Provider";
import LevelUp from "./components/LevelUp";

function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/login"
            element={<Login />}
          ></Route>
          <Route path="/room" element={<Room />}></Route>
          <Route path="/roominfo" element={<RoomInfo />}></Route>
          <Route path="/timeselect" element={<TimeSelect />}></Route>
          <Route path="/levelup" element={<LevelUp />}></Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
