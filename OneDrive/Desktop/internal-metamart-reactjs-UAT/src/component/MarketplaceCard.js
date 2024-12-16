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
import CloseIcon from "@material-ui/icons/Close";
import GavelIcon from "@material-ui/icons/Gavel";
import ShareSocialMedia from "src/component/ShareSocialMedia";
import ShareIcon from "@material-ui/icons/Share";
import { toast } from "react-toastify";
import { UserContext } from "src/context/User";
import Apiconfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";
import { numberCompactFormat } from "src/utils";
import moment from "moment";
import SharePopper from "./SharePopper";

const useStyles = makeStyles((theme) => ({
  exploremain: {
    "& .root1": {
      boxShadow:
        "1px 3px 2px -1px #ff5d0c, 0px 1px 0px 0px #ff5d0c, 0px 1px 3px 0px #ff5d0c",
      marginLeft: "1px",
      // cursor: "pointer",
      "&:hover": {
        filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
      },
    },
    "& .root": {
      position: "relative",
      margin: "0 5px",
      background: theme.palette.background.card,
      borderRadius: "20px",
      overflow: "hidden",
      // cursor: "pointer",
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
    position: "center",
    // cursor: "pointer",
    width: "100%",
    height: "190px ",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "10px",
    backgroundColor: "#ccc !important",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    "& .topcontent": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "15px",
      "& .topleft": {
        display: "flex",
        alignItems: "center",
        background: "#FFFFFF",
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
            height: "30px",
            width: "30px",
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
          // color: "#000",
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
  iconbuttons: {
    "& .MuiIconButton-root": {
      background: theme.palette.background.blur,
    },
  },
}));

function ExploreCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const { data, type, dataAllItem, callbackFun } = props;

  const user = useContext(UserContext);
  const updateDimensions = () => {
    var offsetWidth = document.getElementById(
      "imagecard" + data?._id
    ).offsetWidth;
    var newoofsetWidth = offsetWidth - 80;
    document.getElementById("imagecard" + data?._id).style.height =
      newoofsetWidth + "px";
  };
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
      (order) => order === user?.userData?._id
    );
    var isfavourite = favouriteUsers?.length >= 0;
  }
  useEffect(() => {
    updateDimensions();
  }, [data, data?._id]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
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
      <Box className={classes.exploremain}>
        <Paper
          elevation={2}
          className={data?.nftId?.nftType === "PHYSICAL" ? "root1" : "root"}
          style={{
            cursor:
              data.status != "CANCEL" &&
              Number(data.expiryTime) > moment().unix() + "000"
                ? "pointer"
                : "",
          }}
        >
          {data?.nftId?.nftType === "NORMAL" ? (
            <>
              <Box>
                <Box
                  id={`imagecard${data?._id}`}
                  className={classes.mainimg}
                  style={
                    data?.nftId?.coverImage
                      ? { background: "url(" + data?.nftId?.coverImage + ")" }
                      : {
                          background: "url(" + "images/market_detail.png" + ")",
                        }
                  }
                  onClick={() => {
                    if (
                      Number(data.expiryTime) > moment().unix() + "000" &&
                      data.status != "CANCEL"
                    ) {
                      history.push({
                        pathname: "/marketplace-Detail",
                        search: data?._id,
                        state: {
                          data: data,
                        },
                      });
                    }
                  }}
                >
                  {data?.nftId?.mediaType === "video" && (
                    <Box
                      style={{
                        position: "absolute",
                        zIndex: "2",
                      }}
                    >
                      <PlayCircleOutlineIcon
                        // onClick={(event) => {
                        //   event.stopPropagation();
                        //   history.push({
                        //     pathname: "/nft",
                        //     search: data._id,
                        //   });
                        // }}
                        style={{
                          cursor: "pointer",
                          color: "rgb(103 99 99)",
                          fontSize: "50px",
                        }}
                      />
                    </Box>
                  )}
                  {data?.nftId?.mediaType === "audio" && (
                    <Box
                      style={{
                        position: "absolute",
                        right: "20px",
                        top: "10px",
                      }}
                    >
                      <AudiotrackIcon
                        onClick={() => {
                          history.push({
                            pathname: "/nft",
                            search: data._id,
                          });
                        }}
                        style={{
                          cursor: "pointer",
                          color: "rgba(255, 255, 255, 0.6)",
                        }}
                      />
                    </Box>
                  )}
                </Box>
                <Box className="basecontent">
                  <Box style={{ padding: "16px 0px 0px" }}>
                    <Box className="databox">
                      <Grid container spacing={1}>
                        <Grid item xs={6} sm={6} align="left">
                          <Typography
                            variant="h6"
                            color="primary"
                            className={classes.text}
                          >
                            {data.tokenName
                              ? data.tokenName
                              : data?.nftId?.tokenName}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} align="right">
                          <Box className={classes.iconbuttons}>
                            <IconButton
                              size="small"
                              style={{
                                marginLeft: "5px",
                                padding: "8px",
                              }}
                              ref={anchorRef}
                              onClick={() => setOpen(true)}
                            >
                              <ShareIcon
                                style={{ color: "#717272", fontSize: "18px" }}
                              />
                            </IconButton>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid container spacing={1}>
                        <Grid item xs={6} sm={6} align="left">
                          <Typography variant="body1" className={classes.text}>
                            <GavelIcon style={{ fontSize: "14px" }} />
                            &nbsp;
                            {data?.nftId?.bidAmount
                              ? data?.nftId?.bidAmount
                              : "0"}{" "}
                            {/* {data?.price ? data?.price : "0"}{" "} */}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} align="right">
                          <Typography
                            variant="body1"
                            color="primary"
                            className={classes.text}
                          >
                            {data.stock}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box className="buttonbox">
                      <Button
                        variant="contained"
                        color="secondary"
                        disabled={
                          Number(data.expiryTime) < moment().unix() + "000" ||
                          data.status == "CANCEL"
                        }
                        onClick={() => {
                          if (
                            Number(data.expiryTime) > moment().unix() + "000" &&
                            data.status != "CANCEL"
                          ) {
                            history.push({
                              pathname: "/marketplace-Detail",
                              search: data?._id,
                              state: { data: data },
                            });
                          }
                        }}
                      >
                        {Number(Number(data.expiryTime)) <
                        moment().unix() + "000"
                          ? "Oredr Expired"
                          : data.status == "CANCEL"
                          ? "Oredr Expired"
                          : "View Details"}
                      </Button>
                      <Box className={classes.pricedata}>
                        {" "}
                        <Typography variant="h6">
                          <img src="images/favicon.png" alt="Vector Ima" />
                          &nbsp;&nbsp;
                          {numberCompactFormat(data?.price)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </>
          ) : (
            ""
          )}
          {/* <SharePopper
            open={open}
            anchorEl={anchorRef.current}
            placement={"top-start"}
            type={"small"}
            // key={i}
          /> */}
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
