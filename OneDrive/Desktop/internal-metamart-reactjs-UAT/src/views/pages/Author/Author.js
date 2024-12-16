import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  IconButton,
  TextField,
  Paper,
  Hidden,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Apiconfig from "src/ApiConfig/ApiConfig";
import * as Yup from "yup";
import React, { useState, useContext, useEffect } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Formik } from "formik";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import ApiConfig from "src/ApiConfig/ApiConfig";
import Owned from "./Owned";
import OnSale from "./OnSale";
import * as yup from "yup";
import axios from "axios";
import ShareSocialMedia from "src/component/ShareSocialMedia";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import { sortAddress, changeExtenstion } from "src/utils";
import CopyToClipboard from "react-copy-to-clipboard";
import { useLocation } from "react-router-dom";
import { UserContext } from "src/context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import { TfiWorld } from "react-icons/tfi";
import Ownednft from "../Author/Ownednft";
import UserActivity from "./UserActivity";
// import { changeExtenstion, } from "src/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0px",
  },
  customizedButton: {
    position: "absolute",
    top: "0",
    right: "0",
    color: "rgb(120, 120, 120)",
  },
  bannerimg: {
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundRepeat: " no-repeat !important",
    backgroundSize: "100% !important",
    height: "260px",
    borderRadius: "10px",
    position: "relative",
    margin: "0px",
    "@media(max-width:1010px)": {
      height: "140px",
      borderRadius: "10px",
    },
    "& img": {
      minHeight: "100%",
      minWidth: "100%",
      height: "auto",
      width: "auto",
    },
  },
  text1: {
    "& h4": {
      fontSize: "30px",
      lineHeight: "130%",
      paddingTop: "10px",
      "@media(max-width:1010px)": {
        fontSize: "30px",
      },
      "@media(max-width:930px)": {
        fontSize: "25px",
      },
    },
    "& h5": {
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
      // color: "rgba(0, 0, 0, 0.5)",
      wordBreak: "break-all",
      "@media(max-width:930px)": {
        fontSize: "11px !important",
        fontWeight: "300",
      },
    },
  },
  btnbox1: {
    display: " flex",
    justifyContent: "space-between",
    alignItems: "center",

    "& button": {
      fontWeight: "400",
      fontSize: "14px",
      height: "40px",
      minWidth: "85px",
      borderRadius: "10px",
      marginRight: " 12px",
      color: theme.palette.primary.main,
      "&.active": {
        background: theme.palette.background.tab,
        color: "#fff",
      },
    },
  },
  btnfollow: {
    borderRadius: "10px",
    // "& Button": { borderRadius: "10px", margin: "0px" },
    "& button": {
      fontWeight: "400",
      fontSize: "14px",
      height: "40px",
      minWidth: "85px",
      borderRadius: "10px",
      marginRight: " 12px",
      color: theme.palette.primary.main,
      "&.active": {
        background: theme.palette.background.tab,
        color: "#fff",
      },
    },
    "& .active": {},
    "& .IconButton": {
      borderRadius: "10px",
    },
  },
  btnfollow2: {
    // backdropFilter: "blur(24px)",
    border: "1px solid #d5d7d945",
    borderRadius: "10px",
    margin: "0px 5px",
    padding: "15px 15px",
    height: "40px",
    "@media(max-width:818px)": {
      padding: "6px 16px",
    },
    "& svg": {
      color: theme.palette.primary.main,
    },
  },

  headbox2: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    marginBottom: "15px",
    "@media(max-width:767px)": {
      display: "block",
      padding: "0 10px",
    },
  },
  btnhead: {
    display: "flex",

    right: "0",
    bottom: "0",
    alignItems: "center",
    background: theme.palette.background.profileBtn,
    padding: "5px 5px 0px",
    borderRadius: "10px 10px 0px 0px",
    marginRight: "56px",
    [theme.breakpoints.down("xs")]: {
      background: "none",
    },
  },
  profileimg: {
    marginTop: "-75px",
    overflow: "hidden",
    display: "flex",
    background: "#fef7fa",
    position: "relative",
    zIndex: "1",
    backgroundPosition: "center !important",
    backgroundSize: "100% !important",
    backgroundRepeat: " no-repeat !important",
    width: "175px",
    height: "175px",
    border: "7px solid",
    borderColor: theme.palette.background.profileBtn,
    borderRadius: "50%",

    "@media(max-width:1010px)": {
      marginTop: "-100px",
      width: "110px",
      height: "110px",
    },
    "@media(max-width:800px)": {
      margin: "-65px 20px 0px 0px",
      width: "110px",
      height: "110px",
    },
    "& img": {
      minHeight: "100%",
      minWidth: "100%",
      height: "auto",
      width: "auto",
    },
  },
  file: {
    padding: "10px 10px 10px 10px",
    borderRadius: "50%",
    "& svg": {
      color: "#4ea6f5",
    },
  },
  address: {
    display: "flex",
    alignItems: "center",
    "& h6": {
      color: theme.palette.secondary.main,
      fontWeight: "bold",
    },
  },
  formControl: {
    "& .MuiSelect-icon": {
      color: theme.palette.primary.main,
    },
  },
}));

export default function Author() {
  const user = useContext(UserContext);
  const [openShare, setOpenShare] = useState(false);
  const [openReport, SetOpenReport] = useState(false);
  const location = useLocation();
  const [tabview, setTabView] = useState("OnSale");
  const [isLoadingData, setIsLoadingData] = useState(true);
  const classes = useStyles();
  const [isActive, setActive] = useState(false);
  const [isActive1, setActive1] = useState(false);
  const [onOwnedCount, setOnOwnedCount] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [onSaleList, setOnSaleList] = useState([]);
  const [userId, setUserId] = useState();
  const [idd, setIdd] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [soldNft, setSoldNft] = useState([]);

  const forAllNftHandler = async (id) => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfig.nftSoldCount + id,
      });
      if (res) {
        setSoldNft(res.data.result);
        // setIsLoading(false);
      } else {
        // setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (location.search && location.search.length > 0) {
      const ids = location.search.split("?");
      if (ids[1]) {
        setUserId(ids[1]);
        forAllNftHandler(ids[1]);
      }
    }
  }, [location]);

  const formInitialSchema = { formData: "" };
  const formValidationSchema = yup
    .object()
    .shape({ formData: Yup.string().required("Please Enter Message field") });

  useEffect(() => {
    if (location.search.substring(1, location.search.length)) {
      const id = location.search.substring(1, location.search.length);
      setIdd(id);
    }
  }, [location.search, idd]);

  const toggleClass = () => {
    setActive(!isActive);
  };
  const toggleClass1 = () => {
    setActive1(!isActive1);
  };
  const getProfileHandler = async (id, cancelTokenSource) => {
    try {
      const res = await axios.get(Apiconfigs.getUserDetails + id, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
      });

      if (res.data.statusCode === 200) {
        setProfileData(res.data.result[0]);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const userReportHandler = async (values) => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "POST",
        url: Apiconfigs.userReports,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          userId: userId,
          message: values.formData,
        },
      });
      if (res.data.statusCode === 200) {
        toast.success("You report this user successfully");
        SetOpenReport(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
    }
  };

  //owned
  const userOwnedCountHAndler = async (id) => {
    try {
      const res = await axios.get(ApiConfig.userOwendCount + id, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setOnOwnedCount(res.data.result);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const followUnfollowHandler = async (id) => {
    if (user.isLogin) {
      try {
        const res = await axios.get(ApiConfig.followUnfollow + id, {
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          toast.success(res.data.responseMessage);
          updateDatahandler(userId);
        } else {
          toast.warn(res.data.responseMessage);
        }
      } catch (error) {
        console.log("ERRROR", error);
        toast.error(error.message);
      }
    } else {
      toast.warn("Please connect your wallet");
    }
  };
  const getFollowersCountsApiData = async (id, cancelTokenSource) => {
    try {
      const res = await axios.get(ApiConfig.userFollowerCount + id, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
      });
      if (res.status === 200) {
        if (user.userData) {
          const resArr = res.data.result.followers.filter(
            (data) => data._id === user.userData._id
          );
          setIsFollowing(resArr.length > 0 ? true : false);
        }
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  //sale
  const userOnSaleCountHandler = async (id, cancelTokenSource) => {
    try {
      const res = await axios.get(ApiConfig.userOnSaleCount + id, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
      });

      if (res.data.statusCode === 200) {
        setOnSaleList(res.data.result.docs);
      }
      setIsLoadingData(false);
    } catch (error) {
      setIsLoadingData(false);

      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    if (userId) {
      getProfileHandler(userId, cancelTokenSource);
      userOnSaleCountHandler(userId, cancelTokenSource);
      getFollowersCountsApiData(userId, cancelTokenSource);
      userOwnedCountHAndler(userId);
    }
    return () => {
      cancelTokenSource.cancel();
    };
  }, [userId, user.userData]);
  const updateDatahandler = async () => {
    if (userId) {
      getProfileHandler(userId);
      userOnSaleCountHandler(userId);
      getFollowersCountsApiData(userId);
    }
  };

  useEffect(() => {
    setOnOwnedCount([]);
    setOnSaleList([]);
  }, []);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    if (userId) {
      getProfileHandler(userId, cancelTokenSource);
    }
    return () => {
      cancelTokenSource.cancel();
    };
  }, [userId, user.userData]);

  const [isValid, setIsValid] = React.useState(false);
  function isImageUrlValid(url) {
    const img = new Image();
    img.onload = function () {
      setIsValid(true);
    };
    img.onerror = function () {
      setIsValid(false);
    };
    img.src = url;
  }
  useEffect(() => {
    isImageUrlValid(profileData?.coverPic);
  }, [profileData?.coverPic]);
  return (
    <Box className={classes.root}>
      <Container maxWidth="lg">
        <figure className={classes.bannerimg}>
          <img
            src={isValid ? profileData?.coverPic : "/images/BannerImg.png"}
            alt="bannerimg"
          />
        
          <Hidden xsDown>
            <Box className={classes.btnhead} style={{ position: "absolute" }}>
              {user?.userData?._id !== userId && (
                <Box className={classes.btnfollow}>
                  <Button
                    // variant="contained"
                    // size="large"
                    // color="primary"
                    variant="h6"
                    className="active"
                    onClick={() => followUnfollowHandler(userId)}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </Button>
                </Box>
              )}
              <IconButton
                className={classes.btnfollow2}
                onClick={() => SetOpenReport(true)}
              >
                <AiOutlineInfoCircle />
              </IconButton>
              <IconButton
                className={classes.btnfollow2}
                onClick={() => setOpenShare(true)}
              >
                <FiShare2 />
              </IconButton>

              {profileData?.twitterUsername && (
                <IconButton className={classes.btnfollow2}>
                  <FaTwitter
                    onClick={() => window.open(profileData?.twitterUsername)}
                  />
                </IconButton>
              )}
              {profileData?.facebook && (
                <IconButton className={classes.btnfollow2}>
                  <FaFacebook
                    onClick={() => window.open(profileData?.facebook)}
                  />
                </IconButton>
              )}
              {profileData?.personalSite && (
                <IconButton className={classes.btnfollow2}>
                  <TfiWorld
                    onClick={() => window.open(profileData?.personalSite)}
                  />
                </IconButton>
              )}
            </Box>
          </Hidden>
        </figure>
        <Box className={classes.headbox2}>
          <Box style={{ display: "flex", flexWrap: "wrap" }}>
            <figure className={classes.profileimg}>
              <img
                src={
                  profileData?.profilePic
                    ? profileData?.profilePic
                    : "/images/Profile.png"
                }
                alt=""
              />
            </figure>
            <Box className={classes.text1}>
              <Typography variant="h4" color="primary">
                {" "}
                {profileData?.name ? profileData?.name : ""}
              </Typography>
              <Typography variant="h5" color="primary">
                {profileData?.userName}
              </Typography>
              <Typography variant="h5" color="primary">
                {profileData?.bio}
              </Typography>
              <Box className={classes.address}>
                <Typography variant="body2" color="primary">
                  {" "}
                  {sortAddress(profileData?.walletAddress)}&nbsp;
                </Typography>
                <CopyToClipboard text={profileData?.walletAddress}>
                  <IconButton>
                    <img
                      src="/images/copyicon.png"
                      alt="hghgh"
                      style={{ cursor: "pointer", fontSize: "18px",
                        filter: "grayscale(100%) brightness(1000%) contrast(100%)",
                       }}
                      onClick={() => toast.info("Copied")}
                    />
                  </IconButton>
                </CopyToClipboard>
              </Box>
            </Box>
          </Box>
          <Hidden smUp>
            <Box className={classes.btnhead}>
              <Box className={classes.btnfollow}>
                <Button
                  // variant="contained"
                  // size="large"
                  // color="primary"
                  variant="h6"
                  className="active"
                  onClick={() => followUnfollowHandler(userId)}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
              </Box>{" "}
              <IconButton
                className={classes.btnfollow2}
                onClick={() => SetOpenReport(true)}
              >
                <AiOutlineInfoCircle />
              </IconButton>
              <IconButton
                className={classes.btnfollow2}
                onClick={() => setOpenShare(true)}
              >
                <FiShare2 />
              </IconButton>
              {profileData?.twitterUsername && (
                <IconButton className={classes.btnfollow2}>
                  <FaTwitter
                    onClick={() => window.open(profileData?.twitterUsername)}
                  />
                </IconButton>
              )}
              {profileData?.facebook && (
                <IconButton className={classes.btnfollow2}>
                  <FaFacebook
                    onClick={() => window.open(profileData?.facebook)}
                  />
                </IconButton>
              )}
            </Box>
          </Hidden>
        </Box>
        <Paper elevation={2} className={classes.btnbox1}>
          <Box>
            <Button
              variant="h6"
              className={tabview === "OnSale" ? "active" : " "}
              onClick={() => setTabView("OnSale")}
            >
              On sale
            </Button>
            <Button
              className={tabview === "Owned" ? "active" : " "}
              onClick={() => setTabView("Owned")}
            >
              Owned
            </Button>
            <Button
              className={tabview === "sold" ? "active" : " "}
              onClick={() => setTabView("sold")}
            >
              Sold NFT
            </Button>
            {user.userData && user.userData?.userType !== "User" && (
              <Button
                className={tabview === "userActivity" ? "active" : " "}
                onClick={() => setTabView("userActivity")}
              >
                User Activity
              </Button>
            )}
          </Box>

          <Box></Box>
        </Paper>

        {isLoadingData ? (
          <Box
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <ButtonCircularProgress />
          </Box>
        ) : (
          <Box mt={3}>
            {tabview === "Owned" && <Owned onOwnedCount={onOwnedCount} />}
            {tabview === "userActivity" && <UserActivity userId={userId} />}
            {tabview === "OnSale" && (
              <OnSale onSaleList={onSaleList} callbackFun={updateDatahandler} />
            )}
            {tabview === "sold" && (
              <Ownednft
                nftList={soldNft}
                callbackFun={updateDatahandler}
                changeExtenstion={changeExtenstion}
                isLoading={isLoading}
                isAuther={true}
              />
            )}
          </Box>
        )}

        <Dialog
          open={openShare}
          onClose={() => setOpenShare(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xs"
        >
          <DialogActions>
            <IconButton
              onClick={() => setOpenShare(false)}
              className={classes.customizedButton}
            >
              <CloseIcon />
            </IconButton>
          </DialogActions>
          <DialogContent className={classes.padding0}>
            <Box className={classes.sharemodal} mb={2} align="center" mt={3}>
              <ShareSocialMedia url={window.location} />
            </Box>
          </DialogContent>
        </Dialog>
        <Dialog
          open={openReport}
          onClose={() => SetOpenReport(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          classes={{ paper: classes.paper }}
          maxWidth="xs"
        >
          <DialogActions>
            <IconButton
              onClick={() => SetOpenReport(false)}
              className={classes.customizedButton}
            >
              <CloseIcon />
            </IconButton>
          </DialogActions>
          <DialogContent className={classes.padding0}>
            <Box mb={3}>
              <Typography variant="h5" color="primary">
                Why are you reporting?
              </Typography>
              <Typography
                variant="body2"
                style={{ fontSize: "12px" }}
                color="primary"
              >
                Describe why you think this user should be removed from
                marketplace
              </Typography>

              <Formik
                initialValues={formInitialSchema}
                initialStatus={{
                  success: false,
                  successMsg: "",
                }}
                validationSchema={formValidationSchema}
                onSubmit={(values) => userReportHandler(values)}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box className={classes.maintext}>
                      <Grid container spacing={2}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                          <Box mt={2}>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              error={Boolean(
                                touched.formData && errors.formData
                              )}
                              helperText={touched.formData && errors.formData}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.formData}
                              name="formData"
                              placeholder="Tell us some details..."
                              type="text"
                              fullWidth
                              multiline
                              rowsMax={5}
                              rows={5}
                              inputProps={{
                                maxLength: 600,
                              }}
                            />
                          </Box>
                        </Grid>

                        <Box mt={2} align="right">
                          <Button
                            disabled={isLoading}
                            type="submit"
                            variant="contained"
                            color="primary"
                            // onClick={() => userReportHandler()}
                          >
                            Report {isLoading && <ButtonCircularProgress />}
                          </Button>
                          <Button
                            variant="outlined"
                            style={{ marginLeft: "10px" }}
                            onClick={() => SetOpenReport(false)}
                            color="primary"
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Grid>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}
