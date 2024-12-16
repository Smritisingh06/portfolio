import React, { useContext } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  ListItem,
  List,
  Link,
  IconButton,
} from "@material-ui/core";
import SettingsContext from "src/context/SettingsContext";
import { useHistory, Link as RouterLink } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { useWeb3React } from "@web3-react/core";
const useStyles = makeStyles((theme) => ({
  footerSection: {
    background: theme.palette.background.card,
    position: "relative",
    padding: "50px 0px 0",
    zIndex: "2",
    overflow: " hidden",
    "& .imageGrid": {
      position: "absolute",
      display: "flex",
      zIndex: "-1",
      width: "100%",
      alignItems: "end",
      top: "-17%",
      justifyContent: "end",
      [theme.breakpoints.down("sm")]: {
        top: "28%",
        right: "-3%",
      },
      [theme.breakpoints.down("xs")]: {
        top: "30%",
        alignItems: "center",
        justifyContent: "center",
      },
      [theme.breakpoints.only("md")]: {
        top: "-18%",
        right: "-5%",
      },
      [theme.breakpoints.up("md")]: {
        top: "-18%",
        right: "0%",
      },
    },
    "& .imageBox": {
      width: "min(100% - 30px, 250px)",
    },
    "& .copy": {
      borderTop: "1px solid #d0d0d017",
      padding: "10px 0",
      textAlign: "center",
      fontWeight: 300,
      fontSize: "12px",
      color: "#626262",
      "& p": {
        "& span": {
          // background:
          //   "linear-gradient(93.34deg, #FF6F37 6.82%, #FF2676 35.9%, #B801AA 68.08%, #7101BC 101.4%)",
          background:'hsl(230.54deg 95.03% 63.21%)',
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        },
      },
    },
    "& ul": {
      paddingLeft: "0",
      "& li": {
        paddingLeft: "0",
        alignItems: "center",
        color: theme.palette.text.gray,
        fontSize: "14px",
        fontWeight: "300",
        "& svg": {
          marginRight: "10px",
          color: "hsl(230.54deg 95.03% 63.21%)",
          fontSize: "15px",
        },
      },
    },
    "& svg": {
      color: "hsl(230.54deg 95.03% 63.21%)",
      fontSize: "15px",
    },
    "& p": {
      color: theme.palette.text.gray,
    },
    "& h6": {
      [theme.breakpoints.down("sm")]: {
        marginTop: "30px",
      },
      [theme.breakpoints.down("xs")]: {
        marginTop: "10px",
      },
    },
    "& .MuiIconButton-root": {
      padding: "0px 13px 0px 0px",
    },
    "& a": {
      color: theme.palette.text.gray,
      fontWeight: 300,
      textDecoration: "none",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      paddingLeft: "0px",
      paddingRight: "0px",
      [theme.breakpoints.only("xs")]: {
        fontSize: "12px",
      },
      "& :hover": {
        color: "hsl(230.54deg 95.03% 63.21%)",
        textDecoration: "none",
      },
    },
    "& .borderBox": {
      position: "absolute",
      left: "153px",
      top: "12px",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  },
}));

export default function Liquidity() {
  const classes = useStyles();
  const history = useHistory();
  const themeSeeting = useContext(SettingsContext);
  const { account, library, chainId } = useWeb3React();
  return (
    <>
      <Box className={classes.footerSection}>
        <Container maxWidth="lg">
          <Grid container style={{ position: "relative" }}>
            <Grid item xs={12} sm={12} md={3}>
              <Box mr={8}>
                <Box mb={2}>
                  {" "}
                  <RouterLink to="/">
                    <img
                      src="images/Mobiloitte_blue_logo.png"
                      alt=""
                      style={{ width: "190px" }} //width 152
                    />{" "}
                    <br />
                  </RouterLink>
                </Box>
                <Typography variant="body1">
                  MetaMart with the lowest transaction fees in the world.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={9}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="h6" color="primary">
                    Quick Links
                  </Typography>
                  <List>
                    <ListItem to="/collections" component={RouterLink}>
                      Collections
                    </ListItem>

                    {account ? (
                      <ListItem to="/activity" component={RouterLink}>
                        My Activity
                      </ListItem>
                    ) : (
                      <ListItem
                        onClick={() => {
                          history.push({
                            pathname: "conect-wallet",
                            search: "myactivity",
                          });
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        My Activity
                      </ListItem>
                    )}

                    {account ? (
                      <ListItem to="/KYC" component={RouterLink}>
                        KYC
                      </ListItem>
                    ) : (
                      <ListItem
                        onClick={() => {
                          history.push({
                            pathname: "conect-wallet",
                            search: "KYCpage",
                          });
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        KYC
                      </ListItem>
                    )}

                    <ListItem to="/aml" component={RouterLink}>
                      General Risk Disclosure
                    </ListItem>
                    <ListItem to="/legal" component={RouterLink}>
                      Legal
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="h6" color="primary">
                    Dashboard
                  </Typography>
                  <List>
                    {account ? (
                      <ListItem to="create" component={RouterLink}>
                        Create Items
                      </ListItem>
                    ) : (
                      <ListItem
                        onClick={() => {
                          history.push({
                            pathname: "conect-wallet",
                            search: "mycreate",
                          });
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        Create Items
                      </ListItem>
                    )}

                    {account ? (
                      <ListItem to="profile" component={RouterLink}>
                        My Account
                      </ListItem>
                    ) : (
                      <ListItem
                        onClick={() => {
                          history.push({
                            pathname: "conect-wallet",
                            search: "myaccount",
                          });
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        My Account
                      </ListItem>
                    )}
                  </List>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="h6" color="primary">
                    Help
                  </Typography>
                  <List>
                    <ListItem to="/faqs" component={RouterLink}>
                      Faqs
                    </ListItem>
                    <ListItem
                      to={account ? "/help-center" : "conect-wallet"}
                      component={RouterLink}
                    >
                      Help Center
                    </ListItem>
                    <ListItem
                      to={account ? "/feedback" : "/conect-wallet"}
                      component={RouterLink}
                    >
                      Feedback
                    </ListItem>
                    {/* <ListItem to="/about" component={RouterLink}>
                      About Us
                    </ListItem> */}
                  </List>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="h6" color="primary">
                    Contact Us
                  </Typography>
                  <List>
                    <ListItem>
                      <Link href="mailto:nft@metamart.com">
                        <AiOutlineMail />
                        nft@metamart.com
                      </Link>
                    </ListItem>
                  </List>

                  <Box>
                    {/* <IconButton>
                      <Link
                        target="_blank"
                        href="https://t.me/+p56VmMDmvRs4NjNk"
                      >
                        <FaTelegramPlane />
                      </Link>
                    </IconButton> */}
                    <IconButton>
                      <Link
                        target="_blank"
                        href="https://www.instagram.com/"
                      >
                        <FaInstagram />
                      </Link>
                    </IconButton>

                    <IconButton>
                      <Link
                        target="_blank"
                        href="https://www.x.com/"
                      >
                        <RiTwitterXLine />
                      </Link>
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Container className="imageGrid">
              <Box className="imageBox">
                <img
                  width="100%"
                  src={
                    themeSeeting.settings.theme === "DARK"
                      ? "./images/fierexFooter.png"
                      : "./images/fierexFooter2.png"
                  }
                  alt="Footer"
                />
              </Box>
            </Container>
          </Grid>
        </Container>
        <Box className="copy" mt={1}>
          <Container>
            <Box
              alignItems="center"
              my={2}
              position="relative"
              flexWrap="wrap"
              display="flex"
              justifyContent="space-between"
            >
              <Box className="displayStart">
                <img
                  src="images/footer_line.png"
                  alt="images"
                  className="borderBox"
                />
                <List className="displayStart">
                  <ListItem
                    to="/terms-conditions"
                    component={RouterLink}
                    style={{ whiteSpace: "pre" }}
                  >
                    Terms & Conditions
                  </ListItem>

                  <ListItem
                    to="/privacy-policy"
                    component={RouterLink}
                    style={{ marginLeft: "30px", whiteSpace: "pre" }}
                  >
                    Privacy Policy
                  </ListItem>
                </List>
              </Box>

              <Typography variant="body1" style={{ fontWeight: "200" }}>
                Copyright© 2023 Created with love by{" "}
                <span style={{ fontWeight: "bold" }}>MetaMart</span>
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
