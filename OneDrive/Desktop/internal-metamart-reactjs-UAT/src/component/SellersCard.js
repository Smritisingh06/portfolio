import React from "react";
import {
  Box,
  Typography,
  makeStyles,
  List,
  ListItem,
  Divider,
  Paper,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { changeExtenstion, sortAddress } from "src/utils";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import CopyToClipboard from "react-copy-to-clipboard";

const useStyles = makeStyles((theme) => ({
  SellersCardBox: {
    padding: "20px",
    // margin: "6px",
    // borderRadius: '9px',
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    border: "0.908481px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "9.08481px",
    // background: "#000",
    // background: theme.palette.background.sellercard,
    "& .copyImg": {
      height: "20px",
      width: "20px",
      marginLeft: "6px",
      [theme.breakpoints.only("xs")]: {
        height: "10px",
        width: "10px",
      },
    },
    "& ul": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 0,
      "& li": {
        padding: 0,
      },
    },
    "& figure": {
      height: "50px",
      width: "50px",
      margin: 0,
      borderRadius: "50%",
      backgroundColor: "#8f8f8f",
      marginRight: "10px",
      position: "relative",
      [theme.breakpoints.only("xs")]: {
        height: "30px",
        width: "30px",
      },
      "& svg": {
        position: "absolute",
        top: "-5px",
        right: 0,
        color: "#2599fa",
        fontSize: "12px",
      },
      "& img": {
        width: "100%",
        maxWidth: "100%",
        height: "100%",
        borderRadius: "50%",
      },
      "& .vectorImg": {
        position: "absolute",
        top: "-3px",
        right: "-5px",
      },
    },
    "& h6": {
      width: " 100%",
      maxWidth: "100px",
      overflow: " hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      color: theme.palette.primary.main,
      fontSize: "16px ",
      [theme.breakpoints.down("md")]: {
        maxWidth: "100px",
      },
      [theme.breakpoints.down("sm")]: {
        maxWidth: "150px",
        fontSize: "12px !important",
      },
    },
    "& p": {
      // color: "#9f9d9f",
      color: theme.palette.text.gray,
      display: "flex",
    },
    "& label": {
      fontSize: "14px",
      color: "#8B939A",
    },
    "& span": {
      fontSize: "12px",
    },
    "& small": {
      color: " #fff",
      paddingRight: "10px",
      fontSize: "12px",
      fontWeight: "500",
      marginTop: "0",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "5px 9px",
      display: "block",
    },
  },
  itemsDividerBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
    "& h6": {
      fontFamily: "'Good Times Rg', sans-serif",
      lineHeight: "22px",
    },
    "& .MuiDivider-vertical": {
      border: "0.908481px solid rgba(255, 255, 255, 0.1)",
      height: "46px",
      width: "unset",
      margin: "0px 12px",
    },
    "& .itemsBox": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingLeft: "37px",
      },
      "& h6": {
        width: "auto",
        paddingRight: "7px",
      },
    },
  },
  firstChild: {
    width: "100%",
  },
}));
export default function SellersCard(props) {
  const classes = useStyles();
  const { data, number, userType } = props;

  const history = useHistory();

  return (
    <Paper elevation={2} className={classes.SellersCardBox}>
      {/* <img src="images/cardline.png" /> */}
      <List>
        <ListItem className={classes.firstChild}>
          <figure
            onClick={() => {
              history.push({
                pathname: "/author",
                search: data?._id,
                state: {
                  data: data,
                },
              });
            }}
          >
            <img
              src={
                data?.profilePic
                  ? changeExtenstion(data?.profilePic)
                  : "images/HovR.png"
              }
            />
            <Box className="vectorImg"></Box>
          </figure>
          <Box>
            <Typography
              variant="h6"
              onClick={() => {
                history.push({
                  pathname: "/author",
                  search: data?._id,
                  state: {
                    data: data,
                  },
                });
              }}
            >
              {data?.name ? data?.name : "..."}
            </Typography>
            <Typography variant="body2">
              {" "}
              {data.price ? data.price : sortAddress(data.walletAddress)}&nbsp;
              <CopyToClipboard text={data.walletAddress}>
                {/* <FileCopyIcon
                  style={{ cursor: "pointer", fontSize: "13px" }}
                  onClick={() => toast.info("Copied")}
                /> */}
                <img
                  src="images/copyicon.png"
                  className="copyImg"
                  onClick={() => toast.info("Copied")}
                  style={{ cursor: "pointer",
                    filter: "grayscale(100%) brightness(1000%) contrast(100%)",

                   }}
                />
              </CopyToClipboard>
            </Typography>
          </Box>
        </ListItem>
      </List>

      <Box className={classes.itemsDividerBox}>
        <Divider orientation="vertical" className="mobile_hide" />
        <Box className="itemsBox">
          <Typography variant="h6" color="primary">
            {userType === "Sellers" ? data?.topSaler : data?.topBuyer}
          </Typography>
          <Typography variant="body1" color="primary">
            Items
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
