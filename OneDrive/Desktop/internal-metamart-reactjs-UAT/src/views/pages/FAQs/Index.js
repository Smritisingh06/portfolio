import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Box,
  Container,
  Typography,
  Grid,
} from "@material-ui/core";
import axios from "axios";
import Apiconfig from "src/ApiConfig/ApiConfig";
import FaqData from "src/component/FaqData";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "50px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0",
    },
    "& .faqbackbox": {
      background: theme.palette.background.blur,
      padding: "15px",
      borderRadius: "10px",
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
          setuserlist(res.data.result.docs);
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
    <Box className={classes.root}>
      <Container maxWidth="lg">
        <Box className="faqbackbox">
          <Typography variant="h1" color="primary">
            FAQs
          </Typography>
          <Box mt={5} mb={5}>
            <Grid container spacing={1}>
              {userlist &&
                userlist?.map((data, i) => {
                  return (
                    <Grid item xs={12} sm={12} md={12} key={i}>
                      <FaqData data={data} index={i} />
                    </Grid>
                  );
                })}
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
export default Faq;
