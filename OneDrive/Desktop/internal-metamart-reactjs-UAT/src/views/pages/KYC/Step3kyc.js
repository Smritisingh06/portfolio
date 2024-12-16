import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Hidden,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { changeExtenstion } from "src/utils";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const useStyles = makeStyles((theme) => ({
  maiKyc2Box: {
    "& h4": {
      padding: "25px 0px 20px",
    },
    "& h6": {
      fontSize: "14px",
      color: "#9d9d9d",
    },
    "& .MuiAvatar-root": {
      width: "100%",
      height: "260px",
      [theme.breakpoints.down("xs")]: {
        height: "180px",
      },
      borderRadius: "10px",
    },
    "& .paperBox": {
      padding: "30px 40px",
      [theme.breakpoints.down("xs")]: {
        padding: "15px",
      },
      "& h4": {
        paddingBottom: "20px",
      },
    },
  },
  imgSection: {
    padding: "8px 0px 30px",
  },
  mainUpoadSection: {
    "&  .MuiAvatar-root": {
      border: "1px solid rgba(255, 255, 255, 0.4)",
      cursor: "pointer",
      height: "200px",
      display: "flex",
      background: "#2f2e2e",
      alignItems: "center",
      borderRadius: "100%",
      justifyContent: "center",
      width: "1000%",
      maxWidth: "200px",
      margin: "5px 0px",
    },
    "& .MuiIconButton-root": {
      background:
        "hsl(230.54deg 95.03% 63.21%)",

      position: "absolute",
      right: "0px",
      bottom: "10px",
    },
  },
}));

export default function Step3kyc({
  settimeData,
  setTabView,
  setProgressData,
  setHeadingData,
  Handlerupdate,
  formValue,
  mobileNumber,
  countrydata,
  stateList,
  dataraj,
  profileImage643,
  profileImage643Selfi,
  profileImage64,
  loading,
  oldKYCData,
  documents,
  idNumber,
  selfiImage,
  ProofofResidence,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [frontImage, setFrontImage] = React.useState();
  console.log("frontImage====", oldKYCData);
  const BackPage = () => {
    setTabView("step2");
    setProgressData("66");
    settimeData("2");
    setHeadingData("Upload Documents");
  };
  const docType = oldKYCData?.passport
    ? "Passport"
    : oldKYCData?.national
    ? "National ID"
    : "Driving Lisence";

  const docImage = oldKYCData?.passport
    ? oldKYCData?.passport
    : oldKYCData?.national
    ? oldKYCData?.national
    : oldKYCData?.driving;

  return (
    <Box className={classes.maiKyc2Box}>
      <Paper elevation={2} className="paperBox">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={5}>
            <Typography variant="h4">
              {oldKYCData ? "Basic details" : "Confirm your basic details"}
            </Typography>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h6" color="primary">
                  First Name :-
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="primary">
                  {oldKYCData ? oldKYCData?.firstName : formValue.firstname}
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" color="primary">
                  Last Name :-
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="primary">
                  {oldKYCData ? oldKYCData?.lastName : formValue.lastName}
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" color="primary">
                  Mobile Number :-
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="primary">
                  {oldKYCData ? oldKYCData?.mobileNumber : mobileNumber}
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" color="primary">
                  Email ID :-
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  color="primary"
                  style={{ wordBreak: "break-all" }}
                >
                  {oldKYCData ? oldKYCData?.email : formValue.email}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" color="primary">
                  Gender :-
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="primary">
                  {oldKYCData ? oldKYCData?.gender : formValue.gender}
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" color="primary">
                  IBI Name :-
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="primary">
                  {oldKYCData ? oldKYCData?.IBIName : formValue.IBIName}
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" color="primary">
                  Gender :-
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="primary">
                  {oldKYCData ? oldKYCData?.IBIID : formValue.IBIID}
                </Typography>{" "}
              </Grid>
            </Grid>
          </Grid>
          <Hidden smDown>
            <Grid item md={2}></Grid>
          </Hidden>

          <Grid item xs={12} sm={12} md={5}>
            <Typography variant="h4">Address</Typography>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h6" color="primary">
                  Country :-
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="primary">
                  {oldKYCData ? oldKYCData?.country : countrydata.name}
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" color="primary">
                  State :-
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="primary">
                  {oldKYCData ? oldKYCData?.state : formValue.state}
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" color="primary">
                  City :-
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="primary">
                  {oldKYCData ? oldKYCData?.city : formValue.city}
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" color="primary">
                  Full Address :-
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="primary">
                  {oldKYCData
                    ? oldKYCData?.fullAddress
                    : formValue?.fullAddress}
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" color="primary">
                  Source of Income :-
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="primary">
                  {oldKYCData
                    ? oldKYCData?.SourceofIncome
                    : formValue?.SourceofIncome}
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" color="primary">
                  Occupation :-
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="primary">
                  {oldKYCData ? oldKYCData?.Occupation : formValue?.Occupation}
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" color="primary">
                  Date of Birth :-
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="primary">
                  {oldKYCData ? oldKYCData?.DOB : formValue?.DOB}
                </Typography>{" "}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Typography variant="h4">
        Confirm your Identification Documents.
      </Typography>
      <Box display="flex" alignItems="center">
        <Typography variant="h6" color="primary">
          Document Type :-
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          style={{ paddingLeft: "20px", textTransform: "capitalize" }}
        >
          {oldKYCData ? docType : documents}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography variant="h6" color="primary">
          Document ID :-
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          style={{ paddingLeft: "20px" }}
        >
          {oldKYCData ? docImage?.idNumber : idNumber && idNumber}
        </Typography>
      </Box>
      <Box className={classes.imgSection}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="primary">
              Front Image :-
            </Typography>
            <Avatar
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpen(true);
                setFrontImage(
                  oldKYCData ? docImage?.frontImage : profileImage643
                );
              }}
              src={
                oldKYCData
                  ? docImage?.frontImage
                    ? changeExtenstion(docImage?.frontImage)
                    : ""
                  : profileImage643
              }
              alt=""
            />
          </Grid>

          {documents === "passport" ||
          oldKYCData?.passport?.documentName === "passport" ? (
            <></>
          ) : (
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" color="primary">
                Back Image :-
              </Typography>
              <Avatar
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setOpen(true);
                  setFrontImage(
                    oldKYCData ? docImage?.backImage : profileImage64
                  );
                }}
                src={
                  oldKYCData && docImage?.backImage
                    ? changeExtenstion(
                        docImage?.backImage && docImage?.backImage
                      )
                    : profileImage64
                }
                alt=""
              />
            </Grid>
          )}
        </Grid>
      </Box>
      <Box className={classes.mainUpoadSection}>
        <Typography variant="h6" color="primary">
          Selfie :-
        </Typography>
        <Avatar
          style={{ cursor: "pointer" }}
          onClick={() => {
            setOpen(true);
            setFrontImage(oldKYCData ? oldKYCData?.selfi : selfiImage);
          }}
          src={
            oldKYCData
              ? // changeExtenstion(oldKYCData?.selfi)

                oldKYCData?.selfi
                ? changeExtenstion(oldKYCData?.selfi)
                : ""
              : selfiImage
          }
          alt=""
        />
      </Box>{" "}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box className={classes.imgSection}>
            <Typography variant="h6" color="primary">
              Proof of Residence :-
            </Typography>
            <Avatar
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpen(true);
                setFrontImage(
                  oldKYCData ? oldKYCData?.ProofofResidence : ProofofResidence
                );
              }}
              src={
                oldKYCData
                  ? // changeExtenstion(oldKYCData?.selfi)

                    oldKYCData?.ProofofResidence
                    ? changeExtenstion(oldKYCData?.ProofofResidence)
                    : ""
                  : ProofofResidence
              }
              alt=""
            />
          </Box>
        </Grid>
      </Grid>
      {!oldKYCData && (
        <Box display="flex">
          <Box mr={1}>
            <Button
              variant="contained"
              color="secondary"
              disabled={loading}
              onClick={() => BackPage()}
            >
              Back
            </Button>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={Handlerupdate}
            disabled={loading}
          >
            Proceed {loading && <ButtonCircularProgress />}
          </Button>
        </Box>
      )}
      {open && (
        <Lightbox onCloseRequest={() => setOpen(false)} mainSrc={frontImage} />
      )}
    </Box>
  );
}
