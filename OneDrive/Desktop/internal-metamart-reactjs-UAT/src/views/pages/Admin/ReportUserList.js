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
  Button,
  makeStyles,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { toast } from "react-toastify";

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import apiConfig from "src/ApiConfig/ApiConfig";
import { Pagination } from "@material-ui/lab";
import moment from "moment";
import { sortAddress } from "src/utils";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Tooltip } from "@material-ui/core";
import DataNotFound from "src/component/DataNotFound";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import BlockIcon from "@material-ui/icons/Block";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  btnbox1: {
    "& button": {
      borderRadius: "10px",
      fontWeight: "600",
      fontSize: "14px",
      marginRight: "4px",
      "@media(max-width:767px)": {
        marginTop: "1rem",
      },
      "&.active": {
        color: "#fff",
        boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
        backgroundColor: "#D200A5",
      },
    },
  },
  heading: {
    "& h4": {
      fontSize: "40px",
      fontWeight: "700",
      color: theme.palette.secondary.main,
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
    width: "100%",
    height: "auto",
    background: "#F4FCFA",
    // backdropFilter: "blur(44px)",
    borderRadius: "15px",
    padding: "20px",
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
  // { id: "ID", label: "User Id", align: "left", maxWidth: "160px" },
  { id: "Wallet Address", label: "Artist", align: "left", minWidth: "160px" },
  {
    id: "ReporterName",
    label: "Reporter Name",
    align: "left",
    maxWidth: "160px",
  },
  { id: "Message", label: "Message", align: "left", minWidth: "160px" },
  // {
  //   id: "NoBids",
  //   label: "No Of Bids",
  //   align: "left",
  //   minWidth: "130px",
  // },

  {
    id: "Date",
    label: "Date & Time",
    align: "left",
    minWidth: "160px",
  },
  { id: " Action", label: " Action", align: "left", minWidth: "160px" },
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

export default function ReportedUserList({ callbackFun }) {
  const classes = useStyles();
  const history = useHistory();
  const [reportsList, setReportsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [Check, setCheck] = useState("");

  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);

  const reportsListHandler = async (cancelTokenSource) => {
    setIsLoading(true);

    try {
      const res = await axios({
        method: "GET",
        url: apiConfig.listUserToUserReport,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        params: {
          page: page,
          limit: 20,
          // cancelToken: cancelTokenSource && cancelTokenSource.token,
        },
      });
      if (res.data.statusCode == 200) {
        setIsLoading(false);

        if (res.data.result.docs) {
          // const filetrnftdata = res.data.result.docs.filter((data) => {
          //   return data?.reportType === "USER_REPORT";
          // });
          // setReportsList(filetrnftdata);
          setReportsList(res.data.result.docs);
          setNoOfPages(res.data.result.pages);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    reportsListHandler(cancelTokenSource);
    return () => {
      cancelTokenSource.cancel();
    };
  }, [page]);

  const blockUserHandler = async (id) => {
    try {
      const res = await axios({
        method: "GET",
        url: apiConfig.blockReport + id,

        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        // data: {
        //   _id: id,
        // },
      });

      if (res.data.statusCode === 200) {
        setCheck(res.data.result?.orderReportRes?.actionApply);
        if (res.data.result?.orderReportRes?.actionApply != true) {
          toast.success(res.data.responseMessage);
        } else {
          toast.error(res.data.responseMessage);
        }

        // toast.success("User have been blocked");
        reportsListHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [comment, setComment] = React.useState([]);
  const OpenModal = (message) => {
    setComment(message);

    setOpen(true);
  };
  const pageCheck = page === 1 ? 20 : 0;
  return (
    <Box>
      <Box>
        <TableContainer className="tableHead">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {TableHeading.map((data) => (
                  <TableCell
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {data.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {reportsList &&
                reportsList.map((row, index) => {
                  return (
                    <TableRow key={index} className={classes.tablesection}>
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
                        {row?.userId?.userName
                          ? row?.userId?.userName
                          : sortAddress(row?.userId?.walletAddress)}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {row?.name}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          textAlign: "center",
                          display: " flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "20px",
                        }}
                      >
                        <Typography
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "90px",
                            fontSize: "16px",
                          }}
                        >
                          {" "}
                          {row.message}
                        </Typography>
                        <BootstrapTooltip title="View more">
                          <VisibilityIcon
                            onClick={() => {
                              OpenModal(row.message);
                            }}
                            style={{
                              fontSize: "24px",
                              cursor: "pointer",
                              marginLeft: "30px",
                              color: "#5f5a5a",
                            }}
                          />
                        </BootstrapTooltip>{" "}
                      </TableCell>
                      {/* <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {row.orderId?.bidId?.length}
                      </TableCell> */}

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
                          }}
                        >
                          <BootstrapTooltip title="View User Details">
                            <VisibilityIcon
                              onClick={() => {
                                history.push({
                                  pathname: "/author",
                                  search: row?.userId?._id,
                                });
                              }}
                              style={{
                                fontSize: "25px",
                                cursor: "pointer",
                                marginRight: "5px",
                              }}
                            />
                          </BootstrapTooltip>

                          {/* <BootstrapTooltip title="Block">
                            <BlockIcon
                              fontSize="small"
                              style={{
                                fontSize: "22px",
                                cursor: "pointer",
                                marginTop: "2px",
                              }}
                            />
                          </BootstrapTooltip> */}
                          {/* <BootstrapTooltip
                            title={
                              row?.status === "BLOCK" ? "Unblock" : "Block"
                            }
                          >
                            {row?.userId?.userType !== "Admin" ? (
                              <BlockIcon
                                fontSize="small"
                                style={
                                  Check === true
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
                          </BootstrapTooltip> */}
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {isLoading && <ButtonCircularProgress />}
            </TableBody>
          </Table>
        </TableContainer>
        {!isLoading && reportsList && reportsList.length === 0 && (
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
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            {/* <DialogTitle id="alert-dialog-title">
              {"Use Google's location service?"}
            </DialogTitle> */}
            <DialogContent>
              <DialogContentText
                id="alert-dialog-description"
                style={{ whiteSpace: " break-spaces" }}
              >
                {comment}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
        {reportsList && reportsList.length >= pageCheck ? (
          <Box mt={2} mb={2} display="flex" justifyContent="center">
            <Pagination
              count={noOfPages}
              page={page}
              onChange={(e, v) => setPage(v)}
            />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
