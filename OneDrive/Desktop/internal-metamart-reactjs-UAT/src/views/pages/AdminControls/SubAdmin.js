import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  FormHelperText,
  FormControl,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Form, Formik } from "formik";
import { getBase64, getWeb3Obj } from "src/utils";
import axios from "axios";
import ApiConfig from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import * as yep from "yup";
import moment from "moment";
import { UserContext } from "src/context/User";
import React, { useState, useEffect, useContext } from "react";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import SubAdminPermission from "./SubAdminPermission";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  textField: {
    "& input": {
      height: "20px",
    },
  },
  inputFile: {
    border: "1px solid #806490",
    borderRadius: "4px",
    padding: "10px",
    width: "100%",
    color: theme.palette.text.black,
    [theme.breakpoints.down("xs")]: {
      width: "92%",
    },
    marginTop: "10px",
  },
  heading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "20px",
    "& h4": {
      fontSize: "40px",
      fontWeight: "700",
      color: theme.palette.secondary.main,
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
  },
  colorbox: {
    alignItems: "center",
    marginTop: "16px",
    width: "100%",
    height: "auto",
    // background: "rgba(59, 13, 96, 0.4)",
    // backdropFilter: "blur(44px)",
    borderRadius: "15px",
    padding: "20px",
  },
  gridSection: {
    "& label": {
      color: theme.palette.secondary.white,
      fontSize: "14px",
      "& span": {
        display: "inline-block",
        marginTop: "-9px",
      },
      "& .MuiFormGroup-root": {
        flexDirection: "revert",
        marginLeft: 13,
        "& .MuiSvgIcon-root": {
          width: "13px",
          height: "13px",
        },
      },
    },
    "& .MuiInputBase-input": {
      color: theme.palette.secondary.white,
    },
  },
}));
const formValidationSchema = yep.object().shape({
  name: yep
    .string()
    .required("Name is required.")
    .min(2, "Please enter atleast 2 characters.")
    .max(35, "You can enter only 35 characters."),
  walletAddress: yep.string().required("Wallet address is required."),
});
export default function SubAdmin() {
  const history = useHistory();
  const classes = useStyles();
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  console.log("data --- location", location.hash.split("#")[1]);
  console.log("data --- location", location?.state?.isdisabled);
  const initialPermissions = {
    userManagement: {
      read: location?.state?.permissions?.userManagement?.read
        ? location?.state?.permissions?.userManagement?.read
        : false,
      write: location?.state?.permissions?.userManagement?.write
        ? location?.state?.permissions?.userManagement?.write
        : false,
      delete: location?.state?.permissions?.userManagement?.delete
        ? location?.state?.permissions?.userManagement?.delete
        : false,
    },
    nftManagement: {
      read: location?.state?.permissions?.nftManagement?.read
        ? location?.state?.permissions?.nftManagement?.read
        : false,
      write: location?.state?.permissions?.nftManagement?.write
        ? location?.state?.permissions?.nftManagement?.write
        : false,
      delete: location?.state?.permissions?.nftManagement?.delete
        ? location?.state?.permissions?.nftManagement?.delete
        : false,
    },
    kycManagement: {
      read: location?.state?.permissions?.kycManagement?.read
        ? location?.state?.permissions?.kycManagement?.read
        : false,
      write: location?.state?.permissions?.kycManagement?.write
        ? location?.state?.permissions?.kycManagement?.write
        : false,
      delete: location?.state?.permissions?.kycManagement?.delete
        ? location?.state?.permissions?.kycManagement?.delete
        : false,
    },
    revenueManagement: {
      read: location?.state?.permissions?.revenueManagement?.read
        ? location?.state?.permissions?.revenueManagement?.read
        : false,
      write: location?.state?.permissions?.revenueManagement?.write
        ? location?.state?.permissions?.revenueManagement?.write
        : false,
      delete: location?.state?.permissions?.revenueManagement?.delete
        ? location?.state?.permissions?.revenueManagement?.delete
        : false,
    },
    categoryManagement: {
      read: location?.state?.permissions?.categoryManagement?.read
        ? location?.state?.permissions?.categoryManagement?.read
        : false,
      write: location?.state?.permissions?.categoryManagement?.write
        ? location?.state?.permissions?.categoryManagement?.write
        : false,
      delete: location?.state?.permissions?.categoryManagement?.delete
        ? location?.state?.permissions?.categoryManagement?.delete
        : false,
    },
    staticContentManagement: {
      read: location?.state?.permissions?.staticContentManagement?.read
        ? location?.state?.permissions?.staticContentManagement?.read
        : false,
      write: location?.state?.permissions?.staticContentManagement?.write
        ? location?.state?.permissions?.staticContentManagement?.write
        : false,
      delete: location?.state?.permissions?.staticContentManagement?.delete
        ? location?.state?.permissions?.staticContentManagement?.delete
        : false,
    },
    feedbackManagement: {
      read: location?.state?.permissions?.feedbackManagement?.read
        ? location?.state?.permissions?.feedbackManagement?.read
        : false,
      write: location?.state?.permissions?.feedbackManagement?.write
        ? location?.state?.permissions?.feedbackManagement?.write
        : false,
      delete: location?.state?.permissions?.feedbackManagement?.delete
        ? location?.state?.permissions?.feedbackManagement?.delete
        : false,
    },
    mediaManagement: {
      read: location?.state?.permissions?.mediaManagement?.read
        ? location?.state?.permissions?.mediaManagement?.read
        : false,
      write: location?.state?.permissions?.mediaManagement?.write
        ? location?.state?.permissions?.mediaManagement?.write
        : false,
      delete: location?.state?.permissions?.mediaManagement?.delete
        ? location?.state?.permissions?.mediaManagement?.delete
        : false,
    },
    faqManagement: {
      read: location?.state?.permissions?.faqManagement?.read
        ? location?.state?.permissions?.faqManagement?.read
        : false,
      write: location?.state?.permissions?.faqManagement?.write
        ? location?.state?.permissions?.faqManagement?.write
        : false,
      delete: location?.state?.permissions?.faqManagement?.delete
        ? location?.state?.permissions?.faqManagement?.delete
        : false,
    },
  };
  const [adminPermissions, setAdminPermissions] = useState(initialPermissions);
  const handlePermissionChange = (updatedPermissions) => {
    setAdminPermissions(updatedPermissions);
  };

  const handleFormSubmit = async (values) => {
    const web3 = await getWeb3Obj();
    const isValidWalletAddress = web3.utils.isAddress(values.walletAddress);
    if (isValidWalletAddress) {
      try {
        setIsLoading(true);
        const res = await axios({
          method: "POST",
          url: ApiConfig.addSubAdmin,
          data: {
            name: values.name,
            walletAddress: values.walletAddress,
            permissions: adminPermissions,
          },
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          history.goBack();
          setIsLoading(false);
          toast.success(res.data.responseMessage);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.log("error");
        setIsLoading(false);
        toast.error(error.response.data.responseMessage);
      }
    } else {
      toast.error("Please enter valid wallet address");
    }
  };
  const HandleEdit = async () => {
    // const web3 = await getWeb3Obj();
    // const isValidWalletAddress = web3.utils.isAddress(values.walletAddress);
    // if (isValidWalletAddress) {
    try {
      setIsLoading(true);
      const res = await axios({
        method: "PUT",
        url: ApiConfig.editPermission,
        data: {
          userId: location.search.split("?")[1],
          permissions: adminPermissions,
        },
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      console.log(res.status);
      if (res?.status === 200) {
        history.goBack();
        setIsLoading(false);
        toast.success(res.data.responseMessage);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error");
      setIsLoading(false);
      toast.error(error.response.data.responseMessage);
    }
    // } else {
    //   toast.error("Please enter valid wallet address");
    // }
  };

  useEffect(() => {
    if (!user.isAdmin) {
      history.push("/");
    }
  }, [user.isAdmin]);
  return (
    <Box className={classes.root}>
      <Container>
        <Box className={classes.colorbox}>
          <Box className={classes.heading}>
            <Typography variant="h4">
              {location.hash.split("#")[1] == "View"
                ? "view"
                : location.hash.split("#")[1] == "edit"
                ? "Edit"
                : "Create"}{" "}
              Sub Admin
            </Typography>
          </Box>
          <Box>
            <Formik
              initialValues={{
                name: location?.state?.name ? location?.state?.name : "",
                walletAddress: location?.state?.walletAddress
                  ? location?.state?.walletAddress
                  : "",
              }}
              initialStatus={{
                success: false,
                successMsg: "",
              }}
              validationSchema={formValidationSchema}
              onSubmit={(values) => handleFormSubmit(values)}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values,
                setFieldValue,
              }) => (
                <Form>
                  <Grid container spacing={2} className={classes.gridSection}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Typography variant="subtitle1" color="primary">
                        Name
                      </Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        name="name"
                        value={values.name}
                        error={Boolean(touched.name && errors.name)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isdisabled={
                          location?.state?.isdisabled ||
                          location.hash.split("#")[1] == "edit" ||
                          location.hash.split("#")[1] == "view"
                        }
                      />
                      <FormHelperText error>
                        {touched.name && errors.name}
                      </FormHelperText>
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Typography variant="subtitle1" color="primary">
                        Wallet Address
                      </Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        name="walletAddress"
                        value={values.walletAddress}
                        error={Boolean(
                          touched.walletAddress && errors.walletAddress
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isdisabled={
                          location?.state?.isdisabled ||
                          location.hash.split("#")[1] == "edit" ||
                          location.hash.split("#")[1] == "view"
                        }
                      />
                      <FormHelperText error>
                        {touched.walletAddress && errors.walletAddress}
                      </FormHelperText>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <SubAdminPermission
                        permission={adminPermissions}
                        onPermissionChange={handlePermissionChange}
                        isdisabled={location?.state?.isdisabled}
                      />
                    </Grid>
                    <Grid
                      item
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      style={{ display: "flex", justifyContent: "end" }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        onClick={() => history.goBack()}
                      >
                        Back {isLoading && <ButtonCircularProgress />}
                      </Button>
                      &nbsp; &nbsp; &nbsp;
                      {location.hash.split("#")[1] == "add" && (
                        <Button
                          variant="contained"
                          size="large"
                          color="primary"
                          type="submit"
                          disabled={isLoading}
                        >
                          Submit {isLoading && <ButtonCircularProgress />}
                        </Button>
                      )}
                      {location.hash.split("#")[1] == "edit" && (
                        <Button
                          variant="contained"
                          size="large"
                          color="primary"
                          // type="submit"
                          onClick={() => HandleEdit()}
                          disabled={isLoading}
                        >
                          Update {isLoading && <ButtonCircularProgress />}
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
