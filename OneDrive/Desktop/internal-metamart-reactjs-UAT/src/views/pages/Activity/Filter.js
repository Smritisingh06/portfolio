import { Box, Button, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  btnbox: {
    "& h1": {
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

export default function Filter(props) {
  const classes = useStyles();

  return (
    <Box mt={2}>
      <Paper elevation={2}>
        <Box className={classes.btnbox}>
          <Typography variant="h1" color="primary">
            Filters
          </Typography>
          <Box mt={1}>
            <Button
              variant="contained"
              size="large"
              color={
                props.selectedFilter == undefined ? "secondary" : "primary"
              }
              className={classes.buttonbox}
              onClick={() => props.setSelectedFilter()}
            >
              All
            </Button>
            <Button
              variant="contained"
              size="large"
              color={
                props.selectedFilter === "NFT_CREATE" ? "secondary" : "primary"
              }
              onClick={() => props.setSelectedFilter("NFT_CREATE")}
            >
              Listing
            </Button>
            {/* <Button
              variant="contained"
              size="large"
              color={
                props.selectedFilter === "purchases" ? "secondary" : "primary"
              }
              onClick={() => props.setSelectedFilter("purchases")}
            >
              Purchases
            </Button> */}
            <Button
              variant="contained"
              size="large"
              color={
                props.selectedFilter === "ORDER_SELL" ? "secondary" : "primary"
              }
              onClick={() => props.setSelectedFilter("ORDER_SELL")}
            >
              Sell
            </Button>
            {/* <Button
              variant="contained"
              size="large"
              color={
                props.selectedFilter === "transfers" ? "secondary" : "primary"
              }
              onClick={() => props.setSelectedFilter("transfers")}
            >
              Transfers
            </Button> */}
            <Button
              variant="contained"
              size="large"
              color={
                props.selectedFilter === "BID_CREATE" ? "secondary" : "primary"
              }
              onClick={() => props.setSelectedFilter("BID_CREATE")}
            >
              Bids
            </Button>

            <Button
              variant="contained"
              size="large"
              color={
                props.selectedFilter === "follow" ? "secondary" : "primary"
              }
              onClick={() => props.setSelectedFilter("follow")}
            >
              Followings
            </Button>
            <Button
              variant="contained"
              size="large"
              color={
                props.selectedFilter === "FAVOURATE" ? "secondary" : "primary"
              }
              onClick={() => props.setSelectedFilter("FAVOURATE")}
            >
              FAVOURATE
            </Button>
            <Button
              variant="contained"
              size="large"
              color={
                props.selectedFilter === "CREATE_COLLECTION"
                  ? "secondary"
                  : "primary"
              }
              onClick={() => props.setSelectedFilter("CREATE_COLLECTION")}
            >
              Collection
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
