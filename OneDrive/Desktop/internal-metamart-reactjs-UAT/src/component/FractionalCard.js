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
import {
  FaFacebookF,
  FaInstagramSquare,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import GradeIcon from "@material-ui/icons/Grade";
import ShareIcon from "@material-ui/icons/Share";
import { Link } from "react-router-dom";
import { sortAddress, calculateTimeLeft } from "src/utils";
import ShareSocialMedia from "src/component/ShareSocialMedia";
import { toast } from "react-toastify";
import Tooltip from "@material-ui/core/Tooltip";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    margin: "0 5px",
    background:
      "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",

    borderRadius: "10px",
    overflow: "hidden",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
    },
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
        "& .iconbuttons": {
          "& .MuiIconButton-root": {
            background: theme.palette.background.blur,
          },
        },
      },
    },
  },
  text: {
    whiteSpace: "pre",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "calc(100% - 5px)",
  },
  mainimg: {
    width: "100%",
    height: "190px ",
    position: "relative",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "10px",
    backgroundColor: "#ccc !important",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: "-1",
    "& .topcontent": {
      display: "flex",
      alignItems: "center",
      justifyContent: "end",
      margin: "15px",
      "& .topleft": {
        position: "absolute",
        bottom: "-25px",
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
      // marginBottom: "10px",
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
      marginTop: " -18px",
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

function FractionalCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { data, type, callbackFun, setIsLike, setLikeLoad } = props;
  const { account, library, chainId } = useWeb3React();

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
        // if (res.data.statusCode === 200) {
        //   toast.success(res.data.responseMessage);
        //   if (callbackFun) {
        //     callbackFun();
        //   }
        // } else {
        //   toast.warn(res.data.responseMessage);
        // }
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

  const isPrivate =
    data?.itemCategory?.trim() === "private documents"
      ? data?.nftId?.recipientWalletAddress === account ||
        data?.nftId?.recipientBackupWalletAddress === account ||
        data?.userId?.walletAddress === account
        ? true
        : false
      : true;

  // let detailspage = "detailspage";

  return (
    <>
      <Paper className={classes.root}>
        <Box
          id={`imagecard${data?._id ? data?._id : data?.nftId?._id}`}
          className={classes.mainimg}
          style={
            // isPrivate
            data?.nftId?.coverImage
              ? { background: "url(" + data?.nftId?.coverImage + ")" }
              : data?.orderId?.nftId?.coverImage
              ? { background: "url(" + data?.orderId?.nftId?.coverImage + ")" }
              : { background: "url(" + "images/privateimage.jpeg" + ")" }
          }
        >
          {/* for top likes and users */}
          <Box className="topcontent">
            <Box className="topleft">
              <Box className="Userbox">
                <Tooltip
                  title={`Created by : ${
                    data?.userId?.name
                      ? data?.userId?.name
                      : sortAddress(data?.userId?.walletAddress)
                  }`}
                  placement="top-start"
                >
                  <figure
                    onClick={() => {
                      history.push({
                        pathname: "/author",
                        search: data?.userId?._id,
                        state: { data: data },
                      });
                    }}
                  >
                    <img
                      src={
                        data.nftId?.userId?.profilePic
                          ? data.nftId?.userId?.profilePic
                          : "images/Ellipse1.png"
                      }
                    />
                  </figure>
                </Tooltip>

                {data?.nftId?.physicalType === "MULTIPLE" && (
                  <>
                    <Tooltip
                      title={`Brands : ${data?.brandId?.brandName}`}
                      placement="top-start"
                    >
                      <figure
                        onClick={() => {
                          history.push({
                            pathname: "/brands-details",
                            search: data?.brandId?._id,
                            state: { data: data },
                          });
                        }}
                      >
                        <img
                          src={
                            data?.brandId?.brandLogo
                              ? data?.brandId?.brandLogo
                              : "images/Ellipse1.png"
                          }
                        />
                      </figure>
                    </Tooltip>
                  </>
                )}
                {data?.nftId?.isMultiple === true ? (
                  <>
                    <Tooltip
                      title={`Brands : ${data?.nftId?.brandId?.brandName}`}
                      placement="top-start"
                    >
                      <figure
                        onClick={() => {
                          history.push({
                            pathname: "/brands-details",
                            search: data?.nftId?.brandId?._id,
                            state: { data: data },
                          });
                        }}
                      >
                        <img
                          src={
                            data?.nftId?.brandId?.brandLogo
                              ? data?.nftId?.brandId?.brandLogo
                              : "images/Ellipse1.png"
                          }
                        />
                      </figure>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    {data?.nftId?.physicalType === "SINGLE" && (
                      <>
                        <Tooltip
                          title={`Collection : ${data.collectionId?.displayName}`}
                          placement="top-start"
                        >
                          <figure
                            onClick={() => {
                              history.push({
                                pathname: "/physicalcollection-details",
                                search: data?.collectionId?._id,
                                state: { data: data },
                              });
                            }}
                          >
                            <img
                              src={
                                data.collectionId?.collectionImage
                                  ? data.collectionId?.collectionImage
                                  : "images/Ellipse1.png"
                              }
                            />
                          </figure>
                        </Tooltip>
                      </>
                    )}
                  </>
                )}
              </Box>
              {data?.nftId?.isPlace && (
                <Box className="bottomcontent">
                  <Box
                    className={
                      parseFloat(expirytime) < moment().unix() || !expirytime
                        ? "timer1"
                        : "timer"
                    }
                  >
                    {parseFloat(expirytime) < moment().unix() || !expirytime ? (
                      // <Typography variant="h4">On Marketplace</Typography>
                      ""
                    ) : (
                      <Typography
                        variant="body2"
                        style={{ color: "#706b6b" }}
                        className={classes.text}
                      >
                        {timeLeft.days ? timeLeft.days && timeLeft.days : "00"}d
                        :{" "}
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
              )}
            </Box>
          </Box>
          {/* for Timer content */}

          {/* <Box
            style={{ position: "absolute", padding: "1px 11px" }}
            className="physicalstyle"
          >
            <Typography variant="body2" className="textphysical">
              Physical
            </Typography>
          </Box> */}
        </Box>
        <Box
          className="basecontent"
          // onClick={() => {
          //   history.push({
          //     pathname: "/resale-nft",
          //     search: data._id,
          //   });
          // }}
        >
          <Box style={{ padding: "30px 16px 16px" }}>
            <Box className="databox">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} align="left">
                  <Typography
                    variant="h6"
                    className={classes.text}
                    onClick={() => {
                      history.push({
                        pathname: "/phymarketplace-Detail",
                        search: data?._id,
                        state: {
                          data: data,
                        },
                      });
                    }}
                  >
                    {data?.tokenName ? data?.tokenName : data?.nftId?.tokenName}
                  </Typography>
                </Grid>
                {/* <Grid item xs={6} sm={6} align="right">
                  <Typography variant="body1" className={classes.text}>
                    {data.stock}
                  </Typography>
                </Grid> */}
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={6} sm={6} align="left">
                  <Box>
                    {data?.nftId?.physicalType === "MULTIPLE" ? (
                      ""
                    ) : (
                      <>
                        {" "}
                        <Typography variant="body1" className={classes.text}>
                          <GavelIcon style={{ fontSize: "14px" }} />
                          &nbsp;
                          {data?.nftId?.bidAmount
                            ? data?.nftId?.bidAmount
                            : "0"}{" "}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6} align="right">
                  <Box className={classes.pricedata}>
                    <Typography variant="h6">
                      <img src="images/qi.svg" alt="Vector Image" />
                      &nbsp;&nbsp;
                      {data?.price}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box className="buttonbox">
              <Button
                style={{ whiteSpace: "pre" }}
                variant="contained"
                size="large"
                color="primary"
                onClick={() => {
                  history.push({
                    pathname: "/phymarketplace-Detail",
                    search: data._id,
                    state: {
                      data: data,
                    },
                  });
                }}
              >
                View Details
              </Button>
              <Box className="iconbuttons" display="flex">
                <IconButton
                  size="small"
                  style={{
                    marginLeft: "5px",
                    padding: "8px",
                  }}
                  onClick={() => setOpen(true)}
                >
                  <ShareIcon style={{ color: "#717272", fontSize: "18px" }} />
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
                            color: "#717272",
                            fontSize: "18px",
                          }
                    }
                    onClick={() => favouriteNftHandler(data?._id)}
                  />
                </IconButton>
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
          {/* <DialogTitle id="alert-dialog-title">{"Share Post"}</DialogTitle> */}
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
              <ShareSocialMedia url={window.location} />
              {/* <Button>
                <Box>
                  <FaFacebookF style={{ fontSize: "30px" }} /> <br />
                  Facebook
                </Box>
              </Button>
              <Button>
                <Box>
                  <MdEmail style={{ fontSize: "30px" }} /> <br />
                  E-mail
                </Box>
              </Button>
              <Button>
                <Box>
                  <FaTelegramPlane style={{ fontSize: "30px" }} /> <br />
                  Teligram
                </Box>
              </Button>
              <Button>
                <Box>
                  {" "}
                  <FaTwitter style={{ fontSize: "30px" }} /> <br />
                  Twitter
                </Box>
              </Button> */}
            </Box>
          </DialogContent>
        </Dialog>
      </Paper>
    </>
  );
}

export default FractionalCard;
