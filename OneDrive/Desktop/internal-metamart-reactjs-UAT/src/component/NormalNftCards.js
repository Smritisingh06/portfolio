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
import ShareSocialMedia from "src/component/ShareSocialMedia";
import { GiCancel } from "react-icons/gi";
import { calculateTimeLeft, getWeb3ContractObject } from "src/utils";
import { changeExtenstion } from "src/utils";
import MarketplaceABI from "src/constants/ABI/MarketplaceABI.json";
import { useWeb3React } from "@web3-react/core";
import NftTokenABI from "src/constants/ABI/NftTokenABI.json";
import DeployABI from "src/constants/ABI/DeployABI.json";
import {
  RPC_URL,
  getMarketplaceContractAddress,
  getNetworkDetails,
  getNormalMarketplaceContractAddress,
} from "src/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    // margin: "0 5px",

    overflow: "hidden",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
    },
    "& .basecontent": {
      "& .databox": {
        borderBottom: "1px solid rgb(145 143 143 / 35%)",
        paddingBottom: "16px",
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
    width: "150px",
  },
  mainimg: {
    width: "100%",
    height: "190px ",
    overflow: "hidden",
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
            height: "25px",
            width: "25px",
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
      color: "#000",
      display: "flex",
      alignItems: "center",
    },
  },
  customizedButton: {
    position: "absolute",
    top: "0",
    right: "0",
    color: "rgb(120, 120, 120)",
  },
}));

function ExploreCard({
  data,
  type,
  callbackFun,
  // tokenID,
  // isResale,
  // chianId,
  // contractAddress,
}) {
  const classes = useStyles();

  const { account, library, chainId } = useWeb3React();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [currentOwner, setCurrentOwner] = useState();
  const user = useContext(UserContext);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
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
  }, [data, data?._id]);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(
        calculateTimeLeft(new Date(parseInt(data?.expiryTime) * 1000))
      );
    }, 1000);
    return () => clearTimeout(timer);
  });
  useEffect(() => {
    getCurrentOwner();
  }, [data]);
  const getCurrentOwner = async () => {
    // const contractObjNormal = await getWeb3ContractObject(
    //   MarketplaceABI,
    //   OpenMarketplace,
    //   networkDetails[0].rpcUrls
    // );

    try {
      console.log(
        data,
        "ownerOf---- testing isExpired0---- ",
        data?.collectionId?.contractAddress
      );
      const contractObj = await getWeb3ContractObject(
        DeployABI,
        data?.collectionId?.contractAddress,
        RPC_URL
      );
      console.log("ownerOf---- testing isExpired0---- ", data.tokenId);
      const ownerOf = await contractObj.methods.ownerOf(data.tokenId).call();
      setCurrentOwner(ownerOf);
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  return (
    <>
      <Paper elevation={2} className={classes.root}>
        <Box
          id={`imagecard${data?._id}`}
          className={classes.mainimg}
          style={
            data?.coverImage
              ? {
                  background: "url(" + changeExtenstion(data?.coverImage) + ")",
                }
              : { background: "url(" + "images/market_detail.png" + ")" }
          }
        ></Box>

        <Box className="basecontent">
          <Box p={2}>
            <Box className="databox">
              <Grid
                container
                spacing={1}
                onClick={() => {
                  history.push({
                    pathname: "/resale-nft",
                    search: data._id,
                  });
                }}
              >
                <Grid item xs={12} sm={12} align="left">
                  <Typography
                    variant="h6"
                    color="primary"
                    className={classes.text}
                  >
                    {data.tokenName}
                  </Typography>
                </Grid>
                {/* <Grid item xs={6} sm={6} align="right">
                  <Typography variant="body1" className={classes.text}>
                    {data.stock}
                  </Typography>
                </Grid> */}
              </Grid>
            </Box>
            {currentOwner?.toLowerCase() == account?.toLowerCase() ? (
              <Box className="buttonbox">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    history.push({
                      pathname: "/resale-nft",
                      search: data._id,
                    });
                  }}
                >
                  {account &&
                  user &&
                  user.ownerAccount &&
                  account === user.ownerAccount
                    ? "Sell NFT"
                    : "Resale NFT"}
                </Button>
              </Box>
            ) : (
              <Box className="buttonbox">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    history.push({
                      pathname: "/resale-nft",
                      search: data._id,
                    });
                  }}
                >
                  {account &&
                  user &&
                  user.ownerAccount &&
                  account === user.ownerAccount
                    ? "NFT Expired"
                    : "Nfts Expired"}
                </Button>
              </Box>
            )}
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
              <GiCancel />
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

export default ExploreCard;
