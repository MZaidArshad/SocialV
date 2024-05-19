import React, { useEffect, useState, useContext } from "react";

import GoogleIcon from "@mui/icons-material/Google";
import { IconButton } from "@mui/material";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth, provider } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import addUser from "../../utils/addUser";

const GoogleAuthBtn = () => {
  const { dispatch } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //handleGoogle
  const handleGoogle = async () => {
    setIsLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          console.log(credential);
          console.log(result.user);

          const signedInUser = result.user; // Get the user info from the sign-in result

          dispatch({ type: "LOGIN", payload: signedInUser });
          // window.toastify("User is signin successfully", "success");
          await addUser(signedInUser);
          setIsLoading(false);
          navigate("/");
        })
        .catch((error) => {
          setIsLoading(false);
          console.error(error.message, "error");
        });
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };
  return (
    <IconButton className="google_login" onClick={handleGoogle}>
      <GoogleIcon />
    </IconButton>
  );
};

export default GoogleAuthBtn;
