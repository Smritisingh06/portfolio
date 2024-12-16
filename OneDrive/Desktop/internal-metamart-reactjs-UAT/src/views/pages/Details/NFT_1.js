import { Box, Button, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import History from "./History";
import Sale from "./Sale";
import Bids from "./Bids";

import { Details } from "./Details";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  nftcard: {
    background: "#FFFFFF",
    // backdropFilter: "blur(44px)",
    borderRadius: "10px",
    padding: "15px",
    boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    boxSizing: "border-box",
  },
  nftImg: {
    width: "100%",
    height: "330px",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "10px 10px 0px 0px",
    backgroundColor: "#ccc !important",
  },
  tabBtn: {
    "& button": {
      borderRadius: "10px",
      fontWeight: "600",
      fontSize: "14px",
      marginRight: "4px",
      "&.active": {
        color: "#fff",
        boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
        background:
          "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
      },
    },
  },
  bidsDetails: {
    background: "#FFFFFF",
    // backdropFilter: "blur(44px)",
    border: "0.5px solid #D3D3D3",
    boxSizing: "border-box",
    borderRadius: "22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    padding: "5px",
  },
  profileimg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      width: "75px",
      marginRight: "20px",
    },
    "& img": {
      maxHeight: "100%",
      maxWidth: "100%",
      height: "auto",
      width: "auto",
      display: "block",
    },
  },
  price1: {
    "& h5": {
      fontWeight: "bold",
      fontSize: "28px",
      lineHeight: "130%",
      color: "#3B0D60",
    },
    "& h6": {
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#3B0D60",
      marginTop: "5px",
      "& span": {
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "130%",
        color: "#D200A5",
      },
    },
  },
  time: {
    paddingRight: "25px",
    "& h6": {
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#C6BECC",
    },
  },
}));

export default function Nft() {
  const [tabview, setTabView] = useState("bids");
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Container>
        <Grid container spacing={2}>
          <Grid item lg={7} md={7} sm={12} xs={12}>
            <Box className={classes.nftcard}>
              <Box
                className={classes.nftImg}
                style={{ background: "url(images/BannerImg.png)" }}
              >
                {/* <figure>
                  <img src="/images/url(/images/BluebgMain.svg)" alt="" />
                </figure> */}
              </Box>
              <Box className={classes.tabBtn} mt={2} mb={1}>
                <Button
                  className={tabview === "bids" ? "active" : ""}
                  onClick={() => setTabView("bids")}
                >
                  Bids
                </Button>
                <Button
                  className={tabview === "details" ? "active" : " "}
                  onClick={() => setTabView("details")}
                >
                  Details
                </Button>
                <Button
                  className={tabview === "history" ? "active" : " "}
                  onClick={() => setTabView("history")}
                >
                  History
                </Button>
              </Box>
              <Box>
                {tabview === "bids" ? <Bids /> : ""}
                {tabview === "details" ? <Details /> : ""}
                {tabview === "history" ? <History /> : ""}
              </Box>
            </Box>
          </Grid>
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <Box>
              <Sale />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
