import {
  Box,
  makeStyles,
  Typography,
  Button,
  Paper,
  Avatar,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { sortAddress } from "src/utils";
import moment from "moment";
import DataNotFound from "src/component/DataNotFound";
import DataLoading from "src/component/DataLoading";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";
import ApiConfig from "src/ApiConfig/ApiConfig";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  markethistoryDetailsBox: {
    maxHeight: "257px",
    overflow: "auto",
    overflowX: "hidden",
    [theme.breakpoints.only("xs")]: {
      padding: "7px",
    },
  },
  historyDetails: {
    background: theme.palette.background.card,
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0px 0px 10px 0px",
    padding: "5px",
  },
  markethistoryprofileimg: {
    "& .MuiAvatar-root": {
      background: theme.palette.background.blur,
      marginRight: "10px",
    },
    // "& figure": {
    //   display: "flex",
    //   justifyContent: "center",
    //   alignItems: "center",
    //   borderRadius: "10px",
    //   overflow: "hidden",
    //   margin: 0,
    //   marginRight: "20px",
    //   width: "60px",
    //   height:"60px",
    //   background:theme.palette.background.blur,
    //   [theme.breakpoints.only("xs")]: {
    //     width: "30px",
    //     marginRight: "12px",
    //   },
    // },
    "& img": {
      cursor: "pointer",
      maxHeight: "100%",
      maxWidth: "100%",
      height: "auto",
      width: "auto",
      display: "block",
    },
  },
  marketdetailprice1: {
    "& p": {
      [theme.breakpoints.down("sm")]: {
        fontSize: "10px !important",
      },
    },
  },
  ellips: {
    color: "#50c0f2",
    whiteSpace: "pre",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "250px",
    fontSize: "13px",
    "@media(max-width:520px)": {
      width: "100px",
    },
  },
  time: {
    paddingRight: "25px",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "7px",
    },
  },
}));

export default function Bids({ orderDetails }) {
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState();
  const [historyList, setHistoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const showNftHistoryhandler = async (_id, cancelTokenSource) => {
    try {
      const res = await axios.get(ApiConfig.showNftHistory, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
        params: {
          _id,
          page,
          limit: 5,
        },
      });
      if (res.data.statusCode === 200) {
        setHistoryList(res.data.result.docs);

        setNoOfPages(res.data.result.pages);
      } else {
        // setHistoryList(setHistoryListsetHistoryList);

        setNoOfPages(res.data.result.pages);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (orderDetails?.nftId?._id) {
      showNftHistoryhandler(orderDetails.nftId._id);
    }
  }, [orderDetails, page]);
  return (
    <Paper elevation={2} className={classes.markethistoryDetailsBox}>
      {/* {historyList && historyList.length === 0 && <ButtonCircularProgress />} */}
      {isLoading ? (
        <DataLoading />
      ) : (
        <Box>
          {historyList && historyList.length === 0 && <DataNotFound />}
          {historyList &&
            historyList?.map((data, index) => {
              return (
                <Box className={classes.historyDetails}>
                  <Box style={{ alignItems: "center", display: "flex" }}>
                    <Box className={classes.markethistoryprofileimg}>
                      {/* <figure> */}
                      <Avatar>
                        <img
                          src={
                            data?.userId?.profilePic
                              ? data?.userId?.profilePic
                              : "/images/Profile.png"
                          }
                          alt=""
                          onClick={() => {
                            history.push({
                              pathname: "/author",
                              search: orderDetails.currentOwner._id,
                            });
                          }}
                        />
                        {/* </figure> */}
                      </Avatar>
                    </Box>

                    <Box
                      className={classes.marketdetailprice1}
                      style={{ lineHeight: 1.235 }}
                    >
                      <Typography variant="body2" color="primary">
                        {data.type === "CREATE_COLLECTION" ? (
                          <>{`${data.collectionId.displayName.slice(0, 25)}${
                            data?.collectionId.displayName?.length > 25
                              ? "..."
                              : ""
                          }`}</>
                        ) : (
                          <>{`${data?.nftId?.tokenName?.slice(0, 25)}${
                            data?.nftId?.tokenName?.length > 25 ? "..." : ""
                          }`}</>
                        )}
                      </Typography>
                      <Typography variant="subtitle2">
                        {data.type === "ORDER_CREATE"
                          ? "Listed by"
                          : data.type === "LIKE" || data.type === "DISLIKE"
                          ? data.type.toLowerCase() + "d by"
                          : data.type === "NFT_CREATE"
                          ? "this NFT created by"
                          : data.type === "SEND_NFT" ||
                            data.type === "SEND_ORDER" ||
                            data.type === "ORDER_SELL"
                          ? "bought by"
                          : data.type === "BID_CREATE"
                          ? `Bid placed by`
                          : data.type === "CREATE_COLLECTION"
                          ? "added collection"
                          : ""}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="primary"
                        style={{ color: "rgb(112, 107, 107)" }}
                        className={classes.ellips}
                      >
                        {" "}
                        {data?.userId?.name
                          ? data?.userId?.name.toUpperCase()
                          : sortAddress(data?.userId?.walletAddress)}{" "}
                        &nbsp;
                        <CopyToClipboard text={data?.userId?.walletAddress}>
                          <img
                            src="images/copyicon.png"
                            alt="images"
                            width="13px"
                            style={{
                              cursor: "pointer",
                              filter: "grayscale(100%) brightness(1000%) contrast(100%)", 
                            }}
                            onClick={() => toast.info("Copied")}
                          />
                        </CopyToClipboard>
                        {data?.bidId?.price && (
                          <Typography
                            variant="h6"
                            style={{ fontSize: " 0.875rem" }}
                          >
                            {data?.bidId?.price} Metamart{" "}
                            <span
                              style={
                                data?.bidId?.bidStatus === "PENDING"
                                  ? { color: "yellow" }
                                  : { color: "red" }
                              }
                            >
                              {data?.bidId?.bidStatus}
                            </span>
                          </Typography>
                        )}
                      </Typography>
                    </Box>
                  </Box>
                  <Box cclassName={classes.time}>
                    <Typography
                      variant="body2"
                      style={{ fontSize: "12px", fontStyle: "normal" }}
                    >
                      {moment(data?.updatedAt).format("ll")}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ fontSize: "12px", fontStyle: "normal" }}
                    >
                      {moment(data?.updatedAt).format("hh:mm A")}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          {noOfPages && noOfPages > 1 && (
            <Box display="flex" justifyContent="space-evenly">
              <Button
                disabled={parseInt(page) === 1}
                onClick={() => {
                  if (page > 1) {
                    setPage(parseInt(page) - 1);
                  }
                }}
              >
                Prev
              </Button>{" "}
              <Button
                color="primary"
                disabled={page >= noOfPages}
                onClick={() => {
                  if (page <= noOfPages) {
                    setPage(parseInt(page) + 1);
                  }
                }}
              >
                Next
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Paper>
  );
}
