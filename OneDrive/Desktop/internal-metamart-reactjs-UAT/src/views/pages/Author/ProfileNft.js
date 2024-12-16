import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { Grid } from "@material-ui/core";
import React from "react";
import DataNotFound from "src/component/DataNotFound";
import OnsalePhyCard from "src/component/OnsalePhyCard";
const ProfileNft = ({ nftList, callbackFun, setIsLoading, isLoading }) => {
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
                    <OnsalePhyCard
                      data={data}
                      type="creator"
                      index={index}
                      callbackFun={callbackFun}
                    />
                  </Grid>
                );
              })}
            {/* {nftList && nftList.length === 0 && <>hjkhj</>} */}

            {nftList && nftList.length === 0 && <DataNotFound />}
          </>
        )}
      </Grid>
    </>
  );
};

export default ProfileNft;
