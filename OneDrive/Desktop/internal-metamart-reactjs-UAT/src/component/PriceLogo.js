import React from "react";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  logoImg: {
    width: "75px",
    // height: '44.5px',
    margin: " 14px 15px 11px 0px",
    objectFit: "contain",
    "@media (max-width: 500px)": {
      margin: " 11px 1px 3px 0px",
      width: "52px",
    },
  },
}));
const PriceLogo = (props) => {
  const classes = useStyles();
  return (
    <img
      src="/images/logo.png"
      alt="Logo"
      {...props}
      className={classes.logoImg}
    />
  );
};

export default PriceLogo;
