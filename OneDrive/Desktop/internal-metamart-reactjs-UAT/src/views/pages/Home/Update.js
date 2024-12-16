import React from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  TextField,
  Button,
  InputAdornment,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  updateSection: {
    padding: "50px 0",
    background: "linear-gradient(90.07deg, #35A5F5 24.53%, #5CCDF1 88.81%)",
    position: "relative",
    overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      //   padding: "50px 0",
    },
    "& .shape": {
      position: "absolute",
      top: "20px",
      left: "100px",
    },
    "& .shape1": {
      position: "absolute",
      top: "20px",
      left: "180px",
    },
    "& .shape2": {
      position: "absolute",
      bottom: "-25px",
      left: "44%",
    },
    "& .shape3": {
      right: "0px",
      bottom: 0,
      position: "absolute",
      width: "65px",
    },
    "& .shape4": {
      position: "absolute",
      right: "15%",
      top: "25px",
    },
    "& .shape5": {
      position: "absolute",
      right: "8%",
      bottom: "25px",
    },
    "& .emailBox": {
      position: "relative",
      "& button": {
        background:
          "linear-gradient(91.94deg, #35A5F5 31.32%, #62D3F0 117.28%)",
        borderRadius: "44px 0px 0px 44px",
        color: "#fff",
        minWidth: "100px",
        height: "40px",
        top: "5px",
        right: "5px",
        position: "absolute",
      },
    },
    "& input": {
      backgroundColor: "#fff",
      borderRadius: "5px",
      border: " none",
      height: "50px",
      padding: "0 15px",
    },
    "& h3": {
      fontWeight: 700,
      fontSize: "22px",
      color: "#fff",
      "& img": {
        marginRight: "20px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
  },
}));

export default function BestSeller(props) {
  const classes = useStyles();
  return (
    <Box className={classes.updateSection}>
      <img src="images/shape/shape-7.png" className="shape moveTop" />
      <img src="images/shape/shape-8.png" className="shape1 rotate" />
      <img src="images/shape/shape-9.png" className="shape2 rotate" />
      <img src="images/shape/shape-9.png" className="shape4 rotate" />
      <img src="images/shape/shape-10.png" className="shape3 moveTop" />
      <img src="images/shape/shape-8.png" className="shape5 moveLeft" />
      <Container maxWidth="md">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} align="center">
            <Typography variant="h3">GET THE LATEST UPDATES</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box className="emailBox">
              <TextField
                id="outlined-basic"
                placeholder="Enter your email"
                variant="outlined"
                fullWidth
              />
              <Button className="searchBtn">I’m In</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
