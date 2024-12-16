import {
  Box,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Typography,
  InputAdornment,
  InputBase,
  Button,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import BlockIcon from "@material-ui/icons/Block";
import React, { useState, useEffect } from "react";
import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { sortAddress } from "src/utils";
import { useHistory } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import axios from "axios";
import apiConfig from "src/ApiConfig/ApiConfig";
import { Pagination } from "@material-ui/lab";
import DataLoading from "src/component/DataLoading";
import DataNotFound from "src/component/DataNotFound";
import { Link } from "react-router-dom";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import moment from "moment";
import { Delete, Edit } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root2: {
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
    width: "100%",
    height: "auto",
    // background: "rgba(59, 13, 96, 0.4)",
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
  { id: "title", label: "Title", align: "left", minWidth: "160px" },

  {
    id: "description",
    label: "Description",
    align: "left",
    minWidth: "160px",
  },
  {
    id: "date",
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

export default function About({ data }) {
  const history = useHistory();
  const classes = useStyles();
  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [aboutList, setAboutList] = useState([]);

  const deleteFaqHandler = async (id) => {
    try {
      const res = await axios({
        method: "DELETE",
        url: Apiconfigs.deleteFAQ,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          _id: id,
        },
      });
      if (res.data.statusCode === 200) {
        //   faqListHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Box className={classes.colorbox} mt={10}>
        <Box className={classes.root2}>
          <Box className={classes.heading}>
            <Typography variant="h4">About Management</Typography>
          </Box>
          <Box className="d-flex" style={{ padding: "5px" }}>
            <Link to={"/about-add"} style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                Add About Us
              </Button>
            </Link>
          </Box>
        </Box>
        <Box
          style={{ border: "1px solid #3b0d60", borderRadius: "11px" }}
          mt={2}
        >
          <TableContainer className="tableHead">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {TableHeading.map((data) => (
                    <TableCell
                      style={{
                        backgroundColor: "rgb(53, 165, 245)",
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
                {data.slice(1, 2).map((row, index) => {
                  return (
                    <TableRow key={index} className={classes.tablesection}>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
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
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {row?.title}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {row?.description}
                      </TableCell>

                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {moment(row.updatedAt).format("lll")}
                      </TableCell>

                      <TableCell
                        style={{
                          width: 5,
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
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
                          <BootstrapTooltip title="View Faq Details">
                            <VisibilityIcon
                              onClick={() => {
                                history.push({
                                  pathname: "/faqview",
                                  search: row?.userId?.toString(),
                                  hash: row?._id,
                                });
                              }}
                              style={{
                                fontSize: "25px",
                                cursor: "pointer",
                                marginRight: "5px",
                              }}
                            />
                          </BootstrapTooltip>

                          <BootstrapTooltip title="Delete this Faq">
                            <Delete
                              fontSize="small"
                              style={{
                                fontSize: "22px",
                                cursor: "pointer",
                                marginTop: "2px",
                              }}
                              onClick={() => deleteFaqHandler(row?._id)}
                            />
                          </BootstrapTooltip>
                          <BootstrapTooltip title="Edit this Faq">
                            <Edit
                              fontSize="small"
                              style={{
                                fontSize: "22px",
                                cursor: "pointer",
                                marginTop: "2px",
                              }}
                              onClick={() => {
                                history.push({
                                  pathname: "/faqupdate",
                                  search: row?.userId?.toString(),
                                  hash: row?._id,
                                });
                              }}
                            />
                          </BootstrapTooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {/* {isLoading ? (
            <DataLoading />
          ) : (
            <>
              {requestList.length === 0 ? (
                <DataNotFound />
              ) : (
              
              )}
              <Box mt={2} display="flex" justifyContent="center">
                <Pagination
                  count={noOfPages}
                  page={page}
                  onChange={(e, v) => setPage(v)}
                />
              </Box>
            </>
          )} */}
      </Box>
    </Box>
  );
}
