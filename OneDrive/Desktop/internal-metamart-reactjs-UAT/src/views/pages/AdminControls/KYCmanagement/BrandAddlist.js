import {
  Box,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Typography,
  DialogTitle,
  DialogContentText,
  Container,
  Button,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import BlockIcon from "@material-ui/icons/Block";
import React, { useState, useEffect } from "react";
import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { Pagination } from "@material-ui/lab";
import DataNotFound from "src/component/DataNotFound";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import moment from "moment";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import Filter from "src/component/Filter";
import * as XLSX from "xlsx";
import { UserContext } from "src/context/User";

const useStyles = makeStyles((theme) => ({
  root2: {
    marginTop: "8px",
    display: "flex",
    justifyContent: "space-between",
    "@media(max-width:420px)": {
      display: "block",
    },
  },
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
}));

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

export default function BrandAddlist() {
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const user = React.useContext(UserContext);
  const particularPermition = user?.permissions?.kycManagement;
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
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [status, setStatus] = useState("na");

  // console.log("Dssadasdasdasdasda", fromDate);
  const [noOfPages, setNoOfPages] = useState(1);
  const [totalLimit, settotalLimit] = useState(1);
  const [categorylist, setCategorylist] = useState([]);
  const [dataToExport, setdataToExport] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCSV, setIsLoadingCSV] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [deleteLoader, setdeleteLoader] = useState(false);
  const [isClear, setIsClear] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [Id, setId] = useState();

  const handleClickOpenDelete = (data) => {
    setOpen2(true);
    setId(data);
  };

  const listCategoryApi = async () => {
    setCategorylist([]);
    setIsLoading(true);
    try {
      let kycStatus;
      if (status == "na") {
      } else {
        kycStatus = status;
      }
      const res = await axios({
        method: "POST",
        url: Apiconfigs.listkyc,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          page: page,
          limit: 10,
          kycStatus,
          search: search ? search : undefined,
          // fromDate: fromDate ? moment(fromDate).format("lll") : undefined,
          // toDate: toDate ? moment(toDate).format("lll")  : undefined,
        },
      });
      if (res.data.statusCode === 200) {
        setCategorylist(res.data.result.docs);
        // setdataToExport(res.data.result.docs);
        setIsLoading(false);
        setNoOfPages(res.data.result.pages);
        settotalLimit(res.data.result.total);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const downLoadCSV = async () => {
    // setCategorylist([]);
    setIsLoadingCSV(true);
    try {
      let kycStatus;
      if (status == "na") {
        kycStatus = "";
      } else {
        kycStatus = status;
      }
      const res = await axios({
        method: "POST",
        url: Apiconfigs.listkyc,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          page: 1,
          limit: totalLimit,
          kycStatus,
          search: search ? search : undefined,
          // fromDate: fromDate ? moment(fromDate).format("lll") : undefined,
          // toDate: toDate ? moment(toDate).format("lll")  : undefined,
        },
      });
      if (res.data.statusCode === 200) {
        let dataToExport = res.data.result.docs;
        let name = "KYC_lists";
        // setdataToExport(res.data.result.docs);
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

  useEffect(() => {
    listCategoryApi();
  }, [isSubmit, page]);
  useEffect(() => {
    if (search == "" && isClear) {
      listCategoryApi();
    }
  }, [search, isClear]);

  const pageCheck = page === 1 ? 20 : 0;

  const [isChecked, setIsChecked] = useState(true);
  const sortAmountHandler = (data) => {
    try {
      if (data.length === 0) {
        return;
      }
      data.sort(function (a, b) {
        if (isChecked) {
          return moment(b?.updatedAt).unix() - moment(a?.updatedAt).unix();
        } else {
          return moment(a?.updatedAt).unix() - moment(b?.updatedAt).unix();
        }
      });
      setIsChecked(!isChecked);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box>
        <Container>
          <Box className={classes.colorbox} mt={1}>
            <Box className={classes.root2}>
              <Box pb={3} className={classes.heading}>
                <Typography variant="h2" color="primary">
                  KYC Management
                </Typography>
              </Box>
            </Box>
            <Filter
              setSearch={setSearch}
              search={search}
              fromData={fromDate}
              setFromData={setFromDate}
              toData={toDate}
              setToData={setToDate}
              status={status}
              setIsSubmit={setIsSubmit}
              isSubmit={isSubmit}
              setStatus={setStatus}
              dataToExport={dataToExport}
              isClear={isClear}
              setIsClear={setIsClear}
              downLoadCSV={downLoadCSV}
              isLoadingCSV={isLoadingCSV}
              name={"KYC_lists"}
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
                        Name
                      </TableCell>
                      <TableCell
                        color="primary"
                        style={{
                          textAlign: "center",
                        }}
                      >
                        ID
                      </TableCell>
                      <TableCell
                        color="primary"
                        style={{
                          textAlign: "center",
                        }}
                      >
                        Front Image
                      </TableCell>
                      <TableCell
                        color="primary"
                        style={{
                          textAlign: "center",
                        }}
                      >
                        Back Image
                      </TableCell>
                      <TableCell
                        color="primary"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        Date & Time
                        <SwapVertIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => sortAmountHandler(categorylist)}
                        />
                      </TableCell>
                      <TableCell
                        color="primary"
                        style={{
                          textAlign: "center",
                        }}
                      >
                        Status
                      </TableCell>
                      <TableCell
                        color="primary"
                        style={{
                          textAlign: "center",
                        }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categorylist &&
                      categorylist?.map((data, index) => {
                        return (
                          <TableRow
                            key={index}
                            className={classes.tablesection}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              style={{
                                textAlign: "center",
                                textTransform: "capitalize",
                                color: "#52565c",
                              }}
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                textAlign: "center",

                                textTransform: "capitalize",
                              }}
                            >
                              {data?.firstName}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                textAlign: "center",
                                textTransform: "capitalize",
                              }}
                            >
                              {(data?.passport &&
                                data?.passport?.documentName) ||
                                (data?.driving &&
                                  data?.driving?.documentName) ||
                                (data?.national &&
                                  data?.national?.documentName)}
                            </TableCell>

                            <TableCell
                              align="left"
                              style={{
                                textAlign: "center",
                                textTransform: "capitalize",
                              }}
                            >
                              {/* <BootstrapTooltip title="View image"> */}
                              <img
                                src={
                                  (data?.passport &&
                                    data?.passport?.frontImage) ||
                                  (data?.driving &&
                                    data?.driving?.frontImage) ||
                                  (data?.national && data?.national?.frontImage)
                                }
                                // onClick={() => imageData(data.categoryIcon)}
                                style={{
                                  // cursor: "pointer",
                                  height: "30px",
                                  width: "30px",
                                  borderRadius: "50%",
                                }}
                                alt=""
                              />

                              {/* </BootstrapTooltip> */}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                textAlign: "center",
                                textTransform: "capitalize",
                              }}
                            >
                              {/* <BootstrapTooltip title="View image"> */}
                              {data?.passport?.backImage && (
                                <img
                                  src={
                                    (data?.passport &&
                                      data?.passport?.backImage) ||
                                    (data?.driving &&
                                      data?.driving?.backImage) ||
                                    (data?.national &&
                                      data?.national?.backImage)
                                  }
                                  style={{
                                    // cursor: "pointer",
                                    height: "30px",
                                    width: "30px",
                                    borderRadius: "50%",
                                  }}
                                  alt=""
                                />
                              )}
                              {data?.national?.backImage && (
                                <img
                                  src={
                                    (data?.passport &&
                                      data?.passport?.backImage) ||
                                    (data?.driving &&
                                      data?.driving?.backImage) ||
                                    (data?.national &&
                                      data?.national?.backImage)
                                  }
                                  style={{
                                    // cursor: "pointer",
                                    height: "30px",
                                    width: "30px",
                                    borderRadius: "50%",
                                  }}
                                  alt=""
                                />
                              )}

                              {/* </BootstrapTooltip> */}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                textAlign: "center",
                                textTransform: "capitalize",
                              }}
                            >
                              {moment(data?.updatedAt).format("lll")}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                textAlign: "center",
                                textTransform: "capitalize",
                              }}
                            >
                              {data?.approveStatus === "REJECTED" && (
                                <Typography style={{ color: "red" }}>
                                  {data?.approveStatus}
                                </Typography>
                              )}
                              {data?.approveStatus === "APPROVED" && (
                                <Typography style={{ color: "green" }}>
                                  {data?.approveStatus}
                                </Typography>
                              )}
                              {data?.approveStatus === "PENDING" && (
                                <Typography style={{ color: "#f6b00c" }}>
                                  {data?.approveStatus}
                                </Typography>
                              )}
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
                                <BootstrapTooltip title="View KYC Details">
                                  <VisibilityIcon
                                    onClick={() => {
                                      history.push({
                                        pathname: "/view-kycdetails",
                                        search: data?._id?.toString(),
                                      });
                                    }}
                                    style={{
                                      fontSize: "25px",
                                      cursor: "pointer",
                                    }}
                                  />
                                </BootstrapTooltip>

                                {data?.brandApproval === "APPROVE" && (
                                  <BootstrapTooltip title="Block Category">
                                    <BlockIcon
                                      fontSize="small"
                                      // style={{
                                      //   fontSize: "22px",
                                      //   cursor: "pointer",
                                      //   marginTop: "2px",
                                      // }}

                                      style={
                                        data?.status === "BLOCK"
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
                                      onClick={() =>
                                        handleClickOpenDelete(data)
                                      }
                                    />
                                  </BootstrapTooltip>
                                )}
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
                {!isLoading && categorylist && categorylist.length === 0 && (
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
              </TableContainer>
            </Box>
            <>
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
                    onChange={(e, v) => setPage(v)}
                  />
                </Box>
              )}
            </>
          </Box>
        </Container>
      </Box>

      {/* <Dialog
        open={open5}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {imagedata}
          </DialogContentText>
        </DialogContent>
      </Dialog> */}

      <Dialog
        open={open2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography style={{ color: " #039be3", fontSize: "17px" }}>
            {/* {"Delete Category?"} */}
          </Typography>
        </DialogTitle>
        <DialogContent style={{ marginTop: "-8px" }}>
          <DialogContentText
            id="alert-dialog-description"
            style={{ fontSize: "16px" }}
          >
            {`Are you sure you want to ${
              Id?.status === "BLOCK" ? "ACTIVE" : "BLOCK"
            } the Brand?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ marginTop: "-16px", fontSize: "16px" }}>
          <Button
            variant="contained"
            color="primary"
            // onClick={() => deleteCategory(Id?._id)}
            autoFocus
          >
            Yes
            {deleteLoader && (
              <ButtonCircularProgress
                style={{ height: "25px", width: "25px", marginLeft: "5px" }}
              />
            )}
          </Button>
          <Button
            onClick={() => setOpen2(false)}
            variant="contained"
            color="primary"
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
