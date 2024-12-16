import React, { Component } from "react";
import Carousel from "react-spring-3d-carousel";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import uuidv4 from "uuid";
import { Box, IconButton } from "@material-ui/core";
import { config } from "react-spring";

class MyCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goToSlide: 0,
      offsetRadius: 2,
      showNavigation: true,
      config: config.gentle,
    };
  }
  slides = [
    {
      key: uuidv4(),

      content: <img src="images/banner/orangeNft.png" alt="" />,
    },
    {
      key: uuidv4(),
      content: <img src="images/banner/blueNft.png" alt="" />,
    },
    {
      key: uuidv4(),
      content: <img src="images/banner/whiteNFT.png" alt="" />,
    },
    {
      key: uuidv4(),
      content: <img src="images/banner/blackNft.png" alt="" />,
    },
    {
      key: uuidv4(),
      content: <img src="images/banner/greenNft.png" alt="" />,
    },
    {
      key: uuidv4(),
      content: <img src="images/banner/yellowNft.png" alt="" />,
    },
    {
      key: uuidv4(),
      content: <img src="images/banner/blueNft.png" alt="" />,
    },
    {
      key: uuidv4(),
      content: <img src="images/banner/pinkNft.png" alt="" />,
    },
  ].map((slide, index) => {
    return { ...slide, onClick: () => this.setState({ goToSlide: index }) };
  });

  render() {
    // const classes = useStyles();
    return (
      <div className="bannercarousal">
        <Carousel
          // className="topslickslider"
          className="sliderBannerBox"
          slides={this.slides}
          goToSlide={this.state.goToSlide}
          offsetRadius="10"
          animationConfig={config.gentle}
        />
        <div
          style={{
            margin: "0 auto",
            marginTop: "20px",
            width: "230px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            className="boxButton"
            onClick={() => {
              this.setState({ goToSlide: this.state.goToSlide - 1 });
            }}
            style={{ fontSize: "25px" }}
          >
            <BsArrowLeft />
          </IconButton>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <IconButton
            className="boxButton"
            onClick={() => {
              this.setState({ goToSlide: this.state.goToSlide + 1 });
            }}
            style={{ fontSize: "25px" }}
          >
            <BsArrowRight />
          </IconButton>
        </div>
      </div>
    );
  }
}
export default MyCarousel;
