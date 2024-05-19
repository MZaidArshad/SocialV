import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";
import Login from "./pages/login/Login";
// import { Navigate, Route } from "react-router-dom";

export default function PrivateRoute({ Component }) {
  const { isAuthenticated } = useContext(AuthContext);
  if (isAuthenticated) {
    return Component;
  } else {
    return <Login />;
  }
}
