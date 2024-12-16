import React, { useState, useRef } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Hidden,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles((theme) => ({
  maintable: {
    maxHeight: "300px",
    overflowY: "scroll",
  },
  Boxmain: {
    marginTop: "30px",
    "& h5": {
      color: "#fff",
      marginBottom: "20px",
      //textDecoration: 'underline',
    },
  },
  table: {
    backgroundColor: "#15172d",
    "& p": {
      margin: 0,
      color: "rgb(225, 173, 26)",
      fontWeight: 500,
    },
    "& span": {
      backgroundColor: "#7e8181",
      color: "#fff",
      padding: "3px 10px",
      borderRadius: "50px",
      fontSize: "12px",
    },
  },
}));
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#2B6C69",
    },
  },
}))(TableRow);
export default function NftDetails() {
  const classes = useStyles();
  return (
    <Box className={classes.Boxmain}>
      <Typography variant="h5">Offers</Typography>
      <TableContainer component={Paper} className={classes.maintable}>
        <Table className={classes.table} aria-label="customized table">
          <TableBody>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                <p> 0xab...e3d9</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p style={{ color: "#fff" }}>76.8800 BSW</p>
              </StyledTableCell>
              <StyledTableCell align="left">
                {" "}
                <label>3 days ago</label>
              </StyledTableCell>
              <StyledTableCell align="left">
                <span>canceled</span>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
