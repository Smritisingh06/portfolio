import Apiconfigs from "src/ApiConfig/ApiConfig";
import { Box, Container, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import All from "src/views/pages/Details/All";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataNotFound from "src/component/DataNotFound";
const useStyles = makeStyles((theme) => ({
  root: { padding: "70px 0px" },
  bannerimg: {
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "100% !important",
    backgroundRepeat: " no-repeat !important",
    height: "260px",
    borderRadius: "10px",
    "@media(max-width:1010px)": {
      height: "140px",
      borderRadius: "25px",
    },
    "& img": {
      minHeight: "100%",
      minWidth: "100%",
      height: "auto",
      width: "auto",
    },
  },
  headbox2: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    marginBottom: "15px",
    "@media(max-width:767px)": {
      display: "block",
      padding: "0 10px",
    },
  },
  profileimg: {
    marginTop: "-140px",
    overflow: "hidden",
    marginRight: "0px",
    backgroundPosition: "center !important",
    backgroundSize: "100% !important",
    backgroundRepeat: " no-repeat !important",
    width: "175px",
    height: "175px",
    borderRadius: "50%",
    position: "relative",
    border: "2px solid #FFFFFF",
    backgroundColor: "#b6b6b6 !important",
    "@media(max-width:1010px)": {
      marginTop: "-65px",
      width: "110px",
      height: "110px",
    },
    "@media(max-width:800px)": {
      marginTop: "-65px",
      width: "90px",
      height: "90px",
    },
    "& .editprofilebutton": {
      background: "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
      position: "absolute",
      right: "3px",
      bottom: "3px",
      "@media(max-width:800px)": {
        width: "35px",
        height: "35px",
      },
      "& svg": {
        color: "#FFFFFF",
      },
    },
    "& img": {
      minHeight: "100%",
      minWidth: "100%",
      height: "auto",
      width: "auto",
    },
  },
  text1: {
    marginLeft: "16px",
    "@media(max-width:375px)": {
      marginTop: "5px",
      marginLeft: "0px",
    },
    "& h4": {
      fontWeight: "bold",
      fontSize: "40px",
      lineHeight: "130%",
      "@media(max-width:1010px)": {
        fontSize: "30px",
      },
      "@media(max-width:930px)": {
        fontSize: "25px",
      },
    },
    "& h5": {
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#000",
    },
  },
}));
export default function CategoryDetails() {
  const classes = useStyles();
  const location = useLocation();
  const [particularorderlist, setparticularorderlist] = useState([]);
  const [resultNFTList, setResultNFTList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getNFTlistByparticularCategory = async (searchKey) => {
    try {
      setIsLoading(true);
      const response = await axios({
        method: "POST",
        url: Apiconfigs.allListOrder,
        data: {
          page: 1,
          limit: 50,
          itemCategory: [searchKey],
        },
      });
      if (response.data.statusCode === 200) {
        setResultNFTList(response.data.result.docs);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const categorySearchKey = location?.state?.categoryTitle;
    getNFTlistByparticularCategory(categorySearchKey);
    getparticularorderlist(categorySearchKey);
  }, [location]);

  const Holligans = "62d801e696a9b915333c0eea";

  const getparticularorderlist = async (gaming) => {
    if (gaming === "gaming") {
      try {
        const res = await axios.get(Apiconfigs.particularCollectionOrderList, {
          params: {
            _id: Holligans,
          },
        });
        if (res.data.statusCode === 200) {
          setparticularorderlist(res.data.result);
        } else {
          setparticularorderlist();
        }
      } catch (error) {
        setparticularorderlist();
      }
    }
  };

  return (
    <Box className={classes.root}>
      <Container maxWidth="lg">
        <Box
          className={classes.bannerimg}
          style={
            location?.state?.categoryIcon
              ? { background: `url(${location?.state?.categoryIcon})` }
              : { background: "url(/images/market_detail.png)" }
          }
        ></Box>
        <Box className={classes.headbox2}>
          <Box style={{ display: "flex", flexWrap: "wrap" }}>
            <figure
              style={
                location?.state?.categoryIcon
                  ? { background: `url(${location?.state?.categoryIcon})` }
                  : { background: "url(/images/Profile.png)" }
              }
              className={classes.profileimg}
            ></figure>

            <Box className={classes.text1}>
              <Typography variant="h2" color="primary">
                {location?.state?.categoryTitle
                  ? location?.state?.categoryTitle
                  : "Loading..."}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Grid container spacing={3}>
          <Grid item md={12} sm={12} xs={12} lg={12}>
            <All
              particularorderlist={resultNFTList}
              particularorderlist1={particularorderlist}
              callbackFun={() => getNFTlistByparticularCategory(location.state)}
            />
            {isLoading && (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <ButtonCircularProgress />
              </Box>
            )}
            {!isLoading && resultNFTList && resultNFTList.length === 0 && (
              <DataNotFound />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
