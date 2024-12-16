import React, { useRef } from "react";
import { Box } from "@material-ui/core";
import Page from "src/component/Page";
import Mint from "./Mint";
import Artwork from "./Artwork";
import About from "./About";

function Home(props) {
  const refs = {
    aboutUs: useRef(null),
    roadMap: useRef(null),
    road: useRef(null),
    tokenomics: useRef(null),

    how: useRef(null),
  };
  const onButtonClick = (abc) => {
    window.scrollTo({
      top: refs[abc].current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <Page title="Marketplace | NftTokenABI">
      <Box>
        <Mint />
        <div id="section2">
          <About />
        </div>
        <Artwork />
      </Box>
    </Page>
  );
}

export default Home;
