import {
  Box,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Typography,
  IconButton,
  FormControl,
  DialogContentText,
  InputAdornment,
  DialogTitle,
  TextField,
  InputBase,
  Button,
  Container,
} from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import BlockIcon from '@material-ui/icons/Block'
import { toast } from 'react-toastify'

import React, { useState, useEffect } from 'react'
import { Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { sortAddress } from 'src/utils'
import { useHistory } from 'react-router-dom'
import { BiSearchAlt2 } from 'react-icons/bi'
import ButtonCircularProgress from 'src/component/ButtonCircularProgress'
import axios from 'axios'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import apiConfig from 'src/ApiConfig/ApiConfig'
import { Pagination } from '@material-ui/lab'
import DataLoading from 'src/component/DataLoading'
import DataNotFound from 'src/component/DataNotFound'
import { Link } from 'react-router-dom'
import { GiCancel, GiPaintBrush } from 'react-icons/gi'
import Apiconfigs from 'src/ApiConfig/ApiConfig'
import moment from 'moment'
import { Delete, Edit } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root2: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // '@media(max-width:420px)': {
    //   display: 'block',
    // },
  },
  heading: {
    '& h4': {
      fontSize: '40px',
      fontWeight: '700',
      color: '#35A5F5',
      [theme.breakpoints.down('xs')]: {
        fontSize: '23px',
      },
    },
  },
  tablesection: {
    '& td': {
      color: '#52565c',
    },
  },
  colorbox: {
    // marginTop: "16px",
    width: '100%',
    height: 'auto',
    // background: "rgba(59, 13, 96, 0.4)",
    // backdropFilter: 'blur(44px)',
    borderRadius: '15px',
    paddingTop: '20px',
  },
}))
const TableHeading = [
  {
    id: 'Sr.No',
    label: 'Sr.No',
    align: 'left',
    minWidth: '25px',
    maxWidth: '30px',
  },
  { id: 'name', label: 'Title', align: 'left', minWidth: '160px' },

  {
    id: 'categoryicon',
    label: 'Icon',
    align: 'left',
    minWidth: '160px',
  },
  {
    id: 'date',
    label: 'Date',
    align: 'left',
    minWidth: '160px',
  },
  {
    id: 'status',
    label: 'Description',
    align: 'left',
    minWidth: '100px',
  },
  { id: ' Action', label: ' Action', align: 'left', minWidth: '160px' },
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

export default function MediaList() {
  const history = useHistory()
  const classes = useStyles()
  const [coverFileBase, setCoverFileBase] = useState('')

  const [search, setSearch] = useState()
  const [page, setPage] = useState(1)
  const [noOfPages, setNoOfPages] = useState(1)
  const [categorylist, setCategorylist] = useState([])
  const [isSubmit, setIsSubmit] = useState(false)
  const [bannerImage, setBannerImage] = useState('')
  const [isLoading1, setIsLoading1] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = React.useState(false)
  const [bannerImageBlob, setBannerImageBlob] = useState('')
  const [imgFile, setImgfile] = useState('')
  const [isBlockPop, setIsBlockPop] = useState(false)
  const [mediaId, setMediaId] = useState('')
  const [userBlockId, setUserBlockId] = useState('')
  const [deleteLoader, setdeleteLoader] = useState(false)

  const [aboutList, setAboutList] = useState([])
  const [formValue, setFormValue] = useState({
    CategoryName: '',
  })

  const getBase64 = (file, cb) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(reader.result)
    }
    reader.onerror = function (err) {
      console.log('Error: ', err)
    }
  }
  const _onInputChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    const temp = { ...formValue, [name]: value }
    setFormValue(temp)
    console.log('temp', temp)
  }
  const listCategoryApi = async () => {
    setIsLoading(true)

    try {
      const res = await axios({
        method: 'GET',
        url: Apiconfigs.pressMediaList,
      })
      if (res.data.statusCode === 200) {
        setCategorylist(res.data.result)
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)

      console.log(error)
    }
  }

  const deleteCategory = async (id) => {
    try {
      setdeleteLoader(true)
      const res = await axios({
        method: 'DELETE',
        url: Apiconfigs.deletePressMedia,
        headers: {
          token: window.sessionStorage.getItem('token'),
        },
        data: {
          _id: id,
        },
      })
      if (res.data.statusCode === 200) {
        toast.success(res.data.responseMessage)

        listCategoryApi()
        setIsBlockPop(false)
        setdeleteLoader(false)
      } else if (res.data.statusCode === 500) {
        toast.error(res.data.responseMessage)
        setdeleteLoader(false)
        setIsBlockPop(false)
      } else {
        toast.error(res.data.responseMessage)
        setdeleteLoader(false)
        setIsBlockPop(false)
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
      setdeleteLoader(false)
      setIsBlockPop(false)
    }
  }

  useEffect(() => {
    listCategoryApi()
  }, [])

  const onClickHandler = (data) => {
    setIsBlockPop(true)
    setUserBlockId(data)
  }
  return (
    <>
      <Container>
        <Box>
          <Box className={classes.colorbox} mt={1}>
            <Box className={classes.root2}>
              <Box className={classes.heading}>
                <Typography variant="h2" color="primary">
                  Media
                </Typography>
              </Box>
              <Box className="d-flex" style={{ padding: '5px' }}>
                <Link to="/edit-pressmedia" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="primary">
                    Add Media
                  </Button>
                </Link>
              </Box>
            </Box>
            <Box>
              <TableContainer className="tableHead">
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {TableHeading.map((data) => (
                        <TableCell
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
                    {categorylist &&
                      categorylist?.map((data, index) => {
                        return (
                          <TableRow
                            key={index}
                            className={classes.tablesection}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              style={{
                                textAlign: 'center',
                                textTransform: 'capitalize',
                                color: '#52565c',
                              }}
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                textAlign: 'center',
                                textTransform: 'capitalize',
                              }}
                            >
                              {data?.title}
                            </TableCell>

                            <TableCell
                              align="left"
                              style={{
                                textAlign: 'center',
                                textTransform: 'capitalize',
                              }}
                            >
                              <img
                                src={data?.image}
                                style={{
                                  height: '30px',
                                  width: '30px',
                                  borderRadius: '50%',
                                }}
                              />
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                textAlign: 'center',
                                textTransform: 'capitalize',
                              }}
                            >
                              {moment(data?.updatedAt).format('DD/MM/YYYY')}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{
                                textAlign: 'center',
                                textTransform: 'capitalize',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '90px',
                              }}
                            >
                              {data?.description}
                            </TableCell>

                            <TableCell
                              style={{
                                width: 5,

                                textAlign: 'center',
                              }}
                              align="right"
                            >
                              <Box
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-evenly',
                                }}
                              >
                                <BootstrapTooltip title="View Media">
                                  <VisibilityIcon
                                    onClick={() => {
                                      history.push({
                                        pathname: '/view-media',
                                        search: data?.userId?.toString(),
                                        hash: data?._id,
                                      })
                                    }}
                                    style={{
                                      fontSize: '25px',
                                      cursor: 'pointer',
                                      marginRight: '5px',
                                    }}
                                  />
                                </BootstrapTooltip>
                                <BootstrapTooltip title="Edit this Media">
                                  <Edit
                                    fontSize="small"
                                    style={{
                                      fontSize: '22px',
                                      cursor: 'pointer',
                                      marginTop: '2px',
                                    }}
                                    onClick={() => {
                                      history.push({
                                        pathname: '/edit-media',
                                        search: data?.userId?.toString(),
                                        hash: data?._id,
                                        state: { data },
                                      })
                                    }}
                                  />
                                </BootstrapTooltip>
                                <BootstrapTooltip title="Delete this Media">
                                  <Delete
                                    fontSize="small"
                                    style={{
                                      fontSize: '22px',
                                      cursor: 'pointer',
                                      marginTop: '2px',
                                    }}
                                    onClick={() => onClickHandler(data)}
                                  />
                                </BootstrapTooltip>
                              </Box>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    {isLoading && <ButtonCircularProgress />}
                  </TableBody>
                </Table>
              </TableContainer>
              {!isLoading && categorylist && categorylist.length === 0 && (
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
          </Box>
        </Box>
        <Dialog
          open={isBlockPop}
          onClose={() => setIsBlockPop(false)}
          className={classes.dialogSection}
        >
          <DialogTitle id="alert-dialog-title">
            <Typography variant="h5" color="primary">
              Delete Media?
            </Typography>
          </DialogTitle>
          <DialogContent style={{ marginTop: '-8px' }}>
            <DialogContentText
              id="alert-dialog-description"
              style={{ fontSize: '16px' }}
            >
              <Typography variant="body2" color="primary">
                Are you sure you want to Delete this Media ?
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ marginTop: '-16px', fontSize: '16px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => deleteCategory(userBlockId?._id)}
              autoFocus
            >
              Yes{' '}
              {deleteLoader && (
                <ButtonCircularProgress
                  style={{ height: '25px', width: '25px', marginLeft: '5px' }}
                />
              )}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setIsBlockPop(false)}
              size="large"
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  )
}
