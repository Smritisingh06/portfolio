import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
  Divider,
} from "@material-ui/core";
import Page from "src/component/Page";
import { mergeClasses } from "@material-ui/styles";
import { useLocation, useHistory } from "react-router-dom";
import { UserContext } from "src/context/User";
import axios from "axios";
import ApiConfig from "src/ApiConfig/ApiConfig";

// import ArtWork from "../FeatureAuction/ArtWork";
import Creators from "../FeatureAuction/Creators";
import NFTCard from "src/component/NFTCard";
import CreatorCard from "src/component/CreatorCard";
import Items from "./Items";
import Users from "./Users";

import Collection from "./Collection";
const useStyles = makeStyles((theme) => ({
  Padding_Top: {
    // paddingTop: "25px",

    "& .searchScrollBox": {
      // height: "65vh",
      // overflowY: "scroll",
      // overflowX: "hidden",
      // marginBottom: "30px",
      marginBottom: "30px",
      overflow: "auto",
      // maxHeight: "446px",
      // maxHeight: "408px",
    },

    "& .TabBox": {
      background: theme.palette.background.form,
      borderRadius: "10px",
      padding: "10px",
      display: "flex",
      flexWrap: "wrap",
      "& button": {
        fontWeight: "300",
        minWidth: "100px",
        height: "43px",
        margin: "0px 4px",
        borderRadius: "8px",
        color: theme.palette.text.primary,
        // fontSize: "16px !important",
      },
      "& .active": {
        background: theme.palette.background.tab,
        color: "#fff",
      },
    },
  },

  PageHeading: {
    fontWeight: "400",
    fontSize: "18px",
    lineHeight: "39px",
    // color: "#898989",
    color: theme.palette.text.secondary,
    marginTop: "20px",
    marginBottom: "16px",
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
function Search(props) {
  const classes = useStyles();
  const [tabview, setTabView] = useState("item");
  const location = useLocation();
  const history = useHistory();

  const user = useContext(UserContext);
  const [searchText, setSearchText] = useState("");
  const [searchUserList, setSearchUserList] = useState([]);
  const [searchOrderList, setSearchOrderList] = useState([]);
  const [searchCollectionList, setSearchCollectionList] = useState([]);
  const [searchResult, setSearchResult] = useState();

  const searchHandler = async (cancelTokenSource) => {
    try {
      const res = await axios.get(ApiConfig.dashboardSearch, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
        params: {
          search: searchText,
        },
      });
      if (res.data.statusCode == 200) {
        setSearchResult(res.data.result);
      } else {
        setSearchResult();
      }
    } catch (error) {
      console.log("ERROR", error);
      setSearchResult();
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    if (searchText) {
      searchHandler(cancelTokenSource);
    } else {
      setSearchResult();
    }

    return () => {
      cancelTokenSource.cancel();
    };
  }, [searchText]);

  useEffect(() => {
    if (location.search && location.search.slice(1, location.search.length)) {
      let text = location.search.slice(1, location.search.length);
      setSearchText(text);
    } else {
      setSearchText("");
    }
  }, [location]);

  return (
    <Page title="Marketplace for NFTs">
      <Box className={classes.Padding_Top}>
        <Typography
          variant="h6"
          color="primary"
          className={classes.PageHeading}
          style={{ borderBottom: "1px solid" }}
        >
          Search results for :{" "}
          <span
            className={classes.searchTextname}
            style={{ wordBreak: "break-all" }}
          >
            {searchText}
          </span>
        </Typography>

        <Box className="searchScrollBox">
          <Box className="TabBox">
            <Button
              className={tabview === "item" ? "active" : " "}
              onClick={() => setTabView("item")}
            >
              Items
              <span style={{ fontSize: "20px", marginLeft: "3px" }}>
                {searchResult?.orderResult?.length}
              </span>
            </Button>
            <Button
              className={tabview === "users" ? "active" : " "}
              onClick={() => setTabView("users")}
            >
              Users{" "}
              <span style={{ fontSize: "20px", marginLeft: "3px" }}>
                {searchResult?.userResult?.length}
              </span>
            </Button>
            <Button
              className={tabview === "collection" ? "active" : " "}
              onClick={() => setTabView("collection")}
            >
              Collection{" "}
              <span style={{ fontSize: "20px", marginLeft: "3px" }}>
                {searchResult?.collectionResult?.length}
              </span>
            </Button>
          </Box>
          <Box className="TabButtonsContant">
            {tabview === "item" ? (
              <Items orderList={searchResult?.orderResult} />
            ) : (
              ""
            )}
            {tabview === "users" ? (
              <Users searchUserList={searchResult?.userResult} />
            ) : (
              ""
            )}
            {tabview === "collection" ? (
              <Collection collectionList={searchResult?.collectionResult} />
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Box>
    </Page>
  );
}

export default Search;
