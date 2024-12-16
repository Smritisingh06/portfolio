import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useContext } from "react";
import SettingsContext from "src/context/SettingsContext";

export default function DataNotFound2({ img }) {
  const themeSeeting = useContext(SettingsContext);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        marginTop: "20px",
        textAlign: "center",
      }}
    >
      <img
        src={
          img
            ? img
            : themeSeeting.settings.theme === "DARK"
            ? "./images/dataNotFound1.png"
            : "./images/dataNotFound.png"
        }
        alt="Data Not Found"
        style={{
          width: "min(100% - 31px , 189px)",
          height: "min(100% - 30px,70px)",
        }}
      />
      <Typography color="primary" variant="body2">
        No data found
      </Typography>
    </Box>
  );
}
