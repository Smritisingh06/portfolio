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
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { UserContext } from "src/context/User";
import Apiconfig from "src/ApiConfig/ApiConfig";
import ShareSocialMedia from "src/component/ShareSocialMedia";
import axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from "@material-ui/icons/Close";
import GradeIcon from "@material-ui/icons/Grade";
import ShareIcon from "@material-ui/icons/Share";
import GavelIcon from "@material-ui/icons/Gavel";
import { sortAddress, calculateTimeLeft } from "src/utils";
import { toast } from "react-toastify";
import { changeExtenstion } from "src/utils";
import SharePopper from "./SharePopper";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    // margin: "0 5px",
    // background:
    //   "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    border: "1px solid rgb(255 255 255 / 4%)",
    background: theme.palette.background.card,
    // backdropFilter: "blur(42px)",
    borderRadius: "20px",
    overflow: "hidden",
    // cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "5px",
    },
    "& .basecontent": {
      "& .databox": {
        borderBottom: "1px solid rgb(145 143 143 / 35%)",
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
          paddingTop: "9px",
        },
      },
    },
  },
  iconbuttons: {
    "& .MuiIconButton-root": {
      background: theme.palette.background.blur,
    },
  },
  text: {
    whiteSpace: "pre",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "150px",
  },

  mainimg: {
    width: "100%",
    height: "190px ",
    overflow: "hidden",
    borderRadius: "20px",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    // borderRadius: '5px 5px 0px 0px',
    backgroundColor: "#ccc !important",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0px",
    },
    "& .topleft": {
      padding: "15px",

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
    },
    "& .Userbox": {
      display: "flex",
      alignItems: "center",
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
    "& .likes": {
      display: "flex",
      alignItems: "center",
      background: "#FFFFFF",
      borderRadius: "10px",
      width: "fit-content",
      padding: "5px 8px",
      "& p": {
        marginLeft: "5px",
        color: "#000",
      },
    },

    "& .bottomcontent": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "10px",
      "& .timer": {
        display: "flex",
        alignItems: "center",
        width: "fit-content",
        background:
          "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
        border: "1px dashed #FFFFFF",
        filter: "drop-shadow(0px 0px 53px rgba(0, 0, 0, 0.25))",
        backdropFilter: "blur(42px)",
        borderRadius: "10px",
        padding: "5px 10px",
        "& h6": {
          // color: "#FFFFFF",
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
}));

function ExploreCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { data, type, callbackFun, isAuther } = props; // eslint-disable-line

  const [open, setOpen] = useState(false);
  const user = useContext(UserContext);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft()); // eslint-disable-line
  const updateDimensions = () => {
    var offsetWidth = document.getElementById(
      "imagecard" + data?._id
    ).offsetWidth;
    var newoofsetWidth = offsetWidth - 80;
    document.getElementById("imagecard" + data?._id).style.height =
      newoofsetWidth + "px";
  };
  useEffect(() => {
    updateDimensions();
  }, [data, data?._id]); // eslint-disable-line
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []); // eslint-disable-line

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
          if (callbackFun) {
            callbackFun();
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

  if (user.userData && data?.likesUsers) {
    // var likesUsers = data?.likesUsers?.filter(
    //   (order) => order === user.userData._id
    // );
    // var isLike = likesUsers?.length > 0;
  }
  if (user.userData && data?.favouriteUsers) {
    var favouriteUsers = data?.favouriteUsers?.filter(
      (order) => order === user.userData._id
    );
    var isfavourite = favouriteUsers?.length > 0;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(
        calculateTimeLeft(new Date(parseInt(data?.expiryTime) * 1000))
      );
    }, 1000);
    return () => clearTimeout(timer);
  });
  const anchorRef = React.useRef(null);
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, []);
  return (
    <>
      <Paper className={classes.root}>
        <Box
          id={`imagecard${data?._id}`}
          className={classes.mainimg}
          style={
            data?.nftId?.coverImage
              ? {
                  background:
                    "url(" + changeExtenstion(data?.nftId?.coverImage) + ")",
                  cusor: "pointer",
                }
              : {
                  background: "url(images/market_detail.png)",
                  cusor: "pointer",
                }
          }
          onClick={() => {
            if (!isAuther) {
              history.push({
                pathname: "/resale-nft",
                search: data.nftId._id,
                orderIddata: data._id,
              });
            }
          }}
        >
          {/* for top likes and users */}
          <Box>
            <Box
              className="topleft"
              // onClick={() => {
              //   if (!isAuther) {
              //     history.push({
              //       pathname: "/resale-nft",
              //       search: data.nftId._id,
              //       orderIddata: data._id,
              //     });
              //   }
              // }}
            >
              <Box className="Userbox">
                <Tooltip
                  title={`Owned by : ${
                    data?.userId?.name
                      ? data.userId?.name
                      : sortAddress(data.userId?.walletAddress)
                  }`}
                  placement="top-start"
                >
                  <figure>
                    <img
                      src={
                        data.userId?.profilePic
                          ? changeExtenstion(data.userId?.profilePic)
                          : "images/Ellipse1.png"
                      }
                      alt="Vector profilePic"
                    />
                  </figure>
                </Tooltip>
                <Tooltip
                  title={`Collection : ${data.collectionId?.displayName}`}
                  placement="top-start"
                >
                  <figure>
                    <img
                      src={
                        data.collectionId?.collectionImage
                          ? changeExtenstion(data.collectionId?.collectionImage)
                          : "images/Ellipse1.png"
                      }
                      alt="Vector collectionImage"
                    />
                  </figure>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="basecontent">
          <Box p={2}>
            <Box className="databox">
              <Grid
                container
                spacing={1}
                // onClick={() => {
                //   if (!isAuther) {
                //     history.push({
                //       pathname: "/resale-nft",
                //       search: data.nftId._id,
                //     });
                //   }
                // }}
              >
                <Grid item xs={6} sm={6} align="left">
                  <Typography
                    variant="h6"
                    color="primary"
                    className={classes.text}
                  >
                    {data?.nftId?.tokenName}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} align="right">
                  {!isAuther && (
                    <Box className={classes.iconbuttons}>
                      <IconButton
                        size="small"
                        style={{
                          marginRight: "5px",
                          padding: "8px",
                        }}
                        ref={anchorRef}
                        onClick={() => setOpen(true)}
                      >
                        <ShareIcon
                          style={{
                            fontSize: "18px",
                            color: "rgb(113, 114, 114)",
                          }}
                        />
                      </IconButton>
                      <IconButton
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
                                  color: "rgb(113, 114, 114)",
                                  fontSize: "18px",
                                }
                          }
                          onClick={() => favouriteNftHandler(data._id)}
                        />
                      </IconButton>
                    </Box>
                  )}
                </Grid>
              </Grid>

              {!isAuther && (
                <Box className="displaySpacebetween" mt={2}>
                  <Typography variant="body1" className={classes.text}>
                    <GavelIcon style={{ fontSize: "14px" }} />
                    &nbsp;
                    {data?.nftId?.bidAmount ? data?.nftId?.bidAmount : "0"}{" "}
                  </Typography>
                </Box>
              )}
            </Box>
            <Box className="buttonbox">
              {!isAuther && (
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={data?.nftId?.itemCategory === "private documents"}
                  onClick={() => {
                    history.push({
                      pathname: "/resale-nft",
                      search: data.nftId._id,
                      orderIddata: data._id,
                    });
                  }}
                >
                  Sell NFT
                </Button>
              )}
              <Box className={classes.pricedata}>
                <Typography variant="h6">
                  <img src="images/favicon.png" alt="Vector CC" />
                  &nbsp;&nbsp;
                  {data?.price}
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
            <Box className={classes.sharemodal} mb={2} align="center" mt={3}>
              <ShareSocialMedia
                url={
                  window.location.origin +
                  "/marketplace-Detail?" +
                  data?.nftId?._id
                }
              />
            </Box>
          </DialogContent>
        </Dialog>
      </Paper>
      {/*  <SharePopper
        open={open}
        anchorEl={anchorRef.current}
        placement={"top-start"}
        type={"small"}
        // key={i}
      />*/}
    </>
  );
}

export default ExploreCard;
