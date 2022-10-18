import { Box, Button, Typography } from "@mui/material";
import React from "react";
import OrderTableDialog from "./orderTable";

export default function GreetClient({client, closeDialog, dialogState}) {
    
  const [addDialoge, setAddDialog] = React.useState(false);

  const handleCloseDialog = () => {
    setAddDialog(false)
  }

  return (
    <Box
      sx={{
        display: "flex",
        borderBottom: "1px solid lightgrey",
        justifyContent: "space-between",
      }}>
      <Typography fontSize={"22px"} fontWeight={"600"} paddingY={"20px"}>
        Welcome, {client.name}
      </Typography>
      {/* <Button
        variant="contained"
        disableElevation
        sx={{
          height: "",
          marginY: "auto",
          background: "#820000",
          borderRadius: "8px",
        }}
        onClick={ (e) => {setAddDialog(true); console.log(addDialoge) } }
        >
        <Typography textTransform={"capitalize"} sx={{ fontWeight: "300" }}>
          Order Table
        </Typography>
      </Button> */}
      <OrderTableDialog state={addDialoge} close={handleCloseDialog} />
    </Box>
  );
}
