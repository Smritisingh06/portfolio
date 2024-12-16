import React from "react";
import {
  Typography,
  Box,
  makeStyles,
  Avatar,
  Grid,
  Button,
  Link,
} from "@material-ui/core";
import { FaEllipsisV } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { BsClockHistory } from "react-icons/bs";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "space-between",
    margin:"5px 0px"
  },
  bottomblock: {
    display: "flex",
    alignItems: "center"
  },
  profileImage: {
    width: "100%",
    maxWidth: "50px",
    height: "50px",
    borderRadius: "50%",
    display:"flex",
    overflow: "hidden",
    margin: "0px",
    position: "relative",
    background:
      "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    // backdropFilter: " blur(42px)",
    border: "3px solid #4ea6f5",
    background: "rgb(42 123 135)",
    "& img": {
      width: "100%",
    },
    "& .vectorBox": {
      position: "absolute",
      top: "0px",
      right: "0px",
      zIndex: "1"
    }
  },

}));

export default function UsersCard(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { type, data } = props;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.bottomblock}>
        <figure className={classes.profileImage}>
          <Box className="vectorBox">
            <img src={data.check} className="check_icon2" />
          </Box>
          <img
            src={data?.profileImg}
            alt="user"
          />
        </figure>
        <Box pl={1}>
          <Typography variant="h5"> {data?.name}</Typography>
          <Typography variant="body2">{data?.eth}</Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        size="medium"
        color="primary"
      >
        Follow
      </Button>
    </Box>
  );
}
