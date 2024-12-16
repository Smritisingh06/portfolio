import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Box,
  Container,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import FaqData from "src/component/FaqData";
import { Link } from "react-router-dom";
import axios from "axios";
import Apiconfig from "src/ApiConfig/ApiConfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataNotFound from "src/component/DataNotFound";
import { AnimationOnScroll } from "react-animation-on-scroll";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "50px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0",
    },
  },
}));

function Faq() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [userlist, setuserlist] = useState([]);
  const FaqdataApi = async () => {
    try {
      setIsLoading(true);
      await axios.get(Apiconfig.faqList).then(async (res) => {
        if (res.data.statusCode == 200) {
          setuserlist(res.data?.result?.docs);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      });
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    FaqdataApi();
  }, []);
  return (
    <>
      <Box className={classes.root}>
        <Container maxWidth="lg">
          <AnimationOnScroll animateIn="animate__bounceInLeft">
            <Typography variant="h2" color="primary">
              Frequently Asked Questions
            </Typography>
          </AnimationOnScroll>
          <Box mt={5} mb={2}>
            <Grid container spacing={1}>
              {isLoading ? (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <ButtonCircularProgress />
                </Box>
              ) : (
                <>
                  {userlist &&
                    userlist?.slice(0, 4).map((data, i) => {
                      return (
                        <Grid item xs={12} sm={12} md={12} key={i}>
                          <FaqData data={data} index={i} />
                        </Grid>
                      );
                    })}
                </>
              )}
              {!isLoading && userlist && userlist?.length === 0 && (
                <DataNotFound />
              )}
            </Grid>
          </Box>
          <Box align="right">
            {userlist && userlist?.slice(0, 4).length >= 4 && (
              <Button
                variant="contained"
                size="large"
                color="primary"
                component={Link}
                to="/faqs"
                className={classes.buttonright}
              >
                View More
              </Button>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
export default Faq;
