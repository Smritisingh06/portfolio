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
const useStyles = makeStyles((theme) => ({
  allphysicalnftcard: {
    position: "relative",
    margin: "0 5px",
    background: theme.palette.background.card,
    borderRadius: "20px",
    overflow: "hidden",
    cursor: "pointer",
    // "&:hover": {
    //   boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    //   filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
    //   background: "#fff",
    // },

    "& .topcontent": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "5px 15px",

      "& .topleft": {
        display: "flex",
        alignItems: "center",
        // background: "#FFFFFF",
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
            border: "2px solid #fff",
            display: "flex",
            justifyContent: "center",
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
    },
    "& .basecontent": {
      "& .databox": {
        borderBottom: "1px solid rgb(145 143 143 / 35%)",
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
    // color: "#000",
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
    position: "relative",

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
        // backdropFilter: "blur(42px)",
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

function AllNftCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { data, type, callbackFun, dataprofile } = props;
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

  return (
    <>
      <Paper className={classes.allphysicalnftcard}>
        <Box
          id={`imagecard${data?._id ? data?._id : data?.nftId?._id}`}
          className={classes.mainimg}
          style={
            // isPrivate
            data?.nftId?.coverImage
              ? {
                  background:
                    "url(" + changeExtenstion(data?.nftId?.coverImage) + ")",
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
                        search: data?.nftId?.userId?._id,
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
                          ? data.collectionId?.collectionImage
                          : "images/Ellipse1.png"
                      }
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
              <Grid container spacing={1}>
                <Grid item xs={6} sm={6} align="left">
                  <Typography variant="h6" className={classes.text}>
                    {data?.tokenName ? data?.tokenName : data?.nftId?.tokenName}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} align="right">
                  <Box className={classes.iconbuttons}>
                    <IconButton
                      size="small"
                      style={{
                        marginRight: "5px",
                        padding: "8px",
                      }}
                      onClick={() => setOpen(true)}
                    >
                      <ShareIcon
                        style={{ color: "#717272", fontSize: "18px" }}
                      />
                    </IconButton>
                    <IconButton
                      size="small"
                      style={{
                        marginRight: "5px",
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
                </Grid>
              </Grid>
              <Box className="displaySpacebetween" mt={2}>
                <Typography variant="body1" className={classes.text}>
                  <GavelIcon style={{ fontSize: "14px" }} />
                  &nbsp;
                  {data?.nftId?.bidAmount ? data?.nftId?.bidAmount : "0"}{" "}
                </Typography>
              </Box>
            </Box>
            <Box className="buttonbox">
              <Button
                style={{ whiteSpace: "pre" }}
                variant="contained"
                color="secondary"
                onClick={() => {
                  history.push({
                    pathname: "/marketplace-Detail",
                    search: data?._id,
                    state: { data: data, dataprofile: dataprofile },
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
              <ShareSocialMedia
                url={
                  window.location.origin + "/marketplace-Detail?" + data?._id
                }
              />
            </Box>
          </DialogContent>
        </Dialog>
      </Paper>
    </>
  );
}

export default AllNftCard;
