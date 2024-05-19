import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import MyProfile from "./pages/my-profile/MyProfile";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute Component={<Home />} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/profile/:id"
        element={<PrivateRoute Component={<MyProfile />} />}
      />
    </Routes>
  );
}

export default App;
