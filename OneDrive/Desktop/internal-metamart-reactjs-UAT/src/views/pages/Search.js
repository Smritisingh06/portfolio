import React, { useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  makeStyles,
  Button,
  Divider,
} from "@material-ui/core";
import axios from "axios";
import MarketplaceCard from "src/component/MarketplaceCard";
import ApiConfig from "src/ApiConfig/ApiConfig";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  MarketPlace: {
    // minHeight: "calc(100vh - 64px)",

    "& .SeacrchScrollBox": {
      // height: "63vh",
      // overflowY: "scroll",
      // overflowX: "hidden",
      // marginBottom: "30px",
      marginBottom: "30px",
      overflow: "auto",
      padding: "2px 0px",
      // maxHeight: "446px",
      maxHeight: "408px",
    },
  },
  filtermenu: {
    display: "flex",
    justifyContent: "center",
    width: 120,
    height: 40,
    borderWidth: 3,
    backgroundColor: "grey",
    borderRadius: 30,
    alignItems: "center",
  },
  colorblack: {
    color: "#000",
  },
  imagebox: {
    display: "flex",
    justifyContent: "center",
    marginTop: "-18px",
    "@media(max-width:540px)": {
      marginTop: "0px",
    },
    "@media(max-width:414px)": {
      marginTop: "0px",
    },
    "& figure": {
      width: "36%",
      "& img": {
        width: "100%",
      },
    },
  },
  PageHeading: {
    lineHeight: "39px",
    color: theme.palette.text.secondary,
    "& span": {
      color: theme.palette.text.primary,
    },
  },
  searchTextname: {
    color: theme.palette.text.primary,
    fontSize: "23px",
    fontWeight: "500",
  },
}));

export default function Search() {
  const classes = useStyles();
  const [search, setSearch] = React.useState("");
  const [listAllCreatedNft, setlistAllCreatedNft] = React.useState([]);
  const [listAllCreatedNft1, setlistAllCreatedNft1] = React.useState(false);
  const location = useLocation();
  const [value, setValue] = React.useState();
  const placeorderlistapi = async (id) => {
    axios
      .request({
        method: "GET",
        url: `${ApiConfig.dashboardSearch}?search=${id}`,
        // data: {
        //   search: id,
        // },
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          setlistAllCreatedNft(res.data.result.orderResult);
          setlistAllCreatedNft1(true);
        } else {
          setlistAllCreatedNft1(false);
        }
      });
    // }
  };

  useEffect(() => {
    if (location.search.substring(1, location.search.length)) {
      const id = location.search.substring(1, location.search.length);
      placeorderlistapi(id);
      setSearch(id);
      // handleClickOpen(id)
    }
    // const handleChanges = (event) => {
    //   setValue(event.value);
    //   if (!value) {
    //     setValue(event.value);
    //   }
    // };
  }, [location, search]);
  // useEffect(() => {
  //   placeorderlistapi();
  // }, []);

  return (
    <>
      <Box className={classes.MarketPlace}>
        <Box style={{ textAlign: "left" }} mt={2} mb={2}>
          <Typography variant="h6" className={classes.PageHeading}>
            Search results for &nbsp;&nbsp;
            <span
              className={classes.searchTextname}
              style={{
                wordBreak: "break-all",
              }}
            >
              {search}
            </span>
          </Typography>
          <Box>
            <Divider />
          </Box>
        </Box>

        <Box mt={2} mb={2} className="SeacrchScrollBox">
          {listAllCreatedNft1 && listAllCreatedNft.length === 0 ? (
            <>
              {/* <Box className={classes.imagebox}>
                <figure>
                  <img src="images/noresult.webp" />
                </figure>
              </Box> */}
              <Typography
                variant="h4"
                color="primary"
                style={{ fontSize: "15px" }}
              >
                No Results to show
              </Typography>
              <Box align="left" mt={1}>
                <Link to="/marketplace" style={{ textDecoration: "none" }}>
                  <Button type="submit" variant="contained" color="primary">
                    Go Back
                  </Button>
                </Link>
              </Box>
            </>
          ) : (
            <Grid container spacing={2}>
              {listAllCreatedNft?.map((data, i) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    key={i}
                    className="walletSet p-0"
                  >
                    <MarketplaceCard data={data} index={i} />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>
      </Box>
    </>
  );
}
