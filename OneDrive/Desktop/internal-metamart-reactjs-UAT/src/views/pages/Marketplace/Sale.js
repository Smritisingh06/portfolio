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
  Popper,
  Fade,
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
import SharePopper from "src/component/SharePopper";

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
    alignItems: "start",
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
    [theme.breakpoints.down("xs")]: {
      top: "-16px",
      right: "-16px",
      position: "absolute",
      zIndex: "999",
    },
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
export default function Sale({
  orderId,
  setOrderDetailsParent,
  setBidListParent,
  setIsLoadingParent,
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
  const [openMenu, setOpenMenu] = useState(false);
  const [openReport, setOpenReport] = useState(false);

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

  const [openSale, setOpenSale] = useState(false);
  // const [policy, setPolicy] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const [orderDetails, setOrderDetails] = useState();

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
  // const [open2, setOpen2] = React.useState(false);
  // const [open7, setOpen7] = React.useState(false);
  const [currentOwner, setCurrentOwner] = useState("");
  const [isOrderExpired, setIsOrderExpired] = useState(false);
  const [bidExtraDetails, setBidExtraDetails] = useState();
  const [isPrivate, setIsPrivate] = useState(false);
  // const handleMenuOpen = () => {
  //   setOpenMenu(true);
  // };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };
  // const hellochange = () => {
  //   setOpen2(true);
  // };

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
  const getFeeAPIHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfig.getFee,
      });
      if (res.data.statusCode === 200) {
        setMarketFeeDetails(
          res.data?.result.find((item) => item?.type === "MarketPlace").amount
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    getFeeAPIHandler();
  }, []);
  useEffect(() => {
    if (account) {
      GetBalance();
    }
  }, [account]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(
        calculateTimeLeft(
          new Date(
            parseInt(
              orderDetails?.expiryTime
                ? orderDetails?.expiryTime
                : updateexpirydate?.expiryTime
            )
          )
        )
        // calculateTimeLeft(new Date(parseInt(updateexpirydate?.expiryTime) * 1000))
      );
    }, 1000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    if (orderId) {
      getNftDetails(orderId, cancelTokenSource);
    } else {
      // setIsLoading(false);
    }

    return () => {
      cancelTokenSource.cancel();
    };
  }, [orderId, user.userData]);

  useEffect(() => {
    if (orderDetails) {
      setOrderDetailsParent(orderDetails);
    }
  }, [orderDetails]);

  useEffect(() => {
    if (bidList) {
      setBidListParent(bidList);
    }
  }, [bidList]);

  useEffect(() => {
    setIsLoadingParent(isLoading);
  }, [isLoading]);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    if (orderId) {
      getNftDetails(orderId, cancelTokenSource);
    } else {
      // setIsLoading(false);
    }

    return () => {
      cancelTokenSource.cancel();
    };
  }, [orderId, user.userData]);

  const getNftDetails = async (id, cancelTokenSource) => {
    setIsSubmit(false);

    try {
      const res = await axios.get(Apiconfig.viewOrder + id, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setOrderDetails(res.data.result);

        setBidList(res.data.result.bidId.reverse());

        if (user.userData && res.data.result) {
          let likesUsers = res.data.result.likesUsers.filter(
            (order) => order === user.userData._id
          );
          setIsLike(likesUsers.length > 0);
        }
        setIsOrderExpired(
          parseFloat(res.data.result.endTime) < parseFloat(moment().unix())
        );

        if (res.data.result?.collectionId?.contractAddress) {
          getOrderExtraDetails(
            res.data.result?.collectionId?.contractAddress,
            res.data.result?.nftId?.tokenId,
            res.data.result?.network,
            res.data.result?.nftId?.isResale
          );
        }
      } else {
        setOrderDetails();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log("ERROR", error);
    }
  };

  const getOrderExtraDetails = async (
    contractAddress,
    tokenID,
    chianId,
    isResale
  ) => {
    const OpenMarketplace = !isResale
      ? getNetworkDetails(chianId)
      : getNormalMarketplaceContractAddress(chianId);
    const networkDetails = getNetworkDetails(chianId);

    setNetworkDetails(networkDetails);

    const contractObj = await getWeb3ContractObject(
      NftTokenABI,
      contractAddress,
      networkDetails[0]?.rpcUrls
    );
    const getRoyaltyAmount = await contractObj.methods
      .getRoyaltyAmount(tokenID)
      .call();

    const contractObjNormal = await getWeb3ContractObject(
      MarketplaceABI,
      marketplaceContract,
      networkDetails[0]?.rpcUrls
    );
    try {
      const ownerOf = await contractObj.methods.ownerOf(tokenID).call();
      setCurrentOwner(ownerOf);
    } catch (error) {
      console.log("ERROR", error);
    }

    try {
      if (isResale) {
        const ordersData = await contractObjNormal.methods
          .orderByAssetId(NftTokenAddress, tokenID)
          .call();
        console.log(" ---- ordersData ", ordersData);
        setOderExtraDeails(ordersData);

        if (ordersData?.seller == deadAddress) {
          setIsCancelled(true);
        }
      } else {
        const ordersData = await contractObjNormal.methods
          .orderByAssetId(contractAddress, tokenID)
          .call();
        console.log(" ---- ordersData ", ordersData);
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
      if (!isResale) {
        const bidByOrderId = await contractObjNormal.methods
          .bidByOrderId(contractAddress, tokenID)
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

  //Buyt NFT

  const buyOrderBlockchainHandler = async () => {
    if (orderDetails?.network && chainId == orderDetails?.network) {
      if (
        !isOrderExpired &&
        orderExtraDeails?.seller?.toLowerCase() !== deadAddress?.toLowerCase()
      ) {
        if (
          orderExtraDeails?.seller?.toLowerCase() !== account?.toLowerCase()
        ) {
          try {
            setIsUpdatingData(true);

            const contractObj = getContract(
              marketplaceContract,
              MarketplaceABI,
              library,
              account
            );
            console.log(" ---- contractObj ", contractObj);
            if (Number(orderDetails?.price) < Number(balanceValue)) {
              const safeExecute = await contractObj.safeExecuteOrder(
                orderDetails?.collectionId?.contractAddress,
                orderDetails?.nftId?.tokenId,
                0,
                {
                  value: ethers.utils.parseEther(
                    orderDetails?.price?.toString()
                  ),
                }
              );

              await safeExecute.wait();

              let commitionCharge =
                (Number(orderDetails?.price) * Number(marketFeeDetails)) / 100;
              // settransHash(safeExecute?.hash);

              await buyOrderHandler(false, safeExecute?.hash, commitionCharge);
            } else {
              toast.error("Your wallet balance is too low");
              setOpenPlaceBid(false);
            }
            setIsUpdatingData(false);
          } catch (error) {
            setIsUpdatingData(false);
            console.log(error);
            let message = error.message;
            toast.error(message.split("(")[0]);
          }
        } else {
          toast.warn("Owner can't buy it");
          setIsUpdatingData(false);
        }
      } else {
        toast.error("Order expired");
        setIsUpdatingData(false);
      }
    } else {
      swichNetworkHandler(orderDetails?.network);
      toast.warn(
        "Please switch network to " + networkDetails?.nativeCurrency?.name
      );
    }
  };

  const buyOrderHandler = async (
    isAccept,
    transactionHash,
    commitionCharge
  ) => {
    try {
      if (orderDetails?.nftId?.tokenId !== false) {
        const res = await axios.post(
          Apiconfig.buyOrder,
          {
            orderId: orderDetails?._id,
            collectionId: orderDetails?.collectionId._id,
            description: orderDetails?.description,
            royalties: orderDetails?.royalties,
            currentOwner: user?.userData?._id,
            network: orderDetails?.network,
            tokenId: orderDetails?.nftId?.tokenId,
            commitionCharge: commitionCharge.toString(),
            transactionHash: transactionHash,
          },
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        );
        getNftDetails(orderDetails?._id);
        if (res.data.statusCode === 200) {
          if (isAccept) {
            // deleteOrderHandler();
          }
          const dataall = res.data.result;
          toast.success(res.data.responseMessage);
          setOpenBuy(false);
          // history.push("/profile");
          history.push({
            pathname: "/profile",
            state: dataall,
            data: "congratulation",
          });
        } else {
          toast.warn(res.data.responseMessage);
        }
      } else {
        toast.error("Something went wrong");
      }
      setIsUpdatingData(false);
    } catch (error) {
      setIsUpdatingData(false);
      // toast.error(error.message);
      let message = error.message;
      toast.error(message.split("(")[0]);
    }
  };

  //Place BID
  // console.log(
  //   moment(expiryDate).unix(),
  //   expiryDate,
  //   " ------ ------------>moment().rndTime()",
  //   orderDetails?.endTime,
  //   " ------ ------------>moment().unix()",
  //   moment().unix()
  // );
  const placeBidBlockchainHandler = async () => {
    if (orderDetails?.network && chainId == orderDetails?.network) {
      if (parseFloat(price) > 0) {
        if (moment(expiryDate).unix() >= moment().unix()) {
          if (!isValidExpiry) {
            if (
              !isOrderExpired &&
              orderExtraDeails.seller.toLowerCase() !==
                deadAddress.toLowerCase()
            ) {
              if (
                orderExtraDeails.seller.toLowerCase() !== account.toLowerCase()
              ) {
                setIsSubmit(true);

                const checkPrice =
                  bidExtraDetails && bidList.length > 0
                    ? parseFloat(price) > parseFloat(bidList[0].price)
                    : true;
                if (checkPrice) {
                  try {
                    setIsUpdatingData(true);

                    const contractObj = getContract(
                      marketplaceContract,
                      MarketplaceABI,
                      library,
                      account
                    );

                    if (Number(price) < Number(balanceValue)) {
                      const safePlaceBid = await contractObj.safePlaceBid(
                        orderDetails?.collectionId?.contractAddress,
                        orderDetails?.nftId?.tokenId,
                        0,
                        moment(expiryDate).unix(),
                        { value: ethers.utils.parseEther(price.toString()) }
                      );

                      await safePlaceBid.wait();
                      createBidHanlder();
                    } else {
                      toast.error("Your wallet balance is too low");
                      // setOpenPlaceBid(false);
                      setIsUpdatingData(false);
                    }
                  } catch (error) {
                    setIsUpdatingData(false);

                    console.log("ERROR", error);
                    let message = error.message;
                    toast.error(message.split("(")[0]);
                  }
                } else {
                  setIsUpdatingData(false);

                  toast.error(
                    "Bid amount should be greater then last bid amount"
                  );
                }
              } else {
                setIsUpdatingData(false);

                toast.warn("Owner can't place a bid");
              }
            } else {
              setIsUpdatingData(false);

              toast.warn("Order expired");
            }
          } else {
            toast.warn("Please place a bid before expire time.");
          }
        } else {
          toast.warn("Please fill the proper expiry date");
        }
      } else {
        setIsUpdatingData(false);

        toast.error("Please enter valid price");
      }
    } else {
      swichNetworkHandler(orderDetails?.network);
      toast.warn(
        "Please switch network to " + networkDetails?.nativeCurrency?.name
      );
    }
  };
  const createBidHanlder = async () => {
    try {
      const res = await axios.post(
        Apiconfig.createBid,
        {
          orderId: orderDetails?._id,
          bid: price.toString(),
          price: parseFloat(price),
          date: moment(expiryDate).unix().toString(),
        },
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      getNftDetails(orderDetails?._id);
      if (res.data.statusCode === 200) {
        setIsUpdatingData(false);
        toast.success(res.data.responseMessage);
        setOpenPlaceBid(false);
        setPrice("");
      } else {
        toast.warn(res.data.responseMessage);
      }
    } catch (error) {
      setIsUpdatingData(false);

      // toast.error(error.message);
      let message = error.message;
      toast.error(message.split("(")[0]);
    }
  };

  //Update Order

  const updateOrderBlockchainHandler = async () => {
    if (orderDetails?.network && chainId == orderDetails?.network) {
      if (
        !isOrderExpired &&
        orderExtraDeails.seller.toLowerCase() !== deadAddress.toLowerCase()
      ) {
        setIsSubmit(true);
        if (parseFloat(price) > 0) {
          const checkPrice =
            bidExtraDetails && bidList.length > 0
              ? parseFloat(price) > parseFloat(bidList[0].price)
              : true;
          if (checkPrice) {
            try {
              setIsUpdatingData(true);

              const contractObj = getContract(
                marketplaceContract,
                MarketplaceABI,
                library,
                account
              );

              // if (Number(price) < Number(balanceValue)) {
              const updateOrder = await contractObj.updateOrder(
                orderDetails?.collectionId?.contractAddress,
                orderDetails?.nftId?.tokenId,
                ethers.utils.parseEther(price.toString()),
                moment(expiryDate).unix()
              );

              await updateOrder.wait();
              UpdateOrderHanlder();
              // } else {
              //   toast.error("Your wallet balance is too low");
              //   setOpenPlaceBid(false);
              //   setIsUpdatingData(false);
              // }
            } catch (error) {
              setIsUpdatingData(false);

              console.log("ERROR", error);
              // toast.error(error.message);
              let message = error.message;
              toast.error(message.split("(")[0]);
            }
          } else {
            setIsUpdatingData(false);

            toast.error("Bid amount should be greater then last bid amount");
          }
        } else {
          setIsUpdatingData(false);

          toast.error("Please enter valid price");
        }
      } else {
        setIsUpdatingData(false);

        toast.warn("Order expired");
      }
    } else {
      swichNetworkHandler(orderDetails?.network);
      toast.warn(
        "Please switch network to " + networkDetails?.nativeCurrency?.name
      );
    }
  };

  const UpdateOrderHanlder = async () => {
    try {
      const res = await axios.put(
        Apiconfig.editOrder,
        {
          _id: orderDetails?._id,
          collectionId: orderDetails?.collectionId[0]?._id,
          startPrice: price.toString(),
          price: parseFloat(price).toString(),
          expiryTime: moment(expiryDate * 1000)
            .unix()
            .toString(),
        },
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      getNftDetails(orderDetails?._id);
      if (res.data.statusCode === 200) {
        setUpdateExpirydate(res.data.result);

        setIsUpdatingData(false);
        toast.success(res.data.responseMessage);
        setOpenPlaceBid(false);
      } else {
        toast.warn(res.data.responseMessage);
      }
    } catch (error) {
      setIsUpdatingData(false);

      // toast.error(error.message);
      let message = error.message;
      toast.error(message.split("(")[0]);
    }
  };

  //Cancel Bid

  const cancelBidBlockchainhandler = async () => {
    if (chainId == orderDetails?.network) {
      try {
        setCancelBidUpdating(true);
        const OpenMarketplace = getNormalMarketplaceContractAddress(
          orderDetails?.network
        );
        const contractObj = getContract(
          OpenMarketplace,
          MarketplaceABI,
          library,
          account
        );

        const res = await contractObj.cancelBid(
          orderDetails?.collectionId?.contractAddress,
          orderDetails?.nftId?.tokenId
        );
        await res.wait();
        getNftDetails(orderDetails?._id);
        toast.success("Cancelled successfully");
        setCancelBidUpdating(false);
      } catch (error) {
        setCancelBidUpdating(false);
        // toast.error(error.message);
        let message = error.message;
        toast.error(message.split("(")[0]);
      }
    } else {
      swichNetworkHandler(orderDetails?.network);
      toast.warn(
        "Please switch network to " + networkDetails?.nativeCurrency?.name
      );
    }
  };

  //AcceptBid
  const acceptBidBlockchainHandler = async () => {
    if (chainId == orderDetails?.network) {
      if (
        bidList.length > 0 &&
        bidList[0].price &&
        bidExtraDetails &&
        bidExtraDetails.bidder.toLowerCase() !== deadAddress.toLowerCase()
      ) {
        setIsUpdatingAcceptBid(true);
        try {
          const OpenMarketplace = getNormalMarketplaceContractAddress(
            orderDetails?.network
          );
          const contractObj = getContract(
            OpenMarketplace,
            MarketplaceABI,
            library,
            account
          );
          const res = await contractObj.acceptBid(
            orderDetails?.collectionId?.contractAddress,
            orderDetails?.nftId?.tokenId,
            ethers.utils.parseEther(bidList[0].price.toString())
          );
          await res.wait();

          let commitionCharge =
            (Number(bidList[0].price) * Number(marketFeeDetails)) / 100;
          // safeExecute?.hash
          // ......
          acceptBidAPIHandler(false, res?.hash, commitionCharge);
        } catch (error) {
          setIsUpdatingAcceptBid(false);
          // toast.error(error.message);
          let message = error.message;
          toast.error(message.split("(")[0]);
        }
      } else {
        toast.warn("Bid not found");
      }
    } else {
      swichNetworkHandler(orderDetails?.network);
      toast.warn(
        "Please switch network to " + networkDetails?.nativeCurrency?.name
      );
    }
  };

  const acceptBidAPIHandler = async (
    isAccept,
    transactionHash,
    commitionCharge
  ) => {
    try {
      if (orderDetails?.nftId?.tokenId !== false) {
        const res = await axios({
          method: "post",
          url: Apiconfig.sendOrderToUser,
          headers: {
            token: sessionStorage.getItem("token"),
          },
          data: {
            description: orderDetails?.description,
            royalties: orderDetails?.royalties,
            currentOwner: bidList[0].userId._id,
            collectionId: orderDetails?.collectionId?._id,
            orderId: orderDetails?._id,
            userId: bidList[0].userId._id,
            network: orderDetails?.network,
            tokenId: orderDetails?.nftId?.tokenId,
            commitionCharge: commitionCharge.toString(),
            transactionHash: transactionHash,
          },
        });
        // getNftDetails(orderDetails._id);
        if (res.data.statusCode === 200) {
          if (isAccept) {
          }
          toast.success(res.data.responseMessage);
          history.push("/profile");
        } else {
          toast.warn(res.data.responseMessage);
        }
      } else {
        toast.error("Something went wrong");
      }
      setIsUpdatingAcceptBid(false);
    } catch (error) {
      setIsUpdatingAcceptBid(false);
      // toast.error(error.message);
      let message = error.message;
      toast.error(message.split("(")[0]);
    }
  };

  //CancelOrder
  const cancelOrderHanlder = async () => {
    if (chainId == orderDetails?.network) {
      setIsCancelOrderUpdating(true);
      try {
        const OpenMarketplace = getNormalMarketplaceContractAddress(
          orderDetails?.network
        );
        const contractObj = getContract(
          marketplaceContract,
          MarketplaceABI,
          library,
          account
        );

        const res = await contractObj.cancelOrder(
          orderDetails?.collectionId?.contractAddress,
          orderDetails?.nftId?.tokenId
        );
        await res.wait();
        await cancelOrderAPIHanlder();
      } catch (error) {
        // toast.error(error.message);
        setIsCancelOrderUpdating(false);
        let message = error.message;
        toast.error(message.split("(")[0]);
      }
    } else {
      swichNetworkHandler(orderDetails?.network);
      toast.warn(
        "Please switch network to " + networkDetails?.nativeCurrency?.name
      );
    }
  };
  const cancelOrderAPIHanlder = async () => {
    try {
      const res = await axios.put(
        Apiconfig.cancelOrder,
        {
          _id: orderDetails?._id,
        },
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      getNftDetails(orderDetails?._id);
      if (res.data.statusCode === 200) {
        toast.success(res.data.responseMessage);
        history.push("/profile");
      } else {
        toast.warn(res.data.responseMessage);
      }
      setIsCancelOrderUpdating(false);
    } catch (error) {
      // toast.error(error.message);
      setIsCancelOrderUpdating(false);
      let message = error.message;
      toast.error(message.split("(")[0]);
    }
  };

  const postReport = async () => {
    setIsSubmit(true);
    if (message !== "") {
      try {
        setIsUpdatingData(true);
        // const res = await axios.post(
        //   Apiconfig.createOrderReports,
        //   {
        //     orderId: orderDetails?._id,
        //     artist: orderDetails?.currentOwner?.displayName
        //       ? orderDetails?.currentOwner?.displayName
        //       : orderDetails?.currentOwner?.walletAddress,
        //     message,
        //   },
        //   {
        //     headers: {
        //       token: sessionStorage.getItem("token"),
        //     },
        //   }
        // );
        const res = await axios({
          method: "post",
          url: Apiconfig.createOrderReports,
          headers: {
            token: sessionStorage.getItem("token"),
          },
          params: {
            _id: orderDetails?._id,
          },
          data: {
            orderId: orderDetails?._id,
            artist: orderDetails?.currentOwner?.displayName
              ? orderDetails?.currentOwner?.displayName
              : orderDetails?.currentOwner?.walletAddress,
            message,
          },
        });
        setIsUpdatingData(false);

        if (res.data.statusCode === 200) {
          toast.success("Reported successfully");
          setOpenReport(false);
          setMessage("");
        } else {
          toast.error(res.data.responseMessage);
        }
      } catch (error) {
        setIsUpdatingData(false);
        toast.error("Already Reported");
        console.log("ERROR", error);
      }
    }
  };

  const hieghestbid = bidList[0]?.userId?.namee
    ? bidList[0]?.userId?.namee
    : sortAddress(bidList[0]?.userId?.walletAddress);

  useEffect(() => {
    if (account && orderDetails) {
      if (
        (orderDetails?.nftId?.itemCategory === "private documents" &&
          orderDetails?.nftId?.recipientWalletAddress?.toLowerCase() ===
            account?.toLowerCase()) ||
        orderDetails?.nftId.recipientBackupWalletAddress?.toLowerCase() ===
          account?.toLowerCase()
      ) {
        setIsPrivate(true);
      } else {
        setIsPrivate(false);
      }
    }
  }, [account, orderDetails]);

  return (
    <>
      {isLoading ? (
        <DataLoading />
      ) : (
        <>
          {!orderDetails ? (
            <DataNotFound />
          ) : (
            <>
              <Box className={classes.marketplaceDetailBox}>
                <Paper elevation={2}>
                  <Box className={classes.posrel}>
                    <Box className={classes.playertype}>
                      <IconButton
                        size="small"
                        className="m-l-10"
                        // onClick={handleClick}

                        ref={anchorRef}
                        onClick={handleToggle}
                      >
                        <Shared style={{ transform: " rotate(90deg)" }} />
                      </IconButton>{" "}
                      &nbsp; &nbsp;
                      {orderExtraDeails?.seller?.toLowerCase() !==
                        account?.toLowerCase() && (
                        <IconButton
                          size="small"
                          className="m-l-10"
                          onClick={() => setOpenReport(true)}
                          // ref={moreRef}
                        >
                          <Report style={{ transform: " rotate(90deg)" }} />
                        </IconButton>
                      )}
                    </Box>
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
                      {orderDetails?.nftId?.tokenName}
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
                          {orderDetails?.description &&
                            orderDetails?.description}
                          {orderDetails?.description.length > 200 && (
                            <span onClick={() => setReadMoreOn(false)}>
                              {"  "} Less
                            </span>
                          )}
                        </Typography>
                      )}
                    </Box>
                    <Box mt={1}>
                      <Typography variant="body1" color="primary">
                        <span style={{ fontWeight: "bold" }}>Owned by :</span>{" "}
                        &nbsp;
                        <span style={{ color: "rgb(112, 107, 107)" }}>
                          {sortAddress(
                            orderDetails?.currentOwner?.walletAddress
                          )}{" "}
                          <CopyToClipboard
                            text={orderDetails?.currentOwner?.walletAddress}
                          >
                            <img
                              src="images/copyicon.png"
                              alt="imag"
                              width="13px"
                              style={{
                                cursor: "pointer",
                                filter: "grayscale(100%) brightness(1000%) contrast(100%)", 
                              }}
                              onClick={() => toast.info("Copied")}
                            />
                          </CopyToClipboard>
                        </span>
                      </Typography>
                    </Box>
                    <Box mt={1}>
                      <Typography variant="body1" color="primary">
                        <span style={{ fontWeight: "bold" }}>Owner Name :</span>{" "}
                        &nbsp;{" "}
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
                    </Box>

                    <Box width="100%">
                      <Grid lg={12} md={12} sm={12} xs={12}>
                        {orderDetails?.nftId?.itemCategory && (
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
                                {orderDetails?.nftId?.itemCategory}
                              </span>
                            </Typography>
                          </Box>
                        )}
                      </Grid>
                    </Box>
                  </Box>

                  <Box mt={2}>
                    {user.checkKYCStatus() && (
                      <Typography color="error">
                        Please Submit KYC Request!
                      </Typography>
                    )}
                    <Grid container spacing={1}>
                      {user?.walletdata === "BLOCK" ||
                      parseFloat(orderDetails?.endTime) <
                        new Date().getTime() ? null : (
                        <>
                          {account &&
                            orderExtraDeails &&
                            !isCancelled &&
                            orderExtraDeails?.seller?.toLowerCase() !==
                              account?.toLowerCase() && (
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                {orderDetails?.nftId?.itemCategory !==
                                  "private documents" || isPrivate ? (
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => setOpenBuy(true)}
                                    disabled={user.checkKYCStatus()}
                                  >
                                    Buy for ~ {orderDetails?.price} Metamart{" "}
                                    {networkDetails &&
                                      networkDetails?.nativeCurrency?.symbol}
                                  </Button>
                                ) : null}
                              </Grid>
                            )}
                          {account &&
                            !isCancelled &&
                            orderExtraDeails &&
                            orderExtraDeails?.seller?.toLowerCase() !==
                              account?.toLowerCase() &&
                            orderExtraDeails &&
                            bidExtraDetails &&
                            bidExtraDetails?.bidder?.toLowerCase() !=
                              account?.toLowerCase() && (
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                {orderDetails?.nftId?.itemCategory !==
                                "private documents" ? (
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => {
                                      setIsUpdate(false);
                                      setOpenPlaceBid(true);
                                    }}
                                    disabled={user.checkKYCStatus()}
                                  >
                                    Place a bid
                                  </Button>
                                ) : null}
                              </Grid>
                            )}

                          {!account && (
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                              <Button
                                variant="contained"
                                fullWidth
                                color="primary"
                                onClick={() =>
                                  user.connectWallet(SUPPORTED_WALLETS[0])
                                }
                              >
                                Connect Wallet
                              </Button>
                            </Grid>
                          )}
                        </>
                      )}

                      {account &&
                        orderExtraDeails &&
                        bidList.length > 0 &&
                        orderExtraDeails?.seller?.toLowerCase() ===
                          account?.toLowerCase() && (
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Button
                              variant="contained"
                              color="primary"
                              fullWidth
                              onClick={() => {
                                if (!orderDetails?.nftId?.isResale) {
                                  acceptBidBlockchainHandler();
                                } else {
                                  // acceptNormalBidBlockchainHandler();
                                }
                              }}
                              disabled={
                                isUpdatingAcceptBid ||
                                isCancelOrderUpdating ||
                                cancelBidUpdating ||
                                !account ||
                                user.checkKYCStatus() ||
                                parseFloat(orderDetails?.endTime) <
                                  new Date().getTime()
                              }
                            >
                              Accept bid{" "}
                              {isUpdatingAcceptBid && (
                                <ButtonCircularProgress />
                              )}
                            </Button>
                          </Grid>
                        )}

                      {account &&
                        orderExtraDeails &&
                        bidExtraDetails &&
                        bidExtraDetails?.bidder?.toLowerCase() ===
                          account?.toLowerCase() && (
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                if (!orderDetails?.nftId?.isResale) {
                                  cancelBidBlockchainhandler();
                                } else {
                                  // cancelNormalBidBlockchainhandler();
                                }
                              }}
                              disabled={
                                isUpdatingAcceptBid ||
                                isCancelOrderUpdating ||
                                cancelBidUpdating ||
                                !account ||
                                user.checkKYCStatus()
                              }
                            >
                              Cancel Bid{" "}
                              {cancelBidUpdating && <ButtonCircularProgress />}
                            </Button>
                          </Grid>
                        )}

                      {account &&
                        orderDetails &&
                        orderDetails?.saleType === "ONSALE" &&
                        orderExtraDeails &&
                        orderExtraDeails?.seller?.toLowerCase() ===
                          account?.toLowerCase() && (
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Button
                              variant="contained"
                              color="primary"
                              fullWidth
                              onClick={() => {
                                if (!orderDetails?.nftId?.isResale) {
                                  cancelOrderHanlder();
                                } else {
                                  // cancelNormalOrderHanlder();
                                }
                              }}
                              disabled={
                                isUpdatingAcceptBid ||
                                isCancelOrderUpdating ||
                                // cancelBidUpdating ||
                                !account ||
                                user.checkKYCStatus()
                                // ||
                                // (orderDetails &&
                                //   parseFloat(orderDetails?.endTime) <
                                //     new Date().getTime())
                              }
                            >
                              Cancel order{" "}
                              {isCancelOrderUpdating && (
                                <ButtonCircularProgress />
                              )}
                            </Button>
                          </Grid>
                        )}

                      {account &&
                        orderDetails &&
                        orderDetails?.saleType === "ONSALE" &&
                        orderExtraDeails &&
                        orderExtraDeails?.seller?.toLowerCase() ===
                          account?.toLowerCase() && (
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Button
                              variant="contained"
                              color="primary"
                              fullWidth
                              onClick={() => {
                                setIsUpdate(true);
                                setOpenPlaceBid(true);
                              }}
                              style={{ marginLeft: "10px !important" }}
                              disabled={
                                isUpdatingAcceptBid ||
                                isCancelOrderUpdating ||
                                cancelBidUpdating ||
                                !account ||
                                user.checkKYCStatus() ||
                                (orderDetails &&
                                  parseFloat(orderDetails?.endTime) <
                                    new Date().getTime())
                              }
                            >
                              Update order
                            </Button>
                          </Grid>
                        )}
                    </Grid>
                  </Box>
                </Paper>

                <Box mt={1}>
                  <Grid container spacing={1}>
                    <Grid lg={6} md={6} sm={6} xs={12}>
                      <Paper elevation={2} className="createrBox">
                        <Typography variant="h5" color="primary">
                          Creator
                        </Typography>
                        <Box
                          style={{ cursor: "pointer" }}
                          className={classes.creColl}
                        >
                          <figure
                            className="profileImg"
                            style={{ marginRight: 10, marginTop: "5px" }}
                            onClick={() => {
                              history.push({
                                pathname: "/author",
                                search: orderDetails?.nftId?.userId?._id,
                              });
                            }}
                          >
                            <img
                              src={
                                orderDetails?.nftId?.userId?.profilePic
                                  ? orderDetails?.nftId?.userId?.profilePic
                                  : "/images/Profile.png"
                              }
                              alt=""
                            />
                          </figure>
                          <Box
                            width="100%"
                            display="flex"
                            flexDirection="column"
                          >
                            <Typography
                              variant="body2"
                              color="primary"
                              style={{
                                overflow: "hidden",
                                width: "91%",
                                whiteSpace: "pre",
                                textOverflow: "ellipsis",
                                color: "#fff",
                                fontWeight: "500",
                              }}
                            >
                              {orderDetails?.nftId?.userId?.name
                                ? orderDetails?.nftId?.userId?.name
                                : ""}
                            </Typography>
                            <Typography
                              variant="body2"
                              style={{
                                overflow: "hidden",
                                width: "87%",
                                whiteSpace: "pre",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {" "}
                              <a
                                onClick={() => {
                                  history.push({
                                    pathname: "/author",
                                    search: orderDetails?.nftId?.userId?._id,
                                  });
                                }}
                              >
                                {orderDetails?.nftId?.userId?.name
                                  ? orderDetails?.nftId?.userId?.name
                                  : sortAddress(
                                      orderDetails?.nftId?.userId?.walletAddress
                                    )}{" "}
                                &nbsp; &nbsp;
                              </a>
                              <CopyToClipboard
                                text={
                                  orderDetails?.nftId?.userId?.walletAddress
                                }
                              >
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
                                  <span className="highestBox">
                                    Highest bid by{" "}
                                  </span>
                                  {bidList[0]?.userId?.name ? (
                                    bidList[0]?.userId?.name
                                  ) : (
                                    <>
                                      {sortAddress(
                                        bidList[0]?.userId?.walletAddress
                                      )}
                                      &nbsp; &nbsp;
                                      <CopyToClipboard text={hieghestbid}>
                                        <img
                                          src="images/copyicon.png"
                                          alt="imag"
                                          width="13px"
                                          style={{
                                            cursor: "pointer",
                                            filter: "grayscale(100%) brightness(1000%) contrast(100%)", 
                                          }}
                                          onClick={() => toast.info("Copied")}
                                        />
                                      </CopyToClipboard>
                                    </>
                                  )}
                                </Typography>
                              </Box>
                            )}
                          </Grid>
                        </Box>
                        {/*Minimum Bid */}
                        {orderDetails &&
                          orderDetails?.nftId?.isPlace &&
                          orderDetails?.nftId?.itemCategory !=
                            "private documents" && (
                            <Box style={{ marginTop: "5px" }}>
                              <Box m={"8px 0px"}>
                                <Grid container spacing={0}>
                                  <Grid
                                    xs={12}
                                    style={{ marginBottom: "16px" }}
                                  >
                                    <Box>
                                      <Typography variant="h6" color="primary">
                                        Minimum bid
                                      </Typography>
                                      <Typography variant="body2">
                                        {orderDetails
                                          ? orderDetails?.nftId?.bidAmount
                                          : "--"}{" "}
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
                          </figure>{" "}
                          <Box
                            width="100%"
                            display="flex"
                            flexDirection="column"
                          >
                            <Typography
                              variant="body2"
                              color="primary"
                              style={{
                                overflow: "hidden",
                                width: "91%",
                                whiteSpace: "pre",
                                textOverflow: "ellipsis",
                                color: "#fff",
                                fontWeight: "500",
                              }}
                            >
                              {orderDetails?.collectionId?.displayName
                                ? orderDetails?.collectionId?.displayName
                                : ""}
                            </Typography>
                            <Typography
                              variant="body1"
                              style={{
                                overflow: "hidden",
                                width: "87%",
                                whiteSpace: "pre",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {" "}
                              {orderDetails?.collectionId?.displayName} &nbsp;
                              &nbsp;
                              <CopyToClipboard
                                text={
                                  orderDetails?.collectionId?.contractAddress
                                }
                              >
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
                        </Box>
                        {/*Aution End in Market Place Details on click the Explorer on Landing page contractAddress */}
                        {orderDetails &&
                          orderDetails?.nftId?.isPlace &&
                          orderDetails?.nftId?.itemCategory !=
                            "private documents" && (
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
                                                ? timeLeft.days &&
                                                  timeLeft.days
                                                    .toString()
                                                    .padStart(2, "0")
                                                : "00"}
                                            </span>
                                          </Typography>
                                          <Typography variant="body1">
                                            Days
                                          </Typography>
                                        </li>
                                        <li className={classes.listBoxContent}>
                                          <Typography variant="body2">
                                            <span>
                                              {timeLeft.hours
                                                ? timeLeft.hours &&
                                                  timeLeft.hours
                                                    .toString()
                                                    .padStart(2, "0")
                                                : "00"}
                                            </span>
                                          </Typography>
                                          <Typography variant="body1">
                                            Hours
                                          </Typography>
                                        </li>
                                        <li className={classes.listBoxContent}>
                                          <Typography variant="body2">
                                            {" "}
                                            <span>
                                              {timeLeft.minutes
                                                ? timeLeft.minutes &&
                                                  timeLeft.minutes
                                                    .toString()
                                                    .padStart(2, "0")
                                                : "00"}
                                            </span>
                                          </Typography>
                                          <Typography variant="body1">
                                            Min
                                          </Typography>
                                        </li>
                                        <li className={classes.listBoxContent}>
                                          <Typography variant="body2">
                                            <span>
                                              {timeLeft.seconds
                                                ? timeLeft.seconds &&
                                                  timeLeft.seconds
                                                    .toString()
                                                    .padStart(2, "0")
                                                : "00"}
                                            </span>{" "}
                                          </Typography>
                                          <Typography variant="body1">
                                            Sec
                                          </Typography>
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

              <Box mt={2.5}>
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
                        style={{ color: "rgb(112, 107, 107)" }}
                      >
                        {sortAddress(
                          orderDetails?.collectionId.contractAddress
                        )}{" "}
                        <CopyToClipboard
                          text={orderDetails?.collectionId.contractAddress}
                        >
                          <img
                            src="images/copyicon.png"
                            alt="image"
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
                        style={{ color: "rgb(112, 107, 107)" }}
                      >
                        {orderDetails?.nftId?.tokenId}
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
                        style={{ color: "rgb(112, 107, 107)" }}
                      >
                        {" "}
                        {networkDetails && networkDetails[0]?.chainName}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>

              <Box>
                <Container>
                  {openPlaceBid && (
                    <Dialog
                      fullWidth="xs"
                      className={classes.createbox}
                      maxWidth="xs"
                      open={openPlaceBid}
                      onClose={() => setOpenPlaceBid(false)}
                      aria-labelledby="max-width-dialog-title"
                      disableBackdropClick={isUpdatingData}
                      disableEscapeKeyDown={isUpdatingData}
                    >
                      <DialogActions>
                        <IconButton
                          disabled={isUpdatingData}
                          onClick={() => setOpenPlaceBid(false)}
                          className={classes.customizedButton}
                        >
                          <CloseIcon style={{ color: "#787878" }} />
                        </IconButton>
                      </DialogActions>
                      <DialogContent className={classes.dialogContent1}>
                        <Typography variant="h2" color="primary">
                          {" "}
                          {isUpdate ? "Update Order" : "Place A Bid"}
                        </Typography>
                        {!isUpdate && (
                          <Typography
                            variant="body2"
                            color="primary"
                            style={{
                              overflow: "hidden",
                              width: "400px !important",
                              textOverflow: "ellipsis",
                            }}
                          >
                            You are about to place a bid for{" "}
                            <b>
                              {" "}
                              <span>{orderDetails?.nftId?.tokenName}</span>
                            </b>{" "}
                            from{" "}
                            <span>
                              {orderDetails?.userId?.name
                                ? orderDetails?.userId?.name
                                : sortAddress(
                                    orderDetails?.userId?.walletAddress
                                  )}
                            </span>
                          </Typography>
                        )}

                        {/* isUpdate
                                  ? orderDetails.price.toString()
                                  : web3.utils.fromWei(
                                      bidExtraDetails.price.toString()
                                    ) */}
                        <Box style={{ paddingBottom: "20px" }}>
                          <Typography variant="body2" color="primary">
                            {" "}
                            {isUpdate
                              ? "Price"
                              : `Last bid ${
                                  orderDetails && orderDetails?.nftId?.bidAmount
                                }`}
                          </Typography>
                          <FormControl fullWidth className={classes.margin}>
                            <TextField
                              variant="outlined"
                              disabled={isUpdatingData}
                              type="number"
                              placeholder={
                                isUpdate
                                  ? orderDetails?.price?.toString()
                                  : bidExtraDetails?.price?.toString()
                              }
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                              error={
                                !isUpdate &&
                                isSubmit &&
                                bidList.length > 0 &&
                                bidExtraDetails &&
                                parseFloat(price) <=
                                  parseFloat(bidExtraDetails.price.toString())
                              }
                              helperText={
                                isSubmit && price === ""
                                  ? "Please enter value"
                                  : isSubmit &&
                                    !isUpdate &&
                                    bidList.length > 0 &&
                                    bidExtraDetails &&
                                    parseFloat(price) <=
                                      parseFloat(bidList[0].price.toString())
                                  ? `${"Bid amount should be greater than higest bid amount "}${
                                      !isUpdate
                                        ? orderDetails &&
                                          orderDetails?.nftId?.bidAmount
                                        : "--"
                                    }
                                        Metamart
                                        
                                          
                                    `
                                  : ""
                              }
                            />
                          </FormControl>
                        </Box>
                        {isUpdate ? (
                          <Box>
                            <Typography variant="body2" color="primary">
                              {" "}
                              Expiry Time
                            </Typography>
                            <FormControl fullWidth className={classes.margin}>
                              <DateTimePicker
                                inputVariant="outlined"
                                disabled={isUpdatingData}
                                value={expiryDate}
                                onChange={(date) => {
                                  setExpiryDate(date);
                                }}
                                // animateYearScrolling
                                format="DD/MM/yyyy hh:mm"
                                minDate={new Date()}
                              />
                            </FormControl>
                          </Box>
                        ) : (
                          <Box>
                            <Typography variant="body2" color="primary">
                              {" "}
                              Expiry Time
                            </Typography>

                            <FormControl fullWidth className={classes.margin}>
                              <DateTimePicker
                                inputVariant="outlined"
                                disabled={isUpdatingData}
                                value={expiryDate}
                                onChange={(date) => {
                                  setExpiryDate(date);

                                  if (
                                    moment(date).unix() * 1000 >
                                    parseInt(orderDetails?.expiryTime)
                                  ) {
                                    setIsValidExpiry(true);
                                  } else {
                                    setIsValidExpiry(false);
                                  }
                                }}
                                format="DD/MM/yyyy hh:mm"
                                minDate={new Date()}
                                maxDate={
                                  !isUpdate &&
                                  new Date(parseFloat(orderDetails?.expiryTime))
                                }
                              />
                              {isValidExpiry && (
                                <FormHelperText error>
                                  Please place a bid before expire time.
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Box>
                        )}

                        <Box align="center" className="modal_button_div" mt={4}>
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.btnWidth}
                            mb={2}
                            disabled={isUpdatingData}
                            onClick={(e) => {
                              if (isUpdate) {
                                updateOrderBlockchainHandler();
                              } else {
                                if (!orderDetails?.nftId?.isResale) {
                                  placeBidBlockchainHandler();
                                } else {
                                }
                              }
                            }}
                          >
                            {isUpdate ? "Update Order" : "PLACE A BID"}{" "}
                            {isUpdatingData && <ButtonCircularProgress />}
                          </Button>
                        </Box>
                      </DialogContent>
                    </Dialog>
                  )}
                </Container>

                {openBuy && (
                  <Dialog
                    fullWidth="xs"
                    maxWidth="xs"
                    open={openBuy}
                    onClose={() => setOpenBuy(false)}
                    aria-labelledby="max-width-dialog-title"
                    className={classes.createbox}
                  >
                    <DialogActions>
                      <IconButton
                        onClick={() => setOpenBuy(false)}
                        className={classes.customizedButton}
                      >
                        <CloseIcon style={{ color: "#787878" }} />
                      </IconButton>
                    </DialogActions>
                    <DialogContent className={classes.dialogContent1}>
                      <Typography variant="h3" color="primary">
                        Checkout
                      </Typography>
                      <Typography
                        variant="body2"
                        color="primary"
                        style={{
                          overflow: "hidden",
                          width: "400px !important",
                          textOverflow: "ellipsis",
                        }}
                      >
                        You are about to purchase{" "}
                        <b>
                          <span
                          // style={{
                          //   overflow: "hidden",
                          //   width: "400px !important",
                          //   whiteSpace: "pre",
                          //   textOverflow: "ellipsis",
                          // }}
                          >
                            {orderDetails?.nftId?.tokenName}
                          </span>
                        </b>{" "}
                        from{" "}
                        <span
                          style={{
                            overflow: "hidden",
                            width: "91%",
                            whiteSpace: "pre",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {/* {orderDetails?.userId?.name
                            ? orderDetails?.userId?.name
                            : sortAddress(orderDetails?.userId?.walletAddress)} */}
                          <a
                            onClick={() => {
                              history.push({
                                pathname: "/author",
                                search: orderDetails?.currentOwner?._id,
                              });
                            }}
                            target="_blank"
                          >
                            {orderDetails?.currentOwner?.name}{" "}
                          </a>
                        </span>
                      </Typography>

                      <Box>
                        <FormControl fullWidth className={classes.margin}>
                          <TextField
                            variant="outlined"
                            type="number"
                            id="standard-adornment-amount"
                            value={orderDetails?.price}
                            disabled={true}
                            onKeyPress={(event) => {
                              if (event?.key === "-" || event?.key === "+") {
                                event.preventDefault();
                              }
                            }}
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
                          <Typography variant="body1" color="primary">
                            Price{" "}
                          </Typography>
                        </FormControl>
                      </Box>

                      <Box mt={2} mb={2}>
                        <Grid container spacing={1}></Grid>
                      </Box>

                      <Box justifyContent="center" display="center" my={2}>
                        <Button
                          style={{ marginTop: "7px" }}
                          variant="contained"
                          color="primary"
                          className={classes.btnWidth}
                          mb={1}
                          onClick={() => {
                            if (!orderDetails?.nftId?.isResale) {
                              buyOrderBlockchainHandler();
                            } else {
                            }
                          }}
                          disabled={isUpdatingData}
                        >
                          PROCEED TO PAYMENT
                          {isUpdatingData && <ButtonCircularProgress />}
                        </Button>
                        <Button
                          style={{ marginLeft: "7px", marginTop: "7px" }}
                          variant="outlined"
                          color="primary"
                          onClick={() => setOpenBuy(false)}
                          className={classes.btnWidth}
                        >
                          CANCEL
                        </Button>
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
                      <Typography
                        variant="h4"
                        color="primary"
                        className="modalTitle"
                      >
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
                          Enter the price for which the item will be instantly
                          sold.
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
                                  <span style={{ color: "#039BE3" }}>
                                  Metamart
                                  </span>{" "}
                                </InputAdornment>
                              ),
                            }}
                          />
                          <Typography color="primary" variant="body2">
                            Service fee <span>2.5%</span>
                          </Typography>
                          <Typography color="primary" variant="body2">
                            You will receive <b>0.0053 ETH</b>{" "}
                            <span>$106.58</span>
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
                      <Typography
                        variant="h4"
                        color="primary"
                        className="modalTitle"
                      >
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
                          Enter the price for which the item will be instantly
                          sold.
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
                                  <span style={{ color: "#039BE3" }}>
                                  Metamart
                                  </span>{" "}
                                </InputAdornment>
                              ),
                            }}
                          />
                          <Typography color="primary" variant="body2">
                            Service fee <span>2.5%</span>
                          </Typography>
                          <Typography color="primary" variant="body2">
                            You will receive <b>0.0053 ETH</b>{" "}
                            <span>$106.58</span>
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

                <>
                  <SharePopper
                    open={openShare}
                    anchorEl={anchorRef.current}
                    placement={"bottom-end"}
                  />
                  {/* <Popper
                    open={openShare}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                    placement={"bottom-end"}
                  >
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                          <Box py={2}>
                            <Typography className={classes.ShareText}>
                              Share link to this page.
                            </Typography>
                          </Box>
                        </Paper>
                      </Fade>
                    )}
                  </Popper> */}
                  {/* <Dialog
                      // open={openShare}
                      className={classes.createbox}
                      // onClose={() => setOpenShare(false)}
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
                        <Box
                          className={classes.sharemodal}
                          mb={2}
                          align="center"
                          mt={3}
                        >
                          <ShareSocialMedia url={window.location} />
                        </Box>
                      </DialogContent>
                    </Dialog> */}
                </>

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
                          <FormHelperText error>
                            Please enter message
                          </FormHelperText>
                        )}
                      </Box>
                      <Box
                        align="left"
                        className="modal_button_div"
                        mt={2}
                        mb={2}
                        display="flex"
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => postReport()}
                          className={classes.btnWidth}
                          disabled={isUpdatingData}
                          mb={2}
                        >
                          REPORT {isUpdatingData && <ButtonCircularProgress />}
                        </Button>{" "}
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

                {openMenu && (
                  <Menu
                    anchorEl={moreRef.current}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    onClose={handleMenuClose}
                    open={openMenu}
                    PaperProps={{ className: classes.menu }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    elevation={3}
                  >
                    <MenuItem>
                      <ListItemText
                      // primary="Share"
                      // onClick={handleClick}
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Shared />
                          <Typography
                            variant="body2"
                            style={{ marginLeft: "8px" }}
                          >
                            Share
                          </Typography>
                        </Box>
                      </ListItemText>
                    </MenuItem>
                    {orderExtraDeails?.seller?.toLowerCase() !==
                      account?.toLowerCase() && (
                      <MenuItem>
                        <ListItemText onClick={() => setOpenReport(true)}>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Report />
                            <Typography
                              variant="body2"
                              style={{ marginLeft: "8px" }}
                            >
                              Report
                            </Typography>
                          </Box>
                        </ListItemText>
                      </MenuItem>
                    )}
                  </Menu>
                )}
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
}
