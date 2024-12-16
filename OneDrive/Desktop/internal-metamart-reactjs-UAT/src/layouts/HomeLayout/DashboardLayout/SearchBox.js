import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import {
  InputBase,
  Box,
  Typography,
  Container,
  TextField,
  makeStyles,
  InputAdornment,
  Button,
  IconButton,
} from "@material-ui/core";
import axios from "axios";
// import apiConfig from "src/connectors/config/ApiConfig";
import { sortAddress } from "src/utils";
import { useHistory, useLocation } from "react-router-dom";
// import Search from "src/views/pages/Search";
import SearchBoxItem from "src/views/pages/Searchh/Index";
export default function SearchBox({
  search,
  searchIcon,
  inputRoot,
  inputInput,
}) {
  const [searchText, setSearchText] = useState("");
  const location = useLocation();

  const [searchResult, setSearchResult] = useState();
  const [serchdata, setSerchdata] = useState("");
  const history = useHistory();
  const [searchData, setSearchData] = useState("");
  const searchTextRef = React.useRef(null);
  const useStyles = makeStyles((theme) => ({
    MainTextFieldTheme: {
      maxWidth: "600px",
      width: "auto",
      marginTop: "22px",
      [theme.breakpoints.down("sm")]: {
        marginTop: "33px",
      },

      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgb(230 226 230 / 0%)",
      },

      "& .MuiOutlinedInput-adornedEnd": {
        paddingRight: "0px !important",
      },
      "& .MuiOutlinedInput-adornedStart": {
        padding: "3px !important",
        borderRadius: "50px",
      },
      "& .MuiIconButton-root": {
        background: theme.palette.background.blur,
        marginLeft: "-6px",
        padding: "8px",
      },
    },
  }));

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    if (searchText) {
    } else {
      setSearchResult();
    }
    return () => {
      cancelTokenSource.cancel();
    };
  }, [searchText]);

  useEffect(() => {
    searchTextRef.current.focus();
    if (
      location.pathname === "/item" &&
      location.search &&
      location.search.slice(1, location.search.length)
    ) {
      let text = location.search.slice(1, location.search.length);
      setSearchText(text);
    }
  }, [location]);
  const classes = useStyles();
  return (
    <div className={"searchField customSearch"}>
      <Container maxWidth="lg">
        <div className={search}>
          <Box className={classes.MainTextFieldTheme}>
            <TextField
              fullWidth
              variant="outlined"
              ref={searchTextRef}
              value={searchText}
              autoFocus={true}
              type="search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setSearchText(e.target.value);
                history.push({
                  search: e.target.value,
                });
              }}
              placeholder="Search items, collections, and accounts"
              classes={{
                root: inputRoot,
                input: inputInput,
              }}
            />
          </Box>
        </div>

        <SearchBoxItem />
      </Container>
    </div>
  );
}

export function SearchResults({ searchResult, history }) {
  return (
    <ul className="list-group text-dark" id="search-list">
      {searchResult?.userResult.length > 0 && (
        <>
          <li
            className="list-group-item"
            style={{ textAlign: "left", zIndex: 999 }}
          >
            <Box display={"flex"} justifyContent="space-between">
              <Box display={"flex"}>
                <Typography variant="h6">User's</Typography>
              </Box>
            </Box>
          </li>
          {searchResult?.userResult.map((data, i) => {
            return (
              <li
                key={i}
                className="list-group-item"
                style={{ textAlign: "left", zIndex: 999 }}
                onClick={() => {
                  history.push({
                    pathname: "/author",
                    search: data._id,
                  });
                }}
              >
                <Box display={"flex"} justifyContent="space-between">
                  <Box display={"flex"}>
                    <img
                      src={
                        data.profilePic
                          ? data.profilePic
                          : "/images/onlycamimg.png"
                      }
                      alt=""
                    />
                    <Typography>
                      {" "}
                      {data?.userName
                        ? data?.userName
                        : data?.name
                        ? data?.name
                        : sortAddress(data?.walletAddress)}
                    </Typography>
                  </Box>
                </Box>
              </li>
            );
          })}
        </>
      )}
      {searchResult?.orderResult?.length > 0 && (
        <>
          <li
            className="list-group-item"
            style={{ textAlign: "left", zIndex: 999 }}
          >
            <Box display={"flex"} justifyContent="space-between">
              <Box display={"flex"}>
                <Typography variant="h6">NFT's</Typography>
              </Box>
            </Box>
          </li>
          {searchResult?.orderResult.map((data, i) => {
            return (
              <li
                key={i}
                className="list-group-item"
                style={{ textAlign: "left", zIndex: 999 }}
                onClick={() => {
                  history.push({
                    pathname: "/nft",
                    search: data._id,
                  });
                }}
              >
                <Box display={"flex"} justifyContent="space-between">
                  <Box display={"flex"}>
                    <img src={data.nftId.coverImage} alt="" />
                    <Typography> {data.nftId.tokenName}</Typography>
                  </Box>
                </Box>
              </li>
            );
          })}
        </>
      )}
    </ul>
  );
}
