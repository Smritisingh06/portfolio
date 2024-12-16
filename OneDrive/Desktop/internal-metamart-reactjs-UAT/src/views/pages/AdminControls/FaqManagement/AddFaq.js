import React, { useRef, useState } from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Button,
  makeStyles,
  TextField,
  Paper,
} from "@material-ui/core";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import axios from "axios";
import Apiconfig from "src/ApiConfig/ApiConfig";
import { Link, useHistory } from "react-router-dom";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    paddingTop: "100px",
    "& .jodit-container:not(.jodit_inline)": {
      color: "#000",
      // background: theme.palette.primary.main,
    },
    "& .EditContentBox": {
      padding: "25px",
    },
  },
  btn: {
    background:
      "linear-gradient(124deg, rgba(47, 89, 149, 0.81) 18.76%, rgba(21, 29, 42, 0.87) 43.13%, rgba(0, 88, 241, 0.65) 96.83%)",
    color: "#FFFFFF",
    borderRadius: "40px",
    width: "130px",
    height: "6vh",
    "&:hover": {
      background: "#313b48",
    },
  },
  btn2: {
    background: "#313b48",
    color: "#FFFFFF",
    borderRadius: "40px",
    width: "130px",
    height: "6vh",
    "&:hover": {
      background:
        "linear-gradient(124deg, rgba(47, 89, 149, 0.81) 18.76%, rgba(21, 29, 42, 0.87) 43.13%, rgba(0, 88, 241, 0.65) 96.83%)",
    },
  },
}));

const AddFaq = () => {
  const classes = useStyles();
  const editorRef = useRef(null);
  const history = useHistory();
  const [imgFile, setImgFile] = useState("");
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [loader, setLoader] = useState(false);
  const [linkurl, setLinkurl] = useState("");
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [idvalid, setisvalid] = useState(false);
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };
  const [imgFileBase, setImgFileBase] = useState("");
  const [description, setdescription] = useState("");
  const min = 0;
  const max = 5;
  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (err) {
      console.log("Error: ", err);
    };
  };

  const AddfaqHandler = async () => {
    setisvalid(true);
    if (question !== "" && answer !== "") {
      try {
        setLoader(true);
        const res = await axios({
          method: "POST",
          url: Apiconfig.addFAQ,
          //   headers: {
          //     token: window.localStorage.getItem("creatturAccessToken"),
          //   },
          data: {
            question: question,
            answer: answer,
            url: linkurl,
            image: imgFileBase,
          },
        }).then(async (res) => {
          if (res.data.statusCode === 200) {
            setLoader(false);
            history.push("/faq-list");
            toast.success(res.data.responseMessage);
          }
        });
      } catch (error) {
        console.log(error);
        setLoader(false);
      }
    }
  };

  return (
    <>
      <Container maxWidth="md">
        <Box className={classes.mainBox}>
          <Paper eleivation={2} className="EditContentBox">
            <Box className={classes.heading}>
              <Typography variant="h2" color="primary">
                Add Faq's
              </Typography>
            </Box>
            <Box mt={3}>
              <Grid container spacing={3}>
                <Grid item lg={3} md={3} sm={3} xs={12}>
                  <Box>
                    <Typography variant="h5"> Question </Typography>
                  </Box>
                </Grid>

                <Grid item lg={9} md={9} sm={9} xs={12}>
                  <TextField
                    onChange={(e) => {
                      setQuestion(e.target.value);
                    }}
                    id="outlined-basic"
                    placeholder="Question "
                    // inputProps={{ min, max }}
                    fullWidth
                    variant="outlined"
                    inputProps={{ maxLength: 260 }}
                    value={question}
                  />
                  {idvalid && question === "" && (
                    <Typography
                      variant="body"
                      style={{
                        color: "#ff7d68",
                        fontSize: "12px",
                      }}
                    >
                      Please enter valid question
                    </Typography>
                  )}
                </Grid>

                <Grid item lg={3} md={3} sm={3} xs={12}>
                  <Typography variant="h5">Answer</Typography>
                </Grid>
                <Grid item lg={9} md={9} sm={9} xs={12}>
                  <JoditEditor
                    ref={editor}
                    value={answer}
                    // config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(e) => setAnswer(e)} // preferred to use only this option to update the content for performance reasons
                    onChange={(e) => setAnswer(e)} // preferred to use only this option to update the content for performance reasons
                    inputProps={{ maxLength: 304 }}
                    style={{ color: "black" }}
                  />
                  {idvalid && answer === "" && (
                    <Typography
                      variant="body"
                      style={{
                        color: "#ff7d68",
                        fontSize: "12px",
                      }}
                    >
                      Please enter valid answer
                    </Typography>
                  )}
                  {answer.length > 300 && (
                    <Typography
                      variant="body"
                      style={{
                        color: "#ff7d68",
                        fontSize: "12px",
                      }}
                    >
                      Please should not exceed 300 characters
                    </Typography>
                  )}
                </Grid>

                {/* <Grid item lg={3} md={3} sm={3} xs={12}>
                  <Typography variant="h5">Link</Typography>
                </Grid>
                <Grid item lg={9} md={9} sm={9} xs={12}>
                  <TextField
                    onChange={(e) => setLinkurl(e.target.value)}
                    id="outlined-basic"
                    placeholder="Url "
                    fullWidth
                    variant="outlined"
                    value={linkurl}
                  />
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={12}>
                  <Typography variant="h5">Image / PDF</Typography>
                </Grid>
                <Grid item lg={9} md={9} sm={9} xs={12}>
                  <TextField
                    variant="outlined"
                    accept="image/*"
                    id="raised-button-file-banner"
                    type="file"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        setImgFile(e.target.files[0]);
                        getBase64(e.target.files[0], (result) => {
                          setImgFileBase(result);
                        });
                      }
                    }}
                  />
                </Grid> */}
              </Grid>
              <Box align="center" pt={4} pb={1}>
                <Button
                  style={{ marginRight: "8px" }}
                  type="submit"
                  disabled={loader}
                  variant="contained"
                  color="primary"
                  onClick={AddfaqHandler}
                >
                  Submit {loader && <ButtonCircularProgress />}
                </Button>
                <Button
                  style={{ marginLeft: "8px" }}
                  variant="contained"
                  color="primary"
                  onClick={() => history.push("/faq-list")}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
};
export default AddFaq;
