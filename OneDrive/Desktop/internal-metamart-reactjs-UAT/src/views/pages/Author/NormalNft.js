import DataNotFound from "src/component/DataNotFound";
import { Box, Grid } from "@material-ui/core";
import React, { useState } from "react";
import NFTCard from "src/component/NFTCard";
import NormalNftCards from "src/component/NormalNftCards";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const ProfileNft = ({
  nftList,
  callbackFun,
  isLoading,
  setIsLoading,
  account,
}) => {
  return (
    <>
      <Grid container spacing={2}>
        {isLoading ? (
          <ButtonCircularProgress />
        ) : (
          <>
            {nftList &&
              nftList.map((data, index, type) => {
                return (
                  <Grid item lg={3} md={4} sm={6} xs={12}>
                    <NormalNftCards
                      data={data}
                      type="creator"
                      index={index}
                      callbackFun={callbackFun}
                      account={account}
                      // tokenID={""}
                      // isResale={""}
                      // chianId={""}
                      // contractAddress={""}
                    />
                  </Grid>
                );
              })}

            {nftList && nftList.length === 0 && <DataNotFound />}
          </>
        )}
      </Grid>
    </>
  );
};

export default ProfileNft;
