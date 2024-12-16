import React, { useContext } from "react";
import { Box, makeStyles, Avatar, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  mainboxcss: {
    "& .mainbox": {
      margin: "0px 10px",
      cursor: "pointer",

      borderRadius: "10px",
      "& .cardbox": {
        position: "relative",
        display: "flex",
        zIndex: "1",
        justifyContent: "center",
        background: "#ffffff",
        borderRadius: "25px",

        "& .MuiAvatar-root": {
          width: "100%",
          maxWidth: "400px",
          borderRadius: "20px",
          minHeight: "318px",
        },
        "&::before": {
          width: "100%",
          height: "100%",
          content: "''",
          zIndex: "1",
          position: "absolute",
          borderRadius: "20px",

          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.025) 59.45%, rgb(0 0 0 / 73%) 100%)",
        },
      },
      "& img": {
        width: "auto",
        maxWidth: "100%",
      },
      "& .textbox": {
        // position: "absolute",
        bottom: "28px",
        left: "15px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #4DDAFF",
        marginTop: "-18px",
        borderRadius: "0px 0px 20px 20px",
        paddingTop: "10px",
        borderTop: "none",
        "& h6": {
          fontSize: "18px",
          // whiteSpace: "pre",
          fontWeight: "500",
          padding: "20px 0px",
        },
      },
    },
    "& .mainbox1": {
      margin: "0px 10px",

      borderRadius: "20px",
      "& .cardbox": {
        position: "relative",
        display: "flex",
        zIndex: "1",
        justifyContent: "center",

        "& .MuiAvatar-root": {
          width: "100%",
          maxWidth: "400px",
          borderRadius: "20px",
          minHeight: "318px",
        },
        "&::before": {
          width: "100%",
          height: "100%",
          content: "''",
          zIndex: "1",
          position: "absolute",
          borderRadius: "20px",

          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.025) 59.45%, rgb(0 0 0 / 73%) 100%)",
        },
      },
      "& img": {
        width: "auto",
        maxWidth: "100%",
      },
      "& .textbox": {
        // position: "absolute",
        bottom: "8px",
        left: "15px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #4DDAFF",
        marginTop: "-18px",
        paddingTop: "10px",
        borderRadius: "0px 0px 20px 20px",
        borderTop: "none",
        "& h6": {
          fontSize: "18px",
          padding: "20px 0px",
          fontWeight: "500",
          whiteSpace: "nowrap",
          width: "150px",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        "& span": {
          fontSize: "13px",
          color: "#706b6b",
        },
      },
    },
  },
}));
export default function SliderCard({ data }) {
  const classes = useStyles();
  const history = useHistory();

  const titledata =
    data?.categoryTitle.charAt(0).toUpperCase() + data?.categoryTitle.slice(1);

  return (
    <Box className={classes.mainboxcss}>
      <Box
        className={
          data?.categoryTitle === "memberships nft" ||
          data?.categoryTitle === "solar passive income" ||
          data?.categoryTitle === "nft event ticketing"
            ? "mainbox1"
            : "mainbox"
        }
        onClick={() =>
          data?.categoryTitle === "memberships nft" ||
          data?.categoryTitle === "solar passive income" ||
          data?.categoryTitle === "nft event ticketing"
            ? ""
            : history.push({
                pathname: "/category-view",
                state: data,
              })
        }
        disabled
      >
        <Box className="cardbox">
          <Avatar src={data?.categoryIcon} alt="" />
        </Box>
        <Box className="textbox">
          <Typography variant="h6" color="primary">
            {titledata}
          </Typography>
          {data?.categoryTitle === "memberships nft" ||
          data?.categoryTitle === "solar passive income" ||
          data?.categoryTitle === "nft event ticketing" ? (
            <>
              <Typography variant="body">(Coming soon)</Typography>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Box>
  );
}
