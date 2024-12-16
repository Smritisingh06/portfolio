import { Box, Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import Page from "src/component/Page";
export default function NotFound(props) {
  const history = useHistory();
  return (
    <Page title="page not found!">
      <Box pt={20} align="center">
        <img src="images/404.png" className="pagenotfound" alt="" />
        <Box align="center" mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/")}
          >
            Go to Home Page
          </Button>
        </Box>
      </Box>
    </Page>
  );
}
