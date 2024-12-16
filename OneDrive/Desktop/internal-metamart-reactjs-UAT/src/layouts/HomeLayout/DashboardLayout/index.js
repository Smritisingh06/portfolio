import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import SettingsContext from "src/context/SettingsContext";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#hsl(206deg 78.36% 81.92%) ", // white here
    backgroundRepeat: "repeat",
    background: "hsl(206deg 78.36% 81.92%) ", // white here
    // backgroundImage: "url(/images/light.jpg)" /* fallback */, //commeted here
    backgroundSize: "100%",
    backgroundPosition: "top",
  },
  root1: {
    backgroundColor: "#181A20",
    backgroundRepeat: "repeat",
    background: "#181A20",
    // backgroundImage: "url(/images/Dark_Theme.webp)" /* fallback */,
    backgroundSize: "100%",
    backgroundPosition: "top",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 70,
    minHeight: "100vh",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    backgroundRepeat: "no-repeat",
    // backgroundColor: "rgba(204, 204, 204, 0)",
    // backgroundImage: "url(/images/line.png)" /* fallback */,
    backgroundSize: "100%",
    // background: "#F4FCFA",
    backgroundPosition: "top",
    // backgroundImage:
    //   " url(/images/line.png), linear-gradient(105deg, #feeefd 1.25%, #4606b9 99.18%)" /* W3C */,
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    WebkitOverflowScrolling: "touch",
    // padding: "10px 50px 0px ",
    [theme.breakpoints.down("sm")]: {
      // padding: "10px 20px 0px ",
    },
  },
}));

const DashboardLayout = ({ children }) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const themeSeeting = useContext(SettingsContext);
  const changeTheme = (type) => {
    themeSeeting.saveSettings({
      theme: type,
    });
  };

  return (
    <div
      className={
        themeSeeting.settings.theme === "DARK"
          ? `${classes.root1}`
          : `${classes.root}`
      }
    >
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content} id="main-scroll">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default DashboardLayout;
