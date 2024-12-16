import {
  Box,
  Typography,
  makeStyles,
  Grid,
  Container,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import GridOnIcon from "@material-ui/icons/GridOn";
import MultilineChartIcon from "@material-ui/icons/MultilineChart";
// import Card from "src/component/Card";
import ItemBox from "./ItemBox";
import Index from "./Index";
import axios from "axios";
// import apiConfig from "src/config";
const useStyles = makeStyles((theme) => ({
  mainboxc: {
    "& h2": {
      color: "#ffffff",
      textAlign: "center",
    },
    "& h6": {
      color: "#ffffff",
      textAlign: "start",
    },
    "& span": {
      color: "#ff8b4d",
      textAlign: "center",
    },
  },
  itemboxstart: {
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
    backgroundColor: "#fff",
    padding: "20px",
    border: "1px solid #a6adb3",
    "& h5": {
      textAlign: "center",
    },
    "& h6": {
      textAlign: "center",
    },
  },
  itemboxlast: {
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
    backgroundColor: "#fff",
    padding: "20px",
    border: "1px solid #a6adb3",
    "& h5": {
      textAlign: "center",
    },
    "& h6": {
      textAlign: "center",
    },
  },
  itembox: {
    backgroundColor: "#fff",
    padding: "20px",
    border: "1px solid #a6adb3",
    "& h5": {
      textAlign: "center",
    },
    "& h6": {
      textAlign: "center",
    },
  },

  btnbox: {
    backgroundColor: "#FFF",
    padding: "10px 20px 10px 20px",
  },
  root: {
    "& .buttonbox": {
      "& button": {
        "&.active": {
          color: "#fff",
          background:
            "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
          boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
        },
        "&:hover": {
          color: "#fff",
          background:
            "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
          boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
        },
      },
    },
  },
}));
export default function Tab() {
  const classes = useStyles();
  const [item, setItem] = useState("item");
  // const getDashboardDataHandler = async () => {
  //   try {
  //     const res = await axios.get(apiConfig.alldata);
  //     console.log("res", res);
  //     if (res.data.statusCode === 200) {
  //       console.log("hello", dashBoardData);
  //       setDashBoardData(res.data.result);
  //     } else {
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getDashboardDataHandler();
  // }, []);
  return (
    <>
      <Box className={classes.root}>
        <Container maxWidth="lg">
          <Box
            className="buttonbox"
            style={{
              borderBottom: "2px solid #4ea6f5",
              paddingBottom: "5px",
            }}
            pt={5}
          >
            <Button
              className={classes.btnboxx}
              className={item === "item" ? "active" : " "}
              onClick={() => setItem("item")}
            >
              <GridOnIcon />
              &nbsp; Items
            </Button>
            &nbsp;&nbsp;
            <Button
              className={classes.btnbox}
              className={item === "details" ? "active" : " "}
              onClick={() => setItem("details")}
            >
              {" "}
              <MultilineChartIcon /> &nbsp; Activity
            </Button>
          </Box>
          <Box className="contentbox">
            {item === "item" ? <Index /> : ""}
            {item === "details" ? <ItemBox /> : ""}
          </Box>
        </Container>
      </Box>
    </>
  );
}
