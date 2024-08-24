import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Room from "./components/room/Room";
import { Provider } from "./providers/Provider";
import LevelUp from "./components/room/LevelUp";

function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/room" element={<Room />}></Route>
          <Route path="/levelup" element={<LevelUp />}></Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
