import CreatorCard from "src/component/CreatorCard";
import { Box, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import CreatorCard2 from "src/component/CreatorCard2";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  heading: {
    "& h1": {
      color: theme.palette.secondary.main,
      fontWeight: "700",
      fontSize: "40px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
  },
}));
const Search = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Container>
        <Box className={classes.heading} mt={2}>
          <Typography variant="h1">Search</Typography>
        </Box>
        <Box>
          <CreatorCard2 />
        </Box>
      </Container>
    </Box>
  );
};

export default Search;
