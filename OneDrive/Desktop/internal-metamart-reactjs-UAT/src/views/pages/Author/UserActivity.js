// UserActivity

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Slide,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import { Tooltip } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import Apiconfig from "src/ApiConfig/ApiConfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataNotFound from "src/component/DataNotFound";
import moment from "moment";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  mainBox: {
    paddingTop: "20px",
    margin: "8px",
    [theme.breakpoints.down("sm")]: {
      margin: "0px 10px",
    },
    "& .heading": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    // '& .tableHead': {
    //   backgroundColor: 'rgb(53, 165, 245)',
    // },
  },
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#e0e0e0",
    },
  },

  button: {
    minWidth: "initial",
    padding: "6px",
    // marginLeft: '7px',
  },
  btn: {
    color: "#FFFFFF",
    backgroundColor: "#252d47",
    height: "44px",
    "&:hover": {
      background:
        "linear-gradient(124deg, rgba(47, 89, 149, 0.81) 18.76%, rgba(21, 29, 42, 0.87) 43.13%, rgba(0, 88, 241, 0.65) 96.83%)",
    },
  },
  butm: {
    display: "flex",
    justifyContent: "end",
    // "&:hover": {
    //         background: "linear-gradient(124deg, rgba(47, 89, 149, 0.81) 18.76%, rgba(21, 29, 42, 0.87) 43.13%, rgba(0, 88, 241, 0.65) 96.83%)"

    // },
  },
  butm1: {
    backgroundColor: "#252d47",
    color: "#fff",
    "&:hover": {
      background:
        "linear-gradient(124deg, rgba(47, 89, 149, 0.81) 18.76%, rgba(21, 29, 42, 0.87) 43.13%, rgba(0, 88, 241, 0.65) 96.83%)",
    },
  },
  butm2: {
    backgroundColor: "#252d47",
    color: "#fff",
    "&:hover": {
      background:
        "linear-gradient(124deg, rgba(47, 89, 149, 0.81) 18.76%, rgba(21, 29, 42, 0.87) 43.13%, rgba(0, 88, 241, 0.65) 96.83%)",
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
  tableRow1: {
    "& th": {
      color: "#fff",
      boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
      textAlign: "center",
    },
    "& td": {
      textAlign: "center",
      textTransform: "capitalize",
      color: "#52565c",
      fontSize: "12px",
      maxWidth: "200px",
      wordBreak: "break-word",
    },
  },

  descriptionText: {
    "& figure": {
      marginLeft: "0",
    },
    "& a": {
      color: theme.palette.primary.main,
      background: "unset !important",
    },
    "& td": {
      border: "0.5px solid",
      padding: "0 2px",
      borderColor: theme.palette.primary.main,
      whiteSpace: "pre",
    },
    "& span, section": {
      background: "unset !important",
      color: theme.palette.secondary.main,
      fontSize: "12px",
      textOverflow: "ellipsis",

      overflow: "hidden",
      width: "100%",
      whiteSpace: "nowrap",
      //   background: "unset !important",
      //   color: theme.palette.primary.main,
      //   fontFamily: "unset !important",
    },
    "& iframe": {
      width: "100%",
      // overflow: "hidden",
      display: "inherit",
    },
    "& img": {
      maxWidth: "100%",
      height: "auto",
    },

    "& >*": {
      color: theme.palette.primary.main,
      wordBreak: "break-word",
      overflow: "auto",
    },
    "& h4": {
      background: "unset !important",
      color: theme.palette.primary.main,
      // fontSize: "30px",
      // lineHeight: "42px",
      overflow: "visible",
      fontWeight: "600",
      marginBottom: "15px",
    },
    "& h5": {
      background: "unset !important",
      color: theme.palette.primary.main,
      // fontSize: "17px",
      // lineHeight: "23px",
      fontWeight: "500",
    },
    "& h1": { background: "unset !important", overflow: "visible" },
    "& h2": { background: "unset !important" },
    "& h3": { background: "unset !important" },
    "& span": { background: "unset !important" },
    "& p": {
      background: "unset !important",
      color: theme.palette.secondary.main,
      fontSize: "12px",
      textOverflow: "ellipsis",

      overflow: "hidden",
      width: "100%",
      whiteSpace: "nowrap",
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
const trimData = (value) => {
  let data = value.split("_").join(" ");
  return data;
};
export default function UserActivity({ userId }) {
  const classes = useStyles();
  const history = useHistory();
  const [userlist, setuserlist] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setperPage] = useState(10);
  const [noOfPages, setnoOfPages] = useState(0);

  const [idd1, setidd1] = React.useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [open1, setOpen1] = React.useState(false);

  //   // const OpenModal = (id) => {
  //   //   setidd1(id);
  //   //   setOpen(true);
  //   // };

  const OpenModal1 = (id) => {
    setidd1(id);
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const UserActivityApiHandler = async () => {
    // setuserlist([]);
    try {
      setIsLoading(true);
      await axios
        .get(`${Apiconfig.userListActivity}?userId=${userId}`)
        .then(async (res) => {
          if (res.data.statusCode == 200) {
            //   let FindsData = ["aml", "kycRule"];

            //   let filterData = res.data?.result.filter((element) =>
            //     FindsData.includes(element.type)
            //   );
            setuserlist(res.data?.result);
            //   setnoOfPages(res.data?.result?.pages);
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        });
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    if (userId) UserActivityApiHandler();
  }, []);
  return (
    <>
      <Container>
        <Box className={classes.mainBox}>
          {/* <Box className="heading" m={"16px 0px"}>
            <Typography variant="h2" color="primary">
              {" "}
              Static Content{" "}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              // className={classes.btn}
              onClick={() => history.push("/add-static")}
            >
              Add New
            </Button>
          </Box> */}
          <Box style={{ borderRadius: "11px" }}>
            <TableContainer className="tableHead">
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      color="primary"
                      style={{
                        textAlign: "center",
                      }}
                    >
                      S.No
                    </TableCell>
                    <TableCell
                      color="primary"
                      style={{
                        textAlign: "center",
                      }}
                    >
                      Activity Name
                    </TableCell>
                    <TableCell
                      color="primary"
                      style={{
                        textAlign: "center",
                      }}
                    >
                      Title
                    </TableCell>
                    <TableCell
                      color="primary"
                      style={{
                        textAlign: "center",
                      }}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      color="primary"
                      style={{
                        textAlign: "center",
                      }}
                    >
                      Created At
                    </TableCell>
                  </TableRow>
                </TableHead>
                {isLoading ? (
                  <Box display="flex" alignItems="center" ml={2}>
                    <h4 style={{ fontFamily: "Roboto" }}>Loading....</h4>{" "}
                    <ButtonCircularProgress />
                  </Box>
                ) : (
                  <TableBody>
                    {userlist &&
                      userlist.map((data, index) => (
                        <TableRow key={index} className={classes.tableRow1}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell
                            align="left"
                            className={classes.descriptionText}
                          >
                            <Typography> {trimData(data.type)}</Typography>
                          </TableCell>
                          <TableCell
                            align="left"
                            className={classes.descriptionText}
                          >
                            <Typography>
                              {" "}
                              {data.title
                                ? data.title
                                : data.type
                                ? trimData(data.type)
                                : "-"}
                            </Typography>
                          </TableCell>
                          <TableCell
                            align="left"
                            className={classes.descriptionText}
                          >
                            {data.description ? data.description : "-"}
                          </TableCell>
                          <TableCell align="left">
                            {moment(data.createdAt).format("lll")}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                )}
              </Table>
              {userlist.length === 0 && (
                <Box pt={1} align="center" pb={1}>
                  <DataNotFound />
                </Box>
              )}
            </TableContainer>
            <Box
              className={classes.tabBtn}
              pt={5}
              display="flex"
              justifyContent="center"
            >
              <Pagination
                count={noOfPages}
                page={page}
                onChange={(e, v) => setPage(v)}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
