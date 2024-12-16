import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useContext, useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { UserContext } from "src/context/User";
import axios from "axios";
import Apiconfig from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import { sortAddress, calculateTimeLeft } from "src/utils";
const useStyles = makeStyles((theme) => ({
  root: { paddingBottom: "70px" },
  root2: { paddingTop: "30px" },
  boxsection: {
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "40px",
    "& h6": {
      color: " #3B0D60",
      fontWeight: "bold",
      fontSize: "18px",
      paddingTop: "7px",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
    [theme.breakpoints.down("xs")]: {
      borderRadius: "20px",
    },
  },
  box3: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "13px",
    "& svg": {
      color: theme.palette.primary.main,
      background: "#FCF2FA",
      padding: "15px",
      width: "50px",
      height: "50px",
      borderRadius: "50%",
    },
    "& h6": {
      color: "#C6BECC",
      marginLeft: "10px",
      paddingBottom: "10px",
      [theme.breakpoints.up("sm")]: {
        fontSize: "15px",
      },
      [theme.breakpoints.up("xs")]: {
        fontSize: "12px",
      },
    },
    "& h5": {
      color: "#C6BECC",
      marginRight: "10px",
      [theme.breakpoints.up("sm")]: {
        fontSize: "29px",
      },
      [theme.breakpoints.up("xs")]: {
        fontSize: "16px",
      },
    },
  },
  text3: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "10px",
    "& h5": {
      color: "#E4C3DE",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
    },
  },
  text4: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "10px",
    "& h4": {
      color: "#D200A5",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "130%",
    },
  },
  price: {
    paddingBottom: "11px",
    "& h6": {
      fontWeight: "bold",
      fontSize: "10px",
      lineHeight: "130%",
      color: "#E4C3DE",
    },
  },
  box4: {
    backgroundColor: "#FCF2FA",
    borderRadius: "16px",
    padding: "5px",
  },
  dotimg: {
    background: "#D200A5",
    boxShadow: "0px 4px 7px rgba(210, 0, 165, 0.25)",
  },
  nftImg: {
    width: "100%",
    height: "210px",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "40px 40px 10px 10px",
    backgroundColor: "#ccc !important",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "20px 20px 10px 10px",
    },
  },
}));
export default function NFTCard(props) {
  const history = useHistory();
  const { data, type, index, callbackFun } = props;
  const classes = useStyles();
  const user = useContext(UserContext);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
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

  if (user.userData && data?.likesUsers) {
    var likesUsers = data?.likesUsers?.filter(
      (order) => order === user.userData._id
    );
    var isLike = likesUsers?.length > 0;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(new Date(parseInt(data?.endTime) * 1000)));
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <Box className={classes.boxsection}>
      <Box
        id={`imagecard${index}`}
        className={classes.nftImg}
        // style={{ background: "url(" + data?.nftId?.coverImage + ")" }}
        style={
          data?.nftId?.coverImage
            ? { background: "url(" + data?.nftId?.coverImage + ")" }
            : { background: "url(" + "images/market_detail.png" + ")" }
        }
        onClick={() => {
          history.push({
            pathname: "/nft",
            search: data._id,
          });
        }}
      ></Box>
      <Box>
        <Typography variant="h6">{data.name}</Typography>
      </Box>
      <Box className={classes.box3}>
        <Box display="flex" alignItems="center">
          <img src={data.avatar} alt="" />
          <Typography variant="h6">{data.avatarName}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="h5">20</Typography>
          <BiLike />
        </Box>
      </Box>
      {type == "auction" && (
        <Box className={classes.box4}>
          <Box className={classes.text3}>
            <Typography variant="h5">{data.price}</Typography>
            <Typography variant="h5">{data.endingin}</Typography>
          </Box>
          <Box className={classes.text4}>
            <Typography variant="h4">{data.pricea}</Typography>
            <Typography variant="h4">{data.time}</Typography>
          </Box>
          <Box className={classes.price}>
            <Typography variant="h6">{data.total}</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
