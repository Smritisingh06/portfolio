import { Box, Container, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import DataLoading from "src/component/DataLoading";
import Nodatafound from "src/component/DataDataNo";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
    "& p": {
      color: "#686868",
      marginBottom: "10px",
    },
    "& h5": {
      marginBottom: "10px",
      marginTop: "20px",
    },
    "& li": {
      color: "#686868",
      marginBottom: "10px",
      fontSize: "14px",
    },
  },
  heading: {
    textAlign: "start",
  },
  details: {
    // "& .manageHeight": {
    //   height: "56px",
    // },
    "& figure": {
      marginLeft: "0",
    },
    "& a": {
      color: `${theme.palette.primary.main}!important`,
      background: "unset !important",
    },
    "& td": {
      border: "0.5px solid",
      padding: "0 2px",
      borderColor: `${theme.palette.primary.main}!important`,
      whiteSpace: "pre",
    },
    "& span, section": {
      background: "unset !important",
      color: theme.palette.secondary.main,
      fontSize: "12px",
      // textOverflow: "ellipsis",

      // overflow: "hidden",
      // width: "100%",
      // whiteSpace: "nowrap",
      //   background: "unset !important",
      //   color: `${theme.palette.primary.main}!important`,
      //   fontFamily: "unset !important",
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
      color: `${theme.palette.primary.main}!important`,
      wordBreak: "break-word",
      overflow: "auto",
    },
    "& h4": {
      background: "unset !important",
      color: `${theme.palette.primary.main}!important`,
      // fontSize: "30px",
      // lineHeight: "42px",
      overflow: "visible",
      fontWeight: "600",
      marginBottom: "15px",
    },
    "& h5": {
      background: "unset !important",
      color: `${theme.palette.primary.main}!important`,
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
      color: `${theme.palette.primary.main}!important`,
      fontSize: "12px",
      // textOverflow: "ellipsis",

      // overflow: "hidden",
      // width: "100%",
      // whiteSpace: "nowrap",
    },
  },
}));
const StaticView = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [aboutUs, setaboutUs] = useState();
  const aboutuslistApi = async () => {
    try {
      const res = await axios.get(Apiconfigs.staticContentList, {
        // headers: {
        //   token: sessionStorage.getItem("token"),
        // },
      });
      if (res.data.statusCode === 200) {
        setIsLoading(false);
        const result = res.data.result.filter((data) => data.type === "aml");
        setaboutUs(result[0]);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("ERROR", error);
      setaboutUs({});
    }
    setIsLoading(false);
  };
  useEffect(() => {
    aboutuslistApi();
  }, []);

  return (
    <Box className={classes.root}>
      <Container maxWidth="lg">
        {isLoading && <DataLoading />}
        {!isLoading && (
          <Paper elevation={2}>
            <Box className={classes.heading}>
              <Typography variant="h1" color="primary">
                {/* About&nbsp;Us */}
                {aboutUs?.title
                  ? aboutUs?.title === "Anti-money laundering (AML)"
                    ? "General Risk Discloser"
                    : aboutUs?.title
                  : "General Risk Discloser"}
              </Typography>
            </Box>

            <Box className={classes.details} mt={2}>
              <div
                className={"manageHeight"}
                dangerouslySetInnerHTML={{
                  __html: aboutUs?.description,
                }}
              />
            </Box>
            {!aboutUs && (
              <Box>
                <Nodatafound />
              </Box>
            )}
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default StaticView;
