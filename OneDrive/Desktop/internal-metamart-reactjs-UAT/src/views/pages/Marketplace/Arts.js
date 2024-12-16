import React, { useState } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { exploreData } from "src/constants";
import MarketplaceCard from "src/component/MarketplaceCard";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .leftcontent": {
      display: "flex",
      alignItems: "center",
      "& h3": {
        marginLeft: "15px",
        fontSize: "30px",
        fontWeight: "bold",
        [theme.breakpoints.down("xs")]: {
          fontSize: "20px",
        },
      },
    },
  },
}));

function Explore() {
  const classes = useStyles();
  const [selectedCollectionIds, setSelectedCollectionIds] = useState();
  const [selectedCategoryNames, setSelectedCategoryNames] = useState();
  const [collectionList, setCollectionList] = useState([]);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorCol, setAnchorCol] = React.useState(null);
  return (
    <>
      <Box className={classes.root}>
        <Container maxWidth="lg">
          <Box mt={2}>
            <Grid container spacing={2}>
              {exploreData.map((data, i) => {
                return (
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Box mt={2}>
                      <MarketplaceCard type="card" data={data} key={i} />
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Explore;
