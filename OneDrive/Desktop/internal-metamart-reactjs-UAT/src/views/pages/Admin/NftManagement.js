import { Box, Container, Typography, Button, Paper } from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import TotalNft from "./TotalNft";
import axios from "axios";
import apiConfig from "src/ApiConfig/ApiConfig";
import { Pagination } from "@material-ui/lab";
import ReportedNFTList from "./ReportedNFTList";
import { UserContext } from "src/context/User";
import ReportedUserList from "./ReportUserList";
import AllBlockList from "./AllBlockList";
import TotalNFTT from "./TotalNFTT";
import ReportedCollection from "./ReportedCollection";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "35px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  searcBox: {
    "& .MuiInputBase-input": {
      height: "45px !important",
    },
    "& .MuiIconButton-root": {
      background: theme.palette.background.blur,
      marginLeft: "-6px",
      padding: "8px",
    },
  },
  btnbox1: {
    overflow: "scroll",
    "& button": {
      fontWeight: "400",
      fontSize: "14px",
      height: "40px",
      minWidth: "85px",
      borderRadius: "10px",
      marginRight: " 12px",
      whiteSpace: "pre",
      color: theme.palette.primary.main,
      "&.active": {
        background: theme.palette.background.tab,
        color: "#fff",
      },
    },
  },
  heading: {
    "& h1": {
      fontFamily: "'ClashDisplay-Medium'",
      "& span": { fontFamily: "'ClashDisplay-Extralight'" },
    },
  },
  tablesection: {
    "& td": {
      color: "#52565c",
    },
  },
  colorbox: {
    width: "100%",
    height: "auto",
    background: "#F4FCFA",
    borderRadius: "15px",
  },
}));

export default function NftManagement() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const particularPermition = user?.permissions?.nftManagement;
  let isRead =
    user?.userData?.userType == "Admin"
      ? true
      : particularPermition?.read
      ? particularPermition?.read
      : false;
  useEffect(() => {
    if (!isRead) {
      history.push("/");
    }
  }, [isRead]);
  let isWrite =
    user?.userData?.userType == "Admin"
      ? true
      : particularPermition?.write
      ? particularPermition?.write
      : false;
  let isDelete =
    user?.userData?.userType == "Admin"
      ? true
      : particularPermition?.delete
      ? particularPermition?.delete
      : false;

  const [userlist, setuserlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [tabview, setTabView] = useState("totalNft");
  const [allNftList, setAllNftList] = useState([]);
  const [soldNftList, setSoldNftList] = useState([]);
  const [hotBidList, setHotBidList] = useState([]);
  const [noOfPages1, setNoOfPages1] = useState(1);
  const [page1, setPage1] = useState(1);
  const [noOfPagestotalNft, setNoOfPagestotalNft] = useState(1);
  const [pagetotalNft, setPagetotalNft] = useState(1);
  const [noOfPagessoldNft, setNoOfPagessoldNft] = useState(1);
  const [pagesoldNft, setPagesoldNft] = useState(1);
  const [noOfPagesonBid, setNoOfPagesonBid] = useState(1);
  const [pageonBid, setPageonBid] = useState(1);

  useEffect(() => {
    if (!user.isAdmin) {
      history.push("/");
    }
  }, [user.isAdmin]);

  const allNftListHandler = async () => {
    try {
      const res = await axios.post(
        apiConfig.allListOrder,
        {
          limit: 8,
          page: pagetotalNft,
          // status: kycStatus,
        },
        {
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
        }
      );
      if (res.data.statusCode == 200) {
        if (res.data.result.docs) {
          setNoOfPagestotalNft(res.data.result.pages);
          setAllNftList(res.data.result.docs);
          // setdataToExport(res.data.result.docs);
        }
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const pageCheck = page1 === 1 ? 16 : 0;
  const soldNftListHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: apiConfig.soldNftList,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        params: {
          limit: 8,
          page: pagesoldNft,
        },
      });
      if (res.data.statusCode == 200) {
        const filterData = res.data.result.docs.filter((data) => {
          return data.nftId.isPlace === false;
        });
        setNoOfPagessoldNft(res.data.result.pages);
        setSoldNftList(filterData);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const hotBidListHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: apiConfig.hotBid,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        params: {
          limit: 8,
          page: pageonBid,
        },
      });
      if (res.data.statusCode == 200) {
        const filetrnftdata = res.data.result.docs.filter((data) => {
          return data?.orderId !== null;
        });
        setNoOfPagesonBid(res.data.result.pages);
        setHotBidList(filetrnftdata);
      }
    } catch (error) {
      console.log("ERROR -- ", error);
    }
  };

  useEffect(() => {
    allNftListHandler();
    // soldNftListHandler();
    // hotBidListHandler();
  }, [pagetotalNft]);

  useEffect(() => {
    // allNftListHandler();
    soldNftListHandler();
    // hotBidListHandler();
  }, [pagesoldNft]);
  useEffect(() => {
    // allNftListHandler();
    // soldNftListHandler();
    hotBidListHandler();
  }, [pageonBid]);

  return (
    <Box className={classes.root}>
      <Container>
        <Box className={classes.heading}>
          <Typography color="primary" variant="h2">
            NFT Management
          </Typography>
        </Box>
        <Box className={classes.btnbox1} mt={3}>
          <Paper elevation={2} style={{ minWidth: "900px" }}>
            <Button
              className={tabview === "totalNft" ? "active" : ""}
              onClick={() => setTabView("totalNft")}
            >
              <Typography variant="h6">Total NFT</Typography>
            </Button>
            <Button
              className={tabview === "soldNft" ? "active" : ""}
              onClick={() => setTabView("soldNft")}
            >
              <Typography variant="h6">Sold NFT</Typography>
            </Button>
            <Button
              className={tabview === "onBid" ? "active" : ""}
              onClick={() => setTabView("onBid")}
            >
              <Typography variant="h6">Auction</Typography>
            </Button>
            <Button
              className={tabview === "report" ? "active" : ""}
              onClick={() => setTabView("report")}
            >
              <Typography variant="h6">Reported NFT</Typography>
            </Button>
            <Button
              className={tabview === "collection" ? "active" : ""}
              onClick={() => setTabView("collection")}
            >
              <Typography variant="h6">Reported Collection List</Typography>
            </Button>
            <Button
              className={tabview === "reportUser" ? "active" : ""}
              onClick={() => setTabView("reportUser")}
            >
              <Typography variant="h6">Reported User List</Typography>
            </Button>
            <Button
              className={tabview === "request" ? "active" : ""}
              onClick={() => setTabView("request")}
            >
              <Typography variant="h6">All Unblock requests List</Typography>
            </Button>
          </Paper>
        </Box>
        <Box mt={3}>
          {tabview === "totalNft" ? (
            <TotalNft nftList={allNftList} callbackFun={allNftListHandler} />
          ) : (
            ""
          )}
        </Box>
        <Box mt={3}>
          {tabview === "soldNft" ? (
            <TotalNft nftList={soldNftList} callbackFun={soldNftListHandler} />
          ) : (
            ""
          )}
        </Box>
        <Box mt={3}>
          {tabview === "onBid" ? (
            <TotalNFTT nftList={hotBidList} callbackFun={hotBidListHandler} />
          ) : (
            ""
          )}
        </Box>
        <Box mt={3}>
          {tabview === "report" ? (
            <ReportedNFTList
              nftList={allNftList}
              callbackFun={allNftListHandler}
            />
          ) : (
            ""
          )}
        </Box>
        <Box mt={3}>
          {tabview === "reportUser" && (
            <ReportedUserList
              callbackFun={allNftListHandler}
              isWrite={isWrite}
              isDelete={isDelete}
            />
          )}
        </Box>
        <Box mt={3}>
          {tabview === "collection" && (
            <ReportedCollection isWrite={isWrite} isDelete={isDelete} />
          )}
        </Box>

        <Box mt={3}>
          {tabview === "request" && (
            <AllBlockList isWrite={isWrite} isDelete={isDelete} />
          )}
        </Box>

        {/* {allNftList && allNftList.length >= pageCheck && (
          <> */}
        {tabview === "totalNft" && (
          <>
            <Box
              className={classes.tabBtn}
              pt={5}
              pb={3}
              display="flex"
              justifyContent="center"
            >
              {noOfPagestotalNft > 1 && (
                <Pagination
                  count={noOfPagestotalNft}
                  page={pagetotalNft}
                  onChange={(e, v) => setPagetotalNft(v)}
                />
              )}
            </Box>
          </>
        )}
        {/* </>
        )}
        {soldNftList && soldNftList.length >= pageCheck && (
          <> */}
        {tabview === "soldNft" && (
          <>
            {" "}
            <Box
              className={classes.tabBtn}
              pt={5}
              pb={3}
              display="flex"
              justifyContent="center"
            >
              {noOfPagessoldNft > 1 && (
                <Pagination
                  count={noOfPagessoldNft}
                  page={pagesoldNft}
                  onChange={(e, v) => setPagesoldNft(v)}
                />
              )}
            </Box>
            {/* <Box
              className={classes.tabBtn}
              pt={5}
              pb={3}
              display="flex"
              justifyContent="center"
            >
              <Pagination
                count={noOfPages1}
                page={page1}
                onChange={(e, v) => setPage1(v)}
              />
            </Box> */}
          </>
        )}
        {/* </>
        )}
        {hotBidList && hotBidList.length >= pageCheck && (
          <> */}
        {tabview === "onBid" && (
          <>
            <Box
              className={classes.tabBtn}
              pt={5}
              pb={3}
              display="flex"
              justifyContent="center"
            >
              <Pagination
                count={noOfPagesonBid}
                page={pageonBid}
                onChange={(e, v) => setPageonBid(v)}
              />
            </Box>
          </>
        )}
        {/* </>
        )} */}
      </Container>
    </Box>
  );
}
