import { Box, Button, Typography } from "@mui/material";
import React from "react";
import AddTableModal from "./addTableModal";

export default function Greet({admin, closeDialog, dialogState}) {
    
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
        Good Day, {admin.name}
      </Typography>
      <Button
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
          Add Table
        </Typography>
      </Button>
      <AddTableModal state={addDialoge} close={handleCloseDialog} />
      {/* <AddTableDialog state={addDialoge} close={handleCloseDialog} /> */}
    </Box>
  );
}
