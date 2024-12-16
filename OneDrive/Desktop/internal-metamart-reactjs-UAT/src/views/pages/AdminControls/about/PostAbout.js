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
  title: yep.string().required("Title is left").max(120, "Too long"),
  description: yep
    .string()
    .required("Please enter your description")
    .max(400, "Too long"),
});

const formInitialSchema = {
  type: "aboutUs",
  title: "",
  description: "",
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
        url: Apiconfigs.addStaticContent,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: {
          type: values.type,
          title: values.title,
          description: values.description,
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
                    <label>Title</label>

                    <TextField
                      fullWidth
                      variant="outlined"
                      name="title"
                      type="text"
                      multiline
                      value={values.title}
                      minRows={2}
                      error={Boolean(touched.title && errors.title)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error>
                      {touched.title && errors.title}
                    </FormHelperText>
                    <label>Description</label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      name="description"
                      type="text"
                      multiline
                      value={values.description}
                      minRows={4}
                      error={Boolean(touched.description && errors.description)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error>
                      {touched.description && errors.description}
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
