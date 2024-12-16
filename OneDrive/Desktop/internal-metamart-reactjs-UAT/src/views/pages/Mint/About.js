import React from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  about: {
    position: "relative",
    zIndex: "9",
    "& h3": {
      fontWeight: 700,
      fontSize: "30px",
      color: "#262424",
      display: "flex",
      alignItems: "center",
      "& img": {
        marginRight: "20px",
        width: "40px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
  },
  bannerBox: {
    position: "relative",
    padding: "8px 0px",
    // padding: "90px 0px 90px",
    zIndex: "1",
    "& .shape7": {
      position: "absolute",
      left: "-110px",
      top: "150px",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
  },
  textbox: {
    "& p": {
      marginTop: "8px",
      maxWidth: "500px",
      [theme.breakpoints.down("md")]: {
        maxWidth: "100%",
      },
      [theme.breakpoints.down("xs")]: {
        maxWidth: "100%",
      },
    },
  },
  buttonright: {
    marginLeft: "10px !important",
    minWidth: "150px",
  },
  bannerImg: {
    display: "flex",
    position: "relative",
    // overflow: " hidden",
    "& .shape1": {
      position: "absolute",
      top: "-47px",
      right: "-236px",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    "& .shape2": {
      top: "-152px",
      right: "-554px",
      position: "absolute",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    "& .shape3": {
      top: "-182px",
      right: "-351px",
      position: "absolute",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },

    "& figure": {
      margin: "0",
      width: "100%",
      overflow: "hidden",
      marginBottom: "15px",
      borderRadius: "10px",
      height: "auto",
      "&:hover": {
        "& img": {
          transform: "scale(1.3)",
        },
      },
      "& img": {
        width: "100%",
        height: "100%",
        margin: "0",
        transform: "scale(1.1)",
        transition: "0.5s",
      },
    },
  },
  artwork: {
    marginTop: "50px",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "50px",
    },
    "& .artworkmaingrid": {
      "& .artworkgrid": {
        "&:last-child": {
          "& .artworkbox": {
            "&::after": {
              display: "none",
            },
          },
        },
      },
    },
    "& .artworkbox": {
      position: "relative",
      padding: "10px 0",
      "&::after": {
        position: "absolute",
        top: 0,
        right: 0,
        height: "100%",
        content: "''",
        width: "1px",
        backgroundColor: "#484848",
      },
    },
    "& h2": {
      fontWeight: 700,
      fontSize: "30px",
      color: "#000000",
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
    "& p": {
      fontWeight: 400,
      fontSize: "18px",
      marginTop: "10px",
      color: "rgba(0, 0, 0, 0.5)",
      [theme.breakpoints.down("xs")]: {
        fontSize: "14px",
      },
    },
  },
}));

export default function BestSeller(props) {
  const classes = useStyles();
  // const { data } = props;
  return (
    <Box className={classes.bannerBox}>
      <Container maxWidth="lg">
        <Box className={classes.about}>
          <Typography variant="h2" color="primary">
            About
          </Typography>
        </Box>
        <Box mt={5}>
          <Grid container spacing={0} alignItems="center">
            <Grid item xs={12} md={5}>
              <Box className={classes.bannerImg}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={6} sm={6}>
                    <Box className="boxLeft">
                      <figure>
                        <img src="images/banner/banner-img5.png" alt="images" />
                      </figure>
                      <figure>
                        <img src="images/banner/banner-img6.png" alt="images" />
                      </figure>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Box className="boxCenter">
                      <figure>
                        <img src="images/banner/banner-img2.png" alt="images" />
                      </figure>
                      <figure>
                        <img src="images/banner/banner-img3.png" alt="images" />
                      </figure>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} md={1}></Grid>
            <Grid item xs={12} md={6}>
              <Box className={classes.textbox}>
                <Typography variant="body2" align="left" color="primary">
                  Ranging from play-to-earn games to decentralized
                  three-dimensional worlds, cross- platform events and
                  experiences, digital avatars and identities and a whole lot
                  more, the metaverse could be poised to reinvent the way we go
                  about our daily lives.
                </Typography>
                <Typography variant="body2" align="left" color="primary">
                  Minting/Creating NFT`s is a unique way to certify
                  authentication of collectibles in the form of art or real
                  world assets. An NFT exchange is a place where non fungible
                  tokens can be created, auctioned, traded and sold over the
                  internet. There is speculation that NFT exchanges will surpass
                  Crypto exchanges in terms of volume and popularity over the
                  coming years as real world assets are being sold on the
                  blockchain. Hovr is an NFT exchange build on a prestige
                  blockchain to lower minting (creating) costs of NFT`s and
                  ensuring lowering trading fees to maximize profits for all
                  parties involved.
                </Typography>
                <Typography variant="body2" align="left" color="primary">
                  A NFT can be viewed as a title deed to a property or a
                  certificate of authentication ensuring it is the real asset.
                  By owning the Rolex watch NFT it demonstrates you are the real
                  owner and the watch is not fake! Hovr to intends to not only
                  assure real value being added to the NFT space but also focus
                  on becoming the world`s first cross-game in-gaming marketplace
                  for items to be used and rented out to other players! Think if
                  there was only 5000 Drow players in Dota and only the owners
                  can play with them in-game or a sniper(item) in Counterstrike
                  can only be used by the NFT holders.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
