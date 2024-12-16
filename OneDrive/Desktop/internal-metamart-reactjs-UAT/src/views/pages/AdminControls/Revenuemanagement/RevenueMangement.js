import {
  Box,
  Container,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
  TableBody,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import { sortAddress } from "src/utils";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { Pagination } from "@material-ui/lab";
import DataLoading from "src/component/DataLoading";
import Filter from "src/component/Filter";
import moment from "moment";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import * as XLSX from "xlsx";
import { UserContext } from "src/context/User";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  heading: {
    "& h4": {
      fontSize: "40px",
      fontWeight: "700",
      color: "#35A5F5",
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
  },
  tablesection: {
    "& td": {
      color: "#52565c",
    },
  },
  colorbox: {
    // marginTop: "16px",
    // width: "100%",
    height: "auto",
    // background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "15px",
    paddingTop: "20px",
    [theme.breakpoints.down("xs")]: {
      padding: "0px",
    },
  },
  tablecontainer: {
    overflow: "auto",
    "@media(max-width:991px)": {
      overflow: "scroll",
    },
  },
  table: {
    minWidth: 700,
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
  totalRevenue: {
    marginTop: "1rem",
    // border: "1px solid red",
    marginBottom: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: "30vh",
    width: "100%",
    maxWidth: "300px",
    borderRadius: "10px",
    boxShadow:
      "0 1px 0 0 #ad5165, 0 -1px 0 0 #B801AA, 1px 0 0 0 #f5673f, -1px 0 0 0 #f5673f, 1px -1px 0 0 #f5673f, -1px 1px 0 0 #f5673f, 1px 1px 0 0 #f5673f, -1px -1px 0 0 #f5673f",
  },
}));

export default function RevenueMangement() {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const [transactionList, setTransactionList] = useState([]);
  const [totalRevenueEarned, settotalRevenueEarned] = useState(0);
  const [page, setpage] = useState(1);
  const [noOfPages, setnoOfPages] = useState(0);
  const [search, setsearch] = useState();
  const [fromDate, setfromDate] = useState();
  const [toDate, settoDate] = useState();
  const [status, setstatus] = useState();
  const [isSubmit, setisSubmit] = useState(false);
  const [isClear, setisClear] = useState(false);
  const [isLoadingCSV, setIsLoadingCSV] = useState(false);
  const [totalLimit, settotalLimit] = useState(1);
  const history = useHistory();
  const user = React.useContext(UserContext);
  const particularPermition = user?.permissions?.revenueManagement;
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
  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    try {
      let fromDate1;
      let toDate1;
      if (fromDate) {
        fromDate1 = `${moment(fromDate).unix()}000`;
      }
      if (toDate) {
        toDate1 = `${moment(toDate).unix()}000`;
      }
      const res = await axios({
        method: "GET",
        url: Apiconfigs.listTransaction,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        params: {
          page: page,
          limit: 10,
          fromDate: fromDate1,
          toDate: toDate1,
          search: search ? search : undefined,
        },
      });
      if (res.data.statusCode === 200) {
        setTransactionList(res.data.result?.dataResults?.docs);
        setnoOfPages(res.data.result?.dataResults?.pages);
        settotalRevenueEarned(res.data.result?.totalRevenueEarned);
        settotalLimit(res.data.result.dataResults.total);
        // history.push("/control");
        setIsLoading(false);
      } else {
        // toast.error(res.data.response_message);
      }
      setIsLoading(false);
    } catch (error) {
      // toast.error(error.message);
      console.log(error);
      setIsLoading(false);
    }
  };
  const downLoadCSV = async () => {
    setIsLoadingCSV(true);
    try {
      let kycStatus;
      if (status == "na") {
        kycStatus = "";
      } else {
        kycStatus = status;
      }
      let fromDate1;
      let toDate1;
      if (fromDate) {
        fromDate1 = `${moment(fromDate).unix()}000`;
      }
      if (toDate) {
        toDate1 = `${moment(toDate).unix()}000`;
      }
      const res = await axios({
        method: "GET",
        url: Apiconfigs.listTransaction,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        params: {
          page: 1,
          limit: totalLimit,
          fromDate: fromDate1,
          toDate: toDate1,
          search: search ? search : undefined,
        },
      });

      if (res.data.statusCode === 200) {
        let dataToExport = res.data.result.dataResults.docs;
        let name = "revenue_lists";
        const workSheet = XLSX.utils.json_to_sheet(dataToExport);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "revenueList");
        let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workBook, `${name}.xlsx`);
        setIsLoadingCSV(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoadingCSV(false);
    }
  };
  // console.log(" ------- transactionList ------", transactionList);
  useEffect(() => {
    if (isRead && isClear && search == "") {
      handleFormSubmit();
    }
  }, [search, isClear]);
  useEffect(() => {
    if (isRead) {
      const cancelTokenSource = axios.CancelToken.source();
      handleFormSubmit(cancelTokenSource);
      return () => {
        cancelTokenSource.cancel();
      };
    }
  }, [page, isSubmit]);

  const [isChecked, setIsChecked] = useState(true);
  const sortAmountHandler = (data, amountTypes) => {
    try {
      if (data.length === 0) {
        return;
      }
      data.sort(function (a, b) {
        if (isChecked) {
          return b[amountTypes] - a[amountTypes];
        } else {
          return a[amountTypes] - b[amountTypes];
        }
      });
      setIsChecked(!isChecked);
    } catch (error) {
      console.log(error);
    }
  };
  const [isChecked1, setIsChecked1] = useState(true);
  const sortCreatedAtHandler = (data) => {
    try {
      if (data.length === 0) {
        return;
      }
      data.sort(function (a, b) {
        if (isChecked1) {
          return moment(b?.updatedAt).unix() - moment(a?.updatedAt).unix();
        } else {
          return moment(a?.updatedAt).unix() - moment(b?.updatedAt).unix();
        }
      });
      setIsChecked1(!isChecked1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      {isRead && (
        <Container>
          <Box className={classes.colorbox} mt={1}>
            <Box className={classes.heading}>
              <Typography variant="h2" color="primary">
                Revenue Management
              </Typography>
            </Box>
          </Box>
          <TotalEarnedAmount
            classes={classes}
            totalRevenueEarned={
              totalRevenueEarned
                ? parseFloat(totalRevenueEarned).toFixed(6)
                : "0"
            }
          />
          <Filter
            setSearch={setsearch}
            search={search}
            fromData={fromDate}
            setFromData={setfromDate}
            toData={toDate}
            setToData={settoDate}
            status={status}
            setStatus={setstatus}
            isSubmit={isSubmit}
            setIsSubmit={setisSubmit}
            dataToExport={"dataToExport"}
            isClear={isClear}
            setIsClear={setisClear}
            name={"revenue_list"}
            downLoadCSV={downLoadCSV}
            isLoadingCSV={isSubmit}
          />

          <Box style={{ borderRadius: "11px" }} mt={1}>
            <TableContainer className={classes.tablecontainer}>
              <Table
                className={classes.table}
                stickyHeader
                aria-label="sticky table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      color="primary"
                      style={{
                        textAlign: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Sr.No
                    </TableCell>
                    <TableCell
                      color="primary"
                      style={{
                        textAlign: "center",
                      }}
                    >
                      Trx Hash
                    </TableCell>
                    <TableCell
                      color="primary"
                      style={{
                        textAlign: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      NFT Name
                    </TableCell>
                    <TableCell
                      color="primary"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Sell Amount
                      <SwapVertIcon
                        style={{ cursor: "pointer", whiteSpace: "nowrap" }}
                        onClick={() =>
                          sortAmountHandler(transactionList, "sellAmount")
                        }
                      />
                    </TableCell>
                    <TableCell
                      color="primary"
                      style={{
                        textAlign: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Order Type
                    </TableCell>
                    <TableCell
                      color="primary"
                      style={{
                        textAlign: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Transaction Fee
                    </TableCell>
                    <TableCell
                      color="primary"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Date & Time
                      <SwapVertIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => sortCreatedAtHandler(transactionList)}
                      />
                    </TableCell>
                    <TableCell
                      color="primary"
                      style={{
                        textAlign: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Transaction Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                {transactionList &&
                  transactionList.map((data, i) => {
                    return (
                      <TableBody>
                        <TableRow>
                          <TableCell
                            color="primary"
                            style={{
                              textAlign: "center",
                            }}
                          >
                            {(page - 1) * 10 + (i + 1)}
                          </TableCell>
                          <TableCell
                            color="primary"
                            style={{
                              textAlign: "center",
                            }}
                          >
                            {sortAddress(data.transactionHash)} &nbsp;
                            <CopyToClipboard text={data.transactionHash}>
                              <img
                                src="images/copyicon.png"
                                alt="copy"
                                style={{
                                  cursor: "pointer",
                                  height: "16px",
                                  width: "12px",
                                  filter: "grayscale(100%) brightness(1000%) contrast(100%)", 
                                }}
                                onClick={() => toast.info("Copied")}
                              />
                            </CopyToClipboard>
                          </TableCell>
                          <TableCell
                            color="primary"
                            style={{
                              textAlign: "center",
                            }}
                          >
                            {data?.nftId?.tokenName.length > 40
                              ? data?.nftId?.tokenName.slice(0, 40) + "..."
                              : data?.nftId?.tokenName}
                          </TableCell>
                          <TableCell
                            color="primary"
                            style={{
                              textAlign: "center",
                            }}
                          >
                            {data?.sellAmount}
                          </TableCell>
                          <TableCell
                            color="primary"
                            style={{
                              textAlign: "center",
                            }}
                          >
                            {data?.type == "ORDER_BID" ? "BID" : "SELL"}
                          </TableCell>
                          <TableCell
                            color="primary"
                            style={{
                              textAlign: "center",
                            }}
                          >
                            {data?.commitionCharge
                              ? parseFloat(data?.commitionCharge).toFixed(6)
                              : "0"}
                          </TableCell>
                          <TableCell
                            color="primary"
                            style={{
                              textAlign: "center",
                            }}
                          >
                            {moment(data.createdAt).format("lll")}
                          </TableCell>
                          <TableCell
                            color="primary"
                            style={{
                              textAlign: "center",
                            }}
                          >
                            {data?.transactionStatus}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    );
                  })}
              </Table>
            </TableContainer>
            {isLoading && <DataLoading />}
            {noOfPages > 1 && (
              <Box
                className={classes.tabBtn}
                pt={5}
                pb={3}
                display="flex"
                justifyContent="end"
              >
                <Pagination
                  count={noOfPages}
                  page={page}
                  onChange={(e, v) => setpage(v)}
                />
              </Box>
            )}
          </Box>
        </Container>
      )}
    </Box>
  );
}

const TotalEarnedAmount = ({ classes, totalRevenueEarned }) => {
  return (
    <Box className={classes.totalRevenue}>
      <Box>
        <Typography color="primary" variant="h3">
          Total Commission Earned
        </Typography>
        <Typography color="primary" variant="h3">
          {totalRevenueEarned ? totalRevenueEarned : 0}
        </Typography>
      </Box>
    </Box>
  );
};
