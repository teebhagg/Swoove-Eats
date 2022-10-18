import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import BookSection from "../components/bookSection";
import ClientOrderSection from "../components/clientOrderSection";
import GreetClient from "../components/greetClient";
import NavBar from "../components/NavBar";

export default function HomePageCustomer({ tabletDisplay }) {
  const [client, setClient] = React.useState(null);

  const params = useParams();
  
  const orderTable = async (headCount) => {
   try {
    let response = await fetch("/store/book-table", {
      method: "PATCH",
      body: JSON.stringify({ id: params.id, headCount: headCount }),
      headers: { "Content-Type": "application/json" },
    });
    let data = await response.json()
    console.log(data);
   } catch (error) {
    console.log(error)
   }
  };
  

  React.useEffect(() => {
    const getUser = async () => {
      try {
        let response = await fetch(`/users/${params.id}`);
        let data = await response.json();
        if (response.ok) {
          console.log(params.id)
          setClient(data);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  return (
    <>
      <NavBar />
      <Box height={"70px"} />
      {client && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "1400px",
            marginX: "auto",
            paddingX: "20px",
            gap: "50px",
          }}>
          <GreetClient client={client} />
          <ClientOrderSection headCount={orderTable} tabletDisplay={tabletDisplay} />
          <BookSection tabletDisplay={tabletDisplay} />
        </Box>
      )}
    </>
  );
}
