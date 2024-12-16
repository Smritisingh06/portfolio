import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { UserContext } from "src/context/User";
import Apiconfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import GavelIcon from "@material-ui/icons/Gavel";
import moment from "moment";
import GradeIcon from "@material-ui/icons/Grade";
import ShareIcon from "@material-ui/icons/Share";
import { sortAddress, calculateTimeLeft } from "src/utils";
import ShareSocialMedia from "src/component/ShareSocialMedia";
import { toast } from "react-toastify";
import Tooltip from "@material-ui/core/Tooltip";
import { changeExtenstion } from "src/utils";
const useStyles = makeStyles((theme) => ({
  exploremain: {
    "& .basecontent": {
      "& .databox": {
        borderBottom: "1px solid rgb(145 143 143 / 35%)",
        paddingBottom: "10px",
      },
      "& .buttonbox": {
        paddingTop: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
    },
  },
  root: {
    position: "relative",
    margin: "0 5px",
    background: theme.palette.background.card,
    borderRadius: "20px",
    overflow: "hidden",
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "5px",
    },
  },

  text: {
    whiteSpace: "pre",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "calc(100% - 5px)",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  mainimg: {
    width: "100%",
    height: "190px ",
    position: "relative",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "5px 5px 0px 0px",
    backgroundColor: "#ccc !important",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "10px",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0px",
    },
    "& .topcontent": {
      display: "flex",
      alignItems: "center",
      justifyContent: "end",
      margin: "15px",
      "& .topleft": {
        position: "absolute",
        left: "0",
        width: "fit-content",
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "end",
        "& p": {
          marginLeft: "5px",
          color: "#4da7f0",
          [theme.breakpoints.down("xs")]: {
            fontSize: "10px",
          },
          "& span": {
            color: "#000000",
          },
        },
        "& .Userbox": {
          display: "flex",
          alignItems: "center",
          position: "relative",
          left: "25px",
          "& figure": {
            margin: "0",
            marginLeft: "-10px",
            height: "40px",
            width: "40px",
            border: "2px solid #fff",
            borderRadius: "50%",
            overflow: "hidden",
            backgroundColor: "#101010",
            position: "relative",
            transition: "0.3s",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            [theme.breakpoints.down("xs")]: {
              height: "20px",
              width: "20px",
            },
            "&:hover": {
              zIndex: "2",
              transform: "scale(1.2)",
            },
            "& img": {
              width: "100%",
              maxWidth: "100%",
            },
          },
        },
      },
      "& .likes": {
        display: "flex",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.15)",
        borderRadius: "40px",
        width: "fit-content",
        padding: "6px 16px 6px 8px",
        "& p": {
          marginLeft: "5px",
          color: "#fff",
        },
      },
    },
    "& .bottomcontent": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      "& .timer": {
        display: "flex",
        alignItems: "center",
        width: "fit-content",

        "& h6": {
          color: "#FFFFFF",
        },
      },
    },
  },
  pricedata: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    "& h6": {
      fontSize: "14px",

      display: "flex",
      alignItems: "center",
    },
    "& img": {
      width: "31px",

      marginRight: "-6px",
    },
  },
  customizedButton: {
    position: "absolute",
    top: "0",
    right: "0",
    color: "rgb(120, 120, 120)",
  },
  iconbuttons: {
    display: "flex",
    alignItems: "center",
    "& .MuiIconButton-root": {
      background: theme.palette.background.blur,
    },
  },
}));

function AuctionCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { data, type, callbackFun } = props;

  const [open, setOpen] = useState(false);
  const user = useContext(UserContext);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const updateDimensions = () => {
    var offsetWidth = document.getElementById(
      "imagecard" + (data?._id ? data?._id : data?.nftId?._id)
    ).offsetWidth;
    var newoofsetWidth = offsetWidth - 80;
    document.getElementById(
      "imagecard" + (data?._id ? data?._id : data?.nftId?._id)
    ).style.height = newoofsetWidth + "px";
  };
  useEffect(() => {
    updateDimensions();
  }, [data, data?._id ? data?._id : data?.nftId?._id]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  if (user.userData && data?.orderId?.likesUsers) {
    var likesUsers = data?.orderId?.likesUsers?.filter(
      (order) => order === user.userData._id
    );
    var isLike = likesUsers?.length > 0;
  }

  const [favourite, setisfavourite] = useState([]);

  const favouriteNftHandler = async (id) => {
    if (user.isLogin && id) {
      try {
        const res = await axios.get(Apiconfig.favouriteUnFavouriteOrder + id, {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          toast.success(res.data.responseMessage);
          setisfavourite(res.data.result.favouriteUsers[0]);
          if (callbackFun) {
            callbackFun(id);
          }
        } else {
          toast.warn(res.data.responseMessage);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.warn("Please connect your wallet");
    }
  };

  if (user.userData && data?.orderId?.favouriteUsers) {
    var favouriteUsers = data?.orderId?.favouriteUsers?.filter(
      (order) => order === user.userData._id
    );
    var isfavourite = favouriteUsers?.length > 0;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(
        calculateTimeLeft(new Date(parseInt(data?.orderId?.expiryTime)))
      );
    }, 1000);
    return () => clearTimeout(timer);
  });
  return (
    <>
      <Box className={classes.exploremain}>
        <Paper className={classes.root}>
          <Box>
            <Box
              id={`imagecard${data?._id ? data?._id : data?.nftId?._id}`}
              className={classes.mainimg}
              style={
                data?.orderId?.nftId?.coverImage
                  ? {
                      background:
                        "url(" +
                        changeExtenstion(data?.orderId?.nftId?.coverImage) +
                        ")",
                    }
                  : {
                      background: "url(" + "images/market_detail.png" + ")",
                    }
              }
            >
              {/* for top likes and users */}

              <Box className="topcontent">
                <Box className="topleft">
                  <Box className="Userbox">
                    <Tooltip
                      title={`Created by : ${
                        data?.orderId?.userId?.name
                          ? data?.orderId?.userId?.name
                          : sortAddress(data?.orderId?.userId?.walletAddress)
                      }`}
                      placement="top-start"
                    >
                      <figure
                        onClick={() => {
                          history.push({
                            pathname: "/author",
                            search: data?.orderId?.userId?._id,
                            state: { data: data },
                          });
                        }}
                      >
                        <img
                          src={
                            data.userId?.profilePic
                              ? changeExtenstion(data.userId?.profilePic)
                              : "images/Ellipse1.png"
                          }
                          alt=""
                        />
                      </figure>
                    </Tooltip>
                    <Tooltip
                      title={`Collection : ${data.collectionId?.displayName}`}
                      placement="top-start"
                    >
                      <figure
                        onClick={() => {
                          history.push({
                            pathname: "/collection-details",
                            search: data?.collectionId?._id,
                            state: { data: data },
                          });
                        }}
                      >
                        <img
                          src={
                            data.collectionId?.collectionImage
                              ? changeExtenstion(
                                  data.collectionId?.collectionImage
                                )
                              : "images/Ellipse1.png"
                          }
                          alt="Avatars"
                        />
                      </figure>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>

              <Box className="bottomcontent"></Box>
            </Box>
            <Box className="basecontent">
              <Box p={2}>
                <Box className="databox">
                  <Box className="displaySpacebetween">
                    <Typography variant="h6" className={classes.text}>
                      {data?.orderId?.nftId?.tokenName
                        ? data?.orderId?.nftId?.tokenName
                        : data?.nftId?.tokenName}
                    </Typography>
                    <Box className={`${classes.iconbuttons} mobile_hide`}>
                      <IconButton
                        size="small"
                        style={{ marginLeft: "5px", padding: "8px" }}
                        onClick={() => setOpen(true)}
                      >
                        <ShareIcon
                          style={{ color: "#717272", fontSize: "18px" }}
                        />
                      </IconButton>
                      <IconButton
                        size="small"
                        style={{ marginLeft: "5px", padding: "8px" }}
                      >
                        <GradeIcon
                          style={
                            isfavourite
                              ? {
                                  cursor: "pointer",
                                  color: "#C71414",
                                  fontSize: "18px",
                                }
                              : {
                                  cursor: "pointer",
                                  color: "#717272",
                                  fontSize: "18px",
                                }
                          }
                          onClick={() =>
                            favouriteNftHandler(data?.orderId?._id)
                          }
                        />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box className="displaySpacebetween" mt={2}>
                    <Typography
                      variant="body1"
                      className={`${classes.text} mobile_hide`}
                    >
                      <GavelIcon style={{ fontSize: "14px" }} />
                      &nbsp;
                      {data?.price}
                    </Typography>
                    <Box className="bottomcontent">
                      <Box className="timer">
                        {parseFloat(data?.expiryTime) < moment().unix() ||
                        !data?.orderId?.expiryTime ? (
                          <Typography variant="h4">Expired</Typography>
                        ) : (
                          <Typography
                            variant="body2"
                            style={{ color: "#706b6b" }}
                            className={classes.text}
                          >
                            {timeLeft.days
                              ? timeLeft.days && timeLeft.days
                              : "00"}
                            d :{" "}
                            {timeLeft.hours
                              ? timeLeft.hours &&
                                timeLeft.hours.toString().padStart(2, "0")
                              : "00"}
                            h :{" "}
                            {timeLeft.minutes
                              ? timeLeft.minutes &&
                                timeLeft.minutes.toString().padStart(2, "0")
                              : "00"}
                            m :{" "}
                            {timeLeft.seconds
                              ? timeLeft.seconds &&
                                timeLeft.seconds.toString().padStart(2, "0")
                              : "00"}
                            s
                          </Typography>
                        )}
                        <Box pl={1}>{/* <img src="images/Flame.png" /> */}</Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className="buttonbox">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      history.push({
                        pathname: "/marketplace-Detail",
                        search: data?.orderId?._id,
                        state: { data: data },
                      });
                    }}
                  >
                    View Details
                  </Button>
                  <Box className={`${classes.pricedata} mobile_hide`}>
                    <Typography variant="h6">
                      <img src="images/favicon.png" alt="Vector Image" />
                      &nbsp;&nbsp;
                      {data?.orderId?.price ? data?.orderId?.price : "0"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Dialog
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth="xs"
              fullWidth
            >
              <DialogActions>
                <IconButton
                  onClick={() => setOpen(false)}
                  className={classes.customizedButton}
                >
                  <CloseIcon />
                </IconButton>
              </DialogActions>
              <DialogContent>
                <Box
                  className={classes.sharemodal}
                  mb={2}
                  align="center"
                  mt={3}
                >
                  <ShareSocialMedia
                    url={
                      window.location.origin +
                      "/marketplace-Detail?" +
                      data?.orderId?._id
                    }
                  />
                </Box>
              </DialogContent>
            </Dialog>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default AuctionCard;
