import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import {
  getWeb3Obj,
  getContract,
  balanceOfValue,
  getWeb3ContractObject,
} from "src/utils";
import NftTokenABI from "src/constants/ABI/NftTokenABI.json";

import { createNFTBlockchainHanlder, getTokenId } from "src/services";
import { Link } from "react-router-dom";
import { UserContext } from "src/context/User";
import axios from "axios";
import ApiConfig from "src/ApiConfig/ApiConfig";

import {
  contractKovan,
  NetworkContextName,
  ACTIVE_NETWORK,
  swichNetworkHandler,
} from "src/constants";
import { useHistory } from "react-router-dom";

import { useWeb3React } from "@web3-react/core";
import GenerativeNFTABI from "src/constants/ABI/GenerativeNFTABI";
import Web3 from "web3";
import { toast } from "react-toastify";
import { RPC_URL } from "src/constants/index";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  bannerBox: {
    backgroundImage: "url(./images/Mint/mint_banner_1.png)",
    position: "relative",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
    padding: "150px 0px 150px",
    overflow: "hidden",
    zIndex: "1",
    backgroundSize: "850px",
    [theme.breakpoints.down("md")]: {
      backgroundSize: "550px",
    },
    [theme.breakpoints.down("xs")]: {
      backgroundPosition: "left",
      backgroundImage: "none !important",
      overflow: "hidden",
      padding: "50px 0",
    },
  },

  gridflex: {
    display: "flex",
    alignItems: "center",
    height: "70vh",
    [theme.breakpoints.down("md")]: {
      height: "auto",
    },
  },
  marginleft: {
    marginLeft: "10px !important",
  },
  textbox: {
    "& h1": {
      fontSize: "50px ",
      position: "relative",
      display: "inline-block",
      textAlign: "center",
      fontFamily: "'ClashDisplay-Extralight'",
      [theme.breakpoints.down("md")]: {
        fontSize: "40px ",
      },
      "& span": { fontFamily: "'ClashDisplay-Medium'" },
    },

    "& p": {
      color: theme.palette.text.secondary,
      margin: "10px 0",
      fontSize: "22px",
      fontWeight: "300",
    },

    "& label": {
      fontSize: "23px",
      color: theme.palette.text.secondary,
      fontWeight: "600",
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
  },

  amount: {
    "& label": {
      color: theme.palette.text.secondary,
      fontSize: "18px",
      marginBottom: "10px",
    },
  },
  amountdiv: {
    maxWidth: "100%",
    height: "60px",
    border: "1px solid #00ffab",
    borderRadius: " 5px",
    display: "flex",
    padding: "0 20px",
    alignItems: "center",
    fontSize: "45px",
  },
  quantity: {
    maxWidth: "100%",
    display: "flex",
    height: "35px",
    background: "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
    border: "1px solid #51ACED",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    padding: "5px 19px",
    color: "#fff !important",
    fontSize: "14px !important",
    fontWeight: "500 !important",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "7px",
    "& button": {
      fontSize: "20px",
      color: "#fff",
      "&:first-child": {
        color: "#ffffff",
      },
      "&:last-child": {
        color: "#ffffff",
      },
      "&:hover": {
        backgroundColor: "rgb(34 167 240)",
      },
    },
    "& input": {
      textAlign: "center",
      backgroundColor: "transparent",
      color: "#fff",
      border: "none",
      fontSize: "25px",
      fontWeight: "900",
      width: "30%",
      "&:focus-visible": {
        outline: "none",
      },
      "&::placeholder": {
        color: "#fff",
      },
    },
  },
  textInput: {
    width: "100%",
    height: "48px",
    backgroundColor: "#3e3e3e",
    border: "none",
    borderRadius: "7px",
    paddingLeft: " 10px",
    color: "#fff",
    "&::placeholder": {
      color: "#fff",
    },
    "&:focus-visible": {
      outline: " none",
    },
  },
  image2: {
    marginLeft: "-20px !important",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px !important",
    },
  },
  buttonright: {
    marginLeft: "10px !important",
    minWidth: "150px",
  },
  minth1: {
    fontSize: "80px !important",
    fontWeight: "100px !important",
    lineHeight: "80px",
  },
  imgBox: {
    "& img": {
      position: "absolute",
      left: "0",
      zIndex: "-1",
    },
  },
  newgrid: {
    marginTop: "16px",
  },
  quantitybox: {
    marginTop: "30px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "20px",
    },
  },

  bannerImg: {
    display: "flex",
    position: "relative",
    // overflow: " hidden",
    "& .shape1": {
      position: "absolute",
      top: "-90px",
      left: "-90px",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    "& .shape2": {
      position: "absolute",
      top: "-99px",
      /* left: 434px; */
      right: "279px",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    "& .shape3": {
      position: "absolute",
      left: "181px",
      top: "-119px",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    "& .shape4": {
      position: "absolute",
      bottom: "20px",
      right: "40px",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    "& .shape5": {
      position: "absolute",
      bottom: "100px",
      left: "-90px",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    "& .shape6": {
      position: "absolute",
      top: "-20px",
      right: "-15px",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },

    "& .shape7": {
      position: "absolute",
      /* left: 21px; */
      top: "246px",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    "& .shape8": {
      position: "absolute",
      /* left: 21px; */
      top: "223px",
      left: "56px",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    "& figure": {
      margin: "0",
      width: "100%",
      overflow: "hidden",
      marginBottom: "15px",
      borderRadius: "10px",
      height: "auto",
      "&:hover": {
        "& img": {
          transform: "scale(1.3)",
        },
      },
      "& img": {
        width: "100%",
        height: "100%",
        margin: "0",
        transform: "scale(1.1)",
        transition: "0.5s",
      },
    },
  },
  // webkitcss: {
  //   "& .MuiOutlinedInput-input": {
  //     "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
  //       "-webkit-appearance": "none",
  //     },
  //   },
  // },
}));

export default function BestSeller() {
  const classes = useStyles();
  const [userBalance, setUserBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [nftPrice, setNftPrice] = useState(0);
  // const [numberofnft, setInputData] = useState("");

  const [numberofnft, setNumberofnft] = useState(1);
  const user = useContext(UserContext);

  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  const { account, library, chainId } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);
  const [saleisActive, setSaleisActive] = useState();
  const history = useHistory();

  //walletBalance
  const [balanceValue, setBalanceValue] = React.useState("");
  const httpProvider = new Web3.providers.HttpProvider(RPC_URL);
  const web3 = new Web3(httpProvider);

  //
  const GetBalance = async () => {
    try {
      const value = await web3.eth.getBalance(account);
      setBalanceValue(web3.utils.fromWei(value));
    } catch (error) {
      console.log(error);
    }
  };

  //NFT balance

  useEffect(() => {
    GetBalance();
    setAmount(numberofnft * nftPrice);
    setIsLoadingAuth(user?.isLoadingData);
  }, [numberofnft, nftPrice, user.isLoadingData, account]);

  // const MAX_NFT_SUPPLY = 100;

  const getContractDetailsHandler = async () => {
    try {
      // setIsLoadingData(true);
      const web3 = await getWeb3Obj();
      const contractObj = await getWeb3ContractObject(
        GenerativeNFTABI,
        contractKovan
      );

      const NFT_PRICEE = await contractObj.methods.NFT_PRICE().call();
      const getNFTPrice = await web3.utils.fromWei(NFT_PRICEE.toString());
      setNftPrice(getNFTPrice);
    } catch (err) {
      console.log(err);
      // setIsLoadingData(false);
    }
  };

  const saleIsActivenft = async () => {
    try {
      const web3 = await getWeb3Obj();
      const contractObj = await getWeb3ContractObject(
        GenerativeNFTABI,
        contractKovan
      );

      // if (hasFinalSaleStarted) {
      const saleIsActive = await contractObj.methods.saleIsActive().call();

      setSaleisActive(saleIsActive);
    } catch (err) {
      console.log(err);
      // setIsLoadingData(false);
    }
  };
  useEffect(() => {
    saleIsActivenft();
    getContractDetailsHandler();
  }, [account]);

  //Mint

  const mintNFT = async () => {
    if (chainId === ACTIVE_NETWORK) {
      if (saleisActive === true) {
        if (parseFloat(balanceValue) > parseFloat(amount)) {
          if (
            Number(user?.totalSupply) + Number(numberofnft) <=
            user.MAX_NFT_SUPPLY
          ) {
            if (account && numberofnft && numberofnft !== "") {
              setIsLoading(true);
              try {
                const web3 = await getWeb3Obj();

                if (parseFloat(balanceValue) > parseFloat(amount)) {
                  const contract = getContract(
                    contractKovan,
                    GenerativeNFTABI,
                    library,
                    account
                  );

                  // if (user.hasFinalSaleStarted) {

                  const totalSupply = await contract.totalSupply();
                  const totalSupplyConv = parseInt(totalSupply.toString());

                  // let balanceOf = Number(user.balanceOfValue.toString());

                  const tx = await contract.mintNFT(numberofnft, {
                    value: web3.utils.toWei(amount.toString()).toString(),
                    from: account,
                  });
                  await tx.wait();
                  console.log(tx);

                  let mintCount = 1;
                  for (
                    var i = totalSupplyConv;
                    i < totalSupplyConv + numberofnft;
                    i++
                  ) {
                    // const tokenURI = await contract.tokenURI(i);
                    // console.log("tokenURI", tokenURI);
                    try {
                      // const response = await axios({
                      //   method: "GET",
                      //   url: tokenURI,
                      // });

                      // if (response) {
                      //   console.log("response----", response);
                      // const dataResult = response.data;
                      // if (response.status === 200) {
                      const res = await axios({
                        method: "POST",
                        url: ApiConfig.createNFT,
                        headers: {
                          token: window.sessionStorage.getItem("token"),
                        },
                        data: {
                          currentOwnerId: user?.userData?._id,
                          collectionId: user?.generativeid,
                          tokenId: i?.toString(),
                          // tokenName: `${dataResult?.name?.toString()} ${
                          //   dataResult?.attributes[0]?.value
                          // }`,
                          // title: `${dataResult?.name?.toString()} ${
                          //   dataResult?.attributes[0]?.value
                          // }`,
                          // coverImage: dataResult?.cloud_image?.toString(),
                          // mediaFile: dataResult?.cloud_image?.toString(),
                          // uri: dataResult?.image?.toString(),
                          network: chainId?.toString(),
                          description:
                            "10,000 of the largest cities in the world that will be used in a P2E Metaverse game.",
                          properties: "String",
                          alternativeTextForNFT: "String",
                          mediaType: "image",
                          royalties: "0",
                          recipientWalletAddress: "String",
                          recipientBackupWalletAddress: "String",
                          isGenerativeNft: true,
                          // isGenerativeNft: Number(
                          //   `${dataResult?.name?.slice(1)}`
                          // ),
                        },
                      });

                      if (res.data.statusCode === 200) {
                        // toast.success(
                        //   "Your NFT has been minted successfully"
                        // );
                        toast.success(`${mintCount} of ${numberofnft} minted`);
                      } else {
                        toast.warn(`${mintCount} of ${numberofnft} not minted`);
                        // toast.warn(res.data.responseMessage);
                      }
                      mintCount++;
                      // }
                      // } else {
                      //   toast.error(
                      //     `${mintCount} of ${numberofnft} not minted`
                      //   );
                      // }
                    } catch (Err) {
                      console.log(Err);
                      toast.error(Err.message);
                    }
                  }
                }
                // history.push("/my-mints");
                // toast.success("Your NFT has been minted successfully");
                getContractBalance();
                // } else {
                //   toast.warn("Insufficient funds");
                // }

                setIsLoading(false);
                // user.getCurrentMintingDetails();
              } catch (error) {
                setIsLoading(false);
                console.log("ERRROR", error);
                toast.error(error.message.split("(")[0]);
              }
            } else {
              toast.error("Please select correct data");
              setIsLoading(false);
            }
          } else {
            toast.error("Purchase would exceed max supply of NFTs");
          }
        } else {
          toast.error("Insufficient funds");
        }
      } else {
        toast.warn("Sale must be active to mint NFTs");
      }
    } else {
      swichNetworkHandler();
      setIsLoading(false);
    }
  };

  const getContractBalance = async () => {
    const web3 = await getWeb3Obj();
    const bal = await web3.eth.getBalance(contractKovan);
    let balance = await web3.utils.fromWei(bal);

    setUserBalance(balance);
  };

  useEffect(() => {
    getContractBalance();
  }, []);

  return (
    <Box className={classes.bannerBox}>
      {/* <Box className={classes.imgBox}>
        <img src="images/Mint/sideimg.png" className="bannerimg1" alt="" />
      </Box> */}

      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} className={classes.gridflex}>
            <Box className={classes.textbox}>
              <Typography variant="h1" color="primary">
                MINT LIVE
              </Typography>
              <Typography variant="body1">{`${user?.totalSupply} OF ${user.MAX_NFT_SUPPLY} MINTED`}</Typography>
              <Box className={classes.quantitybox}>
                <label color="primary">Quantity</label>
                <Box className={classes.quantity} mt={1}>
                  <Button
                    variant="outline"
                    color="primary"
                    size="small"
                    onClick={() => {
                      if (numberofnft > 1) {
                        setNumberofnft(numberofnft - 1);
                      }
                    }}
                    disabled={isLoading}
                  >
                    -
                  </Button>

                  <input
                    name="number"
                    maxlength="2"
                    onKeyPress={(event) => {
                      if (event?.key === "-" || event?.key === "+") {
                        event.preventDefault();
                      }
                    }}
                    // placeholder={numberofnft}
                    className="webkitcss"
                    value={numberofnft}
                    onChange={(e) => {
                      setNumberofnft(e.target.value);
                    }}
                  />
                  <Button
                    variant="outline"
                    color="secondary"
                    size="small"
                    onClick={() => {
                      setNumberofnft(Number(numberofnft) + 1);
                    }}
                    disabled={isLoading}
                  >
                    +
                  </Button>
                </Box>
              </Box>
              <Grid container>
                <Grid item xs={6} sm={6} className={classes.newgrid}>
                  <label style={{ paddingRight: "10px", fontSize: "14px" }}>
                    Total price:
                  </label>
                </Grid>
                <Grid item xs={6} sm={6} className={classes.newgrid}>
                  <label
                    style={{
                      paddingRight: "5px",

                      fontSize: "16px",
                    }}
                  >
                    {amount ? amount.toFixed(7) : "0"} Metamart
                  </label>
                </Grid>
              </Grid>
              {!account ? (
                <Box mt={2}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    to="/conect-wallet"
                    component={Link}
                  >
                    Connect Wallet
                  </Button>
                </Box>
              ) : (
                <>
                  {" "}
                  <Box mt={2}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="large"
                      fullWidth
                      onClick={() => {
                        if (account) {
                          mintNFT();
                        } else {
                          toast.warn("Please connect your wallet");
                        }
                      }}
                      disabled={
                        isLoading ||
                        (account &&
                          user &&
                          user.ownerAccount &&
                          user.ownerAccount !== account)
                      }
                    >
                      Mint {isLoading && <ButtonCircularProgress />}
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box className={classes.bannerImg}>
              {/* <img src="images/shape/shape-1.png" className="shape3 moveLeft" />
              <img src="images/shape/shape-3.png" className="shape2 moveLeft" /> */}
              {/* <img src="images/shape/shape-5.png" className="shape4 moveTop" /> */}
              {/* <img src="images/shape/shape-4.png" className="shape5 rotate" /> */}
              {/* <img src="images/shape/shape-6.png" className="shape6 rotate" />
              <img src="images/shape/shape-1.png" className="shape7 moveLeft" />
              <img src="images/shape/shape-3.png" className="shape8 moveLeft" /> */}
            </Box>
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <Box className="mainimageBox">
                <img src="images/Mint/mint_banner.png" alt="image" width="100%" />
            </Box>
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  );
}
