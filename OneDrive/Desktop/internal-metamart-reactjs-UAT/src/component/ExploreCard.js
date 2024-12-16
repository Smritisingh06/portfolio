/** @format */

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
import { useWeb3React } from "@web3-react/core";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { UserContext } from "src/context/User";
import Apiconfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import GavelIcon from "@material-ui/icons/Gavel";
import moment from "moment";
import { FcLike } from "react-icons/fc";
import GradeIcon from "@material-ui/icons/Grade";
import ShareIcon from "@material-ui/icons/Share";
import { sortAddress, calculateTimeLeft } from "src/utils";
import ShareSocialMedia from "src/component/ShareSocialMedia";
import { toast } from "react-toastify";
import Tooltip from "@material-ui/core/Tooltip";
import { changeExtenstion } from "src/utils";
import SharePopper from "./SharePopper";
const useStyles = makeStyles((theme) => ({
  explorecardBox: {
    position: "relative",
    margin: "0 5px",
    background: theme.palette.background.card,
    borderRadius: "20px",
    overflow: "hidden",
    cursor: "pointer",
    border: "1px solid rgb(255 255 255 / 4%)",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "5px",
    },
    "& .topcontent": {
      display: "flex",
      position: "relative",
      alignItems: "end",
      justifyContent: "space-between",
      padding: "15px",
      marginTop: "-40px",
    },

    "& .basecontent": {
      "& .databox": {
        borderBottom: "1px solid rgb(145 143 143 / 35%)",
        paddingBottom: "5px",
        [theme.breakpoints.down("xs")]: {
          borderBottom: "none",
        },
      },
      "& .buttonbox": {
        paddingTop: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        [theme.breakpoints.down("xs")]: {
          paddingTop: "5px",
        },
      },
    },
  },
  text: {
    whiteSpace: "pre",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "calc(100% - 135px)",
    color: theme.palette.primary.main,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    "& span": {
      color: "rgb(145 143 143)",
    },
  },
  mainimg: {
    width: "100%",
    height: "190px ",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    backgroundColor: "#ccc !important",
    position: "relative",
    borderRadius: "20px",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0px",
    },
    "& .nftLike": {
      display: "flex",
      alignItems: "center",
      background: "rgba(0, 0, 0, 0.15)",
      borderRadius: "40px",
      width: "fit-content",
      padding: "6px 16px 6px 8px",
      [theme.breakpoints.down("xs")]: {
        padding: "1px 12px 0px 8px",
      },
      "& p": {
        marginLeft: "5px",
        color: "#000",
      },
    },
    "& .topleft": {
      padding: "5px 15px",

      "& p": {
        marginLeft: "5px",
        color: "rgb(145, 143, 143)",
        [theme.breakpoints.down("xs")]: {
          fontSize: "10px",
        },
        "& span": {
          color: "#000000",
        },
      },
    },
    "& .Userbox": {
      display: "flex",
      alignItems: "center",
      "& figure": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0",
        marginLeft: "-10px",
        height: "40px",
        width: "40px",
        borderRadius: "50%",
        overflow: "hidden",
        backgroundColor: "#101010",
        position: "relative",
        transition: "0.3s",
        cursor: "pointer",
        border: " 2px solid #fff",
        [theme.breakpoints.down("xs")]: {
          height: "20px",
          width: "20px",
        },
        "&:first-child": {
          marginLeft: "0px",
        },
        "&:hover": {
          zIndex: "2",
          transform: "scale(1.2)",
        },
        "& img": {
          width: "auto",
          maxWidth: "100%",
          maxHeight: "41px",
        },
      },
    },
    "& .top content": {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      margin: "15px",
      padding: "0px",
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
  },
  pricedata: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    "& h6": {
      fontSize: "14px",
      color: theme.palette.primary.main,
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
    top: "0px",
    right: "0px",
    color: "rgb(120, 120, 120)",
  },
  iconbuttons: {
    "& .MuiIconButton-root": {
      background: theme.palette.background.blur,
    },
  },
}));

function ExploreCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { data, type, callbackFun, setIsLike, setLikeLoad } = props;

  let id1 = data._id;
  const [open, setOpen] = useState(false);

  const [openShare, setOpenShare] = useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpenShare((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenShare(false);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, []);

  const user = useContext(UserContext);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // const updateDimensions = () => {
  //   var offsetWidth = document.getElementById(
  //     "imagecard" + (data?._id ? data?._id : data?.nftId?._id)
  //   ).offsetWidth;
  //   var newoofsetWidth = offsetWidth - 50;
  //   document.getElementById(
  //     "imagecard" + (data?._id ? data?._id : data?.nftId?._id)
  //   ).style.height = newoofsetWidth + "px";
  // };
  const updateDimensions = () => {
    const elementId = "imagecard" + (data?._id ? data?._id : data?.nftId?._id);
    const element = document.getElementById(elementId);

    if (element) {
      const offsetWidth = element.offsetWidth;
      const newOffsetWidth = offsetWidth - 50;
      element.style.height = newOffsetWidth + "px";
    }
  };
  useEffect(() => {
    updateDimensions();
  }, [data, data?._id ? data?._id : data?.nftId?._id]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  if (user.userData && data?.likesUsers) {
    var likesUsers = data?.likesUsers?.filter(
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

  if (user.userData && data?.favouriteUsers) {
    var favouriteUsers = data?.favouriteUsers?.filter(
      (order) => order === user.userData._id
    );
    var isfavourite = favouriteUsers?.length > 0;
  }

  const expirytime = data?.expiryTime
    ? data?.expiryTime
    : data?.orderId?.expiryTime
    ? data?.orderId?.expiryTime
    : null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(new Date(parseInt(expirytime))));
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <>
      <Box>
        <Paper elevation="0" className={classes.explorecardBox}>
          <>
            <Box
              id={`imagecard${data?._id ? data?._id : data?.nftId?._id}`}
              className={classes.mainimg}
              style={
                // isPrivate

                data?.nftId?.coverImage
                  ? {
                      background:
                        "url(" +
                        changeExtenstion(data?.nftId?.coverImage) +
                        ")",
                    }
                  : changeExtenstion(data?.orderId?.nftId?.coverImage)
                  ? {
                      background:
                        "url(" +
                        changeExtenstion(data?.orderId?.nftId?.coverImage) +
                        ")",
                    }
                  : {
                      background: "url(" + "images/privateimage.jpeg" + ")",
                    }
              }
            >
              {/* for top likes and users */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                className="topleft"
              >
                <Box className="Userbox">
                  <Tooltip
                    title={`Created by : ${
                      data.nftId?.userId?.name
                        ? data?.nftId?.userId?.name
                        : sortAddress(data.nftId?.userId?.walletAddress)
                    }`}
                    placement="top-start"
                  >
                    <figure
                      onClick={() => {
                        history.push({
                          pathname: "/author",
                          search: data?.nftId.userId?._id,
                          state: { data: data },
                        });
                      }}
                    >
                      <img
                        src={
                          data.nftId?.userId?.profilePic
                            ? changeExtenstion(data.nftId?.userId?.profilePic)
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
                        alt=""
                      />
                    </figure>
                  </Tooltip>
                </Box>
                <IconButton
                  size="small"
                  style={{
                    marginLeft: "5px",
                    padding: "8px",
                    background: "#00000030",
                  }}
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
                    onClick={() => favouriteNftHandler(data?._id)}
                  />
                </IconButton>
              </Box>

              {/* for Timer content */}
            </Box>
            <Box className="basecontent">
              <Box p={2}>
                <Box className="databox">
                  <Box className="displaySpacebetween ">
                    <Typography
                      variant="h6"
                      className={classes.text}
                      style={{
                        fontFamily: "'ClashDisplay-Regular', sans-serif",
                      }}
                      onClick={() => {
                        history.push({
                          pathname: "/marketplace-Detail",
                          search: data?._id,
                          state: {
                            data: data,
                          },
                        });
                      }}
                    >
                      {data?.tokenName
                        ? data?.tokenName
                        : data?.nftId?.tokenName}
                    </Typography>
                    <Box
                      className={`${classes.iconbuttons} mobile_hide`}
                      display="flex"
                    >
                      <IconButton
                        size="small"
                        style={{
                          marginLeft: "5px",
                          padding: "8px",
                        }}
                        onClick={handleToggle}
                        ref={anchorRef}
                      >
                        <ShareIcon
                          style={{ color: "#717272", fontSize: "18px" }}
                        />
                      </IconButton>
                      {/* <IconButton
                        size="small"
                        style={{
                          marginLeft: "5px",
                          padding: "8px",
                        }}
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
                          onClick={() => favouriteNftHandler(data?._id)}
                        />
                      </IconButton> */}
                    </Box>
                  </Box>

                  <Box mt={1} className="displaySpacebetween mobile_block">
                    <Typography
                      variant="body1"
                      className={`${classes.text} mobile_hide`}
                    >
                      <GavelIcon style={{ fontSize: "14px" }} />
                      &nbsp;{" "}
                      <span>
                        {data?.nftId?.bidAmount ? data?.nftId?.bidAmount : "0"}{" "}
                      </span>
                    </Typography>
                    <Box>
                      {data?.nftId?.isPlace && (
                        <Box
                          className={
                            parseFloat(expirytime) < moment().unix() ||
                            !expirytime
                              ? "timer1"
                              : "timer"
                          }
                        >
                          {parseFloat(expirytime) < moment().unix() ||
                          !expirytime ? (
                            ""
                          ) : (
                            <Typography
                              variant="body1"
                              style={{ color: "#706b6b" }}
                            >
                              {timeLeft.days
                                ? timeLeft.days &&
                                  timeLeft.days.toString().padStart(2, "0")
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
                          <Box pl={1}></Box>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
                <Box className=" displaySpacebetween buttonbox mobile_block">
                  <Button
                    style={{ whiteSpace: "pre" }}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      history.push({
                        pathname: "/marketplace-Detail",
                        search: data._id,
                        state: {
                          data: data,
                        },
                      });
                    }}
                  >
                    View Details
                  </Button>
                  <Box className={`${classes.pricedata} mobile_hide`}>
                    <Typography
                      variant="h6"
                      style={{ color: "rgb(145 143 143)" }}
                    >
                      <img src="images/favicon.png" alt="Vector Image" />
                      &nbsp;&nbsp;
                      {data?.price}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </>
          <SharePopper
            open={openShare}
            anchorEl={anchorRef.current}
            placement={"top-end"}
            type={"small"}
            // key={i}
          />
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
              <Box className={classes.sharemodal} mb={2} align="center" mt={3}>
                <ShareSocialMedia
                  url={
                    window.location.origin + "/marketplace-Detail?" + data?._id
                  }
                />
              </Box>
            </DialogContent>
          </Dialog>
        </Paper>
      </Box>
    </>
  );
}

export default ExploreCard;
