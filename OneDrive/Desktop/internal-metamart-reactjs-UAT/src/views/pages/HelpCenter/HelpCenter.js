import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/ApiConfig/ApiConfig";
import * as yep from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Container,
  makeStyles,
  Paper,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import SettingsContext from "src/context/SettingsContext";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    paddingTop: "50px",
    paddingBottom: "50px",
    "& h1": {
      fontFamily: "'ClashDisplay-Medium'",
      "& span": { fontFamily: "'ClashDisplay-Extralight'" },
    },
    "& label": {
      color: theme.palette.primary.main,
      padding: "0",
      fontSize: "14px",
      lineHeight: "33px",

      transition:
        "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      "& span": {
        color: "#ff7d68",
      },
    },
  },
  headerBox: {
    textAlign: "left",
    "& h2": {
      marginBottom: "8px",
    },
  },
  borderImg: {
    padding: "12px 0px",
    overflow: "hidden",
    boxShadow:
      "0 1px 0 0 #fe5aeb, 0 -1px 0 0 #f4a91b, 1px 0 0 0 #fe5aeb, -1px 0 0 0 rgb(254 90 235), 1px -1px 0 0 #f4a91b, -1px 1px 0 0 rgb(254 90 235), 1px 1px 0 0 rgb(254 90 235), -1px -1px 0 0 rgb(244 168 26)",
    color: "#ffffff",
    background: "transparent",
    // borderRadius: '10px',
  },
  outlineborder1: {
    "& .react-tel-input .form-control": {
      width: "100%",
      backgroundColor: "transparent",
      color: "#6D6D6D",
      border: "1px solid #9494940f",
      marginTop: "5px 0px",
      // borderTop: " none",
      // borderLeft: "none",
      // borderRight: "none",
      height: "46px",
      background: "rgb(67 67 67 / 17%) !important",
      borderRadius: "5px",
    },
    "& .react-tel-input .country-list .country": {
      padding: "7px 9px",
      textAlign: "left",
      backgroundColor: "#fff",
      color: "#000",
      "&:hover": {
        backgroundColor: "#d9ebf4",
      },
    },
    "& .react-tel-input .selected-flag": {
      backgroundColor: "#202020",
    },
    "& .react-tel-input .selected-flag .arrow": {
      left: "20px",
    },
    "& .react-tel-input .country-list .country.highlight": {
      backgroundColor: "#f1f1f1",
    },
    "& .react-tel-input .selected-flag": {
      "&:hover": {
        backgroundColor: "none",
      },
    },
    "& .react-tel-input .flag-dropdown ": {
      backgroundColor: "transparent",
      borderRight: "1px solid #949494",
      border: "none",
      height: "25px",
      position: "absolute",
      top: "5px",
      marginTop: "5px",
    },
    "& .react-tel-input .flag-dropdown.open .selected-flag": {
      backgroundColor: "#f1f1f1",
    },
  },
  outlineborderError: {
    "& .MuiSelect-icon": {
      color: theme.palette.primary.main,
    },
    "& .react-tel-input .form-control": {
      width: "100%",
      backgroundColor: "transparent",
      color: "#6D6D6D",
      border: "1px solid #f44336",
      marginTop: "5px 0px",
      // borderTop: " none",
      // borderLeft: "none",
      // borderRight: "none",
      height: "46px",
      background: "rgb(67 67 67 / 17%) !important",
      borderRadius: "5px",
    },
    "& .react-tel-input .country-list .country": {
      padding: "7px 9px",
      textAlign: "left",
      backgroundColor: "#fff",
      color: "#000",
      "&:hover": {
        backgroundColor: "#d9ebf4",
      },
    },
    "& .react-tel-input .selected-flag": {
      backgroundColor: "#202020",
    },
    "& .react-tel-input .selected-flag .arrow": {
      left: "20px",
    },
    "& .react-tel-input .country-list .country.highlight": {
      backgroundColor: "#f1f1f1",
    },
    "& .react-tel-input .selected-flag": {
      "&:hover": {
        backgroundColor: "none",
      },
    },
    "& .react-tel-input .flag-dropdown ": {
      backgroundColor: "transparent",
      borderRight: "1px solid #949494",
      border: "none",
      height: "25px",
      position: "absolute",
      top: "5px",
      marginTop: "5px",
    },
    "& .react-tel-input .flag-dropdown.open .selected-flag": {
      backgroundColor: "#f1f1f1",
    },
  },
}));

const Contact = (props) => {
  const classes = useStyles();
  const themeSeeting = useContext(SettingsContext);
  const [confirmation, setConfirmation] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSubmit1, setIsSubmit1] = useState(false);
  const [countryCode, setCountryCode] = useState(false);
  const formInitialSchema = {
    name: "",
    mobileNumber: "",
    email: "",
    message: "",
  };
  const formValidationSchema = yep.object().shape({
    email: yep.string().email().required("Please enter email."),
    name: yep
      .string()
      .required("Please enter first name.")
      .max(35, "You can enter only 35 characters."),
    mobileNumber: yep
      .string()
      .required("Phone number is required.")
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        "Must be a valid phone number."
      )
      .max(13, "Should not exceeds 13 digits.")
      .min(9, "Must be only 9 digits."),
    message: yep
      .string()
      .required("Message is required.")

      .max(360, "maximum 360 characters are allowed.")
      .min(10, "Minimum 10 characters."),
  });
  const handleFormSubmit = async (values) => {
    console.log("ohonevalue,", values.mobileNumber);
    setIsUpdating(true);
    try {
      // if (userType === "USER") {
      axios({
        method: "POST",
        url: ApiConfig.contactUs,

        data: {
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
        },
      })
        .then(async (response) => {
          if (response.data.statusCode === 200) {
            toast.success("Your question has been submitted");
            // toast.success("You have successfully registered");
            setIsUpdating(false);
          } else if (response.status === 401) {
            toast.success(response.data.responseMessage);
            setIsUpdating(false);
          } else {
            setIsUpdating(false);
            toast.success(response.data.responseMessage);
            setConfirmation(true);
          }
        })
        .catch((err) => {
          console.log(err.message);
          setIsUpdating(false);
        });
      // }
    } catch (err) {
      console.error(err.response);
      //  setIsLoading(false);
    }
  };

  return (
    <Box className={classes.mainbox}>
      <Container maxWidth="sm">
        <Paper elevation={2} className="borderGraditant">
          <Box
            className={
              themeSeeting.settings.theme === "DARK"
                ? "backgroudBlack"
                : "backgroudBlack1"
            }
          >
            <Box mb={5} className={classes.headerBox}>
              <Typography variant="h2" color="primary">
                CONTACT US
              </Typography>
              <Typography variant="h3" color="primary">
                Do you have a<span> question ?</span>
              </Typography>

              <Typography variant="body2" color="primary">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form.
              </Typography>
            </Box>

            <Formik
              initialValues={formInitialSchema}
              validationSchema={formValidationSchema}
              onSubmit={(values, { resetForm }) =>
                handleFormSubmit(values, resetForm({ values: "" }))
              }
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box mt={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Box>
                          <label>
                            Full Name <span>*</span>
                          </label>
                          <TextField
                            error={Boolean(touched.name && errors.name)}
                            fullWidth
                            helperText={touched.name && errors.name}
                            id="outlined-basic"
                            variant="outlined"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.name}
                            type="name"
                            name="name"
                            inputProps={{ maxLength: 50 }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box>
                          <label>
                            Email <span>*</span>
                          </label>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            error={Boolean(touched.email && errors.email)}
                            fullWidth
                            helperText={touched.email && errors.email}
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="email"
                            value={values.email}
                          />
                        </Box>
                      </Grid>
                      {/*Phone Field is added as per the figma*/}
                      <Grid item xs={12}>
                        <Box>
                          <label>
                            Phone <span>*</span>
                          </label>
                          <FormControl
                            fullWidth
                            variant="filled"
                            className={
                              Boolean(
                                touched.mobileNumber && errors.mobileNumber
                              )
                                ? classes.outlineborderError
                                : classes.outlineborder1
                            }
                          >
                            <PhoneInput
                              type="number"
                              country={"gb"}
                              id="mobileNumber"
                              name="mobileNumber"
                              variant="outlined"
                              // disabled={isLoading}
                              onBlur={handleBlur}
                              value={values.mobileNumber}
                              onChange={(mobileNumber, e) => {
                                setCountryCode(e.dialCode);
                                setFieldValue("mobileNumber", mobileNumber);
                              }}
                              error={Boolean(
                                touched.mobileNumber && errors.mobileNumber
                              )}
                              placeholder="Please enter phone number"
                            />
                          </FormControl>
                          <FormHelperText error>
                            {touched.mobileNumber && errors.mobileNumber}
                          </FormHelperText>
                        </Box>
                      </Grid>
                    </Grid>
                    <Box mt={2}>
                      <Box>
                        <label>
                          Message <span>*</span>
                        </label>
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          error={Boolean(touched.message && errors.message)}
                          fullWidth
                          helperText={touched.message && errors.message}
                          name="message"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="text"
                          value={values.message}
                          multiline
                          rowsMax={10}
                          rows={10}
                          inputProps={{
                            maxLength: 1800,
                          }}
                        />
                      </Box>
                    </Box>
                    <Box mt={4}>
                      <Button
                        color="primary"
                        // disabled={isSubmitting}
                        size="large"
                        type="submit"
                        variant="contained"
                        disabled={isUpdating}
                      >
                        Submit {isUpdating && <ButtonCircularProgress />}
                      </Button>
                    </Box>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Contact;
