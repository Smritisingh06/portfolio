import {
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputBase,
  InputAdornment,
  makeStyles,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { KeyboardDatePicker } from "@material-ui/pickers";
import * as XLSX from "xlsx";
import ButtonCircularProgress from "./ButtonCircularProgress";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  mainSection: {
    background: "#383858",
    marginTop: "4rem",
    paddingTop: "5rem",
    paddingBottom: "5rem",

    "& h3": {
      color: "#fff",
      paddingBottom: "1.8rem",
    },
  },
  gridSectio: {
    order: "1",
    "@media(max-width:952px)": {
      order: "3",
    },
  },
  gridSectio1: {
    color: "#000",
    order: "2",
    "@media(max-width:952px)": {
      order: "1",
    },
  },
  gridSectio2: {
    color: "#000",
    order: "3",
    "@media(max-width:952px)": {
      order: "2",
    },
  },
  gridSectio3: {
    color: "#000",
    order: "4",
    "@media(max-width:952px)": {
      order: "4",
    },
  },
  searchSectionCol: {
    // color: "#000",
    "& label": {
      color: theme.palette.primary.main,
    },
  },
  searchSection: {
    "@media(max-width:600px)": {
      marginTop: ".7rem",
    },
  },
  field: {
    height: "40px",
    border: "1px solid #201c1a",
    padding: "10px 10px 10px 6px",
    marginTop: "6px",
    fontSize: "14px",
    borderRadius: "5px",
    // "& :hover": {
    // border: "1px solid #fbfbfb",
    // },
  },
  btnSection: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "end",
    marginTop: "0rem",
    justifyContent: "space-between",
    "@media(max-width:959px)": {
      marginTop: "1.5rem",
    },
    "@media(max-width:599px)": {
      marginTop: "0rem",
    },

    "& button": {
      height: "40px",
    },
  },
  date: {
    marginTop: "6px",
    "& .MuiOutlinedInput-root": {
      height: "40px",
    },
  },
  selectitem: {
    "& .MuiOutlinedInput-input": {
      padding: "13px 14px",
    },
  },
}));

export default function Filter({
  setSearch,
  search,
  fromData,
  setFromData,
  toData,
  setToData,
  userlist,
  type,
  setCommponentcheck,
  componentCheck,
  setStatus,
  status,
  setIsSubmit,
  isSubmit,
  name,
  setIsClear,
  isClear,
  downLoadCSV,
  isLoadingCSV,
  isSubAdmin,
}) {
  console.log("name=====", name);
  const classes = useStyles();
  const history = useHistory();
  // const [isClear, setIsClear] = useState(false);

  const handleClear = () => {
    // reset filter value to empty string
    setSearch("");
    setStatus("na");
    setToData(null);
    setFromData(null);
    setIsClear(true);
    // reset data to original data source
  };
  return (
    <Box style={{ width: "100%" }}>
      <Box className={classes.searchSectionCol}>
        <Grid container spacing={3}>
          {name !== "revenue_list" && (
            <Grid item lg={3} md={3} sm={4} xs={12}>
              <Box className={classes.searchSection}>
                <label>Search</label>
                <InputBase
                  fullWidth
                  type="text"
                  className={classes.field}
                  value={search}
                  placeholder={
                    name === "revenue_list"
                      ? "Search by Trx Hash"
                      : type === "order"
                      ? "Search by wallet address"
                      : "Search by wallet address"
                  }
                  onChange={(e) => {
                    if (e.target.value) {
                      setSearch(e.target.value);
                      setIsClear(false);
                    } else {
                      setSearch(e.target.value);
                      setIsClear(true);
                    }
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <BiSearchAlt2
                        style={{
                          fontSize: "25px",
                          cursor: "pointer",
                          color: "#222",
                        }}
                      />
                    </InputAdornment>
                  }
                />
              </Box>
            </Grid>
          )}

          <Grid item lg={3} md={3} sm={4} xs={12}>
            <label>From</label>

            <KeyboardDatePicker
              className={classes.date}
              style={{ width: "100%", height: "40px" }}
              placeholder="DD/MM/YYYY"
              format="DD/MM/YYYY"
              inputVariant="outlined"
              disableFuture
              name="dateOfBirth"
              value={fromData}
              onChange={(date) => {
                setFromData(date);
                setIsClear(false);
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>

          <Grid item lg={3} md={3} sm={4} xs={12}>
            <label>To</label>
            <KeyboardDatePicker
              className={classes.date}
              style={{ width: "100%", height: "40px" }}
              placeholder="DD/MM/YYYY"
              format="DD/MM/YYYY"
              inputVariant="outlined"
              disableFuture
              name="dateOfBirth"
              value={toData}
              onChange={(date) => {
                setToData(date);
                setIsClear(false);
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
          {name !== "revenue_list" && (
            <Grid item lg={3} md={3} sm={4} xs={12}>
              <label>Status</label>
              <Box className={classes.selectitem} style={{ marginTop: "6px" }}>
                <Select
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setIsClear(false);
                  }}
                  value={status}
                >
                  <MenuItem value="na">Select</MenuItem>
                  {name !== "KYC_lists" && (
                    <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                  )}
                  {name !== "KYC_lists" && (
                    <MenuItem value="BLOCK">BLOCK</MenuItem>
                  )}
                  {name === "KYC_lists" && (
                    <MenuItem value="APPROVED">Approved</MenuItem>
                  )}
                  {name === "KYC_lists" && (
                    <MenuItem value="REJECTED">Rejected</MenuItem>
                  )}
                  {name === "KYC_lists" && (
                    <MenuItem value="PENDING">Pending</MenuItem>
                  )}
                </Select>
                {/* )} */}
              </Box>
            </Grid>
          )}

          <Grid item lg={2} md={2} sm={4} xs={12}>
            <Box className={classes.btnSection}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "6px" }}
                onClick={() => setIsSubmit(!isSubmit)}
              >
                Submit
              </Button>
              {/* &nbsp; &nbsp; &nbsp;
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "6px" }}
                onClick={handleClear}
              >
                Clear
              </Button> */}
            </Box>
          </Grid>
          <Grid item lg={2} md={2} sm={4} xs={12}>
            <Box className={classes.btnSection}>
              {/* <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "6px" }}
                onClick={() => setIsSubmit(!isSubmit)}
              >
                Submit
              </Button>
              &nbsp; &nbsp; &nbsp; */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "6px" }}
                onClick={handleClear}
              >
                Clear
              </Button>
            </Box>
          </Grid>

          {/* {name !== "revenue_list" && ( */}
          <Grid item lg={2} md={2} sm={4} xs={12}>
            <Box className={classes.btnSection}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "6px" }}
                onClick={downLoadCSV}
                disabled={isLoadingCSV}
              >
                Download CSV {isLoadingCSV && <ButtonCircularProgress />}
              </Button>
            </Box>
          </Grid>
          {/* )} */}
          {isSubAdmin && (
            <Grid item lg={2} md={2} sm={4} xs={12}>
              <Box className={classes.btnSection}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: "6px" }}
                  onClick={() =>
                    history.push({ pathname: "/add-subadmin", hash: "add" })
                  }
                >
                  Add Subadmin
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
