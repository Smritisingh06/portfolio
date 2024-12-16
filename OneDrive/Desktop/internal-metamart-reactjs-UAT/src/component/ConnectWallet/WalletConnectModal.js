import React, { useContext, useEffect } from "react";
import {
  makeStyles,
  Button,
  Grid,
  Box,
  Typography,
  TextField,
  FormControl,
  Dialog,
  DialogContent,
  Paper,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { toast } from "react-toastify";
import { UserContext } from "src/context/User";
import ButtonCircularProgress from "../ButtonCircularProgress";
import { useWeb3React } from "@web3-react/core";
import { ACTIVE_NETWORK } from "src/constants";
// import { sortAddress, swichNetworkHandler } from "src/utils";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import CopyToClipboard from "react-copy-to-clipboard";
import { IoCopyOutline } from "react-icons/io5";
import { SUPPORTED_WALLETS } from "src/connectors";
const useStyles = makeStyles((theme) => ({
  dialogbox: {
    position: "relative",
    padding: "30px",
    // textAlign: "start",
    "& li": {
      textAlign: "start",
      color: "#ffffffab",
      fontSize: "14px",
    },
    "& h6": {
      fontSize: "16px",
      textAlign: "start",
    },
    "& h5": {
      fontSize: "20px",
    },
    "& p": {
      color: "#ffffffab",
      textAlign: "start",
      fontSize: "14px",
    },
    "& .svg12": {
      position: "absolute",
      //   top: "5px",
      right: "5px",
      cursor: "copy",
      color: "white",
    },
    "& svg": {
      position: "absolute",
      //   top: "5px",
      // right: "0px",
      cursor: "pointer",
      color: "white",
    },
  },
  cross: {
    "& svg": {
      // position: "absolute",
      //   top: "5px",
      right: "5px",
      // cursor: "pointer",
      // color: "white",
    },
  },
  btnColor: {
    background: "red !important",
    border: "red !important",
    "& svg": { position: "inherit !important" },
    "&:hover": {
      background: "red !important",
      //   "& svg": {
      //     background: "red",
      //   },
    },
  },
}));

function WalletConnectModal(props) {
  const classes = useStyles();
  const { open, handleClose } = props;
  const user = useContext(UserContext); // onClick={user.connectWallet}
  const { activate, account, chainId, library } = useWeb3React();

  useEffect(() => {
    if (account) {
      //   handleClose();
    }
  }, [account]);

  return (
    <>
      <Dialog open={open} fullWidth maxWidth="sm">
        <Box className={classes.dialogbox}>
          <Box className={classes.cross}>
            <ClearIcon onClick={handleClose} />
          </Box>
          <DialogContent>
            <Grid
              container
              spacing={2}
              direction={"column"}
              //   style={{ border: "1px solid #fff" }}
            >
              {!user.walletErr && (
                <Grid xs={12} align="center">
                  <Box mb={2}>
                    <Typography variant="h4">Request for Wallet</Typography>
                  </Box>
                </Grid>
              )}
              {!account &&
                !user.isMetaMask &&
                !user.isMetaMaskRejected.rejected &&
                !user.isMetaMaskRejected.trxPending && (
                  <Grid xs={12} align="center">
                    <Box mb={2}>
                      <ButtonCircularProgress />
                    </Box>
                  </Grid>
                )}
              {!account && user.isMetaMask && (
                <Grid xs={12} align="center">
                  <Box mb={2}>
                    You Don't have wallet.{" "}
                    <a
                      href="https://metamask.io/"
                      style={{ color: "#d3d6d899" }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Learn More
                    </a>
                  </Box>
                </Grid>
              )}
              {!account && user.isMetaMaskRejected.trxPending && (
                <Grid xs={12} align="center">
                  <Box mb={2}>
                    <Typography variant="h6">
                      A Wallet Connection Request is Already Pending!
                    </Typography>
                    <Typography variant="body1">
                      It appears that there is already a pending wallet
                      connection request. Please review your pending requests
                      and consider the following options:
                    </Typography>
                    <ul>
                      <li>
                        If you intended to connect your wallet and accidentally
                        rejected the request, you can approve the pending
                        request.
                      </li>
                      {/* <li>
                          If you have concerns or questions about the pending
                          request, please review the request details or contact
                          our support team for assistance.
                        </li> */}
                      <li>
                        If you no longer wish to proceed with the pending
                        request, you can cancel it.
                      </li>
                    </ul>
                    <Typography variant="body2">
                      Thank you for your attention. If you need any further
                      assistance or have questions, please don't hesitate to
                      reach out to us.
                    </Typography>
                  </Box>
                </Grid>
              )}
              {!account && user.isMetaMaskRejected.rejected && (
                <Grid xs={12} align="center">
                  <Box mb={2} mt={2}>
                    {/* You Don't have wallet.{" "} */}
                    {/* Request rejected.
                    <a
                      href="https://metamask.io/"
                      style={{ color: "#d3d6d899" }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Learn More
                    </a> */}
                    <Typography variant="h6">
                      Metamask Wallet Connection Request Rejected!
                    </Typography>
                    <Typography variant="body2">
                      We're sorry, but you have rejected the request to connect
                      your Metamask wallet.
                    </Typography>
                    <Box mt={2}>
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        onClick={() => user.connectWallet(SUPPORTED_WALLETS[0])}
                        // onClick={user.connectWallet}
                      >
                        Try Again
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              )}
              <Paper>
                {account && (
                  <Grid xs={12} align="center">
                    <Box my={2}>
                      <FormControl fullWidth>
                        <TextField
                          variant="outlined"
                          placeholder="0xdE41BD279c6AB6f81bafd87550dCBDCB39e0BeA3"
                          name="walletAddress"
                          value={account}
                          fullWidth="true"
                          size="small"
                          disabled
                          // onBlur={handleBlur}
                          // onChange={handleChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <CopyToClipboard text={account}>
                                  <IconButton
                                    onClick={() =>
                                      toast.info(`Wallet address copied`)
                                    }
                                  >
                                    <IoCopyOutline className="svg12" />
                                  </IconButton>
                                </CopyToClipboard>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                )}
                {user.wallectLoader && (
                  <>
                    <Grid xs={12} align="center">
                      <Box
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <ButtonCircularProgress />
                      </Box>
                    </Grid>
                    <Grid xs={12} align="center">
                      <Typography variant="body1">Connecting...</Typography>
                    </Grid>
                  </>
                )}
                {user.walletErr && (
                  <Grid xs={12} align="center">
                    <Box mb={2}>
                      <Typography variant="h6">Error connecting!</Typography>
                    </Box>
                    <Typography variant="body1">
                      The connection attempt failed. Please click try again and
                      follow the steps to connect in your wallet.
                    </Typography>
                    <Box mt={2}>
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        onClick={() => user.connectWallet(SUPPORTED_WALLETS[0])}
                      >
                        Try Again
                      </Button>
                    </Box>
                  </Grid>
                )}
                {account && chainId != ACTIVE_NETWORK && (
                  <Grid xs={12} align="center">
                    <Box
                      style={{
                        // textAlign: "start",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body1" aling="start">
                        You are on wrong network
                      </Typography>
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        style={{ maxHeight: "31px" }}
                        className={classes.btnColor}
                        onClick={user.swichNetworkHandler}
                      >
                        <ReportProblemIcon style={{ margin: "0 10px" }} />{" "}
                        Switch Network
                      </Button>
                      {/* <Typography variant="h3">{sortAddress(account)}</Typography> */}
                    </Box>
                  </Grid>
                )}
                {window.sessionStorage.getItem("userStatus") === "BLOCK" && (
                  <Grid xs={12} align="center">
                    <Box
                      style={{
                        // textAlign: "start",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body1" aling="start">
                        Your Account has been blocked
                      </Typography>
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        style={{ maxHeight: "31px" }}
                        className={classes.btnColor}
                        onClick={user.swichNetworkHandler}
                      >
                        <ReportProblemIcon style={{ margin: "0 10px" }} />{" "}
                      </Button>
                    </Box>
                  </Grid>
                )}
              </Paper>
              <Grid xs={12} align="center">
                {/* <Box mt={2}>
                                <Button variant="contained" size="large" color="primary">
                                    Submit
                                </Button>
                            </Box> */}
              </Grid>
            </Grid>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
}

export default WalletConnectModal;
