import React from "react";
import { Typography, Box, makeStyles, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { sortAddress } from "src/utils";
const useStyles = makeStyles((theme) => ({
  followingmainBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "5px 0px",
  },
  bottomblock: {
    display: "flex",
    alignItems: "center",
  },
  profileImage: {
    cursor: "pointer",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    overflow: "hidden",
    margin: "0px",
    position: "relative",
    background:
      "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    border: "3px solid #4ea6f5",
    background: "rgb(42 123 135)",
    display: "flex",
    "& img": {
      width: "100%",
    },
    "& .vectorBox": {
      position: "absolute",
      top: "0px",
      right: "0px",
      zIndex: "1",
    },
    [theme.breakpoints.down("xs")]: {
      width: "30px",
      height: "30px",
    },
  },
}));

export default function UsersCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { data, followUnfollowHandler, userData } = props;
  let isFollowing = false;
  if (userData) {
    const resArr = data.followers.filter((data) => data === userData._id);
    isFollowing = resArr.length > 0;
  }

  return (
    <Box className={classes.followingmainBox}>
      <Box className={classes.bottomblock}>
        <figure
          className={classes.profileImage}
          onClick={() => {
            history.push({
              pathname: "/author",
              search: data._id,
            });
          }}
        >
          <Box className="vectorBox">
            <img src={data.check} className="check_icon2" alt="" />
          </Box>
          <img
            src={data?.profilePic ? data?.profilePic : "/images/Profile.png"}
            alt="user"
          />
        </figure>
        <Box pl={1}>
          <Typography
            variant="body2"
            color="primary"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "150px",
            }}
          >
            {" "}
            {data.name ? data.name : sortAddress(data.walletAddress)}
          </Typography>
          <Typography variant="body1" color="primary">
            {" "}
            {data?.followersCount} followers
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        size="medium"
        color="primary"
        onClick={() => followUnfollowHandler(data.id)}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </Box>
  );
}
