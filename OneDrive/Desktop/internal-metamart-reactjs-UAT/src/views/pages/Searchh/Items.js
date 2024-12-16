import React, { useContext, useState } from "react";
import { Box, makeStyles, Grid, Button, Typography } from "@material-ui/core";
import { UserContext } from "src/context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import MarketplaceCard from "src/component/MarketplaceCard";
const useStyles = makeStyles((theme) => ({
  sectionTitleHead: {
    display: "flex",
    alignContent: "center",
    margin: "10px 0 ",
    justifyContent: "space-between",
    padding: " 0 10px",
    width: "100%",
    marginBottom: "30px",
    color: "#000000",
  },
  loadMore: {
    width: "200px",
    maxWidth: "100%",
  },
  filterBtn: {
    border: "1px solid #2D2D2D",
    borderRadius: "50px",
    fontWeight: "500",
    fontSize: "15.7099px",
    lineHeight: "24px",
    "& img": {
      marginRight: "5px",
    },
  },
}));

export default function Items(props) {
  const { orderList, callBackFun } = props;
  const user = useContext(UserContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const classes = useStyles();

  return (
    <Box pt={5}>
      <Grid container spacing={3}>
        {orderList?.map((data, i) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={i}
              className="walletSet mb-20"
            >
              <MarketplaceCard
                data={data}
                type="timing"
                index={i}
                callBackFun={callBackFun ? callBackFun : null}
              />
            </Grid>
          );
        })}
        {orderList && orderList?.length === 0 && (
          <Typography
            variant="h4"
            color="primary"
            style={{
              paddingLeft: "14px",
              fontSize: "14px",
              margin: "0 auto 27px",
            }}
          >
            NO ITEMS FOUND FOR THE TERM SEARCH
          </Typography>
        )}
      </Grid>
      {orderList?.length !== 0 && (
        <Box align="center" mb={5}>
          {user?.allListPageNumber < user?.maxPages && (
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className={classes.loadMore}
              onClick={async () => {
                setIsUpdating(true);
                await user.getPlaceOrderList(true);
                setIsUpdating(false);
              }}
            >
              LOAD MORE {isUpdating && <ButtonCircularProgress />}
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
}
