import React from "react";
import { Box, Typography, Container, Button } from "@material-ui/core";
import Slider from "react-slick";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory, Link } from "react-router-dom";

const PreviousBtn = (props) => {
  console.log(props);
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIcon style={{ color: "gray", fontSize: "30px" }} />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIcon style={{ color: "gray", fontSize: "30px" }} />
    </div>
  );
};

const photos = [
  {
    name: "photo1",
    url: "images/Mint/artwork_2.png",
    text1: "dfghjk",
  },
  {
    name: "photo1",
    url: "images/Mint/artwork_1.png",
    text1: "vbvvn",
  },
  {
    name: "photo1",
    url: "images/Mint/artwork_2.png",
    text1: "mhhjh",
  },
  {
    name: "photo1",
    url: "images/Mint/artwork_2.png",
    text1: "vhhvv",
  },
  {
    name: "photo1",
    url: "images/Mint/artwork_2.png",
    text1: "hgf",
  },
  {
    name: "photo1",
    url: "images/Mint/artwork_1.png",
    text1: "dfn",
  },
  {
    name: "photo1",
    url: "images/Mint/artwork_2.png",
    text1: "dfn",
  },
];

const useStyles = makeStyles((theme) => ({
  mainboxhome: {
    padding: "0 12px",
    backgrColor: "rgba(0, 0, 0,0)",
    zIndex: "99",
    position: "relative",
    width: "calc(100% - 18px) !important",
    margin: "0 auto",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      width: "calc(100% - 28px) !important",
    },
    "& .slick-slide": {
      textAlign: "center",
    },
    "& .slick-list": {
      padding: "0 20% 0 0 !important",
    },
  },

  mainbox: {
    padding: " 70px 0px 30px",
    backgrColor: "#202020",
    zIndex: "99",
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      padding: "36px 0px 30px",
    },
  },
  artwork: {
    position: "relative",
    zIndex: "9",
    "& h3": {
      fontWeight: 700,
      fontSize: "30px",
      color: "#262424",
      display: "flex",
      alignItems: "center",
      "& img": {
        marginRight: "20px",
        width: "40px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
  },
  sliderBox: {
    [theme.breakpoints.down("xs")]: {
      padding: "0 15px",
    },
  },
  bannerImg: {
    display: "flex",
    position: "relative",
    // overflow: " hidden",

    "& figure": {
      margin: "0",
      width: "100%",
      overflow: "hidden",
      marginBottom: "15px",
      borderRadius: "10px",
      height: "auto",
      "&:hover": {
        "& img": {
          transform: "scale(1.3)",
        },
      },
      "& img": {
        width: "100%",
        height: "100%",
        margin: "0",
        transform: "scale(1.1)",
        transition: "0.5s",
      },
    },
  },
}));
function Welcome() {
  const classes = useStyles();
  const history = useHistory();

  const settings = {
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    className: "recomended",
    centerPadding: "90px",
    autoplay: true,
    infinite: true,
    autoplaySpeed: 2000,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          centerMode: true,
          centerPadding: "20px",
          autoplay: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          centerMode: true,
          centerPadding: "20px",
          autoplay: true,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "60px",
          autoplay: true,
        },
      },
    ],
  };
  return (
    <Box className={`${classes.mainbox} artwork`}>
      <Container>
        <Box className={classes.artwork}>
          <Typography variant="h2" color="primary">
            Artworks
          </Typography>
        </Box>
      </Container>
      {/* <Video />  */}
      <Box className={classes.sliderBox}>
        <Slider
          {...settings}
          prevArrow={<PreviousBtn />}
          nextArrow={<NextBtn />}
        >
          {photos.map((photos) => {
            return (
              <Box className={classes.mainboxhome}>
                <Box className={`${classes.banner} active`} width="100%">
                  <img
                    width="100%"
                    src={photos.url}
                    alt=""
                    style={{ cursore: "pointer" }}
                  />
                </Box>
              </Box>
            );
          })}
        </Slider>
      </Box>

      <Box align="center">
        <Link to="/my-mints" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.buttonright}
          >
            My Mint
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default Welcome;
