import {
  Box,
  Container,
  DialogActions,
  Dialog,
  DialogContent,
  Typography,
  IconButton,
  Paper,
} from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { SUPPORTED_WALLETS } from "src/connectors";
import { UserContext } from "src/context/User";
import WalletCard from "src/component/WalletCard";
import { useHistory, useLocation } from "react-router-dom";
import { GiCancel } from "react-icons/gi";
import { useWeb3React } from "@web3-react/core";
import SettingsContext from "src/context/SettingsContext";
import WalletConnectModal from "src/component/ConnectWallet/WalletConnectModal";
import { ACTIVE_NETWORK } from "src/constants";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  imgbox: {
    "& figure": {
      overflow: "hidden",
      "& img": {
        maxHeight: "100%",
        maxWidth: "100%",
        height: "auto",
        width: "auto",
        display: "block",
        borderRadius: "25px",
      },
    },
  },
  grid: {
    padding: "50px 16px",
  },
  logintext: {
    marginTop: "8px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    "& p": {
      maxWidth: "375px",
      marginTop: "8px",
      "@media(max-width:767px)": {
        maxWidth: "250px",
      },
    },
  },
  metamaskhead: {
    display: "flex",
    alignItems: "center",
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "24px",
    "&:hover": {
      backgroundColor: "#daf4ff",
    },
    "& img": {
      width: "70px",
      marginRight: "20px",
      [theme.breakpoints.down("xs")]: {
        width: "50px",
      },
    },
    "& h5": {
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "20px",
      textTransform: "capitalize",
      color: "#db7d2a",
    },
  },
  walletconnect: {
    display: "flex",
    alignItems: "center",
    background: "#fff",
    marginLeft: "0 !important",
    justifyContent: "flex-start",
    marginTop: "10px !important",
    borderRadius: "10px",
    padding: "20px",
    width: "100%",
    "&:hover": {
      backgroundColor: "#daf4ff",
    },
    "& img": {
      width: "70px",
      marginRight: "20px",
      [theme.breakpoints.down("xs")]: {
        width: "50px",
      },
    },
    "& h5": {
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "20px",
      textTransform: "capitalize",
      color: "#5697F5",
    },
  },
  signup: {
    "& h5": {
      color: theme.palette.secondary.main,
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
      "& button": {
        color: theme.palette.primary.main,
        fontWeight: "600",
        fontSize: "14px",
        lineHeight: "130%",
      },
    },
  },
}));
const ConnectWallet = ({ onClose }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const themeSeeting = useContext(SettingsContext);
  // const [selectedWallet, setSelectedWallet] = useState();
  const user = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [openWallect, setopenWallect] = useState(false);
  const [updatepage, setUpdatepage] = useState();
  const [open2, setOpen2] = React.useState(false);
  const { account, chainId } = useWeb3React();
  const onWalletConnectHandler = async (connector) => {
    await user.connectWallet(connector);
    themeSeeting.updateUserTandC();

    setOpen2(false);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (account && user.isLogin && user.userData && user.userData._id) {
      if (chainId.toString() == ACTIVE_NETWORK.toString()) {
        if (updatepage === "myaccount") {
          history.push({
            pathname: "/profile",
            search: user.userData._id,
          });
        } else if (updatepage === "myactivity") {
          history.push({
            pathname: "/activity",
            search: user.userData._id,
          });
        } else if (updatepage === "mymints") {
          history.push({
            pathname: "/my-mints",
            search: user.userData._id,
          });
        } else if (updatepage === "mycreate") {
          history.push({
            pathname: "/create",
            search: user.userData._id,
          });
        } else if (updatepage === "KYCpage") {
          history.push({
            pathname: "/KYC",
            search: user.userData._id,
          });
        } else {
          history.push({
            pathname: "/",
            search: user.userData._id,
          });
        }
      }
    }
  }, [user, chainId]);

  useEffect(() => {
    if (location.search.substring(1, location.search.length)) {
      const id = location.search.substring(1, location.search.length);

      setUpdatepage(id);
    }
  }, [location.search]);

  return (
    <Container maxWidth="sm" className={classes.grid}>
      <Paper elevation={2} className="borderGraditant">
        <Box
          className={
            themeSeeting.settings.theme === "DARK"
              ? "backgroudBlack"
              : "backgroudBlack1"
          }
        >
          <Box className={classes.logintext}>
            <Typography variant="h2" color="primary">
              Connect your wallet.
            </Typography>
            <Typography variant="body2" color="primary" maxWidth="280px">
              Connect with one of our available wallet providers or create a new
              one.
            </Typography>
          </Box>
          {SUPPORTED_WALLETS.map((item, i) => {
            return (
              <WalletCard
                key={i}
                className={classes.metamaskhead}
                setOpen2={setOpen2}
                open2={open2}
                handleClickOpen2={handleClickOpen2}
                onWalletConnectHandler={(data) => {
                  onWalletConnectHandler(data);
                  // setSelectedWallet(data.name);
                }}
                index={i}
                data={SUPPORTED_WALLETS[0]}
                openWallect={openWallect}
                setopenWallect={setopenWallect}
              ></WalletCard>
            );
          })}
        </Box>
      </Paper>
      <Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          classes={{ paper: classes.paper }}
        >
          <DialogActions>
            <IconButton
              onClick={handleClose}
              className={classes.customizedButton}
              color="primary"
            >
              <GiCancel />
            </IconButton>
          </DialogActions>
          <DialogContent className={classes.dialogBox}>
            <Box className="modal_text">
              <Typography variant="h5" align="center" color="primary">
                What is a wallet?
              </Typography>
              <Typography variant="body2" color="primary">
                Wallets are used to send, receive, and store digital assets like
                Ether. Wallets come in many forms. They are either built into
                your browser, an extension added to your browser, a piece of
                hardware plugged into your computer, or even an app on your
                phone.
              </Typography>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </Container>
  );
};

export default ConnectWallet;
