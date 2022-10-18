import { Box, Button, Typography } from "@mui/material";
import React from "react";
import OrderTableDialog from "./orderTable";

export default function ClientOrderSection({ tabletDisplay }) {
  const [addDialoge, setAddDialog] = React.useState(false);

  const handleCloseDialog = () => {
    setAddDialog(false);
  };

  // const orderTable = async (order) => {
  //   let response = await fetch("/store/book-table", {
  //     method: "PATCH",
  //     body: JSON.stringify(order),
  //     headers: { "Content-Type": "application/json" },
  //   });
  // };

  React.useEffect(() => {
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: tabletDisplay?'column':'row', gap:tabletDisplay?'50px':'',marginBottom: tabletDisplay? '100px':'' }}>
      {/*    Intro   */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: !tabletDisplay? "50%" : '100%',
          marginBottom: tabletDisplay? '50px':''
        }}>
        <Box>
          <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
            Welcome to
          </Typography>
          <Typography sx={{ fontSize: "46px", fontWeight: "700" }}>
            Swoove Eats
          </Typography>
        </Box>
        <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
          {lorem}
        </Typography>
        <Typography
          sx={{
            fontSize: "28px",
            fontWeight: "500",
            color: "#95CD41",
            textShadow: "#C4C4C4 5px 5px 5px ",
          }}>
          We Are Open
        </Typography>
      </Box>

      {/*    Order Tables   */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // maxWidth: "30%",
          width: !tabletDisplay? "30%" : '100%',
        }}>
        <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
          Order Table(s)
        </Typography>
        <Button
          variant="contained"
          disableElevation
          onClick={(e) => {
            setAddDialog(true);
            console.log(addDialoge);
          }}
          sx={{
            margin: "0",
            width: "155px",
            background: "#820000",
            borderRadius: "8px",
          }}>
          Order Table(s)
        </Button>
      </Box>
      <OrderTableDialog state={addDialoge} close={handleCloseDialog}  />
    </Box>
  );
}

export const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non convallis turpis. Etiam nec erat malesuada nulla interdum sagittis vel ut nulla. Quisque iaculis nibh erat, eget egestas urna hendrerit eget.";
