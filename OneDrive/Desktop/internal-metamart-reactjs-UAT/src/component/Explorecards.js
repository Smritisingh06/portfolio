import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Grid,
  makeStyles,
  Typography,
  Button,
  withStyles,
} from "@material-ui/core";
import { AnimationOnScroll } from "react-animation-on-scroll";
import LinearProgress from "@material-ui/core/LinearProgress";
import Slider from "react-slick";
import axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";

import SliderCard from "./SliderCards";

const useStyles = makeStyles((theme) => ({
  bannerBox: {
    // background: "#0D1826",
    position: "relative",
    padding: "90px 0",
    overflow: "hidden",

    [theme.breakpoints.down("md")]: {
      borderTop: "5px solid transparent",
    },
    [theme.breakpoints.only("xs")]: {
      padding: "48px 0 20px",
    },
  },
  Box: {
    background: "#00020B",
    boxShadow: "0px 4px 4px rgba(4, 253, 163, 4)",
    borderRadius: "30px",
    marginTop: "50px",
    "& h5": {
      fontWeight: "500",
      fontSize: "20px",
      lineHeight: "24px",
      color: "#FFFFFF",
      paddingLeft: "70px",
      paddingBottom: "10px",
    },
  },
  Eth: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "20px",
    paddingBottom: "20px",
    "& h4": {
      fontFamily: "Inter', sans-serif",
      fontWeight: "300",
      color: "#fff",
    },
  },
  button: {
    fontFamily: "Inter', sans-serif'",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "17px",
    color: "#FFFFFF",
    backgroundColor: "#1EB808",
    borderRadius: "8px",
  },
  txt: {
    "& h5": {
      fontFamily: "Inter', sans-serif'",
      fontWeight: "500",
      lineHeight: "24px",
      color: "#FFFFFF",
    },
  },
  Featuring: {
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    "& h2": {
      fontFamily: "'ClashDisplay-Extralight'",

      "& span": { fontFamily: "'ClashDisplay-Medium'" },

      marginBottom: "35px",
      textAlign: "center",
      [theme.breakpoints.down("md")]: {
        fontSize: "26px",
      },
      [theme.breakpoints.only("xs")]: {
        fontSize: "20px",
      },
    },
    "& .icon1": {
      height: "20px",
      paddingRight: "20px",
      [theme.breakpoints.only("xs")]: {
        width: "50px",
        height: "8px",
        paddingRight: "7px",
      },
    },
    "& .icon2": {
      height: "20px",
      paddingLeft: "20px",
      [theme.breakpoints.only("xs")]: {
        width: "50px",
        height: "8px",
        paddingLeft: "7px",
      },
    },
  },
}));

export default function Bannner1() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [categorylist, setCategorylist] = useState([]);
  let array = [];
  const listCategoryApi = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.listCategory,
      });
      if (res.data.statusCode === 200) {
        let array = [];

        setCategorylist(array);
        const datacategoryfilter = res.data.result.docs.filter((data) => {
          return data?.categoryTitle == "web 3 identities";
        });
        {
          datacategoryfilter[0] != undefined &&
            array.push(datacategoryfilter[0]);
        }
        const datacategoryfilter1 = res.data.result.docs.filter((data) => {
          return data?.categoryTitle == "solar passive income";
        });
        {
          datacategoryfilter1[0] != undefined &&
            array.push(datacategoryfilter1[0]);
        }
        const datacategoryfilter2 = res.data.result.docs.filter((data) => {
          return data?.categoryTitle == "nft event ticketing";
        });
        {
          datacategoryfilter2[0] != undefined &&
            array.push(datacategoryfilter2[0]);
        }
        const datacategoryfilter3 = res.data.result.docs.filter((data) => {
          return data?.categoryTitle == "gaming";
        });
        {
          datacategoryfilter3[0] != undefined &&
            array.push(datacategoryfilter3[0]);
        }
        const datacategoryfilter4 = res.data.result.docs.filter((data) => {
          return data?.categoryTitle == "memberships nft";
        });
        {
          datacategoryfilter4[0] != undefined &&
            array.push(datacategoryfilter4[0]);
        }
        const datacategoryfilter5 = res.data.result.docs.filter((data) => {
          return data?.categoryTitle == "art & collectibles";
        });
        {
          datacategoryfilter5[0] != undefined &&
            array.push(datacategoryfilter5[0]);
        }
        const datacategoryfilter6 = res.data.result.docs.filter((data) => {
          return data?.categoryTitle == "private documents";
        });
        {
          datacategoryfilter6[0] != undefined &&
            array.push(datacategoryfilter6[0]);
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    listCategoryApi();
  }, []);

  const settings = {
    dots: false,
    slidesToShow: 4,
    // slidesToScroll: 1,
    arrows: true,
    centerMode: false,
    centerPadding: "0px",
    className: "recomended",
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
          arrows: true,
          centerMode: false,
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          arrows: true,
          centerMode: false,
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          arrows: true,
          centerMode: false,
          centerPadding: "50px",
        },
      },

      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          arrows: true,
          centerMode: false,
          centerPadding: "10px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          arrows: true,
          centerMode: false,
          centerPadding: "10px",
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          arrows: true,
          centerPadding: "10px",
        },
      },
    ],
  };

  return (
    <Box className={classes.bannerBox}>
      <Container>
        <Box className={classes.Featuring}>
          <AnimationOnScroll animateIn="animate__bounceInLeft">
            <Typography variant="h2" color="primary">
              Browse by <span>category</span>
            </Typography>
          </AnimationOnScroll>
        </Box>

        <Grid container spacing={2}>
          {categorylist && categorylist.length >= 4 && (
            <Slider
              {...settings}
              className="topslickslider"
              style={{ width: "100%", position: "relative" }}
            >
              {categorylist &&
                categorylist?.map((data, i) => {
                  return (
                    <Grid item md={12} key={i}>
                      <SliderCard data={data} />
                    </Grid>
                  );
                })}
            </Slider>
          )}
          {categorylist && categorylist.length < 4 && (
            <>
              {categorylist &&
                categorylist.map((data, i) => {
                  return (
                    <Grid item md={3} lg={3} sm={3} xs={12}>
                      <SliderCard data={data} key={i} />
                    </Grid>
                  );
                })}
            </>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
