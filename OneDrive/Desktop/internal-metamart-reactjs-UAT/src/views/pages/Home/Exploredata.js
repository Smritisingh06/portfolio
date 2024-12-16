import React, { useContext } from "react";

import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css";
import { UserContext } from "src/context/User";
import { useWeb3React } from "@web3-react/core";

import { toast } from "react-toastify";
import SettingsContext from "src/context/SettingsContext";
const useStyles = makeStyles((theme) => ({
  bannerBox: {
    position: "relative",
    overflow: "hidden",
    zIndex: "1",

    "& .artwork": {
      marginTop: "30px",
      textAlign: "left",
      [theme.breakpoints.down("sm")]: {
        marginBottom: "0px",
      },

      "& .artworkbox": { paddingRight: "3.15rem" },
      [theme.breakpoints.down("xs")]: {
        paddingRight: "2.15rem",
      },
      "& h3": {
        fontSize: "30px",

        [theme.breakpoints.down("xs")]: {
          fontSize: "20px",
        },
      },
      "& p": {
        fontWeight: 400,

        marginTop: "10px",
        color: "#706b6b",
        [theme.breakpoints.down("xs")]: {
          fontSize: "14px",
        },
      },
    },

    "& .bannerImg": {
      position: "relative",
      "& .mainbannerimg": {
        maxWidth: "100%",
        width: "auto",
      },
    },
  },
}));
export default function Banner(props) {
  const classes = useStyles();
  const { data } = props;
  const themeSeeting = useContext(SettingsContext);
  const user = useContext(UserContext);
  const { account, library, chainId } = useWeb3React();
  const toastmsg = () => {
    toast.warn("Please connect your wallet");
  };
  // console.log("ASdasdasdasdasdsd",data)
  return (
    <Box className={classes.bannerBox}>
      <Box className="artwork">
        <Box display="flex" className="artworkmaingrid">
          <Box className="artworkbox">
            {" "}
            <Typography variant="h3" color="primary">
              {data?.collection} +{" "}
            </Typography>
            <Typography variant="body2">Collections</Typography>
          </Box>

          <Box className="artworkbox">
            {" "}
            <Typography variant="h3" color="primary">
              {data?.user} +{" "}
            </Typography>
            <Typography variant="body2">Artists</Typography>
          </Box>

          <Box className="artworkbox">
            {" "}
            <Typography variant="h3" color="primary">
              {data?.order} +{" "}
            </Typography>
            <Typography variant="body2">Items</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
