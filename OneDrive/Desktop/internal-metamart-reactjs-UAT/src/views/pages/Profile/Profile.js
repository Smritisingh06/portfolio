import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  IconButton,
  Hidden,
  Paper,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CloseIcon from "@material-ui/icons/Close";
import React, { useContext, useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { useWeb3React } from "@web3-react/core";
import Following from "./Following";
import Bio from "./Bio";
import ProfileNft from "../Author/ProfileNft";
import Ownednft from "../Author/Ownednft";
import NormalNft from "../Author/NormalNft";
import { toast } from "react-toastify";
import axios from "axios";
import Apiconfig from "src/ApiConfig/ApiConfig";
import { changeExtenstion, sortAddress } from "src/utils";
import DataNotFound from "src/component/DataNotFound";
import { FaUserEdit, FaUserCheck } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "src/context/User";
import CopyToClipboard from "react-copy-to-clipboard";
import AllNft from "../Author/AllNft";
import { contractKovan } from "src/constants";
const useStyles = makeStyles((theme) => ({
  prifilemainBox: { padding: "50px 0px" },
  bannerimg: {
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "100% !important",
    backgroundRepeat: " no-repeat !important",
    height: "260px",
    position: "relative",
    borderRadius: "10px",
    "@media(max-width:1010px)": {
      height: "140px",
    },
    "& img": {
      minHeight: "100%",
      minWidth: "100%",
      height: "auto",
      width: "auto",
    },
  },
  text1: {
    marginLeft: "16px",
    "@media(max-width:375px)": {
      marginTop: "5px",
      marginLeft: "0px",
      wordBreak: "break-word",
    },
    "& h4": {
      "@media(max-width:1010px)": {
        fontSize: "30px",
      },
      "@media(max-width:930px)": {
        fontSize: "25px",
      },
    },
    "& h5": {
      color: "#9b9b9b",
      fontSize: "14px",
      lineHeight: "130%",
      paddingTop: "10px",
    },
  },
  idtxt: {
    display: "flex",
    fontWeight: "bold",
    fontSize: "18px",
    alignItems: "center",
    width: "100%",
    maxWidth: "354px",
    justifyContent: "space-between",
    "@media(max-width:873px)": {
      display: "block",
    },
  },
  file: {
    padding: "10px 10px 3px 10px",
    borderRadius: "50%",
  },
  btnfollow2: {
    border: "2px solid",
    borderColor: theme.palette.background.blur,
    display: "flex",
    alignItems: "center",
    borderRadius: "10px",
    padding: "4px 14px",
    [theme.breakpoints.down("sm")]: {
      padding: "0px 10px",
    },
    "& h5": {
      marginLeft: "10px",
    },
  },
  headbox2: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    "@media(max-width:767px)": {
      display: "block",
      padding: "0 10px",
    },
    "& figure": {
      display: "flex",
      flexWrap: "wrap",
      [theme.breakpoints.down("xs")]: {
        margin: "0px",
      },
    },
  },
  btnhead: {
    display: "flex",
    bottom: "0",
    right: "0",
    marginRight: "100px",
    padding: "7px",
    borderRadius: "10px 10px 0px 0px",
    background: theme.palette.background.profileBtn,

    [theme.breakpoints.down("sm")]: {
      marginRight: "40px",
    },
    [theme.breakpoints.down("xs")]: {
      background: "none",
    },
  },
  profileimg: {
    marginTop: "-80px",
    marginRight: "20px",
    backgroundPosition: "center !important",
    backgroundSize: "100% !important",
    backgroundRepeat: " no-repeat !important",
    width: "175px",
    height: "175px",
    borderRadius: "50%",
    position: "relative",
    border: "7px solid",
    borderColor: theme.palette.background.profileBtn,
    backgroundColor: "#8e9493 !important",
    "@media(max-width:1010px)": {
      marginTop: "-65px",
      width: "110px",
      height: "110px",
    },
    "@media(max-width:800px)": {
      marginTop: "-65px",
      width: "90px",
      height: "90px",
    },
    "& .editprofilebutton": {
      background:
        " hsl(230.54deg 95.03% 63.21%)",
      position: "absolute",
      right: "3px",
      bottom: "3px",
      "@media(max-width:800px)": {
        width: "35px",
        height: "35px",
      },
      "& svg": {
        color: "#FFFFFF",
      },
    },
    "& img": {
      minHeight: "100%",
      minWidth: "100%",
      height: "auto",
      width: "auto",
    },
  },
  FollowingBox: {
    overflowx: "scroll",
  },
  profileWallet: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    "@media(max-width:767px)": {
      borderBottom: "1px solid gray",
    },
    "& h6": {
      color: "#00000",
      "@media(max-width:800px)": { fontSize: "17px" },
    },
  },
  customizedButton: {
    position: "absolute",
    top: "0",
    right: "0",
    color: "rgb(120, 120, 120)",
  },
  tabBtn1: {
    "@media(max-width:767px)": {
      marginTop: "10px",
      minWidth: "650px",
    },
    "& button": {
      borderRadius: "10px",
      fontWeight: "400",
      fontSize: "14px",
      marginRight: "4px",
      borderBottom: "2px solid transparent",
      color: "#808080b8",
      "&.active": {
        background:
          " hsl(230.54deg 95.03% 63.21%) ",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        textFillColor: "transparent",
        borderLeft: "0",
        borderRight: "0",
        borderTop: "0",
        border: "10px solid",
        borderImageSlice: "1",
        borderWidth: "2px",
        borderImageSource:
          "hsl(230.54deg 95.03% 63.21%)",
        borderRadius: "0px",
      },
    },
  },
  bgimage: {
    backgroundImage: "url(/images/modalbg.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "38px 15px 42px",
    "& img": {
      width: "100%",
      maxWidth: "300px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: "20px",
      marginBottom: "15px",
    },
    "& h2": {
      fontSize: "22px",
      textAlign: "center",
      margin: "10px 0px",
      color: "#11ac11",
      fontWeight: " 600",
    },
  },
  modalcss: {
    "& .MuiDialog-paperWidthXs": {
      minWidth: " 700px",
      maxWidth: "700px",
      [theme.breakpoints.down("xs")]: {
        minWidth: "300px",
        maxWidth: "400px",
      },
    },
    "& .MuiDialogContent-root": {
      padding: "0px",
    },
    "& .MuiDialogActions-root": {
      padding: "0px",
    },
  },
  typetext: {
    textAlign: "center",
    wordBreak: "break-all",
    "& h6": {
      color: "#d0cdcd",
      fontSize: "14px",
    },
  },
}));

export default function Profile(nftList) {
  const { account } = useWeb3React();
  const [openBuy, setOpenBuy] = useState(false);
  const history = useHistory();
  const [bougthNftCount, setBougthNftCount] = useState([]);
  const [tabview, setTabView] = useState("all");
  const [openPlaceBid, setOpenPlaceBid] = useState(false);
  const [openbuynft, setOpenbuynft] = useState(false);
  const user = useContext(UserContext);
  const [createdNftoCount, setCreatedNftoCount] = useState([]);
  const [onSaleList, setOnSaleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [likesCount, setLikesCount] = useState([]); // eslint-disable-line
  const [followingCount, setFollowingCounts] = useState([]);
  const [allNftList, setAllNftList] = useState([]);
  const [normalNFTList, setNormalNFTList] = useState([]);
  const location = useLocation();
  const [followersCount, setFollowersCounts] = useState([]);
  const [favoritelist, setfavoritelist] = useState([]);
  const classes = useStyles();
  const [soldNft, setSoldNft] = useState([]);
  //physical NFT

  const dataprofile = window.location.pathname.split("/")[1];

  const congratulation = location?.data;
  const congratulationdata1 = location?.state;

  useEffect(() => {
    if (congratulation) {
      setOpenbuynft(true);
      setTimeout(() => {
        setOpenbuynft(false);
      }, 10000);
    }
  }, [congratulation]);

  const getLikesHandler = async (id) => {
    try {
      const res = await axios.get(Apiconfig.userLikesCount + id, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      }); // eslint-disable-next-line
      if (res.data.statusCode == 200) {
        setLikesCount(res.data.result);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const userOnSaleCountHandler = async (id, cancelTokenSource) => {
    try {
      const res = await axios.get(Apiconfig.userOnSaleCount + id, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
      });

      if (res.data.statusCode === 200) {
        setOnSaleList(res.data.result.docs);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };

  const setCreatedNftoCountHandler = async (id) => {
    try {
      const res = await axios.get(Apiconfig.userCreatedCount + id, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setCreatedNftoCount(res.data.result);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };

  const userBuyAndCreatedListHandler = async (id) => {
    try {
      const res = await axios.get(Apiconfig.userBuyAndCreatedList + id, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setAllNftList(res.data.result);

        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log("ERROR", error);
    }
  };
  const normalNFTListHandler = async (id) => {
    if (account === user.ownerAccount) {
      try {
        const res = await axios.get(Apiconfig.listNFT, {
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          const dataList = res.data.result.filter(
            (data) =>
              data.isPlace === false &&
              // data.isCancel == true &&
              data?.collectionId?.contractAddress == contractKovan && // eslint-disable-line
              data.isResale === false
          );

          setNormalNFTList(dataList);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("ERROR", error);
        setIsLoading(false);
      }
    } else {
      try {
        const res = await axios.get(Apiconfig.listNFT, {
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          const dataList = res.data.result.filter(
            (data) => data.isPlace === false && data.isResale === false
          );

          setNormalNFTList(dataList);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("ERROR", error);
        setIsLoading(false);
      }
    }
  };

  const setBougthNftCountHandler = async (id) => {
    try {
      const res = await axios.get(Apiconfig.userOwendCount + id, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        const dataList = res.data.result.filter(
          (data) => data?.nftId?.isPlace === false
        );
        setBougthNftCount(dataList);
        // console.log("dataList", dataList);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateDatahandler();

    if (tabview === "sold" && user?.userData?._id) {
      forAllNftHandler(user?.userData?._id);
    }
    if (tabview === "favourite" && user?.userData?._id) {
      favoriteNFTlistAPI(user?.userData?._id);
    }
    if (tabview === "normal" && user?.userData?._id) {
      normalNFTListHandler(user?.userData?._id);
    }
    if (tabview === "Owned" && user?.userData?._id) {
      setBougthNftCountHandler(user?.userData?._id);
    }
    if (tabview === "all" && user?.userData?._id) {
      userBuyAndCreatedListHandler(user?.userData?._id);
    }
    if (tabview === "Created" && user?.userData?._id) {
      setCreatedNftoCountHandler(user?.userData?._id);
    }
    if (tabview === "sale" && user?.userData?._id) {
      userOnSaleCountHandler(user?.userData?._id);
    }
    if (tabview === "bought" && user?.userData?._id) {
      setBougthNftCountHandler(user?.userData?._id);
    }
  }, [user?.userData?._id, tabview]); // eslint-disable-line

  const updateDatahandler = () => {
    if (user?.userData?._id) {
      const id = user?.userData._id;
      // setBougthNftCountHandler(id);
      // BougthPhysicalNftCountHandler(id);
      getLikesHandler(id);

      getFollowersCountsApiData(id);
      getFollowingCountsApiData(id);

      user.getProfileHandler(window.sessionStorage.getItem("token"));
    }
  };

  const getFollowersCountsApiData = async (id, cancelTokenSource) => {
    try {
      const res = await axios.get(Apiconfig.userFollowerCount + id, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
      });

      if (res.status === 200) {
        setFollowersCounts(res.data.result);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const getFollowingCountsApiData = async (id, cancelTokenSource) => {
    try {
      const res = await axios.get(Apiconfig.userFollowingCount + id, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
      });

      if (res.status === 200) {
        setFollowingCounts(res.data.result);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const followUnfollowHandler = async (id) => {
    if (user.isLogin) {
      try {
        const res = await axios.get(Apiconfig.followUnfollow + id, {
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          toast.success(res.data.responseMessage);
          updateDatahandler();
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
  const favoriteNFTlistAPI = async (id) => {
    try {
      const res = await axios.get(Apiconfig.userFavourateCount + id, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setfavoritelist(res.data.result);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };

  const forAllNftHandler = async (id) => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfig.nftSoldCount + id,
      });
      if (res) {
        setSoldNft(res.data.result);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  function isImageUrlValid1(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = function () {
        resolve(true);
      };
      img.onerror = function () {
        resolve(false);
      };
      img.src = url;
    });
  }
  const [isValid, setIsValid] = useState(false);
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
    isImageUrlValid(user.userData?.coverPic);
    ExpiredNFT();
  }, [user.userData?.coverPic]);
  const ExpiredNFT = async (token) => {
    try {
      const res = await axios.get(Apiconfig.expiredNft, {});
    } catch (error) {}
  };
  return (
    <Box className={classes.prifilemainBox}>
      <Container maxWidth="lg">
        <Box
          className={classes.bannerimg}
          style={
            isValid
              ? {
                  background: "url(" + user.userData?.coverPic + ")",
                }
              : { background: "url(/images/BannerImg.png)" }
          }
        >
          <Hidden xsDown>
            <Box className={classes.btnhead} style={{ position: "absolute" }}>
              <Box
                className={classes.btnfollow2}
                style={{
                  cursor: "pointer",
                }}
                onClick={() => setOpenBuy(true)}
              >
                <Typography variant="body2" color="primary">
                  Followers
                </Typography>
                <Typography variant="h5" color="primary">
                  {" "}
                  {user?.userData?.followersCount}
                </Typography>
              </Box>
              <Box
                ml={1}
                className={classes.btnfollow2}
                style={{
                  cursor: "pointer",
                }}
                onClick={() => setOpenPlaceBid(true)}
              >
                <Typography variant="body2" color="primary">
                  Following
                </Typography>
                <Typography variant="h5" color="primary">
                  {" "}
                  {user?.userData?.followingCount}
                </Typography>
              </Box>
              {user?.userData?.rayaltiAmount && (
                <Box
                  ml={1}
                  className={classes.btnfollow2}
                  // onClick={() => setOpenPlaceBid(true)}
                >
                  <Typography variant="body2" color="primary">
                    Royalty Earned
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {" "}
                    {user?.userData?.rayaltiAmount
                      ? parseFloat(user?.userData?.rayaltiAmount).toFixed(6)
                      : 0}
                  </Typography>
                </Box>
              )}
            </Box>
          </Hidden>
        </Box>

        <Box className={classes.headbox2}>
          <figure>
            {user.userData?.profilePic ? (
              <Box
                style={{
                  background: "url(" + user.userData?.profilePic + ")",
                }}
                className={classes.profileimg}
              >
                <IconButton
                  className="editprofilebutton"
                  onClick={() => history.push("edit-profile")}
                >
                  <MdModeEdit />
                </IconButton>
              </Box>
            ) : (
              <Box
                style={{ background: "url(/images/idicon.svg)" }}
                className={classes.profileimg}
              >
                <IconButton
                  className="editprofilebutton"
                  onClick={() => history.push("/edit-profile")}
                >
                  <FaUserEdit />
                </IconButton>
              </Box>
            )}

            <Box className={classes.text1}>
              <Typography
                variant="h4"
                color="primary"
                style={{ wordBreak: "break-word" }}
              >
                {user.userData?.name}
              </Typography>
              <Typography variant="h5" color="primary">
                {user.userData?.email}
              </Typography>
            </Box>
          </figure>
        </Box>
        <Hidden smUp>
          <Box className={classes.btnhead}>
            <Box
              className={classes.btnfollow2}
              style={{
                cursor: "pointer",
              }}
              onClick={() => setOpenBuy(true)}
            >
              <Typography variant="body2" color="primary">
                Followers
              </Typography>
              <Typography variant="h5" color="primary">
                {" "}
                {user?.userData?.followersCount}
              </Typography>
            </Box>
            <Box
              ml={2}
              className={classes.btnfollow2}
              style={{
                cursor: "pointer",
              }}
              onClick={() => setOpenPlaceBid(true)}
            >
              <Typography variant="body2" color="primary">
                Following
              </Typography>
              <Typography variant="h5" color="primary">
                {" "}
                {user?.userData?.followingCount}
              </Typography>
            </Box>
          </Box>
        </Hidden>

        <Box my={3}>
          {/* <Hidden mdUp> */} <Bio />
          {/* </Hidden> */}
        </Box>
        <Paper elevation={2}>
          <Box className={classes.idtxt}>
            <Box className={classes.profileWallet}>
              {/* <Typography variant="h6">Address</Typography>
              &nbsp;&nbsp; */}
              <Typography variant="body2">
                {sortAddress(user.userData?.walletAddress)}
              </Typography>
              <Box className={classes.file} mr={2}>
                <CopyToClipboard text={user?.userData?.walletAddress}>
                  <img
                    src="images/copyicon.png"
                    alt=""
                    style={{
                      cursor: "pointer",
                      fontSize: "18px",
                      filter: "grayscale(100%) brightness(1000%) contrast(100%)", // Adjust the hue to get a blue effect
                    }}
                    onClick={() => toast.info("Copied")}
                  />
                </CopyToClipboard>
              </Box>
            </Box>
          </Box>
        </Paper>
        <Box my={2} overflow="auto">
          <Box className={classes.tabBtn1}>
            <Button
              className={tabview === "all" ? "active" : ""}
              onClick={() => setTabView("all")}
            >
              All
            </Button>
            <Button
              className={tabview === "Created" ? "active" : " "}
              onClick={() => setTabView("Created")}
            >
              Created
            </Button>
            <Button
              className={tabview === "sale" ? "active" : " "}
              onClick={() => setTabView("sale")}
            >
              On sale
            </Button>
            <Button
              className={tabview === "Owned" ? "active" : " "}
              onClick={() => setTabView("Owned")}
            >
              Owned
            </Button>

            {account &&
            user &&
            user.ownerAccount &&
            account === user.ownerAccount ? (
              <Button
                className={tabview === "normal" ? "active" : " "}
                onClick={() => setTabView("normal")}
              >
                HovR Hooligans
              </Button>
            ) : (
              <Button
                className={tabview === "normal" ? "active" : " "}
                onClick={() => setTabView("normal")}
              >
                Normal NFT
              </Button>
            )}

            <Button
              className={tabview === "favourite" ? "active" : " "}
              onClick={() => setTabView("favourite")}
            >
              Favourite NFT
            </Button>
            <Button
              className={tabview === "sold" ? "active" : " "}
              onClick={() => setTabView("sold")}
            >
              Sold NFT
            </Button>
          </Box>
        </Box>
        <Divider style={{ background: "#80808042", marginTop: "-17px" }} />

        <Box style={{ marginTop: "26px" }}>
          {tabview === "all" && (
            <AllNft
              dataprofile={dataprofile}
              nftList={allNftList}
              callbackFun={() =>
                userBuyAndCreatedListHandler(user?.userData?._id)
              }
              isLoading={isLoading}
            />
          )}

          {tabview === "Created" && (
            <AllNft
              dataprofile={dataprofile}
              nftList={createdNftoCount}
              callbackFun={() =>
                setCreatedNftoCountHandler(user?.userData?._id)
              }
              isLoading={isLoading}
            />
          )}

          {tabview === "sale" && (
            <ProfileNft
              nftList={onSaleList}
              callbackFun={() => userOnSaleCountHandler(user?.userData?._id)}
              changeExtenstion={changeExtenstion}
              isLoading={isLoading}
            />
          )}

          {tabview === "Owned" && (
            <Ownednft
              nftList={bougthNftCount}
              callbackFun={() => setBougthNftCountHandler(user?.userData?._id)}
              changeExtenstion={changeExtenstion}
              isLoading={isLoading}
            />
          )}
          {tabview === "sold" && (
            <Ownednft
              nftList={soldNft}
              callbackFun={() => forAllNftHandler(user?.userData?._id)}
              changeExtenstion={changeExtenstion}
              isLoading={isLoading}
              isAuther={true}
            />
          )}

          {tabview === "normal" && (
            <NormalNft
              nftList={normalNFTList}
              callbackFun={() => normalNFTListHandler(user?.userData?._id)}
              account={account}
              changeExtenstion={changeExtenstion}
              isLoading={isLoading}
            />
          )}
          {tabview === "favourite" && (
            <ProfileNft
              nftList={favoritelist}
              callbackFun={() => favoriteNFTlistAPI(user?.userData?._id)}
              changeExtenstion={changeExtenstion}
              isLoading={isLoading}
            />
          )}
        </Box>

        <Box>
          {openPlaceBid && (
            <Dialog
              open={openPlaceBid}
              onClick={() => setOpenPlaceBid(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              classes={{ paper: classes.paper }}
              maxWidth="xs"
            >
              <DialogActions>
                <IconButton
                  onClick={() => setOpenPlaceBid(false)}
                  className={classes.customizedButton}
                >
                  <CloseIcon />
                </IconButton>
              </DialogActions>
              <DialogContent className={classes.padding0}>
                <Box align="center" mb={5}>
                  <FaUserCheck style={{ fontSize: "45px", color: "#FF0098" }} />
                  <Typography variant="h5" color="primary">
                    Following
                  </Typography>
                </Box>
                <Box className={classes.FollowingBox}>
                  <Grid container>
                    {followingCount?.followingCount === 0 && (
                      <Box style={{ padding: "0px 50px" }}>
                        <DataNotFound />
                      </Box>
                    )}
                    {console.log("followingCount", followingCount)}
                    {followingCount?.following &&
                      followingCount?.following.map((data, i) => {
                        return (
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            key={i}
                            className="walletSet"
                          >
                            <Following
                              userData={user?.userData}
                              followUnfollowHandler={(id) =>
                                followUnfollowHandler(data?._id)
                              }
                              data={data}
                              type="timing"
                              index={i}
                            />
                          </Grid>
                        );
                      })}
                  </Grid>
                </Box>
              </DialogContent>
            </Dialog>
          )}
        </Box>
        <Box>
          {openBuy && (
            <Dialog
              open={openBuy}
              onClick={() => setOpenBuy(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              classes={{ paper: classes.paper }}
              maxWidth="xs"
            >
              <DialogActions>
                <IconButton
                  onClick={() => setOpenBuy(false)}
                  className={classes.customizedButton}
                >
                  <CloseIcon />
                </IconButton>
              </DialogActions>
              <DialogContent className={classes.padding0}>
                <Box align="center" mb={5}>
                  <FaUserCheck style={{ fontSize: "45px", color: "#FF0098" }} />
                  <Typography variant="h5" color="primary">
                    Followers
                  </Typography>
                </Box>
                <Box className={classes.FollowingBox}>
                  <Grid container>
                    {followersCount?.followersCount === 0 && (
                      <Box style={{ padding: "0px 50px" }}>
                        <DataNotFound />
                      </Box>
                    )}
                    {followersCount?.followers &&
                      followersCount?.followers.map((data, i) => {
                        return (
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            key={i}
                            className="walletSet "
                          >
                            <Following
                              userData={user?.userData}
                              isFollowers={true}
                              followUnfollowHandler={(id) =>
                                followUnfollowHandler(data?._id)
                              }
                              data={data}
                              type="timing"
                              index={i}
                            />
                          </Grid>
                        );
                      })}
                  </Grid>
                </Box>
              </DialogContent>
            </Dialog>
          )}
          {/*  */}

          <Dialog
            open={openbuynft}
            onClick={() => setOpenbuynft(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            // classes={{ paper: classes.paper }}
            maxWidth="xs"
            className={classes.modalcss}
            // style={{  }}
          >
            <DialogActions>
              <IconButton
                onClick={() => setOpenbuynft(false)}
                className={classes.customizedButton}
              >
                <CloseIcon />
              </IconButton>
            </DialogActions>
            <DialogContent className={classes.padding0}>
              <Box className={classes.bgimage}>
                <Box>
                  <img src="images/cong.png" alt="" width=" 100%" />
                </Box>
                <Box>
                  <Typography variant="h2">You just bought an NFT</Typography>
                </Box>
                <Box className={classes.typetext}>
                  <Typography variant="h6">
                    {congratulationdata1?.userId?.walletAddress
                      ? congratulationdata1?.userId?.walletAddress
                      : congratulationdata1?.nftId?.userId?.walletAddress}
                  </Typography>
                  <Box>
                    <img
                      src={
                        congratulationdata1?.coverImage
                          ? congratulationdata1?.coverImage
                          : congratulationdata1?.nftId?.coverImage
                      }
                      alt=""
                      width="100%"
                      style={{
                        width: "auto",

                        maxWidth: "250px",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </DialogContent>
          </Dialog>
        </Box>
      </Container>
    </Box>
  );
}
