import React, { useEffect, useState, useContext } from "react";
import {
  makeStyles,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { useHistory, Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { AuthContext } from "src/context/Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "30px 0px 30px 0px",
    "& h3": {
      fontSize: "26px",
      fontWeight: "600",
      color: theme.palette.background.yellow,
      marginBottom: "15px",
      marginTop: "20px",
    },
    "& h6": {
      color: theme.palette.primary.main,
      width: "100%",
      maxWidth: "574px",
      width: "100%",
      marginBottom: "44px",
    },
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    // marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  contactbox: {
    padding: "30px 30px 70px",
    borderRadius: "5px",
    // marginTop: "30px",
    [theme.breakpoints.down("sm")]: {
      padding: "30px 15px 50px",
    },
    "& h4": {
      fontWeight: "300",
      color: theme.palette.primary.main,
      marginBottom: "30px",
      marginTop: "20px",
    },
  },
  buttonboxes: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: "413px",
    margin: "0 auto",
    paddingBottom: "60px",
    [theme.breakpoints.down("xs")]: {
      display: "block",
      width: "100%",
      maxWidth: "100%",
    },
    "& button": {
      fontSize: "14px",
      fontWeight: "500",
      color: theme.palette.primary.greyWhite,
      margin: "0px 20px",
      marginBottom: "10px",
      whiteSpace: "pre",
      [theme.breakpoints.down("xs")]: {
        marginBottom: "10px",
        margin: "0px",
      },
    },
  },
}));

export default function CustomizedSteppers({ open7, setOpen7 }) {
  const classes = useStyles();
  const history = useHistory();
  const user = useContext(AuthContext);

  const closeHandler = () => {
    setOpen7(false);
  };

  return (
    <div className={classes.root}>
      <Dialog
        open={open7}
        fullWidth
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
          <Box style={{ height: "90px" }}>
            <img src="images/kyclogo.png" width="20%" />
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            align="center"
            style={{
              color: "#fff",
              fontSize: "18px",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {user.userData?.kyc?.kycStatus === "PENDING" ? (
              <>
                KYC required !!
                <Typography variant="h6">
                  Your KYC is not approved yet.
                </Typography>
              </>
            ) : (
              <>
                KYC required !!
                <Typography variant="h6">
                  Please complete your KYC first
                </Typography>
              </>
            )}
          </DialogContentText>
          <Box display="flex" justifyContent="center" pb={3}>
            <Box className={classes.btnname}>
              <RouterLink to="/kyc" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="secondary">
                  Update
                </Button>
              </RouterLink>
              &nbsp; &nbsp;
              {/* <RouterLink to="/" style={{ textDecoration: "none" }}> */}
              <Button
                variant="contained"
                color="secondary"
                onClick={closeHandler}
              >
                Close
              </Button>
              {/* </RouterLink> */}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
