import "./profileHeader.scss";
import coverPhoto from "../../assets/images/profile-bg.jpg";

import profile from "../../assets/images/profile-11.jpg";

import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Avatar } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const ProfileHeader = ({ postsCount, userData }) => {
  const { user } = useContext(AuthContext);

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const followers = getRandomNumber(100, 1000);
  const following = getRandomNumber(100, 1000);

  return (
    <div className="profileHeader">
      <div className="profileHeader_coverPhoto">
        <img src={coverPhoto} alt="" />
      </div>
      <div className="profileHeader_photo_and_details">
        <div className="social_icons">
          <a>
            <FacebookOutlinedIcon />
          </a>
          <a>
            <WhatsAppIcon />
          </a>
          <a>
            <LinkedInIcon />
          </a>
        </div>

        <div className="photo_and_name">
          <Avatar alt="Zaidi" src={userData?.photoURL} className="avatar" />
          <h4>{userData?.displayName}</h4>
        </div>
        <div className="stats">
          <div className="stat">
            <p className="heading">Posts</p>
            <p>{postsCount}</p>
          </div>
          <div className="stat">
            <p className="heading">Followers</p>
            <p>{followers}</p>
          </div>
          <div className="stat">
            <p className="heading">Following</p>
            <p>{following}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
