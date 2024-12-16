import React, { useEffect, useContext } from "react";
import { Box, Typography, makeStyles, Paper, Avatar } from "@material-ui/core";
import { useHistory } from "react-router";
import SettingsContext from "src/context/SettingsContext";
const useStyles = makeStyles((theme) => ({
  hotgamecardBox: {
    "& .albumboxcard": {
      overflow: "hidden",
      width: "calc(100% - 34px) !important",
      cursor: "pointer",
      textAlign: "center",
      // margin: "10px",
      display: "flex",
      padding: "15px",
      position: "relative",
      background: theme.palette.background.card,
      transition: "0.5s",
      alignItems: "center",
      borderRadius: "11px",
      border: "1px solid #ffffff0f",
      "& h6": {
        whiteSpace: "pre",
        [theme.breakpoints.down("sm")]: {
          fontSize: "13px !important",
        },
      },
      "& .hoverCircle": {
        position: "absolute",
        top: "-40px",
        left: "92px",
        right: "0",
        zIndex: "1",
        borderRadius: "9%",
        width: "367px",
        height: "135px",
        background: "rgba(154, 70, 217, 0.43)",
        WebkitFilter: "blur(50px)",
        display: "none",
        [theme.breakpoints.down("md")]: {
          display: "none",
        },
      },
      "& .hoverCircleDarkClass": {
        background: "linear-gradient(180deg,rgb(59 21 64),#411248)",
        // background: "rgba(134, 32, 81, 0.56) !important",
      },
      "&:hover": {
        "& .hoverCircle": {
          display: "block",
        },
      },
      "& .hotlineBorder": {
        top: "14px",
        left: "46%",
        width: "auto",
        position: "absolute",
        maxWidth: "100%",
        [theme.breakpoints.down("md")]: {
          display: "none",
        },
      },
    },
    "& .hotavatarimg": {
      width: "147px",
      height: "147px",
      borderRadius: "10px",
      objectFit: "contain",
      zIndex: "9",
      [theme.breakpoints.down("md")]: {
        width: "90px",
        height: "90px",
      },
    },
    "& .gameprofileImage": {
      width: "65px",
      height: "65px",
      objectFit: "cover",
      marginLeft: "8px",
      zIndex: "9",
    },
    "& .hotgameLeft": {
      marginLeft: "24px",
      [theme.breakpoints.only("xs")]: {
        marginLeft: "7px",
      },
    },
    "& label": {
      backgroundColor: "#f0b514",
      color: "#000",
      position: "absolute",
      height: "20px",
      width: "150px",
      transform: "rotate(319deg)",
      left: "-39px",
      top: " 19px",
      fontSize: "11px",
    },
  },
  mainimg: {
    width: "100%",
    // height: "220px ",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "10px 10px 0px 0px",
    backgroundColor: "#ccc !important",
  },
}));
export default function HotgameCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { data, type } = props;
  const themesetting = useContext(SettingsContext);

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
    <Box className={classes.hotgamecardBox}>
      <Box className="albumboxcard" style={{ width: "100%" }}>
        <div
          className={
            themesetting?.settings?.theme === "DARK"
              ? "hoverCircle , hoverCircleDarkClass"
              : "hoverCircle"
          }
        ></div>
        <img src="images/line.png" alt="image" className="hotlineBorder" />
        <Box display="flex" alignItems="center">
          <Avatar className="hotavatarimg" src={data.bannerImage} />
          <Box
            id={`imagecard${data?._id}`}
            className={classes.mainimg}
            style={
              data?.bannerImage
                ? { background: "url(" + data?.bannerImage + ")" }
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
          <Box className="displaySpacebetween hotgameLeft">
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
            >
              <Avatar
                src={
                  data?.collectionImage
                    ? data?.collectionImage
                    : "/images/avaterimg.png"
                }
                className="gameprofileImage"
                alt="user"
              />
            </Box>

            <Box ml={1} position="relative" zIndex="9">
              <Typography
                variant="h6"
                align="center"
                style={{
                  width: "100px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  fontSize: "14px",
                }}
                color="primary"
              >
                {" "}
                {data?.displayName}{" "}
              </Typography>
              <Box className={classes.pricedata} position="relative" zIndex="9">
                {/* <Typography variant="h6"> */}
                <img src="images/qi.svg" alt="Vector Image" width="28px" />
                {/* &nbsp;&nbsp; */}
                {data?.price}
                {/* </Typography> */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
