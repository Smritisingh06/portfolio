import { UserContext } from "src/context/User";
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import axios from "axios";
import apiConfig from "src/ApiConfig/ApiConfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  mainBox: {
    paddingTop: "10rem",
    paddingBottom: "100px",
  },
}));
export default function RequestMessage() {
  const classes = useStyles();
  const user = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [formData, setFormData] = useState({
    message: "",
  });

  const requestUnblockRequest = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "PUT",
        url: apiConfig.requestForUnblock,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        params: {
          _id: user?.walletuserId,
          message: formData,
        },
      });
      if (res.data.statusCode === 200) {
        toast.success("Unblock request sent successfully");
        setIsLoading(false);
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <Box className={classes.mainBox}>
      <Container maxWidth="sm">
        <Grid>
          <Grid lg={12} md={12} sm={12} xs={12}>
            <Typography variant="h3" style={{ paddingBottom: "1rem" }}>
              Send Request Message For Unblock
            </Typography>

            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              variant="outlined"
              rowsMax={4}
              inputProps={{ maxLength: 400 }}
              name="message"
              fullWidth
              type="text"
              placeholder="Type your message here"
              className={classes.textfield}
              onChange={(e) => setFormData(e.target.value)}
            />
            <Box className={classes.information} mt={2}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                type="submit"
                onClick={requestUnblockRequest}
              >
                Send a Request
                {isLoading && <ButtonCircularProgress />}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
