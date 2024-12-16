/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Box,
  Button,
  Grid,
  makeStyles,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  DialogActions,
  FormControl,
  InputAdornment,
  Container,
  TextField,
  withStyles,
  FormHelperText,
  Switch,
  Paper,
} from "@material-ui/core";
import { SUPPORTED_WALLETS } from "src/connectors";
import {
  sortAddress,
  getContract,
  calculateTimeLeft,
  getWeb3ContractObject,
} from "src/utils";
import {
  NftTokenAddress,
  marketplaceContract,
  deadAddress,
  getNormalMarketplaceContractAddress,
  getNetworkDetails,
  RPC_URL,
  swichNetworkHandler,
} from "src/constants";
import CloseIcon from "@material-ui/icons/Close";
import ShareSocialMedia from "src/component/ShareSocialMedia";
import { toast } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";
import { useWeb3React } from "@web3-react/core";
import NftTokenABI from "src/constants/ABI/NftTokenABI.json";
import { DateTimePicker } from "@material-ui/pickers";
import Web3 from "web3";
import React, { useState, useRef, useContext, useEffect } from "react";

import { ethers } from "ethers";
import { FiMoreHorizontal } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Apiconfig from "src/ApiConfig/ApiConfig";
import DataLoading from "src/component/DataLoading";
import DataNotFound from "src/component/DataNotFound";
import { UserContext } from "src/context/User";
import moment from "moment";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import MarketplaceABI from "src/constants/ABI/MarketplaceABI.json";
import Shared from "src/Icons/Shared";
import Report from "src/Icons/Report";

const useStyles = makeStyles((theme) => ({
  marketplaceDetailBox: {
    "& .descriptionS": {
      "& p": {
        wordBreak: "break-word",
        whiteSpace: "pre-wrap",
      },
      "& span": {
        cursor: "pointer",
        // color: "#f7227c",
        background:
          "linear-gradient(93.34deg, #FF6F37 6.82%, #FF2676 35.9%, #B801AA 68.08%, #7101BC 101.4%)",
        backgroundClip: "text",
        "-webkit-background-clip": "text",
        "-webkit-text-fill-color": "transparent",
      },
    },
    "& .createrBox": {
      margin: "8px",
      minHeight: "85%",
    },
    "& .highestBox": {
      color: theme.palette.primary.main,
    },
  },
  creColl: {
    marginLeft: "-39px",
    display: "flex",
    alignItems: "center",
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "50px",
      height: "50px",
      minWidth: "50px",
      borderRadius: "50%",
      overflow: "hidden",
      background: "rgba(0,0,0,0.1)",
      "& img": {
        // minHeight: "100%",
        maxWidth: "100%",
        display: "block",
      },
    },
    "& p": {
      color: "rgb(112, 107, 107)",
    },
  },
  contract: {
    "& h6": {
      fontWeight: "500",
      width: "max-content",
      color: "#000000",
    },
    "& p": {
      fontWeight: "500",
      color: "#727486",
    },
  },
  dialogContent1: {
    padding: "10px 20px 20px 20px",
    "& h3": {
      display: "flex",
      fontSize: "28px",
      alignItems: "center",
      fontWeight: "700",
      marginBottom: "7px",
    },
    "& label": {
      padding: "4px 0px 1px",
    },
  },
  customizedButton: {
    top: "0",
    right: "0",
    position: "absolute",
  },
  posrel: {
    position: "relative",
    "& h6": {
      fontSize: "18px",
      fontWeight: "600",
      color: "#000",
      display: "flex",
      alignItems: "center",
      "& svg": {
        color: "green",
        marginLeft: "10px",
      },
    },
    "& h4": {
      fontSize: "30px",
      margin: "10px 0",
      color: "#fff",
    },
    "& label": {
      letterSpacing: "1px",
      "& span": {
        color: "#000",
      },
      "& strong": {
        color: "#000",
        cursor: "pointer",
      },
    },
    "& p": {
      lineHeight: "22px",
    },
  },
  playertype: {
    position: "absolute",
    top: "0",
    right: "0",
  },

  chain: {
    "& h4": {
      fontWeight: "bold",
    },
  },

  createbox: {
    "& .MuiDialog-paperScrollPaper": {
      // width: 450,
      // maxWidth: 750,
      // minWidth: 750,
      // backgroundColor: "#171717",
      // [theme.breakpoints.down("sm")]: {
      //   width: "95%",
      //   maxWidth: "95%",
      //   minWidth: "95%",
      // },
    },
  },
  textfilmessage: {},
  listBoxContent: {
    // background: theme.palette.background.card,
    boxSizing: "border-box",
    borderRadius: "10px",
    display: "block",
    // padding: '10px',
    margin: "3px",
    // textAlign: 'center',
    alignItems: "center",
    minWidth: "24%",
    // [theme.breakpoints.down('md')]: {
    //   minWidth: '60px',
    //   padding: '3px',
    // },

    "& span": {
      textAlign: "right",
      fontWeight: "200",
      color: theme.palette.text.graydark,
    },
    "& p": {
      lineHeight: "20px",
    },
  },
}));

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 41,
    height: 20,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(19px)",
      color: "#039BE3",
      "& + $track": {
        opacity: 1,
        backgroundColor: "#039BE3",
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 17,
    height: 17,
    backgroundColor: "#fff",
    boxShadow: "none",
  },
  track: {
    borderRadius: 25,
    opacity: 1,
    backgroundColor: "#039BE3",
  },
}))(Switch);
export default function ResaleSale({
  orderId,
  //   setOrderDetailsParent,
  //   setBidListParent,
  //   setIsLoadingParent,
  orderDetails,
  setOrderDetails,
}) {
  const history = useHistory();
  const classes = useStyles();
  const user = useContext(UserContext);

  const [isSubmit, setIsSubmit] = useState(false);
  const [isLike, setIsLike] = useState(false); // eslint-disable-line
  const [networkDetails, setNetworkDetails] = useState();

  const { account, chainId, library } = useWeb3React();
  const [message, setMessage] = useState("");
  const [openPlaceBid, setOpenPlaceBid] = useState(false);
  const [openBuy, setOpenBuy] = useState(false);
  const moreRef = useRef(null);
  const [openReport, setOpenReport] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [openSale, setOpenSale] = useState(false);
  // const [policy, setPolicy] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  //   const [orderDetails, setOrderDetails] = useState();

  const [updateexpirydate, setUpdateExpirydate] = useState();

  const [bidList, setBidList] = useState([]);

  // const [properties, setProperties] = useState("");
  const [orderExtraDeails, setOderExtraDeails] = useState();
  const [isUpdatingAcceptBid, setIsUpdatingAcceptBid] = useState(false);
  const [isCancelOrderUpdating, setIsCancelOrderUpdating] = useState(false);
  const [readMoreOn, setReadMoreOn] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [price, setPrice] = useState("");
  const [expiryDate, setExpiryDate] = useState(new Date()); //---------------
  // const [expiryDate, setExpiryDate] = useState(new Date());//---------------
  useEffect(() => {
    setExpiryDate(
      new Date(
        parseInt(
          orderDetails?.expiryTime
            ? orderDetails?.expiryTime
            : updateexpirydate?.expiryTime
        )
      )
    );
  }, [orderDetails?.endTime]);
  const [cancelBidUpdating, setCancelBidUpdating] = useState(false);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const [isCancelled, setIsCancelled] = useState(false);

  const [isPrivate, setIsPrivate] = useState(false);

  //walletBalance
  const [balanceValue, setBalanceValue] = React.useState(0);
  const httpProvider = new Web3.providers.HttpProvider(RPC_URL);
  const web3 = new Web3(httpProvider);
  const [isValidExpiry, setIsValidExpiry] = useState(false);
  const [marketFeeDetails, setMarketFeeDetails] = useState(false);
  //
  const GetBalance = async () => {
    try {
      const value = await web3.eth.getBalance(account);
      setBalanceValue(web3.utils.fromWei(value));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box className={classes.marketplaceDetailBox}>
        <Paper elevation={2}>
          <Box className={classes.posrel}>
            <Box className={classes.playertype}></Box>
            <Typography
              variant="h2"
              color="primary"
              style={{
                // overflow: "hidden",

                // width: "91%",

                // whiteSpace: " pre",
                // textOverflow: "ellipsis",
                lineBreak: "anywhere",
                width: "91%",
              }}
            >
              {orderDetails?.tokenName}
            </Typography>
            <Box className="descriptionS">
              {!readMoreOn && (
                <Typography
                  variant="body1"
                  style={{
                    lineBreak: "anywhere",
                    paddingTop: "10px",
                    color: "rgb(112, 107, 107)",
                  }}
                >
                  {orderDetails?.description.length > 200
                    ? `${orderDetails?.description.slice(0, 200)}...`
                    : orderDetails?.description}
                  {orderDetails?.description.length > 200 && (
                    <span onClick={() => setReadMoreOn(true)}>
                      {"  "} Read More
                    </span>
                  )}
                </Typography>
              )}
              {readMoreOn && (
                <Typography
                  variant="body1"
                  style={{
                    lineBreak: "anywhere",
                    paddingTop: "10px",
                    color: "rgb(112, 107, 107)",
                  }}
                >
                  {orderDetails?.description && orderDetails?.description}
                  {orderDetails?.description.length > 200 && (
                    <span onClick={() => setReadMoreOn(false)}>
                      {"  "} Less
                    </span>
                  )}
                </Typography>
              )}
            </Box>
            {/* <Box mt={1}>
              <Typography variant="body1" color="primary">
                <span style={{ fontWeight: "bold" }}>Owned by :</span> &nbsp;
                <span style={{ color: "rgb(112, 107, 107)" }}>
                  {sortAddress(orderDetails?.currentOwner?.walletAddress)}{" "}
                  <CopyToClipboard
                    text={orderDetails?.currentOwner?.walletAddress}
                  >
                    <img
                      src="images/copyicon.png"
                      alt="imag"
                      width="13px"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => toast.info("Copied")}
                    />
                  </CopyToClipboard>
                </span>
              </Typography>
            </Box> */}
            {/* <Box mt={1}>
              <Typography variant="body1" color="primary">
                <span style={{ fontWeight: "bold" }}>Owner Name :</span> &nbsp;{" "}
                <span
                  style={{
                    color: "rgb(112, 107, 107)",
                    cursor: "pointer",
                  }}
                >
                  {" "}
                  <a
                    onClick={() => {
                      history.push({
                        pathname: "/author",
                        search: orderDetails?.currentOwner?._id,
                      });
                    }}
                  >
                    {orderDetails?.currentOwner?.name}{" "}
                  </a>
                </span>
              </Typography>
            </Box> */}

            <Box width="100%">
              <Grid lg={12} md={12} sm={12} xs={12}>
                {orderDetails?.itemCategory && (
                  <Box mt={1}>
                    <Typography variant="body1" color="primary">
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        Category Name :
                      </span>{" "}
                      &nbsp;{" "}
                      <span
                        style={{
                          color: "rgb(112, 107, 107)",
                          cursor: "pointer",
                        }}
                      >
                        {orderDetails?.itemCategory}
                      </span>
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Box>
          </Box>
        </Paper>

        <Box mt={1}>
          <Grid container spacing={1}>
            <Grid lg={6} md={6} sm={6} xs={12}>
              <Paper elevation={2} className="createrBox">
                <Typography variant="h5" color="primary">
                  Creator
                </Typography>
                <Box style={{ cursor: "pointer" }} className={classes.creColl}>
                  <figure
                    className="profileImg"
                    style={{ marginRight: 10, marginTop: "5px" }}
                    onClick={() => {
                      history.push({
                        pathname: "/author",
                        search: orderDetails?.userId?._id,
                      });
                    }}
                  >
                    <img
                      src={
                        orderDetails?.userId?.profilePic
                          ? orderDetails?.userId?.profilePic
                          : "/images/Profile.png"
                      }
                      alt=""
                    />
                  </figure>
                  <Typography
                    variant="body2"
                    style={{
                      overflow: "hidden",
                      width: "91%",
                      whiteSpace: "pre",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {" "}
                    <a
                      onClick={() => {
                        history.push({
                          pathname: "/author",
                          search: orderDetails?.userId?._id,
                        });
                      }}
                    >
                      {orderDetails?.userId?.name
                        ? orderDetails?.userId?.name
                        : sortAddress(orderDetails?.userId?.walletAddress)}{" "}
                    </a>
                    <CopyToClipboard text={orderDetails?.userId?.walletAddress}>
                      <img
                        src="images/copyicon.png"
                        alt="images"
                        width="13px"
                        style={{
                          cursor: "pointer",
                          filter: "grayscale(100%) brightness(1000%) contrast(100%)", 
                        }}
                        onClick={() => toast.info("Copied")}
                      />
                    </CopyToClipboard>
                  </Typography>
                </Box>
                {/*Highest Bid* */}
                <Box width="100%">
                  <Grid lg={12} md={12} sm={12} xs={12}>
                    {bidList && bidList?.length === 0 ? (
                      ""
                    ) : (
                      <Box
                        className={classes.creColl}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          history.push({
                            pathname: "/author",
                            search: orderDetails?.bidId[0]?.userId?._id,
                          });
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="primary"
                          style={{ marginLeft: "40px" }}
                        >
                          <span className="highestBox">Highest bid by </span>
                          {/* {bidList[0]?.userId?.name ? (
                            bidList[0]?.userId?.name
                          ) : (
                            <>
                              {sortAddress(bidList[0]?.userId?.walletAddress)}
                              &nbsp;
                              <CopyToClipboard text={hieghestbid}>
                                <img
                                  src="images/copyicon.png"
                                  alt="imag"
                                  width="13px"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  onClick={() => toast.info("Copied")}
                                />
                              </CopyToClipboard>
                            </>
                          )} */}
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                </Box>
                {/*Minimum Bid */}
                {orderDetails &&
                  orderDetails?.isPlace &&
                  orderDetails?.itemCategory != "private documents" && (
                    <Box style={{ marginTop: "5px" }}>
                      <Box m={"8px 0px"}>
                        <Grid container spacing={0}>
                          <Grid xs={12} style={{ marginBottom: "16px" }}>
                            <Box>
                              <Typography variant="h6" color="primary">
                                Minimum bid
                              </Typography>
                              <Typography variant="body2">
                                {orderDetails ? orderDetails?.bidAmount : "--"}{" "}
                                Metamart
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  )}
              </Paper>
            </Grid>
            <Grid lg={6} md={6} sm={6} xs={12}>
              <Paper elevation={2} className="createrBox">
                <Typography variant="h5" color="primary">
                  Collection
                </Typography>
                <Box
                  style={{ cursor: "pointer" }}
                  className={classes.creColl}
                  onClick={() => {
                    history.push({
                      pathname: "/collection-details",
                      search: orderDetails?.collectionId?._id,
                      state: {
                        data: orderDetails?.collectionId?.data,
                      },
                    });
                  }}
                >
                  <figure
                    className="profileImg"
                    style={{ marginRight: 10, marginTop: "5px" }}
                  >
                    <img
                      src={
                        orderDetails?.collectionId &&
                        orderDetails?.collectionId.collectionImage
                          ? orderDetails?.collectionId.collectionImage
                          : "/images/Profile.png"
                      }
                      alt=""
                    />
                  </figure>
                  <Typography
                    variant="body1"
                    style={{
                      overflow: "hidden",
                      width: "91%",
                      whiteSpace: "pre",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {" "}
                    {orderDetails?.collectionId?.displayName}
                  </Typography>
                </Box>
                {/*Aution End in Market Place Details on click the Explorer on Landing page */}
                {orderDetails &&
                  orderDetails?.isPlace &&
                  orderDetails?.itemCategory != "private documents" && (
                    <Box style={{ marginTop: "5px" }}>
                      <Box m={"8px 0px"}>
                        <Grid container spacing={0}>
                          {orderDetails &&
                          parseFloat(orderDetails?.endTime) <
                            new Date().getTime() ? (
                            // parseFloat(moment().unix() * 1000))
                            <Box className={classes.auctionend}>
                              <Typography variant="subtitle2">
                                Status
                              </Typography>
                              <Typography variant="body2">
                                Order Expired
                              </Typography>
                            </Box>
                          ) : (
                            <Grid xs={12} align="left">
                              <Typography variant="h6">
                                Auction ends in
                              </Typography>
                              <ul
                                className="MuiList"
                                style={{
                                  margin: "0px",
                                  padding: "0px",
                                }}
                              >
                                <li className={classes.listBoxContent}>
                                  <Typography variant="body2">
                                    <span>
                                      {timeLeft.days
                                        ? timeLeft.days && timeLeft.days
                                        : "0"}
                                    </span>
                                  </Typography>
                                  <Typography variant="body1">Days</Typography>
                                </li>
                                <li className={classes.listBoxContent}>
                                  <Typography variant="body2">
                                    <span>
                                      {timeLeft.hours
                                        ? timeLeft.hours && timeLeft.hours
                                        : "0"}
                                    </span>
                                  </Typography>
                                  <Typography variant="body1">Hours</Typography>
                                </li>
                                <li className={classes.listBoxContent}>
                                  <Typography variant="body2">
                                    {" "}
                                    <span>
                                      {timeLeft.minutes
                                        ? timeLeft.minutes && timeLeft.minutes
                                        : "0"}
                                    </span>
                                  </Typography>
                                  <Typography variant="body1">Min</Typography>
                                </li>
                                <li className={classes.listBoxContent}>
                                  <Typography variant="body2">
                                    <span>
                                      {timeLeft.seconds
                                        ? timeLeft.seconds && timeLeft.seconds
                                        : "0"}
                                    </span>{" "}
                                  </Typography>
                                  <Typography variant="body1">Sec</Typography>
                                </li>
                              </ul>
                            </Grid>
                          )}
                        </Grid>
                      </Box>
                    </Box>
                  )}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box>
        {openSale && (
          <Dialog
            fullWidth="sm"
            maxWidth="sm"
            open={openSale}
            className={classes.createbox}
            onClose={() => setOpenSale(false)}
            aria-labelledby="max-width-dialog-title"
          >
            <DialogActions>
              <IconButton
                onClick={() => setOpenSale(false)}
                className={classes.customizedButton}
              >
                <CloseIcon style={{ color: "#787878" }} />
              </IconButton>
            </DialogActions>
            <DialogContent>
              <Typography variant="h4" color="primary" className="modalTitle">
                Put On Sale
              </Typography>
              <Box className="checktoggel">
                <Typography color="primary" variant="body2">
                  Instant Sale Price
                </Typography>
                <Typography className="checktoggel2" component="div">
                  <Grid
                    component="label"
                    container
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item>
                      <AntSwitch name="checkedC" />
                    </Grid>
                  </Grid>
                </Typography>
                <Typography color="primary" variant="body2">
                  Enter the price for which the item will be instantly sold.
                </Typography>
              </Box>
              <Box mt={3}>
                <FormControl fullWidth className={classes.margin}>
                  <TextField
                    variant="outlined"
                    id="standard-adornment-amount"
                    placeholder="0.4"
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {" "}
                          <span style={{ color: "#039BE3" }}>FIERO</span>{" "}
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography color="primary" variant="body2">
                    Service fee <span>2.5%</span>
                  </Typography>
                  <Typography color="primary" variant="body2">
                    You will receive <b>0.0053 ETH</b> <span>$106.58</span>
                  </Typography>
                </FormControl>
              </Box>

              <Box justifyContent="center" display="flex" my={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenBuy(false)}
                  className={classes.btnWidth}
                  mb={2}
                >
                  Next step
                </Button>
                <Box ml={2}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setOpenBuy(false)}
                    className={classes.btnWidth}
                  >
                    CANCEL
                  </Button>
                </Box>
              </Box>
            </DialogContent>
          </Dialog>
        )}

        {openSale && (
          <Dialog
            fullWidth="sm"
            maxWidth="sm"
            open={openSale}
            className={classes.createbox}
            onClose={() => setOpenSale(false)}
            aria-labelledby="max-width-dialog-title"
          >
            <DialogActions>
              <IconButton
                onClick={() => setOpenSale(false)}
                className={classes.customizedButton}
              >
                <CloseIcon style={{ color: "#787878" }} />
              </IconButton>
            </DialogActions>
            <DialogContent>
              <Typography variant="h4" color="primary" className="modalTitle">
                Put On Sale
              </Typography>
              <Box className="checktoggel">
                <Typography color="primary" variant="body2">
                  Instant Sale Price
                </Typography>
                <Typography className="checktoggel2" component="div">
                  <Grid
                    component="label"
                    container
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item>
                      <AntSwitch name="checkedC" />
                    </Grid>
                  </Grid>
                </Typography>
                <Typography color="primary" variant="body2">
                  Enter the price for which the item will be instantly sold.
                </Typography>
              </Box>
              <Box mt={3}>
                <FormControl fullWidth className={classes.margin}>
                  <TextField
                    variant="outlined"
                    id="standard-adornment-amount"
                    placeholder="0.4"
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {" "}
                          <span style={{ color: "#039BE3" }}>FIERO</span>{" "}
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography color="primary" variant="body2">
                    Service fee <span>2.5%</span>
                  </Typography>
                  <Typography color="primary" variant="body2">
                    You will receive <b>0.0053 ETH</b> <span>$106.58</span>
                  </Typography>
                </FormControl>
              </Box>

              <Box justifyContent="center" display="flex" my={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenBuy(false)}
                  className={classes.btnWidth}
                  mb={2}
                >
                  Next step
                </Button>
                <Box ml={2}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setOpenBuy(false)}
                    className={classes.btnWidth}
                  >
                    CANCEL
                  </Button>
                </Box>
              </Box>
            </DialogContent>
          </Dialog>
        )}

        {openShare && (
          <Dialog
            open={openShare}
            className={classes.createbox}
            onClose={() => setOpenShare(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="xs"
            fullWidth
          >
            <DialogActions>
              <IconButton
                onClick={() => setOpenShare(false)}
                className={classes.customizedButton}
              >
                <CloseIcon style={{ color: "#787878" }} />
              </IconButton>
            </DialogActions>
            <DialogContent>
              <Box className={classes.sharemodal} mb={2} align="center" mt={3}>
                <ShareSocialMedia url={window.location} />
              </Box>
            </DialogContent>
          </Dialog>
        )}
        {openReport && (
          <Dialog
            fullWidth="sm"
            maxWidth="sm"
            open={openReport}
            className={classes.createbox}
            onClose={() => setOpenReport(false)}
            aria-labelledby="max-width-dialog-title"
          >
            <DialogActions>
              <IconButton
                onClick={() => setOpenReport(false)}
                className={classes.customizedButton}
              >
                <CloseIcon style={{ color: "#787878" }} />
              </IconButton>
            </DialogActions>
            <DialogContent>
              <Typography variant="h5" color="primary">
                Why are you reporting?
              </Typography>
              <Typography
                variant="body2"
                component="span"
                style={{
                  fontSize: "12px",
                }}
                color="primary"
              >
                Describe why you think this item should be removed from
                marketplace
              </Typography>

              <Box mt={2} className={classes.textfilmessage}>
                <Typography
                  variant="body2"
                  color="primary"
                  style={{ paddingTop: "10px" }}
                >
                  Message
                </Typography>
                <TextField
                  style={{ marginTop: "5px" }}
                  fullWidth
                  type="text"
                  variant="outlined"
                  multiline
                  rows={4}
                  rowsMax={4}
                  inputProps={{
                    maxLength: 600,
                  }}
                  placeholder="Tell us some details"
                  className={classes.textfildBorder}
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
                {isSubmit && message === "" && (
                  <FormHelperText error>Please enter message</FormHelperText>
                )}
              </Box>
              <Box
                align="left"
                className="modal_button_div"
                mt={2}
                mb={2}
                display="flex"
              >
                {/* <Button
                  variant="contained"
                  color="primary"
                  onClick={() => postReport()}
                  className={classes.btnWidth}
                  disabled={isUpdatingData}
                  mb={2}
                >
                  REPORT {isUpdatingData && <ButtonCircularProgress />}
                </Button>{" "} */}
                &nbsp; &nbsp;
                <Button
                  variant="outlined"
                  onClick={() => {
                    setOpenReport(false);
                  }}
                  className={classes.btnWidth}
                  color="primary"
                >
                  CANCEL
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
        )}
      </Box>
    </>
  );
}
