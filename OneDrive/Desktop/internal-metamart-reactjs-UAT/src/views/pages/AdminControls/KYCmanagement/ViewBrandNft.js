import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  Container,
  makeStyles,
  Paper,
  Hidden,
  Avatar,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { toast } from "react-toastify";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataLoading from "src/component/DataLoading";
import { UserContext } from "src/context/User";
const useStyles = makeStyles((theme) => ({
  mainBox: {
    marginTop: "25px",
    paddingBottom: "50px",
    "& .termsAndConditions": {
      padding: "25px",
    },
    "& .activeclass": {
      "& p": {
        color: "#158815",
        fontWeight: "500",
      },
    },
  },
  imgbox: {
    marginTop: "10px",
    "& img": {
      width: "100%",
      objectFit: "cover",
      maxHeight: "300px",
      minHeight: "300px",
    },
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
        "linear-gradient(93.14deg, #FFB000 -20.75%, #FF564D 11.84%, #FF0098 53.76%, #5D00C1 102.96%)",

      position: "absolute",
      right: "0px",
      bottom: "10px",
    },
  },
  maiKyc2Box: {
    "& h4": {
      padding: "25px 0px 20px",
    },
    "& h6": {
      fontSize: "14px",
      color: "#9d9d9d",
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
}));

const ViewBrandNft = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const user = useContext(UserContext);
  const particularPermition = user?.permissions?.kycManagement;
  let isRead =
    user?.userData?.userType == "Admin"
      ? true
      : particularPermition?.read
      ? particularPermition?.read
      : false;
  useEffect(() => {
    if (!isRead) {
      history.push("/");
    }
  }, [isRead]);
  let isWrite =
    user?.userData?.userType == "Admin"
      ? true
      : particularPermition?.write
      ? particularPermition?.write
      : false;
  // const { data } = props;
  const [isLoader, setIsLoader] = useState(false);
  const [mediaData, setMediaData] = useState();
  const [brandId, setBrandId] = useState("");
  const location = useLocation();
  const [formData, setFormData] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    if (location.search.substring(1, location.search.length)) {
      const id = location.search.substring(1, location.search.length);
      ViewHandler(id);
      setBrandId(id);
    }
  }, [location]);
  // const [idds, setIdd] = useState("");
  const [open, setOpen] = useState(false);
  const [OpenOnApprove, setOpenOnApprove] = useState(false);
  const [OpenOnReject, setOpenOnReject] = useState(false);
  const [OpenOnshowImages, setOpenOnshowImages] = useState(false);
  const [showImages, setshowImages] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const handleClose = () => {
    setOpen(false);
    setOpenOnApprove(false);
    setOpenOnReject(false);
    setOpenOnshowImages(false);
  };
  const handleDeletecon = (id) => {
    // setIdd(id);
    setOpen(true);
  };
  const ViewHandler = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: `${Apiconfigs.viewKyc}?kycId=${id}`,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setIsLoading(false);
        setMediaData(res.data.result);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const acceptbrandHandler = async () => {
    setIsLoader("approve");
    try {
      const res = await axios({
        method: "PUT",
        url: Apiconfigs.approveRejectKyc,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          kycId: brandId,
          approveReject: "APPROVE",
        },
      });

      if (res.data.statusCode === 200) {
        toast.success("KYC request accepted successfully");
        history.push("/kyc-management");
        setIsLoader(false);
      } else {
        setIsLoader(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoader(false);
    }
  };
  const rejectbrandHandler = async (id) => {
    setIsSubmit(true);
    try {
      if (formData !== "") {
        setIsLoader("reject");
        const res = await axios({
          method: "PUT",
          url: Apiconfigs.approveRejectKyc,
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
          data: {
            kycId: brandId,
            approveReject: "REJECT",
            reason: formData,
          },
        });

        if (res.data.statusCode === 200) {
          toast.success("KYC request rejected");
          setOpen(false);
          history.push("/kyc-management");
          setIsLoader(false);
        } else {
          toast.error(res.data.responseMessage);
        }
      }
    } catch (err) {
      console.log(err);
      setIsLoader(false);
    }
  };

  return (
    <>
      <Container>
        <Paper elevation={2} className={classes.mainBox}>
          <Box className="termsAndConditions">
            <Typography variant="h2" color="primary">
              {" "}
              View KYC Details{" "}
            </Typography>
          </Box>
          {isLoading && <DataLoading />}
          {!isLoading && (
            <Box className="termsAndConditions">
              <Box mt={3} className={classes.maiKyc2Box}>
                <Paper elevation={2} className="paperBox">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={5}>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography variant="h6" color="primary">
                            First Name :-
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="primary">
                            {mediaData?.firstName}
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" color="primary">
                            Last Name :-
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="primary">
                            {mediaData?.lastName}
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" color="primary">
                            Mobile Number :-
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="primary">
                            {mediaData?.mobileNumber}
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
                            {mediaData?.email}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" color="primary">
                            Gender :-
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="primary">
                            {mediaData?.gender}
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" color="primary">
                            Date of Birth :-
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="primary">
                            {mediaData?.DOB}
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" color="primary">
                            IBI Name :-
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="body2"
                            color="primary"
                            style={{ wordWrap: "break-word" }}
                          >
                            {mediaData?.IBIName}
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" color="primary">
                            IBI Id :-
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="body2"
                            color="primary"
                            style={{ wordWrap: "break-word" }}
                          >
                            {mediaData?.IBIID}
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" color="primary">
                            Submission Date & Time :-
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="primary">
                            {mediaData?.createdAt
                              ? moment(mediaData?.createdAt).format("lll")
                              : "-"}
                          </Typography>{" "}
                        </Grid>

                        {mediaData?.approveStatus === "APPROVED" && (
                          <>
                            <Grid item xs={6}>
                              <Typography variant="h6" color="primary">
                                Approval Date & Time
                              </Typography>{" "}
                            </Grid>
                            <Grid item xs={6}>
                              <Typography
                                variant="body2"
                                color="primary"
                                style={{ wordWrap: "break-word" }}
                              >
                                {moment(mediaData?.updatedAt).format("lll")}
                              </Typography>
                            </Grid>
                          </>
                        )}
                      </Grid>
                    </Grid>
                    <Hidden smDown>
                      <Grid item md={2}></Grid>
                    </Hidden>

                    <Grid item xs={12} sm={12} md={5}>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography variant="h6" color="primary">
                            Country :-
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="primary">
                            {mediaData?.country}
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" color="primary">
                            State :-
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="primary">
                            {mediaData?.state}
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" color="primary">
                            City :-
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="body2"
                            color="primary"
                            style={{ wordWrap: "break-word" }}
                          >
                            {mediaData?.city}
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" color="primary">
                            Full Address :-
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="body2"
                            color="primary"
                            style={{ wordWrap: "break-word" }}
                          >
                            {mediaData?.fullAddress}
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" color="primary">
                            Document Type :-
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="body2"
                            color="primary"
                            style={{ wordWrap: "break-word" }}
                          >
                            {(mediaData?.passport && "Passport") ||
                              (mediaData?.driving && "Driving") ||
                              (mediaData?.national && "National")}
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" color="primary">
                            Document ID :-
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="body2"
                            color="primary"
                            style={{ wordWrap: "break-word" }}
                          >
                            {(mediaData?.passport &&
                              mediaData?.passport?.idNumber) ||
                              (mediaData?.driving &&
                                mediaData?.driving?.idNumber) ||
                              (mediaData?.national &&
                                mediaData?.national?.idNumber)}
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" color="primary">
                            Occupation :-
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="body2"
                            color="primary"
                            style={{ wordWrap: "break-word" }}
                          >
                            {mediaData?.Occupation && mediaData?.Occupation}
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" color="primary">
                            Source of Income :-
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="body2"
                            color="primary"
                            style={{ wordWrap: "break-word" }}
                          >
                            {mediaData?.SourceofIncome}
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" color="primary">
                            Status :-
                          </Typography>{" "}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="primary">
                            {mediaData?.approveStatus === "REJECTED" && (
                              <Typography
                                variant="body2"
                                style={{ color: "red" }}
                              >
                                {mediaData?.approveStatus}
                              </Typography>
                            )}
                            {mediaData?.approveStatus === "APPROVED" && (
                              <Typography
                                variant="body2"
                                style={{ color: "green" }}
                              >
                                {mediaData?.approveStatus}
                              </Typography>
                            )}
                            {mediaData?.approveStatus === "PENDING" && (
                              <Typography
                                variant="body2"
                                style={{ color: "#f6b00c" }}
                              >
                                {mediaData?.approveStatus}
                              </Typography>
                            )}
                          </Typography>{" "}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <Typography variant="h6">Front Image</Typography>
                      <Box className={classes.imgbox}>
                        <figure
                          style={{
                            maxHeight: "300px",
                            minHeight: "300px",
                            margin: "0px",
                            cursor: "pointer",
                          }}
                        >
                          <img
                            src={
                              (mediaData?.passport &&
                                mediaData?.passport?.frontImage) ||
                              (mediaData?.driving &&
                                mediaData?.driving?.frontImage) ||
                              (mediaData?.national &&
                                mediaData?.national?.frontImage)
                            }
                            alt=""
                            width="100%"
                            onClick={() => {
                              setshowImages(
                                (mediaData?.passport &&
                                  mediaData?.passport?.frontImage) ||
                                  (mediaData?.driving &&
                                    mediaData?.driving?.frontImage) ||
                                  (mediaData?.national &&
                                    mediaData?.national?.frontImage)
                              );
                              setOpenOnshowImages(true);
                            }}
                          />
                        </figure>
                      </Box>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      {(mediaData?.driving || mediaData?.national) && (
                        <Typography variant="h6">Cover Image</Typography>
                      )}
                      {(mediaData?.driving || mediaData?.national) && (
                        <Box className={classes.imgbox}>
                          <figure
                            style={{
                              maxHeight: "300px",
                              minHeight: "300px",
                              margin: "0px",
                              cursor: "pointer",
                            }}
                          >
                            <img
                              src={
                                (mediaData?.passport &&
                                  mediaData?.passport?.backImage) ||
                                (mediaData?.driving &&
                                  mediaData?.driving?.backImage) ||
                                (mediaData?.national &&
                                  mediaData?.national?.backImage)
                              }
                              alt=""
                              width="100%"
                              onClick={() => {
                                setshowImages(
                                  (mediaData?.passport &&
                                    mediaData?.passport?.backImage) ||
                                    (mediaData?.driving &&
                                      mediaData?.driving?.backImage) ||
                                    (mediaData?.national &&
                                      mediaData?.national?.backImage)
                                );
                                setOpenOnshowImages(true);
                              }}
                            />
                          </figure>
                        </Box>
                      )}
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <Typography variant="h6">Selfie</Typography>
                      <Box className={classes.mainUpoadSection}>
                        <Avatar
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setshowImages(mediaData?.selfi && mediaData?.selfi);
                            setOpenOnshowImages(true);
                          }}
                          src={mediaData?.selfi && mediaData?.selfi}
                          alt=""
                        />
                      </Box>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <Typography variant="h6">Proof of Residence</Typography>
                      <Box className={classes.imgbox}>
                        <figure
                          style={{
                            maxHeight: "300px",
                            minHeight: "300px",
                            margin: "0px",
                            cursor: "pointer",
                          }}
                        >
                          <img
                            src={
                              mediaData?.ProofofResidence &&
                              mediaData?.ProofofResidence
                            }
                            alt=""
                            width="100%"
                            onClick={() => {
                              setshowImages(
                                mediaData?.ProofofResidence &&
                                  mediaData?.ProofofResidence
                              );
                              setOpenOnshowImages(true);
                            }}
                          />
                        </figure>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
              <Box pt={2}>
                <Grid container direction={"column"} spacing={2}>
                  <Grid item xs={12} align="center">
                    <Box pb={2} pt={1}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isLoader}
                        onClick={() => history.push("/kyc-management")}
                      >
                        Back
                      </Button>
                      {mediaData?.approveStatus === "REJECTED" && isWrite && (
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          style={{ margin: "0px 10px" }}
                          onClick={() => {
                            // acceptbrandHandler()
                            setOpenOnApprove(true);
                          }}
                          disabled={isLoader}
                        >
                          Approve
                          {isLoader === "approve" && <ButtonCircularProgress />}
                        </Button>
                      )}
                      {mediaData?.approveStatus === "APPROVED" && isWrite && (
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          style={{ margin: "0px 10px" }}
                          onClick={() => {
                            // acceptbrandHandler()
                            setOpenOnReject(true);
                          }}
                          disabled={isLoader}
                        >
                          Reject
                          {isLoader === "reject" && <ButtonCircularProgress />}
                        </Button>
                      )}
                      {mediaData?.approveStatus === "PENDING" && isWrite && (
                        <>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ margin: "0px 10px" }}
                            onClick={() => acceptbrandHandler()}
                            disabled={isLoader}
                          >
                            Approve
                            {isLoader === "approve" && (
                              <ButtonCircularProgress />
                            )}
                          </Button>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isLoader}
                            onClick={() => handleDeletecon()}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </Paper>
        <div>
          <Dialog
            open={OpenOnshowImages}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent className={classes.placeholdercolor}>
              <img
                src={showImages}
                alt=""
                width="100%"
                height="auto"
                style={{
                  userSelect: "none",
                  pointerEvents: "none",
                  touchAction: "none",
                }}
              />
            </DialogContent>
            <DialogActions></DialogActions>
          </Dialog>
          <Dialog
            open={OpenOnReject}
            onClose={handleClose}
            maxWidth="sm"
            disabled={isLoader}
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent className={classes.placeholdercolor}>
              <Typography variant="h4">You have approved this KYC</Typography>
              <Box mt={1}>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="h6" color="primary">
                      Submitted Date :-
                    </Typography>{" "}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="primary">
                      {mediaData?.createdAt
                        ? moment(mediaData?.createdAt).format("lll")
                        : "-"}
                    </Typography>{" "}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6" color="primary">
                      Status :-
                    </Typography>{" "}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="primary">
                      {mediaData?.approveStatus === "REJECTED" && (
                        <Typography variant="body2" style={{ color: "red" }}>
                          {mediaData?.approveStatus}
                        </Typography>
                      )}
                      {mediaData?.approveStatus === "APPROVED" && (
                        <Typography variant="body2" style={{ color: "green" }}>
                          {mediaData?.approveStatus}
                        </Typography>
                      )}
                      {mediaData?.approveStatus === "PENDING" && (
                        <Typography
                          variant="body2"
                          style={{ color: "#f6b00c" }}
                        >
                          {mediaData?.approveStatus}
                        </Typography>
                      )}
                    </Typography>{" "}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6" color="primary">
                      Approve Date :-
                    </Typography>{" "}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="primary">
                      {mediaData?.updatedAt
                        ? moment(mediaData?.updatedAt).format("lll")
                        : "-"}
                    </Typography>{" "}
                  </Grid>
                </Grid>
                <Box mt={1}>
                  <Typography variant="h4">Reason for rejection</Typography>
                </Box>
                <Box mt={1}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    name="comment"
                    type="text"
                    multiline
                    rowsMax={5}
                    rows={5}
                    value={formData}
                    inputProps={{
                      maxLength: 651,
                    }}
                    onChange={(e) => setFormData(e.target.value)}
                    error={
                      (isSubmit && formData === "") || formData.length > 650
                    }
                    helperText={
                      (isSubmit &&
                        formData === "" &&
                        "Please enter your rejection reason") ||
                      (formData.length > 650 &&
                        "Reason should not exceed 650 characters")
                    }
                  />
                </Box>
                <Box pt={2} pb={1}>
                  <Typography
                    variant="body2"
                    color="primary"
                    style={{
                      wordBreak: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    Are you sure want to reject the KYC.
                  </Typography>{" "}
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={rejectbrandHandler}
                className={classes.buttonApproveDailog}
                variant="contained"
                color="primary"
                disabled={isLoader}
                type="submit"
              >
                Yes {isLoader === "reject" && <ButtonCircularProgress />}
              </Button>
              <Button
                onClick={handleClose}
                className={classes.buttonRejectDailog}
                variant="contained"
                color="primary"
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={OpenOnApprove}
            onClose={handleClose}
            maxWidth="sm"
            disabled={isLoader}
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent className={classes.placeholdercolor}>
              <Typography variant="h4">You have rejected this KYC</Typography>
              <Box mt={1}>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="h6" color="primary">
                      Submitted Date :-
                    </Typography>{" "}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="primary">
                      {mediaData?.createdAt
                        ? moment(mediaData?.createdAt).format("lll")
                        : "-"}
                    </Typography>{" "}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6" color="primary">
                      Status :-
                    </Typography>{" "}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="primary">
                      {mediaData?.approveStatus === "REJECTED" && (
                        <Typography variant="body2" style={{ color: "red" }}>
                          {mediaData?.approveStatus}
                        </Typography>
                      )}
                      {mediaData?.approveStatus === "APPROVED" && (
                        <Typography variant="body2" style={{ color: "green" }}>
                          {mediaData?.approveStatus}
                        </Typography>
                      )}
                      {mediaData?.approveStatus === "PENDING" && (
                        <Typography
                          variant="body2"
                          style={{ color: "#f6b00c" }}
                        >
                          {mediaData?.approveStatus}
                        </Typography>
                      )}
                    </Typography>{" "}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6" color="primary">
                      Rejected Date :-
                    </Typography>{" "}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="primary">
                      {mediaData?.updatedAt
                        ? moment(mediaData?.updatedAt).format("lll")
                        : "-"}
                    </Typography>{" "}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6" color="primary">
                      Reason:-
                    </Typography>{" "}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="body2"
                      color="primary"
                      style={{
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {mediaData?.reason ? mediaData?.reason : "-"}
                    </Typography>{" "}
                  </Grid>
                </Grid>
                <Box pt={2} pb={1}>
                  <Typography
                    variant="body2"
                    color="primary"
                    style={{
                      wordBreak: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    Are you sure want to approve the KYC.
                  </Typography>{" "}
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={acceptbrandHandler}
                className={classes.buttonApproveDailog}
                variant="contained"
                color="primary"
                disabled={isLoader}
                type="submit"
              >
                Yes {isLoader === "approve" && <ButtonCircularProgress />}
              </Button>
              <Button
                onClick={handleClose}
                className={classes.buttonRejectDailog}
                variant="contained"
                color="primary"
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            disabled={isLoader}
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent className={classes.placeholdercolor}>
              <Typography variant="h4">Reason for rejection</Typography>
              <Box mt={1}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  name="comment"
                  type="text"
                  multiline
                  rowsMax={5}
                  rows={5}
                  value={formData}
                  inputProps={{
                    maxLength: 651,
                  }}
                  onChange={(e) => setFormData(e.target.value)}
                  error={(isSubmit && formData === "") || formData.length > 650}
                  helperText={
                    (isSubmit &&
                      formData === "" &&
                      "Please enter your rejection reason") ||
                    (formData.length > 650 &&
                      "Reason should not exceed 650 characters")
                  }
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={rejectbrandHandler}
                className={classes.buttonApproveDailog}
                variant="contained"
                color="primary"
                disabled={isLoader}
                type="submit"
              >
                Yes {isLoader === "reject" && <ButtonCircularProgress />}
              </Button>
              <Button
                onClick={handleClose}
                className={classes.buttonRejectDailog}
                variant="contained"
                color="primary"
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Container>
    </>
  );
};

export default ViewBrandNft;
