import {
  Box,
  Container,
  DialogActions,
  TextField,
  Dialog,
  DialogContent,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Button,
  Input,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  imgbox: {
    "& figure": {
      overflow: "hidden",
      "& img": {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "auto",
        display: "block",
        borderRadius: "25px",
      },
    },
  },
  grid: {
    padding: "10px",
  },
  logintext: {
    marginLeft: "20px",
    "& h5": {
      color: theme.palette.secondary.main,
      fontWeight: "bold",
      fontSize: "24px",
      lineHeight: "130%",
    },
    "& h6": {
      color: theme.palette.secondary.main,
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "17px",
    },
  },
  namefiled: {
    marginLeft: "20px",
    display: "flex",

    "& button": {
      marginLeft: "10px",
      padding: "20px",
      borderRadius: "14px",
      height: "52px",
    },
  },
  textfield: {
    background: "#F4F4F4",
    background: "#F4F4F4",
    borderRadius: "14px",
    padding: "20px",
  },
}));
const EnterName = () => {
  const classes = useStyles();
  const [updateMinSatkeOpen, setUpdateMinSatkeOpen] = useState(false);
  return (
    <Box>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={() => setUpdateMinSatkeOpen(true)}
      >
        Edit EnterName
      </Button>
      <Container>
        {updateMinSatkeOpen && (
          <Dialog
            open={updateMinSatkeOpen}
            onClose={() => {
              setUpdateMinSatkeOpen(false);
            }}
            maxWidth="sm"
            className={classes.dialogSection}
          >
            <DialogContent>
              <Grid container spacing={0} className={classes.grid}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Box
                    className={classes.imgbox}
                    style={{ maxHeight: "100%", minHeight: "100%" }}
                  >
                    <figure>
                      <img src="/images/onlycamimg.png" alt="" />
                    </figure>
                  </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Box mt={6} style={{ marginLeft: "20px" }}>
                    <figure>
                      <img src="/images/settingicon.png" alt="" />
                    </figure>
                  </Box>
                  <Box className={classes.logintext} mt={4}>
                    <Typography variant="h5">
                      First time using <br /> this wallet?
                    </Typography>
                    <Typography variant="h6">
                      Choose your desired name <br /> below and click “Ok” to
                      connect
                    </Typography>
                  </Box>
                  <Box className={classes.namefiled} mt={4}>
                    <TextField
                      fullWidth
                      type="text"
                      placeholder="Enter here"
                      className={classes.textfield}
                    />
                    <Button variant="contained" size="large" color="primary">
                      Ok
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        )}
      </Container>
    </Box>
  );
};

export default EnterName;
