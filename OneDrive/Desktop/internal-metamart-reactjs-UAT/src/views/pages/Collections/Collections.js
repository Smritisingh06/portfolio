import React, { useState, useContext, useEffect } from "react";
import {
  makeStyles,
  Box,
  Container,
  Typography,
  Grid,
  InputAdornment,
  FormControl,
  TextField,
  IconButton,
  withStyles,
} from "@material-ui/core";
import CollectionCard from "src/component/CollectionCard";
import Apiconfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { CgSearch } from "react-icons/cg";
import { UserContext } from "../../../context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataNotFound from "src/component/DataNotFound";
import Pagination from "@material-ui/lab/Pagination";
import useDebounce from "src/CutomHooks/Debounce";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "60px 0px",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0px",
    },
    "& .heading": {
      "& h1": {
        paddingBottom: "30px",
      },
    },
    "& .maincontent": {},
  },
  searcBox: {
    "& .MuiOutlinedInput-root": {
      borderRadius: " 50px",
      height: "50px",
      // "@media (max-width : 360px)": {
      //   width: "175px",
      // },
    },
    "& .MuiIconButton-root": {
      background: theme.palette.background.blur,
      marginLeft: "-20px",
      padding: "8px",
      "& svg": {
        marginLeft: "-3px",
      },
    },
  },

  mediaclass: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "25px",
    "@media(max-width:560px)": {
      display: "flex",
      alignItems: "start",
      flexDirection: "column",
    },
    "& .checkBoxLable": {
      "& span:last-child": {
        color: theme.palette.primary.main,
      },
    },
  },
  mediaclassname: {
    marginTop: "-10px",
    "@media(max-width:560px)": {
      paddingBottom: "30px",
    },
  },
  checkBoxAndSearchBox: {
    display: "flex",
    alignItems: "center",
  },
}));
const GreenCheckbox = withStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    "&$checked": {
      color: "hsl(230.54deg 95.03% 63.21%)  !important",
    },
  },
  checked: {},
}))((props) => <Checkbox color="default" {...props} />);

function Collections() {
  const classes = useStyles();
  const [collectionList, setCollectionList] = useState([]);
  const [pages, setpages] = useState(1);
  const [numpages, setNumpages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(UserContext);
  const [isPromoted, setisPromoted] = useState(false);
  const [search, setSearch] = useState();
  const valuedeb = useDebounce(search, 2000);

  const getCollectionListHanlder = async (cancelTokenSource) => {
    if (search != "") {
      axios({
        method: "GET",
        url: `${Apiconfig.collectionList}?page=${pages}`,
        cancelToken: cancelTokenSource && cancelTokenSource.token,

        params: {
          limit: 12,
          search: search,
          isPromoted: isPromoted,
        },
      })
        .then(async (res) => {
          if (res.data.statusCode === 200) {
            let resultData = res.data.result.docs.filter(
              (data) =>
                data.contractAddress !=
                "0x17928648c055b9c76eC83A391CDf0B431127D4A5"
            );
            if (resultData) {
              const filterData = resultData.filter((data) => {
                return data?.displayName.trim() !== "Fieres Hooligans";
              });
              setNumpages(res.data.result.pages);
              setCollectionList(filterData);
              setIsLoading(false);
            } else {
              setCollectionList([]);
              setIsLoading(false);
            }
            user.getlistCollection();
            setIsLoading(false);
          }
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      axios({
        method: "GET",
        url: `${Apiconfig.collectionList}?page=${pages}`,
        cancelToken: cancelTokenSource && cancelTokenSource.token,

        params: {
          limit: 12,
          isPromoted: isPromoted,
        },
      })
        .then(async (res) => {
          if (res.data.statusCode === 200) {
            if (res.data.result.docs) {
              // const result = res.data.result.docs.filter(
              //   (data) => data.contractAddress.length > 10
              // );
              // const filterData = res.data.result.docs.filter(
              //   (data) => data?.displayName.trim() != "GenerativeNFT"
              // );
              const filterData = res.data.result.docs.filter((data) => {
                return data?.displayName.trim() !== "HovR Hooligans";
              });
              setNumpages(res.data.result.pages);
              setCollectionList(filterData);
              setIsLoading(false);
            } else {
              setCollectionList([]);
              setIsLoading(false);
            }
            user.getlistCollection();
            setIsLoading(false);
          }
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };
  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    getCollectionListHanlder(cancelTokenSource);
    // getCollectionListHanlder();
    // setCollectionList([]);
    return () => {
      cancelTokenSource.cancel();
    };
  }, [pages, valuedeb, isPromoted]);
  useEffect(() => {
    setIsLoading(true);
    const cancelTokenSource = axios.CancelToken.source();
    getCollectionListHanlder(cancelTokenSource);
    // getCollectionListHanlder();
    // setCollectionList([]);
    return () => {
      cancelTokenSource.cancel();
    };
  }, []);

  return (
    <>
      <Box className={classes.root}>
        <Container maxWidth="lg">
          <Box className={classes.mediaclass}>
            <Box className={classes.mediaclassname}>
              <Typography variant="h1" color="primary">
                Collections
              </Typography>
            </Box>
            <Box className={classes.checkBoxAndSearchBox}>
              {" "}
              <Box style={{ marginTop: "-10px" }}>
                <FormControlLabel
                  className="checkBoxLable"
                  control={
                    <GreenCheckbox
                      // onChange={handleChange}

                      name="checkedB"
                      checked={isPromoted}
                      onChange={(e) => {
                        setisPromoted(e.target.checked);
                      }}
                    />
                  }
                  label={`Promoted`}
                />
              </Box>
              <Box
                style={{
                  padding: "0rem 0rem 1rem 0rem",
                }}
              >
                <FormControl className={classes.searcBox}>
                  <TextField
                    type="search"
                    style={{
                      height: "100%",
                      paddingLeft: "2px",
                    }}
                    variant="outlined"
                    id="outlined-adornment-weight"
                    className="field"
                    placeholder="Collection name"
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setpages(1);
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton>
                            <CgSearch />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    aria-describedby="outlined-weight-helper-text"
                  />
                </FormControl>
              </Box>
            </Box>
          </Box>
          <Box className="maincontent">
            <Grid container spacing={2}>
              {isLoading ? (
                <Box
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <ButtonCircularProgress />
                </Box>
              ) : (
                <>
                  {" "}
                  {collectionList &&
                    collectionList?.map((data, i) => {
                      return (
                        <Grid item xs={6} sm={6} md={4} lg={3}>
                          <CollectionCard
                            type="collectionCard"
                            data={data}
                            key={i}
                          />
                        </Grid>
                      );
                    })}
                </>
              )}
              {!isLoading && !collectionList && (
                <Box
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <DataNotFound />
                </Box>
              )}
              {!isLoading && collectionList && collectionList.length === 0 && (
                <DataNotFound />
              )}
            </Grid>
            {numpages > 1 && (
              <Box
                className={classes.tabBtn}
                pt={5}
                display="flex"
                justifyContent="center"
              >
                <Pagination
                  page={pages}
                  onChange={(e, v) => setpages(v)}
                  count={numpages}
                  color="secondary"
                />
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Collections;
