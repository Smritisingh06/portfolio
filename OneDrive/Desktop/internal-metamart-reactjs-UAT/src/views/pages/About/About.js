import { Box, Container, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "70px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
    "& p": {
      color: "#686868",
      marginBottom: "10px",
    },
    "& h5": {
      marginBottom: "10px",
      marginTop: "20px",
    },
    "& li": {
      color: "#686868",
      marginBottom: "10px",
      fontSize: "14px",
    },
  },
  heading: {
    textAlign: "start",
  },
  details: {},
}));
const Privacy = () => {
  const classes = useStyles();
  const [setaboutuslist] = useState();
  const [setaboutUs] = useState();
  const aboutuslistApi = async () => {
    try {
      const res = await axios.get(Apiconfigs.staticContentList, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        if (res.data.result.docs) {
          setaboutuslist(res.data.result.docs);

          const result = res.data.result.docs.filter(
            (data) => data.type === "aboutUs "
          );

          setaboutUs(result[0]?._id);
        } else {
          setaboutuslist(res.data.result.docs);
        }
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  };
  useEffect(() => {
    aboutuslistApi();
  }, []);

  return (
    <Box className={classes.root}>
      <Container maxWidth="lg">
        <Paper elevation={2}>
          <Box className={classes.heading}>
            <Typography variant="h1" color="primary">
              About&nbsp;Us
            </Typography>
          </Box>

          <Box className={classes.details} mt={2}>
            <Typography variant="h5">1. TYPES OF DATA WE COLLECT</Typography>
            <Typography variant="body2">
              The types of Personal Data that we collect directly from you or
              from third parties depend on the circumstances of collection and
              on the nature of the service requested or transaction undertaken.
              It may include (but is not limited to):
            </Typography>
            <ol type="a">
              <li>
                personal information that links back to an individual, e.g.,
                name, gender, date of birth, and other personal identification
                numbers
              </li>
              <li>
                contact information, e.g., address, phone number and email
                address
              </li>
              <li>
                technical information, e.g., IP address for API services and
                login
              </li>
              <li>statistical data, e.g., hits to website.</li>
            </ol>
            <Typography variant="body2">
              This Privacy Policy covers the information we collect about you
              when you use our products or services, or otherwise interact with
              MetaMartScan, unless a different privacy policy is displayed. This
              policy also explains your choices about how we use information
              about you. Your choices include how you can object to certain uses
              of information about you and how you can access and update certain
              information about you. If you do not agree to the terms of this
              Policy, please do not use the Site, or any of our Services. Each
              time you use any Site, or any Services, the current version of
              this Privacy Policy will apply.
            </Typography>
            <Typography variant="h5">
              2. HOW DO WE COLLECT PERSONAL DATA?
            </Typography>
            <Typography variant="body2">
              This Privacy Policy covers any Personal Data provided to us:
            </Typography>
            <ol type="a">
              <li>when you engage with our products and services</li>
              <li>when you create an account with us</li>
              <li>under any other contractual agreement or arrangement.</li>
            </ol>
            <Typography variant="body2">
              Some of the other ways we may collect Personal Data shall include
              (but is not limited to):
            </Typography>
            <ol type="a">
              <li>
                communications with you via telephone, letter, fax and email
              </li>
              <li>when you visit our website</li>
              <li>when you contact us in person</li>

              <li>when we contact you in person</li>
              <li>
                when we collect information about you from third parties; and
                other channels including our support helpdesk.
              </li>
            </ol>
            <Typography variant="h5">
              3. HOW DO WE COLLECT YOUR PERSONAL DATA ON OUR WEBSITE?
            </Typography>
            <ol type="a">
              <li>IP address</li>
            </ol>
            <Typography variant="body2">
              We use your IP address to help diagnose problems with our server,
              and to administer our website.
            </Typography>
            <ol type="a">
              <li>Cookies</li>
            </ol>
            <Typography variant="body2">
              A cookie is an element of data that a website can send to your
              browser, which may then store it on your system. We use cookies in
              some of our pages to store your preferences and record session
              information.
            </Typography>
            <Typography variant="body2">
              The information that we collect is then used to ensure a more
              personalized service level for our users. You can adjust settings
              on your browser so that you will be notified when you receive a
              cookie. Please refer to your browser documentation to check if
              cookies have been enabled on your computer or to request not to
              receive cookies.
            </Typography>
            <Typography variant="body2">
              As cookies allow you to take advantage of some of the Website’s
              essential features, we recommend that you accept cookies. For
              instance, if you block or otherwise reject our cookies, you will
              not be able to use any products or services on the website that
              may require you to log-in (token holdings store cookies for
              favorite).
            </Typography>
            <Typography variant="body2">
              It is important that you prevent unauthorized access to your
              password and your computer. You should always log out after using
              a shared computer. Information collected from cookies is used by
              us to evaluate the effectiveness of our site, analyze trends, and
              manage the platform. The information collected from cookies allows
              us to determine such things as which parts of our site are most
              visited and difficulties our visitors may experience in accessing
              our site.
            </Typography>
            <Typography variant="body2">
              With this knowledge, we can improve the quality of your experience
              on the platform by recognizing and delivering more of the most
              desired features and information, as well as by resolving access
              difficulties. We also use cookies and/or a technology known as web
              bugs or clear gifs, which are typically stored in emails to help
              us confirm your receipt of, and response to our emails and to
              provide you with a more personalized experience when using our
              site. Your continued use of this site, as well as any subsequent
              usage, will be interpreted as your consent to cookies being stored
              on your device.
            </Typography>
            <ol type="a">
              <li>User feedback form</li>
            </ol>
            <Typography variant="body2">
              Our feedback form requires you to give us contact information
              (e.g. your name and email address) so that we can respond to your
              comments. We use your contact information from the registration
              form to send you information about our company. Your contact
              information is also used to contact you where necessary.
            </Typography>
            <ol type="a">
              <li>General Site tracking</li>
            </ol>
            <Typography variant="body2">
              We also use third party service provider(s), to assist us in
              better understanding the use of our site. Our service provider(s)
              will place cookies on the hard drive of your computer and will
              receive information that we select, for example, how visitors
              navigate around our site, what pages are browsed and general
              transaction information. Our service provider(s) analyzes this
              information and provides us with aggregate reports.
            </Typography>
            <Typography variant="body2">
              The information and analysis provided by our service provider(s)
              will be used to assist us in better understanding our visitors'
              interests in our site and how to better serve those interests. The
              information collected by our service provider(s) may be linked to
              and combined with information that we collect about you while you
              are using the platform. Our service provider(s) is/are
              contractually restricted from using information they receive from
              our Site other than to assist us.
            </Typography>{" "}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Privacy;
