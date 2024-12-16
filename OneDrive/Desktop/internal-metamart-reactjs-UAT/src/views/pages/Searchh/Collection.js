import React, { useContext, useState } from "react";
import { Typography, Box, makeStyles, Grid, Button } from "@material-ui/core";
import { UserContext } from "src/context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import CollectionCard from "src/component/CollectionCard";

const useStyles = makeStyles((theme) => ({
  loadMore: {
    width: "200px",
    maxWidth: "100%",
  },
}));

export default function Collection(props) {
  const { type, collectionList, orderList, callBackFun } = props;
  const user = useContext(UserContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const classes = useStyles();

  return (
    <Box pt={5}>
      <Grid container spacing={3}>
        {collectionList?.map((data, i) => {
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
              <CollectionCard
                data={data}
                type="collectionCard"
                index={i}
                callBackFun={callBackFun ? callBackFun : null}
              />
            </Grid>
          );
        })}
        {collectionList && collectionList?.length === 0 && (
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
      {collectionList?.length !== 0 && (
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
