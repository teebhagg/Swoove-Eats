import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, TextField, Typography,  List, ListItem, ListItemText, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [profileError, setProfileError] = React.useState(false);
  const [id, setId] = React.useState(null)

  const navigate = useNavigate();

  const options = [
    'Select Profile',
    'Owner/Admin',
    'Customer',
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setUser(options[index]);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const userDetails = { email: email, password: password };
  
  const userLogInPage = async () => {
    let response = await fetch("/user/user-login", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: { "Content-Type": "application/json" },
    });
    let data = await response.json();
    console.log(data);
    if(data.user){
      setId(data.user)
        { id && navigate(`/homepage-client/${id}`, {replace: true})}
    }
  };

  const adminLogInPage = async () => {
    try {
        let response = await fetch("/admin/admin-login", {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers: { "Content-Type": "application/json" },
          });
          let data = await response.json();
          console.log(data);
          if(data.admin){
            setId(data.admin)
            {id && console.log(id)}
            { id && navigate(`/homepage-admin/${id}`, {replace: true})}
        }
    } catch (error) {
        console.log(error)
        return
    }
    

  };

  React.useEffect( () => {
    setUser(options[selectedIndex])
  }, [] )

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:'#FFF5E4'
      }}>
      {/*   Login Dialog   */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (user === 'Owner/Admin' && password !== null && email !== null) {
            adminLogInPage();
          } else if (user === 'Customer' && password !== null && email !== null) {
            userLogInPage();
          } else {
            setProfileError(true);
            console.log('fields are empty')
          }
        }}>
        <Box
          sx={{
            position: "relative",
            padding: "35px",
            borderRadius: "12px",
            width: "250px",
            gap: "12px",
            display: "flex",
            background: "#FD841F",
            boxShadow: "20",
            flexDirection: "column",
          }}>
          {/*   Username/Email Textfield   */}
          <TextField
          variant="outlined"
            sx={{
              input: {
                background: "white",
                borderRadius: "12px",
                border: profileError ? '4px solid red' : null
              },
            }}
            placeholder={"email"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          {/*   Password Textfield   */}
          <TextField
          type={'password'}
            sx={{
              input: {
                background: "white",
                borderRadius: "12px",
                border: profileError ? '4px solid red' : null
              },
            }}
            placeholder={"password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          {/*  Toggle Sign Up/Login  */}
          <Box sx={{ display:'flex', justifyContent:'center', gap:'10px' }}>
            <Typography>New User?</Typography>
            <a
                onClick={()=>{navigate('/sign-up',{replace:true})}}
            >
              <Typography>Sign Up</Typography>
            </a>
          </Box>

          {/*   Login Button   */}
          <Button
            type="submit"
            variant="contained"
            disableElevation
            sx={{
              width: "100px",
              margin: "auto",
              background: "#820000",
              borderRadius: "8px",
              border: "2px solid #FFF5E4",
            }}>

            <Typography textTransform={"capitalize"}>Login</Typography>
          </Button>

          <Avatar
            sx={{
              height: "55px",
              width: "55px",
              position: "absolute",
              left: "calc(50% - 27.5px)",
              top: "-35px",
            }}>
            <LockOutlined />
          </Avatar>
        </Box>
      </form>
      <Box
        sx={{ position:'absolute', top:'0', right:'0' }}
      >
        <List
          component="nav"
          aria-label="Device settings"
          sx={{ bgcolor: 'background.paper' }}
        >
          <ListItem
            button
            id="lock-button"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="when device is locked"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClickListItem}
          >
            <ListItemText
              primary={<Typography sx={{ fontSize:'32px', color: profileError ? 'red': 'black', fontWeight: profileError ?'800':'400' }} >Select Profile</Typography>}
              secondary={options[selectedIndex]}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'lock-button',
            role: 'listbox',
          }}
          sx={{ '&.MuiMenu-paper':{
            backgroundColor:'white',
            opacity:'0.1'
          } }}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              disabled={index === 0}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
}
