import { AppBar, Avatar, Box, Typography } from "@mui/material";
import React from "react";

export default function NavBar() {

  const [privilege, setPrivilege] = React.useState(null);

  React.useEffect(() => {
    
  }, []);
  return (
    <AppBar
      sx={{
        background: "#FD841F",
        display: window.location.pathname === "/login" ? "none" : " flex",
        justifyContent: "center",
      }}>
      <Box
        className="navbar"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "70px",
          marginX: "auto",
          width: "100%",
          maxWidth: "1400px",
        }}>
        <Typography
          className="logo"
          fontSize={"30px"}
          fontWeight={"700"}
          paddingX={"20px"}>
          Swoove Eats
        </Typography>
        <Box
          sx={{
            marginRight: "20px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}>
          <Typography>
            Admin
          </Typography>
          <Avatar />
        </Box>
      </Box>
    </AppBar>
  );
}
