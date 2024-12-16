import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import { Box } from "@material-ui/core";
import ShareSocialMedia from "./ShareSocialMedia";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
  },
  proper: {
    "& .MuiPaper-elevation1": {
      backgroundColor: "rgba(255, 255, 255, 0.10)",
      borderRadius: "10px",
      border: "1px solid #ffffff59",
      backdropFilter: "blur(100px)",
    },
  },
  ShareText: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Sora",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "26px",
  },
}));

export default function SharePopper({ type, open, anchorEl, placement }) {
  const classes = useStyles();
  return (
    <Box className={classes.proper}>
      <Popper
        open={open}
        anchorEl={anchorEl}
        role={undefined}
        transition
        disablePortal
        placement={placement}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Box pt={2} pb={2} pr={2} pl={2}>
                <Typography
                  className={classes.ShareText}
                  style={{ fontSize: type == "small" ? "13px" : "" }}
                >
                  Share link to this page.
                </Typography>
                <Box>
                  <ShareSocialMedia type={type} url={window.location} />
                </Box>
              </Box>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}
