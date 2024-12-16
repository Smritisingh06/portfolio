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
import { UserContext } from "src/context/User";
import { useWeb3React } from "@web3-react/core";
import Carousal from "./Carousal";

const useStyles = makeStyles((theme) => ({
  bannerBox: {
    position: "relative",
    padding: "150px 0px 74px",
    overflow: "hidden",
    zIndex: "1",
    [theme.breakpoints.down("xs")]: {
      padding: "71px 0px",
    },
    "& .textBox": {
      padding: "50px 0px",
      [theme.breakpoints.down("md")]: {
        padding: "30px 0px 50px",
      },
      "& h1": {
        fontSize: "70px",
        color: "hsl(230.54deg 95.03% 63.21%)",
        [theme.breakpoints.down("md")]: {
          fontSize: "50px",
        },
      },
      "& h3": {
        color: theme.palette.text.graydark,
        fontSize: "28px",
        lineHeight: "40px",
        marginTop: "37px",
        [theme.breakpoints.down("md")]: {
          marginTop: "20px",
          fontSize: "22px",
          lineHeight: "32px",
        },
      },
    },
    "& .buttonright": {
      marginLeft: "10px !important",
      minWidth: "150px",
    },
  },
}));
export default function Banner(props) {
  const classes = useStyles();

  const user = useContext(UserContext);
  const { account } = useWeb3React();

  return (
    <Box className={classes.bannerBox}>
      <Container maxWidth="lg">
        <Box className=" textBox" align="center">
          <Typography
            variant="h1"
            sx={{ color: "hsl(230.54deg 95.03% 63.21%)" }}
          >
            create connect trade{" "}
          </Typography>

          <Typography variant="h3" color="primary">
            An NFT platform to trade, collect and transform art into digital
            collectibles.
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
                  user?.ownerAccount === account && <></>}
              </>
            )}
          </Box>
        </Box>
      </Container>
      <Carousal />
    </Box>
  );
}
