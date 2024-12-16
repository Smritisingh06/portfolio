import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import ApiConfig from 'src/ApiConfig/ApiConfig'
import { useLocation } from 'react-router-dom'
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Container,
  makeStyles,
  Paper,
} from '@material-ui/core'
import ButtonCircularProgress from 'src/component/ButtonCircularProgress'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  mainbox: {
    paddingTop: '60px',
    paddingBottom: '50px',
    '& h1': {
      fontFamily: "'ClashDisplay-Medium'",
      '& span': { fontFamily: "'ClashDisplay-Extralight'" },
    },
    '& label': {
      padding: '0',
      fontSize: '14px',
      lineHeight: '33px',

      transition:
        'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
  },
}))

const EditCategory = ({ data }) => {
  const location = useLocation()
  const history = useHistory()
  const classes = useStyles()
  const [imgFile, setImgFile] = useState(location.state.data)
  const [id, setId] = useState([])
  const [isSubmit, setisSubmit] = useState(false)
  const [confirmation, setConfirmation] = useState(false)
  const [coverFileBase, setCoverFileBase] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [categoryData, setCategoryData] = useState(location.state.data)
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
  const editCategoryHandler = () => {
    setIsUpdating(true)
    const token = sessionStorage.getItem('token')
    try {
      setisSubmit(true)
      const formData = new FormData()
      formData.append(
        'categoryIcon',
        imgFile?.categoryIcon ? imgFile?.categoryIcon : imgFile,
      )
      formData.append('categoryId', id)
      formData.append(
        'categoryTitle',
        categoryData?.categoryTitle
          ? categoryData?.categoryTitle
          : categoryData.trim().toLowerCase(),
      )
      axios({
        method: 'PUT',
        url: ApiConfig.editCategory,
        headers: {
          token,
        },

        data: formData,
      })
        .then(async (response) => {
          if (response.data.statusCode === 200) {
            // toast.success(response.data.responseMessage);
            history.push('/category')
            toast.success('Category updated successfully ')
            setIsUpdating(false)
          } else if (response.statusCode === 401) {
            toast.success(response.data.responseMessage)
            setIsUpdating(false)
          } else {
            setIsUpdating(false)
            toast.success(response.data.responseMessage)
            setConfirmation(true)
          }
        })
        .catch((error) => {
          console.error(error.response)
          if (error.response) {
            toast.error(error.response.data.responseMessage)
          }
          setIsUpdating(false)
        })
      // }
    } catch (error) {
      console.error(error.response)
      if (error.response) {
        toast.error(error.response.data.responseMessage)
      }
    }
  }

  useEffect(() => {
    if (location.search && location.search.length > 0) {
      const ids = location.search.split('?')
    }

    const kid = location.hash.split('#')

    setId(kid[1])
  }, [location])
  return (
    <Box className={classes.mainbox}>
      <Container maxWidth="lg">
        <Box mb={5} textAlign="center">
          <Container maxWidth="sm">
            <Typography variant="h2" color="primary">
              Edit Category
            </Typography>

            <Typography variant="body2" color="primary">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form,
            </Typography>
          </Container>
        </Box>

        <Paper elevation={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <Box
                className={classes.createCollection}
                display="flex"
                // justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  style={{
                    border: '1px solid #52565c',
                    height: '100px',
                    width: '100px',
                    borderRadius: '50%',
                  }}
                >
                  <>
                    <img
                      src={
                        imgFile?.categoryIcon
                          ? imgFile?.categoryIcon
                          : coverFileBase
                      }
                      alt=""
                      width="100"
                      height="100"
                      style={{ borderRadius: '50%' }}
                    />

                    <figure></figure>
                  </>
                </Box>
                <Box pl={2}>
                  <Typography variant="body2">
                    We recommend an image of at least 400x400.
                  </Typography>
                  <Box my={1}>
                    <Typography variant="body2" color="primary">
                      Select Category Image
                    </Typography>
                  </Box>

                  <Box>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="raised-button-file-banner"
                      type="file"
                      name="collectionIMG"
                      onChange={(e) => {
                        // setCoverBlob(URL.createObjectURL(e.target.files[0]));
                        setImgFile(e.target.files[0])
                        getBase64(e.target.files[0], (result) => {
                          setCoverFileBase(result)
                        })
                      }}
                    />
                    <label htmlFor="raised-button-file-banner">
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        Choose File
                      </Button>
                    </label>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <Box>
                <label>*Title</label>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  name="categoryTitle"
                  onKeyPress={(event) => {
                    if (event?.key === '-' || event?.key === '+') {
                      event.preventDefault()
                    }
                  }}
                  onChange={(e) => {
                    setCategoryData(e.target.value)
                  }}
                  value={
                    categoryData?.categoryTitle
                      ? categoryData?.categoryTitle
                      : categoryData
                  }
                  helperText={
                    isSubmit &&
                    categoryData === '' && (
                      <p
                        style={{
                          color: '#ff7d68',
                          marginTop: '1px',
                        }}
                      >
                        {' '}
                        Please enter category name
                      </p>
                    )
                  }
                />
              </Box>
            </Grid>
          </Grid>

          <Box mt={4} display="flex" justifyContent="start" alignItem="cenetr">
            <Button
              color="primary"
              // disabled={isSubmitting}
              size="large"
              onClick={editCategoryHandler}
              variant="contained"
              disabled={isUpdating}
            >
              Submit {isUpdating && <ButtonCircularProgress />}
            </Button>
            <Box pl={2}>
              <Link to="/category" style={{ textDecoration: 'none' }}>
                <Button
                  color="primary"
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Cancel
                </Button>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default EditCategory
