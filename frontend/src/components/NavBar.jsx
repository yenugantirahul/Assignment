import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const NavBar = () => {
  const navigate = useNavigate(); // Use the hook to access navigate function

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            fontSize={"28px"}
            sx={{ flexGrow: 1 }}
            onClick={() => {
              navigate("/"); // Navigate to the Home page
            }}
          >
            ContactManagement
          </Typography>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/create")}>
            Create
          </Button>
          <Button color="inherit" onClick={() => navigate("/edit")}>
            Edit
          </Button>
          <Button color="inherit" onClick={() => navigate("/contacts")}>
            Contacts
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
