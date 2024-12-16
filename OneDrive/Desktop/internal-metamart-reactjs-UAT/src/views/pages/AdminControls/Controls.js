import { Box, Container, Typography, Paper } from "@material-ui/core";
import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import * as yep from "yup";
import CreatorList from "./CreatorList";
import { UserContext } from "src/context/User";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  controlsBox: {
    padding: "50px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  heading: {
    "& h1": {
      fontFamily: "'ClashDisplay-Medium'",
      "& span": { fontFamily: "'ClashDisplay-Extralight'" },
    },
  },
}));

export default function Controls() {
  const classes = useStyles();

  const user = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (user.userData.userType !== "Admin") {
      history.push("/");
    }
  }, [user.userData.userType]);
  console.log(" ----- user.isAdmin ", user.userData.userType === "Admin");

  return (
    <Box className={classes.controlsBox}>
      <Container>
        <Paper elevation={2}>
          <Box className={classes.root}>
            <Box className={classes.heading} mb={3}>
              <Typography variant="h2" color="primary">
                Admin
                <span> Controls</span>
              </Typography>
            </Box>

            <Box>
              <CreatorList />
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
