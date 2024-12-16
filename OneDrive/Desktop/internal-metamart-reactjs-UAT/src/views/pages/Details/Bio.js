import React, { useState } from "react";
import {
  Box,
  makeStyles,
  Button,
  Container,
  Typography,
  Link,
} from "@material-ui/core";
import { FaTwitter, FaFacebookF } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  root: { paddingBottom: "100px" },
  biobox: {
    padding: "30px 0px",
    // backdropFilter: "blur(44px)",
    borderRadius: "10px",
    marginTop: "26px",
    filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
    background: "#fff",
    boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    "& h3": {
      fontWeight: "bold",
      color: "#000000",
    },
    "& p": {
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#000000",
      paddingTop: "15px",
    },
  },
  conrnerBox: {
    height: "auto",
    background: "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
    marginRight: "20px",
    borderRadius: "10px",
    padding: "10px",
  },
  socialMediaIcon: {
    fontSize: "30px",
    color: "#FFFFFF",
  },
}));

export default function Bio() {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.biobox}>
        <Container>
          <Typography variant="h3">Bio:</Typography>
          <Typography variant="body2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Typography>
        </Container>
      </Box>
      <Box className={classes.biobox}>
        <Container>
          <Typography variant="h3">Links:</Typography>
          <Box style={{ display: "flex", paddingTop: "30px" }}>
            <Link target="_blank" href="https://www.facebook.com/">
              <Button className={classes.conrnerBox}>
                <FaFacebookF className={classes.socialMediaIcon} />
              </Button>
            </Link>
            <Link target="_blank" href="https://twitter.com/">
              <Button className={classes.conrnerBox}>
                <FaTwitter className={classes.socialMediaIcon} />
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </>
  );
}
