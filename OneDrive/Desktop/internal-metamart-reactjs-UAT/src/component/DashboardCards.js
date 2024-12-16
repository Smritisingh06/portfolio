import { Box, Typography } from "@material-ui/core";
import React from "react";

const DashboardCards = ({ name, data, bgColor }) => {
  return (
    <Box className={"countBox1"} align="center">
      <Typography variant="h4" color="primary">
        {name}
      </Typography>
      <Box mt={1}>
        <Typography variant="body2" color="primary">
          {data}
        </Typography>
      </Box>
    </Box>
  );
};

export default DashboardCards;
