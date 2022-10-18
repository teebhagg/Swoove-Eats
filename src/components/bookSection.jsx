import { Box, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

export default function BookSection({ tabletDisplay }) {
  const [bookedTables, setBookedTables] = React.useState(null);
  const [waitingList, setWaitingList] = React.useState(null);

  let emptyQueue = "You have no orders in the queue";
  let pendingQueue;
  let availableTables;
  let unavalabledTables =
    "There are no available tables, please wait for a little while";

  {
    waitingList &&
      (pendingQueue = `You have ${waitingList} persons in the queue`);
  }
  {
    bookedTables &&
      (availableTables = `Please, Tables ${bookedTables.toString(
        0
      )} are available to you for the next hour, have a pleasant meal`);
  }

  const params = useParams();

  React.useEffect(() => {
    const orderTable = async () => {
      try {
        let response = await fetch(`/store/booked-tables/${params.id}`);
        let data = await response.json();
        console.log(data);
        if (data.length > 0) {
          const tables = [];
          data.map((each) => tables.push(each.title + each.label.toString()));
          setBookedTables(tables);
        }
        if (data.length < 1) {
          setBookedTables("None");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const queue = async () => {
      try {
        let response = await fetch(`/store/waiting-list/${params.id}`);
        let data = await response.json();
        console.log(data);
        if (data.length) {
          setWaitingList(data.length);
        }
      } catch (error) {
        console.log(error);
      }
    };
    orderTable();
    queue();
  }, []);

  return (
    <Box sx={{ display:'flex', gap:'12%', flexDirection: tabletDisplay? 'column': 'row', gap: tabletDisplay?'50px':'' }} >
      <Box>
        <Typography sx={{fontSize:'28px', fontWeight:'600'  }} >Active Order</Typography>
        <Typography>
          {bookedTables === null
            ? "Please Make a Table Reservation"
            : bookedTables === "None"
            ? `${unavalabledTables}`
            : `${availableTables}`}
        </Typography>
      </Box>
      <Box>
        <Typography sx={{fontSize:'28px', fontWeight:'600' }} >Queue</Typography>
        <Typography>
          {waitingList === null || waitingList === 0
            ? `${emptyQueue}`
            : `${pendingQueue}`}
        </Typography>
      </Box>
    </Box>
  );
}
