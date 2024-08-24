import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import User from "./components/user/User";
import Log from "./components/log/Log";
import Login from "./components/login/Login";
import Room from "./components/room/Room";
import RoomInfo from "./components/room/RoomInfo";
import TimeSelect from "./components/room/TimeSelect";
import { Provider } from "./providers/Provider";
import LevelUp from "./components/room/LevelUp";

function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/log" element={<Log />}></Route>
          <Route path="/login" element={<Login />}></Route>
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
