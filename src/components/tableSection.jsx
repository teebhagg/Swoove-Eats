import { Box, Typography } from "@mui/material";
import React from "react";

export default function TableSection({tabletDisplay}) {

  const tableImagUrl =
    "https://freesvg.org/storage/img/thumb/efes7070-dining-table.png";
    
        const [tables, setTables] = React.useState(null);
        const [freeTables, setFreeTables] = React.useState(null);
        const [occupiedTables, setOccupiedTables] = React.useState(null);

    const getTables = async() => {
        const response = await fetch('/store/all-tables');
        const data = await response.json();
        setTables(data)
        console.log(data);
    }
    
    const getFreeTables = async() => {
        const response = await fetch('/store/available-tables');
        const data = await response.json();
        setFreeTables(data)
        // console.log(data);
    }
    const getOccupiedTables = async() => {
        const response = await fetch('/admin/store/occupied-tables');
        const data = await response.json();
        setOccupiedTables(data)
        console.log(data);
    }

    React.useEffect( () => {
        getTables();
        getFreeTables();
        getOccupiedTables();
    }, [] )
  return (
    <>
      <Typography sx={{ fontWeight: "800", fontSize: "22px" }}>
        Tables
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: !tabletDisplay? 'row':'column',
          justifyContent: "space-evenly",
          gap: tabletDisplay? '8px' :''
        }}>
        {/*   Total Tables   */}
        {tables && <Box
          sx={{
            position: "relative",
            height: "130px",
            width: !tabletDisplay? "10%": '30%',
            background: "white",
            border: "2px solid #E1E1E1",
            borderRadius: "8px",
            minWidth: "100px",
            maxWidth: "300px",
          }}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "500",
              marginLeft: "8px",
              marginTop: "5px",
            }}>
            Total Tables:{" "}
          </Typography>
          <Typography
            sx={{ fontSize: "35px", fontWeight: "700", marginLeft: "8px" }}>
            {tables.length}
          </Typography>
        </Box>}

        {/* Available Tables */}
        { freeTables && <Box
          sx={{
            display: "flex",
            padding: "20px",
            gap: "40px",
            borderRadius: "12px",
            background: "white",
            border: "2px solid #E1E1E1",
          }}>
          <Box>
            <Typography
              sx={{ fontSize: "20px", fontWeight: "500", color: "#95CD41" }}>
              Availabe Tables
            </Typography>
            <Typography sx={{ fontSize: "40px", fontWeight: "700" }}>
              {freeTables.length}
            </Typography>
            <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
              4 chairs per table
            </Typography>
          </Box>
          <Box>
            <img src={tableImagUrl} style={{ aspectRatio: "10/9" }} />
          </Box>
        </Box>}

        {/* Occupied Tables */}
        { occupiedTables && <Box
          sx={{
            display: "flex",
            padding: "20px",
            gap: "40px",
            borderRadius: "12px",
            background: "white",
            border: "2px solid #E1E1E1",
          }}>
          <Box>
            <Typography
              sx={{ fontSize: "20px", fontWeight: "500", color: "#E83A14" }}>
              Occupied Tables
            </Typography>
            <Typography sx={{ fontSize: "40px", fontWeight: "700" }}>
              {occupiedTables.length}
            </Typography>
            <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
              4 chairs per table
            </Typography>
          </Box>
          <Box>
            <img
              src={tableImagUrl}
              style={{ aspectRatio: "10/9", opacity: "0.5" }}
            />
          </Box>
        </Box>}
      </Box>
    </>
  );
}
