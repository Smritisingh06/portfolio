import { Avatar, Box, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { sortAddress } from "src/utils";
import moment from "moment";
import Nodatafound from "src/component/DataDataNo";
const useStyles = makeStyles((theme) => ({
  root: { paddingBottom: "120px" },
  marketBidDetailsBox: {
    maxHeight: "257px",
    overflow: "auto",
    overflowX: "hidden",
    [theme.breakpoints.only("xs")]: {
      padding: "7px",
    },
  },
  bidsDetails: {
    background: theme.palette.background.card,
    boxSizing: "border-box",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px",
  },
  profileimg: {
    "& .MuiAvatar-root": {
      background: theme.palette.background.blur,
      marginRight: "10px",
    },
    "& img": {
      cursor: "pointer",
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
    "& p": {
      [theme.breakpoints.down("sm")]: {
        fontSize: "14px",
      },
      "& a": {
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "130%",
        color: "#4ea6f5",
        [theme.breakpoints.down("sm")]: {
          fontSize: "12px",
        },
      },
    },
  },
  ellips: {
    color: "#FF574C",
    whiteSpace: "pre",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "250px",
    "@media(max-width:520px)": {
      width: "100px",
    },
  },
  time: {
    [theme.breakpoints.down("sm")]: {
      paddingRight: "7px",
    },
    "& p": {
      fontWeight: "400",
      fontSize: "14px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "10px",
      },
    },
  },
}));

export default function Bids({ bidList }) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Paper elevation={2} className={classes.marketBidDetailsBox}>
      {bidList &&
        bidList.map((data, index) => {
          return (
            <Box className={classes.bidsDetails}>
              <Box style={{ alignItems: "center", display: "flex" }}>
                <Box className={classes.profileimg}>
                  <Avatar>
                    <img
                      src={
                        data?.userId?.profilePic
                          ? data?.userId?.profilePic
                          : "/images/Profile.png"
                      }
                      alt=""
                      onClick={() => {
                        history.push({
                          pathname: "/author",
                          search: data.userId._id,
                        });
                      }}
                    />
                  </Avatar>
                </Box>
                <Box className={classes.price1}>
                  <Typography variant="h4" style={{ fontSize: " 0.875rem" }}>
                    {data?.price} Metamart{" "}
                    <span
                      style={
                        data?.bidStatus === "PENDING"
                          ? { color: "yellow" }
                          : { color: "red" }
                      }
                    >
                      {data?.bidStatus}
                    </span>
                  </Typography>
                  <Typography variant="body2" color="primary">
                    by{" "}
                    <span className={classes.ellips}>
                      {data?.userId?.name
                        ? data?.userId?.name
                        : sortAddress(data?.userId?.walletAddress)}
                    </span>{" "}
                    for 1 edition
                  </Typography>
                </Box>
              </Box>
              <Box className={classes.time}>
                <Typography
                  variant="body2"
                  style={{ fontSize: "12px", fontStyle: "normal" }}
                >
                  {" "}
                  {moment(data.createdAt).format("ll")}
                </Typography>
                <Typography
                  variant="body2"
                  style={{ fontSize: "12px", fontStyle: "normal" }}
                >
                  {" "}
                  {moment(data.createdAt).format("hh:mm A")}
                </Typography>
              </Box>
            </Box>
          );
        })}
      {bidList && bidList.length === 0 && <Nodatafound />}
    </Paper>
  );
}
