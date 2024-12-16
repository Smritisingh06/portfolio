import React, { useState, useEffect, useContext } from "react";

import { makeStyles, Box, Container, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import DataNotFound from "src/component/DataNotFound";
// import axios from "axios";
// import Apiconfig from "src/ApiConfig/ApiConfig";
import { UserContext } from "src/context/User";
import MintNftCard from "src/component/MintNftCard";
import { useWeb3React } from "@web3-react/core";

import ButtonCircularProgress from "src/component/ButtonCircularProgress";
const useStyles = makeStyles((theme) => ({
  tabBtn: {
    "& button": {
      borderRadius: "10px",
      fontWeight: "600",
      fontSize: "14px",
      marginRight: "4px",
      "&.active": {
        color: "#fff",
        boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
        background:
          "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
      },
    },
  },
  banner: {
    padding: "40px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0",
    },
    "& h1": {
      fontFamily: "'ClashDisplay-Medium'",
      "& span": { fontFamily: "'ClashDisplay-Extralight'" },
    },
  },
  minBox: {
    textAlign: "center",
    "& img": {
      width: "100%",
    },
    "& h6": {
      fontSize: "20px",
    },
  },
}));

export default function FaqData({ data, index }) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const { account } = useWeb3React();
  const user = useContext(UserContext);
  // const [galaryData, setGalleryData] = useState([]);

  useEffect(() => {
    if (user.userNFTList) {
      // setGalleryData(user.userNFTList);
      setIsLoading(user?.isLoadingAllNFT);
    }
  }, [user.userNFTList, user?.isLoadingAllNFT, account]);
  // const [normalNFTList, setNormalNFTList] = useState([]);
  // console.log("normalNFTList+++", normalNFTList);
  // const normalNFTListHandler = async (id) => {
  //   try {
  //     const res = await axios.get(Apiconfig.listNFT, {
  //       headers: {
  //         token: window.sessionStorage.getItem("token"),
  //       },
  //     });
  //     if (res.data.statusCode === 200) {
  //       const dataList = res.data.result.filter(
  //         (data) =>
  //           data.isPlace == false &&
  //           // data.collectionId[0]?.isLazyMinting == false &&
  //           data.isResale === false
  //       );
  //       console.log("dataList", dataList);
  //       setNormalNFTList(dataList);
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     console.log("ERROR", error);
  //     setIsLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   normalNFTListHandler();
  // }, []);

  const [resalemint, setResaleMint] = useState();

  useEffect(() => {
    setResaleMint("resalemint");
  });

  return (
    <div>
      <Box className={classes.banner}>
        <Container maxWidth="lg">
          <Typography variant="h2" color="primary">
            My
            <span> Mints</span>
          </Typography>

          <Box mt="5">
            <Grid container spacing={3}>
              {isLoading ? (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <ButtonCircularProgress />
                </Box>
              ) : (
                <>
                  {user.userNFTList &&
                    user.userNFTList?.map((data, i) => {
                      return (
                        <Grid item xs={12} sm={6} md={3} lg={3} key={i}>
                          <MintNftCard
                            data={data}
                            index={i}
                            resalemint={resalemint}
                          />
                        </Grid>
                      );
                    })}
                </>
              )}
              {user.userNFTList && user.userNFTList.length === 0 && (
                <DataNotFound />
              )}
            </Grid>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
