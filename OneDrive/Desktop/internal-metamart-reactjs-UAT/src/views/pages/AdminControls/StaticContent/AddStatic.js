import React, { useRef, useState, useEffect, useContext } from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Button,
  makeStyles,
  TextField,
  Paper,
  Select,
  MenuItem,
} from "@material-ui/core";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import axios from "axios";
import Apiconfig from "src/ApiConfig/ApiConfig";
import { useLocation, useHistory } from "react-router-dom";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { UserContext } from "src/context/User";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    paddingTop: "100px",
    "& .jodit-container:not(.jodit_inline)": {
      color: "#000",
      // background: theme.palette.primary.main,
    },
    "& .EditContentBox": {
      padding: "25px",
    },
  },
  btn: {
    background:
      "linear-gradient(124deg, rgba(47, 89, 149, 0.81) 18.76%, rgba(21, 29, 42, 0.87) 43.13%, rgba(0, 88, 241, 0.65) 96.83%)",
    color: "#FFFFFF",
    borderRadius: "40px",
    width: "130px",
    height: "6vh",
    "&:hover": {
      background: "#313b48",
    },
  },
  btn2: {
    background: "#313b48",
    color: "#FFFFFF",
    borderRadius: "40px",
    width: "130px",
    height: "6vh",
    "&:hover": {
      background:
        "linear-gradient(124deg, rgba(47, 89, 149, 0.81) 18.76%, rgba(21, 29, 42, 0.87) 43.13%, rgba(0, 88, 241, 0.65) 96.83%)",
    },
  },
}));

const AddStatic = () => {
  const classes = useStyles();
  const history = useHistory();
  const user = useContext(UserContext);

  const particularPermition = user?.permissions?.staticContentManagement;
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

  const location = useLocation();
  const [staticTitle, setStaticTitle] = useState("");
  const [staticType, setStaticType] = useState("na");
  const [description, setdescription] = useState("");
  const [loader, setLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const editor = useRef(null);
  const [idvalid, setisvalid] = useState(false);
  let searchId = location.search.split("?")[1];
  let hashId = location.hash.split("#")[1];

  const AddStaticHandler = async () => {
    setisvalid(true);
    if (staticTitle == "" || description == "" || staticType == "") {
      return;
    }
    setisvalid(false);
    try {
      setLoader(true);
      const res = await axios({
        method: "POST",
        url: Apiconfig.addStaticContent,
        //   headers: {
        //     token: window.localStorage.getItem("creatturAccessToken"),
        //   },
        data: {
          type: staticType,
          title: staticTitle,
          description: description,
        },
      }).then(async (res) => {
        if (res.data.statusCode === 200) {
          setLoader(false);
          history.goBack();
          toast.success(res.data.responseMessage);
        }
      });
    } catch (error) {
      console.log(error);
      setLoader(false);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      }
    }
  };
  const UpdateStaticHandler = async () => {
    setisvalid(true);
    if (staticTitle == "" || description == "" || staticType == "na") {
      return;
    }
    setisvalid(false);
    try {
      setLoader(true);
      const res = await axios({
        method: "PUT",
        url: Apiconfig.editStaticContent,
        //   headers: {
        //     token: window.localStorage.getItem("creatturAccessToken"),
        //   },
        data: {
          _id: searchId,
          title: staticTitle,
          description: description,
        },
      }).then(async (res) => {
        if (res.data.statusCode === 200) {
          setLoader(false);
          history.goBack();
          toast.success(res.data.responseMessage);
        }
      });
    } catch (error) {
      console.log(error);
      setLoader(false);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      }
    }
  };

  const HandleViewStaticContent = async (type) => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfig.viewStaticContent,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        params: { type: type },
      });
      if (res.data.statusCode === 200) {
        let staticData = res.data.result;
        setStaticTitle(res.data.result.title);
        setStaticType(res.data.result.type);
        setdescription(res.data.result.description);
        setIsLoading(false);
      } else {
        // toast.error(res.data.response_message);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      if (error.response) {
        // toast.error(error.response.data.responseMessage);
      } else {
        // toast.error(error.message);
      }
    }
  };
  useEffect(() => {
    if (hashId) {
      HandleViewStaticContent(hashId);
    }
  }, [hashId]);
  return (
    <>
      <Container maxWidth="md">
        <Box className={classes.mainBox}>
          <Paper eleivation={2} className="EditContentBox">
            <Box className={classes.heading}>
              <Typography variant="h2" color="primary">
                {hashId ? "Edit" : "Add"} Static Content
              </Typography>
            </Box>
            <Box mt={3}>
              <Grid container spacing={3}>
                <Grid item lg={3} md={3} sm={3} xs={12}>
                  <Box>
                    <Typography variant="h5"> Type </Typography>
                  </Box>
                </Grid>

                <Grid item lg={9} md={9} sm={9} xs={12}>
                  <Box
                    className={classes.selectitem}
                    style={{ marginTop: "6px" }}
                  >
                    <Select
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        setStaticType(e.target.value);
                      }}
                      value={staticType}
                      disabled={hashId}
                    >
                      <MenuItem value="na">Select</MenuItem>
                      <MenuItem value="aml">General Risk Discloser</MenuItem>
                      <MenuItem value="kycRule">LEGAL</MenuItem>
                    </Select>
                  </Box>

                  {idvalid && staticType === "na" && (
                    <Typography
                      variant="body"
                      style={{
                        color: "#ff7d68",
                        fontSize: "12px",
                      }}
                    >
                      Please select static type
                    </Typography>
                  )}
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={12}>
                  <Box>
                    <Typography variant="h5"> Title </Typography>
                  </Box>
                </Grid>
                <Grid item lg={9} md={9} sm={9} xs={12}>
                  <TextField
                    onChange={(e) => {
                      setStaticTitle(e.target.value);
                    }}
                    id="outlined-basic"
                    placeholder="Title "
                    // inputProps={{ min, max }}
                    fullWidth
                    variant="outlined"
                    inputProps={{ maxLength: 260 }}
                    value={staticTitle}
                  />
                  {idvalid && staticTitle === "" && (
                    <Typography
                      variant="body"
                      style={{
                        color: "#ff7d68",
                        fontSize: "12px",
                      }}
                    >
                      Please enter valid static title
                    </Typography>
                  )}
                </Grid>

                <Grid item lg={3} md={3} sm={3} xs={12}>
                  <Typography variant="h5">Description</Typography>
                </Grid>
                <Grid item lg={9} md={9} sm={9} xs={12}>
                  <JoditEditor
                    ref={editor}
                    value={description}
                    // config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(e) => setdescription(e)} // preferred to use only this option to update the content for performance reasons
                    onChange={(e) => setdescription(e)} // preferred to use only this option to update the content for performance reasons
                    inputProps={{ maxLength: 304 }}
                    style={{ color: "black" }}
                  />
                  {idvalid && description === "" && (
                    <Typography
                      variant="body"
                      style={{
                        color: "#ff7d68",
                        fontSize: "12px",
                      }}
                    >
                      Please enter valid description
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Box align="center" pt={4} pb={1}>
                <Button
                  style={{ marginRight: "8px" }}
                  type="submit"
                  disabled={loader}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (hashId) {
                      UpdateStaticHandler();
                    } else {
                      AddStaticHandler();
                    }
                  }}
                >
                  {hashId ? "Update" : "Submit"}{" "}
                  {loader && <ButtonCircularProgress />}
                </Button>
                <Button
                  style={{ marginLeft: "8px" }}
                  variant="contained"
                  color="primary"
                  onClick={() => history.goBack()}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
};
export default AddStatic;
