import React, { useState, useEffect } from "react";
import { Box, Container, makeStyles, Typography } from "@material-ui/core";
import Slider from "react-slick";
import Apiconfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataNotFound from "src/component/DataNotFound";
import AuctionCard from "src/component/AuctionCard";

const useStyles = makeStyles((theme) => ({
  AuctionCardBox: {
    paddingTop: "40px",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0",
    },
  },
}));

function Auction() {
  const classes = useStyles();
  const [auctionList, setAuctionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
  const getAuctionListHandler = async () => {
    try {
      const res = await axios.get(Apiconfig.hotBid);
      if (res.data.statusCode == 200) {
        const filetrnftdata = res.data.result.docs.filter((data) => {
          return data?.orderId !== null && data?.orderId?.sellStatus !== "SOLD";
        });
        setAuctionList(filetrnftdata);

        setIsLoading(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAuctionListHandler();
  }, []);
  return (
    <>
      <Box className={classes.AuctionCardBox}>
        <Container maxWidth="lg">
          <Typography variant="h2" color="primary">
            Hot Bids
          </Typography>
          <Box>
            {isLoading && <ButtonCircularProgress />}
            {!isLoading && auctionList && auctionList.length === 0 && (
              <DataNotFound />
            )}
          </Box>
          <Box mt={4}>
            {auctionList && auctionList.length >= 1 && (
              <Slider
                {...settings}
                style={{ width: "100%" }}
                className="topslickslider"
              >
                {auctionList &&
                  auctionList.map((data, index) => {
                    return (
                      <AuctionCard
                        data={data}
                        index={index}
                        type="auction"
                        callbackFun={getAuctionListHandler}
                      />
                    );
                  })}
              </Slider>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Auction;
