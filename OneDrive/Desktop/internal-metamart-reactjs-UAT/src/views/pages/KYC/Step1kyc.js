import {
  Box,
  Grid,
  makeStyles,
  FormControl,
  TextField,
  Typography,
  Button,
  FormHelperText,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import axios from "axios";
import { Autocomplete } from "@material-ui/lab";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  Step1KycContainer: {
    "& p": {
      "& span": {
        color: "#EB5A2C",
      },
    },

    "& .MuiPaper-root": {
      backgroundColor: "#0b0a0a !important",
    },
  },
  FormInputField: {
    "& .MuiSelect-selectMenu": {
      padding: "15px",
    },
  },
  outlineborder1: {
    "& .MuiSelect-icon": {
      color: theme.palette.primary.main,
    },
    "& .react-tel-input .form-control": {
      width: "100%",
      backgroundColor: "transparent",
      color: "#6D6D6D",
      border: "1px solid #9494940f",
      marginTop: "5px 0px",
      // borderTop: " none",
      // borderLeft: "none",
      // borderRight: "none",
      height: "46px",
      background: "rgb(67 67 67 / 17%) !important",
      borderRadius: "5px",
    },
    "& .react-tel-input .country-list .country": {
      padding: "7px 9px",
      textAlign: "left",
      backgroundColor: "#fff",
      color: "#000",
      "&:hover": {
        backgroundColor: "#d9ebf4",
      },
    },
    // "& .react-tel-input .selected-flag": {
    //   backgroundColor: "#202020",
    // },
    "& .react-tel-input .selected-flag .arrow": {
      left: "20px",
    },
    "& .react-tel-input .country-list .country.highlight": {
      backgroundColor: "#f1f1f1",
    },
    "& .react-tel-input .selected-flag": {
      "&:hover": {
        backgroundColor: "none",
      },
    },
    "& .react-tel-input .flag-dropdown ": {
      backgroundColor: "transparent",
      borderRight: "1px solid #949494",
      border: "none",
      height: "25px",
      position: "absolute",
      top: "5px",
      marginTop: "5px",
    },
    "& .react-tel-input .flag-dropdown.open .selected-flag": {
      backgroundColor: "#f1f1f1",
    },
  },
  outlineborderError: {
    "& .MuiSelect-icon": {
      color: theme.palette.primary.main,
    },
    "& .react-tel-input .form-control": {
      width: "100%",
      backgroundColor: "transparent",
      color: "#6D6D6D",
      border: "1px solid #f44336",
      marginTop: "5px 0px",
      // borderTop: " none",
      // borderLeft: "none",
      // borderRight: "none",
      height: "46px",
      background: "rgb(67 67 67 / 17%) !important",
      borderRadius: "5px",
    },
    "& .react-tel-input .country-list .country": {
      padding: "7px 9px",
      textAlign: "left",
      backgroundColor: "#fff",
      color: "#000",
      "&:hover": {
        backgroundColor: "#d9ebf4",
      },
    },
    // "& .react-tel-input .selected-flag": {
    //   backgroundColor: "#202020",
    // },
    "& .react-tel-input .selected-flag .arrow": {
      left: "20px",
    },
    "& .react-tel-input .country-list .country.highlight": {
      backgroundColor: "#f1f1f1",
    },
    "& .react-tel-input .selected-flag": {
      "&:hover": {
        backgroundColor: "none",
      },
    },
    "& .react-tel-input .flag-dropdown ": {
      backgroundColor: "transparent",
      borderRight: "1px solid #949494",
      border: "none",
      height: "25px",
      position: "absolute",
      top: "5px",
      marginTop: "5px",
    },
    "& .react-tel-input .flag-dropdown.open .selected-flag": {
      backgroundColor: "#f1f1f1",
    },
  },
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
}));
export default function Step1Kyc({
  settimeData,
  setTabView,
  setProgressData,
  setHeadingData,
  _onInputChange,
  formValue,
  isSubmit,
  setGender,
  gender,
  setCountrydata,
  setStateList,
  countrydata,
  handleFormSubmit,
  setFieldValue,
  mobileNumber,
  setFormValue,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("/json/countries.json").then(function (response) {
      setCountries(response.data.countries);
      axios.get("/json/states.json").then(function (response) {
        // setStates(response.data.states);
        axios.get("/json/cities.json").then(function (response) {
          // setCities(response.data.cities);
        });
      });
    });
  }, []);

  const changeCountry = (name) => {
    // const name = e.target.value;
    changeCountryList(name);
  };
  const changeCountryList = (name) => {
    const selectted = countries?.filter((cont) => {
      return cont.name.toLowerCase() === name.toLowerCase();
    });
    const contId = selectted[0]?.id;
    setCountrydata({ name, id: contId });
  };

  return (
    <Box className={classes.Step1KycContainer}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            First Name <span>*</span>
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Enter your first name"
            fullWidth
            name="firstname"
            inputProps={{ maxLength: 61 }}
            value={formValue.firstname}
            onChange={(e) => _onInputChange(e)}
            error={
              (isSubmit && formValue.firstname === "") ||
              formValue.firstname.length > 60
            }
            helperText={
              isSubmit &&
              formValue.firstname === "" &&
              "Please enter firstname."
            }
          />
          {formValue.firstname.length > 60 && (
            <FormHelperText error>
              Please should not exceed 60 characters.
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            Last Name <span>*</span>
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Enter your last name"
            fullWidth
            name="lastName"
            inputProps={{ maxLength: 61 }}
            value={formValue.lastName}
            onChange={(e) => _onInputChange(e)}
            error={
              (isSubmit && formValue.lastName === "") ||
              formValue.lastName.length > 60
            }
            helperText={
              isSubmit && formValue.lastName === "" && "Please enter lastname."
            }
          />
          {formValue.lastName.length > 60 && (
            <FormHelperText error>
              Please should not exceed 60 characters.
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            Mobile Number <span>*</span>
          </Typography>
          <FormControl
            fullWidth
            variant="filled"
            className={
              isSubmit && mobileNumber === ""
                ? classes.outlineborderError
                : classes.outlineborder1
            }
          >
            <PhoneInput
              type="number"
              country={"gb"}
              name="mobileNumber"
              inputProps={{ maxLength: 20 }}
              // disabled={isLoading}
              value={mobileNumber}
              onChange={(phone, e) => {
                // setCountryCode(e.dialCode);
                setFieldValue(`+${phone}`);
                changeCountryList(e.name);
              }}
              helperText={
                isSubmit &&
                mobileNumber !== "" &&
                "please enter your mobile number."
              }
              placeholder="Please enter phone number"
            />
            {isSubmit && mobileNumber === "" && (
              <p
                style={{
                  color: "#f44336",
                  marginTop: "4px",
                  fontSize: "12px",
                }}
              >
                Please enter your mobile number.
              </p>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            Email <span>*</span>
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Enter your email address"
            fullWidth
            name="email"
            inputProps={{ maxLength: 257 }}
            value={formValue.email}
            onChange={(e) => _onInputChange(e)}
            error={
              (isSubmit && formValue.email === "") ||
              formValue.email.length > 256
            }
            helperText={
              isSubmit && formValue.email === "" && "Please enter email."
            }
          />
          {formValue.email.length > 256 && (
            <FormHelperText error>
              Please should not exceed 256 characters.
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            Gender <span>*</span>
          </Typography>
          <FormControl
            fullWidth
            variant="outlined"
            className={classes.outlineborder1}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="gender"
              value={formValue.gender}
              onChange={(e) => _onInputChange(e)}
              error={isSubmit && formValue.gender === ""}
              helperText={
                isSubmit && formValue.gender === "" && "Please enter gender."
              }
              // value={gender}
              // onChange={(e) => setGender(e.target.value)}
              // name="gender"
              // error={isSubmit && formValue.gender === ""}
              // helperText={
              //   isSubmit && gender === "" && "Please enter gender"
              // }
            >
              <MenuItem value={0} disabled>
                Gender
              </MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>

            <FormHelperText error>
              {isSubmit && formValue.gender === "" && "Please enter gender."}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            Date of Birth <span>*</span>
          </Typography>
          <FormControl
            fullWidth
            variant="outlined"
            className={classes.outlineborder1}
          >
            <KeyboardDatePicker
              inputVariant="outlined"
              format="DD/MM/YYYY"
              disableFuture
              fullWidth
              name="dob"
              value={formValue.dob}
              onChange={(e) => {
                const temp = { ...formValue, ["dob"]: e };
                setFormValue(temp);
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              InputProps={{
                readOnly: true,
              }}
              maxDate={moment().subtract(18, "Year")}
            />

            {/* <FormHelperText error>
              {isSubmit && formValue.gender === "" && "Please enter gender."}
            </FormHelperText> */}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6">Address</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            Select Country <span>*</span>
          </Typography>
          <FormControl
            variant="outlined"
            className={classes.outlineborder1}
            fullWidth
            error={isSubmit && countrydata.name === ""}
            helperText={
              isSubmit && countrydata.name === "" && "Please select country."
            }
          >
            <Autocomplete
              id="combo-box-demo"
              // style={{ width: 300 }}
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              classes={{
                option: classes.option,
              }}
              getOptionSelected={(option, value) => value?.name == option?.name}
              // // getOptionSelected={(option, value) => {
              // //   console.log(value, "options ------ values ", option);
              // // }}
              getOptionLabel={(option) => option?.name}
              options={countries && countries}
              // loading={auth.loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  // label="Select country"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                  error={isSubmit && countrydata.name === ""}
                  helperText={
                    isSubmit &&
                    countrydata.name === "" &&
                    "Please select country."
                  }
                />
              )}
              onChange={(e, data) => {
                if (data?.name) {
                  changeCountry(data?.name);
                } else {
                  changeCountry("");
                }
              }}
            />
            {/* <FormHelperText error>
              {isSubmit && countrydata.name === "" && "Please select country."}
            </FormHelperText> */}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            State <span>*</span>
          </Typography>

          <TextField
            variant="outlined"
            placeholder="Enter your state"
            fullWidth
            inputProps={{ maxLength: 101 }}
            name="state"
            value={formValue.state}
            onChange={(e) => _onInputChange(e)}
            error={isSubmit && formValue.state === ""}
            helperText={
              isSubmit && formValue.state === "" && "Please enter state."
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            City <span>*</span>
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Enter your city"
            fullWidth
            inputProps={{ maxLength: 101 }}
            name="city"
            value={formValue.city}
            onChange={(e) => _onInputChange(e)}
            error={isSubmit && formValue.city === ""}
            helperText={
              isSubmit && formValue.city === "" && "Please enter city."
            }
          />
          {formValue.city.length > 100 && (
            <FormHelperText error>
              Please should not exceed 500 characters.
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            Full Address <span>*</span>
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Enter your address"
            fullWidth
            name="fullAddress"
            inputProps={{ maxLength: 501 }}
            value={formValue.fullAddress}
            onChange={(e) => _onInputChange(e)}
            error={isSubmit && formValue.fullAddress === ""}
            helperText={
              isSubmit &&
              formValue.fullAddress === "" &&
              "Please enter fulladdress."
            }
          />
          {formValue.fullAddress.length > 500 && (
            <FormHelperText error>
              Please should not exceed 500 characters.
            </FormHelperText>
          )}
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Box>
            <Typography variant="body1">
              IBI Name <span>*</span>
            </Typography>
            <TextField
              placeholder="Enter IBI Name"
              type="name"
              variant="outlined"
              name="IBIName"
              fullWidth
              inputProps={{ maxLength: 35 }}
              value={formValue.IBIName}
              onChange={(e) => _onInputChange(e)}
              error={isSubmit && formValue.IBIName === ""}
              helperText={
                isSubmit && formValue.IBIName === "" && "Please enter IBI Name."
              }
            />
          </Box>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Box>
            <Typography variant="body1">
              IBI ID <span>*</span>
            </Typography>
            <TextField
              placeholder="Enter IBI ID"
              variant="outlined"
              name="IBIID"
              type="number"
              fullWidth
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 16);
              }}
              onKeyPress={(event) => {
                if (event?.key === "-" || event?.key === "+") {
                  event.preventDefault();
                }
              }}
              className="webkitcss"
              value={formValue.IBIID}
              onChange={(e) => _onInputChange(e)}
              error={isSubmit && formValue.IBIID === ""}
              helperText={
                isSubmit && formValue.IBIID === "" && "Please enter IBI ID."
              }
            />
          </Box>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Box>
            <Typography variant="body1">
              Source of income <span>*</span>
            </Typography>
            <TextField
              placeholder="Enter Source of income"
              type="name"
              variant="outlined"
              name="SourceofIncome"
              fullWidth
              inputProps={{ maxLength: 35 }}
              value={formValue.SourceofIncome}
              onChange={(e) => _onInputChange(e)}
              error={isSubmit && formValue.SourceofIncome === ""}
              helperText={
                isSubmit &&
                formValue.SourceofIncome === "" &&
                "Please enter source of income."
              }
            />
          </Box>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Box>
            <Typography variant="body1">
              Occupation <span>*</span>
            </Typography>
            <TextField
              placeholder="Enter Occupation"
              type="name"
              variant="outlined"
              name="Occupation"
              fullWidth
              inputProps={{ maxLength: 35 }}
              value={formValue.Occupation}
              onChange={(e) => _onInputChange(e)}
              error={isSubmit && formValue.Occupation === ""}
              helperText={
                isSubmit &&
                formValue.Occupation === "" &&
                "Please enter occupation."
              }
            />
          </Box>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleFormSubmit()}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
