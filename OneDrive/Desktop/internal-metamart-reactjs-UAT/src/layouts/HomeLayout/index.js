import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import Footer from "./Footer";
import TopBar from "./TopBar";
import { Box } from "@material-ui/core";
import SettingsContext from "src/context/SettingsContext";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "hsl(206deg 78.36% 81.92%)" /* #fff */,
    backgroundRepeat: "repeat",
    background: "hsl(206deg 78.36% 81.92%)" /* #fff */,
    // backgroundImage: "url(/images/light.jpg)" /* fallback */,
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
  MainLayout: {
    zIndex: "1",
    position: "relative",
    minHeight: "calc(100vh - 415px)",
  },
}));

const MainLayout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const themeSeeting = useContext(SettingsContext);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div
      className={
        themeSeeting.settings.theme === "DARK"
          ? `${classes.root1}`
          : `${classes.root}`
      }
    >
      <TopBar />

      <div
        style={
          history.location.pathname !== "/"
            ? { display: "block" }
            : { display: "none" }
        }
      ></div>

      <div className={classes.MainLayout}>
        {" "}
        <Box className={classes.shade}></Box>
        <Box className={classes.shade1}></Box>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
