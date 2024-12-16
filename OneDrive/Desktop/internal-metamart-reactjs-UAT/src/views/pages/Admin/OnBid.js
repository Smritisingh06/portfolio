import { Box, Grid } from "@material-ui/core";
import React from "react";
import NFTCard from "src/component/NFTCard";

const nftList = [
  {
    name: "gyanish",
  },
];
function OnBid() {
  return (
    <Box>
      <Box>
        {nftList &&
          nftList.map((data, index, type) => {
            return (
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <NFTCard data={data} type="creator" index={index} />
              </Grid>
            );
          })}
      </Box>
    </Box>
  );
}

export default OnBid;
