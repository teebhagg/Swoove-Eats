import { Box, Divider } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import CustomerManagement from "../components/customerManagement";
import Greet from "../components/greetAdmin";
import NavBar from "../components/NavBar";
import TableSection from "../components/tableSection";

export default function HomePageAdmin({tabletDisplay}) {
  const [admin, setAdmin] = React.useState(null);
  const params = useParams();

  React.useEffect(() => {
    const getAdmin = async () => {
      let response = await fetch(`/admins/${params.id}`);
      let data = await response.json();
      if (response.ok) {
        setAdmin(data);
      }
    };
    getAdmin();
  }, []);
  return (
    <>
      <NavBar />
      <Box height={"70px"} />
      { admin && <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "1400px",
          marginX: "auto",
          paddingX: "20px",
          gap: "50px",
        }}>
        {admin && <Greet admin={admin} />}
        <TableSection tabletDisplay={tabletDisplay} />
        <Divider />
        <CustomerManagement tabletDisplay={tabletDisplay} />
      </Box>}
    </>
  );
}
