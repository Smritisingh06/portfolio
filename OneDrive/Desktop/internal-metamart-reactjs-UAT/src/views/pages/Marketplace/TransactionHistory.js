import React, { useState, useRef } from 'react'

import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Hidden,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
const useStyles = makeStyles((theme) => ({
  maintable: {
    height: '300px',
    overflowY: 'scroll',
  },
  Boxmain: {
    marginTop: '30px',
    '& h5': {
      color: '#fff',
      marginBottom: '20px',
      //textDecoration: 'underline',
    },
  },
  table: {
    backgroundColor: '#15172d',
    '& p': {
      margin: 0,
      color: 'rgb(225, 173, 26)',
      fontWeight: 500,
    },
    '& span': {
      padding: '3px 10px',
      fontSize: '12px',
      borderRadius: '10px',
      color: '#fff',
      boxSizing: 'border-box',
      background: 'linear-gradient(272.26deg, #EFBD31 36.78%, #DAA50F 86.13%)',
      boxShadow: 'inset 0px 0px 2px rgba(0, 0, 0, 0.4)',
      '@media(max-width:767px)': {},
      '&:hover': {
        background: 'linear-gradient(272.26deg, #AD8208 36.78%,#AD8208 86.13%)',
        color: '#fff',
        border: '3px solid #F0BD31 ',
      },
    },
  },
  tablebox: {
    //backgroundColor: '#022826',
    backgroundColor: '#164846',
  },
}))
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'rgb(43 108 105)',
    },
  },
}))(TableRow)
export default function NftDetails() {
  const classes = useStyles()
  return (
    <Box className={classes.Boxmain}>
      <Typography variant="h5">Transaction History</Typography>
      <TableContainer component={Paper} className={classes.maintable}>
        <Table className={classes.table} aria-label="customized table">
          <TableBody>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                <p> 0xab...e3d9</p>
                <span>Buy</span>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p> 0xab...e3d9</p>
                <label>To</label>
              </StyledTableCell>
              <StyledTableCell align="left">
                {' '}
                <p> 0xab...e3d9</p>
                <label>TX</label>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p style={{ color: '#fff' }}>76.8800 BSW</p>
                <label>3 days ago</label>
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow className={classes.tablebox}>
              <StyledTableCell component="th" scope="row">
                <p> 0xab...e3d9</p>
                <span>Buy</span>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p> 0xab...e3d9</p>
                <label>To</label>
              </StyledTableCell>
              <StyledTableCell align="left">
                {' '}
                <p> 0xab...e3d9</p>
                <label>TX</label>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p style={{ color: '#fff' }}>76.8800 BSW</p>
                <label>3 days ago</label>
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                <p> 0xab...e3d9</p>
                <span style={{ backgroundColor: '#a51f2c' }}>
                  Canceled offer
                </span>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p> 0xab...e3d9</p>
                <label>To</label>
              </StyledTableCell>
              <StyledTableCell align="left">
                {' '}
                <p> 0xab...e3d9</p>
                <label>TX</label>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p style={{ color: '#fff' }}>76.8800 BSW</p>
                <label>3 days ago</label>
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow className={classes.tablebox}>
              <StyledTableCell component="th" scope="row">
                <p> 0xab...e3d9</p>
                <span>Buy</span>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p> 0xab...e3d9</p>
                <label>To</label>
              </StyledTableCell>
              <StyledTableCell align="left">
                {' '}
                <p> 0xab...e3d9</p>
                <label>TX</label>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p style={{ color: '#fff' }}>76.8800 BSW</p>
                <label>3 days ago</label>
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                <p> 0xab...e3d9</p>
                <span style={{ backgroundColor: '#a51f2c' }}>
                  Canceled offer
                </span>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p> 0xab...e3d9</p>
                <label>To</label>
              </StyledTableCell>
              <StyledTableCell align="left">
                {' '}
                <p> 0xab...e3d9</p>
                <label>TX</label>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p style={{ color: '#fff' }}>76.8800 BSW</p>
                <label>3 days ago</label>
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow className={classes.tablebox}>
              <StyledTableCell component="th" scope="row">
                <p> 0xab...e3d9</p>
                <span>Buy</span>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p> 0xab...e3d9</p>
                <label>To</label>
              </StyledTableCell>
              <StyledTableCell align="left">
                {' '}
                <p> 0xab...e3d9</p>
                <label>TX</label>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p style={{ color: '#fff' }}>76.8800 BSW</p>
                <label>3 days ago</label>
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                <p> 0xab...e3d9</p>
                <span style={{ backgroundColor: '#a51f2c' }}>
                  Canceled offer
                </span>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p> 0xab...e3d9</p>
                <label>To</label>
              </StyledTableCell>
              <StyledTableCell align="left">
                {' '}
                <p> 0xab...e3d9</p>
                <label>TX</label>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p style={{ color: '#fff' }}>76.8800 BSW</p>
                <label>3 days ago</label>
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow className={classes.tablebox}>
              <StyledTableCell component="th" scope="row">
                <p> 0xab...e3d9</p>
                <span>Buy</span>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p> 0xab...e3d9</p>
                <label>To</label>
              </StyledTableCell>
              <StyledTableCell align="left">
                {' '}
                <p> 0xab...e3d9</p>
                <label>TX</label>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p style={{ color: '#fff' }}>76.8800 BSW</p>
                <label>3 days ago</label>
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                <p> 0xab...e3d9</p>
                <span style={{ backgroundColor: '#a51f2c' }}>
                  Canceled offer
                </span>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p> 0xab...e3d9</p>
                <label>To</label>
              </StyledTableCell>
              <StyledTableCell align="left">
                {' '}
                <p> 0xab...e3d9</p>
                <label>TX</label>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p style={{ color: '#fff' }}>76.8800 BSW</p>
                <label>3 days ago</label>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
