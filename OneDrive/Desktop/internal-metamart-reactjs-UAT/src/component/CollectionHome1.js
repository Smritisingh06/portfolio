import React, { useContext, useEffect } from "react";
import { Box, Typography, makeStyles, Paper, Avatar } from "@material-ui/core";
import SettingsContext from "src/context/SettingsContext";
import { useHistory } from "react-router";
import { changeExtenstion } from "src/utils";
const useStyles = makeStyles((theme) => ({
  CollectioncardBox: {
    position: "relative",
    overflow: "hidden",
    "& .texts": {
      "& p": {
        fontSize: "11px",
        color: "#9e9b9c",
      },
    },
    "& .avatarimg": {
      width: "140px",
      height: "140px",
      borderRadius: "10px",
      objectFit: "contain",
      background: "#fff",
      zIndex: "9",
      [theme.breakpoints.down("sm")]: {
        width: "80px",
        height: "80px",
      },
      [theme.breakpoints.only("xs")]: {
        width: "63px",
        height: "63px",
      },
    },
    "& .profileImagge": {
      width: "65px",
      height: "65px",
      objectFit: "cover",
      marginLeft: "16px",
      background: "#fff",
      zIndex: "9",
      [theme.breakpoints.down("sm")]: {
        width: "40px",
        height: "40px",
      },
    },
    mainimg: {
      width: "100%",
      height: "190px ",
      overflow: "hidden",
      backgroundPosition: "center !important",
      backgroundSize: "cover !important",
      backgroundRepeat: " no-repeat !important",
      borderRadius: "10px 10px 0px 0px",
      backgroundColor: "#ccc !important",
    },
  },
  albumboxcard: {
    textAlign: "center",
    cursor: "pointer",
    overflow: "hidden",
    position: "relative",
    background: theme.palette.background.card,
    alignItems: "center",
    borderRadius: "11px",
    "&::before": {
      top: "40%",
      left: "-15px",
      width: "35px",
      height: "35px",
      content: '""',
      zIndex: "1",
      position: "absolute",
      borderRadius: "50%",
      background: "#0a0507",
    },
    "&::after": {
      top: "40%",
      right: "-15px",
      width: "35px",
      height: "35px",
      content: '""',
      zIndex: "1",
      position: "absolute",
      borderRadius: "50%",
      background: "#0a0507",
    },
    "& h6": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      [theme.breakpoints.down("sm")]: {
        fontSize: "13px !important",
      },
    },
  },
  label1: {
    top: "25px",
    right: "-31px",
    color: "#000",
    width: "150px",
    height: "20px",
    display: "flex",
    zIndex: "11",
    position: "absolute",
    fontSize: "11px",
    transform: "rotate(44deg)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0b514",
  },
  label2: {
    top: "20px",
    right: "-44px",
    color: "#000",
    width: "150px",
    height: "20px",
    display: "flex",
    zIndex: "11",
    position: "absolute",
    fontSize: "11px",
    transform: "rotate(44deg)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0b514",
    [theme.breakpoints.only("xs")]: {
      top: "9px",
      right: "-54px",
      fontSize: "8px",
      height: "16px",
    },
    [theme.breakpoints.only("sm")]: {
      top: "13px",
      right: "-52px",
      fontSize: "10px",
      height: "18px",
    },
  },
  albumboxcardlight: {
    textAlign: "center",
    cursor: "pointer",
    overflow: "hidden",
    position: "relative",
    background: theme.palette.background.card,
    alignItems: "center",
    borderRadius: "11px",
    "&::before": {
      top: "40%",
      left: "-15px",
      width: "35px",
      height: "35px",
      content: '""',
      zIndex: "1",
      position: "absolute",
      borderRadius: "50%",
      background: "#fff",
    },
    "&::after": {
      top: "40%",
      right: "-15px",
      width: "35px",
      height: "35px",
      content: '""',
      zIndex: "1",
      position: "absolute",
      borderRadius: "50%",
      background: "#fff",
    },
    "& label": {
      top: "25px",
      right: "-31px",
      color: "#000",
      width: "150px",
      height: "20px",
      display: "flex",
      zIndex: "11",
      position: "absolute",
      fontSize: "11px",
      transform: "rotate(44deg)",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f0b514",
    },
    "& h6": {
      whiteSpace: "nowrap",
      width: "100px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      textAlign: "left",
      [theme.breakpoints.down("sm")]: {
        fontSize: "13px !important",
      },
    },
  },
}));
export default function HotCollectionCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const themesetting = useContext(SettingsContext);
  const themeSeeting = useContext(SettingsContext);
  const { data, type } = props;
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
    <Box className={classes.CollectioncardBox}>
      <Box
        onClick={() => {
          history.push({
            pathname: "/collection-details",
            search: data?._id,
            state: {
              data: data,
            },
          });
        }}
        className={
          themeSeeting.settings.theme === "DARK"
            ? `${classes.albumboxcard}`
            : `${classes.albumboxcardlight}`
        }
        display={type === "collectionCard" ? "block" : "flex"}
        justifyContent={type === "collectionCard" ? "" : "space-between"}
        style={
          type === "collectionCard"
            ? { padding: "10px" }
            : {
                width: "calc(100% - 50px)",
                margin: "10px",
                padding: "15px",
              }
        }
      >
        <Box>
          {" "}
          <Box
            className={
              type === "collectionCard" ? "displayCenter" : "displayAlignStart"
            }
            style={type === "collectionCard" ? { marginTop: "35px" } : {}}
          >
            <Avatar
              style={
                type === "collectionCard"
                  ? { margin: "0px", marginRight: "15px" }
                  : {}
              }
              // onClick={() => {
              //   history.push({
              //     pathname: "/collection-details",
              //     search: data?._id,
              //     state: {
              //       data: data,
              //     },
              //   });
              // }}
              src={
                data?.collectionImage
                  ? changeExtenstion(data?.collectionImage)
                  : "/images/avaterimg.png"
              }
              alt="user"
              className="profileImagge"
            />
          </Box>
        </Box>
        <Box position="relative" zIndex="9" align="left" ml={1} width="100%">
          <Box mt={1} width="100%" className="texts">
            <Typography variant="h6" align="left" color="primary">
              {" "}
              {data?.displayName}{" "}
            </Typography>
            <Typography variant="body1" align="left" color="primary">
              {" "}
              Floor Prices: {data?.floorPrices}{" "}
            </Typography>
            {/* <Typography variant="body1" align="left" color="primary">
              {" "}
              Place NFT Count: {data?.placeNftCount}{" "}
            </Typography> */}
          </Box>
        </Box>
        {data?.isPromoted && (
          <label
            className={
              type === "collectionCard" ? classes.label1 : classes.label2
            }
          >
            Promoted
          </label>
        )}
        <Box
          display={type === "collectionCard" ? "block" : "flex"}
          alignItems="center"
        >
          <Avatar
            className="avatarimg"
            src={changeExtenstion(data.bannerImage)}
          />
          <Box
            id={`imagecard${data?._id}`}
            className={classes.mainimg}
            style={
              data?.bannerImage
                ? {
                    background:
                      "url(" + changeExtenstion(data?.bannerImage) + ")",
                    borderRadius: "10px",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundColor: "#fff",
                  }
                : { background: "url(" + "images/market_detail.png" + ")" }
            }
            onClick={() => {
              history.push({
                pathname: "/collection-details",
                search: data?._id,
                state: {
                  data: data,
                },
              });
            }}
          ></Box>
        </Box>{" "}
      </Box>
    </Box>
  );
}
