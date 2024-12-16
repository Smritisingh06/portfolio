
import {
    makeStyles,
  } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    bannerBox: {
      position: "relative",
      padding: "150px 0px 70px",
      overflow: "hidden",
      zIndex: "1",
      [theme.breakpoints.down("xs")]: {
        padding: "120px 0px 50px",
      },
      "& .textbox": {
        "& h1": {
          fontSize: "50px ",
          maxWidth: "517px",
          fontFamily: "'ClashDisplay-Extralight'",
          [theme.breakpoints.down("md")]: {
            fontSize: "40px ",
          },
          "& span": { fontFamily: "'ClashDisplay-Medium'" },
        },
        "& p": {
          marginTop: "20px",
          color: "#706b6b",
          maxWidth: "415px",
        },
      },
      "& .artwork": {
        marginTop: "50px",
        textAlign: "left",
        [theme.breakpoints.down("sm")]: {
          marginBottom: "0px",
        },
  
        "& .artworkbox": { paddingRight: "3.15rem" },
        "& h2": {
          fontSize: "40px",
          fontFamily: "'ClashDisplay-Medium'",
          [theme.breakpoints.down("xs")]: {
            fontSize: "20px",
          },
        },
        "& p": {
          fontWeight: 400,
          fontSize: "18px",
          marginTop: "10px",
          color: "#706b6b",
          [theme.breakpoints.down("xs")]: {
            fontSize: "14px",
          },
        },
      },
      "& .buttonright": {
        marginLeft: "10px !important",
        minWidth: "150px",
      },
      "& .bannerImg": {
        position: "relative",
        "& .mainbannerimg": {
          maxWidth: "100%",
          width: "auto",
        },
        "& .bannerleftanimation": {
          position: "absolute",
          maxWidth: "239px",
          top: "27%",
          left: "-98px",
          zIndex: "9",
          [theme.breakpoints.down("sm")]: {
            maxWidth: "137px",
            left: "-32px",
          },
          [theme.breakpoints.down("xs")]: {
            maxWidth: "137px",
            left: "-18px",
          },
        },
      },
    },
    minth1: {
      display: "flex",
      alignItems: "center",
      padding: "5px 0px",
      "& img": {
        paddingLeft: "5px",
      },
    },
    darkImg: {
      backgroundImage: "url(images/stock.png)",
      backgroundRepeat: "no-repeat",
      height: "45px",
      width: "45px",
      backgroundSize: "100%",
      marginLeft: "10px",
    },
    darkImg1: {
      backgroundImage: "url(images/blackstock.png)",
      backgroundRepeat: "no-repeat",
      height: "45px",
      width: "45px",
      backgroundSize: "100%",
      marginLeft: "10px",
    },
  }));