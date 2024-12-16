import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Rating from "@material-ui/lab/Rating";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Container,
  makeStyles,
  Paper,
  FormHelperText,
} from "@material-ui/core";
import axios from "axios";
import * as yup from "yup";
import { toast } from "react-toastify";
import Apiconfig from "src/ApiConfig/ApiConfig";

import { useWeb3React } from "@web3-react/core";
import { Link, useHistory, useLocation } from "react-router-dom";

import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import SettingsContext from "src/context/SettingsContext";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    paddingTop: "60px",
    paddingBottom: "50px",
    "& h2": {
      color: "#9b41a1",
    },
    "& label": {
      color: "#FFA701",
      padding: "0",
      fontSize: "50px",
      marginTop: "11px",
      lineHeight: "33px",
      transition:
        "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      [theme.breakpoints.down("xs")]: {
        fontSize: "30px",
      },
    },
  },
  maintext: {
    // marginTop: '10px',
    padding: "15px",
    "& .MuiRating-iconEmpty": {
      color: theme.palette.primary.main,
    },
    "& .ratingField": {
      textAlign: "left",
      marginBottom: "16px",
      padding: "0px",
      "& h3": {
        fontWeight: "400",
      },
    },
  },
  borderImg: {
    // padding: '15px',
    overflow: "hidden",
    boxShadow:
      "0 1px 0 0 #fe5aeb, 0 -1px 0 0 #f4a91b, 1px 0 0 0 #fe5aeb, -1px 0 0 0 rgb(254 90 235), 1px -1px 0 0 #f4a91b, -1px 1px 0 0 rgb(254 90 235), 1px 1px 0 0 rgb(254 90 235), -1px -1px 0 0 rgb(244 168 26)",
    color: "#ffffff",
    background: "transparent",
    // borderRadius: '10px',
  },
}));

const Contact = (props) => {
  const { account } = useWeb3React();
  console.log("account----", account);
  const [value, setValue] = React.useState();

  const themeSeeting = useContext(SettingsContext);

  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const [isUpdating, setIsUpdating] = useState(false);
  const accessToken = window.sessionStorage.getItem("token");

  const formInitialSchema = {
    comment: "",
    rating: "",
    orderId: "",
  };
  const formValidationSchema = yup.object().shape({
    comment: Yup.string()
      .required("Please enter message field")
      .max(300, "Message should not exceed more that 300 character"),
  });

  const handleFormSubmit = async (values) => {
    setIsUpdating(true);
    axios({
      method: "POST",
      url: Apiconfig.feedBack,
      headers: {
        token: window.sessionStorage.getItem("token"),
      },
      data: {
        comment: values.comment,
        // orderId: idd,
        rating: value,
      },
    })
      .then(async (res) => {
        setIsUpdating(false);
        if (res.data.statusCode === 200) {
          history.push("/");

          toast.success("Your feedback submited successfully");
          setIsUpdating(false);
        } else {
          toast.error(res.data.responseMessage);
          setIsUpdating(false);
        }
      })
      .catch(() => {
        setIsUpdating(false);
      });
  };

  return (
    <Box className={classes.mainbox}>
      <Container maxWidth="sm">
        <Formik
          initialValues={formInitialSchema}
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
            isSubmitting,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <Paper elevation={2} className="borderGraditant">
                <Box
                  className={
                    themeSeeting.settings.theme === "DARK"
                      ? "backgroudBlack"
                      : "backgroudBlack1"
                  }
                >
                  <Box className={classes.maintext}>
                    <Grid container spacing={2}>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Box
                          component="fieldset"
                          borderColor="transparent"
                          align="center"
                          className="ratingField"
                        >
                          <Typography variant="h3" color="primary">
                            Please Rate Your Experience
                          </Typography>

                          <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                              setValue(newValue);
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Box style={{ marginTop: "-34px" }}>
                          <Typography
                            variant="body2"
                            color="primary"
                            style={{ fontSize: "14px" }}
                          >
                            Message<span style={{ color: "#ff7d68" }}>*</span>
                          </Typography>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            error={Boolean(touched.comment && errors.comment)}
                            fullWidth
                            helperText={touched.comment && errors.comment}
                            name="comment"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            value={values.comment}
                            multiline
                            rowsMax={10}
                            rows={10}
                            inputProps={{
                              maxLength: 1500,
                            }}
                          />
                          {values.comment.length > 1499 && (
                            <FormHelperText error>
                              Please should not exceed 1500 characters
                            </FormHelperText>
                          )}
                        </Box>
                        <Box mt={2} display="flex">
                          {account ? (
                            <Button
                              color="primary"
                              disabled={isSubmitting || value === undefined}
                              size="large"
                              type="submit"
                              variant="contained"
                            >
                              Submit{isUpdating && <ButtonCircularProgress />}
                            </Button>
                          ) : (
                            <Button
                              color="primary"
                              size="large"
                              to="/conect-wallet"
                              component={Link}
                              variant="contained"
                            >
                              Connect Wallet
                            </Button>
                          )}
                          &nbsp; &nbsp; &nbsp;
                          <Button
                            color="secondary"
                            // size="large"
                            type="submit"
                            variant="contained"
                            onClick={() => history.push("/")}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Paper>
            </form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default Contact;
