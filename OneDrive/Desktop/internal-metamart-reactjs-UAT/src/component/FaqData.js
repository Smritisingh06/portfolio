import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Box, makeStyles } from "@material-ui/core";
import { changeExtenstion } from "src/utils";

const useStyles = makeStyles((theme) => ({
  // accordianBoxborder: {
  //   background:
  //     "linear-gradient(279.31deg, #9038FF 5.51%, rgba(144, 56, 255, 0) 11.86%), linear-gradient(100.56deg, #F73889 6.09%, rgba(255, 255, 255, 0) 17.3%), linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03))",
  //   padding: "1px",
  //   borderRadius: "10px",
  // },

  mainContent: {
    "& figure": {
      marginLeft: "0",
    },
    "& a": {
      backgroundColor: "unset !important",
      color: `${theme.palette.text.primary} !important`,
    },
    "& td": {
      backgroundColor: "unset !important",
      color: `${theme.palette.text.primary} !important`,
    },
    "& span, section": {
      backgroundColor: "unset !important",
      color: `${theme.palette.text.primary} !important`,
    },

    "& iframe": {
      width: "100%",
      // overflow: "hidden",
      display: "inherit",
    },
    "& img": {
      maxWidth: "100%",
      height: "auto",
    },

    "& >*": {
      backgroundColor: "unset !important",
      wordBreak: "break-word",
      overflow: "auto",
      color: `${theme.palette.text.primary} !important`,
    },
    "& h4": {
      backgroundColor: "unset !important",
      color: `${theme.palette.text.primary} !important`,
    },
    "& h5": {
      backgroundColor: "unset !important",
      color: `${theme.palette.text.primary} !important`,
    },
    "& h1": {
      backgroundColor: "unset !important",
      color: `${theme.palette.text.primary} !important`,
    },
    "& h2": {
      backgroundColor: "unset !important",
      color: `${theme.palette.text.primary} !important`,
    },
    "& h3": {
      backgroundColor: "unset !important",
      color: `${theme.palette.text.primary} !important`,
    },
    "& span": {
      backgroundColor: "unset !important",
      color: `${theme.palette.text.primary} !important`,
    },
    "& em": {
      backgroundColor: "unset !important",
      color: `${theme.palette.text.primary} !important`,
    },
    "& p": {
      backgroundColor: "unset !important",
      color: `${theme.palette.text.primary} !important`,
      fontSize: "14px !important",
    },
    "& strong": {
      color: `${theme.palette.text.primary} !important`,
    },
  },
  accordianBox: {
    // background:
    //   "linear-gradient(279.31deg, #9038FF 5.51%, rgba(144, 56, 255, 0) 11.86%), linear-gradient(100.56deg, #F73889 6.09%, rgba(255, 255, 255, 0) 17.3%), linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03))",
    // padding: "1px",
    // borderRadius: "10px",
    "& .MuiCollapse-wrapper": {
      display: "flex",
      backgroundColor: theme.palette.background.faqBox,
      borderBottomRightRadius: "10px",
      borderBottomLeftRadius: "10px",
    },
    "& .MuiAccordion-root.Mui-expanded:last-child": {
      background:
        "linear-gradient(279.31deg, #9038FF 5.51%, rgba(144, 56, 255, 0) 11.86%), linear-gradient(100.56deg, #F73889 6.09%, rgba(255, 255, 255, 0) 17.3%), linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03))",
      padding: "1px",
      borderRadius: "10px",
    },
    "& .MuiCollapse-entered": {
      borderRadius: "0px 0px 10px 10px",
      backgroundColor: theme.palette.background.faqBox,
    },
    "& .MuiIconButton-edgeEnd": {
      marginRight: "0",
    },
    "& .MuiAccordionSummary-expandIcon.Mui-expanded": {
      borderColor: "transparent",
      background: "#000",
      backgroundImage:
        "linear-gradient(#FF6F37,  #FF2676  ),linear-gradient(247deg, #FF6F37, #B801AA) !important",
      backgroundOrigin: "border-box",
      backgroundClip: "content-box, border-box",
      boxShadow: "2px 1000px 1px #050706 inset !important",
    },
    "& .MuiIconButton-root": {
      padding: "3px",
      borderRadius: "27% !important",
      border: "1px solid ",
      // borderColor: theme.palette.primary.main,
      // borderColor: "#9038FF",

      "& svg": {
        // color: theme.palette.primary.main,
        color: "#FF2676",
      },
    },
    // "&$expanded": {
    //   "& .MuiIconButton-root": {
    //     padding: "3px",
    //     borderRadius: "27% !important",
    //     border: "1px solid",
    //     borderImageSlice: "1",
    //     borderImageSource:
    //       "linear-gradient(93.34deg, #FF6F37 6.82%, #FF2676 35.9%, #B801AA 68.08%, #7101BC 101.4%)",

    //     "& svg": {
    //       color: theme.palette.primary.main,
    //     },
    //   },
    // },

    "& .MuiPaper-root": {
      backgroundColor: theme.palette.background.faqBox,
      // boxShadow: "none !important",
    },
  },
  accordianimgbox: {
    width: "500px",
    display: "flex",
    margin: "0 auto",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));
const Accordion = withStyles((theme) => ({
  root: {
    borderRadius: "10px",
    "&:not(:last-child)": {
      background: "#FFFFFF",
      padding: "2px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
    },
    "&:not(:first-child)": {
      //   background:
      //   "linear-gradient(279.31deg, #9038FF 5.51%, rgba(144, 56, 255, 0) 11.86%), linear-gradient(100.56deg, #F73889 6.09%, rgba(255, 255, 255, 0) 17.3%), linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03))",
      // padding: "1px",
      // borderRadius: "10px",
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      "&:not(:last-child)": {
        background:
          "linear-gradient(279.31deg, #9038FF 5.51%, rgba(144, 56, 255, 0) 11.86%), linear-gradient(100.56deg, #F73889 6.09%, rgba(255, 255, 255, 0) 17.3%), linear-gradient(0deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03))",
        padding: "1px",
        borderRadius: "10px",
      },
      border: " 1px solid #3d3d3d",
      background:
        "linear-gradient( 152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
      // backdropFilter: "blur(42px)",
      "& .MuiIconButton-edgeEnd": {
        marginRight: "0",
        borderColor: "red !important",
      },
    },
  },
}))(MuiAccordion);

const AccordionSummary = withStyles((theme) => ({
  root: {
    boxSizing: "border-box",
    // background: theme.palette.background.blur,
    backgroundColor: theme.palette.background.faqBox,
    color: theme.palette.primary.main,
    borderRadius: "10px",
    wordBreak: "break-word",
    "&$expanded": {
      borderRadius: "10px 10px 0px 0px",
      minHeight: 50,
      borderBottom: "0",
      // color: '#FFF',
    },
    "@media(max-width:605px)": {
      fontSize: "10px",
      minHeight: 50,
      "&$expanded": {
        minHeight: 40,
        borderBottom: "0",
        // color: '#FFF',
      },
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {
    margin: "0",
  },
}))(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    "& h6": {
      color: "#000",
      paddingBottom: "15px",
    },
    "& p": {
      color: theme.palette.primary.main,
    },
  },
  imgbox: {
    width: "100%",
    height: "190px",
    display: "flex",
    overflow: "hidden",
    borderRadius: "5px 5px 0px 0px",
    flexDirection: "column",
    backgroundSize: "cover !important",
    justifyContent: "space-between",
    backgroundColor: "#ccc !important",
    backgroundRepeat: "no-repeat !important",
    backgroundPosition: "center !important",
  },
}))(MuiAccordionDetails);
export default function FaqData({ data, index }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className={classes.accordianBox}>
      <Accordion
        square
        defaultExpanded={index == 0 ? true : false}
        onChange={handleChange("panel1")}
      >
        <Box className={classes.accordianBoxborder}>
          <AccordionSummary
            aria-controls="panel1d-content"
            expandIcon={
              <ExpandMoreIcon
                style={{
                  fontSize: "23px",
                  fontWeight: "400",
                }}
              />
            }
          >
            <Typography
              variant="h6"
              style={{
                fontSize: "14px",
                paddingRight: "15px",
              }}
            >
              {data?.question}
            </Typography>
          </AccordionSummary>
        </Box>

        <AccordionDetails
          style={{
            display: "flex",
            flexDirection: "column",
            wordBreak: "break-word",
          }}
        >
          <Box variant="body2" style={{ fontSize: "12px" }}>
            <Box className={classes.mainContent}>
              <div dangerouslySetInnerHTML={{ __html: data?.answer }} />
            </Box>

            {data?.url !== "" && (
              <Typography
                variant="h6"
                style={{ wordBreak: "break-all", marginTop: "-2px" }}
              >
                <a
                  href={data?.url}
                  target="_blank"
                  style={{ color: "#3db0f3" }}
                  rel="noopener noreferrer"
                >
                  Click here to know more
                </a>{" "}
              </Typography>
            )}
            {data?.image && (
              <Box className={classes.accordianimgbox}>
                <img
                  src={data?.image ? changeExtenstion(data?.image) : ""}
                  alt="img"
                  width="100%"
                />
              </Box>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
