import React,{useState} from "react";
import {
  Input,
  Box,
  FormControl,
  Typography,
  TextField,
  makeStyles,
  InputAdornment,
} from "@material-ui/core";

import Button from "@material-ui/core/Button";

import {} from "react-feather";

const useStyles = makeStyles((theme) => ({
  NftBreed: {
    width: 700,
    maxWidth: "100%",
    padding: "15px",
    "& h5": {
      color: theme.palette.secondary.main,
    },
    "& label": {
      color: "#000000db",
      fontSize: "14px",
    },
  },
  createCollection: {
    "& figure": {
      height: 100,
      width: 100,
      minWidth: 100,
      marginRight: 15,
      borderRadius: "50%",
      background: "#C4C4C4",
    },
    "& button": {
      marginTop: 15,
    },
  },
  textfiledlabel: {
    "& label": {
      color: "#000000db",
      fontSize: "14px",
    },
  },
}));

export default function CollectionCreate() {
  const [share,setShare] = useState(false)
  const classes = useStyles();

  return (
    <>
      
    </>
  );
}
