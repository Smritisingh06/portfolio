import { Box, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import CreatorCard from "src/component/CreatorCard";
const useStyles = makeStyles(() => ({
  root: { paddingBottom: "70px" },
  headsection: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "15px",
    "& h1": {
      color: "#3B0D60",
      fontWeight: "700",
      fontSize: "40px",
    },
  },
  boxsection: {
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "40px",
    "& h6": {
      color: " #3B0D60",
      fontWeight: "bold",
      fontSize: "18px",
      paddingTop: "7px",
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
  mainimg: { paddingTop: "24px", width: "100%" },
  imgsec: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "-35px",
  },
  follower: {
    marginTop: "40px",
    background: "#FCF2FA",
    borderRadius: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "30px",
    paddingRight: "30px",
    "& h4": {
      fontWeight: "bold",
      fontSize: "18px",
      lineHeight: "130%",
      color: "#D200A5",
    },
    "& h5": {
      fontWeight: "600",
      fontSize: "12px",
      lineHeight: "130%",
      color: "#E4C3DE",
    },
  },
  namesection: {
    "& h6": {
      fontWeight: "bold",
      fontSize: "18px",
      lineHeight: "130%",
    },
    "& h5": {
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#C6BECC",
      paddingTop: "10px",
    },
  },
  bio: {
    paddingTop: "15px",
    "& h6": {
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#7E6196",
    },
  },
  nftImg: {
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
    image: "/images/nft/1st.png",
    avatar: "/images/avaterimg.png",
    name: "Maira Freeman",
    avatarName: "@Maira_freeman",
    number: "1346",
    follow: "Followers",
    bio: "Top 3 Pornstar worldwide! xBiz award winner 2021! 600,000m + Views on Pornhub! Eva Elfie is a Russian-born adult actre...",
  },
  {
    image: "/images/nft/img1.jpeg",
    avatar: "/images/avaterimg.png",
    name: "Maira Freeman",
    avatarName: "@Maira_freeman",
    number: "1346",
    follow: "Followers",
    bio: "Top 3 Pornstar worldwide! xBiz award winner 2021! 600,000m + Views on Pornhub! Eva Elfie is a Russian-born adult actre...",
  },
  {
    image: "/images/cardimg.png",
    avatar: "/images/avaterimg.png",
    name: "Maira Freeman",
    avatarName: "@Maira_freeman",
    number: "1346",
    follow: "Followers",
    bio: "Top 3 Pornstar worldwide! xBiz award winner 2021! 600,000m + Views on Pornhub! Eva Elfie is a Russian-born adult actre...",
  },
  {
    image: "/images/cardimg.png",
    avatar: "/images/avaterimg.png",
    name: "Maira Freeman",
    avatarName: "@Maira_freeman",
    number: "1346",
    follow: "Followers",
    bio: "Top 3 Pornstar worldwide! xBiz award winner 2021! 600,000m + Views on Pornhub! Eva Elfie is a Russian-born adult actre...",
  },
  {
    image: "/images/cardimg.png",
    avatar: "/images/avaterimg.png",
    name: "Maira Freeman",
    avatarName: "@Maira_freeman",
    number: "1346",
    follow: "Followers",
    bio: "Top 3 Pornstar worldwide! xBiz award winner 2021! 600,000m + Views on Pornhub! Eva Elfie is a Russian-born adult actre...",
  },
  {
    image: "/images/cardimg.png",
    avatar: "/images/avaterimg.png",
    name: "Maira Freeman",
    avatarName: "@Maira_freeman",
    number: "1346",
    follow: "Followers",
    bio: "Top 3 Pornstar worldwide! xBiz award winner 2021! 600,000m + Views on Pornhub! Eva Elfie is a Russian-born adult actre...",
  },
  {
    image: "/images/cardimg.png",
    avatar: "/images/avaterimg.png",
    name: "Maira Freeman",
    avatarName: "@Maira_freeman",
    number: "1346",
    follow: "Followers",
    bio: "Top 3 Pornstar worldwide! xBiz award winner 2021! 600,000m + Views on Pornhub! Eva Elfie is a Russian-born adult actre...",
  },
  {
    image: "/images/cardimg.png",
    avatar: "/images/avaterimg.png",
    name: "Maira Freeman",
    avatarName: "@Maira_freeman",
    number: "1346",
    follow: "Followers",
    bio: "Top 3 Pornstar worldwide! xBiz award winner 2021! 600,000m + Views on Pornhub! Eva Elfie is a Russian-born adult actre...",
  },
  {
    image: "/images/cardimg.png",
    avatar: "/images/avaterimg.png",
    name: "Maira Freeman",
    avatarName: "@Maira_freeman",
    number: "1346",
    follow: "Followers",
    bio: "Top 3 Pornstar worldwide! xBiz award winner 2021! 600,000m + Views on Pornhub! Eva Elfie is a Russian-born adult actre...",
  },
  {
    image: "/images/cardimg.png",
    avatar: "/images/avaterimg.png",
    name: "Maira Freeman",
    avatarName: "@Maira_freeman",
    number: "1346",
    follow: "Followers",
    bio: "Top 3 Pornstar worldwide! xBiz award winner 2021! 600,000m + Views on Pornhub! Eva Elfie is a Russian-born adult actre...",
  },
  {
    image: "/images/cardimg.png",
    avatar: "/images/avaterimg.png",
    name: "Maira Freeman",
    avatarName: "@Maira_freeman",
    number: "1346",
    follow: "Followers",
    bio: "Top 3 Pornstar worldwide! xBiz award winner 2021! 600,000m + Views on Pornhub! Eva Elfie is a Russian-born adult actre...",
  },
  {
    image: "/images/cardimg.png",
    avatar: "/images/avaterimg.png",
    name: "Maira Freeman",
    avatarName: "@Maira_freeman",
    number: "1346",
    follow: "Followers",
    bio: "Top 3 Pornstar worldwide! xBiz award winner 2021! 600,000m + Views on Pornhub! Eva Elfie is a Russian-born adult actre...",
  },
  {
    image: "/images/cardimg.png",
    avatar: "/images/avaterimg.png",
    name: "Maira Freeman",
    avatarName: "@Maira_freeman",
    number: "1346",
    follow: "Followers",
    bio: "Top 3 Pornstar worldwide! xBiz award winner 2021! 600,000m + Views on Pornhub! Eva Elfie is a Russian-born adult actre...",
  },
  {
    image: "/images/cardimg.png",
    avatar: "/images/avaterimg.png",
    name: "Maira Freeman",
    avatarName: "@Maira_freeman",
    number: "1346",
    follow: "Followers",
    bio: "Top 3 Pornstar worldwide! xBiz award winner 2021! 600,000m + Views on Pornhub! Eva Elfie is a Russian-born adult actre...",
  },
  {
    image: "/images/cardimg.png",
    avatar: "/images/avaterimg.png",
    name: "Maira Freeman",
    avatarName: "@Maira_freeman",
    number: "1346",
    follow: "Followers",
    bio: "Top 3 Pornstar worldwide! xBiz award winner 2021! 600,000m + Views on Pornhub! Eva Elfie is a Russian-born adult actre...",
  },
  {
    image: "/images/cardimg.png",
    avatar: "/images/avaterimg.png",
    name: "Maira Freeman",
    avatarName: "@Maira_freeman",
    number: "1346",
    follow: "Followers",
    bio: "Top 3 Pornstar worldwide! xBiz award winner 2021! 600,000m + Views on Pornhub! Eva Elfie is a Russian-born adult actre...",
  },
];

const CreatorCard2 = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.root2}>
        <Grid container spacing={3}>
          {card.map((data, index, type) => {
            return (
              <Grid item lg={3} md={3} sm={6} xs={12}>
                <Box mt={2}>
                  <CreatorCard data={data} type="creator" index={index} />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default CreatorCard2;
