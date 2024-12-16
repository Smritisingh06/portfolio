import React, { useEffect } from 'react'
import { Box, Typography, makeStyles, Paper } from '@material-ui/core'
import { useHistory } from 'react-router'
const useStyles = makeStyles((theme) => ({
  collectionCardBox: {
    cursor: 'pointer',
    position: 'relative',
    '& label': {
      top: '25px',
      color: '#000',
      left: '-31px',
      width: '150px',
      height: '20px',
      display: 'flex',
      zIndex: '11',
      position: 'absolute',
      fontSize: '11px',
      transform: 'rotate(317deg)',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0b514',
    },
    '&:hover': {
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      filter: 'drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))',
    },
    '& h6': {
      width: '50px',
      margin: '3px auto',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    '& figure': {
      width: '100%',
      maxWidth: '70px',
      height: '70px',
      borderRadius: '50%',

      margin: '0',

      position: 'relative',
      background:
        'linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)',

      border: '3px solid #161616',
      background: 'rgb(42 123 135)',
    },
  },
  mainimg: {
    width: '100%',
    height: '130px ',
    overflow: 'hidden',
    backgroundPosition: 'center !important',
    backgroundSize: 'cover !important',
    backgroundRepeat: ' no-repeat !important',
    borderRadius: '10px',
    backgroundColor: '#ccc !important',
  },
  pricedata: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '8px',
    '& h6': {
      fontSize: '14px',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '& img': {
      width: '30px',
      // marginTop: " -18px",
      marginRight: '-6px',
    },
  },
  contentBox: {
    position: 'relative',
    padding: '30px 0px 0px',
    '& .lineBorder1': {
      top: '-53px',
      left: '50%',
      width: 'auto',
      zIndex: '9',
      position: 'absolute',
      maxWidth: '100%',
      transform: 'rotate(90deg)',
    },
  },
}))
export default function CollectionCardCard(props) {
  const classes = useStyles()
  const history = useHistory()
  const { data } = props
  const updateDimensions = () => {
    var offsetWidth = document.getElementById('imagecard' + data?._id)
      .offsetWidth
    var newoofsetWidth = offsetWidth - 80
    document.getElementById('imagecard' + data?._id).style.height =
      newoofsetWidth + 'px'
  }
  useEffect(() => {
    updateDimensions()
  }, [data, data?._id])
  useEffect(() => {
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  return (
    <>
      <Paper elevation={2} className={classes.collectionCardBox}>
        {data?.isPromoted && <label>Promoted</label>}
        <Box
          id={`imagecard${data?._id}`}
          className={classes.mainimg}
          style={
            data?.bannerImage
              ? { background: 'url(' + data?.bannerImage + ')' }
              : { background: 'url(' + 'images/market_detail.png' + ')' }
          }
          onClick={() => {
            history.push({
              pathname: '/collection-details',
              search: data?._id,
              state: {
                data: data,
              },
            })
          }}
        ></Box>
        <Box className={classes.contentBox}>
          <img src="images/line.png" alt="image" className="lineBorder1" />

          <Box className="displayCenter">
            <figure>
              <img
                src={
                  data?.collectionImage
                    ? data?.collectionImage
                    : '/images/avaterimg.png'
                }
                style={{ height: '70px', width: '70px', borderRadius: '50%' }}
                alt="user"
              />
            </figure>
            <Box ml={2}>
              <Typography variant="h6" color="primary" align="center">
                {' '}
                {data?.displayName}{' '}
              </Typography>
              <Box className={classes.pricedata}>
                <Typography variant="h6" color="primary">
                  <img src="images/favicon.png" alt="Vector Image" />
                  &nbsp;&nbsp;
                  {data?.price}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  )
}
