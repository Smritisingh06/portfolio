import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";

import React, { useState, useEffect } from "react";
import * as yep from "yup";
import axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";

import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  mainSection: {
    marginTop: "3rem",
  },
  information: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function FaqPost() {
  const history = useHistory();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const [faqData, setFaqData] = useState([]);
  const [faqId, setFaqId] = useState();
  const [values, setValues] = React.useState({
    question: "",
    answer: "",
  });

  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...values, [name]: value };

    setValues(temp);
  };
  useEffect(() => {
    if (location.search && location.search.length > 0) {
      const ids = location.search.split("?");
      // if (ids[1]) {
      //   fawViewHandler(ids[1]);
      //   handleFormSubmit(ids[1]);
      // }
    }

    const kid = location.hash.split("#");

    if (kid[1]) {
      setFaqId(kid[1]);
    }
  }, [location.search]);

  const fawViewHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.viewFAQ + faqId,
      });
      if (res.data.statusCode === 200) {
        setFaqData(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFormSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "PUT",
        url: Apiconfigs.editFAQ,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          question: values.question,
          answer: values.answer,
          _id: faqId,
        },
      });
      if (res.data.statusCode === 200) {
        toast.success(res.data.responseMessage);
        history.push("/control");
        setIsLoading(false);
      } else {
        toast.error(res.data.response_message);
      }

      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (faqId) {
      fawViewHandler();
    }
  }, [faqId]);
  useEffect(() => {
    if (faqData) {
      setValues({
        question: faqData?.question ? faqData?.question : "",
        answer: faqData?.answer ? faqData?.answer : "",
      });
    }
  }, [faqData]);

  const formInitialSchema = {
    question: faqData?.question ? faqData?.question : "",
    answer: faqData?.answer ? faqData?.answer : "",
  };

  const formValidationSchema = yep.object().shape({
    question: yep.string().required("Question is left").max(120, "Too long"),
    answer: yep
      .string()
      .required("Please enter your answer")
      .max(400, "Too long"),
  });

  return (
    <Box className={classes.mainSection}>
      <Container maxWidth="sm">
        <Grid container>
          <Grid item lg={12} md={12} sm={12}>
            <Box>
              <label>Questions</label>

              <TextField
                fullWidth
                variant="outlined"
                name="question"
                type="text"
                multiline
                value={values.question}
                minRows={2}
                onChange={_onInputChange}
              />
              <label>Answer</label>
              <TextField
                fullWidth
                variant="outlined"
                name="answer"
                type="text"
                multiline
                value={values.answer}
                minRows={4}
                onChange={_onInputChange}
              />

              <Box className={classes.information} mt={2}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  type="submit"
                  onClick={handleFormSubmit}
                >
                  Submit
                  {isLoading && <ButtonCircularProgress />}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
