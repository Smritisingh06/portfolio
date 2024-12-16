import React from "react";

import { Box, Typography, Container, makeStyles,Paper } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  mainbox: {
    paddingTop: "60px",
    paddingBottom: "50px",
    "& h1": {
      fontFamily: "'ClashDisplay-Medium'",
      "& span": { fontFamily: "'ClashDisplay-Extralight'" },
    },
  },
}));

const Contact = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.mainbox}>
      <Container maxWidth="lg">
        <Paper elevation={2}>
          <Box mb={5} textAlign="center">
            <Container maxWidth="sm">
              <Typography variant="h1" color="primary">
                Support
                <span> Tickets</span>
              </Typography>

              <Box>
                <img
                  src="images/commingsoon.gif"
                  alt="commingsoon"
                  style={{ width: "100%" }}
                />
              </Box>
            </Container>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Contact;
