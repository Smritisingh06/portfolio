import { Box, Grid } from "@material-ui/core";
import React from "react";
import DataNotFound from "src/component/DataNotFound";
import ExploreCard from "src/component/ExploreCard";

export default function TotalNft({ nftList, callbackFun }) {
  return (
    <Box>
      <Grid container spacing={3}>
        {nftList &&
          nftList.map((data, index, type) => {
            return (
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <ExploreCard
                  data={data}
                  type="creator"
                  index={index}
                  callbackFun={callbackFun}
                />
              </Grid>
            );
          })}
      </Grid>

      {nftList && nftList.length === 0 && <DataNotFound />}
    </Box>
  );
}
