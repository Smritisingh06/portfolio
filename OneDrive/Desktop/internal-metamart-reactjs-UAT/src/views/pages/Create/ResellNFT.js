import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  FormControl,
  InputAdornment,
  Input,
  FormHelperText,
  Paper,
  TextField,
} from "@material-ui/core";
import DeployABI from "src/constants/ABI/DeployABI.json";
import {
  getWeb3Obj,
  getContract,
  getWeb3ContractObject,
  deadAddress,
  sortAddress,
} from "src/utils";
import MarketplaceABI from "src/constants/ABI/MarketplaceABI.json";
import NftTokenABI from "src/constants/ABI/NftTokenABI.json";
import { DateTimePicker } from "@material-ui/pickers";
import Apiconfig from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import axios from "axios";
import Button from "@material-ui/core/Button";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useWeb3React } from "@web3-react/core";
import moment from "moment";
import { UserContext } from "src/context/User";
import { useHistory, useLocation } from "react-router-dom";
import {
  approveTokenHandler,
  placeNormalOrderBlockchainHandler,
} from "src/services";
import {
  NetworkDetails,
  marketplaceContract,
  swichNetworkHandler,
  currency,
  contractKovan,
  getNetworkDetails,
  NftTokenAddress,
  getMarketplaceContractAddress,
  getNormalMarketplaceContractAddress,
} from "src/constants";
import ResaleSale from "./ResaleSale";
import CopyToClipboard from "react-copy-to-clipboard";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "40px",
    paddingBottom: theme.spacing(10),
  },
  boxsection: {
    borderRadius: "10px",
    padding: "10px",
  },
  nftImg: {
    width: "100%",
    height: "165px ",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "100% !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "10px 10px 0px 0px",
    backgroundColor: "#ccc !important",
  },
  box3: {
    display: "flex",
    alignItems: "center",
    "& h6": {
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "130%",
      marginLeft: "8px",
    },
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "75px",
      overflow: "hidden",
      width: "75px",
      border: "2px solid #4ea6f5",
      borderRadius: "10px",
      "& img": {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "auto",
        display: "block",
      },
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
    margin: "0 10px",
  },
  title: {
    borderBottom: "1px solid #eaeaea",
  },
  formControl: {
    padding: 0,
    width: "100%",
  },
  price: {
    "& label": { color: "#000000" },
  },
  label1: {
    color: "#000000",
  },
  NftImg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "210px",
      overflow: "hidden",
      background: "rgba(0 , 0, 0, 0.041)",
      "& img": {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "auto",
        display: "block",
      },
    },
  },
  CreateFormField: {
    padding: "25px",
    boxSizing: "border-box",
    borderRadius: "10px",
    // backdropFilter: "blur(44px)",
  },
}));

export default function CreateNFT(props) {
  const classes = useStyles();
  const history = useHistory();
  const [orderId, setOrderId] = useState();
  const user = useContext(UserContext);
  const { account, chainId, library } = useWeb3React();
  const { data, type, index } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [loaderOncancled, setloaderOncancled] = useState(false);
  const [orderDetails, setOrderDetails] = useState();
  const [resalemsg, setResalemsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [price, setPrice] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [network, setNetwork] = useState(NetworkDetails[0]);
  const [endDate, setEndDate] = useState(moment().add(1, "year"));
  const [royalty, setRoyalty] = useState("");
  const [isValidRoyalty, setIsRoyaltyValid] = useState(true);
  const [isInvalidUrl, setIsInValidVUrl] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [numberofCopies, setNumberofCopies] = useState("");
  const [oderExtraDeails, setOderExtraDeails] = useState("");
  const [bidExtraDetails, setBidExtraDetails] = useState("");
  const [currentOwner, setCurrentOwner] = useState("");

  const UserID = location.orderIddata;
  const updateDimensions = () => {
    var offsetWidth = document.getElementById("imagecard" + index).offsetWidth;
    var newoofsetWidth = offsetWidth - 80;
    document.getElementById("imagecard" + index).style.height =
      newoofsetWidth + "px";
  };
  useEffect(() => {
    updateDimensions();
  }, [data, index]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const GetMatketPlaccOwnerAccount = async (response) => {
    try {
      // const contractObj = getContract(
      //   marketplaceContract,
      //   MarketplaceABI,
      //   library,
      //   account
      // );
      const contractObj = await getWeb3ContractObject(
        MarketplaceABI,
        marketplaceContract,
        getNetworkDetails[0]?.rpcUrls
      );

      const ordersData = await contractObj.methods
        .orderByAssetId(
          response?.collectionId?.contractAddress,
          response.tokenId
        )
        .call();
      // setcheckOrderIsexpired(ordersData);
    } catch (error) {}
  };
  const CancleExpiredOrder = async () => {
    setloaderOncancled(true);
    try {
      const contractObj = getContract(
        marketplaceContract,
        MarketplaceABI,
        library,
        account
      );
      const cancelOrder = await contractObj.cancelOrder(
        orderDetails?.collectionId?.contractAddress,
        orderDetails.tokenId.toString()
      );
      await cancelOrder.wait();
      setloaderOncancled(false);
      toast.success(
        "The NFT has been canceled and returned to your connected wallet."
      );
      const cancelTokenSource = axios.CancelToken.source();
      if (orderId) {
        getNftDetails(orderId, cancelTokenSource);
      }
      return () => {
        cancelTokenSource.cancel();
      };
      // setOderExtraDeails(ordersData);
    } catch (error) {
      setloaderOncancled(false);

      console.log(" ----- cancelOrder ", error);
      let errResponse = error.message.split("(")[0];
      toast.error(errResponse);
    }
  };
  useEffect(() => {
    // GetMatketPlaccOwnerAccount();
    if (location.search && location.search.length > 0) {
      const ids = location.search.split("?");
      if (ids[1]) {
        setOrderId(ids[1]);
      }
    }
  }, [location]);
  useEffect(() => {
    if (orderDetails && NetworkDetails) {
      const networkData = NetworkDetails.filter(
        (list) => list.chainId == orderDetails.network
      );
      setNetwork(networkData[0]);
      swichNetworkHandler(orderDetails.network);
    }
  }, [NetworkDetails, orderDetails]);
  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    if (orderId) {
      getNftDetails(orderId, cancelTokenSource);
    } else {
    }

    return () => {
      cancelTokenSource.cancel();
    };
  }, [orderId, user.userData]);
  const getNftDetails = async (id, cancelTokenSource) => {
    try {
      const res = await axios.get(Apiconfig.viewNFT + id, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setOrderDetails(res.data.result);
        GetMatketPlaccOwnerAccount(res.data.result);
        getOrderExtraDetails(
          res.data.result?.collectionId?.contractAddress,
          res.data.result?.tokenId,
          res.data.result?.network,
          res.data.result?.collectionId?.isLazyMinting,
          res.data.result?.isResale
        );
      } else {
        setOrderDetails();
      }
      setIsLoadingData(false);
    } catch (error) {
      setIsLoadingData(false);

      console.log("ERROR", error);
    }
  };

  const getOrderExtraDetails = async (
    contractAddress,
    tokenID,
    chianId,
    isLazyMinting,
    isResale
  ) => {
    const OpenMarketplace = !isResale
      ? getMarketplaceContractAddress(chianId)
      : getNormalMarketplaceContractAddress(chianId);
    const networkDetails = getNetworkDetails(chianId);
    // setNetworkDetails(networkDetails[0]);

    const contractObj = await getWeb3ContractObject(
      DeployABI,
      contractAddress,
      networkDetails[0].rpcUrls
    );

    const contractObjNormal = await getWeb3ContractObject(
      MarketplaceABI,
      OpenMarketplace,
      networkDetails[0].rpcUrls
    );

    try {
      const ownerOf = await contractObj.methods.ownerOf(tokenID).call();
      setCurrentOwner(ownerOf);
    } catch (error) {
      console.log("ERROR", error);
    }

    try {
      if (isLazyMinting && !isResale) {
        const ordersData = await contractObjNormal.methods
          .orderByAssetId(tokenID)
          .call();

        setOderExtraDeails(ordersData);
        if (ordersData?.seller == deadAddress) {
          setIsCancelled(true);
        }
      } else {
        const ordersData = await contractObjNormal.methods
          .orderByAssetId(contractAddress, tokenID)
          .call();

        setOderExtraDeails(ordersData);
        if (ordersData?.seller == deadAddress) {
          setIsCancelled(true);
        }
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsCancelled(true);
    }
    try {
      if (isLazyMinting && !isResale) {
        const bidByOrderId = await contractObjNormal.methods
          .bidByOrderId(tokenID)
          .call();
        setBidExtraDetails(bidByOrderId);
      } else {
        const bidByOrderId = await contractObjNormal.methods
          .bidByOrderId(contractAddress, tokenID)
          .call();
        setBidExtraDetails(bidByOrderId);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const submitHandler = async () => {
    setIsSubmit(true);
    // if (chainId == orderDetails?.network) {
    if (price !== "" && parseFloat(price) > 0) {
      try {
        setIsLoading(true);
        setResalemsg("Approving");
        if (
          await approveTokenHandler(
            orderDetails.tokenId.toString(),
            orderDetails?.collectionId?.contractAddress,
            NftTokenABI,
            library,
            account,
            marketplaceContract
          )
        ) {
          setResalemsg("Creating Order");
          const royaltySendCheck =
            orderDetails?.collectionId?.contractAddress === contractKovan &&
            account === user?.ownerAccount
              ? royalty
              : orderDetails?.royalties;
          if (
            await placeNormalOrderBlockchainHandler(
              marketplaceContract,
              MarketplaceABI,
              library,
              account,
              orderDetails?.collectionId?.contractAddress,
              orderDetails?.tokenId,
              price?.toString(),
              royaltySendCheck,
              endDate,
              currency
            )
          ) {
            const token = sessionStorage.getItem("token");

            let body = {
              nftId: orderDetails?._id,
              orderId: UserID,
              title: orderDetails?.title,
              details: orderDetails?.description,
              time: (moment().unix() * 1000).toString(),
              startingBid: price.toString(),
              tokenName: orderDetails?.tokenName,
              description: orderDetails?.description,
              royalties: royaltySendCheck,
              startPrice: price?.toString(),
              price: price?.toString(),
              coupounAddress: "0x",
              startTime: (moment().unix() * 1000).toString(),
              endTime: (moment(endDate).unix() * 1000)?.toString(),
              expiryTime: (moment(endDate).unix() * 1000)?.toString(),
              currentOwner: account,
              network: orderDetails?.network,
              currentOwner: user?.userData?._id,
            };

            const placeres = await axios({
              method: "post",
              url: Apiconfig["createOrder"],
              data: body,
              headers: {
                token,
              },
            });

            if (placeres) {
              if (placeres && placeres.data.statusCode === 200) {
                toast.success(placeres.data.responseMessage);
                history.push("/explore");
              } else {
                setResalemsg("");
                toast.error(placeres.data.responseMessage);
              }
            } else {
              setResalemsg("");
              toast.error("Something went wrong");
            }
          } else {
            setResalemsg("");
            toast.error("Something went wrong");
          }
        } else {
          // toast.error(error.message);
          // setResalemsg("");
          toast.error("Something went wrong");
        }
      } catch (error) {
        setResalemsg("");
        // toast.error(error.message);

        let errResponse = error.message.split("(")[0];
        toast.error(errResponse);
        setIsLoading(false);
      }
    } else {
      setResalemsg("");
      toast.error("Please enter valid data");
    }

    setIsLoading(false);
  };

  //AcceptBid
  // const acceptBidBlockchainHandler = async () => {
  //   if (chainId == orderDetails?.network) {
  //     if (
  //       bidList.length > 0 &&
  //       bidList[0].price &&
  //       bidExtraDetails &&
  //       bidExtraDetails.bidder.toLowerCase() !== deadAddress.toLowerCase()
  //     ) {
  //       // setIsUpdatingAcceptBid(true);
  //       try {
  //         const OpenMarketplace = getNormalMarketplaceContractAddress(
  //           orderDetails?.network
  //         );
  //         const contractObj = getContract(
  //           OpenMarketplace,
  //           MarketplaceABI,
  //           library,
  //           account
  //         );
  //         const res = await contractObj.acceptBid(
  //           orderDetails?.collectionId?.contractAddress,
  //           orderDetails?.nftId?.tokenId,
  //           ethers.utils.parseEther(bidList[0].price.toString())
  //         );
  //         await res.wait();

  //         let commitionCharge =
  //           (Number(bidList[0].price) * Number(marketFeeDetails)) / 100;
  //         // safeExecute?.hash
  //         // ......
  //         acceptBidAPIHandler(false, res?.hash, commitionCharge);
  //       } catch (error) {
  //         // setIsUpdatingAcceptBid(false);
  //         // toast.error(error.message);
  //         let message = error.message;
  //         toast.error(message.split("(")[0]);
  //       }
  //     } else {
  //       toast.warn("Bid not found");
  //     }
  //   } else {
  //     swichNetworkHandler(orderDetails?.network);
  //     // toast.warn(
  //     //   // "Please switch network to " + networkDetails?.nativeCurrency?.name
  //     // );
  //   }
  // };

  // const acceptBidAPIHandler = async (
  //   isAccept,
  //   transactionHash,
  //   commitionCharge
  // ) => {
  //   try {
  //     if (orderDetails?.nftId?.tokenId !== false) {
  //       const res = await axios({
  //         method: "post",
  //         url: Apiconfig.sendOrderToUser,
  //         headers: {
  //           token: sessionStorage.getItem("token"),
  //         },
  //         data: {
  //           description: orderDetails?.description,
  //           royalties: orderDetails?.royalties,
  //           currentOwner: bidList[0].userId._id,
  //           collectionId: orderDetails?.collectionId?._id,
  //           orderId: orderDetails?._id,
  //           userId: bidList[0].userId._id,
  //           network: orderDetails?.network,
  //           tokenId: orderDetails?.nftId?.tokenId,
  //           commitionCharge: commitionCharge.toString(),
  //           transactionHash: transactionHash,
  //         },
  //       });
  //       // getNftDetails(orderDetails._id);
  //       if (res.data.statusCode === 200) {
  //         if (isAccept) {
  //         }
  //         toast.success(res.data.responseMessage);
  //         history.push("/profile");
  //       } else {
  //         toast.warn(res.data.responseMessage);
  //       }
  //     } else {
  //       toast.error("Something went wrong");
  //     }
  //     // setIsUpdatingAcceptBid(false);
  //   } catch (error) {
  //     // setIsUpdatingAcceptBid(false);
  //     // toast.error(error.message);
  //     let message = error.message;
  //     toast.error(message.split("(")[0]);
  //   }
  // };
  return (
    <Box className={classes.root}>
      <Container maxWidth="md">
        <Box>
          {/* {orderDetails && !orderDetails?.isExpired ? (
            <Typography variant="h2" color="primary">
              {orderDetails &&
              orderDetails.collectionId &&
              orderDetails.collectionId.contractAddress === contractKovan &&
              account === user?.ownerAccount
                ? "Sell NFT"
                : `Resale NFT`}
            </Typography>
          ) : ( */}
          {isCancelled ? (
            <Typography variant="h2" color="primary">
              {account &&
                isCancelled &&
                currentOwner &&
                currentOwner.toLowerCase() != account.toLowerCase() && (
                  <>NFT Expired</>
                )}
            </Typography>
          ) : (
            <Typography variant="h2" color="primary">
              {orderDetails &&
              orderDetails.collectionId &&
              orderDetails.collectionId.contractAddress === contractKovan &&
              account === user?.ownerAccount
                ? "Sell NFT"
                : `Resale NFT`}
            </Typography>
          )}
          {/* )} */}
        </Box>
        <Box mt={2}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              {/* <label className={classes.label1}>Preview</label> */}
              <Paper elevation={2} className={classes.boxsection}>
                <Box
                  id={`imagecard${index}`}
                  className={classes.nftImg}
                  style={
                    orderDetails?.coverImage
                      ? { background: "url(" + orderDetails?.coverImage + ")" }
                      : {
                          background: "url(" + "images/market_detail.png" + ")",
                        }
                  }
                ></Box>

                <Box className={classes.box3}>
                  {orderDetails?.physicalType === "MULTIPLE" ||
                  orderDetails?.physicalType === "SINGLE" ? (
                    <></>
                  ) : (
                    <>
                      <figure>
                        <img
                          src={
                            user?.userData?.profilePic
                              ? user?.userData?.profilePic
                              : "images/Profile.png"
                          }
                          alt="nftimg"
                        />
                      </figure>
                      <Typography variant="h6" color="primary">
                        {user.userData?.name}
                      </Typography>
                    </>
                  )}
                </Box>
                <Box mt={2}>
                  <Paper elevation={2}>
                    <Box className={classes.chain} mb={1}>
                      <Typography variant="h5" color="primary">
                        Chain info
                      </Typography>
                    </Box>
                    <Grid container spacing={0}>
                      <Grid lg={4} md={6} sm={6} xs={6}>
                        <Typography variant="body2" color="primary">
                          Contract Address:
                        </Typography>
                      </Grid>
                      <Grid lg={8} md={6} sm={6} xs={6}>
                        <Typography
                          variant="body1"
                          style={{
                            color: "rgb(112, 107, 107)",
                            textAlign: "end",
                          }}
                        >
                          {sortAddress(
                            orderDetails?.collectionId.contractAddress
                          )}{" "}
                          <CopyToClipboard
                            text={orderDetails?.collectionId.contractAddress}
                          >
                            <img
                              src="images/copyicon.png"
                              alt="copyicon"
                              width="13px"
                              style={{
                                cursor: "pointer",
                                filter: "grayscale(100%) brightness(1000%) contrast(100%)", 
                              }}
                              onClick={() => toast.info("Copied")}
                            />
                          </CopyToClipboard>
                        </Typography>
                      </Grid>
                      <Grid lg={4} md={6} sm={6} xs={6}>
                        <Typography variant="body2" color="primary">
                          Token ID:
                        </Typography>
                      </Grid>
                      <Grid lg={8} md={6} sm={6} xs={6}>
                        <Typography
                          variant="body1"
                          style={{
                            color: "rgb(112, 107, 107)",
                            textAlign: "end",
                          }}
                        >
                          {orderDetails?.tokenId}
                        </Typography>
                      </Grid>
                      <Grid lg={4} md={6} sm={6} xs={6}>
                        <Typography variant="body2" color="primary">
                          Blockchain:
                        </Typography>
                      </Grid>
                      <Grid lg={8} md={6} sm={6} xs={6}>
                        <Typography
                          variant="body1"
                          style={{
                            color: "rgb(112, 107, 107)",
                            textAlign: "end",
                          }}
                        >
                         Metamart Mainnet
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Box>
              </Paper>
              {(orderDetails?.mediaType === "audio" ||
                orderDetails?.mediaType === "video") && (
                <Box style={{ width: "100%" }}>
                  <video
                    width="100%"
                    loop={false}
                    autoPlay={false}
                    muted={true}
                    controls
                    style={
                      orderDetails?.mediaType === "audio" ? { height: 75 } : {}
                    }
                  >
                    <source src={orderDetails?.uri} type="video/mp4" />
                  </video>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={6} className="order2">
              <Paper elevation={2} mb={2} className={classes.CreateFormField}>
                <Box>
                  <Box pt={1}>
                    <ResaleSale orderDetails={orderDetails} />
                  </Box>
                  {currentOwner.toLowerCase() == account.toLowerCase() ? (
                    <Box mt={2}>
                      <Typography variant="subtitle1" color="primary">
                        {" "}
                        Please enter preferred price for your NFT to allow users
                        to instantly purchase.
                      </Typography>
                      <Box>
                        <Box mt={3} className={classes.price}>
                          <Typography variant="body2" color="primary">
                            Price
                          </Typography>
                          <FormControl fullWidth className={classes.margin}>
                            <TextField
                              variant="outlined"
                              id="standard-adornment-amount"
                              placeholder="0.00"
                              type="number"
                              disabled={isLoading}
                              onKeyPress={(event) => {
                                if (event?.key === "-" || event?.key === "+") {
                                  event.preventDefault();
                                }
                              }}
                              onChange={(e) => {
                                if (e.target.value && e.target.value != "-") {
                                  setPrice(Math.abs(Number(e.target.value)));
                                } else {
                                  setPrice();
                                }
                              }}
                              error={
                                isSubmit &&
                                (price === "" || parseFloat(price) <= 0)
                              }
                              helperText={
                                isSubmit &&
                                (price === "" || parseFloat(price) <= 0) &&
                                "Please enter price"
                              }
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <small>
                                      <span
                                        style={{ color: "rgb(112, 107, 107)" }}
                                      >
                                        Metamart
                                      </span>
                                    </small>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </FormControl>
                        </Box>
                        {orderDetails?.physicalType === "MULTIPLE" ? (
                          <>
                            <Box mt={3} className={classes.price}>
                              <Typography variant="body2" color="primary">
                                No of NFTs copies
                              </Typography>
                              <FormControl fullWidth className={classes.margin}>
                                <TextField
                                  variant="outlined"
                                  id="standard-adornment-amount"
                                  placeholder="0.00"
                                  type="number"
                                  disabled={isLoading}
                                  onKeyPress={(event) => {
                                    if (
                                      event?.key === "-" ||
                                      event?.key === "+"
                                    ) {
                                      event.preventDefault();
                                    }
                                  }}
                                  // onChange={(e) => {
                                  //   if (e.target.value && e.target.value != "-") {
                                  //     setPrice(Math.abs(Number(e.target.value)));
                                  //   } else {
                                  //     setPrice();
                                  //   }
                                  // }}
                                  onChange={(e) => {
                                    if (parseFloat(e.target.value) <= 1) {
                                      setIsInValidVUrl(true);
                                    } else {
                                      setIsInValidVUrl(false);
                                    }
                                    if (
                                      parseFloat(e.target.value) <=
                                      parseFloat(orderDetails?.quantity)
                                    ) {
                                      setIsInValidVUrl(false);
                                    } else {
                                      setIsInValidVUrl(true);
                                    }
                                    setNumberofCopies(e.target.value);
                                  }}
                                />
                                {isInvalidUrl && numberofCopies !== "" && (
                                  <FormHelperText error>
                                    Please enter valid no of copies.
                                  </FormHelperText>
                                )}
                              </FormControl>
                              <Box>
                                <Typography
                                  style={{
                                    color: "rgb(111 115 111)",
                                    fontSize: "13px",
                                  }}
                                >
                                  Available copies {orderDetails?.quantity}
                                </Typography>
                              </Box>
                            </Box>
                          </>
                        ) : (
                          ""
                        )}
                        {orderDetails &&
                          orderDetails.collectionId &&
                          orderDetails.collectionId.contractAddress ===
                            contractKovan &&
                          account === user?.ownerAccount && (
                            <Box mt={3} className={classes.price}>
                              <Typography variant="body2" color="primary">
                                Royalty
                              </Typography>
                              <FormControl fullWidth className={classes.margin}>
                                <TextField
                                  variant="outlined"
                                  id="standard-adornment-amount"
                                  placeholder="0"
                                  type="number"
                                  disabled={isLoading}
                                  value={royalty}
                                  onKeyPress={(event) => {
                                    if (
                                      event?.key === "-" ||
                                      event?.key === "+" ||
                                      event?.key === "."
                                    ) {
                                      event.preventDefault();
                                    }
                                  }}
                                  onChange={(e) => {
                                    setRoyalty(e.target.value);
                                    if (
                                      e.target.value < 0 ||
                                      e.target.value > 10
                                    ) {
                                      setIsRoyaltyValid(false);
                                    } else {
                                      setIsRoyaltyValid(true);
                                    }
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <small>
                                          <span
                                            style={{
                                              color: "rgb(112, 107, 107)",
                                            }}
                                          >
                                            Metamart
                                          </span>
                                        </small>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                                {!isValidRoyalty && royalty !== "" && (
                                  <FormHelperText error>
                                    Please enter royalty between 0 to 10
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </Box>
                          )}

                        <Box mt={4}>
                          <Typography variant="body2" color="primary">
                            Expiration Date
                          </Typography>
                          <FormControl className={classes.formControl}>
                            <DateTimePicker
                              inputVariant="outlined"
                              value={endDate}
                              onChange={(date) => {
                                setEndDate(date);
                              }}
                              disabled={isLoading}
                              format="DD/MM/yyyy hh:mm A"
                              minDate={moment()}
                              renderInput={(params) => (
                                <TextField variant="outlined" {...params} />
                              )}
                            />
                          </FormControl>
                        </Box>

                        <Box mt={3}></Box>
                      </Box>
                    </Box>
                  ) : (
                    ""
                  )}
                </Box>
                {currentOwner.toLowerCase() == account.toLowerCase() ? (
                  <Box mt={4}>
                    {!isLoading ? (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          onClick={submitHandler}
                          disabled={isLoading || !isValidRoyalty}
                        >
                          {`${
                            orderDetails?.collectionId?.contractAddress ===
                              contractKovan && account === user?.ownerAccount
                              ? "Sell"
                              : "Resell"
                          } Item`}{" "}
                          {isLoading && <ButtonCircularProgress />}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          disabled={isLoading || !isValidRoyalty}
                        >
                          {resalemsg} {isLoading && <ButtonCircularProgress />}
                        </Button>
                      </>
                    )}
                  </Box>
                ) : (
                  <Box mt={4}>
                    {!isLoading ? (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          onClick={CancleExpiredOrder}
                          // disabled={isLoading || !isValidRoyalty}
                          disabled={loaderOncancled}
                        >
                          Cancle Order
                          {loaderOncancled && <ButtonCircularProgress />}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          disabled={isLoading || !isValidRoyalty}
                        >
                          {resalemsg} {isLoading && <ButtonCircularProgress />}
                        </Button>
                      </>
                    )}
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
