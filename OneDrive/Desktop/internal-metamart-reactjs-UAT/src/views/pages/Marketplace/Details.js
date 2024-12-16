import React from "react";
import { Box, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { getContract, sortAddress, swichNetworkHandler } from "src/utils";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";
const useStyles = makeStyles((theme) => ({
  marketDetailsBox: {
    maxHeight: "257px",
    overflow: "auto",
    overflowX: "hidden",
  },
  marketbidsDetails: {
    background: theme.palette.background.card,
    boxSizing: "border-box",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "22px 0px 22px 22px",
    padding: "10px",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
}));
const details1 = [
  {
    name: "Owner",
    add: "0xC3d7...7A1b",
  },
];
export const Details = ({ orderDetails }) => {
  console.log("orderDetails=====", orderDetails);
  const classes = useStyles();
  return (
    <Paper elevation={2} className={classes.marketDetailsBox}>
      {details1.map((data, index) => {
        return (
          <Box className={classes.marketbidsDetails}>
            <Box className={classes.price1}>
              <Typography
                variant="h6"
                color="primary"
                style={{
                  whiteSpace: "pre",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  width: "250px",
                }}
              >
                {orderDetails?.userId?.name
                  ? orderDetails?.userId?.name
                  : sortAddress(orderDetails?.userId?.walletAddress)}
              </Typography>
              <Typography
                variant="body2"
                style={{ color: "rgb(112, 107, 107)" }}
              >
                {sortAddress(orderDetails?.userId?.walletAddress)}{" "}
                <CopyToClipboard text={orderDetails?.userId?.walletAddress}>
                  <img
                    src="images/copyicon.png"
                    alt="images"
                    width="13px"
                    style={{
                      cursor: "pointer",
                      filter: "grayscale(100%) brightness(1000%) contrast(100%)", 
                    }}
                    onClick={() => toast.info("Copied")}
                  />
                </CopyToClipboard>
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Paper>
  );
};
