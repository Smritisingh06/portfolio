import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  makeStyles,
  IconButton,
  Hidden,
} from "@material-ui/core";
import SettingsContext from "src/context/SettingsContext";
import { Menu as MenuIcon } from "react-feather";
import TopBarData from "./TopBarData";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    backgroundRepeat: "repeat",
    background: "#fff",
    backgroundImage: "url(/images/light.jpg)" /* fallback */,
    backgroundSize: "100%",
    backgroundPosition: "top",
  },
  root1: {
    backgroundColor: "#fff",
    backgroundRepeat: "repeat",
    background: "#fff",
    backgroundImage: "url(/images/Dark_Theme.webp)" /* fallback */,
    backgroundSize: "100%",
    backgroundPosition: "top",
  },
  toolbar: {
    backdropFilter: "blur(50px)",
    height: 70,
    padding: "0 10px",
    float: "right !important",
    width: "calc(100% - 256px)",
    right: 0,
    position: "absolute",
    top: -2,
    padding: 0,
    "@media (max-width: 1279px)": {
      width: "100%",
    },
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    "& + &": {
      marginLeft: theme.spacing(2),
    },
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  drawericon: {
    color: "#000",
    top: "0px",
    left: "15px",
    fontSize: "25px",
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const { drawericon } = useStyles();
  const themeSeeting = useContext(SettingsContext);
  return (
    <div
      className={
        themeSeeting.settings.theme === "DARK"
          ? `${classes.root1}`
          : `${classes.root}`
      }
    >
      <AppBar elevation={0} color="inherit" {...rest}>
        <Toolbar className={classes.toolbar}>
          <Hidden lgUp>
            <IconButton
              className={drawericon}
              {...{
                edge: "start",
                color: "inherit",
                "aria-label": "menu",
                "aria-haspopup": "true",
                onClick: onMobileNavOpen,
              }}
            >
              <MenuIcon
                width="25px"
                height="25px"
                style={{ color: "hsl(230.54deg 95.03% 63.21%)", fontSize: "30px" }}
              />
            </IconButton>
          </Hidden>
          <TopBarData />
        </Toolbar>
      </AppBar>
    </div>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};
TopBar.defaultProps = {
  onMobileNavOpen: () => {},
};

export default TopBar;
