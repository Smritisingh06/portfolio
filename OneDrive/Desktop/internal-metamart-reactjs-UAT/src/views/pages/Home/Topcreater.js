import React, { useState } from "react";
import {
  Avatar,
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
  Button,
  MenuItem,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Slider from "react-slick";
import { BiChevronDown } from "react-icons/bi";
import Menu from "@material-ui/core/Menu";
import { CategoryButtons, exploreData, RankingButtons } from "src/constants";
import FilterListIcon from "@material-ui/icons/FilterList";
const useStyles = makeStyles((theme) => ({
  topcreaterBox: {
    background: "#E7DDCE",
    paddingBottom: "80px",
    position: "relative",
    overflow: "hidden",
    zIndex: "2",
    [theme.breakpoints.only("xs")]: {
      paddingBottom: "60px",
    },
    "& h2": {
      color: "#000000",
      [theme.breakpoints.only("xs")]: {
        fontSize: "18px !important",
      },
    },
    "& .createrRightBox": {
      position: "absolute",
      right: "0",
    },
    "& .creatermainboxcard": {
      background: "#000000",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: "20px",
      padding: "15px",
      position: "relative",
      transition: "0.5s",
      margin: "10px",
      width: "calc(100% - 50px) !important",
      "& h5": {
        color: "#fff",
        whiteSpace: "pre",
      },

      "& p": {
        color: "#fff",
        whiteSpace: "pre",
      },
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0px 0px 9px #c91028",
      },
    },
    "& .avatarimg": {
      width: "94px",
      height: "82px",
      borderRadius: "20px",
    },
    "& .dotbox": {
      margin: "5px",
      width: "5px",
      height: "5px",
      borderRadius: "50%",
      background: "#000",
      border: "2px solid #fff",
    },
    "& .dotpositionBox": {
      display: "flex",
      position: "absolute",
      right: "21px",
      top: "50%",
      [theme.breakpoints.only("xs")]: {
        right: "5px",
        top: "45%",
      },
    },
    "& .createrfilterBox": {
      position: "relative",
      padding: "10px 0 10px",
    },
    "& .iconstylebox": {
      color: "#A81B2D",
      fontSize: "29px",
      padding: "0px 10px ",
      cursor: "pointer",
      [theme.breakpoints.down("sm")]: {
        fontSize: "15px",
        padding: "0px 5px ",
      },
    },
    "& .aboutContent": {
      maxWidth: "570px",
      marginBottom: "22px",
      [theme.breakpoints.only("xs")]: {
        maxWidth: "100%",
      },
    },
  },
}));

const rickdata = [
  {
    name: "Rick Storms",
  },
  {
    name: "Rick Storms",
  },
  {
    name: "Rick Storms",
  },
  {
    name: "Rick Storms",
  },
  {
    name: "Rick Storms",
  },
  {
    name: "Rick Storms",
  },
  {
    name: "Rick Storms",
  },
  {
    name: "Rick Storms",
  },
  {
    name: "Rick Storms",
  },
  {
    name: "Rick Storms",
  },
  {
    name: "Rick Storms",
  },
  {
    name: "Rick Storms",
  },
];

export default function Topcreater() {
  const classes = useStyles();
  const [userType, setUserType] = useState("Musicians");
  const [filterName, setFilterName] = useState("Daily");
  const [selectedCollectionIds, setSelectedCollectionIds] = useState();
  const [selectedCategoryNames, setSelectedCategoryNames] = useState();
  const [selectRankingDays, setSelectRankingDays] = useState();
  const [collectionList, setCollectionList] = useState([]);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorCol, setAnchorCol] = React.useState(null);
  const [recentCol, setRecentCol] = React.useState(null);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl1(null);
  };
  const settings = {
    // className: "center",
    // centerMode: true,
    // infinite: true,
    // centerPadding: "10px",
    // slidesToShow: 3,
    // // speed: 500,
    // rows: 2,
    // slidesPerRow: 2
    slidesToShow: 3,
    slidesToScroll: 3,
    rows: 3,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          centerPadding: "20px",
          autoplay: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          centerPadding: "20px",
          autoplay: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          centerPadding: "20px",
          autoplay: true,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          centerPadding: "20px",
          autoplay: true,
          arrows: false,
          dots: true,
        },
      },
    ],
  };
  return (
    <Box className={classes.topcreaterBox}>
      <Container maxWidth="fixed">
        {/* <Box textAlign="left" mb={4}>
          <Typography
            variant="h2"
            className="nicoMoji"
            style={{
              position: "relative",
              zIndex: "2",
            }}
          >
            Top Creators
          </Typography>
        </Box> */}
        <Box className="displayStart createrfilterBox">
          <Box className="displayEnd">
            {/* COLLECTION */}

            <Typography variant="h2" className="nicoMoji">
              Top{" "}
              <span onClick={handleClick1} style={{ cursor: "pointer" }}>
                {userType === "Musicians"
                  ? "Musicians"
                  : userType === "Artists"
                  ? "Artists"
                  : null}
                <KeyboardArrowDownIcon className="iconstylebox" />
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
                    setUserType("Musicians");
                    handleClose();
                  }}
                >
                  Musicians
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setUserType("Artists");
                    handleClose();
                  }}
                >
                  Artists
                </MenuItem>
              </Menu>
            </Typography>

            {/* <Menu
              id="simple-menu"
              anchorEl={anchorEl1}
              keepMounted
              open={Boolean(anchorEl1)}
              onClose={() => setAnchorEl1(null)}
            >
              <MenuItem
                onClick={() => {
                  setAnchorEl1(null);
                  setSelectedCategoryNames();
                }}
              >

              </MenuItem>
              {CategoryButtons.map((data, i) => {
                return (
                  <MenuItem
                    onClick={() => {
                      setAnchorEl1(null);
                      setSelectedCategoryNames(data);
                    }}
                    key={i}
                  >
                    {data.name}
                  </MenuItem>
                );
              })}
            </Menu> */}

            {/* <Button
              className="CreaterfilterBtn"
              onClick={(event) => setAnchorEl1(event.currentTarget)}
            >
              <KeyboardArrowDownIcon style={{ color: "rgb(168, 27, 45)", fontSize: "29px" }} />
              {selectedCategoryNames
                ? selectedCategoryNames.name.toString()
                : ""}
            </Button> */}

            <Typography variant="h2" className="ubuntu">
              <span style={{ fontWeight: "300" }}>In </span>
              <span onClick={handleClick} style={{ cursor: "pointer" }}>
                {filterName === "Daily"
                  ? "1 day"
                  : filterName === "Weekly"
                  ? "7 day"
                  : "30 day"}{" "}
                <KeyboardArrowDownIcon className="iconstylebox" />
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
            {/* <Button
              className="CreaterfilterBtn"
              onClick={(event) => setAnchorEl1(event.currentTarget)}
            >
              <KeyboardArrowDownIcon style={{ color: "rgb(168, 27, 45)", fontSize: "29px" }} />
              {selectedCategoryNames
                ? selectedCategoryNames.name.toString()
                : ""}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl1}
              keepMounted
              open={Boolean(anchorEl1)}
              onClose={() => setAnchorEl1(null)}
            >
              <MenuItem
                onClick={() => {
                  setAnchorEl1(null);
                  setSelectedCategoryNames();
                }}
              >

              </MenuItem>
              {CategoryButtons.map((data, i) => {
                return (
                  <MenuItem
                    onClick={() => {
                      setAnchorEl1(null);
                      setSelectedCategoryNames(data);
                    }}
                    key={i}
                  >
                    {data.name}
                  </MenuItem>
                );
              })}
            </Menu> */}
          </Box>
        </Box>
        <Box>
          <Typography variant="body1" className="ubuntu aboutContent">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
          </Typography>
        </Box>

        <Slider {...settings} className="slickbottomslider">
          {rickdata.map((value) => (
            <Box className="creatermainboxcard" style={{ width: "100%" }}>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Box display="flex" alignItems="center">
                  <Avatar className="avatarimg" src="images/launchavatar.png" />
                  <Box ml={2}>
                    <Typography variant="h5" className="dmMono">
                      {value.name}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={1}>
                      <img src="images/tokken1.png" alt="image" width="25px" />
                      <Box ml={1}>
                        <Typography variant="body2">19,400.50 ETH</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Box>
          ))}
        </Slider>
      </Container>
    </Box>
  );
}
