import { Box, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import NFTCard from "src/component/NFTCard";
const useStyles = makeStyles((theme) => ({
  root: { paddingBottom: "115px" },
  root2: { paddingTop: "30px" },
  headsection: {
    display: "flex",
    justifyContent: "space-between",
    "@media(max-width:767px)": {
      display: "block",
      "& button": {
        marginTop: "15px",
      },
    },
    "& h1": {
      color: theme.palette.secondary.main,
      fontWeight: "700",
      fontSize: "40px",
      marginLeft: "15px",
      "@media(max-width:767px)": {
        fontSize: "20px",
      },
    },
  },
  boxsection: {
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "40px",
    "& h6": {
      color: " #3B0D60",
      fontWeight: "bold",
      fontSize: "18px",
      paddingTop: "7px",
    },
  },
  box3: {
    display: "flex",
    alignItems: "center",
    paddingTop: "13px",
    "& h6": {
      color: "#C6BECC",
      marginLeft: "10px",
      paddingBottom: "10px",
      [theme.breakpoints.up("sm")]: {
        fontSize: "15px",
      },
      [theme.breakpoints.up("xs")]: {
        fontSize: "12px",
      },
    },
  },
  text3: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "10px",
    "& h5": {
      color: "#E4C3DE",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
    },
  },
  text4: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "10px",
    "& h4": {
      color: "#D200A5",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "130%",
    },
  },
  price: {
    paddingBottom: "11px",
    "& h6": {
      fontWeight: "bold",
      fontSize: "10px",
      lineHeight: "130%",
      color: "#E4C3DE",
    },
  },
  box4: {
    backgroundColor: "#FCF2FA",
    borderRadius: "16px",
  },
  dotimg: {
    background: "#D200A5",
    boxShadow: "0px 4px 7px rgba(210, 0, 165, 0.25)",
  },
  nftImg: {
    width: "100%",
    height: "165px",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "40px 40px 10px 10px",
    backgroundColor: "#ccc !important",
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "210px",
      borderRadius: "40px 40px 10px 10px",
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
}));
const card = [
  {
    image: "/images/nft/img1.jpeg",
    name: "Eva Elfie in the Jungle",
    avatar: "/images/avaterimg.png",
    avatarName: "@Maira_freeman",
  },
  {
    image: "/images/nft/img2.jpeg",
    name: "Eva Elfie in the Jungle",
    avatar: "/images/avaterimg.png",
    avatarName: "@Maira_freeman",
  },
  {
    image: "/images/nft/img3.jpeg",
    name: "Eva Elfie in the Jungle",
    avatar: "/images/avaterimg.png",
    avatarName: "@Maira_freeman",
  },
  {
    image: "/images/nft/img4.jpeg",
    name: "Eva Elfie in the Jungle",
    avatar: "/images/avaterimg.png",
    avatarName: "@Maira_freeman",
  },
  {
    image: "/images/nft/img5.jpeg",
    name: "Eva Elfie in the Jungle",
    avatar: "/images/avaterimg.png",
    avatarName: "@Maira_freeman",
  },
  {
    image: "/images/nft/img6.jpeg",
    name: "Eva Elfie in the Jungle",
    avatar: "/images/avaterimg.png",
    avatarName: "@Maira_freeman",
  },
  {
    image: "/images/nft/img7.jpeg",
    name: "Eva Elfie in the Jungle",
    avatar: "/images/avaterimg.png",
    avatarName: "@Maira_freeman",
  },
  {
    image: "/images/nft/img8.jpeg",
    name: "Eva Elfie in the Jungle",
    avatar: "/images/avaterimg.png",
    avatarName: "@Maira_freeman",
  },
];
const ArtWorkCard = (index, data) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.headsection}>
        <Typography variant="h1">Artworks</Typography>
        <Box>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            alignItems="center"
          >
            View all artworks
          </Button>
        </Box>
      </Box>
      <hr style={{ border: "1px solid rgba(255, 255, 255, 0.16)" }} />

      <Box className={classes.root2}>
        <Grid container spacing={3}>
          {card.map((data, index) => {
            return (
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <NFTCard data={data} index={index} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default ArtWorkCard;
