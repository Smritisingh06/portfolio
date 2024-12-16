import React, { useState, useContext, useEffect } from "react";
import {
  makeStyles,
  Box,
  Container,
  Typography,
  Grid,
  InputBase,
  FormControl,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { CgSearch } from "react-icons/cg";

import { collectionData } from "src/constants";
import MyCollectionCard from "src/component/MyCollectionCard";
import Apiconfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import { UserContext } from "../../../context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataNotFound from "src/component/DataNotFound";
import Pagination from "@material-ui/lab/Pagination";
import MyBrandcard from "./MyBrandcard";
import MyBrandList from "../AdminControls/KYCmanagement/MyBrandList";
// import CollectionCardCard from "src/component/CollectionCardCard";

const useStyles = makeStyles((theme) => ({
  mybrandListBox: {
    padding: "40px 0px",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0px",
    },

    "& .maincontent": {},
  },
  searcBox: {
    "& .MuiInputBase-input": {
      height: "50px !important",
    },
    "& .MuiIconButton-root": {
      background: theme.palette.background.blur,
      marginLeft: "-6px",
      padding: "8px",
    },
  },
  classflexbox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "8px",
    padding: "20px 0",
  },
}));

function MybrandNFT(props) {
  const classes = useStyles();
  const accessToken = window.sessionStorage.getItem("token");
  const [collectionList, setCollectionList] = useState([]);
  const [pages, setpages] = useState(1);
  const [search, setSearch] = useState("");
  console.log("setSearch++", search);
  const [numpages, setNumpages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(UserContext);

  const getCollectionListHanlder = async () => {
    setIsLoading(true);
    if (search != "") {
      try {
        axios({
          method: "POST",
          // url: `${Apiconfig.myCollectionList}?page=${pages}`,
          url: Apiconfig.brandListParticular,
          headers: {
            token: accessToken,
          },
          data: {
            page: pages,
            limit: 12,
            search: search,
          },
        }).then(async (res) => {
          if (res.data.statusCode === 200) {
            if (res.data.result.docs) {
              setCollectionList(res.data.result.docs);
              setNumpages(res.data.result.pages);
              setIsLoading(false);
            } else {
              setCollectionList([]);
              setIsLoading(false);
            }
            // user.getlistCollection();
          }
        });
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    } else {
      try {
        axios({
          method: "POST",
          // url: `${Apiconfig.myCollectionList}?page=${pages}`,
          url: Apiconfig.brandListParticular,
          headers: {
            token: accessToken,
          },
          data: {
            page: pages,
            limit: 12,
          },
        }).then(async (res) => {
          if (res.data.statusCode === 200) {
            if (res.data.result.docs) {
              setCollectionList(res.data.result.docs);
              setNumpages(res.data.result.pages);
              setIsLoading(false);
            } else {
              setCollectionList([]);
              setIsLoading(false);
            }
            // user.getlistCollection();
          }
        });
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    getCollectionListHanlder();
  }, [user.userData, pages, search]);

  return (
    <>
      <Box className={classes.mybrandListBox}>
        <Container maxWidth="lg">
          <MyBrandList />
          <Box className={classes.classflexbox}>
            <Box className="heading">
              <Typography
                variant="h2"
                color="primary"
                style={{ whiteSpace: "pre" }}
              >
                Brands
              </Typography>
            </Box>
            <Box>
              <FormControl variant="outlined" className={classes.searcBox}>
                <InputBase
                  type="search"
                  style={{
                    // borderRadius: "50px",
                    // border: "1px solid #35a5f5",
                    paddingLeft: "2px",
                    width: "240px",
                  }}
                  id="outlined-adornment-weight"
                  className="field"
                  placeholder="Collection name"
                  onChange={(e) => setSearch(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <IconButton>
                        <CgSearch />
                      </IconButton>
                    </InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                />
              </FormControl>
            </Box>
          </Box>

          <Box className="maincontent">
            <Grid container spacing={3}>
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
                    collectionList.map((data, i) => {
                      return (
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                          <MyBrandcard type="Card" data={data} key={i} />
                        </Grid>
                      );
                    })}
                </>
              )}
              {!isLoading && collectionList.length === 0 && (
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
            </Grid>

            {collectionList.length != 0 ? (
              <Box
                className={classes.tabBtn}
                pt={5}
                display="flex"
                justifyContent="end"
              >
                <Pagination
                  onChange={(e, v) => setpages(v)}
                  count={parseInt(numpages)}
                  color="secondary"
                />
              </Box>
            ) : (
              ""
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default MybrandNFT;
