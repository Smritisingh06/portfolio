import React, { useEffect, useState } from "react";
import { makeStyles, Paper, Typography, Box, Button } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";
import { red } from "@material-ui/core/colors";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { RiAuctionLine } from "react-icons/ri";
import { FaEthereum } from "react-icons/fa";
const useStyles = makeStyles((theme) => ({
  root: {
    background: "rgba(0, 0, 0, 0.19)",
    borderRadius: "7px",
  },
  mainCard: {
    // width: "100%",
    display: "flex",
    padding: "4px",
    flexDirection: "column",
  },
  imgcard: {
    height: "calc(100% - 20px)",
    "& div": {
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px 0px",
      height: "calc(100% - 20px)",
    },
  },
  bodybox: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0px",
    "& h5": {
      fontFamily: "Cabin",
      fontWeight: "bold",
      fontSize: "18px",
      lineHeight: "22px",
      color: "#CECDCD",
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px",
      },
    },
  },
  flexBetween: {
    width: "calc(100% - 10px)",
    margin: "0 auto",
    paddingBottom: "4px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    "& h4": {
      fontWeight: "bold",
      fontSize: "17px",
      display: "flex",
      alignItems: "center",
      lineHeight: "20px",
      color: "#fff",
      [theme.breakpoints.down("sm")]: {
        fontSize: "15px",
        padding: "0px 0px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "13px",
        padding: "0px 0px",
      },
    },
    "& h5": {
      fontWeight: "bold",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      lineHeight: "20px",
      color: "#fff",
      whiteSpace: "nowrap",
      display: "block",
      textOverflow: "ellipsis",
      overflow: "hidden",
      "& svg": { marginRight: "7px" },
      [theme.breakpoints.down("sm")]: {
        fontSize: "13px",
        padding: "0px 0px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px",
        padding: "0px 0px",
      },
    },
    "& p": {
      fontWeight: "500",
      fontSize: "17px",
      lineHeight: "23px",
      color: "#19B9CB",
      display: "flex",
      alignItems: "center",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      [theme.breakpoints.down("sm")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px",
      },
    },
    "& h6": {
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "23px",
      color: "#19B9CB",
      display: "flex",
      alignItems: "center",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      [theme.breakpoints.down("sm")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px",
      },
    },
  },
  span: {
    fontFamily: "Cabin",
    fontWeight: "600",
    fontSize: "13px",
    lineHeight: "16px",
    color: "#7A7A7A",
  },
  iconcolor: {
    color: "#fff",
    // "&:hover": {
    //   color: "#EB4D00",
    // },
  },
  ethBtn: {
    position: "absolute",
    backgroundColor: "#fff",
    top: "5px",
    [theme.breakpoints.down("xs")]: {
      padding: "2px 7px",
    },
    "&:hover": {
      "&::after": {
        borderTop: "solid 8px rgb(224 224 224)",
      },
    },
    "&::after": {
      position: " absolute",
      width: " 0px",
      height: "30px",
      borderTop: "solid 8px rgb(255 255 255)",
      borderLeft: "solid 8px transparent",
      borderRight: "solid 8px transparent",
      content: "''",
      left: "50%",
      transform: "translateX(-50%)",
      top: "100%",
    },
  },
  buybtn: {
    fontFamily: "Cabin",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "17px",
    color: "#000000",
    [theme.breakpoints.down("xs")]: {
      fontSize: "11px",
    },
  },

  imgboxdone: {
    "& img": {
      width: "100%",
      // height: "300px",
      "@media(max-width:520px)": {
        width: "100%",
        // height: "165px",
      },
    },
  },
  iconeheart: {
    color: "#cecdcd",
    height: "17px",
    width: "17px",
    marginRight: "4px",
    [theme.breakpoints.down("xs")]: {
      height: "15px",
      width: "15px",
    },
  },
  bgbtnn: {
    margin: "0 auto",
    position: "absolute",
    left: "50%",
    bottom: "4px",
    transform: "translateX(-50%)",
    transition: "all 0.2s ease, visibility 0s",
    padding: "5px 15px",
    borderRadius: "50px",
    border: "0px solid rgb(63, 118, 82)",
    background:
      " no-repeat padding-box border-box 50%/cover scroll url(./images/bluebtn.png), rgba(63, 118, 82, 0)",
    transition: "inherit",
    fontWeight: 700,
    fontSize: " 15px",
    minWidth: "25px",
    [theme.breakpoints.down("xs")]: {
      minWidth: "85px",
      fontSize: " 13px",
    },
    "&:hover": {
      background:
        " no-repeat padding-box border-box 50%/cover scroll url(./images/btnorange.png), rgba(63, 118, 82, 0)",
    },
  },
}));

function Card({ data, type, index }) {
  const updateDimensions = () => {
    var offsetWidth = document.getElementById("imagecard" + index).offsetWidth;
    document.getElementById("imagecard" + index).style.height =
      offsetWidth + "px";
  };
  useEffect(() => {
    updateDimensions();
  });
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box className={classes.mainCard}>
        <Box className={classes.headbox}>
          <Link to="nft-detail" style={{ textDecoration: "none" }}>
            <Paper
              className={`${classes.imgcard} sss `}
              id={`imagecard${index}`}
              style={{
                backgroundImage: data?.coverImage,
                borderRadius: "10px",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <Box style={{ position: "relative" }}>
                <Box className={classes.imgboxdone}>
                  <img src={data?.text1} />
                </Box>
              </Box>
            </Paper>
          </Link>
        </Box>

        <Box
          pt={2}
          pb={2}
          display="flex"
          justifyContant="space-between"
          className={classes.flexBetween}
        >
          <Typography variant="h5">{data?.text2}</Typography>
        </Box>
        <Box
          display="flex"
          justifyContant="space-between"
          className={classes.flexBetween}
        >
          <Typography variant="h6"> {data?.text6}</Typography>

          <Box className={classes.bodyboxx}>
            <Typography variant="h6">
              <RiAuctionLine className={classes.iconeheart} />
              {data?.text3}
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContant="space-between"
          className={classes.flexBetween}
        >
          <Typography variant="body2">
            <FaEthereum className={classes.iconeheart} />
            2.123
          </Typography>
          <Typography variant="body2">
            <FavoriteBorderIcon className={classes.iconeheart} />2
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
export default Card;
