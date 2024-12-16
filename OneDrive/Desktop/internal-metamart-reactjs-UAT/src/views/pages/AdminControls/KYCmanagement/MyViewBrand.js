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
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { UserContext } from "src/context/User";
import { toast } from "react-toastify";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
const useStyles = makeStyles({
  mainBox: {
    paddingTop: "10px",
    paddingBottom: "60px",

    "& .termsAndConditions": {
      marginTop: "25px",
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
});

const MyViewBrand = (props) => {
  const history = useHistory();
  const classes = useStyles();
  // const { data } = props;
  // const [isLoading, setIsLoading] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [mediaData, setMediaData] = React.useState([]);
  const [brandId, setBrandId] = React.useState("");
  const user = useContext(UserContext);
  console.log(" ---- user permitions ", user?.permissions);
  console.log(
    " ---- user permitions kycManagement",
    user?.permissions?.kycManagement
  );
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

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeletecon = (id) => {
    // setIdd(id);
    setOpen(true);
  };

  const ViewHandler = async (id) => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.ViewBrandnft,
        params: {
          _id: id,
        },
      });
      if (res.data.statusCode === 200) {
        setMediaData(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const acceptbrandHandler = async () => {
    setIsLoader("approve");
    try {
      const res = await axios({
        method: "PUT",
        url: Apiconfigs.Approvebrand,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        params: {
          brandId: brandId,
        },
      });

      if (res.data.statusCode === 200) {
        toast.success(res.data.responseMessage);
        history.push("kyc-management");
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
          url: Apiconfigs.rejectbrand,
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
          params: {
            brandId: brandId,
            reason: formData,
          },
        });

        if (res.data.statusCode === 200) {
          toast.success(res.data.responseMessage);
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
      <Container maxWidth="md">
        <Box className={classes.mainBox}>
          <Paper elevation={2} className="termsAndConditions">
            <Box>
              <Typography variant="h3" color="primary">
                {" "}
                View Brand NFT{" "}
              </Typography>
            </Box>
            <Box mt={3}>
              <Grid container spacing={1}>
                <Grid item lg={3} md={3} sm={3} xs={12}>
                  <Box>
                    <Typography variant="h6">Brand name </Typography>
                  </Box>
                </Grid>
                <Grid item lg={9} md={9} sm={9} xs={12}>
                  <Typography variant="body1">
                    {mediaData?.brandName ? mediaData?.brandName : "N/A"}
                  </Typography>
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={12}>
                  <Typography variant="h6">Bio </Typography>
                </Grid>
                <Grid item lg={9} md={9} sm={9} xs={12}>
                  <Typography variant="body1">
                    {mediaData?.bio ? mediaData?.bio : "N/A"}
                  </Typography>
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={12}>
                  <Typography variant="h6">Phone number</Typography>
                </Grid>
                <Grid item lg={9} md={9} sm={9} xs={12}>
                  <Typography variant="body1">
                    {mediaData?.mobileNumber ? mediaData?.mobileNumber : "N/A"}
                  </Typography>
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={12}>
                  <Typography variant="h6">Email</Typography>
                </Grid>
                <Grid item lg={9} md={9} sm={9} xs={12}>
                  <Typography variant="body1">
                    {mediaData?.email ? mediaData?.email : "N/A"}
                  </Typography>
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={12}>
                  <Typography variant="h6">Features </Typography>
                </Grid>
                <Grid item lg={9} md={9} sm={9} xs={12}>
                  <Typography variant="body1">
                    {mediaData?.cons ? mediaData?.cons : "N/A"}
                  </Typography>
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={12}>
                  <Typography variant="h6">Pro and Cons</Typography>
                </Grid>
                <Grid item lg={9} md={9} sm={9} xs={12}>
                  <Typography variant="body1">
                    {mediaData?.pros ? mediaData?.pros : "N/A"}
                  </Typography>
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={12}>
                  <Typography variant="h6">Benefits </Typography>
                </Grid>
                <Grid item lg={9} md={9} sm={9} xs={12}>
                  <Typography variant="body1">
                    {mediaData?.benefits ? mediaData?.benefits : "N/A"}
                  </Typography>
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={12}>
                  <Typography variant="h6">Physical store address*</Typography>
                </Grid>
                <Grid item lg={9} md={9} sm={9} xs={12}>
                  <Typography variant="body1">
                    {mediaData?.storeAddress ? mediaData?.storeAddress : "N/A"}
                  </Typography>
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={12}>
                  <Typography variant="h6">Brand Approval</Typography>
                </Grid>
                <Grid item lg={9} md={9} sm={9} xs={12}>
                  <Box>
                    {mediaData?.brandApproval === "REJECTED" && (
                      <Typography style={{ color: "red" }} variant="body1">
                        {mediaData?.brandApproval
                          ? mediaData?.brandApproval
                          : "N/A"}
                      </Typography>
                    )}
                    {mediaData?.brandApproval === "APPROVED" && (
                      <Typography style={{ color: "green" }} variant="body1">
                        {mediaData?.brandApproval
                          ? mediaData?.brandApproval
                          : "N/A"}
                      </Typography>
                    )}
                    {mediaData?.brandApproval === "PENDING" && (
                      <Typography style={{ color: "#f6b00c" }} variant="body1">
                        {mediaData?.brandApproval
                          ? mediaData?.brandApproval
                          : "N/A"}
                      </Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={12}>
                  <Typography variant="h6">Status </Typography>
                </Grid>
                <Grid item lg={9} md={9} sm={9} xs={12}>
                  <Box
                    className={
                      mediaData?.status === "ACTIVE"
                        ? "activeclass"
                        : "rejectclass"
                    }
                  >
                    <Typography variant="body1">
                      {mediaData?.status ? mediaData?.status : "N/A"}
                    </Typography>
                  </Box>
                </Grid>
                {mediaData?.brandApproval === "REJECT" ? (
                  <>
                    <Grid item lg={3} md={3} sm={3} xs={12}>
                      <Typography variant="h6">Reason </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={9} xs={12}>
                      <Typography variant="body1">
                        {mediaData?.reason ? mediaData?.reason : "N/A"}
                      </Typography>
                    </Grid>
                  </>
                ) : (
                  ""
                )}
                <Grid item lg={3} md={3} sm={3} xs={12}>
                  <Typography variant="h6">Date & Time</Typography>
                </Grid>
                <Grid item lg={9} md={9} sm={9} xs={12}>
                  <Typography
                    variant="body1"
                    style={{ wordBreak: "break-all" }}
                  >
                    {moment(
                      mediaData?.createdAt ? mediaData?.createdAt : "N/A"
                    ).format("lll")}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography variant="h6">Logo</Typography>
                  <Box className={classes.imgbox}>
                    <figure
                      style={{
                        maxHeight: "300px",
                        minHeight: "300px",
                        margin: "0px",
                      }}
                    >
                      <img
                        src={
                          mediaData?.brandLogo ? mediaData?.brandLogo : "N/A"
                        }
                        alt=""
                        width="100%"
                      />
                    </figure>
                  </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography variant="h6">Cover Image</Typography>
                  <Box className={classes.imgbox}>
                    <figure
                      style={{
                        maxHeight: "300px",
                        minHeight: "300px",
                        margin: "0px",
                      }}
                    >
                      <img
                        src={
                          mediaData?.coverImage ? mediaData?.coverImage : "N/A"
                        }
                        alt=""
                        width="100%"
                      />
                    </figure>
                  </Box>
                </Grid>
              </Grid>
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
                      onClick={() => history.push("/my-brandlist")}
                    >
                      Back
                    </Button>
                    {user?.userData?.userType === "Admin" &&
                    mediaData?.brandApproval === "PENDING" ? (
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
                          {isLoader === "approve" && <ButtonCircularProgress />}
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
                    ) : (
                      ""
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
        <div>
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
                    maxLength: 650,
                  }}
                  onChange={(e) => setFormData(e.target.value)}
                  error={isSubmit && formData === ""}
                  helperText={
                    isSubmit &&
                    formData === "" &&
                    "Please enter your rejection reason"
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

export default MyViewBrand;
