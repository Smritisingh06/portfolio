import {
  Box,
  Select,
  Grid,
  makeStyles,
  FormControl,
  Typography,
  Button,
  IconButton,
  Avatar,
  FormHelperText,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  imgsection1: {
    height: "200px",
    width: "100%",
    border: "1px dashed #343434",
    borderRadius: "10px",
    margin: "15px 0px",
    "& .MuiAvatar-img": {
      objectFit: "contain",
    },
  },
  BoxImg: {
    background: "rgb(67 67 67 / 17%) !important",
    border: "1px dashed #343434",
    // backdropFilter: "blur(30px)",
    borderRadius: "50%",
    height: "200px",
    width: "200px",
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    "& p": {
      color: "#9d9d9d",
    },
    "& span": {
      background:
        "hsl(230.54deg 95.03% 63.21%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textFillColor: "transparent",
    },
  },
  mainUpoadSection: {
    "&  .MuiAvatar-root": {
      border: "1px solid rgba(255, 255, 255, 0.4)",
      cursor: "pointer",
      height: "200px",
      display: "flex",
      background: "#2f2e2e",
      alignItems: "center",
      borderRadius: "100%",
      justifyContent: "center",
      width: "1000%",
      maxWidth: "200px",
      margin: "5px 0px",
    },
    "& .MuiIconButton-root": {
      background:
        "linear-gradient(93.14deg, #FFB000 -20.75%, #FF564D 11.84%, #FF0098 53.76%, #5D00C1 102.96%)",

      position: "absolute",
      right: "0px",
      bottom: "10px",
    },
  },
  mainkycStep2Box: {
    "& .MuiSelect-icon": {
      color: theme.palette.primary.main,
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
export default function StepSelfykyc({
  settimeData,
  setTabView,
  setProgressData,
  setHeadingData,
  NextPage,
  documents,
  setProfileImage3Selfi,
  setProfileImage643Selfi,
  profileImage643Selfi,
}) {
  const classes = useStyles();
  const [isSumbit, setIsSubmit] = useState(false);
  const [notAllowSelfi, setNotAllow1] = useState(false);

  const BackPage = () => {
    setTabView("step2");
    setProgressData("60");
    settimeData("2");
    setHeadingData("Upload Documents");
  };
  return (
    <Box className={classes.mainkycStep2Box}>
      <Box mt={2}>
        {
          //eslint-disable-next-line
          documents != "0" ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    Upload Selfie <span style={{ color: "#EB5A2C" }}>*</span>
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      color: "#9d9d9d",
                      fontSize: "11px",
                    }}
                  >
                    JPEG, PNG, (640 x 480 recommended)
                  </Typography>

                  <Box>
                    <Box className={classes.mainUpoadSection}>
                      <label htmlFor="raised-button-file3">
                        <figure className="figure" style={{ margin: "0px" }}>
                          {profileImage643Selfi === "" ? (
                            <>
                              {" "}
                              <Box my={2} className={classes.BoxImg}>
                                <Box textAlign="center">
                                  <img src="images/uploadimg.png" alt="" />
                                  <Typography variant="body2">
                                    <span>Browse Files</span>
                                  </Typography>
                                </Box>
                              </Box>
                            </>
                          ) : (
                            <>
                              {" "}
                              <Avatar
                                className={classes.imgsection1}
                                src={
                                  profileImage643Selfi
                                    ? profileImage643Selfi
                                    : "images/camera1.png"
                                }
                              />
                            </>
                          )}
                        </figure>
                      </label>
                      {profileImage643Selfi === "" ? (
                        ""
                      ) : (
                        <IconButton onClick={() => setProfileImage643Selfi("")}>
                          <MdDelete />
                        </IconButton>
                      )}
                    </Box>

                    <>
                      <input
                        style={{ display: "none" }}
                        id="raised-button-file3"
                        multiple
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          // setProfileImage3(e.target.files[0]);
                          // getBase64(e.target.files[0], (result) => {
                          //   setProfileImage643Selfi(result);
                          // });

                          let selectedFile = e.target.files[0];
                          // Check if the selected file is a GIF
                          if (
                            selectedFile &&
                            selectedFile.type === "image/gif"
                          ) {
                            setNotAllow1(true);
                            toast.warn("GIF files are not allowed.");
                            // Clear the input field
                            e.target.value = null;
                          } else {
                            setProfileImage3Selfi(selectedFile);
                            // Convert the selected file to base64
                            getBase64(selectedFile, (result) => {
                              setProfileImage643Selfi(result);
                            });
                          }
                        }}
                      />
                    </>
                  </Box>

                  {notAllowSelfi && (
                    <FormHelperText error>
                      GIF files are not allowed.
                    </FormHelperText>
                  )}
                  {isSumbit &&
                    profileImage643Selfi === "" &&
                    !notAllowSelfi && (
                      <FormHelperText error>
                        Please upload selfie
                      </FormHelperText>
                    )}
                </Grid>
              </Grid>
            </>
          ) : (
            <></>
          )
        }
      </Box>

      <Box display="flex" py={2}>
        <Box mr={1}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => BackPage()}
          >
            Back
          </Button>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            NextPage();
            setIsSubmit(true);
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
