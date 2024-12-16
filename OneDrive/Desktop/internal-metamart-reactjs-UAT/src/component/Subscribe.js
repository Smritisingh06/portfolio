import React, { useEffect } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    paddingTop: "96px",
    paddingBottom: "50px",
    "& h2": {
      color: "#000000",
    },
    "& label": {
      color: "#000",
      padding: "0",
      fontSize: "14px",
      lineHeight: "33px",

      transition:
        "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
    "& p": {
      // paddingTop: "15px",
      color: "#000",
      //   marginTop:"30px"
    },
  },
  maintext: {
    padding: "30px",
    marginTop: "10px",
    bordeRadius: "10px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    // border: "1px solid #52b6f1",
  },
}));

const Contact = (props) => {
  const classes = useStyles();
  const location = useLocation();

  const EmailVerifyData = async (id) => {
    const email = id;
    const res = await axios.post(Apiconfigs.userVerifySubscription, {
      email: email,
    });
    if (res.data.statusCode === 200) {
      toast.success("Your email address has been subscribed successfully.");
    }
  };

  useEffect(() => {
    if (location.search.substring(1, location.search.length)) {
      const id = location.search.substring(1, location.search.length);

      EmailVerifyData(id);
    }
  }, [location.search]);

  return (
    <Box className={classes.mainbox}>
      <Container maxWidth="lg">
        <Box mb={5} textAlign="center">
          <Container maxWidth="sm">
            {/* <Typography variant="h2">Thank You For Subscribe</Typography> */}
            <Box>
              <img
                src="images/sub.png"
                alt="commingsoon"
                style={{ width: "100%" }}
              />
            </Box>
          </Container>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
