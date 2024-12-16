import {
  Box,
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import BlockIcon from "@material-ui/icons/Block";
import { useHistory } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import { sortAddress } from "src/utils";
import axios from "axios";
import apiConfig from "src/ApiConfig/ApiConfig";
import { Pagination } from "@material-ui/lab";
import moment from "moment";
import { UserContext } from "src/context/User";
import DataNotFound from "src/component/DataNotFound";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import Filter from "src/component/Filter";
import { toast } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";
import * as XLSX from "xlsx";
import EditIcon from "@material-ui/icons/Edit";

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
    // marginTop: "16px",
    width: "100%",
    height: "auto",
    background: "#F4FCFA",
    // backdropFilter: "blur(44px)",
    borderRadius: "15px",
    // padding: "20px",
  },
}));
const TableHeading = [
  {
    id: "Sr.No",
    label: "Sr.No",
    align: "left",
    minWidth: "25px",
    maxWidth: "70px",
  },
  {
    id: "Name",
    label: "First Name",
    align: "left",
    minWidth: "122px",
    maxWidth: "160px",
  },
  {
    id: "walletAddress",
    label: "Wallet Address",
    align: "left",
    minWidth: "122px",
    maxWidth: "160px",
  },
  {
    id: "status",
    label: "Status",
    align: "left",
    minWidth: "122px",
    maxWidth: "160px",
  },
  {
    id: "Registration Date",
    label: "Date & Time",
    align: "left",
    minWidth: "122px",
    maxWidth: "160px",
  },
  { id: " Action", label: " Action", align: "left", minWidth: "160px" },
];
const AdminTableHeading = [
  {
    id: "Sr.No",
    label: "Sr.No",
    align: "left",
    minWidth: "25px",
    maxWidth: "70px",
  },
  // { id: "ID", label: "User Id", align: "left", maxWidth: "160px" },
  { id: "name", label: "Name", align: "left", minWidth: "160px" },
  {
    id: "Email",
    label: "Email",
    align: "left",
    maxWidth: "160px",
  },

  {
    id: "Mobileno",
    label: "Mobile No.",
    align: "left",
    minWidth: "130px",
  },

  {
    id: "role",
    label: "Role",
    align: "left",
    minWidth: "160px",
  },
  { id: " dob", label: " Date of Birth", align: "left", minWidth: "160px" },
];

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));
function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}
export default function SubAdmin() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const history = useHistory();
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCSV, setIsLoadingCSV] = useState(false);
  const [isClear, setIsClear] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);
  const [noOfPagesListUser, setNoOfPagesListUser] = useState(1);
  const [totalLimit, settotalLimit] = useState(1);
  const [search, setSearch] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [status, setStatus] = useState("na");
  const [page, setPage] = useState(1);
  const [pageAPI, setpageAPI] = useState(1);

  useEffect(() => {
    if (!user.isAdmin) {
      history.push("/");
    }
  }, [user.isAdmin]);

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
      const res = await axios.get(apiConfig.listSubAdmin, {
        // cancelToken: cancelTokenSource && cancelTokenSource.token,
        params: {
          page: 1,
          limit: totalLimit,
          search: search ? search : undefined,
          status: kycStatus ? kycStatus : undefined,
          fromDate: fromDate1,
          toDate: toDate1,
        },

        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        let dataToExport = res.data.result.docs;
        let name = "user_lists";
        const workSheet = XLSX.utils.json_to_sheet(dataToExport);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "userList");
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

  const getuserListHandler = async (cancelTokenSource) => {
    setIsLoading(true);

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
      const res = await axios.get(apiConfig.listSubAdmin, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
        params: {
          page: page,
          limit: 10,
          search: search ? search : undefined,
          status: kycStatus ? kycStatus : undefined,
          fromDate: fromDate1,
          toDate: toDate1,
        },

        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        if (res.data.result.docs) {
          setNoOfPagesListUser(res.data.result.pages);
          setpageAPI(res.data.result.page);
          settotalLimit(res.data.result.total);
          setUserList(res.data.result.docs);
          setIsLoading(false);
        } else {
          setNoOfPagesListUser(1);
          setUserList([]);
          setIsLoading(false);
        }
      } else {
        setNoOfPagesListUser(1);
        setUserList([]);
      }
    } catch (error) {
      console.log("ERROR", error);

      setNoOfPagesListUser(0);
      settotalLimit(0);
      setUserList([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    getuserListHandler(cancelTokenSource);
    return () => {
      cancelTokenSource.cancel();
    };
  }, [page, isSubmit]);
  useEffect(() => {
    if (search == "" && isClear) {
      const cancelTokenSource = axios.CancelToken.source();
      getuserListHandler(cancelTokenSource);
      return () => {
        cancelTokenSource.cancel();
      };
    }
  }, [search, isClear]);

  return (
    <Box className={classes.root}>
      <Container>
        <Box className={classes.heading}>
          <Typography color="primary" variant="h2">
            Subadmin Management
          </Typography>
        </Box>
        <UserList
          userList={userList}
          getuserListHandler={getuserListHandler}
          isLoading={isLoading}
          setSearch={setSearch}
          search={search}
          toDate={toDate}
          setToDate={setToDate}
          status={status}
          isSubmit={isSubmit}
          setisSubmit={setisSubmit}
          setStatus={setStatus}
          fromDate={fromDate}
          setFromDate={setFromDate}
          // search={search}
          noOfPagesListUser={noOfPagesListUser}
          setPage={setPage}
          page={page}
          pageAPI={pageAPI}
          isClear={isClear}
          setIsClear={setIsClear}
          downLoadCSV={downLoadCSV}
          isLoadingCSV={isLoadingCSV}
        />
      </Container>
    </Box>
  );
}

export function UserList(props) {
  const {
    userList,
    isLoading,
    noOfPagesListUser,
    setSearch,
    search,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    status,
    setStatus,
    isSubmit,
    setisSubmit,
    getuserListHandler,
    setPage,
    page,
    pageAPI,
    isClear,
    setIsClear,
    downLoadCSV,
    isLoadingCSV,
  } = props;
  const classes = useStyles();
  const history = useHistory();

  const blockUserHandler = async (id) => {
    try {
      const res = await axios({
        method: "PUT",
        url: apiConfig.blockUnblockUser,

        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          _id: id,
        },
      });

      if (res.data.statusCode === 200) {
        if (res.data.result.status === "ACTIVE") {
          toast.success("Sub admin has been unblocked by admin");
        } else {
          toast.success("Sub admin has been blocked by admin");
        }
        getuserListHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box className={classes.AdminBox} mt={2}>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0rem 0rem 1rem 0rem",
          alignItems: "center",
        }}
      >
        <Filter
          setSearch={setSearch}
          search={search}
          fromData={fromDate}
          setFromData={setFromDate}
          toData={toDate}
          setToData={setToDate}
          status={status}
          setStatus={setStatus}
          isSubmit={isSubmit}
          setIsSubmit={setisSubmit}
          isClear={isClear}
          setIsClear={setIsClear}
          name={"user_list"}
          downLoadCSV={downLoadCSV}
          isLoadingCSV={isLoadingCSV}
          isSubAdmin={true}
        />
      </Box>
      <Box style={{ borderRadius: "11px" }}>
        <TableContainer className="tableHead">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {TableHeading.map((data) => (
                  <TableCell
                    color="primary"
                    style={{
                      textAlign: "center",
                      maxWidth: data.maxWidth,
                      minWidth: data.minWidth,
                    }}
                  >
                    {data.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {userList &&
                userList.map((row, index) => {
                  return (
                    <TableRow key={index} className={classes.tablesection}>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          textAlign: "center",
                          textTransform: "capitalize",
                          color: "rgb(100 104 109)",
                        }}
                      >
                        {index + 1 + (pageAPI - 1) * 10}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {row.name ? row.name : "----"}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {sortAddress(row.walletAddress)} &nbsp;
                        <CopyToClipboard text={row.walletAddress}>
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
                        align="left"
                        style={{
                          textAlign: "center",
                        }}
                      >
                        {row.status}
                      </TableCell>

                      <TableCell
                        align="left"
                        style={{
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {moment(row.createdAt).format("lll")}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 5,

                          textAlign: "center",
                        }}
                        align="right"
                      >
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <BootstrapTooltip title="Edit Sub admin Details">
                            <EditIcon
                              onClick={() => {
                                history.push({
                                  pathname: "/add-subadmin",
                                  hash: "edit",
                                  search: row?._id,
                                  state: { ...row, isdisabled: false },
                                });
                              }}
                              style={{
                                fontSize: "25px",
                                cursor: "pointer",
                                marginRight: "5px",
                              }}
                            />
                          </BootstrapTooltip>
                          <BootstrapTooltip title="View Sub admin Details">
                            <VisibilityIcon
                              onClick={() => {
                                history.push({
                                  pathname: "/add-subadmin",
                                  hash: "view",
                                  search: row?._id,
                                  state: { ...row, isdisabled: true },
                                });
                              }}
                              style={{
                                fontSize: "25px",
                                cursor: "pointer",
                                marginRight: "5px",
                              }}
                            />
                          </BootstrapTooltip>

                          <BootstrapTooltip
                            title={
                              row?.status === "BLOCK" ? "Unblock" : "Block"
                            }
                          >
                            {row?.userType !== "Admin" ? (
                              <BlockIcon
                                fontSize="small"
                                style={
                                  row?.status === "BLOCK"
                                    ? {
                                        color: "red",
                                        fontSize: "22px",
                                        cursor: "pointer",
                                        marginTop: "2px",
                                      }
                                    : {
                                        fontSize: "22px",
                                        cursor: "pointer",
                                        marginTop: "2px",
                                      }
                                }
                                onClick={() => blockUserHandler(row._id)}
                              />
                            ) : (
                              <></>
                            )}
                          </BootstrapTooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}

              {!isLoading && userList && userList.length === 0 && (
                <Box
                  style={{
                    dislay: "flex",
                    justifyContent: "center",
                    marginTop: "1rem",
                  }}
                >
                  <DataNotFound />
                </Box>
              )}
              {isLoading && (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    // width: "100%",
                    position: "absolute",
                    marginTop: "10px",
                  }}
                >
                  <ButtonCircularProgress />
                </Box>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <>
        {noOfPagesListUser > 1 ? (
          <Box mt={5} mb={2} display="flex" justifyContent="center">
            <Pagination
              count={noOfPagesListUser}
              page={page}
              onChange={(e, v) => setPage(v)}
            />
          </Box>
        ) : (
          ""
        )}
      </>
    </Box>
  );
}

export function AdminList() {
  const classes = useStyles();
  const [adminList, setAdminList] = useState([]);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [isLoading1, setIsLoading1] = useState(false);

  const getAdminListHandler = async (cancelTokenSource) => {
    setIsLoading1(true);
    try {
      const res = await axios.get(apiConfig.listSubAdmin, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
        params: {
          page: page,
          limit: 15,
        },
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setIsLoading1(false);

        if (res.data.result) {
          setNoOfPages(res.data.result.pages);
          setAdminList(res.data.result);
          setIsLoading1(false);
        } else {
          setNoOfPages(1);
          setAdminList([]);
          setIsLoading1(false);
        }
      } else {
        setNoOfPages(1);
        setAdminList([]);
        setIsLoading1(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading1(false);
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    getAdminListHandler(cancelTokenSource);
    return () => {
      cancelTokenSource.cancel();
    };
  }, [page]);

  return (
    <Box className={classes.colorbox} mt={2}>
      <Box style={{ border: "1px solid #35A5F5", borderRadius: "11px" }}>
        <TableContainer className="tableHead">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {AdminTableHeading.map((data) => (
                  <TableCell
                    style={{
                      backgroundColor: "#35A5F5",
                      color: "#fff",
                      boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                      textAlign: "center",
                    }}
                  >
                    {data.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {adminList &&
                adminList.map((row, index) => {
                  return (
                    <TableRow key={index} className={classes.tablesection}>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                          color: "#fff",
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {row.firstName + row.lastName}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {row.email}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {row.mobileNumber}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {row.userType}
                      </TableCell>

                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {moment(row.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {!isLoading1 && adminList && adminList.length === 0 && (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    position: "absolute",
                    marginTop: "10px",
                  }}
                >
                  <DataNotFound />
                </Box>
              )}
              {isLoading1 && (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    position: "absolute",
                    marginTop: "10px",
                  }}
                >
                  <ButtonCircularProgress />
                </Box>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box mt={2} mb={2} display="flex" justifyContent="center">
          <Pagination
            count={noOfPages}
            page={page}
            onChange={(e, v) => setPage(v)}
          />
        </Box>
      </Box>
    </Box>
  );
}
