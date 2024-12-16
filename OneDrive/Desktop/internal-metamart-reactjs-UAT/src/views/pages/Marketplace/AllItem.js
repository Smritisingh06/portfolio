import React from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import ExploreCard from "src/component/ExploreCard";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function Explore(props) {
  const classes = useStyles();
  const { nftList, callbackFun, isLoading, setLikeLoad } = props;

  return (
    <>
      <Box className={classes.root}>
        <Grid container spacing={1}>
          {nftList &&
            nftList.map((data, i) => {
              return (
                <Grid item xs={6} sm={12} md={6} lg={4}>
                  <Box mt={2}>
                    <ExploreCard
                      type="card"
                      data={data}
                      key={i}
                      callbackFun={callbackFun}
                      setLikeLoad={(item) => setLikeLoad(item)}
                    />
                  </Box>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </>
  );
}

export default Explore;
