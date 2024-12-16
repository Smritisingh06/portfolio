import React from "react";
import { Box, Grid } from "@material-ui/core";
import ExploreCard from "src/component/ExploreCard";
import DataNotFound from "src/component/DataNotFound";

export const exploreData = [
  {
    user: "@Alex",
    likes: "152",
    time: "8h : 15m : 25s left",
    stock: "4 in stock",
    text3: "From 1.35 ETH 11/Bid 1.1 w",
    image: "images/Explore/Explore1.png",
    name: "Skyblue Creator",
    price: "0.004 ETH",
  },
  {
    user: "@Alex",
    likes: "152",
    time: "8h : 15m : 25s left",
    stock: "4 in stock",
    text3: "From 1.35 ETH 11/Bid 1.1 w",
    image: "images/Explore/Explore2.png",
    name: "Skyblue Creator",
    price: "0.004 ETH",
  },
  {
    user: "@Alex",
    likes: "152",
    time: "8h : 15m : 25s left",
    stock: "4 in stock",
    text3: "From 1.35 ETH 11/Bid 1.1 w",
    image: "images/Explore/Explore3.png",
    name: "Skyblue Creator",
    price: "0.004 ETH",
  },
];
const Owned = (props) => {
  const { onOwnedCount } = props;

  return (
    <Box>
      <Grid container spacing={2}>
        {onOwnedCount &&
          onOwnedCount.map((data, index, type) => {
            return (
              <Grid item lg={3} md={4} sm={6} xs={6}>
                <ExploreCard data={data} type="creator" index={index} />
              </Grid>
            );
          })}
        {onOwnedCount && onOwnedCount.length === 0 && <DataNotFound />}
      </Grid>
    </Box>
  );
};
export default Owned;
