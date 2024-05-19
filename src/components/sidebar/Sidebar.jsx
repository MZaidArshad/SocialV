import React, { useContext, useEffect } from "react";
import "./sidebar.scss";

import profileImg2 from "../../assets/images/profile-2.jpg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const menuItems = document.querySelectorAll(".menu-item");

    const changeActiveItem = () => {
      menuItems.forEach((item) => {
        item.classList.remove("active");
      });
    };

    menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        changeActiveItem();
        item.classList.add("active");
        const notificationsPopup = document.querySelector(
          ".notifications-popup"
        );
        if (item.id !== "notifications") {
          notificationsPopup.style.display = "none";
        } else {
          notificationsPopup.style.display = "block";
          document.querySelector(
            "#notifications .notification-count"
          ).style.display = "none";
        }
      });
    });

    return () => {
      menuItems.forEach((item) => {
        item.removeEventListener("click", () => {});
      });
    };
  }, []);

  return (
    <>
      <Link class="profile" to={`/profile/${user.uid}`}>
        <div class="profile-photo">
          <img src={user?.photoURL} alt="" />
        </div>
        <div class="handle">
          <h4>{user?.displayName.split(" ").slice(0, 2).join(" ")}</h4>
          <p class="text-muted">@{user?.displayName.split(" ")[0]}</p>
        </div>
      </Link>
      <div className="sidebar">
        <a className="menu-item active">
          <span>
            <i className="uil uil-home"></i>
          </span>
          <h3>Home</h3>
        </a>
        <a className="menu-item">
          <span>
            <i className="uil uil-compass"></i>
          </span>
          <h3>Explore</h3>
        </a>
        <a className="menu-item" id="notifications">
          <span>
            <i className="uil uil-bell">
              <small className="notification-count">9+</small>
            </i>
          </span>
          <h3>Notification</h3>
          <div className="notifications-popup">
            <div>
              <div className="profile-photo">
                <img src={profileImg2} alt="Profile 2" />
              </div>
              <div className="notification-body">
                <b>Keke Benjamin</b> accepted your friend request
                <small className="text-muted">2 Days Ago</small>
              </div>
            </div>
            <div>
              <div className="profile-photo">
                <img src={profileImg2} alt="Profile 3" />
              </div>
              <div className="notification-body">
                <b>John Doe</b> commented on your post
                <small className="text-muted">1 Hour Ago</small>
              </div>
            </div>
            <div>
              <div className="profile-photo">
                <img src={profileImg2} alt="Profile 4" />
              </div>
              <div className="notification-body">
                <b>Marry Oppong</b> and <b>283 Others</b> liked your post
                <small className="text-muted">4 Minutes Ago</small>
              </div>
            </div>
            <div>
              <div className="profile-photo">
                <img src={profileImg2} alt="Profile 5" />
              </div>
              <div className="notification-body">
                <b>Doris Y. Lartey</b> commented on a post you are tagged in
                <small className="text-muted">2 Days Ago</small>
              </div>
            </div>
            <div>
              <div className="profile-photo">
                <img src={profileImg2} alt="Profile 6" />
              </div>
              <div className="notification-body">
                <b>Keyley Jenner</b> commented on a post you are tagged in
                <small className="text-muted">1 Hour Ago</small>
              </div>
            </div>
            <div>
              <div className="profile-photo">
                <img src={profileImg2} alt="Profile 7" />
              </div>
              <div className="notification-body">
                <b>Jane Doe</b> commented on your post
                <small className="text-muted">1 Hour Ago</small>
              </div>
            </div>
          </div>
        </a>
        <a className="menu-item" id="messages-notifications">
          <span>
            <i className="uil uil-envelope-alt">
              <small className="notification-count">6</small>
            </i>
          </span>
          <h3>Messages</h3>
        </a>
        <a className="menu-item">
          <span>
            <i className="uil uil-bookmark"></i>
          </span>
          <h3>Bookmarks</h3>
        </a>
      </div>
    </>
  );
};

export default Sidebar;
