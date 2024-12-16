import { Box, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { sortAddress } from "src/utils";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  boxsection: {
    overflow: "hidden",
    position: "relative",
    "& .lineBorder1": {
      top: "-53px",
      left: "50%",
      width: "auto",
      zIndex: "9",
      position: "absolute",
      maxWidth: "100%",
      transform: "rotate(90deg)",
    },
    [theme.breakpoints.down("xs")]: {
      borderRadius: "20px",
    },
  },

  mainimg: {
    width: "100%",
    height: "165px",
    overflow: "hidden",

    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "10px",
    backgroundColor: "#ccc !important",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "20px 20px 10px 10px",
    },
  },

  namesection: {
    paddingLeft: "15px",
    "& h6": {
      fontWeight: "bold",
      width: "100px",
      margin: "3px auto",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    "& p": {
      fontWeight: "600",
    },
  },

  btnfollow2: {
    background: theme.palette.background.black,
    padding: "0px 8px 5px",
    position: "absolute",
    top: "0",
    borderRadius: "0px 0px 10px 10px",
    "& .buttonfollow": {
      background: theme.palette.background.blur,
      textAlign: "center",
      borderRadius: "10px",
      padding: "0px 8px 5px",
      display: "flex",
      alignItems: "center",
    },
  },
  contentBox: {
    position: "relative",
    padding: "35px 0px 0px",
    "& .displaybox": {
      display: "flex",
      alignItems: "center",
    },
    "& .copyImg": {
      height: "20px",
      width: "20px",
      marginLeft: "6px",
      [theme.breakpoints.only("xs")]: {
        height: "10px",
        width: "10px",
      },
    },
  },
  paperBox: {
    "&:hover": {
      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      // filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
    },
  },
}));

export default function CreatorCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { data, type } = props;

  const updateDimensions = () => {
    var offsetWidth = document.getElementById(
      "imagecard" + data?._id
    ).offsetWidth;
    var newoofsetWidth = offsetWidth + 10;
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
  const [isValid, setIsValid] = React.useState(false);
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
    isImageUrlValid(data?.coverPic);
  }, [data?.coverPic]);
  return (
    <Paper elevation={2} className={classes.paperBox}>
      <Box className={classes.boxsection}>
        <Box display="flex" justifyContent="center">
          <Box className={classes.btnfollow2}>
            <Box className="buttonfollow">
              <Typography variant="body2" color="primary">
                Followers
              </Typography>
              <Box ml={1}>
                <Typography variant="body1" color="primary">
                  {" "}
                  {data?.followersCount}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        {console.log(data, " ----- data?.coverPic", data?.coverPic)}

        <Box
          id={`imagecard${data?._id}`}
          className={classes.mainimg}
          style={
            isValid
              ? { cursor: "pointer", background: "url(" + data?.coverPic + ")" }
              : {
                  cursor: "pointer",
                  background: "url(/images/BannerImg.png)",
                  // background: "url(" + "images/market_detail.png" + ")",
                }
          }
          onClick={() => {
            history.push({
              pathname: "/author",
              search: data._id,
            });
          }}
        ></Box>

        <Box className={classes.contentBox}>
          <img src="images/line.png" alt="image" className="lineBorder1" />
          <Box className="displayCenter">
            <Box className="displaybox">
              <Box
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push({
                    pathname: "/author",
                    search: data._id,
                  });
                }}
              >
                <img
                  src={
                    data?.profilePic ? data?.profilePic : "images/Profile.png"
                  }
                  alt=""
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "90px",
                  }}
                />
              </Box>
              <Box className={data.name ? classes.namesection : ""}>
                <Typography variant="h6" color="primary">
                  {data.name ? (
                    data.name
                  ) : (
                    <>
                      &nbsp;
                      {sortAddress(data?.walletAddress)}
                      <CopyToClipboard text={data.walletAddress}>
                        <img
                          src="images/copyicon.png"
                          className="copyImg"
                          onClick={() => toast.info("Copied")}
                          style={{
                            cursor: "pointer",
                            filter: "grayscale(100%) brightness(1000%) contrast(100%)",  // Turn to grayscale and darken to remove green
                          }}
                        />
                      </CopyToClipboard>
                    </>
                  )}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
