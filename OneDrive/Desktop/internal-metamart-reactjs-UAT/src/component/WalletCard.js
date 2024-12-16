import React, { useContext } from "react";
import {
  Typography,
  Box,
  makeStyles,
  IconButton,
  Button,
  Link as RouterLink,
  Paper,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Checkbox from "@material-ui/core/Checkbox";
import CloseIcon from "@material-ui/icons/Close";
import { UserContext } from "src/context/User";
import ErrorIcon from "@material-ui/icons/Error";
import { SUPPORTED_WALLETS } from "src/connectors";
import { withStyles } from "@material-ui/styles";
import SettingsContext from "src/context/SettingsContext";
import WalletConnectModal from "./ConnectWallet/WalletConnectModal";

const useStyles = makeStyles((theme) => ({
  walletBox: {
    border: "1px solid #E9E9E9",
    borderRadius: "25px",
    textAlign: "center",
    cursor: "pointer",
    border: "1px solid transparent",
    // minHeight: '185px',
    "& img": {
      // marginBottom: '15px',
      maxWidth: "100%",
      maxHeight: "73px",
      minWidth: "30px",
    },
    "& h5": {
      fontWeight: "500",
      fontSize: "20px",
      lineHeight: "33px",
      // marginBottom: '10px',
    },
    "& lavel": {
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "24px",
      color: "#3D3D3D",
    },
    width: "56%",
  },
  paper: {
    overflowY: "unset",
  },
  customizedButton: {
    position: "absolute",
    top: "0px",
    right: "0px",
    color: "rgb(120, 120, 120)",
  },
  dialogBox: {
    padding: "30px",
    width: "325px !important",
    "& .MuiButton-outlinedSizeLarge": {
      padding: "7px 29px",
    },
    "@media(max-width:500px)": {
      width: "300px !important",
    },
    "@media(max-width:400px)": {
      width: "270px !important",
    },
    "& .textSubHeading": {
      color: theme.palette.text.graydark,
      marginBottom: "10px",
    },
  },
  metaButtonBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // border: '1px solid rgb(124, 124, 124)',
    borderRadius: "10px",
    padding: "8px 16px 8px",
    transition: "0.5s",
    // '&:hover': {
    //   transform: 'translateY(-10px)',
    //   border: '1px solid #3397FE',
    // },
  },
  textColorGradiant: {
    color: "#FF574C",
    textDecoration: "none",
  },
}));
const GreenCheckbox = withStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    padding: "0px 9px 0px 0px",
    // color: 'red',
    "&$checked": {
      color: "#FF00CD !important",
    },
  },
  checked: {},
}))((props) => <Checkbox color="default" {...props} />);

export default function UsersCard(props) {
  const [checked, setChecked] = React.useState(false);
  const themeSeeting = useContext(SettingsContext);
  const [checkedTerms, setCheckedTerms] = React.useState(false);
  const history = useHistory();
  const user = useContext(UserContext);
  const handleClose2 = () => {
    setOpen2(false);
  };

  const {
    type,
    data,
    onWalletConnectHandler,
    isLoading,
    selectedWallet,
    errorMsg,
    handleClickOpen2,
    open2,
    setOpen2,
    open3,
    setOpen3,
    handleClickOpen3,
    openWallect,
    setopenWallect,
  } = props;
  const classes = useStyles();

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangecheckedTerms = (event) => {
    setCheckedTerms(event.target.checked);
  };
  const walletBlocktoast = () => {
    toast.warn("You have been blocked");
    handleClose2();
    history.push("/");
  };

  const openModal = () => {
    if (themeSeeting.acceptTandC) {
      onWalletConnectHandler(data);
      HandleWalletModal();
    } else {
      handleClickOpen2();
    }
  };

  const HandleWalletModal = () => {
    setopenWallect(true);
    // user.connectWallet();
  };
  const CloseWalletModal = () => {
    setopenWallect(false);
  };
  return (
    <Box
      style={{ display: "flex", justifyContent: "center", paddingTop: "8px" }}
    >
      <Box className={classes.walletBox}>
        {SUPPORTED_WALLETS.map((item, i) => {
          return (
            <Box
              key={i}
              className={classes.metamaskhead}
              setOpen2={setOpen2}
              open2={open2}
              onWalletConnectHandler={(data) => {
                onWalletConnectHandler(data);
              }}
              onClick={() => {
                openModal(data);
              }}
              index={i}
              data={SUPPORTED_WALLETS[0]}
            >
              <Box className={classes.metaButtonBox}>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h5" color="primary">
                    {" "}
                    {item.data?.name}
                  </Typography>
                </Box>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Box>
                  <img src={item.data?.iconName} alt="" width="70%" />
                </Box>
              </Box>
            </Box>
          );
        })}

        {openWallect && (
          <WalletConnectModal
            open={openWallect}
            handleClose={CloseWalletModal}
          />
        )}
      </Box>

      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.paper }}
      >
        <DialogActions>
          <IconButton
            onClick={handleClose2}
            className={classes.customizedButton}
          >
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <DialogContent className={classes.dialogBox}>
          <Box>
            <Box mb={2}>
              <Typography
                variant="h5"
                color="primary"
                style={{ fontFamily: "'Good Times Rg', sans-serif" }}
              >
                Fieres Terms Of Service
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="primary"
              className="textSubHeading"
            >
              Please take a few minutes to read and understand NftTokenABI terms
              of services to continue all need to accept the terms of services
              by checking the box
            </Typography>
            <Typography variant="body2" color="primary">
              <GreenCheckbox
                onChange={handleChange}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              I am at least 13 years old
            </Typography>

            <Typography
              variant="body2"
              color="primary"
              style={{ marginBottom: "10px", marginTop: "8px" }}
            >
              <GreenCheckbox
                onChange={handleChangecheckedTerms}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              I accept the &nbsp;
              <Link
                target="_blank"
                to="/terms-conditions"
                className={classes.textColorGradiant}
              >
                FIERES Terms of Services
              </Link>
            </Typography>
            <Box mt={2}>
              <Button
                onClick={handleClose2}
                variant="contained"
                color="primary"
                autoFocus
              >
                Cancel
              </Button>{" "}
              &nbsp;
              {checked && checkedTerms && user?.walletdata === "BLOCK" ? (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={walletBlocktoast}
                  autoFocus
                  size="large"
                >
                  Proceed
                </Button>
              ) : (
                <>
                  {checked && checkedTerms && (
                    <>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        onClick={() => {
                          onWalletConnectHandler(data);
                          HandleWalletModal();
                        }}
                        autoFocus
                      >
                        Proceed
                      </Button>
                    </>

                    // <Button
                    //   variant="contained"
                    //   size="small"
                    //   color="primary"
                    //   onClick={() => onWalletConnectHandler(data)}
                    //   autoFocus
                    // >
                    //   Proceed
                    // </Button>
                  )}
                </>
              )}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog
        open={user.errorPop}
        onClose={() => user.setErrorPop(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.paper }}
      >
        <DialogActions>
          <IconButton
            onClick={handleClose2}
            className={classes.customizedButton}
          >
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <DialogContent className={classes.dialogBox}>
          <Box className="modal_text">
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ErrorIcon style={{ color: "red" }} />
            </Box>
            <Typography variant="h6" align="center">
              Error
            </Typography>
            <Box style={{ textAlign: "center" }}>
              <Typography variant="body2">{user.errorMsg}</Typography>
              <Typography variant="body2">
                If the problem persist please{" "}
                <span style={{ color: "#039be3" }}>Contact support</span>
              </Typography>
              <Button
                style={{
                  backgroundColor: "#039be3",

                  borderRadius: "50px",
                  height: "40px",
                  marginTop: "12px",
                  width: "160px",
                }}
                color="primary"
                onClick={() => {
                  const selectectWalletDetails = SUPPORTED_WALLETS.filter(
                    (data) =>
                      data.name === window.sessionStorage.getItem("walletName")
                  );
                  onWalletConnectHandler(selectectWalletDetails[0]);
                }}
              >
                TRY AGAIN
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
