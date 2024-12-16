import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  useTheme,
  Box,
  Table,
  TableCell,
  Typography,
  TableHead,
  TableBody,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
} from "@material-ui/core";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { tableData } from "src/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
    border: "1px solid #8f9092",
  },
  table: {
    boxShadow: " rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  profile: {
    display: "flex",
    align: "center",
    justifyContent: "start",
  },
  profileCell: {
    display: "flex",
    alignItems: "center",
    width: "max-content",
    "& h6": {
      marginLeft: "15px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "13px",
      },
    },
  },
  headingText: {
    color: "#000000",
  },
  tablehead: {
    background: "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
  },
  tablebody: {
    backgroundColor: "#FFFFFF",
  },
  profileImg: {
    width: "50px",
    // maxWidth: "50px",
    height: "50px",
    borderRadius: "50%",
    overflow: "hidden",
    margin: "0px",
    background:
      "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    // backdropFilter: " blur(42px)",
    border: "3px solid rgb(143 144 146)",
    background: "rgb(42 123 135)",
    [theme.breakpoints.down("xs")]: {
      width: "30px",
      height: "30px",
    },
    "& img": {
      width: "100%",
    },
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData("Cupcake", 305, 3.7),
  createData("Donut", 452, 25.0),
  createData("Eclair", 262, 16.0),
  createData("Frozen yoghurt", 159, 6.0),
  createData("Gingerbread", 356, 16.0),
  createData("Honeycomb", 408, 3.2),
  createData("Ice cream sandwich", 237, 9.0),
  createData("Jelly Bean", 375, 0.0),
  createData("KitKat", 518, 26.0),
  createData("Lollipop", 392, 0.2),
  createData("Marshmallow", 318, 0),
  createData("Nougat", 360, 19.0),
  createData("Oreo", 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

// const useStyles = makeStyles({
//     table: {
//         minWidth: 500,
//         border:"1px solid #4ea6f5"
//     },
// });

export default function CustomPaginationActionsTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead className={classes.tablehead}>
          <TableRow style={{ height: "60px" }}>
            <TableCell align="left">Collection</TableCell>
            <TableCell align="left">Volume</TableCell>
            <TableCell align="left">24h %</TableCell>
            <TableCell align="left">7d %</TableCell>
            <TableCell align="left">Floor Price</TableCell>
            <TableCell align="left">Owners</TableCell>
            <TableCell align="left">Assets</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tablebody}>
          {tableData.map((data, index) => (
            <TableRow key={data.name}>
              <TableCell>
                <Box className={classes.profileCell}>
                  <Typography variant="body2">
                    {index + 1}.&nbsp;&nbsp;
                  </Typography>
                  <Box className={classes.profileImg}>
                    {" "}
                    <img src={data?.image} alt="user" />
                  </Box>
                  <Typography variant="h6">{data?.name}</Typography>
                </Box>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body2">{data.text1}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body2">{data.text1}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body2">{data.text3}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body2">{data.text4}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body2">{data.text5}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body2">{data.text6}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
