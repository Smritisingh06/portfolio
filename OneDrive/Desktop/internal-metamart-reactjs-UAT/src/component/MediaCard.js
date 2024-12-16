import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, Paper, Typography, Box, Grid } from "@material-ui/core";
import { changeExtenstion } from "src/utils";
const useStyles = makeStyles((theme) => ({
  MediaCardBox: {
    paddingBottom: "30px",
    position: "relative",
    margin: "0 5px",
    background: theme.palette.background.card,
    borderRadius: "20px",
    overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "5px",
    },
    "& a": {
      position: "absolute",
      bottom: "16px",
      left: "15px",
      color: "hsl(230.54deg 95.03% 63.21%) ",
      fontSize: "14px",
    },
    "& p": {
      fontSize: "12px",
      color: "#706b6b",
    },
    "& .basecontent": {
      padding: "15px",
    },
    "& .mediatext": {
      whiteSpace: "pre",
      textOverflow: "ellipsis",
      overflow: "hidden",
      width: "calc(100% - 5px)",
    },
  },
  mediamainimg: {
    width: "100%",
    height: "190px ",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "20px",
    backgroundColor: "#ccc !important",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0px",
    },
  },
}));
const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text" style={{ wordBreak: "break-word" }}>
      {isReadMore ? text.slice(0, 30) : text}
      <span
        onClick={toggleReadMore}
        style={{ color: "green", cursor: "pointer", paddingLeft: "3px" }}
      >
        {text.length >= 100 && <>{isReadMore ? "... more" : " See less"}</>}
      </span>
    </p>
  );
};

function ExploreCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { data, type } = props;
  const updateDimensions = () => {
    var offsetWidth = document.getElementById(
      "imagecard" + data?._id
    ).offsetWidth;
    var newoofsetWidth = offsetWidth - 80;
    document.getElementById("imagecard" + data?._id).style.height =
      newoofsetWidth + "px";
  };
  useEffect(() => {
    updateDimensions();
  }, [data, data?._id]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  return (
    <>
      <Box className={classes.MediaCardBoxborder}>
        <Paper className={classes.MediaCardBox} elevation={0}>
          <Box
            id={`imagecard${data?._id}`}
            className={classes.mediamainimg}
            style={
              data?.image
                ? { background: "url(" + changeExtenstion(data?.image) + ")" }
                : { background: "url(" + "images/market_detail.png" + ")" }
            }
            // onClick={() => {
            //   history.push("/author");
            // }}
          ></Box>
          <Box className="basecontent" pb={2}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} align="left">
                <Typography variant="h6" className="mediatext" color="primary">
                  {data?.title}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} align="left">
                <ReadMore>{data?.description}</ReadMore>
              </Grid>
            </Grid>
          </Box>
          <a
            href={data?.url}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            Read More
          </a>
        </Paper>
      </Box>
    </>
  );
}
export default ExploreCard;
