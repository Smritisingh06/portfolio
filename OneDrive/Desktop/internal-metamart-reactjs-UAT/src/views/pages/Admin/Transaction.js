import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { sortAddress } from "src/utils";
import { Link, useHistory, useLocation } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import BlockIcon from "@material-ui/icons/Block";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  heading: {
    "& h4": {
      fontSize: "40px",
      fontWeight: "700",
      color: theme.palette.secondary.main,
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
  },
  colorbox: {
    // marginTop: "16px",
    width: "100%",
    height: "auto",
    background: "rgba(59, 13, 96, 0.4)",
    // backdropFilter: "blur(44px)",
    borderRadius: "15px",
    padding: "20px",
  },
  tablesection: {
    "& td": {
      color: "#fff",
    },
  },
  nftimg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "60px",
      overflow: "hidden",
      "& img": {
        borderRadius: "90px",
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "auto",
        display: "block",
      },
    },
  },
}));
const TableHeading = [
  {
    id: "Sr.No",
    label: "Sr.No",
    align: "left",
    minWidth: "25px",
    maxWidth: "70px",
  },
  { id: "Username", label: "NFT Image", align: "left", minWidth: "160px" },
  { id: "ID", label: "NFT Name", align: "left", maxWidth: "160px" },
  { id: "TxnHash", label: "Buy/Sold", align: "left", maxWidth: "160px" },
  { id: "Email", label: "From", align: "left", minWidth: "160px" },
  {
    id: "Amount",
    label: "To",
    align: "left",
    minWidth: "130px",
  },
  {
    id: "Coin name",
    label: "Data & Time",
    align: "left",
    minWidth: "160px",
  },

  { id: " Action", label: " Action", align: "left", minWidth: "160px" },
];
const row = [
  {
    userName: "./images/profile.png",
    TxnHash: "Buy",
    TransactionFee: "0.1 BNB",
    amount: "Test1",
    coinname: "Test10",
    date: "07/05/2022",
  },
  {
    userName: "./images/profile.png",
    TxnHash: "Buy",
    TransactionFee: "0.2 BNB",
    amount: "Gyanish",
    coinname: "Chandra",
    date: "07/05/2022",
  },
  {
    userName: "./images/profile.png",
    TxnHash: "Sold",
    TransactionFee: "0.3 BNB",
    amount: "John",
    coinname: "Sam",
    date: "07/05/2022",
  },
  {
    userName: "./images/profile.png",
    TxnHash: "Buy",
    TransactionFee: "0.4 BNB",
    amount: "Yarn",
    coinname: "Npm",
    date: "07/05/2022",
  },
  {
    userName: "./images/profile.png",
    TxnHash: "Sold",
    TransactionFee: "0.5 BNB",
    amount: "Mac",
    coinname: "Window",
    date: "07/05/2022",
  },
];
const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));
function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}
export default function Transaction() {
  const history = useHistory();
  const [data, setData] = useState();

  const classes = useStyles();
  return (
    <Box>
      <Box className={classes.heading} mt={4}>
        <Typography variant="h4">NFT List Management</Typography>
      </Box>
      <Box className={classes.colorbox} mt={2}>
        <Box style={{ border: "1px solid #3b0d60" }}>
          <TableContainer className="tableHead">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {TableHeading.map((data) => (
                    <TableCell
                      style={{
                        backgroundColor: "#3b0d60",
                        color: "#fff",
                        boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                        textAlign: "center",
                      }}
                    >
                      {data.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {row.map((row, index) => {
                  return (
                    <TableRow key={index} className={classes.tablesection}>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                          color: "#fff",
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                        className={classes.nftimg}
                      >
                        <figure>
                          <img src={row.userName} alt="nftimg" />
                        </figure>
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        Test #1 NFT
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {row.amount}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {row.amount}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {row.coinname}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {row.date}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 5,
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                        }}
                        align="right"
                      >
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <BootstrapTooltip title="View NFT Details">
                            <VisibilityIcon
                              onClick={() => {
                                history.push({
                                  pathname: "/nft",
                                  search: data?.userId?.toString(),
                                });
                              }}
                              style={{
                                fontSize: "25px",
                                cursor: "pointer",
                              }}
                            />
                          </BootstrapTooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
