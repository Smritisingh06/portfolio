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

import FavoriteIcon from "@material-ui/icons/Favorite";
import { UserContext } from "src/context/User";
import Apiconfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import GavelIcon from "@material-ui/icons/Gavel";
import { RiNumbersFill } from "react-icons/ri";
import moment from "moment";
import {
  FaFacebookF,
  FaInstagramSquare,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import CloseIcon from "@material-ui/icons/Close";
import GradeIcon from "@material-ui/icons/Grade";
import ShareIcon from "@material-ui/icons/Share";
import { Link } from "react-router-dom";
import { sortAddress, calculateTimeLeft } from "src/utils";
import ShareSocialMedia from "src/component/ShareSocialMedia";
import { toast } from "react-toastify";
import Tooltip from "@material-ui/core/Tooltip";
import { changeExtenstion } from "src/utils";
import SharePopper from "./SharePopper";
const useStyles = makeStyles((theme) => ({
  exploremain: {
    "& .root1": {
      position: "relative",
      margin: "0 5px",
      background:
        "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
      boxShadow:
        "1px 3px 2px -1px #ff5d0c, 0px 1px 0px 0px #ff5d0c, 0px 1px 3px 0px #ff5d0c",
      // backdropFilter: 'blur(42px)',
      borderRadius: "10px",
      overflow: "hidden",
      cursor: "pointer",
      // "&:hover": {
      //   boxShadow:
      //     "1px 3px 2px -1px #ff5d0c, 0px 1px 0px 0px #ff5d0c, 0px 1px 3px 0px #ff5d0c",
      //   filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
      //   background: "#fff",
      // },
    },
    "& .root": {
      position: "relative",
      margin: "0 5px",
      // background:
      //   "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
      border: "1px solid rgb(255 255 255 / 4%)",
      background: theme.palette.background.card,
      // backdropFilter: "blur(42px)",
      borderRadius: "20px",
      overflow: "hidden",
      cursor: "pointer",
      transition: "0.5s",
      // "&:hover": {
      //   boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      //   filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
      //   background: "#fff",
      // },
    },
    "& .basecontent": {
      "& .databox": {
        borderBottom: "1px solid rgb(145 143 143 / 35%)",
        paddingBottom: "5px",
        "& .displaySpacebetween": {
          "& h6": {
            whiteSpace: "pre",
            textOverflow: "ellipsis",
            overflow: "hidden",
            width: "120px",
          },
        },
      },
      "& .buttonbox": {
        paddingTop: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
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
    width: "calc(100% - 5px)",
    color: "#000",
  },
  mainimg: {
    width: "100%",
    height: "190px ",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "20px",
    backgroundColor: "#ccc !important",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: "-1",
    "& .topcontent": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "5px",
      "& .topleft": {
        display: "flex",
        alignItems: "center",

        borderRadius: "10px",
        padding: "5px 8px",
        width: "fit-content",
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
          "& figure": {
            margin: "0",
            marginLeft: "-10px",
            height: "40px",
            width: "40px",
            borderRadius: "50%",
            border: "2px solid #fff",
            overflow: "hidden",
            backgroundColor: "#101010",
            position: "relative",
            transition: "0.3s",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:first-child": {
              marginLeft: "0px",
            },
            "&:hover": {
              zIndex: "2",
              transform: "scale(1.2)",
            },
            "& img": {
              width: "100%",
              maxWidth: "100%",
              // maxHeight: '41px',
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
          marginLeft: "8px",
          color: "#fff",
        },
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
      // color: "#000",
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
  UserTimeBox: {
    "& .bottomcontent": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "10px",
      "& .timer": {
        display: "flex",
        alignItems: "center",
        width: "fit-content",
        padding: "40px 10px 0px",
        "& p": {
          color: "#FFFFFF99",
        },
      },
    },
  },
  text: {
    whiteSpace: "pre",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "calc(100% - 5px)",

    "& span": {
      color: "rgb(145 143 143)",
    },
  },
}));

function OnsalePhyCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { data, type, callbackFun, setIsLike, setLikeLoad } = props;
  const { account, library, chainId } = useWeb3React();

  const [open, setOpen] = useState(false);
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
  const user = useContext(UserContext);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const updateDimensions = () => {
    var offsetWidth = document.getElementById(
      "imagecard" + (data?._id ? data?._id : data?.nftId?._id)
    ).offsetWidth;
    var newoofsetWidth = offsetWidth - 50;
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
    if (data?.physicalType === "SINGLE" || data?.physicalType === "MULTIPLE") {
      if (user.isLogin && id) {
        try {
          const res = await axios.get(Apiconfig.favouriteUnFavourite + id, {
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
    } else {
      if (user.isLogin && id) {
        try {
          const res = await axios.get(
            Apiconfig.favouriteUnFavouriteOrder + id,
            {
              headers: {
                token: sessionStorage.getItem("token"),
              },
            }
          );
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
      <Box className={classes.exploremain}>
        <Paper
          className={data?.nftId?.nftType === "PHYSICAL" ? "root1" : "root"}
        >
          {data?.physicalType === "SINGLE" ||
          data?.physicalType === "MULTIPLE" ? (
            ""
          ) : (
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
                    : data?.orderId?.nftId?.coverImage
                    ? {
                        background:
                          "url(" +
                          changeExtenstion(data?.orderId?.nftId?.coverImage) +
                          ")",
                      }
                    : { background: "url(" + "images/privateimage.jpeg" + ")" }
                }
              >
                {/* for top likes and users */}
                <Box className="topcontent">
                  <Box className="topleft">
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
                                ? changeExtenstion(
                                    data.nftId?.userId?.profilePic
                                  )
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
                            alt="collection"
                          />
                        </figure>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
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
                <Box p={2}>
                  <Box className="databox">
                    <Box className="displaySpacebetween" mb={2}>
                      <Typography
                        variant="h6"
                        // className={classes.text}
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
                      <Box className={classes.iconbuttons} display="flex">
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
                            style={{ color: "#717272", fontSize: "18px" }}
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
                                    color: "#717272",
                                    fontSize: "18px",
                                  }
                            }
                            onClick={() => favouriteNftHandler(data?._id)}
                          />
                        </IconButton>
                      </Box>
                    </Box>

                    {/* <Grid item xs={6} sm={6} align="right">
                  <Typography variant="body1" className={classes.text}>
                    {data.stock}
                  </Typography>
                </Grid> */}

                    <Grid container spacing={1}>
                      <Grid item xs={6} sm={6} align="left">
                        {data?.nftId?.physicalType === "MULTIPLE" ? (
                          ""
                        ) : (
                          <>
                            <Typography
                              variant="body1"
                              className={classes.text}
                            >
                              <GavelIcon style={{ fontSize: "14px" }} />
                              &nbsp;
                              {data?.nftId?.bidAmount
                                ? data?.nftId?.bidAmount
                                : "0"}{" "}
                            </Typography>
                          </>
                        )}
                      </Grid>

                      <Grid item xs={6} sm={6} align="right">
                        {data?.nftId?.isPlace && (
                          <Box className="bottomcontent">
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
                                // <Typography variant="h4">On Marketplace</Typography>
                                ""
                              ) : (
                                <Typography
                                  variant="body1"
                                  className={classes.text}
                                  style={{ color: "rgb(112, 107, 107)" }}
                                >
                                  {timeLeft.days
                                    ? timeLeft.days && timeLeft.days
                                    : "0"}
                                  d :{" "}
                                  {timeLeft.hours
                                    ? timeLeft.hours && timeLeft.hours
                                    : "0"}
                                  h :{" "}
                                  {timeLeft.minutes
                                    ? timeLeft.minutes && timeLeft.minutes
                                    : "0"}
                                  m :{" "}
                                  {timeLeft.seconds
                                    ? timeLeft.seconds && timeLeft.seconds
                                    : "0"}
                                  s
                                </Typography>
                              )}
                              <Box pl={1}>
                                {/* <img src="images/Flame.png" /> */}
                              </Box>
                            </Box>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                  <Box className="buttonbox">
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
                    <Box className={classes.pricedata}>
                      <Typography variant="h6" color="primary">
                        <img src="images/favicon.png" alt="Vector Image" />
                        &nbsp;&nbsp;
                        {data?.price}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </>
          )}

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
                <ShareSocialMedia url={window.location} />
              </Box>
            </DialogContent>
          </Dialog>
        </Paper>
      </Box>
      {/* <SharePopper
        open={open}
        anchorEl={anchorRef.current}
        placement={"top-start"}
        type={"small"}
        // key={i}
      /> */}
    </>
  );
}

export default OnsalePhyCard;
