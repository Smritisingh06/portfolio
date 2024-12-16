import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  TextField,
  IconButton,
  FormControl,
  FormHelperText,
  Input,
  Paper,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import moment from "moment";
import Pagination from "@material-ui/lab/Pagination";
import { useHistory, useLocation } from "react-router-dom";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import KYCPupop from "src/component/KYCPupop";
import { FaFacebookF, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import {
  getDateDiff,
  uploadNFTHandler,
  createNFTHandler,
  uploadContractHandler,
  placeOrderAPIHandler,
  getTokenId,
  createNFTBlockchainHanlder,
  addImageHandler,
  uploadImageHandler,
  createCollectionAPIHanlder,
} from "src/services";
import { UserContext } from "src/context/User";
import {
  NftTokenAddress,
  marketplaceContract,
  ACTIVE_NETWORK,
  swichNetworkHandler,
  currency,
} from "src/constants";
import { ethers } from "ethers";
import { MdCancel, MdEmail } from "react-icons/md";
import MarketplaceABI from "src/constants/ABI/MarketplaceABI.json";
import NftTokenABI from "src/constants/ABI/NftTokenABI.json";
import Button from "@material-ui/core/Button";
import { MdAddCircle } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/ApiConfig/ApiConfig";
import { useWeb3React } from "@web3-react/core";
import CollectionCard from "./CollectionCard";
import Web3 from "web3";
import {
  getWeb3Obj,
  getContract,
  isValidFacebookURL,
  isValidInstaURL,
  validtwitter,
  validtelegram,
} from "src/utils";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { DateTimePicker } from "@material-ui/pickers";
import KycNotCompletedModal from "src/component/KycNotCompletedModal";
import { DropzoneArea } from "material-ui-dropzone";
import { FiUpload } from "react-icons/fi";

const useStyles = makeStyles((theme) => ({
  bannerBox: {
    padding: "40px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0",
    },
  },
  nftImg: {
    width: "100%",
    height: "165px",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "100% !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "10px 10px 10px 10px",
    backgroundColor: "#ccc !important",
  },
  fontSixeText: {
    fontSize: " 0.875rem",
    padding: "8px 0px",
  },
  FilterDiv: {
    "& button": {
      borderRadius: "10px",
      // marginBottom: "5px !important",
      margin: "5px",
    },
  },
  customizedButton: {
    position: "absolute",
    top: "0px",
    right: "0px",
    color: "rgb(120, 120, 120)",
  },
  paper: {
    overflowY: "unset",
  },
  createFormContainer: {
    padding: "25px",
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
    "& .MuiFormControl-marginNormal": {
      marginTop: "8px",
    },
    "& h2": {
      color: "#262424",
      textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
  },
  button: {
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "0px",
    boxShadow: "none",
    // borderBottom: "0",
    border: "1px solid #27282a",
    borderRadius: "0",
    height: "40px",
    background: theme.palette.background.blur,
    color: theme.palette.primary.main,
    borderRadius: "10px",

    "& svg": {
      width: "34px",
      height: "35px",
      background: "#FCF2FA",
      borderRadius: "10px",
      padding: "5px 6px",
      color: "rgba(152, 126, 171, 0.5)",
    },
    "&:hover": {
      background: "transparent !important",
      boxShadow: "none",
      borderRadius: "10px",
      color: theme.palette.primary.main,
      border: "1px solid hsl(230.54deg 95.03% 63.21%)  !important",
    },
  },
  createbox: {
    "& .MuiDialog-paperScrollPaper": {
      width: 450,
      maxWidth: 750,
      minWidth: 750,
      // backgroundColor: "#171717",
      [theme.breakpoints.down("sm")]: {
        width: "95%",
        maxWidth: "95%",
        minWidth: "95%",
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
  NftBreed: {
    maxWidth: "100%",
    "& h5": {
      color: theme.palette.secondary.main,
    },
    "& label": {
      color: "#000000db",
      fontSize: "14px",
    },
  },
  createCollection: {
    "& figure": {
      width: "100%",
      minHeight: "150px",
      border: "1px dashed #313131",
      borderRadius: "10px",
      minWidth: 100,
      marginRight: 15,
      marginLeft: "-2px",
    },
    "& button": {
      marginTop: 15,
    },
  },
  textfiledlabel: {
    "& label": {
      color: "#000000db",
      fontSize: "14px",
    },
  },
  imgbox: {
    width: "100%",
    minHeight: "150px",
    border: "1px dashed #313131",
    borderRadius: "10px",
  },
  selectedbutton: {
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "0px",
    boxShadow: "none",
    // borderBottom: "0",
    borderRadius: "0",
    height: "40px",
    borderRadius: "10px",
    background:
      "hsl(230.54deg 95.03% 63.21%) !important",
    boxShadow: "none",
  },

  checkBoxtheme: {
    "& span": {
      color: theme.palette.primary.main,
    },
  },
  kyctext: {
    textAlign: "center",
    fontSize: "16px",
    marginTop: " -12px",
    marginBottom: "19px",
  },
  dropZOne: {
    position: "relative",
    "& .dropDoneText": {
      position: "absolute",
      top: "80px",
      width: "100%",
      textAlign: "center",
      zIndex: "1",
      "& img": {
        minHeight: "100%",
        maxHeight: "100%",
        maxWidth: "100%",
      },
      "& p": {
        fontSize: "16px",
      },
      "& h6": {
        fontSize: "12px",
        fontWeight: 400,
      },
      "& span": {
        background:
          "hsl(230.54deg 95.03% 63.21%)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      },
    },
    "& .MuiDropzoneArea-textContainer": {
      display: "none !important",
    },
  },
}));

export default function ResellNFT(props) {
  const classes = useStyles();
  const { account, library, chainId } = useWeb3React();
  const [handleOpenKyc, setHandleOpenKyc] = useState(false);
  const { data, type, index } = props;
  const location = useLocation();
  const [share, setShare] = useState(false);
  const history = useHistory();
  const user = useContext(UserContext);
  const [startDate, setstartDate] = useState(moment().add(12, "M"));
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = useState("");
  const [royalties, setRoyalties] = useState("0");
  const [isAdvance, setIsAdvance] = useState(false);
  const [imgBlob, setImgBlob] = useState("");
  const [imgBlob1, setImgBlob1] = useState("");
  const [imageBannerr, setImageBanner] = useState("");
  const [propertyFirst, setpropertyFirst] = useState("");
  const [properySecond, setProperySecond] = useState("");
  const [alternateText, setAlternateText] = useState("");
  const [collectionList, setCollectionList] = useState([]);
  const [oldKYCData, setOldKYCData] = useState();
  const [pages, setpages] = useState(1);
  const [numpages, setNumpages] = useState(1);
  const [pages1, setpages1] = useState(1);
  const [numpages1, setNumpages1] = useState(1);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSubmit1, setIsSubmit1] = useState(false);
  const [endDate, setEndDate] = useState(moment().add(12, "M"));
  const [hotdata, setHotdata] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("create");
  const [imgFile, setImgFile] = useState("");
  const [craft, setCraft] = useState("");
  const [imgFileBase, setImgFileBase] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [uploadBanner, setUploadBanner] = useState(false);
  const [isMp3, setIsMp3] = useState(false);
  const [mediaType, setMediaType] = useState("");
  const [coverBlob, setCoverBlob] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("Create Item");
  const [coverFile, setCoverFile] = useState("");
  const [coverPrivate, setCoverPrivate] = useState(""); //coverPrivate
  const [privateDoc, setPrivateDoc] = useState(""); //PrivateDoc
  const [fileTypeCheck, setFileTypeCheck] = useState("");
  const [title, setTitle] = useState("");
  const [backImage, setBackImage] = useState("");
  const [coverFileBase, setCoverFileBase] = useState("");
  const [recipientWalletAddress, setwalletAddress] = React.useState("");
  const [recipientBackupWalletAddress, setbackupwalletAddress] =
    React.useState("");
  const [allCategory, setlistCategory] = useState();
  const dataCraft = location?.state?.data;
  const [isAuction, SetIsAuction] = useState("fixed");
  const [startPrice, setStartPrice] = useState("");
  const [price, setPrice] = useState("");
  const [unloackData, setUnloackData] = useState("");
  const web3 = (window.web3 = new Web3(window.ethereum));
  // const { allCategory } = user;
  const [isCreateOrder, setIsCreateOrder] = useState(true);
  const [check, setcheck] = useState(false);
  const [isPromoted, setisPromoted] = useState(false);
  // const [open7, setOpen7] = useState(false);
  const handlecloseKyc = () => {
    setHandleOpenKyc(false);
  };
  useEffect(() => {
    if (
      user?.isLogin &&
      user?.userData?.approveStatus &&
      user?.userData?.userType !== "Admin" &&
      user?.userData?.approveStatus !== "APPROVED"
    ) {
      setHandleOpenKyc(true);
    }
    if (
      user?.isLogin &&
      user?.userData?.approveStatus == undefined &&
      user?.userData?.userType !== "Admin"
    ) {
      setHandleOpenKyc(true);
    }
    if (
      user?.isLogin &&
      user?.userData?.approveStatus &&
      user?.userData?.approveStatus == "APPROVED"
    ) {
      setHandleOpenKyc(false);
    }
  }, [user?.isLogin, user?.userData]);
  // console.log(
  //   " auth ----- ",
  //   user?.userData?.approveStatus,
  //   " APPROVED ----- user?.userData?.approveStatus ",
  //   user?.userData
  // );
  const handleChangeStatus2 = async (file) => {
    try {
      // setisloading1(true);

      const formDataImages = new FormData();
      formDataImages.append("file", imgFile);

      const response = await axios({
        method: "POST",
        url: ApiConfig.uploadImage,
        data: formDataImages,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (response.data.statusCode === 200) {
        // toast.success("Image submitted successfully");
        setBackImage(response.data.result);

        // setisloading1(false);
      } else {
        // setisloading1(false);
        // toast.error("Image not uploaded");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (imgFile) handleChangeStatus2();
  }, [imgFile]);

  const [formValue, setFormValue] = useState({
    displayName: "",
    symbol: "",
    description: "",
    shortUrl: "",
    collectionIMG: "",
    bannerImage: "",
    telegram: "",
    instagram: "",
    twitter: "",
    facebook: "",
  });
  const [facebookUrl, setFacebookUrl] = useState(false);
  const [twitterUrl, setTwitterUrl] = useState(false);
  const [instagramUrl, setInstaGramUrl] = useState(false);
  const [telegramUrl, setTelegramUrl] = useState(false);
  // console.log("facebookUrl====", facebookUrl);
  //main
  let buttons = document.querySelectorAll("collButton");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });

  const getHotcollectionData = async () => {
    const res = await axios({
      method: "GET",
      url: ApiConfig.getCollectionFee,
    }).then(async (res) => {
      if (res.data.statusCode === 200) {
        setHotdata(res.data.result[0]?.collectionFee);
      }
    });
  };

  useEffect(() => {
    getHotcollectionData();
  }, []);

  useEffect(() => {
    if (dataCraft && dataCraft === "craft") {
      setSelectedCategory("private documents");
    }
  }, []);

  const listCategoryapi = async () => {
    try {
      const res = await axios({
        method: "Get",
        url: ApiConfig.listCategory,
        params: {
          page: pages1,
          limit: 11,
        },
      });
      if (res.data.statusCode == 200) {
        if (res.data.result.docs) {
          setlistCategory(res.data.result.docs);
          setNumpages1(res.data.result.pages);
        }
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  useEffect(() => {
    listCategoryapi();
  }, [pages1]);

  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formValue, [name]: value };
    setFormValue(temp);
  };

  const _onInputFileChange = (e) => {
    const valueBlob = URL.createObjectURL(e.target.files[0]);
    setImageBanner(valueBlob);

    const name = e.target.name;
    const value = e.target.files[0];
    const temp = { ...formValue, [name]: value };
    setFormValue(temp);
  };
  const _onInputFileChange1 = (e) => {
    const valueBlob = URL.createObjectURL(e.target.files[0]);

    setImgBlob1(valueBlob);

    const name = e.target.name;
    const value = e.target.files[0];
    const temp = { ...formValue, [name]: value };
    setFormValue(temp);
  };

  useEffect(() => {
    if (location.search.substring(1, location.search.length)) {
      const id = location.search.substring(1, location.search.length);
      setCraft(id);
    }
  }, [location.search]);

  //Collection function
  const handleSubmit = async () => {
    setIsSubmit(true);
    if (
      formValue.bannerImage !== "" &&
      formValue.displayName !== "" &&
      formValue.symbol !== "" &&
      formValue.description !== "" &&
      formValue.collectionIMG !== ""
    ) {
      setIsLoading1(true);

      // if (isValidAddress) {
      if (formValue.collectionIMG !== "") {
        await addImageHandler(formValue.collectionIMG)
          .then(async (res) => {
            if (isPromoted) {
              const contract = getContract(
                marketplaceContract,
                MarketplaceABI,
                library,
                account
              );

              const AdminOwner = await contract.owner();
              await AdminOwner;

              const transfer = await web3.eth.sendTransaction(
                {
                  from: account,
                  to: AdminOwner,
                  value: web3.utils.toWei(
                    hotdata ? hotdata.toString() : (0.001).toString()
                  ),
                },
                function async(err, transactionHash) {
                  if (err) {
                    return;
                  } else {
                  }
                }
              );

              let receipt = "";
              await uploadContractHandler(
                formValue.displayName,
                formValue.symbol,
                res,
                formValue.collectionIMG,
                account,
                (result) => {
                  receipt = result;
                }
              );

              if (receipt != false) {
                const resResult = await createCollectionAPIHanlder(
                  receipt,
                  formValue.displayName,
                  formValue.symbol ? formValue.symbol : "NA",
                  formValue.description ? formValue.description : "NA",
                  isPromoted,
                  formValue.collectionIMG,
                  formValue.bannerImage,
                  res,
                  formValue.shortUrl ? formValue.shortUrl : "NA",
                  formValue.facebook,
                  formValue.twitter,
                  formValue.instagram,
                  formValue.telegram,
                  "createCollection"
                );
                // setSuccessMSG(resResult.data.responseMessage);
                setIsLoading1(false);
                if (resResult && resResult.data.statusCode === 200) {
                  // getCollectionListHanlder();
                  toast.success(resResult.data.responseMessage);
                  setOpen(false);
                  setIsLoading1(false);
                  await getCollectionListHanlder();
                  // setSuccessMSG('');
                  // setImgBlob("");
                  setIsSubmit(false);
                  setFormValue({
                    displayName: "",
                    symbol: "",
                    description: "",
                    bannerImage: "",
                    collectionIMG: "",
                    shortUrl: "",
                    facebook: "",
                    twitter: "",
                    instagram: "",
                    telegram: "",
                  });
                  setImageBanner("");
                  setisPromoted("");
                  setImgBlob1("");
                  user.getCollectionList();
                } else {
                  if (resResult) {
                    toast.error(resResult.data.responseMessage);
                    setFormValue({
                      displayName: "",
                      symbol: "",
                      description: "",
                      bannerImage: "",
                      collectionIMG: "",
                      shortUrl: "",
                    });
                  } else {
                    toast.error("Something went wrong");
                    setIsLoading1(false);
                  }
                }
              } else {
                setIsLoading1(false);
                setIsLoading(false);
                // setSuccessMSG('Please try again');
              }
            } else {
              let receipt = "";
              await uploadContractHandler(
                formValue.displayName,
                formValue.symbol,
                res,
                formValue.collectionIMG,
                account,
                (result) => {
                  receipt = result;
                }
              );

              if (receipt != false) {
                const resResult = await createCollectionAPIHanlder(
                  receipt,
                  formValue.displayName,
                  formValue.symbol ? formValue.symbol : "NA",
                  formValue.description ? formValue.description : "NA",
                  isPromoted,
                  formValue.collectionIMG,
                  formValue.bannerImage,
                  res,
                  formValue.shortUrl ? formValue.shortUrl : "NA",
                  formValue.facebook,
                  formValue.twitter,
                  formValue.instagram,
                  formValue.telegram,

                  "createCollection"
                );
                // setSuccessMSG(resResult.data.responseMessage);
                setIsLoading1(false);

                if (resResult && resResult.data.statusCode === 200) {
                  // getCollectionListHanlder();
                  toast.success(resResult.data.responseMessage);
                  setOpen(false);
                  setIsLoading1(false);
                  await getCollectionListHanlder();
                  // setSuccessMSG('');
                  // setImgBlob("");
                  setIsSubmit(false);
                  setFormValue({
                    displayName: "",
                    symbol: "",
                    description: "",
                    bannerImage: "",
                    collectionIMG: "",
                    shortUrl: "",
                    facebookUrl: "",
                    twitterUrl: "",
                    instagram: "",
                    telegram: "",
                  });
                  setImageBanner("");
                  setisPromoted("");
                  setImgBlob1("");
                  user.getCollectionList();
                } else {
                  if (resResult) {
                    toast.error(resResult.data.responseMessage);
                    setImageBanner("");
                    setisPromoted("");
                    setImgBlob1("");
                    setFormValue({
                      displayName: "",
                      symbol: "",
                      description: "",
                      bannerImage: "",
                      collectionIMG: "",
                      shortUrl: "",
                      facebookUrl: "",
                      twitterUrl: "",
                      instagram: "",
                      telegram: "",
                    });
                  } else {
                    toast.error("Something went wrong");
                    setIsLoading1(false);
                  }
                }
              } else {
                setIsLoading1(false);
                setIsLoading(false);
              }
            }
          })
          .catch((err) => {
            setIsLoading(false);

            setIsLoading1(false);
            console.log("err", err);
            toast.error(err.message);
          });
      }
    }
    // }
  };
  const GenerativeID = "62727dbd31b40d4f8a1513a1";
  const extensionCheckFun = (image) => {
    if (image) {
      const extention = image.name.split(".").pop();
      if (extention === "mp3" || extention === "mp4") {
        setUploadBanner(true);
        setIsMp3(true);
      }
      if (extention === "mp3") {
        setMediaType("MP3");
        setIsMp3(true);
      } else if (extention === "mp4") {
        setMediaType("VIDEO");
        setIsMp3(true);
      } else {
        setMediaType("IMAGE");
      }
    }
  };
  const accessToken = window.sessionStorage.getItem("token");
  const getCollectionListHanlder = async () => {
    setOpen(false);
    axios({
      method: "GET",
      url: ApiConfig.myCollectionList,
      headers: {
        token: accessToken,
      },
      params: {
        page: pages,
        limit: 24,
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          let resultData = res.data.result.docs.filter((data)=> data.contractAddress != "0x17928648c055b9c76eC83A391CDf0B431127D4A5") 
       
          if (resultData) {
            // const result = res.data.result.docs.filter(
            //   (data) => data.contractAddress.length > 10
            // );

            const filterData = resultData.filter((data) => {
              return data?.displayName.trim() !== "GenerativeNFT";
            });

            const newData = filterData.filter((data) => {
              return (
                data?.collectionType !== "DEFAULT" ||
                (data?.collectionType === "DEFAULT" &&
                  data.userType !== user?.userData?.userType)
              );
            });

            setCollectionList(newData);
            // setCollectionList(filterData2);
            setNumpages(res.data.result.pages);
          } else {
            setCollectionList([]);
          }
          user.getlistCollection();
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    getCollectionListHanlder(cancelTokenSource);
    // if (image !== "") {
    //   extensionCheckFun();
    // }
    return () => {
      cancelTokenSource.cancel();
    };
  }, [user.userData, isCreateOrder, pages]);

  const pageCheck = pages === 1 ? 23 : 0;
  const pageCheck1 = pages1 === 1 ? 10 : 0;

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (err) {
      console.log("Error: ", err);
    };
  };

  //only CreateNFT
  const submitHanlder = async () => {
    setIsSubmit1(true);
    const checkPrice = price;
    const mediaURLCheck = imgFile ? imgFile : imgFileBase;
    if (chainId === ACTIVE_NETWORK) {
      if (
        (title !== "" &&
          royalties !== "" &&
          parseFloat(royalties) >= 0 &&
          parseFloat(royalties) <= 10 &&
          selectedCategory !== "" &&
          imgFileBase !== "") ||
        coverPrivate !== ""
      ) {
        setIsLoading(true);
        setTransactionStatus("Loading...");
        toast.warn("Please do not refresh the page");
        await addImageHandler(imgFile)
          .then(async (res) => {
            const body = new FormData();
            body.append("tokenName", title);
            body.append("description", description);
            body.append("image", res);

            setTransactionStatus("Uploading...");

            const receipt = await uploadNFTHandler(body, res, "uploadNFT");
            let advanceSettings = {
              propertyFirst: propertyFirst,
              properySecond: properySecond,
              alternateText: alternateText,
            };

            let fileExtention = imgFile.name.split(".").pop();
            let fileType =
              fileExtention == "mp4" || fileExtention == "webp"
                ? "video"
                : fileExtention == "mp3"
                ? "audio"
                : "image";
            let createBody = {
              coverFile: coverFileBase ? coverFileBase : imgFileBase,

              imgFile:
                fileType == "video" || fileType == "audio"
                  ? backImage
                  : imgFileBase, // ? coverFileBase : imgFileBase,,
              uri: res,
              title: title,
              categoryType: selectedCategory,

              collectionId: selectedCollection._id,
              contractAddress: selectedCollection.contractAddress,
              description: description,
              royalties: royalties,

              currentOwner: user?.walletuserId,
              network: chainId,
              price: price !== "" ? price : "0",
              startPrice: startPrice !== "" ? startPrice : " 0",

              mediaType: fileType,
              recipientWalletAddress: recipientWalletAddress,
              recipientBackupWalletAddress: recipientBackupWalletAddress,
              couponAddress: "0x",
              isDirectSale:
                price !== "" && startPrice !== ""
                  ? true
                  : isAuction === "fixed"
                  ? true
                  : false,
              isAuction:
                price !== "" && startPrice !== ""
                  ? true
                  : isAuction === "fixed"
                  ? false
                  : true,
              endTime: moment(endDate).unix() * 1000,
              startDate: moment(startDate).unix() * 1000,
              saleType: isAuction === "fixed" ? "ONSALE" : "ONSALE",
              orderType:
                price !== "" && startPrice !== ""
                  ? "AUCTION_FIXEDPRICE_BOTH"
                  : isAuction === "fixed"
                  ? "FIXED_PRICE"
                  : "TIMED_AUCTION",
            };

            if (receipt) {
              setIsLoading(true);
              const web3 = await getWeb3Obj();
              try {
                let royaltiesdata = royalties.toString() * 100;

                if (
                  await createNFTBlockchainHanlder(
                    selectedCollection?.contractAddress,
                    NftTokenABI,
                    library,
                    account,
                    receipt?.ipfsHash,
                    title,
                    royaltiesdata
                  )
                ) {
                  const tokenId = await getTokenId(
                    selectedCollection?.contractAddress,
                    NftTokenABI,
                    library,
                    account
                  );

                  let tokenIdN = parseInt(tokenId);

                  const creRes = await createNFTHandler(
                    createBody,
                    tokenIdN.toString(),
                    marketplaceContract,
                    MarketplaceABI,
                    library,
                    account,
                    advanceSettings
                  );
                  if (creRes && creRes.data.statusCode === 200) {
                    setIsLoading(false);
                    setTransactionStatus("Create Item");
                    toast.success(creRes.data.responseMessage);
                    setTimeout(() => {
                      history.push({
                        pathname: "/profile",
                        search: user.userData._id,
                      });
                    }, 1000);
                  } else {
                    if (creRes) {
                      toast.error(creRes.data.responseMessage);
                    } else {
                      toast.error("Something went wrong");
                    }

                    setIsLoading(false);
                    setTransactionStatus("Create Item");
                  }
                } else {
                  toast.error("Something went wrong");
                  setIsLoading(false);
                  setTransactionStatus("Create Item");
                }
                // }
              } catch (error) {
                console.log(" ----- error", error);
                if (error?.data?.message) {
                  toast.error(error?.data?.message);
                } else {
                  toast.error(error.message.split("(")[0]);
                }
                setIsLoading(false);
                setTransactionStatus("Create Item");
                console.log("ERROR", error);
              }
            } else {
              toast.error("Unable to upload image on IPFS");

              setIsLoading(false);
              setTransactionStatus("Create Item");
            }
            // });
          })
          .catch((error) => {
            toast.error("Unable to upload image");

            setIsLoading(false);
            setTransactionStatus("Create Item");
          });
      } else {
        toast.warn("Please enter valid data ");
      }
    }
    // } else {
    //   swichNetworkHandler();
    //   setIsLoading(false);
    // }
  };

  //Ordercreat
  const submitCreateNFTHanlder = async () => {
    setIsSubmit1(true);
    const checkPrice = price;
    const mediaURLCheck = imgFile ? imgFile : imgFileBase;
    if (chainId === ACTIVE_NETWORK) {
      if (
        (title !== "" &&
          description !== "" &&
          checkPrice !== "" &&
          parseFloat(checkPrice) > 0 &&
          royalties !== "" &&
          description !== "" &&
          parseFloat(royalties) >= 0 &&
          parseFloat(royalties) <= 10 &&
          selectedCollection !== "create" &&
          selectedCategory !== "" &&
          imgFileBase !== "") ||
        coverPrivate !== ""
      ) {
        let fileExtention = imgFile.name.split(".").pop();

        let fileType =
          fileExtention == "mp4" || fileExtention == "webp"
            ? "video"
            : fileExtention == "mp3"
            ? "audio"
            : "image";
        if (fileType == "video" && coverFileBase == "") {
          return;
        }
        if (fileType == "audio" && coverFileBase == "") {
          return;
        }
        setIsLoading(true);
        setTransactionStatus("Loading...");
        toast.warn("Please do not refresh the page");
        await addImageHandler(imgFile)
          .then(async (res) => {
            const body = new FormData();
            body.append("tokenName", title);
            body.append("description", description);
            body.append("image", res);

            setTransactionStatus("Uploading...");

            const receipt = await uploadNFTHandler(body, res, "uploadNFT");

            let advanceSettings = {
              propertyFirst: propertyFirst,
              properySecond: properySecond,
              alternateText: alternateText,
            };

            let createBody = {
              coverFile: coverFileBase,
              imgFile:
                fileType == "video" || fileType == "audio" || fileType == "mp3"
                  ? backImage
                  : imgFileBase,
              uri: res,
              title: title,
              categoryType: selectedCategory,
              unlockOncePurchased: unloackData,
              collectionId: selectedCollection._id,
              contractAddress: selectedCollection.contractAddress,
              description: description,
              royalties: royalties,
              physicalType: "NORMAL",
              currentOwner: user?.walletuserId,
              network: chainId,
              recipientWalletAddress: recipientWalletAddress
                ? recipientWalletAddress
                : "String",
              recipientBackupWalletAddress: recipientBackupWalletAddress
                ? recipientBackupWalletAddress
                : "String",
              price: price !== "" ? price : "0",
              startPrice: startPrice !== "" ? startPrice : " 0",

              mediaType: fileTypeCheck,
              couponAddress: "0x",
              isDirectSale:
                price !== "" && startPrice !== ""
                  ? true
                  : isAuction === "fixed"
                  ? true
                  : false,
              isAuction:
                price !== "" && startPrice !== ""
                  ? true
                  : isAuction === "fixed"
                  ? false
                  : true,

              endTime: moment(endDate).unix() * 1000,
              startDate: moment(startDate).unix() * 1000,
              saleType: isAuction === "fixed" ? "ONSALE" : "ONSALE",
              orderType:
                price !== "" && startPrice !== ""
                  ? "AUCTION_FIXEDPRICE_BOTH"
                  : isAuction === "fixed"
                  ? "FIXED_PRICE"
                  : "TIMED_AUCTION",
            };
            if (receipt?.ipfsHash) {
              const web3 = await getWeb3Obj();

              try {
                let royaltiesdata = Number(royalties) * 100;

                if (
                  await createNFTBlockchainHanlder(
                    selectedCollection?.contractAddress,
                    NftTokenABI,
                    library,
                    account,
                    receipt?.ipfsHash,
                    title,
                    royaltiesdata
                  )
                ) {
                  const tokenId = await getTokenId(
                    selectedCollection?.contractAddress,
                    NftTokenABI,
                    library,
                    account
                  );

                  let tokenIdN = parseInt(tokenId);

                  const creRes = await createNFTHandler(
                    createBody,
                    tokenIdN.toString(),
                    marketplaceContract,
                    MarketplaceABI,
                    library,
                    account,
                    advanceSettings
                  );

                  if (creRes && creRes.data.statusCode === 200) {
                    setIsLoading(true);
                    setTransactionStatus("Create Item");
                    const contractObj = getContract(
                      selectedCollection?.contractAddress,
                      NftTokenABI,
                      library,
                      account
                    );

                    const NFTApprovalID = await contractObj.approve(
                      marketplaceContract,
                      tokenIdN.toString()
                    );

                    await NFTApprovalID.wait();
                    const createObjm = getContract(
                      marketplaceContract,
                      MarketplaceABI,
                      library,
                      account
                    );

                    const marketPlace = await createObjm.createOrder(
                      selectedCollection?.contractAddress,
                      tokenIdN.toString(),
                      ethers.utils.parseEther(price.toString()),
                      moment(endDate).unix(),
                      currency
                    );
                    await marketPlace.wait();

                    const placeres = await placeOrderAPIHandler(
                      createBody,
                      creRes.data.result._id,
                      account,
                      advanceSettings
                    );

                    setIsLoading(true);
                    setTransactionStatus("Create Item");
                    if (placeres) {
                      if (placeres && placeres.data.statusCode === 200) {
                        setIsLoading(false);
                        toast.success(placeres.data.responseMessage);
                        setTimeout(() => {
                          history.push({
                            pathname: "/profile",
                          });
                        }, 1000);
                      } else {
                        toast.error(placeres.data.responseMessage);
                      }
                    } else {
                      toast.error("Something went wrong");
                    }
                  } else {
                    if (creRes) {
                      toast.error(creRes.data.responseMessage);
                    } else {
                      toast.error("Something went wrong");
                    }

                    setIsLoading(false);
                    setTransactionStatus("Create Item");
                  }
                } else {
                  toast.error("Something went wrong");
                  setIsLoading(false);
                  setTransactionStatus("Create Item");
                }
                // }
              } catch (error) {
                if (error?.data?.message) {
                  toast.error(error?.data?.message);
                } else {
                  toast.error(error.message.split("(")[0]);
                }
                setIsLoading(false);
                setTransactionStatus("Create Item");
                console.log("ERROR", error);
              }
            } else {
              toast.error("Unable to upload image on IPFS");

              setIsLoading(false);
              setTransactionStatus("Create Item");
            }
            // });
          })
          .catch((error) => {
            toast.error("Unable to upload image");

            setIsLoading(false);
            setTransactionStatus("Create Item");
          });
      } else {
        toast.warn("Please enter valid data ");
      }
    } else {
      swichNetworkHandler();
      setIsLoading(false);
    }
  };

  const viewKyc = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.viewKycUser,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setOldKYCData(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.userData && user.userData.approveStatus) {
      viewKyc();
    } else {
      setOldKYCData();
    }
  }, [user.userData]);

  return (
    <>
      <Box className={classes.bannerBox}>
        <Container maxWidth="lg">
          <Paper elevation={2}>
            <Box className={classes.createFormContainer}>
              <Box>
                {user && user.checkKYCStatus() && (
                  <>
                    {oldKYCData?.approveStatus === "PENDING" ? (
                      <>
                        {" "}
                        <Typography color="error" className={classes.kyctext}>
                          Your KYC request is under review!
                        </Typography>
                      </>
                    ) : (
                      <>
                        {user?.userData?.approveStatus === "REJECTED" ? (
                          <>
                            <Typography
                              color="error"
                              className={classes.kyctext}
                            >
                              {" "}
                              Your KYC request has been rejected. Reason:{" "}
                              {oldKYCData?.reason}
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Typography
                              color="error"
                              className={classes.kyctext}
                            >
                              {" "}
                              Please Submit KYC Request!
                            </Typography>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </Box>
              <Grid container spacing={2}>
                <Grid item lg={12} sm={12} xs={12}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    className="cardCreate"
                    mb={3}
                  >
                    <Button
                      disabled={isLoading}
                      variant="contained"
                      size="large"
                      color="primary"
                      className={
                        isCreateOrder ? classes.selectedbutton : classes.button
                      }
                      onClick={() => setIsCreateOrder(true)}
                    >
                      {" "}
                      Create Live NFT
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      disabled={isLoading}
                      variant="contained"
                      size="large"
                      color="primary"
                      className={
                        !isCreateOrder ? classes.selectedbutton : classes.button
                      }
                      onClick={() => setIsCreateOrder(false)}
                    >
                      {" "}
                      Create Offline NFT
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              {isCreateOrder ? (
                <Box className={classes.heading}>
                  <Typography variant="h1" color="primary">
                    Create {""}
                    <span>Live NFT</span>
                  </Typography>
                </Box>
              ) : (
                <Box className={classes.heading}>
                  <Typography variant="h1" color="primary">
                    Create {""}
                    <span>Offline NFT</span>
                  </Typography>
                </Box>
              )}

              <Box pt={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box className="cardCreate" mb={2}>
                      <Typography
                        variant="body2"
                        color="primary"
                        style={{ padding: "8px 0px" }}
                      >
                        Upload file <span style={{ color: "#f44336" }}>*</span>
                      </Typography>

                      <Box className="uploadBox">
                        <Typography
                          variant="body1"
                          style={{
                            color: "#9e9d9e",
                            fontSize: "10px !important",
                            whiteSpace: "pre",
                            marginTop: "-8px",
                          }}
                        >
                          JPEG, PNG, GIF, Max, Audio (620 x 620 recommended) Max
                          size: 100 MB
                        </Typography>

                        <Box mt={2}>
                          <FormHelperText error>
                            {imgFile &&
                              imgFile.size > 100000000 &&
                              "File limit 100MB"}
                          </FormHelperText>
                        </Box>
                      </Box>
                    </Box>
                    {imgBlob ? (
                      <Box className={classes.imgbox}>
                        <Box>
                          {fileTypeCheck === "video" && (
                            <video
                              controls="false"
                              autoplay="true"
                              loop
                              muted
                              playsinline="true"
                              style={{ height: "98px" }}
                            >
                              <source src={imgBlob} type="video/mp4" />
                            </video>
                          )}
                          {fileTypeCheck === "audio" && (
                            <Box style={{ padding: "5px" }}>
                              <audio controls>
                                <source src={imgBlob} type="audio/mpeg" />
                              </audio>
                            </Box>
                          )}
                          {fileTypeCheck === "image" && (
                            <Box
                              className={classes.nftImg}
                              style={{
                                background: `url(${
                                  imgBlob !== ""
                                    ? imgBlob
                                    : "/media/cc0-videos/flower.mp4"
                                })`,
                              }}
                            ></Box>
                          )}
                        </Box>
                        <Box p={2}>
                          <Button
                            disabled={isLoading}
                            variant="contained"
                            color="primary"
                            component="span"
                            onClick={() => {
                              setImgBlob("");
                              setImgFile("");
                              setImgFileBase("");
                            }}
                          >
                            Remove
                          </Button>
                        </Box>
                      </Box>
                    ) : (
                      <Box
                        align="left"
                        mt={3}
                        mb={4}
                        className={classes.dropZOne}
                      >
                        <DropzoneArea
                          style={{ marginTop: "5px" }}
                          maxFileSize={10000000}
                          filesLimit={1}
                          acceptedFiles={[
                            "image/jpg",
                            "image/jpeg",
                            "image/png",
                            "image/bmp",
                            "image/gif",
                            ".mp4",
                            ".webp",
                            ".mp3",
                          ]}
                          onChange={(file) => {
                            if (file && file.length > 0) {
                              setImgBlob(URL.createObjectURL(file[0]));
                              setImgFile(file[0]);
                              getBase64(file[0], (result) => {
                                setImgFileBase(result);
                              });
                              var fileExtention = file[0].name.split(".").pop();
                              var fileType =
                                fileExtention == "mp4" ||
                                fileExtention == "webp"
                                  ? "video"
                                  : fileExtention == "mp3"
                                  ? "audio"
                                  : "image";
                              setFileTypeCheck(fileType);
                            }
                          }}
                        />
                        {isSubmit1 && imgBlob === "" && (
                          <Typography
                            variant="body2"
                            style={{
                              color: "#f44336",
                              fontSize: "0.75rem",
                            }}
                          >
                            Please select image
                          </Typography>
                        )}
                        <Box className="dropDoneText">
                          <FiUpload style={{ height: "20px", width: "20px" }} />
                          <Typography>
                            Drag & drop files or{" "}
                            <span
                              style={{
                                fontSize: "16px"
                              }}
                            >
                              Browse Files
                            </span>
                          </Typography>
                        </Box>
                      </Box>
                    )}

                    {(fileTypeCheck === "video" ||
                      fileTypeCheck === "audio") && (
                      <Grid item xs={12} md={12}>
                        <Box className="cardCreate" mb={2}>
                          <label className={classes.fontSixeText}>
                            Upload cover
                          </label>
                          <Box className="uploadBox" mt={1}>
                            <Typography
                              variant="body2"
                              // style={{
                              //   // color: "rgba(0, 0, 0, 0.75)",
                              //   fontSize: "12px",
                              // }}
                              style={{
                                color: "#9e9d9e",
                                fontSize: "10px !important",
                                whiteSpace: "pre",
                                marginTop: "-8px",
                              }}
                            >
                              JPG, PNG, GIF, WEBP Max 10mb.
                            </Typography>
                            <Box mt={2}>
                              {coverBlob ? (
                                <>
                                  <Box className={classes.imgbox}>
                                    <Box>
                                      {coverBlob && (
                                        <Box
                                          className={classes.nftImg}
                                          style={{
                                            background: `url(${
                                              coverBlob !== ""
                                                ? coverBlob
                                                : "/media/cc0-videos/flower.mp4"
                                            })`,
                                          }}
                                        ></Box>
                                      )}
                                    </Box>
                                    <Box p={2}>
                                      <Button
                                        disabled={isLoading}
                                        variant="contained"
                                        color="primary"
                                        component="span"
                                        onClick={() => {
                                          setCoverBlob("");
                                          setCoverFile("");
                                          setCoverFileBase("");
                                          setFileTypeCheck("");
                                        }}
                                      >
                                        Remove
                                      </Button>
                                    </Box>
                                  </Box>
                                </>
                              ) : (
                                <Box
                                  align="left"
                                  mt={3}
                                  mb={4}
                                  className={classes.dropZOne}
                                >
                                  <DropzoneArea
                                    style={{ marginTop: "5px" }}
                                    maxFileSize={10000000}
                                    filesLimit={1}
                                    acceptedFiles={[
                                      "image/jpg",
                                      "image/jpeg",
                                      "image/png",
                                      "image/bmp",
                                    ]}
                                    onChange={(file) => {
                                      if (file && file.length > 0) {
                                        setCoverBlob(
                                          URL.createObjectURL(file[0])
                                        );
                                        setCoverFile(file[0]);
                                        getBase64(file[0], (result) => {
                                          setCoverFileBase(result);
                                        });
                                      }
                                    }}
                                  />
                                  {isSubmit1 && coverFileBase === "" && (
                                    <Typography
                                      variant="body2"
                                      style={{
                                        color: "#f44336",
                                        fontSize: "0.75rem",
                                      }}
                                    >
                                      Please seect cover image
                                    </Typography>
                                  )}
                                  <Box className="dropDoneText">
                                    <FiUpload
                                      style={{ height: "20px", width: "20px" }}
                                    />
                                    <Typography>
                                      Drag & drop files or{" "}
                                      <span
                                        style={{
                                          fontSize: "16px",
                                        }}
                                      >
                                        Browse Files
                                      </span>
                                    </Typography>
                                  </Box>
                                </Box>
                              )}
                            </Box>
                          </Box>
                          <Typography
                            variant="body2"
                            color="primary"
                            className={classes.fontSixeText}
                          >
                            Please add cover image to your media file
                          </Typography>
                        </Box>
                        {isSubmit1 && coverFileBase === "" && (
                          <Typography
                            variant="body2"
                            style={{ color: "#f44336" }}
                          >
                            Please select cover image
                          </Typography>
                        )}
                      </Grid>
                    )}
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box className="cardCreate" mb={3}>
                      <Typography
                        variant="body2"
                        color="primary"
                        className={classes.fontSixeText}
                      >
                        Item Category{" "}
                        <span style={{ color: "#f44336" }}>*</span>
                      </Typography>
                      <Box
                        style={{ marginBottom: "-25px" }}
                        className={classes.FilterDiv}
                        mt={2}
                      >
                        {allCategory
                          ? allCategory &&
                            allCategory.map((data, i) => {
                              return (
                                // <Box key={i} >
                                <Button
                                  variant="contained"
                                  size="large"
                                  color="primary"
                                  className={
                                    selectedCategory ===
                                    data?.categoryTitle.toLowerCase()
                                      ? classes.selectedbutton
                                      : classes.button
                                  }
                                  key={data.categoryTitle}
                                  onClick={() =>
                                    setSelectedCategory(
                                      data.categoryTitle.toLowerCase()
                                    )
                                  }
                                  disabled={isLoading}
                                >
                                  {data.categoryTitle}
                                </Button>
                              );
                            })
                          : "No Category Found"}
                        {allCategory && allCategory.length >= pageCheck1 ? (
                          <Box
                            className={classes.tabBtn}
                            pt={1}
                            display="flex"
                            justifyContent="end"
                          >
                            <Pagination
                              page={pages1}
                              onChange={(e, v) => setpages1(v)}
                              count={numpages1}
                              color="secondary"
                            />
                          </Box>
                        ) : (
                          ""
                        )}
                      </Box>
                    </Box>
                    {isSubmit1 && selectedCategory === "" && (
                      <Typography
                        variant="body2"
                        style={{ color: "#f44336", fontSize: "0.75rem" }}
                      >
                        Please select category
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box py={1}>
                      <Typography
                        variant="body2"
                        color="primary"
                        className={classes.fontSixeText}
                      >
                        Expiration Date{" "}
                        <span style={{ color: "#f44336" }}>*</span>
                      </Typography>
                      <FormControl className={classes.formControl}>
                        <DateTimePicker
                          value={endDate}
                          inputVariant="outlined"
                          onChange={(date) => {
                            setEndDate(date);
                          }}
                          disabled={isLoading}
                          format="DD/MM/yyyy hh:mm A"
                          minDate={moment().toDate()}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {isCreateOrder && (
                      <Box className="cardCreate">
                        <Box py={1}>
                          <Typography
                            variant="body2"
                            color="primary"
                            className={classes.fontSixeText}
                          >
                            Price In Metamart{" "}
                            <span style={{ color: "#f44336" }}>*</span>
                          </Typography>
                          <FormControl fullWidth className={classes.margin}>
                            <TextField
                              disabled={isLoading}
                              variant="outlined"
                              type="number"
                              placeholder="0.00"
                              value={price}
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
                                isSubmit1 &&
                                (price === "" || parseFloat(price) <= 0)
                              }
                              helperText={
                                isSubmit1 &&
                                (price === "" || parseFloat(price) <= 0) &&
                                "Please enter price"
                              }
                            />
                          </FormControl>
                        </Box>
                      </Box>
                    )}
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box>
                      <Typography
                        variant="body1"
                        className={classes.fontSixeText}
                      >
                        Create or add to existing collection{" "}
                        <span style={{ color: "#f44336" }}>*</span>
                      </Typography>
                      <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        color="primary"
                        onClick={() => setOpen(true)}
                        style={{
                          width: "100%",
                          background: "#0d0d0d",
                          color: "#fff !important",
                          whiteSpace: "nowrap",
                          borderRadius: "4px",
                          justifyContent: "flex-start",
                        }}
                        disabled={isLoading || user.checkKYCStatus()}
                      >
                        <MdAddCircle
                          style={{
                            color: "#fff",
                            fontSize: "25px",
                            marginRight: "7px",
                            width: "32px",
                            minWidth: "37px",
                          }}
                        />{" "}
                        Create BEP-20 Collection
                      </Button>
                    </Box>
                    <Grid container spacing={2} style={{ marginTop: "10px" }}>
                      {collectionList.map((data, i) => {
                        return (
                          <Grid
                            item
                            sm={6}
                            xs={12}
                            key={i}
                            className="collButton"
                            style={{ padding: "5px" }}
                          >
                            <CollectionCard
                              selectedCollection={selectedCollection}
                              setSelectedCollection={(selectedColl) =>
                                setSelectedCollection(selectedColl)
                              }
                              getCollectionListHanlder={
                                getCollectionListHanlder
                              }
                              key={i}
                              data={data}
                              isLoading={isLoading}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                    {isSubmit1 && selectedCollection === "create" && (
                      <Typography
                        variant="body2"
                        style={{
                          color: "#f44336",
                          fontSize: "0.75rem",
                          marginTop: "10px",
                        }}
                      >
                        Please select collection
                      </Typography>
                    )}
                    {collectionList && collectionList.length >= pageCheck && (
                      <Box
                        className={classes.tabBtn}
                        pt={1}
                        display="flex"
                        justifyContent="end"
                      >
                        <Pagination
                          onChange={(e, v) => setpages(v)}
                          count={parseInt(numpages)}
                          color="secondary"
                        />
                      </Box>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Typography
                        variant="body2"
                        color="primary"
                        className={classes.fontSixeText}
                      >
                        Title <span style={{ color: "#f44336" }}>*</span>
                      </Typography>
                      <FormControl fullWidth>
                        <TextField
                          variant="outlined"
                          inputProps={{ maxLength: 61 }}
                          disabled={isLoading}
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          error={isSubmit1 && title === ""}
                          helperText={
                            isSubmit1 && title === "" && "Please enter title"
                          }
                          placeholder="e. g. 'Redeemable T-Shirt with logo'"
                        />
                      </FormControl>
                      {title.length > 60 && (
                        <FormHelperText error>
                          Please should not exceed 60 characters
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box mt={1}>
                      <Typography
                        variant="body2"
                        color="primary"
                        className={classes.fontSixeText}
                      >
                        Description <span style={{ color: "#f44336" }}>*</span>
                      </Typography>
                      <FormControl fullWidth multiline rows={4}>
                        <TextField
                          variant="outlined"
                          inputProps={{ maxLength: 601 }}
                          disabled={isLoading}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          multiline
                          rows={6}
                          error={
                            (isSubmit1 && description === "") ||
                            description.length > 600
                          }
                          helperText={
                            isSubmit1 &&
                            description === "" &&
                            "Please enter description"
                          }
                          placeholder=" e. g. 'After purchasing you’ll be able to get the real T-Shirt'"
                        />
                        <small
                          style={{
                            color: "rgb(158, 157, 158)",
                            fontSize: "12px",
                          }}
                        >
                          With preserved line-breaks
                        </small>
                      </FormControl>
                      {description.length > 600 && (
                        <FormHelperText error>
                          Please should not exceed 600 characters
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box mt={1}>
                      <Box>
                        <Typography
                          variant="body1"
                          color="primary"
                          className={classes.fontSixeText}
                        >
                          Royalties <span style={{ color: "#f44336" }}>*</span>
                        </Typography>
                      </Box>
                      <FormControl fullWidth className={classes.margin}>
                        <TextField
                          variant="outlined"
                          value={royalties}
                          placeholder="e. g. 10%"
                          type="number"
                          onKeyPress={(event) => {
                            if (event?.key === "-" || event?.key === "+") {
                              event.preventDefault();
                            }
                          }}
                          // maxlength="2"
                          onChange={(e) => {
                            if (e.target.value <= 10) {
                              // setRoyalties(e.target.value);
                              const value = e.target.value;

                              // Check if the value is a valid number with up to two decimal places
                              if (
                                /^\d+(\.\d{0,2})?$/.test(value) ||
                                value === ""
                              ) {
                                setRoyalties(value);
                              }
                            }
                          }}
                          // onChange={(e) => setRoyalties(e.target.value)}
                          error={
                            isSubmit1 &&
                            royalties === "" &&
                            parseFloat(royalties) <= 0
                          }
                          InputProps={{
                            inputProps: { min: 0 },
                          }}
                          helperText={
                            isSubmit1 &&
                            royalties === "" && (
                              <p
                                style={{
                                  color: "#f44336",
                                  marginTop: "1px",
                                }}
                              >
                                {" "}
                                Please enter royalties
                              </p>
                            )
                          }
                          disabled={isLoading}
                        />
                        <small
                          style={{
                            color: "rgb(158, 157, 158)",
                            fontSize: "12px",
                          }}
                        >
                          Suggested : 0 - 10%
                        </small>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={12}>
                  <Box className="cardCreate">
                    <Box>
                      <Box mt={2}>
                        <Box>
                          {/* {isCreateOrder && (
                            <Box mt={2}>
                              <Button
                                variant="contained"
                                size="large"
                                color="primary"
                                // onClick={() => setSettings(!settings)}
                                onClick={() => setIsAdvance(!isAdvance)}
                                disabled={isLoading}
                              >
                                {isAdvance ? "Hide" : "Show"} advanced settings
                              </Button>
                            </Box>
                          )} */}
                        </Box>
                      </Box>
                    </Box>
                    {isAdvance && (
                      <Box mt={2}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Box mt={2}>
                              <label className={classes.fontSixeText}>
                                {" "}
                                Properties(Optional)
                              </label>
                              <FormControl fullWidth>
                                <Input
                                  placeholder="e.g. Size"
                                  value={propertyFirst}
                                  onChange={(e) =>
                                    setpropertyFirst(e.target.value)
                                  }
                                  disabled={isLoading}
                                />
                              </FormControl>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box mt={2}>
                              <label>&nbsp;</label>
                              <FormControl fullWidth>
                                <Input
                                  onChange={(e) =>
                                    setProperySecond(e.target.value)
                                  }
                                  placeholder="e.g. M"
                                  disabled={isLoading}
                                />
                              </FormControl>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                    {/* {user && user.checkKYCStatus() && (
                      <>
                        {oldKYCData?.approveStatus === "PENDING" ? (
                          <>
                            {" "}
                            <Typography color="error">
                              Your KYC request is under review!
                            </Typography>
                          </>
                        ) : (
                          <>
                            {user?.userData?.approveStatus === "REJECTED" ? (
                              <>
                                <Typography color="error">
                                  {" "}
                                  Your KYC request has been rejected. Reason:{" "}
                                  {oldKYCData?.reason}
                                </Typography>
                              </>
                            ) : (
                              <>
                                <Typography color="error">
                                  {" "}
                                  Please Submit KYC Request!
                                </Typography>
                              </>
                            )}
                          </>
                        )}
                      </>
                    )} */}
                    <Box
                      mt={1}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Button
                        onClick={() => {
                          if (user.checkKYCStatus()) {
                            setHandleOpenKyc(true);
                          } else {
                            isCreateOrder === false
                              ? submitHanlder()
                              : submitCreateNFTHanlder();
                          }
                        }}
                        // variant="contained"
                        // color="secondary"
                        variant="contained"
                        size="large"
                        color="primary"
                        disabled={isLoading || selectedCategory === "tickets"}
                      >
                        {transactionStatus}{" "}
                        {isLoading && <ButtonCircularProgress />}
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Box>
              <Dialog
                open={open}
                className={classes.createbox}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                classes={{ paper: classes.paper }}
              >
                <DialogActions>
                  <IconButton
                    disabled={isLoading1}
                    onClick={() => setOpen(false)}
                    className={classes.customizedButton}
                  >
                    <CloseIcon />
                  </IconButton>
                </DialogActions>
                <DialogContent className={classes.dialogBox}>
                  <Box className={classes.NftBreed}>
                    <Box>
                      <Typography variant="h1" color="primary">
                        Collection
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          {" "}
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            className={classes.createCollection}
                          >
                            <Box>
                              {imageBannerr !== "" ? (
                                <img
                                  src={imageBannerr}
                                  alt=""
                                  width="100"
                                  height="100"
                                  style={{ borderRadius: "50%" }}
                                />
                              ) : (
                                <figure></figure>
                              )}
                            </Box>
                            <Box pl={2}>
                              <Typography
                                variant="body1"
                                style={{
                                  color: "#9e9d9e",
                                  fontSize: "8px !important",
                                }}
                              >
                                We recommend an image of at least 400x400.
                              </Typography>
                              <Typography
                                variant="body2"
                                color="primary"
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "600px",
                                }}
                              >
                                Select Banner Image{" "}
                                <span style={{ color: "#f44336" }}>*</span>
                              </Typography>
                              <Box>
                                <input
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  id="raised-button-file-banner"
                                  type="file"
                                  name="bannerImage"
                                  onChange={(e) => {
                                    _onInputFileChange(e);
                                  }}
                                />

                                <label htmlFor="raised-button-file-banner">
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                  >
                                    Choose File
                                  </Button>
                                </label>
                                {isSubmit && formValue.bannerImage === "" && (
                                  <Typography
                                    style={{ color: "#f44336" }}
                                    variant="body2"
                                  >
                                    Please select banner image
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box
                            className={classes.createCollection}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Box>
                              {imgBlob1 !== "" ? (
                                <img
                                  src={imgBlob1}
                                  alt=""
                                  width="100"
                                  height="100"
                                  style={{ borderRadius: "50%" }}
                                />
                              ) : (
                                <figure></figure>
                              )}
                            </Box>
                            <Box pl={2}>
                              <Typography
                                variant="body1"
                                style={{
                                  color: "#9e9d9e",
                                  fontSize: "8px !important",
                                }}
                              >
                                We recommend an image of at least 400x400.
                              </Typography>
                              <Typography
                                variant="body2"
                                style={{
                                  color: "#fff",
                                  fontSize: "15px",
                                  fontWeight: "600px",
                                }}
                              >
                                Select Image{" "}
                                <span style={{ color: "#f44336" }}>*</span>
                              </Typography>
                              <Box>
                                <input
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  id="raised-button-file78"
                                  multiple
                                  type="file"
                                  name="collectionIMG"
                                  onChange={(e) => {
                                    _onInputFileChange1(e);
                                  }}
                                />
                                <label htmlFor="raised-button-file78">
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                  >
                                    Choose File
                                  </Button>
                                </label>
                                {isSubmit && formValue.collectionIMG === "" && (
                                  <Typography
                                    style={{ color: "#f44336" }}
                                    variant="body2"
                                  >
                                    Please select image
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>

                      <Box mt={2} className={classes.textfiledlabel}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            {" "}
                            <Box>
                              <Typography variant="body2" color="primary">
                                Display name{" "}
                                <span style={{ color: "#f44336" }}>*</span>
                              </Typography>
                              <FormControl fullWidth className={classes.margin}>
                                <TextField
                                  disabled={isLoading1}
                                  variant="outlined"
                                  placeholder="Please enter displayname"
                                  name="displayName"
                                  inputProps={{ maxLength: 61 }}
                                  value={formValue.displayName}
                                  onChange={(e) => _onInputChange(e)}
                                  error={
                                    isSubmit && formValue.displayName === ""
                                  }
                                  helperText={
                                    isSubmit &&
                                    formValue.displayName === "" &&
                                    "Please enter displayname"
                                  }
                                />
                                {formValue.displayName.length > 60 && (
                                  <FormHelperText error>
                                    Please should not exceed 60 characters
                                  </FormHelperText>
                                )}
                                {/* <small>Token name cannot be changed in future</small> */}
                              </FormControl>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <Typography variant="body2" color="primary">
                                Symbol{" "}
                                <span style={{ color: "#f44336" }}>*</span>
                              </Typography>
                              <FormControl fullWidth className={classes.margin}>
                                <TextField
                                  disabled={isLoading1}
                                  variant="outlined"
                                  placeholder="Please enter symbol"
                                  name="symbol"
                                  inputProps={{ maxLength: 11 }}
                                  value={formValue.symbol}
                                  onChange={(e) => _onInputChange(e)}
                                  error={isSubmit && formValue.symbol === ""}
                                  helperText={
                                    isSubmit &&
                                    formValue.symbol === "" &&
                                    "Please enter symbol"
                                  }
                                />
                                {formValue.symbol.length > 10 && (
                                  <FormHelperText error>
                                    Please should not exceed 10 characters
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <Typography variant="body2" color="primary">
                                Facebook{" "}
                              </Typography>
                              <FormControl fullWidth className={classes.margin}>
                                <TextField
                                  disabled={isLoading1}
                                  variant="outlined"
                                  placeholder="Please enter facebook url"
                                  name="facebook"
                                  value={formValue.facebook}
                                  onChange={(e) => {
                                    if (isValidFacebookURL(e.target.value)) {
                                      setFacebookUrl(false);
                                    } else {
                                      setFacebookUrl(true);
                                    }
                                    setFormValue({
                                      ...formValue,
                                      ["facebook"]: e.target.value,
                                    });
                                  }}
                                />
                                {facebookUrl && formValue.facebook !== "" && (
                                  <FormHelperText error>
                                    Please enter valid URL
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <Typography variant="body2" color="primary">
                                Twitter{" "}
                              </Typography>
                              <FormControl fullWidth className={classes.margin}>
                                <TextField
                                  disabled={isLoading1}
                                  variant="outlined"
                                  placeholder="Please enter twitter url"
                                  name="twitter"
                                  value={formValue.twitter}
                                  onChange={(e) => {
                                    if (validtwitter(e.target.value)) {
                                      setTwitterUrl(false);
                                    } else {
                                      setTwitterUrl(true);
                                    }
                                    setFormValue({
                                      ...formValue,
                                      ["twitter"]: e.target.value,
                                    });
                                  }}
                                />
                                {twitterUrl && formValue.twitter !== "" && (
                                  <FormHelperText error>
                                    Please enter valid URL
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <Typography variant="body2" color="primary">
                                Instagram{" "}
                              </Typography>
                              <FormControl fullWidth className={classes.margin}>
                                <TextField
                                  disabled={isLoading1}
                                  variant="outlined"
                                  placeholder="Please enter instagram url"
                                  name="instagram"
                                  value={formValue.instagram}
                                  onChange={(e) => {
                                    if (isValidInstaURL(e.target.value)) {
                                      setInstaGramUrl(false);
                                    } else {
                                      setInstaGramUrl(true);
                                    }
                                    setFormValue({
                                      ...formValue,
                                      ["instagram"]: e.target.value,
                                    });
                                  }}
                                />
                                {instagramUrl && formValue.instagram !== "" && (
                                  <FormHelperText error>
                                    Please enter valid URL
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <Typography variant="body2" color="primary">
                                Telegram{" "}
                              </Typography>
                              <FormControl fullWidth className={classes.margin}>
                                <TextField
                                  disabled={isLoading1}
                                  variant="outlined"
                                  placeholder="Please enter telegram url"
                                  name="telegram"
                                  value={formValue.telegram}
                                  onChange={(e) => {
                                    if (validtelegram(e.target.value)) {
                                      setTelegramUrl(false);
                                    } else {
                                      setTelegramUrl(true);
                                    }
                                    setFormValue({
                                      ...formValue,
                                      ["telegram"]: e.target.value,
                                    });
                                  }}
                                />
                                {telegramUrl && formValue.telegram && (
                                  <FormHelperText error>
                                    Please enter valid URL
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </Box>
                          </Grid>
                        </Grid>

                        <Box mt={3}>
                          <Typography variant="body2" color="primary">
                            Description{" "}
                            <span style={{ color: "#f44336" }}>*</span>
                          </Typography>
                          <FormControl fullWidth className={classes.margin}>
                            <TextField
                              disabled={isLoading1}
                              variant="outlined"
                              placeholder="Please enter description"
                              name="description"
                              multiline
                              rows={6}
                              inputProps={{ maxLength: 601 }}
                              value={formValue.description}
                              onChange={(e) => _onInputChange(e)}
                              error={
                                (isSubmit && formValue.description === "") ||
                                formValue.symbol.length > 600
                              }
                              helperText={
                                isSubmit &&
                                formValue.description === "" &&
                                "Please enter description"
                              }
                            />
                            {/* {console.log(
                              " ----- formValue.description.length  ----",
                              formValue.description.length
                            )} */}
                            {formValue.description.length > 600 && (
                              <FormHelperText error>
                                Description should not exceed 600 characters
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Box>

                        <Box mt={3}>
                          <FormControlLabel
                            className={classes.checkBoxtheme}
                            control={
                              <Checkbox
                                // onChange={handleChange}
                                style={{ color: "#35a5f5" }}
                                name="checkedB"
                                color="primary"
                                checked={isPromoted}
                                onChange={(e) => {
                                  setisPromoted(e.target.checked);
                                  setcheck(false);
                                }}
                              />
                            }
                            label={`Promote this collection in hot section for  ${
                              hotdata ? hotdata : "0.001"
                            } Metamart `}
                          />
                        </Box>
                      </Box>
                      <Box mt={3} mb={4} textAlign="Center">
                        <Button
                          variant="contained"
                          size="large"
                          onClick={handleSubmit}
                          color="primary"
                          disabled={isLoading1}
                        >
                          Create Collection{" "}
                          {isLoading1 && <ButtonCircularProgress />}
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </DialogContent>
              </Dialog>
              <Dialog
                open={share}
                onClose={() => setShare(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="xs"
                fullWidth
              >
                <DialogActions>
                  <IconButton
                    onClick={() => setShare(false)}
                    className={classes.customizedButton}
                  >
                    <MdCancel />
                  </IconButton>
                </DialogActions>
                <DialogContent>
                  <Box>
                    <Typography variant="body2">
                      You have successfully Minted your NFT, Share now on
                    </Typography>
                  </Box>
                  <Box
                    className={classes.sharemodal}
                    mb={2}
                    align="center"
                    mt={3}
                  >
                    <Button>
                      <Box>
                        <FaFacebookF style={{ fontSize: "30px" }} /> <br />
                        Facebook
                      </Box>
                    </Button>
                    <Button>
                      <Box>
                        <MdEmail style={{ fontSize: "30px" }} /> <br />
                        E-mail
                      </Box>
                    </Button>
                    <Button>
                      <Box>
                        <FaTelegramPlane style={{ fontSize: "30px" }} /> <br />
                        Teligram
                      </Box>
                    </Button>
                    <Button>
                      <Box>
                        {" "}
                        <FaTwitter style={{ fontSize: "30px" }} /> <br />
                        Twitter
                      </Box>
                    </Button>
                  </Box>
                </DialogContent>
              </Dialog>
            </Box>
          </Paper>
        </Container>
      </Box>

      <KycNotCompletedModal
        handleOpen={handleOpenKyc}
        handleclose={handlecloseKyc}
        data={
          user?.userData?.approveStatus == "PENDING"
            ? `Your KYC request is under review!`
            : user?.userData?.approveStatus == "REJECTED"
            ? `Your KYC request has been rejected.`
            : "Please Submit KYC Request first!"
        }
        reason={
          user?.userData?.approveStatus == "REJECTED" &&
          `${oldKYCData?.reason ? oldKYCData?.reason : ""}`
        }
        btnName={
          user?.userData?.approveStatus == "PENDING"
            ? ""
            : user?.userData?.approveStatus == "REJECTED"
            ? "Re-Submit KYC"
            : "Submit KYC"
        }
        RouteURL={() => history.push("/kyc")}
      />
    </>
  );
}
