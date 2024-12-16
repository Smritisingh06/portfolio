import React, { useState, useContext, useEffect } from "react";
import {
  makeStyles,
  Box,
  Container,
  Typography,
  Grid,
} from "@material-ui/core";
import MyCollectionCard from "src/component/MyCollectionCard";
import Apiconfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import { UserContext } from "../../../context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataNotFound from "src/component/DataNotFound";
import Pagination from "@material-ui/lab/Pagination";
// import CollectionCardCard from "src/component/CollectionCardCard";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "40px 0px",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0px",
    },
    "& .heading": {
      "& h1": {
        marginBottom: "30px",
        fontFamily: "'ClashDisplay-Medium'",
        "& span": { fontFamily: "'ClashDisplay-Extralight'" },
      },
    },
    "& .maincontent": {},
  },
}));

function MyCollections(props) {
  const classes = useStyles();
  const accessToken = window.sessionStorage.getItem("token");
  const [collectionList, setCollectionList] = useState([]);
  const [pages, setpages] = useState(1);
  const [numpages, setNumpages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(UserContext);

  const getCollectionListHanlder = async () => {
    setIsLoading(true);
    try {
      axios({
        method: "GET",
        url: Apiconfig.myCollectionList,

        headers: {
          token: accessToken,
        },
        params: {
          page: pages,
          limit: "12",
        },
      }).then(async (res) => {
        if (res.data.statusCode === 200) {
          setIsLoading(false);
          let resultData = res.data.result.docs.filter((data)=> data.contractAddress != "0x17928648c055b9c76eC83A391CDf0B431127D4A5") 
       
          if (resultData) {
            console.log("res.data.result.pages==", res.data.result.pages);
            setNumpages(res.data.result.pages);
            setCollectionList(resultData);
          } else {
            setCollectionList([]);
          }
          // user.getlistCollection();
        }
      });
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    getCollectionListHanlder(cancelTokenSource, pages);
    // if (image !== "") {
    //   extensionCheckFun();
    // }
    return () => {
      cancelTokenSource.cancel();
    };
  }, [pages]);
  const pageCheck = pages === 1 ? 12 : 0;

  return (
    <>
      <Box className={classes.root}>
        <Container maxWidth="lg">
          <Box className="heading" m={"16px 0px 40px"}>
            <Typography variant="h2" color="primary">
              My
              <span> Collections</span>
            </Typography>
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
                          <MyCollectionCard type="Card" data={data} key={i} />
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
            </Grid>

            {collectionList && collectionList.length >= pageCheck && (
              <Box
                className={classes.tabBtn}
                pt={5}
                display="flex"
                justifyContent="center"
              >
                <Pagination
                  onChange={(e, v) => setpages(v)}
                  count={parseInt(numpages)}
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

export default MyCollections;
