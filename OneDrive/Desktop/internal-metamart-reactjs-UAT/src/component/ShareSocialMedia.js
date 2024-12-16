import React from "react";
import {
  FacebookShareButton,
  TelegramShareButton,
  EmailShareButton,
  TwitterShareButton,
} from "react-share";
import { Box, Button, Grid, IconButton, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { makeStyles } from "@material-ui/styles";
import { MdEmail } from "react-icons/md";

const useStyles = makeStyles((theme) => ({
  ShareSocialMedia: {
    "& button": {
      background: "#ffffff1f",
    },
    "& .socialBox": {
      border: "1px solid #80808042",
      borderRadius: "10px",
      padding: "16px",
      [theme.breakpoints.only("xs")]: {
        padding: "6px",
      },

      "& .iconShareButton": {
        background: "rgba(255, 255, 255, 0.05)",
      },

      "& p": {
        marginTop: "5px",
        fontSize: "9px",
        fontWeight: "300",
      },
    },
  },
}));
export default function ShareSocialMedia({ type, url }) {
  const classes = useStyles();
  return (
    <Box className={classes.ShareSocialMedia} pt={1}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <FacebookShareButton url={url} target="_blank">
            <IconButton className="iconShareButton">
              <FaFacebookF
                style={{ fontSize: type == "small" ? "16px" : "23px" }}
              />
            </IconButton>
            {type !== "small" && (
              <Typography
                variant="body2"
                color="primary"
                style={{ fontSize: "9px" }}
              >
                Facebook
              </Typography>
            )}
          </FacebookShareButton>
        </Grid>
        <Grid item xs={3}>
          <EmailShareButton url={url} email="info@hovr.site">
            <IconButton className="iconShareButton">
              <MdEmail
                style={{ fontSize: type == "small" ? "16px" : "23px" }}
              />
            </IconButton>
            {type !== "small" && (
              <Typography
                variant="body2"
                color="primary"
                style={{ fontSize: "9px" }}
              >
                {" "}
                E-mail
              </Typography>
            )}
          </EmailShareButton>
        </Grid>
        <Grid item xs={3}>
          <TelegramShareButton url={url}>
            <IconButton className="iconShareButton">
              <FaTelegramPlane
                style={{ fontSize: type == "small" ? "16px" : "23px" }}
              />
            </IconButton>
            {type !== "small" && (
              <Typography
                variant="body2"
                color="primary"
                style={{ fontSize: "9px" }}
              >
                Telegram
              </Typography>
            )}
          </TelegramShareButton>
        </Grid>
        <Grid item xs={3}>
          <TwitterShareButton url={url} title={`Check out this item on Fieres`}>
            <IconButton className="iconShareButton">
              {" "}
              <FaTwitter
                style={{ fontSize: type == "small" ? "16px" : "23px" }}
              />
            </IconButton>
            {type !== "small" && (
              <Typography
                variant="body2"
                color="primary"
                style={{ fontSize: "9px" }}
              >
                {" "}
                Twitter
              </Typography>
            )}
          </TwitterShareButton>
        </Grid>
      </Grid>
    </Box>
  );
}
