import React from "react";
import "./menuBar.scss";

const MenuBar = ({ activeMenu, setActiveMenu, myProfile }) => {
  return (
    <div className="menu-bar">
      {["Timeline", "About", "Photos", myProfile && "Edit Profile"].map(
        (menu) =>
          menu && (
            <div
              key={menu}
              className={`menu-item ${activeMenu === menu ? "active" : ""}`}
              onClick={() => setActiveMenu(menu)}
            >
              {menu}
            </div>
          )
      )}
    </div>
  );
};

export default MenuBar;
