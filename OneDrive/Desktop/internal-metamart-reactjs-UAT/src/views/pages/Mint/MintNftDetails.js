import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { getWeb3Obj, getContract, getWeb3ContractObject } from "src/utils";
import Switch from "@material-ui/core/Switch";
import {
  contractKovan,
  NetworkContextName,
  ACTIVE_NETWORK,
} from "src/constants";
import { useWeb3React } from "@web3-react/core";
import GenerativeNFTABI from "src/constants/ABI/GenerativeNFTABI";
import Button from "@material-ui/core/Button";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    "& .heading": {
      "& h2": {
        color: "#000000",
      },
    },
  },
  PageHeading: {
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "39px",
    color: "#898989",
    paddingBottom: "10px",
    display: "flex",
    alignItems: "center",
    "& span": {
      color: "#000",
      lineHeight: "0",
      cursor: "pointer",
      position: "relative",
      "&:hover div": {
        opacity: "1",
      },
      "& svg": {
        paddingLeft: "5px",
        color: "#898989",
      },
    },
  },
  button: {
    marginBottom: "15px",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "0px",
    boxShadow: "none",
    borderBottom: "0",
    borderRadius: "0",
    height: "50px",
    background: "transparent",
    color: "#898989",
    "&:hover": {
      backgroundColor: "#E6E6E6",
      boxShadow: "none",
      borderRadius: "5px",
    },
  },
  createbox: {
    "& .MuiDialog-paperScrollPaper": {
      width: 450,
      maxWidth: 450,
      minWidth: 450,
      [theme.breakpoints.down("sm")]: {
        width: "95%",
        maxWidth: "95%",
        minWidth: "95%",
      },
    },
  },
  boxsection: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "10px",
  },
  nftImg: {
    width: "100%",
    height: "165px ",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "100% !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "10px 10px 0px 0px",
    backgroundColor: "#ccc !important",
  },
  price3: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h5": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "18px",
      lineHeight: "130%",
      color: "#4ea6f5",
    },
  },
  likecount: {
    display: "flex",
    alignItems: "center",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "130%",
    color: "#000000",
    "& button": {
      borderRadius: "50%",
      padding: "15px",
      // color: "#4ea6f5",
      fontSize: "18px",
    },
  },
  box3: {
    display: "flex",
    alignItems: "center",
    "& h6": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#000000",
      marginLeft: "8px",
    },
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "75px",
      overflow: "hidden",
      width: "75px",
      border: "2px solid #4ea6f5",
      borderRadius: "10px",
      "& img": {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "auto",
        display: "block",
      },
    },
  },
  innerCollection: {
    position: "absolute",
    width: "calc(100% - 40px)",
    bottom: "0px",
    left: "50%",
    transform: "translateX(-50%)",
    borderRadius: "20px 20px 0 0",
    padding: "20px",
    background: "#1a1919",
  },
  selectOption: {
    width: "300px",
    display: "flex",
    justifyContent: "space-around",

    flexDirection: "row",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
    margin: "0 10px",
  },
  sectionTitleHead: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    margin: "10px 0 ",
    padding: "0 0",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  title: {
    borderBottom: "1px solid #eaeaea",
  },
  ListItem: {
    "& span": {
      fontSize: "20px",
      lineHeight: "30px",
      color: "#0F8ACA",
      fontWeight: "400",
    },
    "& p": {
      fontSize: "14px",
      lineHeight: "22px",
      color: "#898989",
      fontWeight: "400",
    },
  },

  createIcon: {
    width: 100,
    height: 100,
    color: "#222",
  },
  formControl: {
    padding: 0,
    width: "100%",
  },
  walletSet: {
    padding: "0 15px 0 0",
  },

  price: {
    "& label": { color: "#000000" },
  },
  label1: {
    color: "#000000",
  },
  NftImg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "210px",
      overflow: "hidden",
      background: "rgba(0 , 0, 0, 0.041)",
      "& img": {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "auto",
        display: "block",
      },
    },
  },
  nftTitle: {
    "& h6": { color: "#3B0D60 !important" },
    "& h5": {
      color: "#D200A5 !important",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "21px",
    },
  },
  CreateFormField: {
    padding: "25px",
    boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    boxSizing: "border-box",
    borderRadius: "10px",
    // backdropFilter: "blur(44px)",
    backgroundColor: "#FFFFFF",
  },
  tabBox: {
    cursor: "pointer",
    display: "flex",
    // backdropFilter: "blur(44px)",
    boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    boxSizing: "border-box",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #4ea6f5",
    "&:hover": {
      background: " linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
      color: "#fff",
    },
    "& h6": {
      fontSize: "16px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px",
      },
    },
  },
}));

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 41,
    height: 20,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(19px)",
      color: "#039BE3",
      "& + $track": {
        opacity: 1,
        backgroundColor: "#039BE3",
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 17,
    height: 17,
    backgroundColor: "#fff",
    boxShadow: "none",
  },
  track: {
    borderRadius: 25,
    opacity: 1,
    backgroundColor: "#039BE3",
  },
}))(Switch);

export default function MintNftDetails(props) {
  const classes = useStyles();
  const location = useLocation();
  const [ownerOf, setOwnerOf] = useState("");

  const [nftDetails, setnftDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { data, type, index } = props;
  const [open, setOpen] = React.useState(false);
  const updateDimensions = () => {
    var offsetWidth = document.getElementById("imagecard" + index).offsetWidth;
    var newoofsetWidth = offsetWidth - 80;
    document.getElementById("imagecard" + index).style.height =
      newoofsetWidth + "px";
  };
  useEffect(() => {
    updateDimensions();
  }, [data, index]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const getDetails = async (id) => {
    setIsLoading(true);
    try {
      const contract = await getWeb3ContractObject(
        GenerativeNFTABI,
        contractKovan
      );

      const ownerOf_L = await contract.methods.ownerOf(id.toString()).call();
      setOwnerOf(ownerOf_L);

      const filter = await contract.methods.tokenURI(id.toString()).call();
      const res = await axios.get(filter);

      if (res.status === 200) {
        setnftDetails({ id: id.toString(), nfdData: res.data });

        setIsLoading(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location.search) {
      const ids = location.search.split("?");
      if (ids[1]) {
        getDetails(ids[1]);
      }
    }
  }, [location]);

  return (
    <Box className={classes.root}>
      <Container maxWidth="md">
        <Box className="heading">
          <Typography variant="h2">Mint NFT</Typography>
        </Box>

        {isLoading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="start"
            width="100%"
          >
            <Typography
              variant="h3"
              align="center"
              style={{ color: "#000", fontSize: "16px", marginLeft: "15px" }}
            >
              Loading...
            </Typography>
            <ButtonCircularProgress />
          </Box>
        ) : (
          <>
            <Box mt={2}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Box className={classes.boxsection}>
                    <Box
                      id={`imagecard${index}`}
                      className={classes.nftImg}
                      style={{
                        background:
                          "url(" +
                          `${
                            nftDetails?.nfdData?.image
                              ? nftDetails?.nfdData?.image
                              : "/images/Explore/Explore2.png"
                          }` +
                          ")",
                      }}
                    >
                      <Typography variant="h6"></Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} className="order2">
                  <Box mb={2} className={classes.CreateFormField}>
                    <Typography variant="h5">
                      {nftDetails?.nfdData?.name}
                    </Typography>
                    <Box pt={2}>
                      <Typography
                        variant="subtitle1"
                        style={{ color: "#565353" }}
                      >
                        {nftDetails?.nfdData?.description}
                      </Typography>
                    </Box>

                    <Box mt={4}>
                      <Button variant="contained" color="primary" size="large">
                        Transfer
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}
