import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
const useStyles = makeStyles((theme) => ({
  btnbox: {
    width: "auto",
    height: "auto",
    borderRadius: "10px",
    padding: "15px",
    background:
      " linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    border: "1px solid #A8CEDF",
    // backdropFilter: "blur(42px)",ß
    "& h1": {
      color: "#000",
      fontSize: "25px",
      fontWeight: "700",
    },
    "& button": {
      borderRadius: "10px",
      marginBottom: "5px !important",
      marginRight: "4px",
    },
  },
}));
export default function Filter() {
  const classes = useStyles();
  return (
    <Box>
      <Box className={classes.btnbox} mt={2}>
        <Typography variant="h1">Filters</Typography>
        <Box mt={1}>
          <Button variant="contained" size="large" color="primary">
            Listing
          </Button>
          <Button variant="contained" size="large" color="primary">
            Purchases
          </Button>
          <Button variant="contained" size="large" color="primary">
            Sales
          </Button>
          <Button variant="contained" size="large" color="primary">
            Transfers
          </Button>
          <Button variant="contained" size="large" color="primary">
            Burns
          </Button>
          <Button variant="contained" size="large" color="primary">
            Bids
          </Button>
          <Button variant="contained" size="large" color="primary">
            Likes
          </Button>
          <Button variant="contained" size="large" color="primary">
            Followings
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
