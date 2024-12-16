import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
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
      borderRadius: "10px",
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
    margin: "0px 0px 10px 0px",
    padding: "5px",
  },
  profileimg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "10px",
      overflow: "hidden",
      margin: 0,
      marginRight: "20px",
      width: "100px",
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
    "& p": {
      color: "#000000",
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
  time: {
    paddingRight: "25px",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "7px",
    },
    "& p": {
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#727486",
      [theme.breakpoints.down("sm")]: {
        fontSize: "10px",
      },
    },
  },
}));
const bids1 = [
  {
    price: "0.012",
    avatar: "/images/Profile.png",
    name: "by @nkit pandey..... for 1 edition",
    date: "03-02-2022",
    time: "12:29 PM",
  },
  {
    price: "0.012",
    avatar: "/images/Profile.png",
    name: "by @nkit pandey..... for 1 edition",
    date: "03-02-2022",
    time: "12:29 PM",
  },
  {
    price: "0.012",
    avatar: "/images/Profile.png",
    name: "by @nkit pandey..... for 1 edition",
    date: "03-02-2022",
    time: "12:29 PM",
  },
  {
    price: "0.012",
    avatar: "/images/Profile.png",
    name: "by @nkit pandey..... for 1 edition",
    date: "03-02-2022",
    time: "12:29 PM",
  },
];
export default function Bids() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box>
      {bids1.map((data, index) => {
        return (
          <Box className={classes.bidsDetails}>
            <Box style={{ alignItems: "center", display: "flex" }}>
              <Box className={classes.profileimg}>
                <figure>
                  <img
                    src={data.avatar}
                    alt=""
                    onClick={() => {
                      history.push("/author");
                    }}
                  />
                </figure>
              </Box>
              <Box className={classes.price1}>
                <Typography variant="h4">{data.price}</Typography>
                <Typography variant="body2">
                  by <Link to="/author">@nkit pandey.....</Link> for 1 edition
                </Typography>
              </Box>
            </Box>
            <Box className={classes.time}>
              <Typography variant="body2">{data.date}</Typography>
              <Typography variant="body2">{data.time}</Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
