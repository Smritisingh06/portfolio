import React from "react";

import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Link
} from "@material-ui/core";
import SelectCollectionCard from "src/component/SelectCollectionCard";
import Button from "@material-ui/core/Button";
import {} from "react-feather";

const walletdetails = [
  {
    img: "images/nft1.jpg",
    name: "Collection_name",
    category: "Gift Card",
  },
  {
    img: "images/nft1.jpg",
    name: "Collection_name",
    category: "Gift Voucher",
  },
  {
    img: "images/nft1.jpg",
    name: "Collection_name",
    category: "Discount Coupons",
  },
];
const walletdetails2 = [
  {
    img: "images/nft1.jpg",
    name: "Collection Cards Collections",
    category: "Gift Card",
  },
  {
    img: "images/nft1.jpg",
    name: "Collection Voucher Collections",
    category: "Gift Voucher",
  },
  {
    img: "images/nft1.jpg",
    name: "Discount Coupons Collections",
    category: "Discount Coupons",
  },
  {
    img: "images/nft1.jpg",
    name: "Non-Profit Collections",
    category: "Non-Profit",
  },
  {
    img: "images/nft1.jpg",
    name: "Collectibles Collection",
    category: "Collectibles",
  },
];

const useStyles = makeStyles((theme) => ({
  NftBreed: {
    background: "#09080d",
    paddingTop: theme.spacing(18),
    paddingBottom: theme.spacing(10),
  },
  innerCollection: {
    position: "absolute",
    width: "calc(100% - 40px)",
    bottom: "0px",
    left: "50%",
    transform: "translateX(-50%)",
    borderRadius: "20px 20px 0 0",
    padding: "20px",
    backgroundColor: "#1ed760",
  },
  sectionTitleHead: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    margin: "10px 0 ",
    padding: "0 0",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  title: {
    borderBottom: "1px solid #eaeaea",
  },
  iconCollection: {
    width: 100,
    height: 100,
    color: "#000",
  },
}));

export default function SelectCollection() {
  
  const classes = useStyles();
 
  return (
    <>
      <Box className={classes.NftBreed}>
        {" "}
        <Box>
         <Container fixed>
            <Grid container spacing={2} className="sectionHeading">
              <Grid item xs={12}>
                <Box>
                  <Typography variant="h2" className="text-black">
                  My Collection
                  </Typography>
                 
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        {/* featured */}
        <Box mt={5} mb={2}>
          <Container maxWidth="lg">
            <Grid container spacing={2} className="counterSection">
              <Grid item xs={12} sm={12} md={4} lg={3}>
              <Link href="/create-collection">
                <Box className="breedcolumn" style={{maxHeight:'295px',}}>
                <Box className={classes.innerCollection}>
                {/* <VscBrowser className={classes.iconCollection} /> */}
                <Typography variant="body2">Create New Collection</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                 style={{border:'1px solid #fff'}}
                >
                  Create New
                </Button>
                </Box>
                </Box></Link>
              </Grid>
              <Grid item xs={12} sm={12} md={8} lg={9}>
                
              <Grid container spacing={2}>
          
              {walletdetails.map((data, i) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    lg={4}
                    key={i}
                    className="walletSet"
                    
                  >
                    <Link href="/nft-collection">
                      <SelectCollectionCard data={data} index={i} />
                      </Link>
                  </Grid>
                );
              })}
      
            </Grid>
              </Grid>
           </Grid>
          </Container>
        </Box>
        <Box mt={5} mb={5}>
        <Container maxWidth="lg">
        <Grid container >
             <Box  className={classes.sectionTitleHead}>
             <Typography
            variant="h4"
            className="SectionTitle m-b-5"
            
          >
           
           Choose a Collection</Typography>
          
            </Box></Grid>
        <Grid container spacing={2}>
         
        {walletdetails2.map((data, i) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={i}
                    className="walletSet"
                  >
                    <Link href="/nft-collection">
                      <SelectCollectionCard data={data} index={i} />
                      </Link>
                  </Grid>
                );
              })}
              
            </Grid>
            </Container>
        </Box>
      </Box>
    </>
  );
}
