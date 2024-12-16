import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import axios from "axios";
import { Link } from "react-router-dom";
import Apiconfig from "src/ApiConfig/ApiConfig";
import DataNotFound from "src/component/DataNotFound";
import ExploreCard from "src/component/ExploreCard";
import Select from "react-select";
const useStyles = makeStyles((theme) => ({
  MainExploreContainer: {
    "& .css-13cymwt-control": {
      background: "transparent !important",
      borderRadius: "10px !important",
      borderStyle: "unset",
    },
    "& .css-1xc3v61-indicatorContainer": {
      display: "none",
      padding: "0px",
      [theme.breakpoints.down("xs")]: {
        padding: "0px",
      },
    },
    "& .css-t3ipsp-control": {
      background: "transparent !important",
      borderWidth: "0px !important",
      boxShadow: "none",
    },
    "& .css-t3ipsp-control:hover": {
      borderColor: "transparent !important",
      borderWidth: "0px !important",
      boxShadow: "none",
    },
    "& .css-1dimb5e-singleValue": {
      color: "#fffrgb(158, 155, 156)",
      [theme.breakpoints.down("xs")]: {
        fontSize: "10px",
      },
    },
    "& .css-tj5bde-Svg": {
      display: "none",
    },
    "& .css-1jqq78o-placeholder": {
      whiteSpace: "pre",
      // color: "#FFFBFB",
      fontSize: "16px",
      letterSpacing: "0.2px",
      fontWeight: "400",
      textAlign: "center",
      fontFamily: "Sora",
      fontStyle: "normal",
      lineHeight: "normal",

      [theme.breakpoints.down("xs")]: {
        fontSize: "11px",
      },
    },
    "& .leftcontent": {
      display: "flex",
      alignItems: "center",

      "& h3": {
        marginLeft: "15px",
        fontSize: "30px",
        fontWeight: "bold",
        [theme.breakpoints.down("xs")]: {
          fontSize: "20px",
        },
      },
    },
  },
  parentSelect: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      display: "flex",
      justifyContent: "start",
      align: "left",
    },
  },
  slectorBox: {
    display: "flex",
    alignItems: "center",
    border: "1px solid rgba(255, 251, 251, 0.10)",
    borderRadius: "12px",
    padding: "0px 7px",
    justifyContent: "center",
    maxWidth: "250px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "250px",
    },
  },
  classBox: {
    textAlign: "left",
    "& .IndicatorsContainer": { display: "none" },
    "& .indicatorContainer": { display: "none" },
    "& .react-select__indicator-separator": {
      display: "none",
    },
  },
  sectionTitleHead: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
}));

function Explore(props) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [allNftList, setAllNftList] = useState([]);
  const [listCategory, setlistCategory] = useState();
  const [collectionList, setCollectionList] = useState([]);

  const dataList =
    listCategory &&
    listCategory?.map((item) => {
      return { value: item?.categoryTitle, label: item?.categoryTitle };
    });
  const dataListCategory =
    collectionList &&
    collectionList?.map((item) => {
      return { value: item?._id, label: item?.displayName };
    });

  const allNftListHandler = async (cancelTokenSource) => {
    try {
      const res = await axios.post(
        Apiconfig.allListOrder,
        {
          limit: 4,
          collection: selectedOptionId ? [selectedOptionId.value] : null,
          itemCategory: selectedOption?.label ? [selectedOption?.label] : null,
        },
        {
          cancelToken: cancelTokenSource && cancelTokenSource.token,
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      if (res.data.statusCode === 200) {
        const filerdata = res.data.result.docs.filter((data) => {
          return data?.nftId?.nftType === "NORMAL";
        });
        setAllNftList(filerdata);
      } else {
        setAllNftList([]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setAllNftList([]);
      console.log("ERRORRRR", error);
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    allNftListHandler(cancelTokenSource);
    return () => {
      cancelTokenSource.cancel();
    };
  }, [selectedOption?.label, selectedOptionId]);

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
        if (res.data.result.docs) {
          setCollectionList(
            res.data.result.docs.filter(
              (data) =>
                data.contractAddress !=
                "0x17928648c055b9c76eC83A391CDf0B431127D4A5"
            )
          );
        }
      }
    } catch (error) {
      console.log("ERRROR", error.message);
    }
  };

  const getUpdatedCollectionListHandler = async (searchKey) => {
    try {
      setCollectionList([]);
      const response = await axios({
        method: "POST",
        url: Apiconfig.orderCollectionListByCategory,
        data: {
          itemCategory: searchKey,
        },
      });
      if (response) {
        setCollectionList(response.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("selectedCategoryNames", selectedCategoryNames);
  useEffect(() => {
    if (selectedOption?.label !== undefined) {
      getUpdatedCollectionListHandler(selectedOption?.label);
    } else {
      getcollectionListHandler();
    }
  }, [selectedOption?.label]);

  useEffect(() => {
    listCategoryapi();
    // getcollectionListHandler();
  }, []);

  return (
    <>
      <Box className={classes.MainExploreContainer}>
        <Container maxWidth="lg">
          <Box style={{ paddingLeft: "5px", paddingRight: "5px" }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={12} md={5} lg={6}>
                <Box className="leftcontent">
                  <Typography variant="h2" color="primary">
                    <span>Explore</span> Items
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={7} lg={6} align="right">
                <Box className="rightcontent">
                  <Box
                    className={classes.sectionTitleHead}

                    // justifyContent="end"
                  >
                    {/* <Button
                      className={classes.filterBtn}
                      onClick={(event) => setAnchorEl1(event.currentTarget)}
                    >
                      <img src="images/filterline.png" alt="" />
                      {selectedOption?.label
                        ? selectedOption?.label.toString()
                        : "Select Category"}
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl1}
                      keepMounted
                      open={Boolean(anchorEl1)}
                      onClose={() => setAnchorEl1(null)}
                    >
                      <MenuItem
                        onClick={() => {
                          setAnchorEl1(null);
                          setSelectedCategoryNames();
                        }}
                      >
                        All
                      </MenuItem>
                      {listCategory?.map((data, i) => {
                        return (
                          <Box key={i}>
                            <MenuItem
                              onClick={() => {
                                setAnchorEl1(null);
                                setSelectedCategoryNames(data.categoryTitle);
                              }}
                            >
                              {data.categoryTitle}
                            </MenuItem>
                          </Box>
                        );
                      })}
                    </Menu>*/}
                    <Box display="flex">
                      <Box className={classes.parentSelect}>
                        <Box className={classes.slectorBox}>
                          <img src="images/filterline.png" alt="" />
                          <Select
                            defaultValue={selectedOption}
                            value={selectedOption}
                            onChange={setSelectedOption}
                            options={dataList}
                            placeholder="Select Category"
                            className={classes.classBox}
                            isSearchable={false}
                            // className="react-select-container"
                            classNamePrefix="react-select"
                          />
                        </Box>
                      </Box>
                      &nbsp; &nbsp; &nbsp;
                      <Box className={classes.parentSelect}>
                        <Box className={classes.slectorBox}>
                          <img src="images/filterline.png" alt="" />
                          <Select
                            defaultValue={selectedOptionId}
                            value={selectedOptionId}
                            onChange={setSelectedOptionId}
                            options={dataListCategory}
                            placeholder="Select Collection"
                            className={classes.classBox}
                            // className="react-select-container"
                            classNamePrefix="react-select"
                            isSearchable={false}
                          />
                        </Box>
                      </Box>
                    </Box>
                    &nbsp; &nbsp;
                    <Box align="left">
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => {
                          setSelectedOptionId("");
                          setSelectedOption("");
                        }}
                      >
                        Clear
                      </Button>
                    </Box>
                    {/* COLLECTION */}
                    {/* <Button
                      className={classes.filterBtn}
                      onClick={(event) => setAnchorCol(event.currentTarget)}
                      style={{ marginRight: "0px" }}
                    >
                      <img src="images/filterline.png" alt="" />
                      {selectedOptionId
                        ? selectedOptionId.label.toString()
                        : "Select Collection"}
                    </Button>
                  
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorCol}
                      keepMounted
                      open={Boolean(anchorCol)}
                      onClose={() => setAnchorCol(null)}
                    >
                      <MenuItem
                        onClick={() => {
                          setAnchorCol(null);
                          setSelectedCollectionIds();
                        }}
                      >
                        All
                      </MenuItem>
                      {collectionList?.map((data, i) => {
                        return (
                          <MenuItem
                            onClick={() => {
                              setAnchorCol(null);
                              setSelectedCollectionIds(data);
                            }}
                            key={i}
                          >
                            {data.displayName}
                          </MenuItem>
                        );
                      })}
                    </Menu>*/}
                    {/* &nbsp; &nbsp; &nbsp; */}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box mt={2}>
            <Grid container spacing={1}>
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
                  {allNftList &&
                    allNftList.slice(0, 4).map((data, i) => {
                      return (
                        <Grid item xs={6} sm={6} md={4} lg={3}>
                          <Box mt={1}>
                            <ExploreCard
                              callbackFun={allNftListHandler}
                              type="card"
                              data={data}
                              key={i}
                            />
                          </Box>
                        </Grid>
                      );
                    })}
                </>
              )}
              {!isLoading && allNftList && allNftList?.length === 0 && (
                <DataNotFound />
              )}
            </Grid>
            <Box align="left" mt={3} style={{ marginLeft: "7px" }}>
              {allNftList && allNftList?.slice(0, 4).length >= 4 && (
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  component={Link}
                  to="/explore"
                  className={classes.buttonright}
                >
                  View More
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Explore;
