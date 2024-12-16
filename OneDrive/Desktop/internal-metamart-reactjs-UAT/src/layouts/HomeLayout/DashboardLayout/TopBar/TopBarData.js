import {
  AppBar,
  Toolbar,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  InputBase,
  Grid,
  MenuItem,
  Box,
  Container,
  Menu,
  Typography,
  DialogContent,
  InputAdornment,
  Dialog,
  TextField,
  FormControl,
  Paper,
} from "@material-ui/core";
import SettingsContext from "src/context/SettingsContext";
import CloseIcon from "@material-ui/icons/Close";
import { FiSun } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState, useEffect, useRef, useContext } from "react";
import { BsFillCaretDownFill } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "src/context/User";
import ConnectWallet from "src/views/pages/Connect/ConnectWallet";
import { sortAddress } from "src/utils";
import { CgSearch } from "react-icons/cg";
import { GiCancel } from "react-icons/gi";
import { useWeb3React } from "@web3-react/core";
import { useLocation } from "react-router-dom";
import ApiConfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import SearchResultBox from "src/views/pages/Search";
const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
    // background: theme.palette.background.blur,
    border: "2px solid rgba(0, 0, 0, 0.025)",
    backdropFilter: "blur(4px)",
    borderRadius: 15,
    padding: " 5px 17px",
    marginTop: 20,
    "@media (max-width: 900px)": {
      paddingLeft: "75px",
      paddingRight: "20px",
      height: "100%",
    },
  },
  logoDrawer: {
    paddingLeft: "10px",
    width: "140px",
    marginBottom: "30px",
  },
  drawerContainer: {
    padding: "20px 0px ",
    height: "100%",
    background: "#000",
    width: "260px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
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

  containerHeight: {
    height: "100%",
  },
  mainHeader: {
    justifyContent: "space-between",
    padding: "0px",
  },
  menuMobile1: {
    marginLeft: "10px",
    "& h4": {
      fontSize: "14px",
      lineHeight: " 17px",
      color: theme.palette.text.main,
      margin: "0 5px",
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
  customizedButton: {
    fontSize: "20px",
    padding: "5px 10px 10px 0px",
  },
  dailogOpen: {
    borderRadius: "25px",
    padding: "10px",
    "& h5": {
      color: "#3B0D60",
      fontSize: "17px",
    },
  },
  customizedButton1: {
    display: "flex !important",
    justifyContent: "end",
    "& div": {
      display: "flex !important",
    },
  },
  searcBox: {
    height: "50px",
    "& .MuiIconButton-root": {
      background: theme.palette.background.blur,
      marginLeft: "-6px",
      padding: "8px",
    },
  },
  mainTextfieldBox: {
    maxWidth: "600px",
    width: "auto",
    marginTop: "22px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "22px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(230 226 230 / 0%)",
    },
    "& .MuiOutlinedInput-adornedEnd": {
      paddingRight: "0px !important",
    },
    "& .MuiOutlinedInput-adornedStart": {
      padding: "3px !important",
      borderRadius: "50px",
    },
    "& .MuiIconButton-root": {
      background: theme.palette.background.blur,
      marginLeft: "-6px",
      padding: "8px",
    },
  },
  searchdiaogBox: {
    "& .MuiDialogContent-root": {
      [theme.breakpoints.only("xs")]: {
        padding: "20px 0 !important",
      },
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [walletPopup, setWalletPopup] = useState(false);
  const [open, setOpen] = React.useState(false);
  const themeSeeting = useContext(SettingsContext);
  const changeTheme = (type) => {
    themeSeeting.saveSettings({
      theme: type,
    });
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };
  const {
    divstake,
    toolbar,
    flexButton,
    drawerContainer,
    logoDrawer,
    containerHeight,
    mainHeader,
    searcBox,
    menuMobile1,
    customizedButton,
    dailogOpen,
    customizedButton1,
  } = useStyles();
  const history = useHistory();
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const { mobileView, drawerOpen } = state;
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl1(null);
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
  const [updateMinSatkeOpen, setUpdateMinSatkeOpen] = useState(false);
  const [updateName, setUpdateName] = useState(false);
  const searchTextRef = React.useRef(null);
  const location = useLocation();
  const [searchResult, setSearchResult] = useState();

  const handleClose2 = (event, name) => {
    if (
      anchorRef[name].current &&
      anchorRef[name].current.contains(event.target)
    ) {
      return;
    }

    setOpen1({ ...open1, [name]: false });
  };

  function handleListKeyDown(event, name) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen1({ ...open1, [name]: false });
    }
  }
  const [searchInput, setSearchInput] = useState("");
  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      if (searchInput !== "") {
        history.push({
          search: searchInput,
        });
      } else {
        setSearchInput("");
        history.push({
          search: searchInput,
        });
      }
    }
  };

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

  const placeorderlistapi = async (id) => {
    axios
      .request({
        method: "GET",
        url: `${ApiConfig.dashboardSearch}?search=${id}`,

        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          setSearchResult(res.data.result.orderResult);
        } else {
          setSearchResult();
        }
      });
    // }
  };

  useEffect(() => {
    if (searchInput) {
    } else {
      setSearchResult();
    }
    return () => {};
  }, [searchInput]);

  useEffect(() => {
    searchTextRef.current.focus();
    if (
      location.pathname === "/searchprofile" &&
      location.search &&
      location.search.slice(1, location.search.length)
    ) {
      let text = location.search.slice(1, location.search.length);
      setSearchInput(text);
    }
  }, [location]);

  const displayDesktop = () => {
    return (
      <Container maxWidth="lg">
        <Toolbar className={toolbar}>
          {femmecubatorLogo}
          <Grid
            container
            item
            direction="row"
            justify="flex-end"
            alignItems="center"
            style={{ paddingLeft: "0px" }}
          >
            <div style={{ display: "flex" }} className={flexButton}>
              <FormControl
                variant="outlined"
                className={searcBox}
                style={{ display: "none" }}
              >
                <InputBase
                  placeholder="Search"
                  ref={searchTextRef}
                  autoFocus={true}
                  type="search"
                  onKeyDown={onKeyDown}
                  onChange={(e) => setSearchInput(e.target.value)}
                  id="outlined-adornment-weight"
                  startAdornment={
                    <InputAdornment position="start">
                      <CgSearch
                        style={{ fontSize: "25px", marginLeft: "10px" }}
                      />
                    </InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                />
              </FormControl>

              <Box style={{ display: "flex" }}>
                <IconButton onClick={() => setDialogOpen(true)}>
                  <SearchIcon />
                </IconButton>
              </Box>

              {/* here remove dark/light theme of website */}
              {/* <Box className="themeButton">
                {themeSeeting.settings.theme === "DARK" ? (
                  <IconButton
                    variant="contained"
                    color="primary"
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
                    onClick={() => {
                      changeTheme("DARK");
                    }}
                  >
                    <FaRegMoon />
                  </IconButton>
                )}
              </Box> */}

              {stackmenu}
            </div>
          </Grid>
        </Toolbar>
      </Container>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

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
            <img className={logoDrawer} src="images/footerlogo.png" alt="" />
            {stackmenu}
          </div>
        </Drawer>
        <div style={{ marginLeft: "20px" }}>{femmecubatorLogo}</div>
        <Grid container>
          <Grid item xs={10}>
            <Box className="displaySpacebetween">
              <IconButton onClick={() => setDialogOpen(true)}>
                <SearchIcon />
              </IconButton>

              {/* <Box className="themeButton">
                {themeSeeting.settings.theme === "DARK" ? (
                  <IconButton
                    variant="contained"
                    color="primary"
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
                    onClick={() => {
                      changeTheme("DARK");
                    }}
                  >
                    <FaRegMoon />
                  </IconButton>
                )}
              </Box> */}
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    );
  };

  const femmecubatorLogo = (
    <Box>
      <Link to="/">{/* <Logo className="logoImg" /> */}</Link>
    </Box>
  );
  const stackmenu = (
    <div>
      {user?.isLogin ? (
        <Button
          aria-label="delete"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick1}
          className={menuMobile1}
          size="small"
          color="primary"
        >
          <figure>
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
          <BsFillCaretDownFill
            style={{ fontSize: "16px", marginLeft: "8px" }}
          />
        </Button>
      ) : (
        <IconButton
          aria-label="delete"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={() => setUpdateMinSatkeOpen(true)}
          className={menuMobile1}
          size="small"
        >
          <Button
            variant="contained"
            size="large"
            color="primary"
            to="/conect-wallet"
            component={Link}
          >
            Connect
          </Button>
        </IconButton>
      )}

      <Box className={divstake}>
        <StyledMenu
          id="simple-menu"
          disableScrollLock={true}
          anchorEl={anchorEl1}
          keepMounted
          open={Boolean(anchorEl1)}
          onClose={handleClose4}
        >
          {/* {user?.kycStatusRes?.kycStatus !== "APPROVE" && user?.isAdmin && (
            <MenuItem
              onClick={() => {
                history.push("/become-creator");
              }}
            >
              Become a creator
            </MenuItem>
          )} */}
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
    </div>
  );

  return (
    <>
      {updateName && (
        <Dialog
          open={updateName}
          onClose={() => {
            setUpdateName(false);
          }}
          maxWidth="sm"
        ></Dialog>
      )}

      {updateMinSatkeOpen && (
        <Dialog
          open={updateMinSatkeOpen}
          onClose={() => {
            setUpdateMinSatkeOpen(false);
          }}
          maxWidth="sm"
        >
          <DialogContent>
            <ConnectWallet
              onClose={() => {
                setUpdateMinSatkeOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      )}

      <AppBar
        position={history.location.pathname !== "/" ? "relative" : "absolute"}
        elevation={0}
        style={{ backgroundColor: "#ccc0", border: "none" }}
      >
        <Box
          maxWidth={history.location.pathname !== "/" ? "lg" : "fixed"}
          className={containerHeight}
        >
          {mobileView ? displayMobile() : displayDesktop()}
        </Box>
      </AppBar>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose1}
      >
        <MenuItem>
          <Link to="/profile">My Profile</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/user">My NFT</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/resell-nft">Resell NFT</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/create-nft">Create NFT</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/notification">Notification</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/search">Search</Link>
        </MenuItem>
      </Menu>
      <Box>
        {dialogOpen && (
          <Paper>
            <Dialog
              fullWidth
              maxWidth="lg"
              className={classes.searchdiaogBox}
              style={{
                position: "absolute",
                top: "10%",
                // minHeight: "695px",
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
                <Container maxWidth="lg">
                  <Box className={classes.mainTextfieldBox}>
                    <TextField
                      placeholder="Search"
                      ref={searchTextRef}
                      autoFocus={true}
                      type="search"
                      fullWidth
                      variant="outlined"
                      onKeyDown={onKeyDown}
                      onChange={(e) => setSearchInput(e.target.value)}
                      id="outlined-adornment-weight"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton>
                              <CgSearch style={{ fontSize: "25px" }} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      aria-describedby="outlined-weight-helper-text"
                    />
                  </Box>
                  <Box>
                    <SearchResultBox />
                  </Box>
                </Container>
              </Box>
            </Dialog>
          </Paper>
        )}

        {walletPopup && (
          <Dialog
            open={walletPopup}
            onClose={() => setWalletPopup(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="lg"
            className={dailogOpen}
            style={{ borderRadius: "25px", padding: "10px" }}
          >
            <DialogContent
              style={{
                width: "500px",
                background: "#fff",
                borderRadius: "25px",
                padding: "10px !important",
              }}
            >
              <Box
                className={customizedButton1}
                style={{ display: "flex !important" }}
              >
                <IconButton
                  onClick={() => setWalletPopup(false)}
                  className={customizedButton}
                >
                  <GiCancel />
                </IconButton>
              </Box>
              <Box mb={2}>
                <Typography variant="h5">
                  We are required by law to verify content creators in our
                  platform due to the nature of our business. Please verify
                  below in order to become a creator.
                </Typography>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push("/become-creator")}
                >
                  Verify
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
        )}
      </Box>
    </>
  );
}
