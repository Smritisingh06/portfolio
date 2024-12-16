import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Container,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import { UserContext } from "src/context/User";

const useStyles = makeStyles({
  mainBox: {
    paddingTop: "32px",
    "& .termsAndConditions": {
      padding: "25px",
    },
  },
  btn: {
    backgroundColor: "#313b48",
    color: "#FFFFFF",
    borderRadius: "40px",
    width: "150px",
    "&:hover": {
      background:
        "linear-gradient(124deg, rgba(47, 89, 149, 0.81) 18.76%, rgba(21, 29, 42, 0.87) 43.13%, rgba(0, 88, 241, 0.65) 96.83%)",
    },
  },
  imgbox: {
    width: "500px",
    // display: "flex",
    // margin: "0 auto",
    // justifyContent: "center",
  },
});

const ViewStaticContent = () => {
  const history = useHistory();
  const classes = useStyles();
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

  const [isLoading, setIsLoading] = useState(true);
  const [staticContent, setStaticContent] = useState(true);

  const HandleViewStaticContent = async (type) => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.viewStaticContent,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        params: { type: type },
      });
      if (res.data.statusCode === 200) {
        setStaticContent(res.data.result);
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
    let type = location.search.split("?")[1];
    if (type) {
      HandleViewStaticContent(type);
    }
  }, [location.search]);

  return (
    <>
      <Container maxWidth="md">
        <Box className={classes.mainBox}>
          <Paper elevation={2} className="termsAndConditions">
            <Box className={classes.heading}>
              <Typography variant="h2" color="primary">
                View <span>Static Content</span>
              </Typography>
            </Box>
            <Grid container direction={"column"} spacing={3}>
              <Grid item xs={12}>
                <Box pt={3}>
                  <Grid container spacing={1}>
                    <Grid item lg={3} md={3} sm={3} xs={12}>
                      <Box>
                        <Typography variant="h5" color="primary">
                          {" "}
                          Title :{" "}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item lg={9} md={9} sm={9} xs={12}>
                      <Typography variant="body2">
                        {staticContent.title}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} style={{ marginTop: "-25px" }}>
                <Box>
                  <Grid container spacing={1}>
                    <Grid item lg={3} md={3} sm={3} xs={12}>
                      <Typography variant="h5" color="primary">
                        Description :
                      </Typography>
                    </Grid>
                    <Grid item lg={9} md={9} sm={9} xs={12}>
                      <Typography
                        variant="body2"
                        style={{ wordBreak: "break-all", marginTop: "-17px" }}
                      >
                        <div
                          className={classes.descriptionText}
                          dangerouslySetInnerHTML={{
                            __html: staticContent.description,
                          }}
                        />
                        {/* {faqdata.answer}  */}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            {/* <Box pt={3}>
              <Typography variant="h3" color="primary" style={{ color: "#51ACED" }}>
                Question :{" "}
              </Typography>
              <Typography variant="h6">{faqdata.question}</Typography>
            </Box> */}
            <Box pt={2}>
              <Grid container direction={"column"} spacing={2}>
                {/* <Grid item xs={12}>
                  <Typography variant="h3" color="primary" style={{ color: "#51ACED" }}>
                    Answer :{" "}
                  </Typography>
                  <Typography variant="h6">
                    <div
                      dangerouslySetInnerHTML={{ __html: showdata.description }}
                    />
                    {faqdata.answer}
                  </Typography>
                </Grid> */}
                <Grid item xs={12} align="center">
                  <Box pb={2} pt={1}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={() => history.goBack()}
                    >
                      Back
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default ViewStaticContent;
