import React, { useEffect } from "react";

import {
  makeStyles,
  Box,
  Container,
  List,
  ListItem,
  Paper,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useHistory, useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  tabBtn: {
    "& button": {
      borderRadius: "10px",
      fontWeight: "600",
      fontSize: "14px",
      marginRight: "4px",
      "&.active": {
        color: "#fff",
        boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
        background:
          "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
      },
    },
  },
  banner: {
    // padding: "80px 0",

    [theme.breakpoints.down("xs")]: {
      padding: "50px 0",
    },
    "& h3": {
      fontWeight: 700,
      fontSize: "30px",
      color: "#262424",
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
      "& img": {
        marginRight: "20px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
  },
  minBox: {
    "& .MuiListItem-gutters": {
      padding: "0",
    },
    "& .MuiList-padding": {
      padding: "0",
    },
    textAlign: "center",
    "& img": {
      width: "100%",
    },
    "& h6": {
      fontSize: "20px",
    },
  },
  contentBox: {
    position: "relative",
    padding: "30px 0px 0px",
    "& .lineBorder1": {
      top: "-53px",
      left: "50%",
      width: "auto",
      zIndex: "9",
      position: "absolute",
      maxWidth: "100%",
      transform: "rotate(90deg)",
    },
  },
  mainimg: {
    width: "100%",
    height: "130px ",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "10px",
    backgroundColor: "#ccc !important",
  },
}));

export default function MintNftCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { data, resalemint } = props;
  const location = useLocation();
  const updateDimensions = () => {
    var offsetWidth = document.getElementById(
      "imagecard" + data?._id
    ).offsetWidth;
    var newoofsetWidth = offsetWidth - 80;
    document.getElementById("imagecard" + data?._id).style.height =
      newoofsetWidth + "px";
  };
  useEffect(() => {
    updateDimensions();
  }, [data, data?._id]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div>
      <Box className={classes.banner}>
        <Container
          maxWidth="lg"
          style={{ paddingLeft: "0px", paddingRight: "0px" }}
        >
          <Box
            onClick={() => {
              history.push({
                pathname: "/profile",
                search: resalemint,
              });
            }}
          >
            {/* <Tilt className="Tilt"> */}
            <Paper elevation={2}>
              <Box data={data} className={classes.minBox}>
                <Box
                  id={`imagecard${data?._id}`}
                  className={classes.mainimg}
                  style={
                    data?.bannerImage
                      ? { background: "url(" + data?.nfdData?.image + ")" }
                      : {
                          background: "url(" + "images/market_detail.png" + ")",
                        }
                  }
                ></Box>
                {/* <List>
                  <ListItem
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      history.push({
                        pathname: "/mint-details",
                        search: data.id,
                      });
                    }}
                  >
                    <img
                    src={data?.nfdData?.image ? data?.nfdData?.image : ""}
                    alt=""
                  />
                   
                  </ListItem>
                </List> */}
                <Box className={classes.contentBox}>
                  <img
                    src="images/line.png"
                    alt="image"
                    className="lineBorder1"
                  />
                  <Typography variant="h6" color="primary">
                    {data?.nfdData?.name ? data?.nfdData?.name : "NA"}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* </Tilt> */}
          </Box>
        </Container>
      </Box>
    </div>
  );
}
