import { Box, Container, Grid } from "@material-ui/core";
import React from "react";

export default function NftDetails() {
  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item lg={7} md={7} sm={12} xs={12}>
            <Box></Box>
          </Grid>
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <Box></Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
