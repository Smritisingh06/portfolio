import React from "react";
import {
  Box,
  makeStyles,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  Button,
  DialogActions,
} from "@material-ui/core";
import { GrClose } from "react-icons/gr";
import CloseIcon from "@material-ui/icons/Close";
const useStyles = makeStyles((theme) => ({
  DialogClass: {
    position: "relative",
    // position:"absolute"
    // borderRadius: "15px",
    // "& .MuiDialog-paper": {
    //   borderRadius: "50px!important",
    // },
    // "& .MuiDialog-paperFullWidth": {
    //   borderRadius: "50px",
    // },
    // "& .MuiOutlinedInput-adornedEnd": {
    //   paddingRight: "0",
    //   borderRadius: "55px",
    // },
    "& .MuiDialogActions-root": {
      align: "center",
      justifyContent: "center",
    },
    " & svg": {
      color: theme.palette.primary.main,
    },
  },
}));

function KycNotCompletedModal({
  data,
  btnName,
  RouteURL,
  handleclose,
  handleOpen,
  reason,
}) {
  const classes = useStyles();
  return (
    <Box>
      <Dialog
        fullWidth="xs"
        maxWidth={reason ? "md" : "xs"}
        open={handleOpen}
        keepMounted
        onClose={() => handleclose()}
        className={classes.DialogClass}
      >
        {/* <DialogTitle id="alert-dialog-title"> */}
        <Box display="flex" justifyContent="end">
          <IconButton>
            <CloseIcon
              onClick={() => handleclose()}
              // style={{ color: "#ffffff" }}
            />
          </IconButton>
        </Box>
        {/* </DialogTitle> */}
        <DialogContent>
          <Box align="center">
            <img src="images/infoIcon.png" alt="dumy" width="70px" />
          </Box>

          <Box my={1} align="center">
            <Typography
              variant="h4"
              style={
                reason
                  ? {
                      color: "#52A500",
                      width: "100%",
                      fontWeight: "500",
                    }
                  : {
                      color: "#52A500",
                      maxWidth: "200px",
                      fontWeight: "500",
                    }
              }
            >
              {/* {data ? data : ""} */}
              {data && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: data,
                  }}
                />
              )}
            </Typography>
          </Box>
          {reason && (
            <Box my={1} align="center">
              <Typography
                variant="h4"
                style={{
                  color: "#ff0000",
                  fontWeight: "500",
                  wordBreak: "break-word",
                  textAlign: "start",
                }}
              >
                {data && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `Reason: ${reason}`,
                    }}
                  />
                )}
              </Typography>
            </Box>
          )}
        </DialogContent>
        {btnName && (
          <DialogActions>
            <Button
              variant="contained"
              size="large"
              // fullWidth
              color="primary"
              onClick={RouteURL}
            >
              {btnName ? btnName : ""}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Box>
  );
}

export default KycNotCompletedModal;
