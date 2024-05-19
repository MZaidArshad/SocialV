import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

import profile from "../assets/images/profile-1.jpg";

const addUser = async (user) => {
  const userDoc = doc(db, "Users", user.uid);

  try {
    const userDocSnapshot = await getDoc(userDoc);

    if (userDocSnapshot.exists()) {
      console.log("User already exists in Firestore:", user.uid);
    } else {
      const userData = {
        email: user.email,
        photoURL: user.photoURL || profile,
        mobile: "",
        address: "",
        website: "",
        socialLink: "",
        birthDate: "",
        gender: "",
        interestedIn: "",
        language: "",
        displayName: user.displayName || "User", // In case displayName is not set
      };

      await setDoc(userDoc, userData);
      console.log("User added to Firestore:", user.uid);
    }
  } catch (error) {
    console.error("Error checking or adding user to Firestore:", error);
  }
};

export default addUser;
