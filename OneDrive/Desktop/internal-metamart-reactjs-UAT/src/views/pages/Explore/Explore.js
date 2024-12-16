import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Box,
  makeStyles,
  Grid,
  Container,
} from "@material-ui/core";
import ApiConfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import { toast } from "react-toastify";
import MarketplaceIndex from "../Marketplace/Index";
import { UserContext } from "src/context/User";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0px 0px 20px",
    borderRadius: "10px",
    padding: "1px",
    background:
      "linear-gradient(93.34deg, #FF6F37 6.82%, #FF2676 35.9%, #B801AA 68.08%, #7101BC 101.4%)",
    "& .heading": {
      "& h2": {
        color: "#000000",
      },
    },
  },
  contentItem: {
    background: theme.palette.background.faqBox,
    boxShadow: "rgb(99 99 99 / 0%) 0px 2px 8px 0px",
    // background: theme.palette.background.nftBox,

    padding: "6px",
    borderRadius: "10px",

    "& .content": {
      border: "1px solid rgba(255, 255, 255, 0.03)",
      padding: "15px",
      maxHeight: "75px",
      "& h3": {
        color: theme.palette.primary.main,
        fontSize: "23px",
        textAlign: "center",
        display: "block",
        margin: "0px",
      },
      "& h6": {
        color: theme.palette.primary.main,
        marginTop: "2px",
        fontSize: "15px",
        textAlign: "center",
      },
    },
  },
  contenttext: {
    marginTop: "30px",
    "& h6": {
      color: "#000000",
    },
  },
}));
export default function Dashboard(props) {
  // const { data } = props;
  const classes = useStyles();
  const user = useContext(UserContext);
  const [dashboarddata, setDashboarddata] = useState("");
  const [dashboard, setDashboard] = useState("");
  const getDashboardData = async () => {
    try {
      const res = await axios.get(ApiConfig.dashboardCount);
      if (res.data.statusCode === 200) {
        if (res.data.result) {
          setDashboarddata(res.data.result);
        } else {
          toast.warn("something went wrong");
        }
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  const getDashboardDatafloore = async () => {
    try {
      const res = await axios.get(ApiConfig.floorTradeCount);
      if (res.data.statusCode === 200) {
        if (res.data.result) {
          setDashboard(res.data.result);
        } else {
          toast.warn("something went wrong");
        }
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  useEffect(() => {
    getDashboardData();
    getDashboardDatafloore();
  }, []);

  const formatter = Intl.NumberFormat("en-US");

  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.contentItem}>
          <Grid container spacing={0}>
            <Grid item lg={3} md={6} sm={6} xs={6} justifyContent="center">
              <Box
                className="content"
                style={{ borderRadius: "10px 0px 0px 10px" }}
              >
                <Typography variant="h3" color="primary">
                  {dashboarddata?.order ? dashboarddata?.order : "0"}
                </Typography>
                <Typography variant="h6">Items</Typography>
              </Box>
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={6} align="center">
              <Box className="content">
                <Typography variant="h3">
                  {dashboarddata?.user ? dashboarddata?.user : "0"}
                </Typography>
                <Typography variant="h6">Users</Typography>
              </Box>
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={6} align="center">
              <Box className="content">
                <Typography variant="h3" textAlign="center">
                  {dashboard?.floorNFTRes?.price
                    ? dashboard?.floorNFTRes?.price
                    : "0"}
                </Typography>
                <Typography variant="h6">Floor price</Typography>
              </Box>
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={6} align="center">
              <Box
                className="content"
                style={{ borderRadius: "0px 10px 10px 0px" }}
              >
                {/* <img src="/images/eth.svg" alt="" /> */}
                <Typography variant="h3" textAlign="center">
                  {formatter.format(dashboard?.volumeTradeNFTRes?.toFixed(5))}
                </Typography>
                <Typography variant="h6">Volume traded</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
