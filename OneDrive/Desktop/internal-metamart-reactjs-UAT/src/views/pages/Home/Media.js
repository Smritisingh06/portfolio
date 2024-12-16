import React, { useState, useEffect } from "react";
import { Box, Container, Typography, makeStyles } from "@material-ui/core";
import DataNotFound from "src/component/DataNotFound";
import Apiconfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import MediaCard from "src/component/MediaCard";
import Slider from "react-slick";
const useStyles = makeStyles((theme) => ({
  mediaSection: {
    paddingTop: "50px",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "5px",
    },
    "& .mediatextBox": {
      "& h1": {
        fontSize: "50px ",
        fontFamily: "'ClashDisplay-Extralight'",
        "& span": { fontFamily: "'ClashDisplay-Medium'" },
        [theme.breakpoints.down("md")]: {
          fontSize: "40px",
        },
      },
    },
  },
}));

export default function BestSeller(props) {
  const classes = useStyles();
  const [mediaList, setMediaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data } = props;
  const settings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: "0px",
    arrows: true,
    className: "recomended",
    autoplay: true,
    autoplaySpeed: 3000,

    infinite: false,

    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
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
          autoplay: false,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          centerPadding: "20px",
          autoplay: false,
        },
      },
    ],
  };

  const getMedaListHandler = async () => {
    try {
      const res = await axios.get(Apiconfig.pressMediaList);
      if (res.data.statusCode == 200) {
        setMediaList(res.data.result.reverse());
        setIsLoading(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMedaListHandler();
  }, []);
  return (
    <Box className={classes.mediaSection}>
      <Container maxWidth="lg">
        <Box className="mediatextBox" align="left">
          <Typography variant="h2" color="primary">
            Press & Media
          </Typography>
        </Box>
        <Box>
          {isLoading && <ButtonCircularProgress />}
          {!isLoading && mediaList && mediaList.length === 0 && (
            <DataNotFound />
          )}
        </Box>
        <Box mt={"20px"}>
          {mediaList && mediaList.length >= 1 && (
            <Slider
              {...settings}
              style={{ width: "100%" }}
              className="topslickslider"
            >
              {mediaList &&
                mediaList.map((data, index) => {
                  return (
                    <Box key={index}>
                      <MediaCard data={data} index={index} type="timing" />
                    </Box>
                  );
                })}
            </Slider>
          )}
        </Box>
      </Container>
    </Box>
  );
}
