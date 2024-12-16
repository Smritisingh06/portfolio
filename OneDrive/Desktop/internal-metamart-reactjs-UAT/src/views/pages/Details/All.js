import React from "react";
import { Box, makeStyles, Grid } from "@material-ui/core";
import MarketplaceCard from "src/component/MarketplaceCard";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 0px ",
    "& .heading": {
      color: "#000000",
    },
  },
}));

export default function Itembox(props) {
  const { particularorderlist, callbackFun, particularorderlist1 } = props;
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        {particularorderlist &&
          particularorderlist.map((data, i) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Box mt={2}>
                  <MarketplaceCard
                    type="card"
                    data={data}
                    key={i}
                    callbackFun={callbackFun}
                  />
                </Box>
              </Grid>
            );
          })}
        {particularorderlist1 &&
          particularorderlist1.map((data, i) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Box mt={2}>
                  <MarketplaceCard
                    type="card"
                    data={data}
                    key={i}
                    callbackFun={callbackFun}
                  />
                </Box>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}
