import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import User from "./components/user/User";
import Log from "./components/log/Log";
import Login from "./components/login/Login";
import Room from "./components/room/Room";
import { Provider } from "./providers/Provider";
import { ThemeProvider } from "./providers/Theme";
import "./components/css/common/Button.css";
import "./components/css/common/Font.css";
import "./components/css/common/Help.css";
import "./components/css/common/HomeButton.css";
import "./components/css/common/Navbar.css";
import "./components/css/common/PageHeader.css";
import "./components/css/common/Popup.css";
import "./components/css/common/PopupHeader.css";
import "./components/css/common/ThemeColor.css";
import "./components/css/home/Home.css";
import "./components/css/home/SelectRoom.css";

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
            <Route path="/room" element={<Room />}></Route>
          </Routes>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
