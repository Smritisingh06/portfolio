import {
  Box,
  Button,
  Grid,
  makeStyles,
  Typography,
  Container,
  Paper,
  Tooltip,
} from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import apiConfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import { getWeb3ContractObject } from "src/utils";
import {
  deadAddress,
  getMarketplaceContractAddress,
  getNetworkDetails,
  getNormalMarketplaceContractAddress,
} from "src/constants";
import { UserContext } from "src/context/User";
import moment from "moment";
import DeployABI from "src/constants/ABI/DeployABI.json";
import DataLoading from "src/component/DataLoading";
import DataNotFound from "src/component/DataNotFound";
import { useLocation, Link } from "react-router-dom";
import MarketplaceABI from "src/constants/ABI/MarketplaceABI.json";
const useStyles = makeStyles((theme) => ({
  NFTDetailsBox: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  nftcard: {
    borderRadius: "40px",
    padding: "10px",
  },
  headbox: {
    borderRadius: "30px",
    padding: "30px",
  },
  subBox: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h4": {
      fontWeight: "bold",
      fontSize: "28px",
      lineHeight: "130%",
    },
  },
  chain: {
    "& h4": {
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "130%",
    },
  },
  contract: {
    "& h4": {
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
    },
    "& h6": {
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "rgba(255, 255, 255, 0.5)",
    },
  },
  token: {
    "& h4": {
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
    },
    "& h6": {
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "rgba(255, 255, 255, 0.5)",
    },
  },
  nftImg: {
    width: "100%",
    minHeight: "230px",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "10px 10px 10px 10px",
  },
}));
const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    // Add additional styles for top positioning
    marginTop: "-8px", // Adjust the value as needed
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow placement="top" classes={classes} {...props} />;
}
export function NFTDetails({
  orderId,
  reportType,
  setOrderDetailsParent,
  setIsLoadingParent,
  reportId,
  reportDetails,
  getReportDetailsHandler,
}) {
  const history = useHistory();
  const { account } = useWeb3React();
  const classes = useStyles();
  const user = useContext(UserContext);
  const particularPermition = user?.permissions?.nftManagement;
  let isRead =
    user?.userData?.userType == "Admin"
      ? true
      : particularPermition?.read
      ? particularPermition?.read
      : false;
  let isWrite =
    user?.userData?.userType == "Admin"
      ? true
      : particularPermition?.write
      ? particularPermition?.write
      : false;
  let isDelete =
    user?.userData?.userType == "Admin"
      ? true
      : particularPermition?.delete
      ? particularPermition?.delete
      : false;
  const [orderDetails, setOrderDetails] = useState();
  const [orderExtraDeails, setOderExtraDeails] = useState();
  const [bidList, setBidList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentOwner, setCurrentOwner] = useState("");
  const [properties, setProperties] = useState("");
  const [isCancelled, setIsCancelled] = useState(false);
  const [isOrderExpired, setIsOrderExpired] = useState(false);
  const [bidExtraDetails, setBidExtraDetails] = useState();
  const [networkDetails, setNetworkDetails] = useState();

  //   const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    setIsLoadingParent(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (orderDetails) {
      setOrderDetailsParent(orderDetails);
    }
  }, [orderDetails]);

  useEffect(() => {
    if (orderId && reportType != "COLLECTION_REPORT") {
      getNftDetails(orderId);
    }
    if (orderId && reportType == "COLLECTION_REPORT") {
      getCOLLECTION_REPORT(orderId);
    }
  }, [orderId, user.userData]);

  const getNftDetails = async (id) => {
    try {
      const res = await axios.get(apiConfig.viewOrder + id, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setOrderDetails(res.data.result);

        setBidList(res.data.result[0].bidId.reverse());
        if (res.data.result[0]?.nftId[0]?.properties) {
          setProperties(JSON.parse(res.data.result[0].nftId[0].properties));
        }
        if (user.userData && res.data.result[0]) {
          let likesUsers = res.data.result[0].likesUsers.filter(
            (order) => order === user.userData._id
          );
          //   setIsLike(likesUsers.length > 0);
        }
        setIsOrderExpired(
          parseFloat(res.data.result[0].endTime) < parseFloat(moment().unix())
        );

        if (
          res.data.result[0].collectionId[0].contractAddress &&
          res.data.result[0].network
        ) {
          getOrderExtraDetails(
            res.data.result[0].collectionId[0].contractAddress,
            res.data.result[0].nftId[0].tokenId,
            res.data.result[0].network,
            res.data.result[0].collectionId[0]?.isLazyMinting,
            res.data.result[0].nftId[0]?.isResale
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
  const getCOLLECTION_REPORT = async (id) => {
    try {
      const res = await axios.get(apiConfig.viewCollection + id, {
        //
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setOrderDetails(res.data.result);
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
    isLazyMinting,
    isResale
  ) => {
    const OpenMarketplace = !isResale
      ? getMarketplaceContractAddress(chianId)
      : getNormalMarketplaceContractAddress(chianId);
    const networkDetails = getNetworkDetails(chianId);
    setNetworkDetails(networkDetails[0]);

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

  const blockReportHandler = async () => {
    try {
      const res = await axios.get(apiConfig.blockReport + reportId, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode == 200) {
        toast.success(res.data.responseMessage);
        if (getReportDetailsHandler) {
          getReportDetailsHandler();
        }
      } else {
        toast.error(res.data.responseMessage);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

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
              <Paper className={classes.headbox}>
                <Box
                  className={classes.subBox}
                  onClick={() => {
                    history.push({
                      pathname: "/marketplace-Detail",
                      search: orderId,
                    });
                  }}
                >
                  <Typography
                    variant="h4"
                    color="primary"
                    // style={{
                    //   overflow: "hidden",
                    //   width: "91%",
                    //   whiteSpace: "pre",
                    //   textOverflow: "ellipsis",
                    // }}
                  >
                    {orderDetails?.nftId?.tokenName
                      ? orderDetails?.nftId?.tokenName
                      : orderDetails?.displayName}
                    {orderDetails?.symbol
                      ? " (" + orderDetails?.symbol + ")"
                      : ""}
                  </Typography>
                </Box>
                <Typography style={{ lineBreak: "anywhere" }} color="primary">
                  {" "}
                  {orderDetails?.description}
                </Typography>
                <Box mt={2}>
                  {!account && (
                    <Typography variant="h4">Please Login</Typography>
                  )}
                  {/* {account &&
                    isCancelled &&
                    currentOwner &&
                    currentOwner.toLowerCase() != account.toLowerCase() && (
                      <Typography variant="h4" style={{ color: "red" }}>
                        Expired
                      </Typography>
                    )} */}
                  <Grid container spacing={1}>
                    <Grid container spacing={1}>
                      {" "}
                      <BootstrapTooltip
                        title={isWrite ? "" : "Not permitted to write!"}
                      >
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => blockReportHandler()}
                            disabled={!isWrite}
                          >
                            {reportDetails?.actionApply ? "Unblock" : "Block"}
                          </Button>
                        </Grid>
                      </BootstrapTooltip>{" "}
                      {/* <BootstrapTooltip
                        title={isWrite ? "" : "Not permitted to write!"}
                      >
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                          <Button
                            variant="contained"
                            disabled={!isWrite}
                            color="primary"
                            fullWidth
                          >
                            Reject
                          </Button>
                        </Grid>
                      </BootstrapTooltip> */}
                    </Grid>
                    <Box>
                      <Box className={classes.chain} mt={3}>
                        <Typography variant="h4" color="primary">
                          Reporter Name :{" "}
                        </Typography>
                        <Typography color="primary">
                          {reportDetails?.name}
                        </Typography>
                      </Box>

                      <Box className={classes.headboxx} mt={3}>
                        <Box className={classes.chain}>
                          <Typography variant="h4" color="primary">
                            Report Details
                          </Typography>
                        </Box>

                        <Box mt={2} style={{ wordBreak: "break-all" }}>
                          <Typography color="primary">
                            {reportDetails?.message}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Box>
              </Paper>
            </>
          )}
        </>
      )}
    </>
  );
}

export default function NFTDetailsData() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [orderId, setOrderId] = useState();
  const [reportType, setreportType] = useState();
  const location = useLocation();
  const [reportDetails, setReportDetails] = useState();
  const [orderDetails, setOrderDetails] = useState();
  const [reportId, setReportId] = useState();

  useEffect(() => {
    if (location.search && location.search.length > 0) {
      const ids = location.search.split("?");
      if (ids[1]) {
        setReportId(ids[1]);
      }
    }
  }, [location]);

  // useEffect(() => {
  //   if (!user.isAdmin) {
  //     history.goBack();
  //   }
  // }, [user.isAdmin]);

  const getReportDetailsHandler = async () => {
    try {
      const res = await axios.get(apiConfig.viewReport + reportId, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });

      if (res.data.statusCode === 200) {
        setReportDetails(res.data.result);
        setreportType(res.data.result.reportType);
        setOrderId(
          res.data.result.reportType != "COLLECTION_REPORT"
            ? res.data.result?.orderId?._id
            : res.data.result?.collectionId
        );
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    if (reportId) {
      getReportDetailsHandler(reportId, cancelTokenSource);
    } else {
      // setIsLoading(false);
    }

    return () => {
      cancelTokenSource.cancel();
    };
  }, [reportId, user.userData]);

  return (
    <Box className={classes.NFTDetailsBox}>
      <Container>
        <Grid container spacing={2}>
          {isLoading ? (
            <DataLoading />
          ) : (
            <Grid item lg={7} md={7} sm={12} xs={12}>
              <Paper elevation={2} className={classes.nftcard}>
                {/* <Box
                  className={classes.nftImg}
                  style={{
                    background: `url(${
                      orderDetails?.nftId?.coverImage
                        ? orderDetails?.nftId?.coverImage
                        : "/images/cat.png"
                    })`,
                  }}
                ></Box> */}
                <Box
                  className={classes.nftImg}
                  onClick={() => {
                    history.push({
                      pathname: "/marketplace-Detail",
                      search: orderId,
                    });
                  }}
                >
                  <figure
                    style={{
                      margin: 0,
                      display: "flex",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={
                        orderDetails?.nftId?.coverImage
                          ? orderDetails?.nftId?.coverImage
                          : orderDetails?.collectionImage
                      }
                      alt=""
                      style={{
                        width: "66%",
                        borderRadius: "10px",
                      }}
                    />
                  </figure>
                </Box>
              </Paper>
              {/*  */}
            </Grid>
          )}
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <Box>
              <NFTDetails
                orderId={orderId}
                reportType={reportType}
                setOrderDetailsParent={(data) => setOrderDetails(data)}
                setIsLoadingParent={(status) => setIsLoading(status)}
                reportId={reportId}
                reportDetails={reportDetails}
                getReportDetailsHandler={getReportDetailsHandler}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
