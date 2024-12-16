import React, { useContext } from "react";
import {
  Box,
  makeStyles,
  Button,
  Typography,
  Grid,
  Paper,
} from "@material-ui/core";
import { FaTwitter } from "react-icons/fa";
import { UserContext } from "src/context/User";
import PublicIcon from "@material-ui/icons/Public";
import FacebookIcon from "@material-ui/icons/Facebook";
import DataNotFound from "src/component/DataDataNo";
import DataNotFound2 from "src/component/DatanotFound2";

const useStyles = makeStyles((theme) => ({
  root: { paddingBottom: "100px" },
  biobox: {
    overflowY: "auto",
    overflowX: "hidden",
    height: "170px",
    minHeight: "170px",
    "& h4": {
      fontFamily: "'Good Times Rg', sans-serif",
    },
    "& p": {
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "130%",

      paddingTop: "15px",
      wordBreak: "break-word",
    },
  },
  conrnerBox: {
    height: "auto",
    border: "1px solid #80808042",
    marginRight: "20px",
    borderRadius: "10px",
    padding: "10px",
    marginTop: "12px",
    width: "100%",
  },
  socialMediaIcon: {
    fontSize: "30px",
    color: theme.palette.primary.main,
  },
}));

export default function Bio() {
  const classes = useStyles();
  const user = useContext(UserContext);
  // console.log('user.userData?.bio+++', user.userData?.bio)
  // console.log('Data?.bio+++', user?.userData?.twitterUsername)

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={2}>
            <Box className={classes.biobox}>
              <Typography variant="h4" color="primary">
                Bio:
              </Typography>
              {user.userData?.bio && user.userData?.bio ? (
                <>
                  <Typography variant="body2" color="primary">
                    {user.userData?.bio}
                  </Typography>
                </>
              ) : (
                <>
                  <DataNotFound2 />
                </>
              )}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={2}>
            <Box className={classes.biobox}>
              <Typography variant="h4">Links:</Typography>

              {!user?.userData?.twitterUsername &&
                !user?.userData?.personalSite &&
                !user?.userData?.facebook && (
                  <>
                    <DataNotFound2
                    // img={"/images/NoDataFoundProfile.png"}
                    />
                  </>
                )}
              <Grid container spacing={1}>
                {user?.userData?.twitterUsername && (
                  <Grid item sm={2} lg={6} md={6} xs={3}>
                    <a
                      href={user?.userData?.twitterUsername}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button className={classes.conrnerBox} fullWidth>
                        <FaTwitter className={classes.socialMediaIcon} />
                      </Button>
                    </a>
                  </Grid>
                )}
                {user?.userData?.personalSite && (
                  <Grid item sm={2} lg={6} md={6} xs={3}>
                    <a
                      href={user?.userData?.personalSite}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button className={classes.conrnerBox}>
                        <PublicIcon className={classes.socialMediaIcon} />
                      </Button>
                    </a>
                  </Grid>
                )}
                {user?.userData?.facebook && (
                  <Grid item sm={2} lg={6} md={6} xs={3}>
                    <a
                      href={user?.userData?.facebook}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button className={classes.conrnerBox}>
                        <FacebookIcon className={classes.socialMediaIcon} />
                      </Button>
                    </a>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
