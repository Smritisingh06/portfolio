import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, Paper, Typography, Box, Grid, Container } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: "30px",
    position: "relative",
    margin: "0 5px",
    // background:
    //   "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    // border: "1px solid #A8CEDF",
    // backdropFilter: "blur(42px)",
    // borderRadius: "10px",
    // overflow: "hidden",
    // "&:hover": {
    //   // boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
    //   boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    //   filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
    //   background: "#fff",
    // },
    "& a": {
      position: "absolute",
      bottom: "10px",
      right: "15px",
      color: "#35A5F5",
      fontSize: "14px",
    },
    "& p": {
      fontSize: "12px",
    },
    "& .basecontent": {
      padding: "15px",
    },
  },
  text: {
    whiteSpace: "pre",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "calc(100% - 5px)",
    // color: "#000",
  },
  mainimg: {
    width: "100%",
    height: "190px ",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "5px 5px 0px 0px",
    backgroundColor: "#ccc !important",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

function ViewMedia(props) {
  const classes = useStyles();
  const location = useLocation();
  const [mediaData, setMediaData] = useState([]);
  const { data, index } = props;
  const updateDimensions = () => {
    var offsetWidth = document.getElementById("imagecard" + index).offsetWidth;
    var newoofsetWidth = offsetWidth - 80;
    document.getElementById("imagecard" + index).style.height =
      newoofsetWidth + "px";
  };
  useEffect(() => {
    updateDimensions();
  }, [data, index]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const fawViewHandler = async (id) => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.viewPressMedia + id,
      });
      if (res.data.statusCode === 200) {
        setMediaData(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location.search && location.search.length > 0) {
      const ids = location.search.split("?");
    }
    const kid = location.hash.split("#");
    if (kid[1]) {
      fawViewHandler(kid[1]);
    }
  }, [location]);
  return (
    <>
      <Box pt={4}>
      <Container>
        <Paper className={classes.root} elevation={2}>
          <Grid container>
            <Grid item lg={6} sm={6}>
              <Box
                id={`imagecard${index}`}
                className={classes.mainimg}
                style={
                  mediaData?.image
                    ? { background: "url(" + mediaData?.image + ")" }
                    : { background: "url(" + "images/market_detail.png" + ")" }
                }
              ></Box>
            </Grid>
            <Grid item lg={6} sm={6}>
              <Box className="basecontent">
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} align="left">
                    <Typography variant="h6" className={classes.text}>
                      {mediaData?.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} align="right">
                    <Typography variant="body1">{mediaData.time}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} align="right">
                    <Typography variant="body2" align="left">
                      {mediaData?.description}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          {/* <Grid item lg={6} sm={6}>
          {" "}
          <Box className="basecontent">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} align="left">
                <Typography variant="h6" className={classes.text}>
                  {mediaData?.title}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} align="right">
                <Typography variant="body1">{mediaData.time}</Typography>
              </Grid>
              <Grid item xs={12} sm={12} align="right">
                <Typography variant="body2" align="left">
                  {mediaData?.description}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid> */}

          <a
            href={mediaData?.url}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            Read More
          </a>
        </Paper>
        </Container>
      </Box>
    </>
  );
}

export default ViewMedia;
