import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import FileCopyIcon from "@material-ui/icons/FileCopy";
const useStyles = makeStyles((theme) => ({
  root: { paddingBottom: "120px" },
  nftcard: {
    background: "#FFFFFF",
    // backdropFilter: "blur(44px)",
    borderRadius: "40px",
    padding: "10px",
  },
  nftImg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "40px 40px 10px 10px",
      overflow: "hidden",
      background: "rgba(0 , 0, 0, 0.041)",
      "& img": {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "auto",
        display: "block",
      },
    },
  },
  tabBtn: {
    margin: "20px 0px 10px 0px",
    backgroundColor: "#FCF2FA",
    borderRadius: "22px",
    padding: "14px",
    "& button": { borderRadius: "15px" },
  },
  bidsDetails: {
    background: "#FFFFFF",
    // backdropFilter: "blur(44px)",
    border: "0.5px solid #D3D3D3",
    boxSizing: "border-box",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "22px 0px 22px 22px",
    padding: "10px",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  profileimg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "40px 40px 10px 10px",
      overflow: "hidden",
      width: "75px",
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
    "& h2": {
      fontWeight: "bold",
      color: "#000000",
      [theme.breakpoints.down("sm")]: {
        fontSize: "20px",
      },
    },
    "& h6": {
      fontSize: "14px",
      color: "#000000",
      [theme.breakpoints.down("sm")]: {
        fontSize: "12px",
      },
      "& span": {
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "130%",
        color: "#D200A5",
        [theme.breakpoints.down("sm")]: {
          fontSize: "13px",
        },
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
const details1 = [
  {
    name: "Owner",
    add: "0xC3d7...7A1b",
  },
];
export const Details = () => {
  const classes = useStyles();
  return (
    <Box>
      {details1.map((data, index) => {
        return (
          <Box className={classes.bidsDetails}>
            <Box className={classes.price1}>
              <Typography variant="h5">{data.name}</Typography>
              <Typography variant="body2">
                {data.add} <FileCopyIcon style={{ fontSize: "14px" }} />
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
