import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";

const AdminHeader = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutHandler = () => {
    setAnchorEl(null);
    navigate("/");
    localStorage.removeItem("userData");
    window.location.reload()
  };
  const profileHandler = () => {
    setAnchorEl(null);
    navigate("/user-profile");
  };
  return (
    <div className="bg-black text-white flex justify-between p-3 sticky top-0 w-full shadow-xl items-center">
      <p>Logo</p>
      <div className="flex justify-between w-90">
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Typography
            className="hover:cursor-pointer"
            sx={{ minWidth: 100 }}
            onClick={() => navigate("/")}
          >
            Home
          </Typography>
          <Typography
            className="hover:cursor-pointer"
            sx={{ minWidth: 100 }}
            onClick={() => navigate("/admin/job-posting")}
          >
            Post Jobs
          </Typography>
          <Typography
            className="hover:cursor-pointer"
            sx={{ minWidth: 100 }}
            onClick={() => navigate("/job-posted")}
          >
            Posted Jobs
          </Typography>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
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
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={profileHandler}>
            <Avatar /> Profile
          </MenuItem>
          <Divider />
          <MenuItem onClick={logoutHandler}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default AdminHeader;
