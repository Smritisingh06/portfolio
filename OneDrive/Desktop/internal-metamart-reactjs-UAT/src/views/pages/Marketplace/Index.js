import React, { useState, useEffect, useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles, Box, Container, Grid } from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import { useWeb3React } from "@web3-react/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataNotFound from "src/component/DataNotFound";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import Apiconfig from "src/ApiConfig/ApiConfig";
import AllItem from "./AllItem";
import Arts from "./Arts";
import Slider from "@material-ui/core/Slider";
import { UserContext } from "src/context/User";
import Explore from "../Explore/Explore";
import useDebounce from "src/CutomHooks/Debounce";
const useStyles = makeStyles((theme) => ({
  tabBtn: {
    "& button": {
      borderRadius: "10px",
      fontWeight: "600",
      fontSize: "14px",
      marginRight: "4px",
      "&.active": {
        color: "#fff",
        boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
        background:
          "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
      },
    },
  },
  marketPlaceBannerBox: {
    padding: "80px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0",
    },
    "& .marketcontainBox": {
      background: theme.palette.background.blur,
      padding: "20px",
      borderRadius: "10px",
      [theme.breakpoints.down("xs")]: {
        padding: "2px",
      },
    },
    "& h2": {
      fontSize: "25px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "16px",
      },
    },
  },
}));

const IOSSlider = withStyles((theme) => ({
  root: {
    color: "hsl(230.54deg 95.03% 63.21%) !important",
    height: 12,
    padding: "15px 0",
  },
  thumb: {
    height: 15,
    width: 15,
    backgroundColor: theme.palette.primary.main,

    marginTop: -5,
    marginLeft: -14,
    "&:focus, &:hover, &$active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
    },
  },

  valueLabel: {
    left: "calc(-50% + 12px)",
    top: -22,
    "& *": {
      background: "transparent",
      color: "#000",
    },
  },
  track: {
    height: 5,
  },
  rail: {
    height: 5,
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
  },
  mark: {
    backgroundColor: "#bfbfbf",
    height: 20,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: "hsl(230.54deg 95.03% 63.21%)",
  },
}))(Slider);

const Accordion = withStyles({
  root: {
    borderRadius: "10px",
    "&:not(:last-child)": {
      background: "#FFFFFF",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      border: " 1px solid #3d3d3d",
      background:
        "linear-gradient( 152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
      // backdropFilter: "blur(42px)",
    },
  },
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    color: "#000",

    "&$expanded": {
      minHeight: 50,
      borderBottom: "0",
      color: "#000",
    },
    "@media(max-width:605px)": {
      fontSize: "10px",
      minHeight: 50,
      "&$expanded": {
        minHeight: 40,
        borderBottom: "0",
        color: "#FFF",
      },
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {
    margin: "0",
  },
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    borderTop: "1px solid #C2DFE8",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    height: "309px",
    padding: "10px",
    overflow: "scroll",
    overflowX: "hidden",

    "& h6": {
      color: "#000",
      paddingBottom: "15px",
    },
    "& p": {
      color: "#000",
    },
  },
}))(MuiAccordionDetails);

const GreenCheckbox = withStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    "&$checked": {
      color: "hsl(230.54deg 95.03% 63.21%)  !important",
    },
  },
  checked: {},
}))((props) => <Checkbox color="default" {...props} />);
const listType = [
  {
    TypeTitle: "PHYSICAL",
  },
];
export default function FaqData({ data, index }) {
  const { account } = useWeb3React();
  const [expanded, setExpanded] = React.useState("panel1");
  const user = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [listCategory, setlistCategory] = useState();
  const [selectedCategoryNames, setSelectedCategoryNames] = useState([]);
  const [selectedTypeNames, setSelectedTypeNames] = useState([]);
  const [selectedCollectionIds, setSelectedCollectionIds] = useState([]);
  const [collectionList, setCollectionList] = useState([]);
  const [maxPrice, setMaxPrice] = useState([0.00001, 100]);
  const [orderList, setOrderList] = useState([]);
  const [statee, setStatee] = useState([]);
  const [isall, setAll] = useState(false);
  const [isLikeLoad, setLikeLoad] = useState(false);
  const handleChange = (index) => (event, newExpanded) => {
    setExpanded(newExpanded ? index : false);
  };

  const [tabview, setTabView] = useState("allitem");
  const classes = useStyles();
  const updateDatahandler = () => {
    if (user?.userData?._id) {
      const id = user?.userData._id;
      getOrderList(id);
    }
  };

  const loadingFun = () => {
    if (maxPrice > 0) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadingFun();
  }, [maxPrice > 0]);

  const valuedeb = useDebounce(maxPrice, 2000);

  const getOrderList = async (cancelTokenSource) => {
    if (!isLikeLoad) {
      // setIsLoading(true);
    }
    try {
      const res = await axios.post(
        Apiconfig.allListOrder,
        {
          limit: 12,
          page: page,
          max: maxPrice[1] ? maxPrice[1] : undefined,
          min: maxPrice[0] ? maxPrice[0] : undefined,
          // min: 0,

          // max: maxPrice > 0 ? maxPrice : null,
          collection:
            selectedCollectionIds.length > 0 ? selectedCollectionIds : null,
          itemCategory:
            selectedCategoryNames.length > 0 ? selectedCategoryNames : null,
          nftType: selectedTypeNames.length > 0 ? selectedTypeNames : null,
        },
        {
          cancelToken: cancelTokenSource && cancelTokenSource.token,
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      if (res.data.statusCode === 200) {
        setLikeLoad(false);
        setNoOfPages(res.data.result.pages);
        setOrderList(res.data.result.docs);
        // setWalletAddress(res.data.result.docs)
        setIsLoading(false);
      } else {
        setOrderList([]);
      }
      setIsLoading(false);
      setLikeLoad(false);
    } catch (error) {
      setLikeLoad(false);
      setIsLoading(false);
      console.error("ERROR", error);
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    setIsLoading(true);
    getOrderList(cancelTokenSource);

    return () => {
      cancelTokenSource.cancel();
    };
  }, [
    selectedCollectionIds,
    selectedTypeNames,
    statee,
    selectedCategoryNames,
    page,
    valuedeb,
    account,
  ]);

  const listCategoryapi = async (page) => {
    try {
      const res = await axios({
        method: "Get",
        url: Apiconfig.listCategory,
        parms: {
          search: "",
        },
      });
      if (res.data.statusCode == 200) {
        if (res.data.result.docs) {
          setlistCategory(res.data.result.docs);
        }
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const getcollectionListHandler = async () => {
    try {
      const res = await axios.get(Apiconfig.collectionList, {
        params: {
          limit: 50,
        },
      });
      if (res.data.statusCode === 200) {
        let resultData = res.data.result.docs.filter((data)=> data.contractAddress != "0x17928648c055b9c76eC83A391CDf0B431127D4A5") 
        if (resultData) {
          setCollectionList(resultData);

          const filterDataa = resultData?.map((item) => {
            return item?._id;
          });
          setStatee(filterDataa);
        }
      }
    } catch (error) {
      console.log("ERRROR", error.message);
    }
  };

  useEffect(() => {
    listCategoryapi();
    getcollectionListHandler();
  }, []);

  const updateCategoryListHanler = (name) => {
    let catList = selectedCategoryNames;

    const status = catList.includes(name);
    if (status) {
      const index = catList.indexOf(name);
      if (index > -1) {
        setSelectedCategoryNames(
          selectedCategoryNames.filter((data) => data !== name)
        );
      }
    } else {
      setSelectedCategoryNames([...catList, name]);
    }
  };
  const updateTypeListHanler = (name) => {
    let catList = selectedTypeNames;

    const status = catList.includes(name);
    if (status) {
      const index = catList.indexOf(name);
      if (index > -1) {
        setSelectedTypeNames(selectedTypeNames.filter((data) => data !== name));
      }
    } else {
      setSelectedTypeNames([...catList, name]);
    }
  };

  const updateCollectionListHanlder = (id) => {
    let colList = selectedCollectionIds;
    const status = colList.includes(id);
    if (status) {
      const index = colList.indexOf(id);
      if (index > -1) {
        setSelectedCollectionIds(
          selectedCollectionIds.filter((data) => data !== id)
        );
      }
    } else {
      setSelectedCollectionIds([...selectedCollectionIds, id]);
    }
  };

  return (
    <div>
      <Box className={classes.marketPlaceBannerBox}>
        <Container>
          <Grid container spacing={2} className="marketcontainBox">
            <Grid item xs={12} sm={3} md={3}>
              <Typography variant="h2" color="primary">
                Marketplace
              </Typography>
              <Typography
                style={{ paddingTop: "58px" }}
                variant="body2"
                color="primary"
              >
                Price
              </Typography>
              <Box style={{ paddingLeft: "13px", paddingRight: "9px" }}>
                <IOSSlider
                  aria-labelledby="range-slider"
                  onChange={(e, v) => setMaxPrice(v)}
                  step={0.00001}
                  min={0.000001}
                  max={1000}
                  value={maxPrice}
                />
              </Box>
              <Typography
                style={{ paddingBottom: "5px", marginTop: "-11px" }}
                variant="body2"
                color="primary"
              >
                {maxPrice[0]} to {maxPrice[1]}
              </Typography>
              {/* category */}
              <Box style={{ paddingTop: "50px" }}>
                <Accordion
                  square
                  defaultExpanded={index == 0 ? true : false}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    expandIcon={
                      <ExpandMoreIcon
                        style={{
                          fontSize: "23px",
                          fontWeight: "400",
                          color: "primary",
                        }}
                      />
                    }
                  >
                    <Typography variant="body2" color="primary">
                      Category
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    {listCategory?.map((data, i) => {
                      return (
                        <FormControlLabel
                          className="checkBox"
                          control={
                            <GreenCheckbox
                              name={data.categoryTitle}
                              onClick={() =>
                                updateCategoryListHanler(data.categoryTitle)
                              }
                            />
                          }
                          label={data.categoryTitle}
                        />
                      );
                    })}
                  </AccordionDetails>
                </Accordion>
              </Box>
              {/* Collection */}
              <Box mt={1}>
                <Accordion
                  square
                  defaultExpanded={index == 0 ? true : false}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    expandIcon={
                      <ExpandMoreIcon
                        style={{
                          fontSize: "23px",
                          fontWeight: "400",
                          color: "primary",
                        }}
                      />
                    }
                  >
                    <Typography variant="body2" color="primary">
                      Collection
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    {collectionList?.map((data, i) => {
                      if (data && data._id && data.displayName) {
                        return (
                          <FormControlLabel
                            className="checkBox"
                            control={
                              <GreenCheckbox
                                defaultChecked={isall}
                                name={data._id}
                                onClick={() =>
                                  updateCollectionListHanlder(data._id)
                                }
                              />
                            }
                            label={data.displayName}
                          />
                        );
                      } else {
                        return null;
                      }
                    })}
                  </AccordionDetails>
                </Accordion>
              </Box>
              {/* Nfttype */}
              {/* <Box mt={1}>
                  <Accordion
                    square
                    defaultExpanded={index == 0 ? true : false}
                    onChange={handleChange("panel1")}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      expandIcon={
                        <ExpandMoreIcon
                          style={{
                            fontSize: "23px",
                            fontWeight: "400",
                            color: "primary",
                          }}
                        />
                      }
                    >
                      <Typography variant="body2" color="primary">
                        NFT Type
                      </Typography>
                    </AccordionSummary>

                    <AccordionDetails
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      {listType?.map((data, i) => {
                        return (
                          <FormControlLabel
                            className="checkBox"
                            control={
                              <GreenCheckbox
                                name={data.TypeTitle}
                                onClick={() =>
                                  updateTypeListHanler(data.TypeTitle)
                                }
                              />
                            }
                            label={data.TypeTitle}
                          />
                        );
                      })}
                    </AccordionDetails>
                  </Accordion>
                </Box> */}
            </Grid>

            <Grid item xs={12} sm={9} md={9}>
              <Box>
                <Explore />
              </Box>
              {isLoading ? (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <ButtonCircularProgress />
                </Box>
              ) : (
                <>
                  <Grid container spacing={0}>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      sm={12}
                      lg={12}
                      className={classes.orer}
                    >
                      {tabview === "allitem" ? (
                        <AllItem
                          nftList={orderList}
                          callbackFun={() => updateDatahandler()}
                          setLikeLoad={(data) => setLikeLoad(data)}
                        />
                      ) : (
                        ""
                      )}

                      {tabview === "arts" ? <Arts /> : ""}
                    </Grid>
                  </Grid>
                  {!isLoading && orderList.length === 0 && <DataNotFound />}
                </>
              )}
              {orderList.length != 0 ? (
                <Box
                  className={classes.tabBtn}
                  pt={5}
                  display="flex"
                  justifyContent="center"
                >
                  <Pagination
                    count={noOfPages}
                    page={page}
                    onChange={(e, v) => setPage(v)}
                  />
                </Box>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
