import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Container,
  makeStyles,
  MenuItem, Menu
} from "@material-ui/core";
import RankingTable from "./RankingTable";
import FilterListIcon from '@material-ui/icons/FilterList';
import { CategoryButtons, RankingButtons } from 'src/constants';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "80px 0px",
    "& h2": {
      color: "#000000",
    },
  },
  filterBtn: {
    // color: "#fff",
    background: "#FFFFFF",
    border: "2px solid #EEEEEE",
    boxSizing: "border-box",
    // backdropFilter: "blur(42px)",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    fontWeight: "bold",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "20px",
    margin: "5px",
    "& img": {
      marginRight: "5px",
    },
  },
}));

const Contact = (props) => {
  const classes = useStyles()
  const [selectedCollectionIds, setSelectedCollectionIds] = useState();
  const [selectedCategoryNames, setSelectedCategoryNames] = useState();
  const [selectRankingDays, setSelectRankingDays] = useState();
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorCol, setAnchorCol] = React.useState(null);
  return (
    <>
      <Box className={classes.root}>
        <Container maxWidth="lg">
          <Box className="heading">
            <Typography variant="h2">
              Top NFTs
            </Typography>
          </Box>
          <Box className="filtertext" mt={5} mb={5}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <Typography variant="h6">The top NFTs on OpenSea, ranked by volume, floor price and other statistics.</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} align="right">
                <Button
                  className={classes.filterBtn}
                  onClick={(event) => setAnchorCol(event.currentTarget)}
                >
                  <FilterListIcon />
                  {selectRankingDays
                    ? selectRankingDays.name.toString()
                    : "Last 7 Days"}
                </Button>
                <Menu
                  id='simple-menu'
                  anchorEl={anchorCol}
                  keepMounted
                  open={Boolean(anchorCol)}
                  onClose={() => setAnchorCol(null)}
                >
                  <MenuItem
                    onClick={() => {
                      setAnchorCol(null);
                      setSelectRankingDays();
                    }}
                  >
                    Last 7 Days
                  </MenuItem>
                  {RankingButtons.map((data, i) => {
                    return (
                      <MenuItem
                        onClick={() => {
                          setAnchorCol(null);
                          setSelectRankingDays(data);
                        }}
                        key={i}
                      >
                        {data.name}
                      </MenuItem>
                    );
                  })}
                </Menu>
                <Button
                  className={classes.filterBtn}
                  onClick={(event) => setAnchorEl1(event.currentTarget)}
                >
                  <FilterListIcon />
                  {selectedCategoryNames
                    ? selectedCategoryNames.name.toString()
                    : "Category"}
                </Button>
                <Menu
                  id='simple-menu'
                  anchorEl={anchorEl1}
                  keepMounted
                  open={Boolean(anchorEl1)}
                  onClose={() => setAnchorEl1(null)}
                >
                  <MenuItem
                    onClick={() => {
                      setAnchorEl1(null);
                      setSelectedCategoryNames();
                    }}
                  >
                    Category
                  </MenuItem>
                  {CategoryButtons.map((data, i) => {
                    return (
                      <MenuItem
                        onClick={() => {
                          setAnchorEl1(null);
                          setSelectedCategoryNames(data);
                        }}
                        key={i}
                      >
                        {data.name}
                      </MenuItem>
                    );
                  })}
                </Menu>
              </Grid>
            </Grid>
          </Box>
          <Box className="mainBox" mt={3}>
            <RankingTable />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Contact;
