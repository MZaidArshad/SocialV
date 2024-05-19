import "./navbar.scss";

import profilePhoto from "../../assets/images/profile-1.jpg";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    const confirmResult = window.confirm("Are you sure to logout?");
    if (confirmResult) {
      try {
        signOut(auth);
        dispatch({ type: "LOGOUT" });
        navigate("/login", { replace: true });
      } catch (error) {
        console.log("Error while doing logout");
      }
    } else console.log("Logout Canceled");
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <nav>
      <div className="container">
        <h2 className="logo" onClick={() => navigate("/")}>
          Social<span>V</span>
        </h2>
        <div className="search-bar">
          <i className="uil uil-search"></i>
          <input
            type="search"
            placeholder="Search for creators, inspirations, and projects"
          />
        </div>
        <div className="create">
          <label
            className="btn btn-primary"
            for="create-post"
            onClick={() => navigate("/")}
          >
            Create
          </label>
          <div className="navprofile-photo ">
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  sx={{ width: 40, height: 40 }}
                  alt={user?.displayName}
                  src={user?.photoURL}
                />
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/");
                }}
              >
                <Avatar /> Home
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate(`/profile/${user.uid}`);
                }}
              >
                <Avatar /> My account
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleLogout();
                }}
              >
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
            {/* <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown button
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/my-profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
