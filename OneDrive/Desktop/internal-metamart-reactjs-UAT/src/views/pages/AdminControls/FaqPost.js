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
import { Form, Formik } from "formik";
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

const formValidationSchema = yep.object().shape({
  question: yep.string().required("Question is left").max(120, "Too long"),
  answer: yep
    .string()
    .required("Please enter your answer")
    .max(400, "Too long"),
});

const formInitialSchema = {
  question: "",
  answer: "",
};

export default function FaqPost() {
  const history = useHistory();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "POST",
        url: Apiconfigs.addFAQ,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          question: values.question,
          answer: values.answer,
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

  return (
    <Box className={classes.mainSection}>
      <Container maxWidth="sm">
        <Grid container>
          <Grid item lg={12} md={12} sm={12}>
            <Box>
              <Formik
                initialValues={formInitialSchema}
                initialStatus={{
                  success: false,
                  successMsg: "",
                }}
                validationSchema={formValidationSchema}
                onSubmit={(values) => handleFormSubmit(values)}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  touched,
                  values,
                  setFieldValue,
                }) => (
                  <Form>
                    <label>Questions</label>

                    <TextField
                      fullWidth
                      variant="outlined"
                      name="question"
                      type="text"
                      multiline
                      value={values.question}
                      minRows={2}
                      error={Boolean(touched.question && errors.question)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error>
                      {touched.question && errors.question}
                    </FormHelperText>
                    <label>Answer</label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      name="answer"
                      type="text"
                      multiline
                      value={values.answer}
                      minRows={4}
                      error={Boolean(touched.answer && errors.answer)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error>
                      {touched.answer && errors.answer}
                    </FormHelperText>
                    <Box className={classes.information} mt={2}>
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        type="submit"
                      >
                        Submit
                        {isLoading && <ButtonCircularProgress />}
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
