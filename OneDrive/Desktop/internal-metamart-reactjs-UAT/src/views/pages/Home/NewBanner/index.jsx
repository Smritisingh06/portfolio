import React, { useContext } from "react";

import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css";
import { UserContext } from "src/context/User";
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";
import SettingsContext from "src/context/SettingsContext";
import {useStyles} from './Styles'
export default function Banner(props) {
  const classes = useStyles();
  const { data } = props;
  const themeSeeting = useContext(SettingsContext);
  const user = useContext(UserContext);
  const { account, library, chainId } = useWeb3React();
  const toastmsg = () => {
    toast.warn("Please connect your wallet");
  };

  return (
    <Box className={classes.bannerBox}>
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6} className="wow bounceInRight">
            <Box className="textbox">
              <Typography
                variant="h1"
                color="primary"
                className={classes.minth1}
              >
                Create, Sell Unique &
                <Box
                  className={
                    themeSeeting.settings.theme === "DARK"
                      ? `${classes.darkImg}`
                      : `${classes.darkImg1}`
                  }
                ></Box>
              </Typography>

              <Typography
                variant="h1"
                color="primary"
                className={classes.minth1}
              >
                Rare&nbsp;
                <span> Digital Artworks </span>
              </Typography>

              <Typography variant="body2" color="primary">
                Reference site about Lorem Ipsum, giving information on its
                origins, as well as a random ipsum generator.
              </Typography>

              <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/explore"
                >
                  Explore Now
                </Button>
                &nbsp; &nbsp;
                {/* <Button
                  variant="outlined"
                  color="primary"
                  component={Link}
                  to="/mint"
                >
                  Mint
                </Button> */}
                {user?.walletdata === "BLOCK" ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/request-message"
                    className={classes.buttonright}
                  >
                    Unblock Request
                  </Button>
                ) : (
                  <>
                    {account &&
                      user?.ownerAccount &&
                      user?.ownerAccount === account && (
                        <>
                          {/* <Button
                            variant="outlined"
                            color="primary"
                            component={Link}
                            to="/mint"
                            className={classes.buttonright}
                          >
                            Mint
                          </Button> */}
                        </>
                      )}
                  </>
                )}
              </Box>
            </Box>

            <Box className="artwork">
              <Box display="flex" className="artworkmaingrid">
                <Box className="artworkbox">
                  {" "}
                  <Typography variant="h2" color="primary">
                    {data?.collection} +{" "}
                  </Typography>
                  <Typography variant="body2">Collections</Typography>
                </Box>

                <Box className="artworkbox">
                  {" "}
                  <Typography variant="h2" color="primary">
                    {data?.user} +{" "}
                  </Typography>
                  <Typography variant="body2">Artists</Typography>
                </Box>

                <Box className="artworkbox">
                  {" "}
                  <Typography variant="h2" color="primary">
                    {data?.bid} +{" "}
                  </Typography>
                  <Typography variant="body2">Auctions</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Animated
              animationIn="bounceInUp"
              animationOut="fadeOut"
              isVisible={true}
            >
              <Box className="bannerImg">
                <img
                  src="images/banneranimation.png"
                  alt="Banner "
                  className=" bannerleftanimation bgx1"
                />
                <img
                  src="images/banner.png"
                  alt="Banner "
                  className="mainbannerimg createimganimation"

                  // className=" createimganimation"
                />
              </Box>
            </Animated>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
