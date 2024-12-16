import { Box, Container, Typography, Paper, Grid } from "@material-ui/core";
import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { UserContext } from "src/context/User";
import { useHistory } from "react-router-dom";
import DashboardCards from "src/component/DashboardCards";
import Apiconfig from "src/ApiConfig/ApiConfig";
import { useWeb3React } from "@web3-react/core";

const useStyles = makeStyles((theme) => ({
  controlsBox: {
    padding: "50px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  root: {
    "& .countBox1": {
      padding: " 30px 10px",
      background:
        "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100% )",
      boxShadow: "0px 0px 53px rgba(0, 0, 0, 0.25)",
      transition: "0.5s",
      borderRadius: "10px",
    },
  },
  heading: {
    "& h1": {
      fontFamily: "'ClashDisplay-Medium'",
      "& span": { fontFamily: "'ClashDisplay-Extralight'" },
    },
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const { account } = useWeb3React();

  const user = useContext(UserContext);
  const history = useHistory();
  const [dashboardsData, setdashboardsData] = useState({
    // activeUser:""
    activeUser: 0,
    approveKYC: 0,
    colletions: 0,
    kYCSubmitted: 0,
    pendingKYC: 0,
    rejectKYC: 0,
    totalNFT: 0,
  });

  const DashboardDetails = async () => {
    try {
      const res = await axios.get(
        Apiconfig.dashboard,

        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      if (res.data.statusCode === 200) {
        setdashboardsData(res.data.result);
      }
    } catch (error) {
      console.log(" ---- error ", error.response);
      if (error.response.data.status == 400) {
        //
        history.push("/");
      }
    }
  };

  useEffect(() => {
    DashboardDetails();
    if (user?.userData?.userType == "User") {
      history.push("/");
    }
  }, [user.isAdmin, account, user?.userData?.userType]);

  console.log(" ---- error ", user?.userData?.userType);
  return (
    <Box className={classes.controlsBox}>
      <Container>
        <Paper elevation={2}>
          <Box className={classes.root}>
            <Box className={classes.heading} mb={3}>
              <Typography variant="h2" color="primary">
                Admin
                <span> Dashboard</span>
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item lg={3} sm={6} xs={12} md={4}>
                <DashboardCards
                  name="Total Registered Users"
                  data={dashboardsData?.activeUser}
                  bgColor=""
                />
              </Grid>
              <Grid item lg={3} sm={6} xs={12} md={4}>
                <DashboardCards
                  name="Total Created Collections"
                  data={dashboardsData?.colletions}
                  bgColor=""
                />
              </Grid>
              <Grid item lg={3} sm={6} xs={12} md={4}>
                <DashboardCards
                  name="Total KYC"
                  data={dashboardsData?.kYCSubmitted}
                  bgColor=""
                />
              </Grid>
              <Grid item lg={3} sm={6} xs={12} md={4}>
                <DashboardCards
                  name="Total KYC Pending"
                  data={dashboardsData?.pendingKYC}
                  bgColor=""
                />
              </Grid>
              <Grid item lg={3} sm={6} xs={12} md={4}>
                <DashboardCards
                  name="Total KYC Submitted"
                  data={dashboardsData?.approveKYC}
                  bgColor=""
                />
              </Grid>
              <Grid item lg={3} sm={6} xs={12} md={4}>
                <DashboardCards
                  name="Total KYC Rejected"
                  data={dashboardsData?.rejectKYC}
                  bgColor=""
                />
              </Grid>
              <Grid item lg={3} sm={6} xs={12} md={4}>
                <DashboardCards
                  name="Total NFT Listed"
                  data={dashboardsData?.totalNFT}
                  bgColor=""
                />
              </Grid>
              <Grid item lg={3} sm={6} xs={12} md={4}>
                <DashboardCards name="Total NFT Sold" data={"0"} bgColor="" />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
