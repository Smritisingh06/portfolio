import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@material-ui/core";
import React from "react";
import ButtonCircularProgress from "./ButtonCircularProgress";

export default function ConfirmationDialogBox({type,openActive,setOpenActive,deleteLoader,blockUserHandler}) {
    
    console.log("dfsdfsdfsdf",type)
 
    return (
    <Box>
     <Dialog
        open={openActive}
        onClose={()=>setOpenActive(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h5" color="primary">
            {type === "BLOCK" ? "Active" : "Block"} Category?
          </Typography>
        </DialogTitle>
        <DialogContent style={{ marginTop: "-8px" }}>
          <DialogContentText
            id="alert-dialog-description"
            style={{ fontSize: "16px" }}
          >
            <Typography variant="body2" color="primary">
              Are you sure you want to   {type === "BLOCK" ? "Active" : "Block"} this Category ?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ marginTop: "-16px", fontSize: "16px" }}>
          <Button
            onClick={() => blockUserHandler()}
            autoFocus
            variant="contained"
            color="primary"
          >
            Yes{" "}
            {deleteLoader && (
              <ButtonCircularProgress style={{ marginLeft: "5px" }} />
            )}
          </Button>
          <Button
            onClick={() => setOpenActive(false)}
            variant="outlined"
            color="primary"
            size="large"
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
