import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import Modal from "react-modal";

export default function AddTableModal({ state, close }) {
  const [chairNumber, setChairNumber] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const post = { chairs: chairNumber * 1 };

  const addTable = async () => {
    const response = await fetch("/admin/add-table-and-chair", {
      method: "POST",
      body: JSON.stringify(post),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <>
      <Modal
        isOpen={state}
        ariaHideApp={false}
        onRequestClose={(e) => {
          close();
          setErrorMessage(false);
        }}
        style={{
          content: {
            top: "65%",
            left: "65%",
            // right: 'auto',
            // bottom: 'auto',
            // marginRight: '-50%',
            transform: "translate(-100%, -100%)",
          },
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            gap: "15px",
          }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <Typography sx={{ fontWeight: "700", fontSize: "26px" }}>
              Add Table
            </Typography>
            <Typography>Number of Chairs per Table</Typography>
          </Box>

          {/*   Input Field  */}
          <TextField
            type={"number"}
            onChange={(e) => setChairNumber(e.target.value)}
            sx={{
              marginX: "auto",
            }}
          />

          {/*  Error Message  */}
          <Box
            sx={{
              display: errorMessage ? "flex" : "none",
              color: "red",
              fontSize: "18px",
              fontWeight: "600",
              minWidth: "fit-content",
              margin: "auto",
            }}>
            {errorMessage}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", gap: "5%" }}>

            {/*   Cancel Button  */}
            <Button
              onClick={(e) => {
                close();
                setErrorMessage(false);
              }}
              variant="contained"
              sx={{
                textTransform: "capitalize",
                background: "red",
                width: "30px",
              }}>
              Cancel
            </Button>
            
            {/*  Add Button  */}
            <Button
              variant="contained"
              onClick={(e) => {
                if (chairNumber > 0) {
                  close();
                  setOpenSnackBar(true);
                  addTable();
                  // console.log(post)
                } else {
                  setErrorMessage("Number is incorrect/inaccurate");
                  setChairNumber(null);
                }
              }}
              sx={{
                textTransform: "capitalize",
                background: "green",
                width: "30px",
              }}>
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* <Snackbar
        open={openSnackBar}
        autoHideDuration={300}
        anchorOrigin={{ horizontal:'center', vertical:'bottom' }}
        // onClose={setOpenSnackBar(false)}
        message={`New Taable and ${chairNumber} chairs added`}
      /> */}
    </>
  );
}
