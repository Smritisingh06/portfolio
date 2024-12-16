import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
  Hidden,
} from "@material-ui/core";
import { useContext } from "react";
import SettingsContext from "src/context/SettingsContext";
import Exploredata from "./Exploredata";
import Apiconfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  createbrandBox: {
    position: "relative",
    padding: "70px 30px 50px",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      padding: "40px 0px 40px",
    },

    "& h6": {
      color: theme.palette.text.gray,
    },
    "& .createtextBox": {
      padding: "100px 0 100px 49px",
      [theme.breakpoints.down("sm")]: {
        padding: "15px",
      },
      "& h1": {
        fontSize: "50px ",
      },
      "& h6": {
        maxWidth: "500px",
      },
    },
    "& .backgroundbg": {
      borderRadius: "30px",
      padding: "1px",
      background:"linear-gradient(295.27deg, #15141A 0%, #474D57 84.52%)"    //border 
     },

    "& .createbackground": {
      backgroundRepeat: "no-repeat",
      background: "#1E2329",
      // backgroundImage: "url(/images/physical_hovr1.png)", //here bg center image hidded 
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: "30px",
      position: "relative",
      padding: "1px",
    },
    "& .createbackground2": {
      backgroundRepeat: "no-repeat",
      background: "#1E2329",
      // backgroundImage: "url(/images/physical_hovr2.png)",  //here bg center image hidded 
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: "30px",
      position: "relative",
      padding: "1px",
      [theme.breakpoints.down("xs")]: {
        backgroundImage: "none",
      },
    },
    "& .Imagebox": {
      "& figure": {
        margin: "10px",
        transition: "0.5s",
        overflow: "hidden",
        borderRadius: "40px",
        "& img": {
          transition: "0.5s",
        },
        "&:hover": {
          "& img": {
            transform: "scale(1.1)",
          },
        },
      },
      position: "relative",
      "& img": {
        width: "auto",
        maxWidth: "100%",
        zIndex: "2",

        [theme.breakpoints.down("md")]: {
          maxWidth: "100%",
        },
      },
    },
  },
}));

export default function Createyourbrand() {
  const classes = useStyles();
  const themeSeeting = useContext(SettingsContext);

  const [dashboarddata, setDashboarddata] = useState("");
  const getDashboardData = async () => {
    try {
      const res = await axios.get(Apiconfig.dashboardCount);
      if (res.data.statusCode === 200) {
        if (res.data.result) {
          setDashboarddata(res.data.result);
        } else {
          setDashboarddata(res.data.result.docs);
        }
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  };
  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <Box className={classes.createbrandBox}>
      <Container>
        <Box className="backgroundbg">
          <Box
            className={
              themeSeeting.settings.theme === "DARK"
                ? "createbackground"
                : "createbackground2"
            }
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={7} lg={7} sm={12} className="wow flipInX">
                <Box className="createtextBox">
                  <AnimationOnScroll animateIn="animate__bounceInLeft">
                    <Typography variant="h2" color="primary">
                      Become an NFT Artist
                    </Typography>
                    <Box mt={1}>
                      <Typography variant="h6">
                        We offer a comprehensive set of tools for launching your
                        very own NFT collection on our marketplace. Whether a
                        newbie or an experienced user, you can import your NFTs
                        and list them on our platform.
                      </Typography>
                    </Box>
                    <Box>
                      <Exploredata data={dashboarddata} />
                    </Box>

                    <Box padding="30px 0px 0px">
                      <Link to="/explore" style={{ textDecoration: "none" }}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                        >
                          Place a Bid
                        </Button>
                      </Link>
                    </Box>
                  </AnimationOnScroll>
                </Box>
              </Grid>
              <Grid item xs={12} md={5} lg={5} sm={12}>
                <Hidden smDown>
                  <Box className="Imagebox">
                    <figure>
                      <img src="/images/createimg1.png" alt="Add Your Brand" />
                    </figure>
                  </Box>
                </Hidden>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
