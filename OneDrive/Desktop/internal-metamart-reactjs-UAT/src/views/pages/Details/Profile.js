import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  IconButton,
  Hidden,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import ExploreCard from "src/component/ExploreCard";
import CollectionCard from "src/component/CollectionCard";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { GiCancel } from "react-icons/gi";
import Following from "./Following";
import Bio from "./Bio";
import { collectionData } from "src/constants";
import { FaCopy, FaUserEdit, FaUserCheck } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import Sale from "./Sale";
import Created from "./Created";
import Owned from "./Owned";
import Liked from "./Liked";
import All from "./All";
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
  whitebox: {
    background: "#FFFFFF",
    filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
    boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    borderRadius: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
  },

  idtxt: {
    display: "flex",
    fontWeight: "bold",
    fontSize: "18px",
    alignItems: "center",
    "@media(max-width:818px)": {
      display: "block",
    },
  },
  file: {
    padding: "10px 10px 10px 10px",
    // background: "#FCF2FA",
    borderRadius: "50%",
  },
  btnbox1: {
    "@media(max-width:818px)": {
      marginTop: "5px",
    },
    "& Button": {
      margin: "5px",
    },
    "& h6": {
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
    },
  },
  btnfollow2: {
    background: "rgba(255, 255, 255, 0.3)",
    // backdropFilter: "blur(24px)",
    borderRadius: "10px",
    marginRight: "10px",
    padding: "15px 15px",
    [theme.breakpoints.down("sm")]: {
      background: "rgb(52 162 240 / 60%)",
    },
    "@media(max-width:818px)": {
      padding: "6px 16px",
    },
    "& h2": {
      fontWeight: "bold",
      fontSize: "28px",
      lineHeight: "130%",
      textAlign: "center",
      color: "#FFFFFF",
      "@media(max-width:818px)": {
        fontSize: "18px",
      },
    },
    "& h5": {
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#FFFFFF",
      textAlign: "center",
      "@media(max-width:818px)": {
        fontSize: "12px",
      },
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
  btnhead: {
    display: "flex",
    marginTop: "-170px",
    "@media(max-width:800px)": { marginTop: "20px", marginBottom: "20px" },
  },
  profileimg: {
    marginTop: "-140px",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "100% !important",
    backgroundRepeat: " no-repeat !important",
    width: "175px",
    height: "175px",
    borderRadius: "10px",
    position: "relative",
    border: "2px solid #FFFFFF",
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
  FollowingBox: {
    overflowx: "scroll",
  },
  profileWallet: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    "@media(max-width:767px)": {
      borderBottom: "1px solid gray",
    },

    "& h6": {
      color: "#00000",
      "@media(max-width:800px)": { fontSize: "17px" },
    },
  },
  customizedButton: {
    position: "absolute",
    top: "-42px",
    right: "-9px",
    color: "#fff",
  },
  tabBtn: {
    "@media(max-width:767px)": {
      marginTop: "10px",
    },
    "& button": {
      borderRadius: "10px",
      fontWeight: "600",
      fontSize: "14px",
      marginRight: "4px",
      "&.active": {
        color: "#fff",
        boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
        background:
          "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
      },
    },
  },
}));
const walletdetails = [
  {
    profileImg: "/images/Sellers/Sellers1.png",
    name: "Sophia Valentine",
    eth: "182 folowers",
    check: "/images/check.png",
  },
  {
    profileImg: "/images/Sellers/Sellers2.png",
    name: "The Metakey",
    eth: "120 folowers",
    check: "/images/check.png",
  },
  {
    profileImg: "/images/Sellers/Sellers3.png",
    name: "Diamond HODLR",
    eth: "182 folowers",
  },
  {
    profileImg: "/images/Sellers/Sellers4.png",
    name: "Sophia Valentine",
    eth: "182 folowers",
  },
  {
    profileImg: "/images/Sellers/Sellers1.png",
    name: "Beeple Special",
    eth: "182 folowers",
  },
  {
    profileImg: "/images/Sellers/Sellers2.png",
    name: "RickyODonnell79",
    eth: "182 folowers",
  },
  {
    profileImg: "/images/Sellers/Sellers3.png",
    name: "RickyODonnell79",
    eth: "182 folowers",
    check: "/images/check.png",
  },
  {
    profileImg: "/images/Sellers/Sellers4.png",
    name: "Floyd Mayweather ",
    eth: "182 folowers",
    check: "/images/check.png",
  },
  {
    profileImg: "/images/Sellers/Sellers1.png",
    name: "Sophia Valentine",
    eth: "182 folowers",
    check: "/images/check.png",
  },
  {
    profileImg: "/images/Sellers/Sellers2.png",
    name: "Sophia Valentine",
    eth: "182 folowers",
    check: "/images/check.png",
  },
  {
    profileImg: "/images/Sellers/Sellers3.png",
    name: "Sophia Valentine",
    eth: "182 folowers",
    check: "/images/check.png",
  },
  {
    profileImg: "/images/Sellers/Sellers4.png",
    name: "Sophia Valentine",
    eth: "182 folowers",
    check: "/images/check.png",
  },
  {
    profileImg: "/images/Sellers/Sellers1.png",
    name: "Sophia Valentine",
    eth: "182 folowers",
    check: "/images/check.png",
  },
  {
    profileImg: "/images/Sellers/Sellers2.png",
    name: "Sophia Valentine",
    eth: "182 folowers",
    check: "/images/check.png",
  },
  {
    profileImg: "/images/Sellers/Sellers3.png",
    name: "Sophia Valentine",
    eth: "182 folowers",
    check: "/images/check.png",
  },
  {
    profileImg: "/images/Sellers/Sellers4.png",
    name: "Sophia Valentine",
    eth: "182 folowers",
    check: "/images/check.png",
  },
];
export default function Profile() {
  const [openBuy, setOpenBuy] = useState(false);
  const history = useHistory();
  const [tabview, setTabView] = useState("all");
  const [openPlaceBid, setOpenPlaceBid] = useState(false);
  const handleClose = () => {
    setOpenBuy(false);
  };
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Container maxWidth="lg">
        <Box
          className={classes.bannerimg}
          style={{ background: "url(/images/BannerImg.png)" }}
        ></Box>
        <Box className={classes.headbox2}>
          <Box style={{ display: "flex", flexWrap: "wrap" }}>
            <Box
              style={{ background: "url(/images/Profile.png)" }}
              className={classes.profileimg}
            >
              <IconButton
                className="editprofilebutton"
                onClick={() => history.push("/edit-profile")}
              >
                <FaUserEdit />
              </IconButton>
            </Box>
            <Box className={classes.text1}>
              <Typography variant="h4">Maira Freeman</Typography>
              <Typography variant="h5">@Maira_freeman</Typography>
            </Box>
          </Box>
          <Box className={classes.btnhead}>
            <Box
              className={classes.btnfollow2}
              onClick={() => setOpenBuy(true)}
            >
              <Typography variant="h2">1346</Typography>
              <Typography variant="h5">Followers</Typography>
            </Box>
            <Box
              className={classes.btnfollow2}
              onClick={() => setOpenPlaceBid(true)}
            >
              <Typography variant="h2">20</Typography>
              <Typography variant="h5">Following</Typography>
            </Box>
          </Box>
        </Box>
        <Box my={3}>
          <Hidden mdUp>
            {" "}
            <Bio />
          </Hidden>
        </Box>
        <Box className={classes.whitebox}>
          <Container>
            <Box className={classes.idtxt}>
              <Box className={classes.profileWallet}>
                <Typography variant="h6">id 20</Typography>&nbsp;&nbsp;
                <Typography variant="body2">0xf404...f7e25</Typography>
                <Box className={classes.file}>
                  <FaCopy />
                </Box>
              </Box>
              <Box className={classes.tabBtn}>
                <Button
                  className={tabview === "all" ? "active" : ""}
                  onClick={() => setTabView("all")}
                >
                  All
                </Button>
                <Button
                  className={tabview === "Created" ? "active" : " "}
                  onClick={() => setTabView("Created")}
                >
                  Created
                </Button>
                <Button
                  className={tabview === "sale" ? "active" : " "}
                  onClick={() => setTabView("sale")}
                >
                  On sale
                </Button>
                <Button
                  className={tabview === "Owned" ? "active" : " "}
                  onClick={() => setTabView("Owned")}
                >
                  Owned
                </Button>

                <Button
                  className={tabview === "Liked" ? "active" : " "}
                  onClick={() => history.push("/resale-nft")}
                >
                  Resale-NFT
                </Button>
              </Box>

              {/* <Box className={classes.btnbox1}>
                <Button size="small" color="secondary" variant="contained">
                  <Typography variant="h6">All</Typography>
                </Button>
                <Button size="small" color="secondary" variant="contained">
                  <Typography variant="h6"> Created</Typography>
                </Button>
                <Button size="small" color="secondary" variant="contained">
                  <Typography variant="h6">On sale</Typography>
                </Button>
                <Button size="small" color="secondary" variant="contained">
                  <Typography variant="h6">Owned</Typography>
                </Button>
                <Button size="small" color="secondary" variant="contained">
                  <Typography variant="h6">Liked</Typography>
                </Button>
              </Box> */}
            </Box>
          </Container>
        </Box>
        <Grid container spacing={3}>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <Hidden smDown>
              {" "}
              <Bio />
            </Hidden>
          </Grid>
          <Grid item md={9} sm={12} xs={12} lg={9}>
            <Box>
              {tabview === "all" ? <All /> : ""}
              {tabview === "Created" ? <Created /> : ""}
              {tabview === "sale" ? <Sale /> : ""}
              {tabview === "Owned" ? <Owned /> : ""}
              {tabview === "Liked" ? <Liked /> : ""}

              <Grid container spacing={3}>
                {collectionData.map((data, index, type) => {
                  return (
                    <Grid item lg={4} md={5} sm={6} xs={12}>
                      <CollectionCard
                        data={data}
                        type="creator"
                        index={index}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Box>
          {openPlaceBid && (
            <Dialog
              open={openPlaceBid}
              onClose={() => setOpenPlaceBid(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              classes={{ paper: classes.paper }}
              maxWidth="xs"
            >
              <DialogActions>
                <IconButton
                  onClick={handleClose}
                  className={classes.customizedButton}
                >
                  <GiCancel />
                </IconButton>
              </DialogActions>
              <DialogContent className={classes.padding0}>
                <Box align="center" mb={5}>
                  <FaUserCheck style={{ fontSize: "45px", color: "#4ea6f5" }} />
                  <Typography variant="h5">Following</Typography>
                </Box>
                <Box className={classes.FollowingBox}>
                  <Grid container>
                    {walletdetails.map((data, i) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          key={i}
                          className="walletSet "
                        >
                          <Following data={data} type="timing" index={i} />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </DialogContent>
            </Dialog>
          )}
        </Box>
        <Box>
          {openBuy && (
            <Dialog
              open={openBuy}
              onClose={() => setOpenBuy(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              classes={{ paper: classes.paper }}
              maxWidth="xs"
            >
              <DialogActions>
                <IconButton
                  onClick={handleClose}
                  className={classes.customizedButton}
                >
                  <GiCancel />
                </IconButton>
              </DialogActions>
              <DialogContent className={classes.padding0}>
                <Box align="center" mb={5}>
                  <FaUserCheck style={{ fontSize: "45px", color: "#4ea6f5" }} />
                  <Typography variant="h5">Followers</Typography>
                </Box>
                <Box className={classes.FollowingBox}>
                  <Grid container>
                    {walletdetails.map((data, i) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          key={i}
                          className="walletSet "
                        >
                          <Following data={data} type="timing" index={i} />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </DialogContent>
            </Dialog>
          )}
        </Box>
      </Container>
    </Box>
  );
}
