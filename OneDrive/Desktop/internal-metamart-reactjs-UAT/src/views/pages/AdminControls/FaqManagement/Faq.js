import React, { useContext, useEffect, useState } from "react";
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
import { UserContext } from "src/context/User";

function createData(title, description) {
  return { title, description };
}

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
      color: theme.palette.primary.main,
      fontFamily: "unset !important",
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

export default function FAQ() {
  const classes = useStyles();
  const history = useHistory();
  const user = useContext(UserContext);
  const particularPermition = user?.permissions?.faqManagement;
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

  const FaqdataApi = async () => {
    // setuserlist([]);
    try {
      setIsLoading(true);
      await axios
        .get(`${Apiconfig.faqList}?page=${page}&limit=${perPage}`)
        .then(async (res) => {
          if (res.data.statusCode == 200) {
            setuserlist(res.data?.result?.docs);
            setnoOfPages(res.data?.result?.pages);
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
    FaqdataApi();
  }, [page]);

  const handledeleteFAQ = async (id1) => {
    try {
      const res = await axios({
        method: "DELETE",
        url: Apiconfig.deleteFAQ,
        headers: {
          token: sessionStorage.getItem("token"),
        },
        data: {
          _id: idd1._id,
        },
      }).then(async (res) => {
        if (res.data.statusCode === 200) {
          FaqdataApi();
          setOpen1(false);
          // setDeleteData(res.data.result);

          toast.success("Successfully deleted");
          // toast.success("Successfully deleted", {
          //   position: "top-right",
          //   theme: "colored",
          //   autoClose: 3000,
          //   hideProgressBar: true,
          // });
        }
        // setOpen1(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Box className={classes.mainBox}>
          <Box className="heading" m={"16px 0px"}>
            <Typography variant="h2" color="primary">
              {" "}
              Faq{" "}
            </Typography>
            {/* <Button
              variant="contained"
              color="primary"
              // className={classes.btn}
              onClick={() => history.push("/add-faqdata")}
            >
              Add New
            </Button> */}
            <BootstrapTooltip title={isWrite ? "" : "Not permitted to write!"}>
              <Button
                variant="contained"
                color="primary"
                // className={classes.btn}
                onClick={() => {
                  if (isWrite) {
                    history.push("/add-faqdata");
                  }
                }}
              >
                Add New
              </Button>
            </BootstrapTooltip>
          </Box>
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
                    <TableCell>Question</TableCell>
                    <TableCell>Answer</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                {isLoading ? (
                  <Box display="flex" alignItems="center" ml={2}>
                    <h4 style={{ fontFamily: "Roboto" }}>Loading....</h4>{" "}
                    <ButtonCircularProgress />
                  </Box>
                ) : (
                  <TableBody>
                    {userlist.map((data, index) => (
                      <TableRow key={index} className={classes.tableRow1}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell
                          align="left"
                          className={classes.descriptionText}
                        >
                          <Typography> {data.question}</Typography>
                        </TableCell>
                        <TableCell align="left">
                          <div
                            className={classes.descriptionText}
                            dangerouslySetInnerHTML={{ __html: data.answer }}
                          />
                          {/* {data.answer} */}
                        </TableCell>
                        <TableCell align="left">{data.status}</TableCell>

                        <TableCell align="left">
                          <Box display="flex" justifyContent="center">
                            <>
                              <BootstrapTooltip title="View Faq">
                                <Button
                                  onClick={() =>
                                    history.push({
                                      pathname: "/view-faqdata",
                                      state: { data },
                                    })
                                  }
                                  // variant="contained"
                                  // color="primary"
                                  className={classes.button}
                                >
                                  <VisibilityIcon
                                    style={{ width: "25px", color: "52565c" }}
                                  />
                                </Button>
                              </BootstrapTooltip>
                            </>
                            <>
                              <BootstrapTooltip
                                title={
                                  isWrite
                                    ? "Edit faq"
                                    : "Not permitted to write!"
                                }
                              >
                                <Button
                                  // variant="contained"
                                  // color="primary"
                                  className={classes.button}
                                  onClick={() => {
                                    if (isWrite) {
                                      history.push({
                                        pathname: "/editfaq-list",
                                        search: data._id,
                                      });
                                    }
                                  }}
                                >
                                  <EditIcon
                                    style={{ width: "25px", color: "52565c" }}
                                  />{" "}
                                </Button>
                              </BootstrapTooltip>
                            </>
                            <>
                              {/* <BootstrapTooltip title="Delete Faq"> */}
                              <BootstrapTooltip
                                title={
                                  isDelete
                                    ? "Delete Faq"
                                    : "Not permitted to write!"
                                }
                              >
                                <Button
                                  // onClick={() => {
                                  //   handleblock(userlist._id);
                                  // }}
                                  onClick={() => {
                                    if (isDelete) {
                                      OpenModal1(data);
                                    }
                                  }}
                                  className={classes.button}
                                >
                                  <DeleteIcon
                                    style={{ width: "25px", color: "52565c" }}
                                  />
                                </Button>
                              </BootstrapTooltip>
                            </>
                          </Box>
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
        <Dialog
          open={open1}
          // TransitionComponent={Transition}
          keepMounted
          onClose={handleClose1}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-title">
            <Typography variant="h5" color="primary">
              Delete Faq?
            </Typography>
          </DialogTitle>
          <DialogContent style={{ marginTop: "-8px" }}>
            <DialogContentText
              id="alert-dialog-description"
              style={{ fontSize: "16px" }}
            >
              <Typography variant="body2" color="primary">
                Are you sure you want to Delete this Faq ?
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.butm}>
            <Box>
              <Button
                style={{ marginRight: "5px" }}
                onClick={() => {
                  handledeleteFAQ(idd1);
                }}
                variant="contained"
                color="primary"
              >
                Yes {}
              </Button>
              <Button
                onClick={handleClose1}
                variant="outlined"
                color="primary"
                size="large"
              >
                No
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
