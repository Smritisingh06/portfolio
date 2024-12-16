import DataNotFound from "src/component/DataNotFound";
import { Grid } from "@material-ui/core";
import React from "react";
// import NFTCard from "src/component/NFTCard";
import Ownednftcard from "src/component/Ownednftcard";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const ProfileNft = ({ nftList, callbackFun, isLoading, isAuther }) => {
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
                  <Grid item lg={3} md={4} sm={6} xs={6}>
                    <Ownednftcard
                      data={data}
                      type="creator"
                      index={index}
                      callbackFun={callbackFun}
                      isAuther={isAuther}
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
