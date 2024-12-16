import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Apiconfig from "src/ApiConfig/ApiConfig";
import { useWeb3React } from "@web3-react/core";
import { UserContext } from "src/context/User";
import MarketplaceABI from "src/constants/ABI/MarketplaceABI.json";
import { getContract } from "src/utils";
import {
  marketplaceContract,
  ACTIVE_NETWORK,
  swichNetworkHandler,
} from "src/constants";
import { getNetworkDetails } from "src/constants";
import { toast } from "react-toastify";
// import MarketPlaceABI from "src/constants/ABI/MarketPlaceABI.json";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
const useStyles = makeStyles((theme) => ({
  root2: {
    display: "flex",
    justifyContent: "space-between",
    "@media(max-width:420px)": {
      display: "block",
    },
  },
  heading: {
    "& h4": {
      fontSize: "25px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
  },
  tablesection: {
    "& td": {
      color: "#fff",
    },
  },
  headingBoxControl: {
    "& p": {
      "@media (max-width: 720px)": {
        fontSize: "10px",
      },
    },
  },
  boxAlign: {
    display: "flex",
    alignItems: "center",
    "@media (max-width:374px)": {
      flexDirection: "column",
      alignItems: "start",
      "& .MuiFormControl-root": {
        width: "100%",
      },
      "& .MuiButton-containedPrimary": {
        width: "100%",
      },
    },
  },
}));

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));
function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

export default function CreatorList() {
  const history = useHistory();
  const classes = useStyles();
  const { account, library, chainId } = useWeb3React();
  const user = useContext(UserContext);

  const [network, setNetwork] = useState({
    name: "select",
  });
  const [marketPlaceFee, setMarketPlaceFee] = useState("");

  const [collectionFee, setHotcollection] = useState("");
  const [currentFee, setCurrentFee] = useState([]);

  const [isSubmit, setisSubmit] = useState(false);
  const [isLoading, setIsUpdating] = useState(false);
  const [isUpdatingMarketFee, setIsUpdatingMarketFee] = useState(false);
  const [marketFeeDetail, setMarketFeeDetails] = useState([]);
  // console.log("marketFeeDetail=====", marketFeeDetail);
  const updateMarketPlaceFee = async () => {
    setisSubmit(true);
    if (chainId == ACTIVE_NETWORK) {
      if (Number(marketPlaceFee) > 10) {
        setIsUpdatingMarketFee(false);
        return;
      }
      if (Number(marketPlaceFee) > 0) {
        setIsUpdatingMarketFee(true);
        try {
          const contractObj = getContract(
            marketplaceContract,
            MarketplaceABI,
            library,
            account
          );
          console.log(" ---- contractObj ", contractObj);

          const setOwnerCutPerMillion = await contractObj.setOwnerCutPerMillion(
            parseFloat(marketPlaceFee) * 10000
          );

          await setOwnerCutPerMillion.wait();
          setisSubmit(false);
          updateFeeAPI();
        } catch (error) {
          console.log(error);
          setIsUpdatingMarketFee(false);

          console.log(error?.message);
          if (error.message) {
            toast.warn(
              <p
                style={{
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                {" "}
                {error.message}{" "}
              </p>
            );
          }
          // toast.error(error);
        }
      } else {
        toast.error("Please enter a valid amount");
        setIsUpdatingMarketFee(false);
      }
    } else {
      swichNetworkHandler();

      toast.warn("Please switch network to " + network.name);
    }
  };

  const updateFeeAPI = async () => {
    try {
      const res = await axios({
        method: "PUT",
        url: Apiconfig.updateFee,
        headers: {
          token: sessionStorage.getItem("token"),
        },
        data: {
          feeId: marketFeeDetail[0]?._id,
          amount: marketPlaceFee,
        },
      });
      if (res.data.statusCode === 200) {
        toast.success("Market fee has been updated successfully");
        setIsUpdatingMarketFee(false);
        setMarketPlaceFee("");
        getFeeAPIHandler();
      } else {
        setIsUpdatingMarketFee(false);
      }
    } catch (error) {
      console.log(error);
      setIsUpdatingMarketFee(false);
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
          res.data?.result.filter((item) => item?.type === "MarketPlace")
        );
      }
    } catch (error) {}
  };

  const handleFormSubmit = async () => {
    setIsUpdating(true);
    axios({
      method: "POST",
      url: Apiconfig.changeCollectionFee,
      // headers: {
      //   token: window.sessionStorage.getItem("token"),
      // },
      data: {
        collectionFee: collectionFee,
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          toast.success(res.data.responseMessage);
          setIsUpdating(false);
          history.push("/");
        } else {
          toast.error(res.data.responseMessage);
          setIsUpdating(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsUpdating(false);
      });
  };

  const getHotcollectionData = async () => {
    const res = await axios({
      method: "GET",
      url: Apiconfig.getCollectionFee,
    }).then(async (res) => {
      if (res.data.statusCode === 200) {
        setCurrentFee(res.data.result[0]?.collectionFee);
      }
    });
  };

  useEffect(() => {
    getHotcollectionData();
    getFeeAPIHandler();
  }, []);

  return (
    <Box>
      <Box className={classes.colorbox} mt={1}>
        <Grid container spacing={2}>
          <Grid item lg={6} sm={12} md={6} xs={12}>
            <Box className={classes.root2}>
              <Box className={classes.heading} pb={2}>
                <Typography variant="h4" color="primary">
                  Fee Management
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="primary">
              Marketplace Fee
            </Typography>{" "}
            <Box className={classes.boxAlign}>
              <FormControl fullWidth multiline rows={4}>
                <TextField
                  variant="outlined"
                  placeholder="Enter Marketplace fees."
                  style={{
                    color: "#fff",

                    margin: "5px 10px 10px 0px",
                  }}
                  onChange={(e) => setMarketPlaceFee(e.target.value)}
                  value={marketPlaceFee}
                  type="number"
                  error={
                    (isSubmit && Number(marketPlaceFee) > 0) ||
                    (isSubmit && Number(marketPlaceFee) < 10)
                  }
                />
                <FormHelperText error>
                  {isSubmit &&
                    Number(marketPlaceFee) === 0 &&
                    "Marketpalce fee must be greater then 0 %"}
                  {isSubmit &&
                    Number(marketPlaceFee) > 10 &&
                    "Marketpalce fee must be less then 10 %"}
                </FormHelperText>
                <Box className={classes.headingBoxControl}>
                  <Typography
                    variant="body1"
                    color="primary"
                    style={{ marginBottom: "1px" }}
                  >
                    Market fee (in %){" "}
                    {marketFeeDetail && marketFeeDetail[0]?.amount}{" "}
                  </Typography>
                </Box>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={updateMarketPlaceFee}
                disabled={
                  marketPlaceFee === "" ||
                  isUpdatingMarketFee ||
                  user?.userData?.userType === "User"
                }
                style={{ marginBottom: "24px" }}
              >
                Submit {isUpdatingMarketFee && <ButtonCircularProgress />}
              </Button>
            </Box>
          </Grid>
          <Grid item lg={6} sm={12} md={6} xs={12}>
            <Box className={classes.root2}>
              <Box className={classes.heading} pb={2}>
                <Typography variant="h4" color="primary">
                  Hot Collection Fee Management
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="primary">
              Hot Collection Fee
            </Typography>{" "}
            <Box className={classes.boxAlign}>
              <FormControl fullWidth multiline rows={4}>
                <TextField
                  variant="outlined"
                  placeholder="Enter FEIRO fee"
                  style={{
                    color: "#fff",
                    margin: "5px 10px 5px 0px",
                  }}
                  // onChange={(e) => {
                  //   if (e.target.value <= 50) {
                  //     setHotcollection(e.target.value);
                  //   } else {
                  //     toast.warn("max 50 QI");
                  //   }
                  // }}
                  onChange={(e) => setHotcollection(e.target.value)}
                  value={collectionFee}
                  type="number"
                />
                <Box className={classes.headingBoxControl}>
                  <Typography
                    variant="body1"
                    color="primary"
                    style={{ marginBottom: "1px" }}
                  >
                    Current collection fee {currentFee} Metamart
                  </Typography>
                </Box>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={handleFormSubmit}
                disabled={
                  collectionFee === "" ||
                  isLoading ||
                  user?.userData?.userType === "User"
                }
                style={{ marginBottom: "24px" }}
              >
                Submit {isLoading && <ButtonCircularProgress />}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
