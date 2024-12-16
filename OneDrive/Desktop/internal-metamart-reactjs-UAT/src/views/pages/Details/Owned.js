import React, { useContext } from "react";
import { Typography, Box, makeStyles, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { UserContext } from "src/context/User";
import ExploreCard from "src/component/ExploreCard";
import CollectionCard from "src/component/CollectionCard";
import { exploreData } from "src/constants";
import { collectionData } from "src/constants";

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
  // const user = useContext(UserContext);
  return (
    <Box className={classes.root}>
      <Grid container spacing={3}>
            {collectionData.map((data, index) =>{
              return(
                <Grid item lg={4} md={5} sm={6} xs={12}>
                  <CollectionCard
                    data={data}
                    type="creator"
                    index={index}
                  />
                </Grid>
              )
            } )}
      </Grid>
    </Box>
  );
}
