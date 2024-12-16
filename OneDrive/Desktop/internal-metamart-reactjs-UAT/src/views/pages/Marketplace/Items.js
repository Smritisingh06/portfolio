import React,{useState} from 'react';
import Menu from "@material-ui/core/Menu";
import { Box, Button, Container, Grid, makeStyles, Paper, Typography, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { CategoryButtons } from 'src/constants';
import ExploreCard from 'src/component/ExploreCard';

const useStyles = makeStyles((theme) => ({
  root: {},
  filterBtn: {
    // color: "#fff",
    background: "#FFFFFF",
    border: "2px solid #EEEEEE",
    boxSizing: "border-box",
    // backdropFilter: "blur(42px)",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    fontWeight: "bold",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "20px",
    margin: "5px",
    "& img": {
      marginRight: "5px",
    },
  },
}));
const exploreData = [
    {
        user: "@Alex",
        likes: "152",
        time: "8h : 15m : 25s left",
        stock: "4 in stock",
        text3: "From 1.35 ETH 11/Bid 1.1 w",
        image: "images/Explore/Explore1.png",
        name: "Skyblue Creator",
        price: "0.004 ETH"
    },
    {
        user: "@Alex",
        likes: "152",
        time: "8h : 15m : 25s left",
        stock: "4 in stock",
        text3: "From 1.35 ETH 11/Bid 1.1 w",
        image: "images/Explore/Explore2.png",
        name: "Skyblue Creator",
        price: "0.004 ETH"
    },
    {
        user: "@Alex",
        likes: "152",
        time: "8h : 15m : 25s left",
        stock: "4 in stock",
        text3: "From 1.35 ETH 11/Bid 1.1 w",
        image: "images/Explore/Explore3.png",
        name: "Skyblue Creator",
        price: "0.004 ETH"
    },
    {
        user: "@Alex",
        likes: "152",
        time: "8h : 15m : 25s left",
        stock: "4 in stock",
        text3: "From 1.35 ETH 11/Bid 1.1 w",
        image: "images/Explore/Explore4.png",
        name: "Skyblue Creator",
        price: "0.004 ETH"
    },
    {
        user: "@Alex",
        likes: "152",
        time: "8h : 15m : 25s left",
        stock: "4 in stock",
        text3: "From 1.35 ETH 11/Bid 1.1 w",
        image: "images/Explore/Explore1.png",
        name: "Skyblue Creator",
        price: "0.004 ETH"
    },
    {
        user: "@Alex",
        likes: "152",
        time: "8h : 15m : 25s left",
        stock: "4 in stock",
        text3: "From 1.35 ETH 11/Bid 1.1 w",
        image: "images/Explore/Explore2.png",
        name: "Skyblue Creator",
        price: "0.004 ETH"
    },
    {
        user: "@Alex",
        likes: "152",
        time: "8h : 15m : 25s left",
        stock: "4 in stock",
        text3: "From 1.35 ETH 11/Bid 1.1 w",
        image: "images/Explore/Explore3.png",
        name: "Skyblue Creator",
        price: "0.004 ETH"
    },
    {
        user: "@Alex",
        likes: "152",
        time: "8h : 15m : 25s left",
        stock: "4 in stock",
        text3: "From 1.35 ETH 11/Bid 1.1 w",
        image: "images/Explore/Explore4.png",
        name: "Skyblue Creator",
        price: "0.004 ETH"
    },
]

function Explore() {
    const classes = useStyles()
    const [selectedCollectionIds, setSelectedCollectionIds] = useState();
    const [selectedCategoryNames, setSelectedCategoryNames] = useState();
    const [collectionList, setCollectionList] = useState([]);
    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const [anchorCol, setAnchorCol] = React.useState(null);


    return (
        <>
            <Box className={classes.root}>
                <Container maxWidth="lg">
                    <Box style={{paddingLeft:"5px",paddingRight:"5px"}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                       
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} align="right">
                            <Box className='rightcontent'>
                                <Box className={classes.sectionTitleHead}>
                                    {/* COLLECTION */}
                                    <Button
                                        className={classes.filterBtn}
                                        onClick={(event) => setAnchorCol(event.currentTarget)}
                                        
                                    >
                                        <FilterListIcon />
                                        {selectedCollectionIds
                                            ? selectedCollectionIds.displayName.toString()
                                            : "Recent Added"}
                                    </Button>
                                    <Menu
                                        id='simple-menu'
                                        anchorEl={anchorCol}
                                        keepMounted
                                        open={Boolean(anchorCol)}
                                        onClose={() => setAnchorCol(null)}
                                    >
                                        <MenuItem
                                            onClick={() => {
                                                setAnchorCol(null);
                                                setSelectedCollectionIds();
                                            }}
                                        >
                                            Category
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                setAnchorCol(null);
                                                setSelectedCollectionIds();
                                            }}
                                        >
                                            Category
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                setAnchorCol(null);
                                                setSelectedCollectionIds();
                                            }}
                                        >
                                            Category
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                setAnchorCol(null);
                                                setSelectedCollectionIds();
                                            }}
                                        >
                                            Category
                                        </MenuItem>
                                        {collectionList?.map((data, i) => {
                                            return (
                                                <MenuItem
                                                    onClick={() => {
                                                        setAnchorCol(null);
                                                        setSelectedCollectionIds(data);
                                                    }}
                                                    key={i}
                                                >
                                                    {data.displayName}
                                                </MenuItem>
                                            );
                                        })}
                                    </Menu>

                                    <Button
                                        className={classes.filterBtn}
                                        onClick={(event) => setAnchorEl1(event.currentTarget)}
                                    >
                                        <FilterListIcon />
                                        {selectedCategoryNames
                                            ? selectedCategoryNames.name.toString()
                                            : "Category"}
                                    </Button>
                                    <Menu
                                        id='simple-menu'
                                        anchorEl={anchorEl1}
                                        keepMounted
                                        open={Boolean(anchorEl1)}
                                        onClose={() => setAnchorEl1(null)}
                                    >
                                        <MenuItem
                                            onClick={() => {
                                                setAnchorEl1(null);
                                                setSelectedCategoryNames();
                                            }}
                                        >
                                            Category
                                        </MenuItem>
                                        {CategoryButtons.map((data, i) => {
                                            return (
                                                <MenuItem
                                                    onClick={() => {
                                                        setAnchorEl1(null);
                                                        setSelectedCategoryNames(data);
                                                    }}
                                                    key={i}
                                                >
                                                    {data.name}
                                                </MenuItem>
                                            );
                                        })}
                                    </Menu>
                                    {/* COLLECTION */}
                                    <Button
                                        className={classes.filterBtn}
                                        onClick={(event) => setAnchorCol(event.currentTarget)}
                                        style={{marginRight:"0px"}}
                                    >
                                        <FilterListIcon />
                                        {selectedCollectionIds
                                            ? selectedCollectionIds.displayName.toString()
                                            : "Collection"}
                                    </Button>
                                    <Menu
                                        id='simple-menu'
                                        anchorEl={anchorCol}
                                        keepMounted
                                        open={Boolean(anchorCol)}
                                        onClose={() => setAnchorCol(null)}
                                    >
                                        <MenuItem
                                            onClick={() => {
                                                setAnchorCol(null);
                                                setSelectedCollectionIds();
                                            }}
                                        >
                                            Category
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                setAnchorCol(null);
                                                setSelectedCollectionIds();
                                            }}
                                        >
                                            Category
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                setAnchorCol(null);
                                                setSelectedCollectionIds();
                                            }}
                                        >
                                            Category
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                setAnchorCol(null);
                                                setSelectedCollectionIds();
                                            }}
                                        >
                                            Category
                                        </MenuItem>
                                        {collectionList?.map((data, i) => {
                                            return (
                                                <MenuItem
                                                    onClick={() => {
                                                        setAnchorCol(null);
                                                        setSelectedCollectionIds(data);
                                                    }}
                                                    key={i}
                                                >
                                                    {data.displayName}
                                                </MenuItem>
                                            );
                                        })}
                                    </Menu>
                                </Box>    
                            </Box>
                        </Grid>
                    </Grid>
                    </Box>
                    <Box mt={2}>
                        <Grid container spacing={2}>
                            {
                                exploreData.map((data, i) => {
                                    return (
                                        <Grid item xs={12} sm={6} md={4} lg={3}>
                                            <Box mt={2}>
                                            <ExploreCard type="card" data={data} key={i} />
                                            </Box>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default Explore;