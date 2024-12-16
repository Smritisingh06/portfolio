import DataNotFound from "src/component/DataNotFound";
import { Box, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  heading: {
    "& h3": {
      color: theme.palette.secondary.main,
      fontSize: "40px",
      fontWeight: "700",
      [theme.breakpoints.down("xs")]: {
        fontSize: "23px",
      },
    },
  },
  nftimg: {
    "& figure": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100px",
      width: "100px",
      backgroundColor: "#fafefd",
      overflow: "hidden",
      borderRadius: "10px",
      margin: "0",
      "& img": {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "100%",
        display: "block",
      },
    },
  },
  colorbox: {
    display: "flex",
    alignItems: "center",
    marginTop: "16px",
    height: "auto",
    borderRadius: "10px",
    padding: "10px",
    background: "#FFFFFF",
    boxShadow: " rgb(99 99 99 / 20%) 0px 2px 8px 0px",
  },
  textbox: {
    "& h3": {
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "21px",
      color: "#35a5f5",
    },
    "& h4": {
      marginTop: "3px",
      color: "#454545",
      fontWeight: "500",
      fontSize: "12px",
      lineHeight: "18px",
    },
    "& h5": {
      marginTop: "3px",
      fontWeight: "500",
      fontSize: "11px",
      lineHeight: "18px",
      color: "#828282",
    },
  },
}));
const act1 = [
  {
    image: "/images/Explore/Explore1.png",
    name: "GRAFFITI 'thanks for the wall",
    edition: "1 edition transferred from Rarebit to Bunny Parton",
    time: "6/29/2021, 7:53 PM",
  },
  {
    image: "/images/Explore/Explore2.png",
    name: "GRAFFITI 'thanks for the wall",
    edition: "1 edition transferred from Rarebit to Bunny Parton",
    time: "6/29/2021, 9:53 PM",
  },
  {
    image: "/images/Explore/Explore3.png",
    name: "GRAFFITI 'thanks for the wall",
    edition: "1 edition transferred from Rarebit to Bunny Parton",
    time: "6/29/2021, 3:53 PM",
  },
  {
    image: "/images/Explore/Explore4.png",
    name: "GRAFFITI 'thanks for the wall",
    edition: "1 edition transferred from Rarebit to Bunny Parton",
    time: "6/29/2021, 5:53 PM",
  },
];
export default function AllActivity(props) {
  const classes = useStyles();
  const { activityNFTList } = props;
  return (
    <>
      {act1.map((data, index) => {
        return (
          <Grid item xs={12} md={12} sm={12} lg={12} className={classes.orer}>
            <Box className={classes.colorbox}>
              <Box className={classes.nftimg}>
                <figure>
                  <img src={data?.userId?.coverPic} alt="" />
                </figure>
              </Box>
              <Box className={classes.textbox} ml={2}>
                <Typography variant="h3">{data?.userId?.name}</Typography>
                <Typography variant="h4">{data?.userId?.instagram}</Typography>
                <Typography variant="h5">{data?.createdAt}</Typography>
              </Box>
            </Box>
          </Grid>
        );
      })}
      {!activityNFTList ||
        (activityNFTList && activityNFTList.length === 0 && (
          <Box style={{ width: "100%", textAlign: "center", color: "#aeadad" }}>
            {props.tabview === "all" ? (
              <>
                <Typography variant="h4">
                  you don't have any recent activity
                </Typography>
              </>
            ) : (
              <>
                {/* <Typography variant="h4">no following</Typography> */}
                <Box style={{ marginTop: ".5rem" }}>
                  <DataNotFound />
                </Box>
              </>
            )}
          </Box>
        ))}
    </>
  );
}
