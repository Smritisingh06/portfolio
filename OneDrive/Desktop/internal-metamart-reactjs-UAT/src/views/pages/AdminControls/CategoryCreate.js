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
  IconButton,
  FormControl,
  InputAdornment,
  TextField,
  InputBase,
  Container,
  Button,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import BlockIcon from "@material-ui/icons/Block";
import { toast } from "react-toastify";
import CloseIcon from "@material-ui/icons/Close";
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
import About from "./about/About";
import ConfirmationDialogBox from "src/component/ConfirmationDialogBox";
import { UserContext } from "src/context/User";

const useStyles = makeStyles((theme) => ({
  root2: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
    whiteSpace: "pre",
    // '@media(max-width:420px)': {
    //   display: 'block',
    // },
  },
  heading: {},
  tablesection: {
    "& td": {
      color: "#52565c",
    },
  },
  colorbox: {
    // marginTop: "16px",
    // width: "100%",
    // background: "rgba(59, 13, 96, 0.4)",
    // backdropFilter: 'blur(44px)',
    borderRadius: "15px",
    padding: "20px 0px",
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
  textfiledlabel: {
    "& .MuiFormHelperText-contained": {
      marginRight: "14px",
      color: "#f77c68",
      fontSize: "14px",
      fontFamily: "'Sora', sans-serif",
      fontWeight: "400",
      lineHeight: "25px",
    },
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

export default function CreatorList() {
  const history = useHistory();
  const classes = useStyles();
  const [coverFileBase, setCoverFileBase] = useState("");
  const user = useContext(UserContext);
  const particularPermition = user?.permissions?.categoryManagement;
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
  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [categorylist, setCategorylist] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [bannerImage, setBannerImage] = useState("");
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [bannerImageBlob, setBannerImageBlob] = useState("");
  const [imgFile, setImgfile] = useState("");
  const [data1, setData] = useState("");
  const [open1, setOpen1] = useState(false);
  const [aboutList, setAboutList] = useState([]);
  const [deleteLoader, setdeleteLoader] = useState(false);
  const [Id, setId] = useState();

  const [open5, setOpen5] = React.useState(false);
  const [openActive, setOpenActive] = useState(false);
  const handleClickOpen = () => {
    setOpen5(true);
  };

  const handleClose = () => {
    setOpen5(false);
  };
  const [formValue, setFormValue] = useState({
    CategoryName: "",
  });
  const handleClickOpenDelete = (id) => {
    setOpen1(true);
    setId(id);
  };

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (err) {
      console.log("Error: ", err);
    };
  };
  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formValue, [name]: value };
    setFormValue(temp);
  };
  const listCategoryApi = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.listCategory,
        params: {
          limit: 12,
          page: page,
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

  const deleteCategory = async (id) => {
    try {
      setdeleteLoader(true);
      const res = await axios({
        method: "DELETE",
        url: Apiconfigs.deleteCategory,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          _id: id,
        },
      });
      if (res.data.statusCode === 200) {
        toast.success(res.data.responseMessage);

        listCategoryApi();
        setdeleteLoader(false);
        setOpen1(false);
      } else if (res.data.statusCode === 500) {
        toast.error(res.data.responseMessage);
        setdeleteLoader(false);
      } else {
        toast.error(res.data.responseMessage);
        setdeleteLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
      setdeleteLoader(false);
    }
  };

  useEffect(() => {
    listCategoryApi();
  }, [page]);

  const addcategoryHandler = async () => {
    setIsSubmit(true);

    if (
      formValue.displayName === undefined ||
      formValue.displayName.trim() === "" ||
      formValue.displayName.length > 26
    ) {
      toast.warn("Please enter valid data");
      return;
    }
    try {
      setIsLoading1(true);
      const formData = new FormData();
      formData.append("categoryIcon", imgFile);
      formData.append(
        "categoryTitle",
        formValue.displayName.trim().toLowerCase()
      );

      const res = await axios({
        method: "POST",
        url: Apiconfigs.addCategory,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: formData,
      });
      if (res.data.statusCode === 200) {
        setIsLoading1(false);
        setOpen(false);
        listCategoryApi();
        toast.success(res.data.responseMessage);
      } else if (res.data.responseCode === 404) {
        setIsLoading1(false);
        toast.error(res.data.responseMessage);
      } else if (res.data.statusCode === 500) {
        setIsLoading1(false);
        toast.error(res.data.responseMessage);
      } else {
        toast.error(res.data.responseMessage);
        setIsLoading1(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading1(false);
      if (error.response) {
        toast.warn(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
    }
  };

  const pageCheck = page === 1 ? 12 : 0;

  const blockUserHandler = async (id) => {
    try {
      const res = await axios({
        method: "PUT",
        url: apiConfig.activeDeactiveCategory,

        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          _id: Id,
        },
      });

      if (res.data.statusCode === 200) {
        toast.success(res.data.responseMessage);
        setOpenActive(false);
        // toast.success("User have been blocked");
        listCategoryApi();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box>
        <Container maxWidth="lg">
          <Box className={classes.colorbox} mt={1}>
            <Box className={classes.root2}>
              <Box className={classes.heading}>
                <Typography variant="h2" color="primary">
                  Category
                </Typography>
              </Box>
              <Box className="d-flex" style={{ padding: "5px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpen(true)}
                >
                  Add Category
                </Button>
              </Box>
            </Box>
            <Box>
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
                                color: "rgb(100 104 109)",
                              }}
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                textAlign: "center",
                                textTransform: "capitalize",
                                color: "rgb(100 104 109)",
                              }}
                            >
                              {data?.categoryTitle}
                            </TableCell>

                            <TableCell
                              align="left"
                              style={{
                                textAlign: "center",
                                textTransform: "capitalize",
                                color: "rgb(100 104 109)",
                              }}
                            >
                              {/* <BootstrapTooltip title="View image"> */}
                              <img
                                src={data?.categoryIcon}
                                // onClick={() => imageData(data.categoryIcon)}
                                style={{
                                  // cursor: "pointer",
                                  height: "30px",
                                  width: "30px",
                                  borderRadius: "50%",
                                  objectFit: "contain",
                                }}
                                alt="Category"
                              />
                              {/* </BootstrapTooltip> */}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                textAlign: "center",
                                textTransform: "capitalize",
                                color: "rgb(100 104 109)",
                              }}
                            >
                              {moment(data?.updatedAt).format("lll")}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                textAlign: "center",
                                textTransform: "capitalize",
                                color: "rgb(100 104 109)",
                              }}
                            >
                              {data?.status}
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
                                {/* <BootstrapTooltip title="View Faq Details">
                            <VisibilityIcon
                              onClick={() => {
                                history.push({
                                  pathname: "/faqview",
                                  search: data?.userId?.toString(),
                                  hash: data?._id,
                                });
                              }}
                              style={{
                                fontSize: "25px",
                                cursor: "pointer",
                                marginRight: "5px",
                              }}
                            />
                          </BootstrapTooltip> */}

                                {isDelete && (
                                  <BootstrapTooltip title="Delete Category">
                                    <Delete
                                      fontSize="small"
                                      style={{
                                        fontSize: "22px",
                                        cursor: "pointer",
                                        marginTop: "2px",
                                      }}
                                      onClick={() =>
                                        handleClickOpenDelete(data._id)
                                      }
                                    />
                                  </BootstrapTooltip>
                                )}

                                <BootstrapTooltip
                                  title={
                                    isDelete
                                      ? "Edit this category"
                                      : "Not access to delete! "
                                  }
                                >
                                  <Edit
                                    fontSize="small"
                                    style={{
                                      fontSize: "22px",
                                      cursor: "pointer",
                                      marginTop: "2px",
                                    }}
                                    onClick={() => {
                                      if (isDelete) {
                                        history.push({
                                          pathname: "/edit-category",
                                          search: data?.userId?.toString(),
                                          hash: data?._id,
                                          state: { data },
                                        });
                                      }
                                    }}
                                  />
                                </BootstrapTooltip>

                                <BootstrapTooltip
                                  // title={
                                  //   data?.status === "BLOCK"
                                  //     ? "Unblock"
                                  //     : "Block"
                                  // }
                                  title={
                                    isWrite
                                      ? data?.status === "BLOCK"
                                        ? "Unblock"
                                        : "Block"
                                      : ` Not access to ${
                                          data?.status === "BLOCK"
                                            ? "unblock"
                                            : "block"
                                        }! `
                                  }
                                >
                                  {data?.userType !== "Admin" && isWrite ? (
                                    <BlockIcon
                                      fontSize="small"
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
                                      // onClick={() => blockUserHandler(data._id)}
                                      onClick={() => {
                                        if (isWrite) {
                                          setOpenActive(true);
                                          setId(data._id);
                                          setData(data?.status);
                                        }
                                      }}
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
            </Box>
          </Box>
          <>
            {categorylist && categorylist.length >= pageCheck && (
              <Box
                className={classes.tabBtn}
                display="flex"
                justifyContent="center"
              >
                <Pagination
                  count={noOfPages}
                  page={page}
                  onChange={(e, v) => setPage(v)}
                />
              </Box>
            )}
          </>
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
      {openActive && (
        <ConfirmationDialogBox
          openActive={openActive}
          setOpenActive={(item) => setOpenActive(item)}
          blockUserHandler={() => blockUserHandler()}
          type={data1}
        />
      )}
      <Dialog
        open={open}
        className={classes.createbox}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.paper }}
      >
        <DialogActions>
          <IconButton
            onClick={() => setOpen(false)}
            className={classes.customizedButton}
          >
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <DialogContent className={classes.dialogBox}>
          <Box className={classes.NftBreed}>
            <Box>
              <Typography variant="h2" align="center" color="primary">
                Add Category
              </Typography>
              <Box
                className={classes.createCollection}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  style={{
                    border: "1px solid #52565c",
                    height: "100px",
                    width: "100px",
                    borderRadius: "50%",
                  }}
                >
                  {imgFile !== "" ? (
                    <img
                      src={coverFileBase}
                      alt=""
                      width="100"
                      height="100"
                      style={{ borderRadius: "50%" }}
                    />
                  ) : (
                    <figure></figure>
                  )}
                </Box>
                <Box pl={2}>
                  <Typography variant="body2" color="primary">
                    We recommend an image of at least 400x400.
                  </Typography>
                  <Typography variant="body2" color="primary">
                    Select Category Image
                  </Typography>
                  <Box>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="raised-button-file-banner"
                      type="file"
                      name="collectionIMG"
                      // onChange={(e) => {
                      //   setImgfile(e.target.files[0]);
                      // }}
                      onChange={(e) => {
                        // setCoverBlob(URL.createObjectURL(e.target.files[0]));
                        setImgfile(e.target.files[0]);
                        getBase64(e.target.files[0], (result) => {
                          setCoverFileBase(result);
                        });
                      }}
                    />
                    <label htmlFor="raised-button-file-banner">
                      <Button
                        variant="contained"
                        color="secondary"
                        component="span"
                      >
                        Choose File
                      </Button>
                    </label>
                    {isSubmit && imgFile === "" && (
                      <Typography style={{ color: "#ff7d68" }} variant="body2">
                        Please select banner image
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>

              <Box mt={2} className={classes.textfiledlabel}>
                <Box mt={2}>
                  <Typography
                    variant="body2"
                    style={{ paddingBottom: "10px" }}
                    color="primary"
                  >
                    Category name<span style={{ color: "#ff7d68" }}>*</span>
                  </Typography>
                  <FormControl fullWidth className={classes.margin}>
                    <TextField
                      variant="outlined"
                      placeholder="Enter token name"
                      name="displayName"
                      value={formValue.displayName}
                      onChange={(e) => _onInputChange(e)}
                      error={isSubmit && formValue.displayName === ""}
                      helperText={
                        isSubmit &&
                        (formValue.displayName === undefined ||
                          formValue.displayName.trim() === "") &&
                        "Please select category name"
                      }
                    />
                    {/* {isSubmit && (formValue.displayName === undefined || formValue.displayName.trim() === "")&& (
                      <Typography style={{ color: '#ff7d68' }} variant="body2">
                        Please enter the valid category name
                      </Typography>
                    )} */}
                    {formValue.displayName &&
                      formValue.displayName.length > 26 && (
                        <Typography
                          style={{ color: "#ff7d68" }}
                          variant="body2"
                        >
                          Category name should not exceed more than 26 character
                        </Typography>
                      )}
                  </FormControl>
                </Box>
              </Box>
              <Box mt={3} mb={4} textAlign="Center">
                <Button
                  variant="contained"
                  size="large"
                  onClick={addcategoryHandler}
                  color="primary"
                  disabled={isLoading1}
                >
                  Add Category {isLoading1 && <ButtonCircularProgress />}
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog
        open={open1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h5" color="primary">
            Delete Category?
          </Typography>
        </DialogTitle>
        <DialogContent style={{ marginTop: "-8px" }}>
          <DialogContentText
            id="alert-dialog-description"
            style={{ fontSize: "16px" }}
          >
            <Typography variant="body2" color="primary">
              Are you sure you want to Delete this Category ?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ marginTop: "-16px", fontSize: "16px" }}>
          <Button
            onClick={() => deleteCategory(Id)}
            autoFocus
            variant="contained"
            color="primary"
          >
            Yes{" "}
            {deleteLoader && (
              <ButtonCircularProgress style={{ marginLeft: "5px" }} />
            )}
          </Button>
          <Button
            onClick={() => setOpen1(false)}
            variant="outlined"
            color="primary"
            size="large"
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
