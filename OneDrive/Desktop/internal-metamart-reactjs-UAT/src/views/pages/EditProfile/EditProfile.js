import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  Button,
  FormControl,
  makeStyles,
  FormHelperText,
  Paper,
  useTheme,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yep from "yup";
import ApiConfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "src/context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { DropzoneArea } from "material-ui-dropzone";
import { FiUpload } from "react-icons/fi";
const useStyles = makeStyles((theme) => ({
  Box: {
    background: theme.palette.primary.main,
    border: "1px solid #898989",
    height: "200px",
    width: "200px",
    borderRadius: "25px",
  },

  FAQ: {
    padding: "50px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  PageHeading: {
    paddingBottom: "20px",
  },
  editsection: {
    "& h2": {
      display: "flex",
      fontSize: "30px",
      alignItems: "center",
      fontWeight: " 700",
      paddingBottom: "25px",
    },
    "& h3": {
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
    },
  },
  inputfield: {
    "& label": {
      marginTop: "22px",
      fontSize: "14px",
    },
  },
  imagefiled: {
    "& label": {
      color: theme.palette.primary.main,
      paddingBottom: "20px",
    },
    "& small": {},
  },
  inputsection: {
    color: "#52565c",
    cursor: "text",
    position: "relative",
    fontSize: "1rem",
    boxSizing: "border-box",
    fontWeight: "400",
    lineHeight: "1.1876em",
  },
  message: { color: theme.palette.primary.main },
  colorbox: {
    padding: "20px",
    [theme.breakpoints.down("xs")]: {
      padding: "0px",
    },

    "& h3": {
      fontSize: "14px",
      fontFamily: "'Poppins', sans-serif",
      fontWeight: "400",
      lineHeight: "1.43",
      "& img": {
        marginRight: "20px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
      "& p": {
        color: theme.palette.primary.main,
      },
    },
  },
  imgsecbox: {
    "@media(min-width:960px)": {
      display: "none",
    },
  },
  imgsecbox1: {
    "@media(max-width:960px)": {
      display: "none",
    },
  },
  dropZOne: {
    position: "relative",
    "& .dropDoneText": {
      position: "absolute",
      top: "80px",
      width: "100%",
      textAlign: "center",
      zIndex: "1",
      "& img": {
        minHeight: "100%",
        maxHeight: "100%",
        maxWidth: "100%",
      },
      "& p": {
        fontSize: "16px",
      },
      "& h6": {
        fontSize: "12px",
        fontWeight: 400,
      },
      "& span": {
        background:
          "linear-gradient(90deg, #FFB000 0.49%, #FF564D 29.42%, #FF0098 66.62%, #5D00C1 110.28%)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      },
    },
    "& .MuiDropzoneArea-textContainer": {
      display: "none !important",
    },
  },
}));
export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (err) {
    console.log("Error: ", err);
  };
};

export default function Editprofile() {
  const classes = useStyles();
  const user = useContext(UserContext);
  // const [coverImage, setCoverImage] = useState("");
  const [coverImage64, setCoverImage64] = useState("");

  // const [isValid, setIsValid] = useState(false);
  function isImageUrlValid12(url) {
    const img = new Image();
    img.onload = function () {
      // setIsValid(true);
      setCoverImage64(url);
    };
    img.onerror = function () {
      // setIsValid(false);
      setCoverImage64("");
    };
    img.src = url;
  }
  useEffect(() => {
    isImageUrlValid12(user.userData?.coverPic);
  }, [user.userData?.coverPic]);
  const accessToken = window.sessionStorage.getItem("token");
  // const [errMessage, setImgError] = useState(false);
  // const [profileImage, setProfileImage] = useState("");
  const [profileImage64, setProfileImage64] = useState(
    user?.userData?.profilePic ? user?.userData?.profilePic : ""
  );
  const history = useHistory();
  const [loader1, setLoader1] = useState(false);
  const formValidationSchema = yep.object().shape({
    name: yep
      .string("Enter valid name.")
      .required("display name is required.")
      .strict(true)
      .nullable()
      .trim("Enter valid name.")
      .max(35, "Your name should not exceeds 35 characters."),

    bio: yep
      .string("Enter valid bio.")
      .required("Bio is required.")
      .strict(true)
      .nullable()
      .min(2, "Your bio should be at least 2 characters long.")
      .max(300, "Your bio should not exceeds 300 characters."),

    twitter: yep
      .string("Enter valid twitter URL.")
      .matches(
        /^(https?:\/\/)?(www\.)?twitter\.com\/([A-Za-z0-9_]{1,15})\/?$/,
        "Enter valid twitter URL."
      )
      .trim("Enter valid URL."),
    facebook: yep
      .string("Enter valid facebook URL.")
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter valid facebook URL."
      )
      .trim("Enter valid URL."),
    personalSite: yep
      .string("Enter valid personalSite URL.")
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter valid URL."
      )
      .trim("Enter valid URL."),
    email: yep
      .string()
      .email("You have entered an invalid email address.")
      .required("Email address is required.")
      .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
  });

  const [isValid, setIsValid] = useState();
  function isImageUrlValid(url) {
    const img = new Image();
    img.onload = function () {
      setIsValid(true);
    };
    img.onerror = function () {
      setIsValid(false);
    };
    img.src = url;
  }
  useEffect(() => {
    isImageUrlValid(coverImage64);
    // setCoverImage64()
  }, [coverImage64]);
  console.log("----- isValid ", isValid);
  return (
    <>
      <Box className={classes.FAQ}>
        {user?.userData && (
          <Box mb={2}>
            <Container maxWidth="lg">
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={7}
                  className={classes.editsection}
                >
                  <Formik
                    initialValues={{
                      name: user?.userData?.name ? user?.userData?.name : "",

                      coverPic: user?.userData?.coverPic
                        ? user?.userData?.coverPic
                        : "",
                      profilePic: user?.userData?.profilePic
                        ? user?.userData?.profilePic
                        : "",
                      bio: user?.userData?.bio ? user?.userData?.bio : "",
                      facebook: user?.userData?.facebook
                        ? user?.userData?.facebook
                        : "",
                      customUrl: user.userData?.customUrl,
                      personalSite: user.userData?.personalSite,
                      email: user.userData?.email,
                      twitter: user?.userData?.twitterUsername
                        ? user?.userData?.twitterUsername
                        : "",
                    }}
                    initialStatus={{
                      success: true,
                      successMsg: "",
                    }}
                    validationSchema={formValidationSchema}
                    onSubmit={async (
                      value,
                      {
                        name,
                        bio,
                        email,
                        facebook,
                        twitter,
                        customUrl,
                        personalSite,
                      }
                    ) => {
                      console.log(
                        " name ---- isImageUrlValid12  ",
                        coverImage64
                      );
                      try {
                        const formData = new FormData();
                        formData.append("name", value?.name);
                        formData.append("customUrl", value?.customUrl);
                        formData.append("bio", value?.bio);
                        formData.append("coverPic", coverImage64);
                        formData.append("profilePic", profileImage64);
                        formData.append("twitterUsername", value?.twitter);
                        formData.append("facebook", value?.facebook);
                        formData.append("email", value?.email);
                        formData.append("personalSite", value?.personalSite);
                        setLoader1(true);
                        const response = await axios({
                          method: "PUT",
                          url: ApiConfig.updateProfile,
                          headers: {
                            token: window.sessionStorage.getItem("token"),
                          },
                          data: formData,
                          // data: {
                          // name: value?.name,
                          // customUrl: value?.customUrl,
                          // bio: value?.bio,
                          // coverPic: coverImage64,
                          // profilePic: profileImage64,
                          // twitterUsername: value?.twitter,
                          // facebook: value?.facebook,
                          // personalSite: value?.personalSite,
                          // email: value?.email,
                          // },
                          // headers: {
                          //   token: accessToken,
                          // },
                        });

                        if (response.data.statusCode === 200) {
                          toast.success(response.data.responseMessage);
                          history.push("/profile");
                          user.getProfileHandler(
                            window.sessionStorage.getItem("token")
                          );
                        } else {
                          toast.success(response.data.response_message);
                        }
                        setLoader1(false);
                      } catch (err) {
                        toast.error(err.response.data.responseMessage);
                        console.error(err.response);
                        setLoader1(false);
                      }
                    }}
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
                      <Form onSubmit={handleSubmit}>
                        <Paper elevation={2}>
                          <Box className={classes.colorbox}>
                            <Typography
                              variant="h2"
                              color="primary"
                              className={classes.PageHeading}
                            >
                              Edit Profile
                            </Typography>
                            <Typography variant="h3" color="primary">
                              You can set preferred display name, create your
                              branded profile URL and manage other personal
                              settings
                            </Typography>
                            <Box mt={2} className={classes.inputfield}>
                              <Typography
                                variant="body1"
                                color="primary"
                                className={classes.fontSixeText}
                              >
                                Display name{" "}
                                <span style={{ color: "#ff7d68" }}>*</span>
                              </Typography>

                              <FormControl
                                fullWidth
                                className={classes.inputsection}
                              >
                                <TextField
                                  variant="outlined"
                                  name="name"
                                  value={values.name}
                                  placeholder="Enter your display name"
                                  error={Boolean(touched.name && errors.name)}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                                <FormHelperText
                                  error
                                  style={{ paddingBottom: "15px" }}
                                >
                                  {touched.name && errors.name}
                                </FormHelperText>
                              </FormControl>

                              <Typography
                                variant="body1"
                                color="primary"
                                className={classes.fontSixeText}
                              >
                                Bio
                                <span style={{ color: "#ff7d68" }}>*</span>
                              </Typography>
                              <FormControl
                                fullWidth
                                className={classes.inputsection}
                              >
                                <TextField
                                  id="outlined-basic"
                                  variant="outlined"
                                  fullWidth
                                  placeholder="Tell about yourself in a few words"
                                  name="bio"
                                  value={values.bio}
                                  multiline
                                  rowsMax={5}
                                  rows={5}
                                  error={Boolean(touched.bio && errors.bio)}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  inputProps={{
                                    maxLength: 356,
                                  }}
                                />
                                <FormHelperText
                                  error
                                  style={{ paddingBottom: "15px" }}
                                >
                                  {touched.bio && errors.bio}
                                </FormHelperText>
                              </FormControl>
                              <Typography
                                variant="body1"
                                color="primary"
                                className={classes.fontSixeText}
                              >
                                Twitter URL
                              </Typography>

                              <FormControl
                                fullWidth
                                className={classes.inputsection}
                              >
                                <TextField
                                  variant="outlined"
                                  id="standard-adornment-amount"
                                  placeholder="https://"
                                  name="twitter"
                                  value={values.twitter}
                                  error={Boolean(
                                    touched.twitter && errors.twitter
                                  )}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  // endAdornment={
                                  //   <InputAdornment position="end">
                                  //     Link
                                  //   </InputAdornment>
                                  // }
                                />
                                <FormHelperText
                                  error
                                  style={{ paddingBottom: "15px" }}
                                >
                                  {touched.twitter && errors.twitter}
                                </FormHelperText>
                              </FormControl>
                              <Typography
                                variant="body1"
                                color="primary"
                                className={classes.fontSixeText}
                              >
                                Facebook URL
                              </Typography>

                              <FormControl
                                fullWidth
                                className={classes.inputsection}
                              >
                                <TextField
                                  variant="outlined"
                                  placeholder="https://"
                                  name="facebook"
                                  value={values.facebook}
                                  error={Boolean(
                                    touched.facebook && errors.facebook
                                  )}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                                <FormHelperText
                                  error
                                  style={{ paddingBottom: "15px" }}
                                >
                                  {touched.facebook && errors.facebook}
                                </FormHelperText>
                              </FormControl>
                              <Typography
                                variant="body1"
                                color="primary"
                                className={classes.fontSixeText}
                              >
                                Personal site or portfolio
                              </Typography>

                              <FormControl
                                fullWidth
                                className={classes.inputsection}
                              >
                                <TextField
                                  variant="outlined"
                                  id="standard-adornment-amount"
                                  placeholder="Personal site"
                                  name="personalSite"
                                  value={values.personalSite}
                                  error={Boolean(
                                    touched.personalSite && errors.personalSite
                                  )}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                                <FormHelperText
                                  error
                                  style={{ paddingBottom: "15px" }}
                                >
                                  {touched.personalSite && errors.personalSite}
                                </FormHelperText>
                              </FormControl>
                              <Typography
                                variant="body1"
                                color="primary"
                                className={classes.fontSixeText}
                              >
                                Email{" "}
                                <span style={{ color: "#ff7d68" }}>*</span>
                              </Typography>

                              <FormControl
                                fullWidth
                                className={classes.inputsection}
                              >
                                {user?.userData?.userType === "Admin" ? (
                                  <TextField
                                    variant="outlined"
                                    readOnly
                                    id="standard-adornment-amount"
                                    placeholder="abc@gmail.com"
                                    name="email"
                                    value={values.email}
                                    error={Boolean(
                                      touched.email && errors.email
                                    )}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                ) : (
                                  <TextField
                                    variant="outlined"
                                    id="standard-adornment-amount"
                                    placeholder="abc@gmail.com"
                                    name="email"
                                    value={values.email}
                                    error={Boolean(
                                      touched.email && errors.email
                                    )}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                )}

                                <FormHelperText
                                  error
                                  style={{ paddingBottom: "15px" }}
                                >
                                  {touched.email && errors.email}
                                </FormHelperText>
                              </FormControl>
                              <Box className={classes.imgsecbox} height="100%">
                                <Box className={classes.colorbox}>
                                  <CommonDropZone
                                    height="220px"
                                    width="218px"
                                    profileImage64={profileImage64}
                                    classes={classes}
                                    setProfileImage64={(item) =>
                                      setProfileImage64(item)
                                    }
                                  />
                                </Box>
                                <Box className={classes.colorbox} mt={2}>
                                  <CommonDropZone
                                    label="Add Cover Image"
                                    title="We recommend a square image of atleast
                                    1200x400 - Gifs work too."
                                    profileImage64={coverImage64}
                                    classes={classes}
                                    type="cover"
                                    setProfileImage64={(item) =>
                                      setCoverImage64(item)
                                    }
                                  />
                                </Box>
                              </Box>
                              <Box align="left" mt={2}>
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  size="large"
                                  type="submit"
                                  disabled={loader1}
                                >
                                  UPDATE PROFILE
                                  {loader1 && <ButtonCircularProgress />}
                                </Button>
                              </Box>
                            </Box>
                          </Box>
                        </Paper>
                      </Form>
                    )}
                  </Formik>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={5}
                  className={classes.imagefiled}
                >
                  <Box className={classes.imgsecbox1}>
                    <Paper elevation={2}>
                      <Box className={classes.colorbox}>
                        <CommonDropZone
                          profileImage64={profileImage64}
                          classes={classes}
                          height="220px"
                          width="218px"
                          setProfileImage64={(item) => setProfileImage64(item)}
                        />
                      </Box>
                    </Paper>
                    <Box mt={2}>
                      <Paper elevation={2}>
                        <Box className={classes.colorbox}>
                          <CommonDropZone
                            label="Add Cover Image"
                            title="We recommend a square image of atleast
                            1200x400 - Gifs work too."
                            profileImage64={coverImage64}
                            classes={classes}
                            type="cover"
                            setProfileImage64={(item) => setCoverImage64(item)}
                          />
                        </Box>
                      </Paper>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        )}
      </Box>
    </>
  );
}

const CommonDropZone = ({
  classes,
  setProfileImage64,
  profileImage64,
  label,
  title,
  height,
  width,
  type,
}) => {
  const theme = useTheme();

  return (
    <>
      <label>{label ? label : "Add Profile Image"} </label>
      <Box style={{ padding: "3px 0px" }}>
        <small
          style={{
            fontSize: "14px",
            color: theme.name === "DARK" && "rgba(255, 255, 255, 0.60)",
            fontWeight: "300",
          }}
        >
          {title
            ? title
            : "We recommend a square image of atleast 400x400 - Gifs work too."}
        </small>
      </Box>
      {profileImage64 && (
        <Box
          style={{ width: type && type === "cover" && "100%" }}
          className={classes.Box}
          mt={2}
        >
          {profileImage64 && (
            <img
              style={{
                width: type && type === "cover" && "100%",
                objectFit: "cover",
              }}
              className={classes.Box}
              src={profileImage64}
              alt=""
            />
          )}
        </Box>
      )}
      {profileImage64 ? (
        <>
          <Box align="left" style={{ marginTop: "18px" }}>
            {" "}
            <Button
              variant="contained"
              color="secondary"
              component="span"
              onClick={() => setProfileImage64("")}
            >
              Remove
            </Button>
          </Box>
        </>
      ) : (
        <Box
          style={{ height: height, width: width }}
          align="left"
          mt={3}
          mb={4}
          className={classes.dropZOne}
        >
          <DropzoneArea
            style={{ marginTop: "5px", height: height }}
            maxFileSize={5000000}
            filesLimit={1}
            acceptedFiles={[
              "image/jpg",
              "image/jpeg",
              "image/png",
              "image/bmp",
              "image/gif",
            ]}
            onChange={(file) => {
              if (file && file.length > 0) {
                getBase64(file[0], (result) => {
                  setProfileImage64(result);
                });
              }
            }}
          />
          <Box className="dropDoneText">
            <FiUpload style={{ height: "20px", width: "20px" }} />
            <Typography>
              Drag & drop files or{" "}
              <span
                style={{
                  fontSize: "16px",
                }}
              >
                Browse Files
              </span>
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};
