import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import Modal from "react-modal";
import { useParams } from "react-router-dom";

export default function OrderTableDialog({ state, close, head_Count }) {
  const [headCount, setHeadCount] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const params = useParams();

  const post = { headCount: headCount, id: params.id };

  const orderTable = async () => {
    try {
      let response = await fetch("/store/book-table", {
        method: "PATCH",
        body: JSON.stringify(post),
        headers: { "Content-Type": "application/json" },
      });
      let data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
            Order Table
          </Typography>
          <Typography>Enter headcount/number of people</Typography>
        </Box>
        <TextField
          type={"number"}
          onChange={(e) => setHeadCount(e.target.value)}
          sx={{
            marginX: "auto",
          }}
        />
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

          <Button
            variant="contained"
            onClick={(e) => {
              if (headCount > 0) {
                close();
                setOpenSnackBar(true);
                orderTable();
              } else {
                setErrorMessage("Headcount is invalid");
                setHeadCount(null);
              }
            }}
            sx={{
              textTransform: "capitalize",
              background: "green",
              width: "30px",
            }}>
            Order
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
