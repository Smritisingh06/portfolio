import {
  Box,
  Container,
  Grid,
  Typography,
  FormControl,
  InputBase,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import CreatorCard from "src/component/CreatorCard";
import axios from "axios";
import { CgSearch } from "react-icons/cg";
import apiConfig from "src/ApiConfig/ApiConfig";
import DataLoading from "src/component/DataLoading";
import DataNotFound from "src/component/DataNotFound";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "30px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  headsection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingBottom: "15px",
  },
  searcBox: {
    "& .MuiInputBase-input": {
      height: "50px !important",
    },
    "& .MuiIconButton-root": {
      background: theme.palette.background.blur,
      marginLeft: "-6px",
      padding: "8px",
    },
  },
}));

const CreatorCrad = () => {
  const classes = useStyles();
  const [createrList, setCreaterList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState();
  const [pages, setpages] = useState(1);
  const [numpages, setNumpages] = useState(1);
  const { searcBox } = useStyles();

  const getCreaterListHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${apiConfig.userList}?page=${pages}`,
        params: {
          search: search ? search : null,
          limit: 12,
        },
      });

      if (res.data.statusCode == 200) {
        setCreaterList(res.data.result.docs);

        setNumpages(res.data.result.pages);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("ERROR", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (setSearch == "") {
      getCreaterListHandler();
    } else {
      getCreaterListHandler();
    }
  }, [search, pages]);

  const pageCheck = pages === 1 ? 12 : 0;

  return (
    <Box className={classes.root}>
      <Container>
        <Box className={classes.headsection} mt={2}>
          <Box>
            <Typography variant="h1" color="primary">
              Creators
            </Typography>
          </Box>
          <Box>
            <FormControl variant="outlined" fullWidth className={searcBox}>
              <InputBase
                placeholder="Search"
                type="search"
                id="outlined-adornment-weight"
                onChange={(e) => setSearch(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton>
                      <CgSearch style={{ fontSize: "25px" }} />
                    </IconButton>
                  </InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
              />
            </FormControl>
          </Box>
        </Box>
        <Box className={classes.root2}>
          <Box mt={2} style={{ paddingLeft: "1rem" }}>
            {isLoading && <DataLoading />}
            {!isLoading && createrList && createrList.length === 0 && (
              <DataNotFound />
            )}
          </Box>
          <Grid container spacing={3}>
            {createrList &&
              createrList.map((data, index, type) => {
                return (
                  <Grid item lg={3} md={3} sm={6} xs={12}>
                    <Box mt={2}>
                      <CreatorCard data={data} type="creator" index={index} />
                    </Box>
                  </Grid>
                );
              })}
          </Grid>
          {createrList && createrList.length >= pageCheck ? (
            <Box
              className={classes.tabBtn}
              pt={5}
              display="flex"
              justifyContent="end"
            >
              <Pagination
                onChange={(e, v) => setpages(v)}
                count={parseInt(numpages)}
                color="secondary"
              />
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default CreatorCrad;
