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
    borderRadius: "15px",
    height: "200px",
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
  Cards: {
    position: "relative",
    "& .MuiIconButton-root": {
      background:
        "hsl(230.54deg 95.03% 63.21%)",

      position: "absolute",
      right: "10px",
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
export default function StepProofOfRecidentkyc({
  settimeData,
  setTabView,
  setProgressData,
  setHeadingData,
  NextPage,
  setProfileImage3ProofofResidence,
  setProfileImage643ProofOfRecident,
  profileImage643ProofOfRecident,
  isUploadingImage,
}) {
  const classes = useStyles();
  const [isSumbit, setIsSubmit] = useState(false);
  const [notAllow1, setNotAllow1] = useState(false);

  const BackPage = () => {
    setTabView("step1");
    setProgressData("36");
    settimeData("1");
    setHeadingData("Basic Information");
  };
  return (
    <Box className={classes.mainkycStep2Box}>
      {/* <Grid container spacing={3}>
       <Grid item xs={12} sm={6}>
          <Typography variant="body1">Select Document</Typography>
          <FormControl
            fullWidth
            variant="outlined"
            className={classes.outlineborder1}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={documents}
              onChange={handleChange}
              error={isSumbit && documents === "0"}
            >
              <MenuItem value={0} disabled>
                -Select document -
              </MenuItem>
              <MenuItem value="national">Government issued photo ID</MenuItem>
              <MenuItem value="passport">Passport</MenuItem>
              <MenuItem value="driving">Driving Lisence</MenuItem>
            </Select>
            {isSumbit && documents === "0" && (
              <FormHelperText error>Please select document</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            Document ID <span>*</span>
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Enter Document ID"
            fullWidth
            name="idNumber"
            value={idNumber}
            inputProps={{ maxLength: 51 }}
            onChange={(e) => setIdNumber(e.target.value)}
            error={
              (isSumbit && idNumber === "") ||
              (isSumbit && idNumber.length > 50)
            }
          />
          {isSumbit && idNumber.length > 50 && (
            <FormHelperText error>
              Please should not exceed 50 characters
            </FormHelperText>
          )}
          {isSumbit && idNumber === "" && (
            <FormHelperText error>Please enter Document ID</FormHelperText>
          )}
        </Grid>
      </Grid> */}
      <Box mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              Upload your proof of residence{" "}
              <span style={{ color: "#EB5A2C" }}>*</span>
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
              <Box className={classes.Cards}>
                <label htmlFor="raised-button-file3">
                  <figure className="figure" style={{ margin: "0px" }}>
                    {profileImage643ProofOfRecident === "" ? (
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
                            profileImage643ProofOfRecident
                              ? profileImage643ProofOfRecident
                              : "images/camera1.png"
                          }
                        />
                      </>
                    )}
                  </figure>
                </label>
                {profileImage643ProofOfRecident === "" ? (
                  ""
                ) : (
                  <IconButton
                    onClick={() => setProfileImage643ProofOfRecident("")}
                  >
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
                    // setProfileImage3ProofofResidence(e.target.files[0]);
                    // getBase64(e.target.files[0], (result) => {
                    //   setProfileImage643(result);
                    // });

                    let selectedFile = e.target.files[0];
                    // Check if the selected file is a GIF
                    if (selectedFile && selectedFile.type === "image/gif") {
                      setNotAllow1(true);
                      toast.warn("GIF files are not allowed.");
                      // Clear the input field
                      e.target.value = null;
                    } else {
                      setProfileImage3ProofofResidence(selectedFile);
                      // Convert the selected file to base64
                      getBase64(selectedFile, (result) => {
                        setProfileImage643ProofOfRecident(result);
                      });
                    }
                  }}
                />
              </>
            </Box>

            {notAllow1 && (
              <FormHelperText error>GIF files are not allowed.</FormHelperText>
            )}
            {isSumbit &&
              profileImage643ProofOfRecident === "" &&
              !notAllow1 && (
                <FormHelperText error>
                  Please select your proof of residence
                </FormHelperText>
              )}
            {isUploadingImage.front && (
              <FormHelperText error>Wait Image Uploading!</FormHelperText>
            )}
            <Typography variant="body2">Proof of Residence</Typography>
          </Grid>
        </Grid>
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
