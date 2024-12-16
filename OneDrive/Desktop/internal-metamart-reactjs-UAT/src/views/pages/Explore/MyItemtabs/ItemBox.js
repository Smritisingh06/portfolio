import React, { useContext } from "react";
import { Typography, Box, makeStyles, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { UserContext } from "src/context/User";
import ExploreCard from "src/component/ExploreCard";
import { exploreData } from "src/constants";
import Filter from "./Filter";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "40px 0px",
    "& .heading": {
      color: "#000000",
    },
  },
}));

export default function Itembox() {
  const classes = useStyles();
  const user = useContext(UserContext);
  return (
    <Box className={classes.root}>
      {/* <Box className="heading">
        <Typography variant="h2">Activity</Typography>
      </Box> */}
      <Grid container spacing={1}>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Box>
            <Filter />
          </Box>
        </Grid>
        <Grid item lg={8} md={8} sm={12} xs={12} style={{ marginTop: "4px" }}>
          <Box style={{ paddingTop: "12px" }}>
            <Grid container spacing={1}>
              {exploreData.map((data, i) => {
                return (
                  <Grid item xs={12} sm={6} md={6} lg={6} key={i}>
                    <ExploreCard type="card" data={data} key={i} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
