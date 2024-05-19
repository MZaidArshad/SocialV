import React, { useState, useEffect, useContext } from "react";

import "./editprofile.scss";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";

const EditProfile = ({ userData }) => {
  const { user } = useContext(AuthContext);

  const [profileData, setProfileData] = useState({
    email: "",
    mobile: "",
    address: "",
    website: "",
    socialLink: "",
    birthDay: "",
    gender: "",
    interestedIn: "",
    language: "",
  });

  useEffect(() => {
    if (userData) {
      setProfileData({
        email: userData.email || "",
        mobile: userData.mobile || "",
        address: userData.address || "",
        website: userData.website || "",
        socialLink: userData.socialLink || "",
        birthDay: userData.birthDay || "",
        gender: userData.gender || "Male",
        interestedIn: userData.interestedIn || "",
        language: userData.language || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userRef = doc(db, "Users", user.uid);

      // Update the user profile data in Firestore
      await updateDoc(userRef, profileData);
      alert("Profile Data Updated Successfully!");
      console.log("Profile Data Updated Successfully!");
      // Optionally, perform additional actions after successful update
    } catch (error) {
      alert("Error Updating Profile Data:", error);
      console.error("Error Updating Profile Data:", error);
    }
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profileData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Mobile</label>
          <input
            type="text"
            name="mobile"
            placeholder="+9230********"
            value={profileData.mobile}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={profileData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={profileData.website}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Social Link</label>
          <input
            type="text"
            name="socialLink"
            value={profileData.socialLink}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Birth Day</label>
          <input
            type="date"
            name="birthDay"
            value={profileData.birthDay}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select
            className="form-select"
            name="gender"
            value={profileData.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Interested in</label>
          <input
            type="text"
            placeholder="Learning, Traveling ..."
            name="interestedIn"
            value={profileData.interestedIn}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Language</label>
          <input
            type="text"
            placeholder="Urdu, English..."
            name="language"
            value={profileData.language}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
