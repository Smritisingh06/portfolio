import apiConfig from 'src/ApiConfig/ApiConfig'
import DataNotFound from 'src/component/DataNotFound'
import { CSVLink } from 'react-csv'

import {
  makeStyles,
  Box,
  Typography,
  Container,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Button,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import MoreIcon from '@material-ui/icons/More'
import BlockIcon from '@material-ui/icons/Block'
import { AiOutlineFundView } from 'react-icons/ai'
import { Tooltip } from '@material-ui/core'
import CopyToClipboard from 'react-copy-to-clipboard'
import { FaRegCopy } from 'react-icons/fa'
import { sortAddress } from 'src/utils'
import moment from 'moment'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { Pagination } from '@material-ui/lab'
import ButtonCircularProgress from 'src/component/ButtonCircularProgress'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useStyles = makeStyles((theme) => ({
  tablesection: {
    '& td': {
      color: '#fff',
    },
  },
  csvButton: {
    padding: ' 10px 19px',
    background:
      'linear-gradient(93.34deg, #FF6F37 6.82%, #FF2676 35.9%, #B801AA 68.08%, #7101BC 101.4%)',
    borderRadius: '10px',
    maxWidth: ' 105px',
    minWidth: '105px',
  },
  btncssbox: {
    paddingTop: '10px',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },
  heading: {
    // display: "flex",
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px',
    '& h4': {
      fontSize: '40px',
      fontWeight: '700',
      color: theme.palette.secondary.main,
      [theme.breakpoints.down('xs')]: {
        fontSize: '23px',
      },
    },
    '& .headBox': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '@media(max-width:370px)': {
        display: 'block',
      },
    },
  },
}))
const TableHeading = [
  {
    id: 'Sr.No',
    label: 'Sr.No',
    align: 'left',
  },
  // { id: "ID", label: "User Id", align: "left", maxWidth: "160px" },
  { id: 'Email', label: 'Email', align: 'left', minWidth: '160px' },

  { id: 'update', label: 'Date', align: 'left', minWidth: '160px' },
]
const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))
function BootstrapTooltip(props) {
  const classes = useStylesBootstrap()

  return <Tooltip arrow classes={classes} {...props} />
}
export default function SubscribersList() {
  const history = useHistory()
  const classes = useStyles()
  const [allListData, setAllListData] = useState([])
  const [allListData1, setAllListData1] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [noOfPages, setNoOfPages] = useState(1)
  const [page, setPage] = useState(1)

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const listfeedbackHandler = async () => {
    setIsLoading(true)
    try {
      const res = await axios({
        method: 'GET',
        url: apiConfig.userSubscriberList,
        headers: {
          token: window.sessionStorage.getItem('token'),
        },
        params: {
          page: page,
          limit: 100,
        },
      })
      var currencyId = []
      setAllListData1(currencyId)
      if (res.data.statusCode === 200) {
        setAllListData(res.data.result.docs)
        for (var i = 0; i < res.data.result.docs?.length; i++) {
          const coinIds = res.data.result.docs[i]?.email
          const coinIds1 = res.data.result.docs[i]?.createdAt
          let obj = {
            email: coinIds,
            date: coinIds1,
          }
          currencyId.push(obj)
        }
        setNoOfPages(res.data.result.pages)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  useEffect(() => {
    listfeedbackHandler()
  }, [page])

  const [comment, setComment] = React.useState([])
  const OpenModal = (comment) => {
    setComment(comment)

    setOpen(true)
  }

  return (
    <>
      <Container maxWidth="lg">
        <Box className={classes.heading} pt={3} pb={1}>
          <Box className="headBox" mb={1}>
            <Box>
              <Typography variant="h2" color="primary">
                Subscribers List
              </Typography>
            </Box>
            <Box>
              <Typography className={classes.csvButton}>
                <CSVLink
                  data={allListData1 && allListData1}
                  style={{
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                    textDecoration: 'none',
                  }}
                >
                  Download CSV
                </CSVLink>
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box style={{ borderRadius: '11px' }}>
          <TableContainer className="tableHead">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {TableHeading.map((data) => (
                    <TableCell
                      color="primary"
                      style={{
                        textAlign: 'center',
                      }}
                    >
                      {data.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {allListData1.map((data, index) => {
                  return (
                    <TableRow className={classes.tablesection}>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          textAlign: 'center',
                          textTransform: 'capitalize',
                          color: 'rgb(100 104 109)',
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          textAlign: 'left',
                          color: 'rgb(100 104 109)',
                          width: '500px',
                        }}
                      >
                        {data?.email ? data?.email : 'N/A'}
                      </TableCell>

                      <TableCell
                        align="left"
                        style={{
                          textAlign: 'center',
                          color: 'rgb(100 104 109)',
                          whiteSpace: 'pre',
                        }}
                      >
                        {moment(data?.date).format('lll')}
                      </TableCell>
                    </TableRow>
                  )
                })}

                {!isLoading && allListData && allListData.length === 0 && (
                  <Box
                    style={{
                      dislay: 'flex',
                      justifyContent: 'center',
                      marginTop: '1rem',
                    }}
                  ></Box>
                )}

                {isLoading && (
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      // width: "100%",
                      position: 'absolute',
                      marginTop: '10px',
                    }}
                  >
                    <ButtonCircularProgress />
                  </Box>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {!isLoading && allListData && allListData.length === 0 && (
            <Box
              style={{
                dislay: 'flex',
                justifyContent: 'center',
                marginTop: '1rem',
              }}
            >
              <DataNotFound />
            </Box>
          )}
        </Box>
        <Box className={classes.btncssbox}>
          <Box>
            {allListData && allListData.length != 0 ? (
              <Box mt={2} mb={2} display="flex" justifyContent="end">
                <Pagination
                  count={noOfPages}
                  page={page}
                  onChange={(e, v) => setPage(v)}
                />
              </Box>
            ) : (
              ''
            )}
          </Box>
        </Box>
      </Container>
    </>
  )
}
