import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  IconButton,
  FormControl,
  TextField,
  FormHelperText,
  Hidden,
} from "@material-ui/core";
import { getContract, numberCompactFormat } from "src/utils";
import { marketplaceContract } from "src/constants";
import MarketplaceABI from "src/constants/ABI/MarketplaceABI.json";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useContext, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Checkbox from "@material-ui/core/Checkbox";
import CloseIcon from "@material-ui/icons/Close";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import Apiconfig from "src/ApiConfig/ApiConfig";
import { useHistory, useLocation } from "react-router-dom";
import DataNotFound from "src/component/DataNotFound";
import { UserContext } from "src/context/User";
import axios from "axios";
import { toast } from "react-toastify";
import All from "./All";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import ReportIcon from "@material-ui/icons/Report";
import CollectionReport from "./CollectionReport";
import moment from "moment";
import { FaFacebook, FaTwitter, FaTelegram, FaInstagram } from "react-icons/fa";
import useDebounce from "src/CutomHooks/Debounce";

const useStyles = makeStyles((theme) => ({
  root: { padding: "20px 0px" },
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
    "& h2": {
      whiteSpace: "pre",
      textOverflow: "ellipsis",
      width: "100%",
      maxWidth: "550px",
      overflow: "hidden",
    },
    marginLeft: "16px",

    // "& .descriptionS": {
    "& p": {
      wordBreak: "break-word",
      whiteSpace: "pre-wrap",
    },
    "& span": {
      cursor: "pointer",
      // color: "#f7227c",
      background:
        "hsl(230.54deg 95.03% 63.21%)",
      backgroundClip: "text",
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent",
      padding: "0px 4px 0px 0px",
    },
    // },
    "@media(max-width:375px)": {
      marginTop: "5px",
      marginLeft: "0px",
    },
    // "& p": {
    //   wordBreak: "break-all",
    // },

    "& h5": {
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#000",
    },
  },
  file: {
    padding: "10px 10px 10px 10px",
    // background: "#FCF2FA",
    borderRadius: "50%",
  },
  headbox2: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    marginBottom: "15px",
    "@media(max-width:767px)": {
      display: "block",
      padding: "0 10px",
    },
    "& .figuredisplay": {
      display: "flex",
      // flexWrap:"wrap",
      [theme.breakpoints.down("sm")]: {
        display: "block",
      },
    },
    "& p,h2": {
      marginTop: "8px",
    },
  },

  profileimg: {
    marginTop: "-104px",
    marginRight: "10px",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "100% !important",
    backgroundRepeat: " no-repeat !important",
    width: "175px",
    height: "175px",
    borderRadius: "50%",
    position: "relative",
    border: "7px solid",
    borderColor: theme.palette.background.profileBtn,
    backgroundColor: "#b6b6b6 !important",
    "@media(max-width:1010px)": {
      marginTop: "-65px",
      width: "110px",
      height: "110px",
      marginLeft: "20px",
    },
    "@media(max-width:800px)": {
      marginTop: "-65px",
      width: "90px",
      height: "90px",
    },
    "& img": {
      minHeight: "100%",
      minWidth: "100%",
      height: "auto",
      width: "auto",
    },
  },
  customizedButton: {
    position: "absolute",
    top: "0px",
    right: "0px",
    color: "rgb(120, 120, 120)",
  },
  // btnhead: {
  //   display: 'flex',
  //   marginTop: '-130px',
  //   alignItems: 'center',
  //   '@media(max-width:800px)': { marginTop: '20px', marginBottom: '20px' },
  // },
  btnhead: {
    // display: "flex",
    marginTop: "-170px",
    "@media(max-width:800px)": { marginTop: "20px", marginBottom: "20px" },
    // },
    // btnhead: {
    display: "flex",
    marginRight: "40px",
    padding: "7px",
    borderRadius: "10px 10px 0px 0px",
    position: "absolute",
    background: theme.palette.background.profileBtn,
    right: "0",
    bottom: "0",

    [theme.breakpoints.down("xs")]: {
      marginRight: "20px",
    },
  },
  btnfollow: {
    borderRadius: "10px",
    "& Button": { borderRadius: "10px", margin: "0px", whiteSpace: "pre" },
    "& .IconButton": {
      borderRadius: "10px",
    },
  },
  createCollection: {
    "& figure": {
      height: 100,
      width: 100,
      minWidth: 100,
      marginRight: 15,
      borderRadius: "50%",
      background: "#C4C4C4",
      marginLeft: "-2px",
    },
    "& button": {
      marginTop: 15,
    },
  },
  link: {
    color: "#35a5f5",
    justifyContent: "start",
  },
  link1: {
    color: "#ff7d68",
    justifyContent: "start",
  },
  btnfollow2: {
    background: theme.palette.background.blur,
    display: "flex",
    alignItems: "center",
    borderRadius: "10px",

    padding: "6px 16px",
    [theme.breakpoints.down("sm")]: {
      padding: "0px",
    },

    "& h5": {
      marginLeft: "10px",
    },
  },
}));

const ReadMore = ({
  dataList,
  callBack,
  userId,
  updateName,
  setIsSubmit,
  isSubmit,
  setEditable,
  isEditable,
}) => {
  const text = dataList?.description;
  const [isReadMore, setIsReadMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [updateDescription, setUpdateDescription] = useState();

  const openCollectionHandler = async () => {
    if (
      updateDescription !== "" &&
      updateName !== "" &&
      updateName?.length <= "30" &&
      updateDescription.length <= "100000"
    ) {
      try {
        setIsLoading(true);
        const res = await axios({
          method: "PUT",
          url: Apiconfigs.editCollection,
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
          data: {
            _id: dataList?._id,
            description: updateDescription,
            displayName: updateName,
          },
        });
        if (res.data.statusCode === 200) {
          if (callBack) {
            callBack();
          }
          setEditable(false);
          setIsLoading(false);

          toast.success(res.data.responseMessage);
        } else {
          toast.warn(res.data.responseMessage);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    } else {
      setIsSubmit(true);
    }
  };

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  useEffect(() => {
    if (text) {
      setUpdateDescription(text ? text : "");
    }
  }, [text]);

  return (
    <>
      {!isEditable && (
        <Typography
          variant="body2"
          color="primary"
          style={{ wordBreak: "break-word" }}
        >
          {isReadMore ? text?.slice(0, 200) : text}
          <span
            onClick={toggleReadMore}
            style={{ color: "#ff2676", cursor: "pointer", paddingLeft: "3px" }}
          >
            {text?.length >= 200 && (
              <>{isReadMore ? "... See more" : " See less"}</>
            )}
          </span>
          {userId === dataList?.userId && (
            <Button onClick={() => setEditable(true)}>Edit</Button>
          )}
        </Typography>
      )}
      {isEditable && (
        <>
          <TextField
            onChange={(e) => setUpdateDescription(e.target.value)}
            value={updateDescription}
            fullWidth
            multiline={true}
            variant="outlined"
            rows="4"
            disabled={isLoading}
          />
          {isSubmit && updateDescription === "" && (
            <FormHelperText error> Please enter description</FormHelperText>
          )}
          {isSubmit && updateDescription.length > "100000" && (
            <FormHelperText error>
              {" "}
              Descrption must be less than or equal to 100000
            </FormHelperText>
          )}
          <Button disabled={isLoading} onClick={() => openCollectionHandler()}>
            Update {isLoading && <ButtonCircularProgress />}
          </Button>
          <Button disabled={isLoading} onClick={() => setEditable(false)}>
            Cancel
          </Button>
        </>
      )}
    </>
  );
};

export default function Profile(props) {
  const collectionData = props?.location?.state?.data;
  const [updateName, setUpdateName] = useState();
  const { account, library } = useWeb3React();
  // const { data } = props;
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const user = useContext(UserContext);
  const [particularorderlist, setparticularorderlist] = useState([]);
  const [hotdata, setHotdata] = useState([]);
  const [isEditable, setEditable] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const userId = user?.userData?._id;
  const [dataList, setDataList] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [idd, setIdd] = useState();
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const [search, setSearch] = useState("");
  const valuedeb = useDebounce(search, 2000);

  const [open, setOpen] = React.useState(false);
  const [imgFileBase, setImgFileBase] = useState(
    collectionData?.collectionImage
  );
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [symbol, setSymbol] = useState("");
  const [isPromoted, setisPromoted] = useState(true);
  const [openReport, setOpenReport] = useState(false);
  const [reportId, setReportId] = useState("");
  const [collectionDataPoint, setCollectionData] = useState();

  const [check, setcheck] = useState(false);
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

  const getparticularorderlist = async (id, searchs) => {
    try {
      const res = await axios.get(Apiconfig.particularCollectionOrderList, {
        params: {
          _id: id,
          search: searchs,
        },
      });
      if (res.data.statusCode === 200) {
        setparticularorderlist(res.data.result);

        setisLoading(false);
      } else {
        setparticularorderlist();

        setisLoading(false);
      }
    } catch (error) {
      setparticularorderlist();

      setisLoading(false);
    }
  };
  const viewCollectionHandler = async (id) => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfig.viewCollection + id,
      });
      if (res.data.statusCode === 200) {
        setDataList(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (location.search.substring(1, location.search.length)) {
      const id = location.search.substring(1, location.search.length);
      if (id) {
        viewCollectionHandler(id);
        getparticularorderlist(id, "");
        setIdd(id);
        getColDataHandler(id);
      }
    }
  }, [location.search]);
  useEffect(() => {
    if (idd) {
      getparticularorderlist(idd, search);
    }
  }, [valuedeb]);
  const updateDatahandler = () => {
    if (idd) {
      getparticularorderlist(idd, "");
    }
  };

  useEffect(() => {
    setparticularorderlist([]);
  }, []);
  const collectiondata = props?.location?.state?.collectionId?.data;

  const getHotcollectionData = async () => {
    const res = await axios({
      method: "GET",
      url: Apiconfig.getCollectionFee,
    }).then(async (res) => {
      if (res.data.statusCode === 200) {
        setHotdata(res.data.result[0]?.collectionFee);
      }
    });
  };

  useEffect(() => {
    getHotcollectionData();
  }, []);

  const handleSubmit = async () => {
    if (!isPromoted) {
      setcheck(true);
      return;
    }

    try {
      setIsUpdatingData(true);

      const contract = getContract(
        marketplaceContract,
        MarketplaceABI,
        library,
        account
      );

      // *********************** Owner

      const AdminOwner = await contract.owner();
      await AdminOwner;

      const res = await axios({
        method: "PUT",
        url: Apiconfig.editCollection,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          _id: idd,
          contractAddress: dataList?.contractAddress,
          collectionImage: imgFileBase ? imgFileBase : comment.collectionImage,
          displayName: category,
          isPromoted,
        },
      });
      if (res.data.statusCode === 200) {
        history.push("/my-collections");
        setIsUpdatingData(false);
        setOpen(false);
        toast.success(res.data.responseMessage);
      }
    } catch (error) {
      console.log(error);
      setIsUpdatingData(false);
    }
  };
  const [comment, setComment] = React.useState([]);
  const OpenModal = (comment) => {
    setComment(comment);
    console.log("comment", comment);
    setCategory(comment.displayName);
    setDescription(comment.description);
    setSymbol(comment.symbol);

    setOpen(true);
  };

  const getColDataHandler = async (id) => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfig.getColData + id,
      });
      if (res) {
        setCollectionData(res.data.result);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (dataList?.displayName) {
      setUpdateName(dataList?.displayName ? dataList?.displayName : "");
    }
  }, [dataList?.displayName]);

  return (
    <Box className={classes.root}>
      <Container maxWidth="lg">
        <Box
          className={classes.bannerimg}
          style={
            collectionData?.bannerImage
              ? { background: "url(" + collectionData?.bannerImage + ")" }
              : {
                  background: "url(" + "/images/market_detail.png" + ")",
                } && dataList?.bannerImage
              ? {
                  background: "url(" + dataList?.bannerImage + ")",
                }
              : { background: "url(/images/market_detail.png)" }
          }
        >
          {dataList &&
            userId &&
            dataList?.userId === userId &&
            dataList.collectionType === "REGULAR" &&
            dataList.displayName !== "HovR Hooligans" &&
            !dataList?.isPromoted && (
              <>
                {" "}
                <Box className={classes.btnhead}>
                  <Box className={classes.btnfollow2}>
                    <Button
                      // variant="outlined"
                      // // size="large"
                      // color="primary"
                      onClick={() => OpenModal(dataList)}
                      // onClick={() => followUnfollowHandler(userId)}
                    >
                      Promote or Edit
                    </Button>
                  </Box>
                </Box>
              </>
            )}
          {account &&
            user &&
            user.ownerAccount === account &&
            dataList.collectionType === "DEFAULT" &&
            dataList.displayName === "HovR Hooligans" && (
              <Box className={classes.btnhead}>
                <Box className={classes.btnfollow}>
                  <Button
                    variant="outlined"
                    // size="large"
                    color="primary"
                    onClick={() => OpenModal(dataList)}
                    // onClick={() => followUnfollowHandler(userId)}
                  >
                    Promote or Edit
                  </Button>
                </Box>
              </Box>
            )}
        </Box>
        <Box className={classes.headbox2}>
          <Box className="figuredisplay" width="100%">
            <Box>
              <figure
                style={
                  collectionData?.collectionImage
                    ? {
                        background:
                          "url(" + collectionData?.collectionImage + ")",
                      }
                    : {
                        background: "url(" + "/images/Profile.png" + ")",
                      } && dataList?.collectionImage
                    ? {
                        background: "url(" + dataList?.collectionImage + ")",
                      }
                    : { background: "url(" + "/images/Profile.png" + ")" }
                }
                className={classes.profileimg}
              ></figure>
            </Box>

            <Box
              className={classes.text1}
              width="100%"
              display="flex"
              alignItems="center"
            >
              <Box width="100%">
                {isEditable ? (
                  <>
                    <Box mt={1}>
                      <TextField
                        onChange={(e) => setUpdateName(e.target.value)}
                        value={updateName}
                        fullWidth
                        variant="outlined"
                      />
                      {isSubmit && updateName === "" && (
                        <FormHelperText error>
                          {" "}
                          Please enter catery name
                        </FormHelperText>
                      )}
                      {isSubmit && updateName.length > "30" && (
                        <FormHelperText error>
                          {" "}
                          Category name must be less than or equal to 30
                          characters
                        </FormHelperText>
                      )}
                    </Box>
                  </>
                ) : (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="h2" color="primary">
                      {collectionData?.displayName
                        ? dataList?.displayName
                        : dataList?.displayName}
                    </Typography>
                    <Hidden smDown>
                      <SocialLinks
                        setReportId={(item) => setReportId(item)}
                        dataList={dataList}
                        userId={userId}
                        setOpenReport={(item) => setOpenReport(item)}
                      />
                    </Hidden>
                    <Hidden mdUp>
                      <Box
                        style={{
                          position: "absolute",
                          top: "20px",
                          right: "10px",
                        }}
                      >
                        <SocialLinks
                          setReportId={(item) => setReportId(item)}
                          dataList={dataList}
                          userId={userId}
                          setOpenReport={(item) => setOpenReport(item)}
                        />
                      </Box>
                    </Hidden>
                  </Box>
                )}

                <Box display="flex" alignItems="center" flexWrap="wrap">
                  <CollectionInfo
                    name="Items"
                    items={collectionDataPoint?.items}
                  />
                  <span>. </span>

                  <CollectionInfo
                    name="Created On"
                    items={moment(dataList?.createdAt).format("lll")}
                  />
                  <span>. </span>
                  <CollectionInfo name="Earnings" items={"0%"} />
                  <span>. </span>
                  <CollectionInfo name="Chain" items="MetaMart" />
                  <span>. </span>
                  {/*   <CollectionInfo name="Category" items="Art" />*/}
                </Box>

                <Box mt={1}>
                  {collectionData?.displayName && (
                    <ReadMore
                      idd={idd}
                      userId={userId}
                      updateName={updateName}
                      dataList={collectionData?.displayName && dataList}
                      callBack={() => viewCollectionHandler(idd)}
                      setIsSubmit={(item) => setIsSubmit(item)}
                      setEditable={(item) => setEditable(item)}
                      isSubmit={isSubmit}
                      isEditable={isEditable}
                    />
                  )}
                  <Box display="flex" mt={1} flexWrap="wrap">
                    <CollectionDetails
                      name="Floor Price"
                      earning={
                        collectionDataPoint?.floorPrice
                          ? numberCompactFormat(collectionDataPoint?.floorPrice)
                          : "0"
                      }
                    />
                    <CollectionDetails
                      name="Total Volume"
                      earning={
                        collectionDataPoint?.total_volume
                          ? numberCompactFormat(
                              collectionDataPoint?.total_volume
                            )
                          : "0"
                      }
                    />
                    <CollectionDetails
                      name="Owners"
                      earning={
                        collectionDataPoint?.owners
                          ? numberCompactFormat(collectionDataPoint?.owners)
                          : "0"
                      }
                    />
                    <CollectionDetails
                      name="Unique owners"
                      earning={`${
                        collectionDataPoint?.uniqueOwnerPercentage
                          ? numberCompactFormat(
                              collectionDataPoint?.uniqueOwnerPercentage
                            )
                          : "0"
                      } %`}
                    />
                    <CollectionDetails
                      name="Total Royalty"
                      earning={`${
                        collectionDataPoint?.totalRoyality
                          ? numberCompactFormat(
                              collectionDataPoint?.totalRoyality
                            )
                          : "0"
                      } Metamart`}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item md={12} sm={12} xs={12} lg={12}>
            <Box>
              {isLoading ? (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                  btnfollow2
                >
                  <ButtonCircularProgress />
                </Box>
              ) : (
                <Box>
                  {/* <Box className="displayEnd" mt={2}>
                    <TextField
                      variant="outlined"
                      placeholder="Search by name"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    &nbsp;
                    <Button
                      style={{ borderRadius: "5px", padding: "12px 35px" }}
                      variant="contained"
                      color="primary"
                      onClick={() => setSearch()}
                    >
                      Reset
                    </Button>
                  </Box> */}

                  <All
                    particularorderlist={particularorderlist}
                    callbackFun={() => updateDatahandler()}
                  />
                </Box>
              )}
              {!isLoading && !particularorderlist && <DataNotFound />}
            </Box>
          </Grid>
        </Grid>
      </Container>

      {openReport && (
        <CollectionReport
          openReport={openReport}
          setOpenReport={(item) => setOpenReport(item)}
          reportId={reportId}
        />
      )}

      <Dialog
        open={open}
        className={classes.createbox}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.paper }}
      >
        <DialogActions>
          <IconButton
            onClick={() => setOpen(false)}
            className={classes.customizedButton}
          >
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <DialogContent className={classes.dialogBox}>
          <Box className={classes.NftBreed}>
            <Box>
              <Typography
                variant="h3"
                align="center"
                color="primary"
                style={{ padding: "16px 0px" }}
              >
                Promote Collection
              </Typography>

              <Box
                className={classes.createCollection}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <img
                    src={imgFileBase}
                    alt=""
                    width="100"
                    height="100"
                    style={{ borderRadius: "50%" }}
                  />
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
                      fontSize: "15px",
                      fontWeight: "600px",
                    }}
                    color="primary"
                  >
                    Select Image (Optional)
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
                        getBase64(e.target.files[0], (result) => {
                          setImgFileBase(result);
                        });
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
                  </Box>
                </Box>
              </Box>
              <Box mt={2} className={classes.textfiledlabel}>
                <Box mt={2}>
                  <Typography variant="body2" color="primary">
                    Collection Name (Optional)
                  </Typography>
                  <FormControl fullWidth className={classes.margin}>
                    <TextField
                      disabled={isUpdatingData}
                      variant="outlined"
                      placeholder="Please enter collection name"
                      name="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box mt={3}>
                  <Typography variant="body2" color="primary">
                    Symbol
                  </Typography>
                  <FormControl fullWidth className={classes.margin}>
                    <TextField
                      disabled
                      variant="outlined"
                      placeholder={"Please enter symbol"}
                      name="symbol"
                      value={symbol}
                      onChange={(e) => setSymbol(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box mt={3}>
                  <Typography variant="body2" color="primary">
                    Description (Optional)
                  </Typography>

                  <TextField
                    disabled={isUpdatingData}
                    variant="outlined"
                    fullWidth
                    placeholder="Please enter description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Box>

                <Box mt={3}>
                  <Typography color="primary">
                    {check ? (
                      <Checkbox
                        inputProps={{
                          "aria-label": "secondary checkbox",
                        }}
                        className={classes.link1}
                        name="checked"
                        color="green"
                        checked={isPromoted}
                        onChange={(e) => {
                          setisPromoted(e.target.checked);
                          setcheck(false);
                        }}
                        label="Check me"
                      />
                    ) : (
                      <Checkbox
                        className={classes.link}
                        inputProps={{
                          "aria-label": "secondary checkbox",
                        }}
                        name="checked"
                        color="green"
                        checked={isPromoted}
                        onChange={(e) => {
                          setisPromoted(e.target.checked);
                        }}
                        label="Check me"
                      />
                    )}
                    Promote this collection for {hotdata ? hotdata : "0.001"}{" "}
                    Metamart
                  </Typography>
                </Box>
              </Box>
              <Box mt={3} mb={4} textAlign="Center">
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                  color="primary"
                  disabled={isUpdatingData}
                >
                  Promote {isUpdatingData && <ButtonCircularProgress />}
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

const CollectionDetails = ({ name, earning }) => {
  return (
    <Box style={{ minWidth: "112px" }}>
      <Box style={{ padding: "0px 35px 0px 0px", marginTop: "10px" }}>
        <Typography
          style={{ lineHeight: "18px", color: "#9e9b9c" }}
          variant="h6"
        >
          {name}
        </Typography>
        <Typography
          style={{ fontSize: "14px", lineHeight: "20px" }}
          variant="h6"
          color="primary"
        >
          {earning}
        </Typography>
      </Box>
    </Box>
  );
};

const CollectionInfo = ({ name, items }) => {
  return (
    <Box style={{ padding: "0px 5px 0px 0px" }}>
      <Typography color="primary">
        <span style={{ color: "#9e9b9c" }}> {name}</span> {items}
      </Typography>
    </Box>
  );
};

const SocialLinks = ({ dataList, userId, setOpenReport, setReportId }) => {
  return (
    <Box display="flex">
      {dataList?.facebookUrl && (
        <IconButton onClick={() => window.open(dataList?.facebookUrl)}>
          <FaFacebook />
        </IconButton>
      )}
      {dataList?.twitterUrl && (
        <IconButton onClick={() => window.open(dataList?.twitterUrl)}>
          <FaTwitter />
        </IconButton>
      )}
      {dataList?.instagram && (
        <IconButton onClick={() => window.open(dataList?.instagram)}>
          <FaInstagram />
        </IconButton>
      )}
      {dataList?.telegram && (
        <IconButton onClick={() => window.open(dataList?.telegram)}>
          <FaTelegram />
        </IconButton>
      )}
      {userId !== dataList?.userId && (
        <IconButton>
          <ReportIcon
            style={{ height: "1.2em", width: "1.2em" }}
            onClick={() => {
              setOpenReport(true);
              setReportId(dataList?._id);
            }}
          />
        </IconButton>
      )}
    </Box>
  );
};
