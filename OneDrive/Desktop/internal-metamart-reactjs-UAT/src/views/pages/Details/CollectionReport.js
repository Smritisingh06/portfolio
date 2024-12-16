import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  TextField,
  Typography,
  makeStyles,
  FormHelperText,
} from "@material-ui/core";
import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  customizedButton: {
    top: "0",
    right: "0",
    position: "absolute",
  },
}));

export default function CollectionReport({
  setOpenReport,
  openReport,
  reportId,
}) {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createCollectionReportsHandler = async (id) => {
    if (message !== "") {
      try {
        setIsLoading(true);
        const res = await axios({
          method: "POST",
          url: Apiconfigs.createCollectionReports,
          headers: {
            token: sessionStorage.getItem("token"),
          },
          data: {
            collectionId: id,
            message: message,
          },
        });
        console.log("res=====", res);
        if (res.data.statusCode === 200) {
          toast.success(res.data.responseMessage);
          setIsLoading(false);
          setOpenReport(false);
        } else {
          setIsLoading(false);
          toast.error(res.data.responseMessage);
        }
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      setIsSubmit(true);
    }
  };

  return (
    <Dialog
      fullWidth="sm"
      maxWidth="sm"
      open={openReport}
      onClose={() => setOpenReport(false)}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogActions>
        <IconButton
          onClick={() => setOpenReport(false)}
          className={classes.customizedButton}
        >
          <CloseIcon style={{ color: "#787878" }} />
        </IconButton>
      </DialogActions>
      <DialogContent>
        <Typography variant="h5" color="primary">
          Why are you reporting?
        </Typography>
        <Typography
          variant="body2"
          component="span"
          style={{
            fontSize: "12px",
          }}
          color="primary"
        >
          Describe why you think this item should be removed from marketplace
        </Typography>

        <Box mt={2} className={classes.textfilmessage}>
          <Typography
            variant="body2"
            color="primary"
            style={{ paddingTop: "10px" }}
          >
            Message
          </Typography>
          <TextField
            style={{ marginTop: "5px" }}
            fullWidth
            type="text"
            variant="outlined"
            multiline
            rows={4}
            rowsMax={4}
            inputProps={{
              maxLength: 600,
            }}
            placeholder="Tell us some details"
            className={classes.textfildBorder}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          {isSubmit && message === "" && (
            <FormHelperText error>Please enter message</FormHelperText>
          )}
        </Box>
        <Box
          align="left"
          className="modal_button_div"
          mt={2}
          mb={2}
          display="flex"
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => createCollectionReportsHandler(reportId)}
            className={classes.btnWidth}
            disabled={isLoading}
            mb={2}
          >
            REPORT {isLoading && <ButtonCircularProgress />}
          </Button>{" "}
          &nbsp; &nbsp;
          <Button
            variant="outlined"
            onClick={() => {
              setOpenReport(false);
            }}
            className={classes.btnWidth}
            color="primary"
          >
            CANCEL
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
