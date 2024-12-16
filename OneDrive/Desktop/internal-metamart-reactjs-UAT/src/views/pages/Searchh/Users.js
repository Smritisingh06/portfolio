import React from "react";
import { Typography, Box, Grid } from "@material-ui/core";
import CreatorCard from "src/component/CreatorCard";

export default function Users(props) {
  const { searchUserList, userType } = props;

  return (
    <Box pt={5}>
      <Grid container spacing={3}>
        {searchUserList?.map((data, i) => {
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
              <CreatorCard
                userType={userType}
                data={data}
                type="timing"
                index={i}
              />
            </Grid>
          );
        })}
        {searchUserList && searchUserList.length === 0 && (
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
    </Box>
  );
}
