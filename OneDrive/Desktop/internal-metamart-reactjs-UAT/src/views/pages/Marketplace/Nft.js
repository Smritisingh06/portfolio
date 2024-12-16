import { Box, Button, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import History from "./History";
import Sale from "./Sale";
import Bids from "./Bids";
import axios from "axios";
import ApiConfig from "src/ApiConfig/ApiConfig";
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
    margin: "20px 0px 10px 0px",
    background: "rgb(218 244 255)",
    borderRadius: "10px",
    padding: "14px",
    "& button": {
      borderRadius: "15px",
      fontWeight: "400",
      fontSize: "14px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "13px",
      },
      "&.active": {
        color: "#fff",
        height: "40px",
        padding: "10px 20px",
        fontSize: "15px",
        boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
        lineHeight: "21px",
        borderRadius: "15px",
        background:
          "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
        [theme.breakpoints.down("sm")]: {
          padding: "6px 10px",
        },
      },
    },
  },
  time: {
    paddingRight: "25px",
    "& h6": {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#C6BECC",
    },
  },
}));
const history1 = [
  {
    avatar: "/images/catprofile.png",
    name: "asas",
    bidby: "1 edition bided by",
    bidname: "Chirag Varshney (price : 0.0120)",
    date: "03-02-2022",
    time: "12:29 PM",
  },
  {
    avatar: "/images/catprofile.png",
    name: "asas",
    bidby: "1 edition bided by",
    bidname: "Chirag Varshney (price : 0.0120)",
    date: "03-02-2022",
    time: "12:29 PM",
  },
  {
    avatar: "/images/catprofile.png",
    name: "asas",
    bidby: "1 edition bided by",
    bidname: "Chirag Varshney (price : 0.0120)",
    date: "03-02-2022",
    time: "12:29 PM",
  },
  {
    avatar: "/images/catprofile.png",
    name: "asas",
    bidby: "1 edition bided by",
    bidname: "Chirag Varshney (price : 0.0120)",
    date: "03-02-2022",
    time: "12:29 PM",
  },
];
export default function Nft() {
  const [tabview, setTabView] = useState("details");
  const classes = useStyles();
  const [orderDetails, setOrderDetails] = useState();
  const [bidList, setBidList] = useState([]);
  const [orderId, setOrderId] = useState();
  const [dataList, setDataList] = useState([]);

  const viewCollectionHandler = async (id) => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.viewCollection + id,
      });
      if (res.data.statusCode === 200) {
        setDataList(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (window.location.search && window.location.search.length > 0) {
      const ids = window.location.search.split("?");

      if (ids[1]) {
        setOrderId(ids[1]);
        viewCollectionHandler(ids[1]);
      }
    }
  }, [window.location]);
  return (
    <Box className={classes.root}>
      <Container>
        <Grid container spacing={2}>
          <Grid item lg={7} md={7} sm={12} xs={12}>
            <Box className={classes.nftcard}>
              <Box className={classes.tabBtn}>
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
                {tabview === "bids" ? <Bids bidList={bidList} /> : ""}
                {tabview === "details" ? (
                  <Details orderDetails={orderDetails} />
                ) : (
                  ""
                )}
                {tabview === "history" ? <History /> : ""}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
