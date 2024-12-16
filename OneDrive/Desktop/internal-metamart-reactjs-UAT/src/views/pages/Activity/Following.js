import { Box, Typography, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useHistory } from "react-router-dom";
import { sortAddress } from "src/utils";
const useStyles = makeStyles((theme) => ({
  heading: {
    "& h3": {
      color: theme.palette.secondary.main,
      fontSize: "40px",
      fontWeight: "700",
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
  },
  nftimg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50px",
      width: "50px",
      backgroundColor: "#fafefd",
      overflow: "hidden",
      borderRadius: "10px",
      margin: "0",
      "& img": {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "100%",
        display: "block",
      },
    },
  },
  colorbox: {
    display: "flex",
    alignItems: "center",
    height: "auto",
  },
  textbox: {
    "& h3": {
      fontWeight: "500",
      fontSize: "12px !important ",
      lineHeight: "13px",
    },
    "& h4": {
      marginTop: "3px",
      color: "#454545",
      fontWeight: "500",
      fontSize: "12px !important",
      lineHeight: "13px",
    },
    "& h5": {
      marginTop: "3px",
      fontWeight: "500",
      fontSize: "11px !important",
      lineHeight: "13px",
      color: "#828282",
    },
  },
}));

export default function Following(props) {
  const { activityNFTList } = props;
  const history = useHistory();
  const classes = useStyles();
  return (
    <>
      {activityNFTList &&
        activityNFTList.map((data, index) => {
          return (
            <Grid item xs={12} md={6} sm={12} lg={6} className={classes.orer}>
              <Paper elevation={2}>
                <Box className={classes.colorbox}>
                  <Box
                    className={classes.nftimg}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      history.push({
                        pathname: "/author",
                        search: data?.followerId?._id,
                      });
                    }}
                  >
                    <figure>
                      <img
                        src={
                          data?.followerId?.profilePic
                            ? data?.followerId?.profilePic
                            : " /images/Explore/Explore1.png"
                        }
                        alt=""
                      />
                    </figure>
                  </Box>
                  <Box className={classes.textbox} ml={2}>
                    <Typography variant="h3" color="primary">
                      {" "}
                      {data?.followerId?.name
                        ? data?.followerId?.name
                        : sortAddress(data?.followerId?.walletAddress)}
                    </Typography>
                    <Typography variant="h4">
                      {" "}
                      {data.type === "FOLLOW" ? "Followed by" : "Unfollowed by"}
                    </Typography>
                    <Typography variant="h5">
                      {" "}
                      {data?.userId?.name
                        ? data?.userId?.name
                        : sortAddress(data?.userId?.walletAddress)}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          );
        })}
    </>
  );
}
