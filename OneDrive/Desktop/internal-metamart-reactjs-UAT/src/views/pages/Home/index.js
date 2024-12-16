import React from "react";
import { Box } from "@material-ui/core";
import Page from "src/component/Page";
const Banner = React.lazy(() => import("src/views/pages/Home/Banner"));
const Auction = React.lazy(() => import("src/views/pages/Home/Auction"));
const Collection = React.lazy(() => import("src/views/pages/Home/Collection"));
const Explore = React.lazy(() => import("src/views/pages/Home/Explore"));
const Sellers = React.lazy(() => import("src/views/pages/Home/Sellers"));
const Media = React.lazy(() => import("src/views/pages/Home/Media"));
const Faq = React.lazy(() => import("src/views/pages/FAQs/Index"));
const Createyourbrand = React.lazy(() =>
  import("src/views/pages/Home/Createyourbrand")
);

function Home() {
  return (
    <Page title="MetaMart">
      <Box>
        <Banner />
        <Createyourbrand />
        <Explore />
        <Collection />
        <Sellers />
        <Auction />
        <Media />
        <div id="section1">
          <Faq />
        </div>
      </Box>
    </Page>
  );
}

export default Home;
