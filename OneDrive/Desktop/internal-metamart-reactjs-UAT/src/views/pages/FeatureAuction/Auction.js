import LiveAuction from "./LiveAuction";
import { Box, Container, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

import ArtWork from "./ArtWork";
import Creators from "./Creators";
const useStyles = makeStyles((theme) => ({
  root: { padding: "70px 0" ,
  [theme.breakpoints.down("xs")]: {
    padding: "35px 0",
  },},
  headsection: {
    display: "flex",
    justifyContent: "space-between",
    "@media(max-width:767px)": {
      display: "block",
      '& button':{
        marginTop:"15px",
      }
    },
    "& h1": {
      color: theme.palette.secondary.main,
      fontWeight: "700",
      fontSize: "40px",
      marginLeft: "15px",
      "@media(max-width:767px)": {
        fontSize: "20px",
      },
    },
  },
}));
const Auction = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Container>
       
        <LiveAuction />
        <ArtWork />
        <Creators />
      </Container>
    </Box>
  );
};

export default Auction;
