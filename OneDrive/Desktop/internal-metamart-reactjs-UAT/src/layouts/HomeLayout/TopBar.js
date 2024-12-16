import {
  AppBar,
  Toolbar,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  MenuItem,
  Box,
  Container,
  Typography,
  Menu,
  Paper,
  Dialog,
  Link,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect, useRef, useContext } from "react";
import { Link as CompLink, useHistory, useLocation } from "react-router-dom";
import Logo from "./../../component/Logo";
import { NavLink } from "react-router-dom";
import { UserContext } from "src/context/User";
import { FiSun } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa";
import { useWeb3React } from "@web3-react/core";
import { sortAddress } from "src/utils";
import SearchBox from "src/layouts/HomeLayout/DashboardLayout/SearchBox";
import SettingsContext from "src/context/SettingsContext";
import { BsFillCaretDownFill } from "react-icons/bs";
const headersData = [
  {
    label: "Home",
    href: "/",
    isDisabled: false,
  },

  {
    label: "Exchange",
    href: "https://www.mobiloitte.com/",
    isDisabled: true,
    isExternal: true,
  },
  {
    label: "Marketplace",
    href: "/explore",
    isDisabled: false,
  },
  {
    label: "Collections",
    href: "/collections",
    isDisabled: false,
  },
];

const useStyles = makeStyles((theme) => ({
  menuButton: {
    fontSize: "14px",
    lineHeight: "24px",
    fontWeight: "300",
    borderRadius: 0,
    minWidth: "auto",
    color: theme.palette.primary.main,
    padding: "0px 7px",
    textDecoration: " none",
    "@media (max-width: 900px)": {
      letterSpacing: "-0.6px",
      lineHeight: "24px",
      color: "#FFF",
      padding: "15px !important",
      height: "51px",
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    "&.active": {
      color: "hsl(230.54deg 95.03% 63.21%)",
    },
    "&:hover": {
      color: "hsl(230.54deg 95.03% 63.21%)",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
    padding: "5px 0px",
    marginTop: 20,
    "& a": {
      // color: theme.palette.primary.main,
      // color: "#ffffff",
      // padding: "0px 7px",
      fontSize: "14px",
      minWidth: "auto",
      fontWeight: 300,
      // lineHeight: "24px",
      // borderRadius: 0,
      textDecoration: "none !important",
    },
    "& .MuiLink-underlineHover": {
      // color: "#ff3965",
      "&:hover": {
        color: "hsl(230.54deg 95.03% 63.21%)", //#ff3965
      },
    },
  },
  maindrawer: {
    height: "100%",
    background: "#0c0731",
    width: "260px",
  },
  logoDrawer: {
    width: "140px",
  },
  drawerContainer: {
    padding: "20px 0px 20px 20px",
    height: "100%",
    background: "#fff",
    background: theme.palette.background.default,
    width: "260px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  drawericon: {
    color: "#000",
    marginLeft: "0px !important",
    fontSize: "25px",
  },
  logoImg: {
    width: "75px",
    margin: " 14px 15px 11px 0px",
    objectFit: "contain",
    "@media (max-width: 500px)": {
      margin: " 11px 1px 3px 0px",
      width: "52px",
    },
  },
  menuMobile: {
    padding: "16px",
    "@media (max-width: 500px)": {
      padding: "7px 0",
      width: "100%",
    },
  },
  mainHeader: {
    justifyContent: "space-between",
    padding: "0px",
  },
  menuButton1: {
    paddingLeft: "0",
  },
  menuMobile1: {
    padding: "15px 0",
    "& h4": {
      fontSize: "14px !important",
      lineHeight: " 17px",
      color: theme.palette.text.main,
      margin: "0 8px",
      fontWeight: "400",
      [theme.breakpoints.only("xs")]: {
        fontSize: "12px !important",
      },
    },
    "& svg": {
      color: theme.palette.text.main,
      "@media (max-width:767px)": {
        display: "none",
      },
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
    "& figure": {
      margin: 0,
      width: 40,
      height: 40,
      borderRadius: "50px",
      overflow: "hidden",
      display: "flex",
      justifyContent: " center",
      alignItems: "center",
      "& img": {
        width: "auto",
        height: "auto",
        maxWidth: "100%",
      },
    },
  },
  searchdiaogBox: {
    "& .MuiDialogContent-root": {
      minHeight: "calc(100vh - 100px)",
      [theme.breakpoints.only("xs")]: {
        padding: "20px 0 !important",
      },
    },
    "& .MuiDialog-paperScrollPaper": {
      overflowY: "auto",
    },
  },
}));

export default function Header() {
  const { account, chainId } = useWeb3React();
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const user = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [updateName, setUpdateName] = useState(false);
  const location = useLocation();
  const [networkDetails, setNetworkDetails] = React.useState([]);
  const handleClose4 = () => {
    setAnchorEl1(null);
  };
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const {
    menuMobile,
    menuButton,
    menuButton1,
    divstake,
    toolbar,
    drawerContainer,
    menuMobile1,
    drawericon,
    logoDrawer,
    mainHeader,
  } = useStyles();
  const history = useHistory();
  const [updateMinSatkeOpen, setUpdateMinSatkeOpen] = useState(false);
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const { mobileView, drawerOpen } = state;
  const themeSeeting = useContext(SettingsContext);
  const changeTheme = (type) => {
    themeSeeting.saveSettings({
      theme: type,
    });
  };
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1220
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);
  const [open1, setOpen1] = useState({ community: false, user: false });
  const anchorRef = { community: useRef(null), user: useRef(null) };
  const StyledMenu = withStyles({
    paper: {
      marginTop: "2px",
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          {femmecubatorLogo}
        </Box>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          {getMenuButtons()}
          {user?.isLogin ? (
            <Button
              aria-label="delete"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick1}
              className={menuMobile1}
              style={{ marginLeft: "10px" }}
              size="small"
              color="primary"
            >
              <figure
                style={
                  user?.isLogin
                    ? { height: "40px", width: "40px" }
                    : { width: "0px" }
                }
              >
                <img
                  src={
                    user?.userData?.profilePic
                      ? user?.userData?.profilePic
                      : "/images/idicon.svg"
                  }
                  alt=""
                />
              </figure>
              <Typography
                variant="h4"
                color="primary"
                title={
                  user?.userData?.name
                    ? user?.userData?.name
                    : user?.userData?.walletAddress
                }
              >
                {" "}
                {user?.userData?.name
                  ? user?.userData?.name.slice(0, 5) + ".."
                  : sortAddress(user?.userData?.walletAddress)}
              </Typography>
              <BsFillCaretDownFill style={{ fontSize: "16px" }} />
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              to="/conect-wallet"
              component={CompLink}
              style={{
                marginLeft: "15px",
                whiteSpace: "pre",
                fontWeight: "500",
              }}
            >
              Connect Wallet
            </Button>
          )}
          &nbsp;
          <Box
            className="themeButton"
            style={{ display: "flex", margin: "7px" }}
          >
            <IconButton
              style={{ background: "rgba(255, 255, 255, 0.05)" }}
              className="searchiconBox"
              onClick={() => history.push("/search-data")}
              // onClick={() => setDialogOpen(true)}
            >
              <SearchIcon />
            </IconButton>
          </Box>
          {/* //here commented for to remove light/dark website feature */}
          {/* <Box className="themeButton">
            {themeSeeting.settings.theme === "DARK" ? (
              <IconButton
                variant="contained"
                className="searchiconBox1"
                color="primary"
                style={{ background: "rgba(255, 255, 255, 0.05)" }}
                onClick={() => {
                  changeTheme("LIGHT");
                }}
              >
                <FiSun />
              </IconButton>
            ) : (
              <IconButton
                variant="contained"
                className="searchiconBox"
                color="primary"
                style={{ background: "rgba(13, 13, 13, 0.08)" }}
                onClick={() => {
                  changeTheme("DARK");
                }}
              >
                <FaRegMoon />
              </IconButton>
            )}
          </Box> */}
          <Box className={divstake}>
            <StyledMenu
              id="simple-menu"
              disableScrollLock={true}
              anchorEl={anchorEl1}
              keepMounted
              open={Boolean(anchorEl1)}
              onClose={handleClose4}
            >
              <MenuItem
                onClick={() => {
                  history.push("/profile");
                }}
              >
                Profile
              </MenuItem>
              {user?.userData?.userType === "Admin" && (
                <MenuItem
                  onClick={() => {
                    history.push("/dashboard");
                  }}
                >
                  Dashboard
                </MenuItem>
              )}
              <MenuItem
                onClick={() => {
                  history.push("/create");
                }}
              >
                Create NFT
              </MenuItem>
              {user?.userData?.userType === "Admin" ? (
                <></>
              ) : (
                <MenuItem
                  onClick={() => {
                    history.push("/kyc");
                  }}
                >
                  KYC
                </MenuItem>
              )}

              <MenuItem
                onClick={() => {
                  user.logoutHandler();
                  setAnchorEl1();
                }}
              >
                Disconnect
              </MenuItem>
            </StyledMenu>
          </Box>
        </Box>
      </Toolbar>
    );
  };

  const [searchInput, setSearchInput] = useState("");
  const searchTextRef = React.useRef(null);

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
    //mobile
    return (
      <Toolbar className={mainHeader}>
        <Drawer
          {...{
            anchor: "right",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>
            <img className={logoDrawer} src="images/Mobiloitte_blue_logo.png" alt="" />
            {getDrawerChoices()}
            <div>
              {user?.isLogin ? (
                <IconButton
                  aria-label="delete"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick1}
                  className={menuMobile1}
                  size="small"
                  style={{ padding: "16px 0px" }}
                >
                  <figure
                    style={
                      user?.isLogin
                        ? { height: "40px", width: "40px" }
                        : { width: "0px" }
                    }
                  >
                    <img
                      src={
                        user?.userData?.profilePic
                          ? user?.userData?.profilePic
                          : "/images/Profile.png"
                      }
                      alt=""
                    />
                  </figure>
                  <Typography
                    variant="h4"
                    color="primary"
                    title={
                      user?.userData?.name
                        ? user?.userData?.name
                        : user?.userData?.walletAddress
                    }
                  >
                    {" "}
                    {user?.userData?.name
                      ? user?.userData?.name.slice(0, 5) + ".."
                      : sortAddress(user?.userData?.walletAddress)}
                  </Typography>
                  <BsFillCaretDownFill
                    style={{
                      color: "#000",
                      fontSize: "16px",
                      marginLeft: "8px",
                    }}
                  />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="delete"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={() => setUpdateMinSatkeOpen(true)}
                  className={menuMobile1}
                  size="small"
                >
                  <figure
                    style={
                      user?.isLogin
                        ? { height: "40px", width: "40px" }
                        : { width: "0px" }
                    }
                  >
                    <img
                      src={
                        user?.userData?.profilePic
                          ? user?.userData?.profilePic
                          : "/images/Profile.png"
                      }
                      alt=""
                    />
                  </figure>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    to="/conect-wallet"
                    component={CompLink}
                    style={{ whiteSpace: "pre", marginTop: "10px" }}
                  >
                    Connect Wallet
                  </Button>
                </IconButton>
              )}
              <Box className={divstake}>
                <Menu
                  id="simple-menu"
                  disableScrollLock={true}
                  anchorEl={anchorEl1}
                  keepMounted
                  open={Boolean(anchorEl1)}
                  onClose={handleClose4}
                >
                  <MenuItem
                    onClick={() => {
                      history.push("/profile");
                    }}
                  >
                    Profile
                  </MenuItem>
                  {user?.userData?.userType === "Admin" && (
                    <MenuItem
                      onClick={() => {
                        history.push("/dashboard");
                      }}
                    >
                      Dashboard
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={() => {
                      history.push("/create");
                    }}
                  >
                    Create NFT
                  </MenuItem>
                  {user?.userData?.userType === "Admin" ? (
                    <></>
                  ) : (
                    <MenuItem
                      onClick={() => {
                        history.push("/kyc");
                      }}
                    >
                      KYC
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={() => {
                      user.logoutHandler();
                      setAnchorEl1();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            </div>
          </div>
        </Drawer>

        <Box display="flex" justifyContent="space-between">
          {femmecubatorLogo}
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton
            onClick={() => setDialogOpen(true)}
            className="searchiconBox"
          >
            <SearchIcon />
          </IconButton>
          {/* <Box className="themeButton">
            {themeSeeting.settings.theme === "DARK" ? (
              <IconButton
                variant="contained"
                color="primary"
                style={{ background: "rgba(255, 255, 255, 0.05)" }}
                onClick={() => {
                  changeTheme("LIGHT");
                }}
              >
                <FiSun />
              </IconButton>
            ) : (
              <IconButton
                variant="contained"
                color="primary"
                style={{ background: "rgba(13, 13, 13, 0.08)" }}
                onClick={() => {
                  changeTheme("DARK");
                }}
              >
                <FaRegMoon />
              </IconButton>
            )}
          </Box> */}
          <IconButton
            className={drawericon}
            {...{
              edge: "start",
              color: "inherit",
              "aria-label": "menu",
              "aria-haspopup": "true",
              onClick: handleDrawerOpen,
            }}
          >
            <MenuIcon
              width="60px"
              height="60px"
              style={{ color: "hsl(230.54deg 95.03% 63.21%)", fontSize: "26px" }}
            />
          </IconButton>
        </Box>
      </Toolbar>
    );
  };
  //mobile end
  const getDrawerChoices = () => {
    return headersData.map(({ label, href, isDisabled }) => {
      return (
        <>
          {isDisabled ? (
            <Button
              {...{
                key: label,
                color: "inherit",
                // to: href,
                // component: CompLink,
                className: menuButton1,
              }}
              // disabled={isDisabled}
              href={href}
              target="_blank"
            >
              <MenuItem className={menuMobile}>{label}</MenuItem>
            </Button>
          ) : (
            <Button
              {...{
                key: label,
                color: "inherit",
                to: href,
                component: CompLink,
                className: menuButton1,
              }}
              // disabled={isDisabled}
            >
              <MenuItem className={menuMobile}>{label}</MenuItem>
            </Button>
          )}
        </>
      );
    });
  };

  const femmecubatorLogo = (
    <Box>
      <CompLink to="/">
        <Logo className="logoImg" />
      </CompLink>
    </Box>
  );

  const getMenuButtons = (activeClassName) => {
    return headersData.map(({ label, href, isDisabled }) => {
      return (
        <>
          {isDisabled ? (
            <Link
              href={isDisabled ? href : ""}
              target="_blank"
              style={{ padding: "0px 7px" }}
            >
              {label}
            </Link>
          ) : (
            <NavLink
              exact
              // to={`${href}`}
              {...{
                key: label,
                color: "inherit",
                to: isDisabled ? "" : href,
                // component: CompLink,
                className: menuButton,
                activeClassName: isDisabled ? "" : "active",
              }}
              disabled={isDisabled}
            >
              {" "}
              {label}
            </NavLink>
          )}
        </>
      );
    });
  };

  return (
    <>
      <AppBar
        position={history.location.pathname !== "/" ? "relative" : "absolute"}
        elevation={0}
        style={{ backgroundColor: "#ccc0", border: "none" }}
      >
        <Container maxWidth="lg">
          {mobileView ? displayMobile() : displayDesktop()}
        </Container>
      </AppBar>
      {dialogOpen && (
        <Paper>
          <Dialog
            fullWidth
            maxWidth="lg"
            className={classes.searchdiaogBox}
            style={{
              position: "absolute",
              top: "10%",
            }}
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
          >
            <IconButton
              className="closeButton"
              onClick={() => setDialogOpen(false)}
            >
              <CloseIcon style={{ color: "#AAAAAA" }} />
            </IconButton>

            <Box className="dialogBoxHeight">
              <SearchBox />
            </Box>
          </Dialog>
        </Paper>
      )}
    </>
  );
}
