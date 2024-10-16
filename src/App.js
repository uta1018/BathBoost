import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import User from "./components/user/User";
import Log from "./components/log/Log";
import Login from "./components/login/Login";
import Room from "./components/room/Room";
import { Provider } from "./providers/Provider";
import { ThemeProvider } from "./providers/Theme";

import "./components/css/utils/Button.css";
import "./components/css/utils/Font.css";
import "./components/css/utils/HomeButton.css";
import "./components/css/utils/Input.css";
import "./components/css/utils/Popup.css";
import "./components/css/utils/ThemeColor.css";

import "./components/css/common/CopyButton.css";
import "./components/css/common/Help.css";
import "./components/css/common/Loading.css";
import "./components/css/common/Navbar.css";
import "./components/css/common/NotificationButton.css";
import "./components/css/common/PageHeader.css";
import "./components/css/common/PageSubheading.css";
import "./components/css/common/PopupHeader.css";
import "./components/css/common/RoomDetail.css";
import "./components/css/common/Subheading.css";

import "./components/css/home/CreateRoom.css";
import "./components/css/home/Home.css";
import "./components/css/home/JoinRoom.css";
import "./components/css/home/RoomID.css";
import "./components/css/home/RoomInfo.css";
import "./components/css/home/SelectRoom.css";

import "./components/css/login/FirstLogin.css";
import "./components/css/login/Login.css";
import "./components/css/login/Tutorial.css";

import "./components/css/room/CancelDialog.css";
import "./components/css/room/LevelUp.css";
import "./components/css/room/PointUp.css";
import "./components/css/room/PostItem.css";
import "./components/css/room/Room.css";
import "./components/css/room/RoomNavbar.css";
import "./components/css/room/SelectStamp.css";
import "./components/css/room/SetBathGoal.css";

import "./components/css/user/ChangeRoomName.css";
import "./components/css/user/Logout.css";
import "./components/css/user/Profile.css";
import "./components/css/user/SelectColor.css";
import "./components/css/user/SelectIcon.css";
import "./components/css/user/SettingRoom.css";
import "./components/css/user/User.css";

import "./components/css/log/Log.css";
import FirstLogin from "./components/login/FirstLogin";
import Notification from "./components/common/Notification";

function App() {
  return (
    <ThemeProvider>
      <Provider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/user" element={<User />}></Route>
            <Route path="/log" element={<Log />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/first-login" element={<FirstLogin />}></Route>
            <Route path="/room" element={<Room />}></Route>
          </Routes>
        </Router>
        <Notification />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
