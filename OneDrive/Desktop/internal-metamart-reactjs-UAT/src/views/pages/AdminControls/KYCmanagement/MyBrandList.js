import {
  Box,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Typography,
  Paper,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import BlockIcon from "@material-ui/icons/Block";
import { toast } from "react-toastify";
import { UserContext } from "src/context/User";
import React, { useState, useEffect, useContext } from "react";
import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { sortAddress } from "src/utils";
import { useHistory } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import apiConfig from "src/ApiConfig/ApiConfig";
import { Pagination } from "@material-ui/lab";
import DataLoading from "src/component/DataLoading";
import DataNotFound from "src/component/DataNotFound";
import { Link } from "react-router-dom";
import { GiCancel, GiPaintBrush } from "react-icons/gi";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import moment from "moment";
import { Delete, Edit } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root2: {
    // marginBottom: "32px",
    display: "flex",
    justifyContent: "space-between",
    "@media(max-width:420px)": {
      display: "block",
    },
  },
  heading: {},
  tablesection: {
    "& td": {
      color: "#52565c",
    },
  },

  tablecontainer: {
    overflow: "auto",
    borderRadius: "10px",
    "@media(max-width:991px)": {
      overflow: "scroll",
    },
    "& tableCellBox": {
      backgroundColor: theme.palette.background.form,
    },
  },
  table: {
    minWidth: 700,
  },
}));
const TableHeading = [
  {
    id: "Sr.No",
    label: "Sr.No",
    align: "left",
    minWidth: "25px",
    maxWidth: "30px",
  },
  { id: "name", label: "Name", align: "left", minWidth: "160px" },

  {
    id: "categoryicon",
    label: "Icon",
    align: "left",
    minWidth: "160px",
  },
  {
    id: "date",
    label: "Date & Time",
    align: "left",
    minWidth: "160px",
  },
  {
    id: "status",
    label: "Status",
    align: "left",
    minWidth: "100px",
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

export default function BrandAddlist() {
  const history = useHistory();
  const classes = useStyles();
  const user = useContext(UserContext);
  const [coverFileBase, setCoverFileBase] = useState("");
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [categorylist, setCategorylist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [Id, setId] = useState();
  const [formValue, setFormValue] = useState({
    CategoryName: "",
  });
  const handleClickOpenDelete = (data) => {
    setOpen2(true);
    setId(data);
  };
  const listCategoryApi = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "POST",
        url: Apiconfigs.myAllBrandList,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          page: page,
          limit: 12,
        },
      });
      if (res.data.statusCode === 200) {
        setCategorylist(res.data.result.docs);
        setIsLoading(false);
        setNoOfPages(res.data.result.pages);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    listCategoryApi();
  }, [page]);

  useEffect(() => {
    listCategoryApi();
  }, [user.userData]);

  return (
    <>
      <Box>
        <Box className={classes.root2}>
          <Box className={classes.heading}>
            <Typography variant="h2" color="primary">
              My Brand List
            </Typography>
          </Box>
        </Box>
        <Box className={classes.colorbox} mt={1}>
          <Box mt={2}>
            <TableContainer className={classes.tablecontainer}>
              <Table
                className={classes.table}
                stickyHeader
                aria-label="sticky table"
              >
                <TableHead>
                  <TableRow>
                    {TableHeading.map((data) => (
                      <TableCell
                        className="tableCellBox"
                        color="primary"
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
                  {categorylist &&
                    categorylist?.map((data, index) => {
                      return (
                        <TableRow key={index} className={classes.tablesection}>
                          <TableCell
                            component="th"
                            scope="row"
                            style={{
                              textAlign: "center",
                              textTransform: "capitalize",
                              color: "#52565c",
                              borderRadius: "7px 0 0 0",
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
                            {data?.brandName}
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
                              src={data?.brandLogo}
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
                            {moment(data?.updatedAt).format("lll")}
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{
                              textAlign: "center",
                              textTransform: "capitalize",
                            }}
                          >
                            {data?.brandApproval === "REJECTED" && (
                              <Typography style={{ color: "red" }}>
                                {data?.brandApproval}
                              </Typography>
                            )}
                            {data?.brandApproval === "APPROVED" && (
                              <Typography style={{ color: "green" }}>
                                {data?.brandApproval}
                              </Typography>
                            )}
                            {data?.brandApproval === "PENDING" && (
                              <Typography style={{ color: "#f6b00c" }}>
                                {data?.brandApproval}
                              </Typography>
                            )}
                          </TableCell>

                          <TableCell
                            style={{
                              width: 5,
                              borderRadius: "1px 8px 0px 0px",
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
                              <BootstrapTooltip title="View Brand Details">
                                <VisibilityIcon
                                  onClick={() => {
                                    history.push({
                                      pathname: "/my-viewbrand",
                                      search: data?._id?.toString(),
                                    });
                                  }}
                                  style={{
                                    fontSize: "25px",
                                    cursor: "pointer",
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
          </Box>
          <>
            {categorylist.length != 0 ? (
              <Box
                className={classes.tabBtn}
                pt={5}
                display="flex"
                justifyContent="end"
              >
                <Pagination
                  count={noOfPages}
                  page={page}
                  onChange={(e, v) => setPage(v)}
                />
              </Box>
            ) : (
              ""
            )}
          </>
        </Box>
      </Box>
    </>
  );
}
