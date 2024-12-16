import React from "react";
import { Box, Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CreatorCard from "src/component/CreatorCard";
const useStyles = makeStyles((theme) => ({
  headsection: {
    display: "flex",
    justifyContent: "space-between",
    "@media(max-width:767px)": {
      display: "block",
      '& button':{
        marginTop:"15px",
      }
    },
    "& h1": {
      color: "#fff",
      fontWeight: "700",
      fontSize: "40px",
      marginLeft: "15px",
      "@media(max-width:767px)": {
        fontSize: "20px",
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
    bio: "Top 3 Pornstar worldwide! xBiz award winner 2021! 600,000m + Views on Pornhub! Eva Elfie is a Russian-born adult actre Top 3 Pornstar worldwide! xBiz award winner 2021! 600,000m + Views on Pornhub! Eva Elfie ...",
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

const Creators = () => {
  const classes = useStyles();
  return (
    <Box>
      <Box className={classes.headsection}>
        <Typography variant="h1">Creators</Typography>
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

export default Creators;
