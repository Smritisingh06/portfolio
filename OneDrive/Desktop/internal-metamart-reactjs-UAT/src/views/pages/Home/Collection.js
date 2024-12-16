import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  makeStyles,
  Typography,
  Container,
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import CollectionHome1 from "src/component/CollectionHome1";
import Apiconfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import Slider from "react-slick";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataNotFound from "src/component/DataNotFound";
const useStyles = makeStyles((theme) => ({
  collectionBox: {
    paddingTop: "40px",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0 0",
    },
    "& .collectiontextBox": {},
  },
}));

function Collection() {
  const classes = useStyles();
  const settings = {
    slidesToShow: 2,
    slidesToScroll: 2,
    className: "recomended",
    centerPadding: "90px",
    autoplaySpeed: 2000,
    centerMode: false,
    infinite: true,
    rows: 2,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          centerPadding: "160px",
          // autoplay: true,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          centerPadding: "100px",
          // autoplay: true,
        },
      },
      {
        breakpoint: 1063,
        settings: {
          slidesToShow: 2,
          centerPadding: "20px",
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
          // autoplay: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          centerPadding: "20px",
          autoplay: true,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          centerPadding: "20px",
          autoplay: false,
          arrows: false,
          dots: true,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [hotCollection, setHotCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const hotCollectionList = async () => {
    try {
      const res = await axios.get(Apiconfig.hotCollections);
      if (res.data.statusCode === 200) {
        setHotCollection(res.data.result.docs);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    hotCollectionList();
    setHotCollection();
  }, []);
  return (
    <>
      <Box className={classes.collectionBox}>
        <Container maxWidth="lg">
          <Box className="collectiontextBox displaySpacebetween" pb={2}>
            <Typography variant="h2" color="primary">
              Hot Collections
            </Typography>
          </Box>

          <Box>
            {isLoading ? (
              <Box className="albumboxcard" style={{ width: "100%" }}>
                <ButtonCircularProgress />
              </Box>
            ) : (
              <>
                <Grid container>
                  {hotCollection && hotCollection.length < 7 && (
                    <>
                      {hotCollection &&
                        hotCollection?.map((data, index) => {
                          return (
                            <Grid item md={6} lg={4} sm={6} xs={12}>
                              <Box
                                className="albumboxcard"
                                style={{ width: "100%" }}
                              >
                                <CollectionHome1
                                  type="card"
                                  data={data}
                                  key={index}
                                />
                              </Box>
                            </Grid>
                          );
                        })}
                    </>
                  )}
                </Grid>
                {hotCollection && hotCollection.length >= 7 && (
                  <Slider {...settings} className="albumslickbottomslider">
                    {hotCollection &&
                      hotCollection?.map((data, index) => {
                        return (
                          <Box
                            className="albumboxcard"
                            style={{ width: "100%" }}
                          >
                            <CollectionHome1
                              type="card"
                              data={data}
                              key={index}
                            />
                          </Box>
                        );
                      })}
                  </Slider>
                )}
              </>
            )}
            {hotCollection && hotCollection.length > 0 && (
              <Container
                style={{ marginTop: "20px" }}
                maxWidth="lg"
                align="right"
              >
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  component={Link}
                  to="/hot-collection"
                  className={classes.buttonright}
                >
                  View More
                </Button>
              </Container>
            )}
            {((hotCollection && hotCollection.length === 0) ||
              typeof hotCollection === "undefined") && <DataNotFound />}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Collection;
