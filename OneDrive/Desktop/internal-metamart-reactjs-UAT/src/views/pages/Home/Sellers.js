import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import SettingsContext from "src/context/SettingsContext";

import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

import SellersCard from "src/component/SellersCard";
import { BiChevronDown } from "react-icons/bi";
import axios from "axios";
import Apiconfig from "src/ApiConfig/ApiConfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataNotFound from "src/component/DataNotFound";
const useStyles = makeStyles((theme) => ({
  boxSellerborder: {
    position: "relative",
    "&::after": {
      left: "0",
      width: "100%",
      top: "-2px",
      height: "3px",
      content: '" "',
      zIndex: "1",
      position: "absolute",
      transition: "all 0.3s ease-in-out",
    },
    "&::before": {
      left: "0",
      width: "100%",
      bottom: "0px",
      height: "8px",
      content: '" "',
      zIndex: "1",
      position: "absolute",
      transition: "all 0.3s ease-in-out",
    },
  },

  boxSellerborderlight: {
    position: "relative",
    "&::after": {
      left: "0",
      width: "100%",
      top: "-5px",
      height: "6px",
      content: '" "',
      zIndex: "1",
      position: "absolute",
      transition: "all 0.3s ease-in-out",
    },
    "&::before": {
      left: "0",
      width: "100%",
      bottom: "0px",
      height: "14px",
      content: '" "',
      zIndex: "1",
      position: "absolute",
      transition: "all 0.3s ease-in-out",
    },
  },
  SellersBox: {
    paddingTop: "60px",
    height: "auto",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0 20px",
    },
    "& .heading": {
      display: "flex",
      alignItems: "center",
      "& h1": {
        marginLeft: "15px",
        [theme.breakpoints.down("xs")]: {
          fontSize: "16px !important",
          marginLeft: "0px",
        },
      },
    },
    "& .selectionmenuBox": {
      "& h2": {
        color: theme.palette.primary.main,
        [theme.breakpoints.only("xs")]: {
          fontSize: "12px !important",
        },
      },
    },
  },
}));

function Sellers() {
  const classes = useStyles();
  const themeSeeting = useContext(SettingsContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [filterName, setFilterName] = useState("Monthly");
  const [userType, setUserType] = useState("Sellers");

  const [seller, setSeller] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [pages, setpages] = useState(1);
  const [numpages, setNumpages] = useState(1);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl1(null);
  };
  const topSeller = async () => {
    try {
      const res = await axios.get(`${Apiconfig.topSellers}?page=${pages}`, {
        params: {
          type: filterName,
          limit: 12,
        },
      });
      if (res.data.statusCode === 200) {
        setSeller(res.data.result.docs);
        setNumpages(res.data.result.pages);

        setIsLoading(false);
      }
    } catch (error) {
      console.log("ERRROR", error);
      setIsLoading(false);
    }
  };
  const topBuyers = async () => {
    try {
      setIsLoading(false);

      const res = await axios.get(`${Apiconfig.topBuyers}?page=${pages}`, {
        params: {
          type: filterName,
          limit: 12,
        },
      });
      if (res.data.statusCode === 200) {
        setSeller(res.data.result.docs);
        setNumpages(res.data.result.pages);

        setIsLoading(false);
      }
    } catch (error) {
      console.log("ERRROR", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (
      userType === "Sellers" &&
      (filterName === "Daily" ||
        filterName === "Weekly" ||
        filterName === "Monthly")
    ) {
      topSeller();
    }
  }, [filterName, pages]);
  useEffect(() => {
    if (
      userType === "Buyers" &&
      (filterName === "Daily" ||
        filterName === "Weekly" ||
        filterName === "Monthly")
    ) {
      topBuyers();
    }
  }, [userType, filterName]);

  useEffect(() => {
    if (userType === "Buyers") {
      topBuyers();
    }
  }, [userType, pages]);
  useEffect(() => {
    setSeller();
  }, []);

  useEffect(() => {
    if (userType === "Sellers") {
      topSeller();
    }
  }, [userType === "Sellers", pages]);
  useEffect(() => {
    if (userType === "Buyers") {
      setSeller();
    }
  }, [userType === "Buyers"]);

  return (
    <>
      <Box className={classes.SellersBox}>
        <Container maxWidth="lg">
          <Box>
            <Box className="heading displaySpacebetween">
              <Box className="selectionmenuBox">
                <Typography variant="h2" color="primary">
                  Top{" "}
                  <span onClick={handleClick1} style={{ cursor: "pointer" }}>
                    {userType === "Sellers"
                      ? "Sellers"
                      : userType === "Buyers"
                      ? "Buyers"
                      : null}
                    <BiChevronDown
                      style={{
                        // color: "#0D8CCD",
                        paddingTop: "10px",
                        cursor: "pointer",
                      }}
                    />
                  </span>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl1}
                    keepMounted
                    open={Boolean(anchorEl1)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        setUserType("Buyers");
                        handleClose();
                      }}
                    >
                      Buyers
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setUserType("Sellers");
                        handleClose();
                      }}
                    >
                      Sellers
                    </MenuItem>
                  </Menu>
                  in{" "}
                  <span
                    // onClick={handleClick}
                    style={{ fontWeight: "700" }}
                  >
                    {filterName === "Daily"
                      ? "1 day"
                      : filterName === "Weekly"
                      ? "7 day"
                      : "30 day"}{" "}
                    {/* <BiChevronDown
                      style={{
                        paddingTop: "10px",
                        cursor: "pointer",
                      }}
                    />*/}
                  </span>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        setFilterName("Daily");
                        handleClose();
                      }}
                    >
                      <span>Today</span>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        setFilterName("Weekly");
                      }}
                    >
                      <span>Weekly</span>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        setFilterName("Monthly");
                      }}
                    >
                      <span>Monthly</span>
                    </MenuItem>
                  </Menu>
                </Typography>
              </Box>
              <Box>
                <IconButton
                  className="sellerPaginationButton"
                  disabled={parseInt(pages) === 1}
                  onClick={() => {
                    if (pages > 1) {
                      setpages(parseInt(pages) - 1);
                    }
                  }}
                >
                  <MdKeyboardArrowLeft />
                </IconButton>{" "}
                <IconButton
                  className="sellerPaginationButton"
                  disabled={pages >= numpages}
                  onClick={() => {
                    if (pages <= numpages) {
                      setpages(parseInt(pages) + 1);
                    }
                  }}
                  style={{ marginLeft: "5px" }}
                >
                  <MdKeyboardArrowRight />
                </IconButton>
              </Box>
            </Box>
          </Box>

          <Box mt={2} mb={2}>
            <Box
              className={
                themeSeeting.settings.theme === "DARK"
                  ? `${classes.boxSellerborder}`
                  : `${classes.boxSellerborderlight}`
              }
            >
              <Box>
                <Grid container spacing={1}>
                  {isLoading ? (
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <ButtonCircularProgress />
                    </Box>
                  ) : (
                    <>
                      {seller &&
                        seller?.map((data, i) => {
                          return (
                            <Grid item xs={6} sm={6} md={4} lg={3}>
                              <Box style={{ padding: "1px" }}>
                                <SellersCard
                                  type="card"
                                  data={data}
                                  key={i}
                                  userType={userType}
                                />
                              </Box>
                            </Grid>
                          );
                        })}
                    </>
                  )}

                  {!isLoading &&
                    (seller?.length === 0 || typeof seller === "undefined") && (
                      <DataNotFound />
                    )}
                </Grid>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Sellers;
