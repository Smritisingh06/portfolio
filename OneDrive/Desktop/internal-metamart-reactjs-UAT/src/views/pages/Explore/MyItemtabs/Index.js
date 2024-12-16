import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  makeStyles,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { FiMenu } from "react-icons/fi";

import { CategoryButtons } from "src/constants/index";

import ExploreCard from "src/component/ExploreCard";
import { exploreData } from "src/constants";

const useStyles = makeStyles((theme) => ({
  sectionTitleHead: {
    display: "flex",
    alignContent: "center",
    margin: "10px 0 ",
    alignContent: "center",
    alignItems: "center",
    padding: " 0 10px",
    width: "100%",
    marginBottom: "30px",
    color: "#000000",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
    "& h2": {
      fontSize: "30px",
      display: "flex",
      alignItems: "center",
      color: "#fff",
      fontWeight: "700",
      "@media (max-width: 768px)": {
        fontSize: "25px",
        lineHeight: "37px",
      },
    },
    "& button": {
      marginLeft: "10px !important",
      [theme.breakpoints.down("xs")]: {
        marginTop: "10px !important",
      },
    },
  },
  loadMore: {
    width: "200px",
    maxWidth: "100%",
  },
  filterBtn: {
    height: "50px",
    color: "#fff",
    background:
      "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    // backdropFilter: "blur(42px)",
    fontWeight: "bold",
    border: "1px solid #2D2D2D",
    borderRadius: "50px",
    fontWeight: "500",
    fontSize: "15.7099px",
    lineHeight: "24px",
    "& img": {
      marginRight: "5px",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  headbox: {
    width: "100%",
    paddingBottom: "28px",
    display: "flex",
    justifyContent: "space-between",
    "@media (max-width: 768px)": {
      paddingBottom: "25px",
    },
    "& h2": {
      fontSize: "30px",
      lineHeight: "43px",
      color: "#FFFFFF",
      "@media (max-width: 768px)": {
        fontSize: "25px",
      },
    },
  },
  formcontrol: {
    height: "40px",
    fontSize: "14px",
    padding: "0 6px",
    // borderColor: "#ccc",
    width: "100%",
    borderRadius: "5px",
    // border: "1px solid #3d3d3d",
    background:
      "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    "&:focus-visible": {
      outline: "none",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "0px",
    },
  },
  gridPage: {
    display: "flex",
    "@media(max-width: 820px)": {
      display: "block",
    },
  },
  FilterBox: {
    border: "1px solid #A8CEDF",
    height: "auto",
    padding: "15px",
    background:
      "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    borderradius: "10px",
    // backdropFilter: "blur(42px)",
    borderRadius: "10px",
    // width: "100%",
    "& h4": {
      fontWeight: "600",
      fontSize: "18px",
      lineHeight: "27px",
      marginBottom: "15px",
      color: "#000",
    },
  },
  textfiled1: {
    paddingBottom: "15px",
    "& label": {
      color: "#fff",
    },
  },
  textfiled12: {
    paddingBottom: "15px",
    display: "flex",
    justifyContent: "center",
    "& p": {
      fontSize: "15px",
    },
  },
  formcontrol: {
    height: "40px",
    fontSize: "14px",
    padding: "0 6px",
    // backgroundColor: "#272727cc",
    color: "#000",
    // borderColor: "#ccc",
    width: "100%",
    borderRadius: "5px",
    // border: "1px solid #3d3d3d",
    background:
      "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    "&:focus-visible": {
      outline: "none",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "0px",
    },
  },
  label1: {
    color: "#000",
  },
  buttonfiled: {
    "& Button": {
      borderRadius: "10px",
      marginBottom: "10px !important",
      marginRight: "10px",
      marginTop: "5px !important",
    },
  },
  btnWidth: {
    // width: "250px",
    maxWidth: "100%",
    marginRight: "10px",
    [theme.breakpoints.down("xs")]: {
      // width: "100%",
      margin: "0 !important",
      marginBottom: "10px !important",
    },
  },
}));
export default function Dashboard(props) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [isClear, setIsClear] = useState(false);
  const [activities, setActivities] = useState("select");
  const [price, setPrice] = useState("select");
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);
  // const listOrderhandler = async () => {
  //   try {
  //     console.log("search-----", search);
  //     // setIsLoading(true);
  //     setNoOfPages(1);
  //     // setList([]);
  //     const res = await axios
  //       .post(apiConfig.allListOrder, {
  //         page: page,
  //         limit: 6,
  //         search: search ? search : "",
  //         mostVisited: activities == "Most Visited",
  //         mostSold: activities == "Most Sold",
  //         oldest: activities == "Oldest",
  //         newest: activities == "Newest",
  //         endingSoon: activities == "Ending Soon",
  //         mostFavorited: activities == "Most Favorite",
  //         recentalyMinted: activities == "Recentaly Minted",
  //         recentalyTraded: activities == "Recentaly Traded",
  //         price:
  //           price == "High to Low"
  //             ? "High"
  //             : price == "Low to High"
  //             ? "Low"
  //             : undefined,
  //       })
  //       .then((res) => {
  //         if (res.data.statusCode === 200) {
  //           var a = res.data.result.docs;
  //           setList(res.data.result.docs);
  //           setNoOfPages(res.data.result.pages);
  //         } else {
  //           // toast.warn(res.data.responseMessage);
  //         }
  //         setIsClear(false);
  //       });
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     // toast.error(error.message);
  //   }
  // };
  // useEffect(() => {
  //   if (isClear) {
  //     listOrderhandler();
  //   }
  // }, [isClear]);

  // useEffect(() => {
  //   listOrderhandler();
  // }, [page]);

  const clearHandler = () => {
    setActivities("select");
    setPrice("select");
    setSearch("");
    setIsClear(true);
    setList([]);
  };

  return (
    <Box pt={6} pb={5}>
      <Grid container spacing={2}>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Box className={classes.FilterBox}>
            <Box>
              <Typography variant="h4">Filter</Typography>
            </Box>
            <Box className={classes.textfiled1}>
              <TextField
                style={{ color: "white" }}
                id="outlined-secondary"
                placeholder="Search..."
                variant="outlined"
                color="primary"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
            <Box className={classes.textfiled1}>
              <select
                onChange={(e) => setPrice(e.target.value)}
                className={classes.formcontrol}
                value={price}
              >
                <option value="select">Prices</option>
                <option value={`High to Low`}>High to Low</option>
                <option value={`Low to High`}>Low to High</option>
              </select>
            </Box>
            <Box className={classes.textfiled1}>
              <select
                onChange={(e) => setActivities(e.target.value)}
                className={classes.formcontrol}
                value={activities}
              >
                <option value="select">Activities</option>
                <option value={"Most Sold"}>Most Sold</option>
                <option value={`Most Visited`}>Most Visited</option>
                <option value={`Oldest`}>Oldest</option>
                <option value={`Newest`}>Newest</option>
                <option value={`Most Favorite`}>Most Favorite</option>
                <option value={`Recentaly Minted`}>Recentaly Minted</option>
                <option value={`Recentaly Traded`}>Recentaly Traded</option>
                <option value={`Ending Soon`}>Ending Soon</option>
              </select>
            </Box>
            <Box className={classes.textfiled1}>
              <select
                // onChange={(e) => setPrice(e.target.value)}
                className={classes.formcontrol}
                // value={price}
              >
                <option value="select">Chains</option>
                <option value={`Ethereum`}>Ethereum</option>
                <option value={`Polygon`}>Polygon</option>
                <option value={`Klaytn`}>Klaytn</option>
                <option value={`BNB`}>BNB</option>
              </select>
            </Box>
            <Box className={classes.textfiled1}>
              <select onChange={() => {}} className={classes.formcontrol}>
                <option value="">Attributes</option>
                <option value={`Most Sold`}>Most Sold</option>
                <option value={`Most Visited`}>Most Visited</option>
              </select>
            </Box>
            <Box className={classes.textfiled1}>
              <select onChange={() => {}} className={classes.formcontrol}>
                <option value="">All Items</option>
                <option value={`Single`}>Single Items</option>
                <option value={`Bundles`}>Bundles</option>
              </select>
            </Box>
            <label className={classes.label1}>Status</label>
            <Box className={classes.buttonfiled}>
              <Button variant="contained" size="large" color="primary">
                New
              </Button>
              <Button variant="contained" size="large" color="primary">
                On Auction
              </Button>
              <Button variant="contained" size="large" color="primary">
                Buy Now
              </Button>
              <select
                // onChange={(e) => setPrice(e.target.value)}
                className={classes.formcontrol}
                // value={price}
              >
                <option value="select">Status</option>
                <option value={`Buy Now`}>Buy Now</option>
                <option value={`New`}>New</option>
                <option value={`Has Offers`}>Has Offers</option>
                <option value={`On Auction`}>On Auction</option>
              </select>
            </Box>
            <Box className={classes.textfiled12} mt={1}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.btnWidth}
                onClick={() => {
                  setIsLoading(true);
                  // listOrderhandler();
                }}
              >
                <Typography variant="body2" className={classes.typosec}>
                  Apply
                </Typography>
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                className={classes.btnWidth}
              >
                Clear
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <Box>
            <Grid container spacing={2}>
              {exploreData.map((data, i) => {
                return (
                  <Grid item xs={12} sm={6} md={6} lg={6} key={i}>
                    <Box mb={1}>
                      <ExploreCard type="card" data={data} key={i} />
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
