import { Box, Typography } from "@mui/material";
import React from "react";

export default function CustomerManagement({ tabletDisplay }) {
  const [queueList, setQueueList] = React.useState(null);
  const [servedTables, setServedTables] = React.useState(null);

  const [chairCount, setChairCount] = React.useState(null);
  const [totalQueue, setTotalQueue] = React.useState(null);

  let total = 0;

  React.useEffect(() => {
    const getQueue = async () => {
      const response = await fetch("/users/queue");
      const data = await response.json();
      setQueueList(data);
      // console.log(data);
      console.log(data.length);

      if (data.length === undefined) {
        console.log("---undefined");
        {
          data && setQueueList(0);
        }
      } else {
        console.log("---well-defined");
        {
          data &&
            data.forEach((element) => {
              total += element.queuePersons;
            });
        }
        {
          data && setTotalQueue(total);
        }
      }
    };

    const freeTables = async () => {
      const response = await fetch("/admin/store/occupied-tables");
      const data = await response.json();
      setServedTables(data);
      // console.log(data[0])

      if (data[0] === undefined) {
        // console.log('undefined');
        {
          data && setChairCount(0);
        }
        // console.log(chairCount)
      } else {
        // console.log('well-defined')
        {
          data && setChairCount(Object.keys(data[0].chairs).length);
        }
        // console.log(chairCount)
      }
    };

    getQueue();
    freeTables();
  }, [0]);
  return (
    <>
      <Typography sx={{ fontWeight: "800", fontSize: "22px" }}>
        Customers
      </Typography>
      <Box sx={{ display: "flex", gap: !tabletDisplay? "15%":'50px', flexDirection: tabletDisplay?'column':'row', }}>
        <Box>
          <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
            Served Customers
          </Typography>
          {servedTables && (
            <Typography sx={{ fontSize: "40px", fontWeight: "700" }}>
              {chairCount * servedTables.length}
            </Typography>
          )}
        </Box>
        <Box>
          <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
            Queues
          </Typography>
          {queueList && (
            <Typography sx={{ fontSize: "40px", fontWeight: "700" }}>
              {queueList.length}
            </Typography>
          )}
        </Box>
        <Box>
          <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
            Total Number of Customers in All Queues
          </Typography>
          {queueList && (
            <Typography sx={{ fontSize: "40px", fontWeight: "700" }}>
              {totalQueue}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}
