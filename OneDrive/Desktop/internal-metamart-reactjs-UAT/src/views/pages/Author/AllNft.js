import { Grid } from "@material-ui/core";
import React from "react";
import DataNotFound from "src/component/DataNotFound";
import AllNftCard from "src/component/AllNftCard";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
const AllNft = ({
  nftList,
  callbackFun,
  setIsLoading,
  isLoading,
  dataprofile,
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
                    <AllNftCard
                      data={data}
                      type="creator"
                      index={index}
                      dataprofile={dataprofile}
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

export default AllNft;
