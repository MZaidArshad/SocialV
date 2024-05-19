import React, { createContext, useEffect, useReducer, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

export const AuthContext = createContext();

const initialState = { isAuthenticated: false };

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { isAuthenticated: true, user: action.payload };
    case "LOGOUT":
      return { isAuthenticated: false };
    default:
      return state;
  }
};

export default function AuthContextProvider(props) {
  const [authentication, dispatch] = useReducer(reducer, initialState);
  const [userDetail, setUserDetail] = useState({});
  const [crntUser, setCurrentUser] = useState({});
  const { user, isAuthenticated } = authentication;
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in");
        dispatch({ type: "LOGIN", payload: user });
        setUserDetail(user);
      } else {
        dispatch({ type: "LOGOUT" });
        console.log("User is signed out");
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authentication,
        dispatch,
        userDetail,
        isAuthenticated,
        user,
        crntUser,
        setCurrentUser,
        setUserDetail,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
