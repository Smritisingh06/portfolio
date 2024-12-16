import _ from "lodash";
import { colors, createTheme, responsiveFontSizes } from "@material-ui/core";

import typography from "./typography";

const baseOptions = {
  direction: "ltr",
  typography,
  overrides: {
    MuiTable: {
      root: {
        borderSpacing: "0px 13px",
        borderCollapse: "separate",
      },
    },
    MuiInputAdornment: {
      positionStart: {
        paddingLeft: "14px",
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: "none",
      },
    },
    MuiFormHelperText: {
      contained: {
        marginLeft: "0px !important",
        // color: "rgb(255, 125, 104) !important",
      },
    },
    MuiPickersCalendarHeader: {
      iconButton: {
        backgroundColor: "transparent",
      },
    },
    MuiPickerDTToolbar: { toolbar: { borderRadius: "8px 8px 0px 0px" } },

    MuiButton: {
      root: {
        "&.Mui-disabled": {
          color: "rgb(112, 107, 107)",
        },
      },
      contained: {
        fontSize: "14px",
        fontWeight: "300",
        borderRadius: "5px",
        whiteSpace: "pre",
        padding: "10px 20px",
      },
      outlined: {
        fontSize: "14px",
        fontWeight: "300",
        borderRadius: "50px",
        whiteSpace: "pre",
        padding: "10px 20px",
      },
      outlinedSizeLarge: {
        padding: "7px 35px",
      },
      containedSizeLarge: {},
    },
  },
};

const themesOptions = [
  {
    name: "LIGHT",
    overrides: {
      MuiMenu: {
        list: {
          outline: "0",
          background: "#ffffff",
        },
      },
      MuiDialog: {
        // paper: {
        //   margin: "32px",
        //   position: "relative",
        //   overflowY: "inherit",
        //   color: "#fff !important",
        //   border: "solid 2px transparent !important",
        //   borderRadius: "10px !important",
        //   backgroundImage:
        //     "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(101deg, #4ddaffc4, #0c2745)",
        //   backgroundOrigin: "border-box",
        //   backgroundClip: "content-box, border-box",
        //   boxShadow: "2px 1000px 1px #FCFDFF inset",
        // },
        paper: {
          margin: "32px",
          position: "relative",
          overflowY: "inherit",
          color: "#fff !important",
          borderRadius: "10px !important",
          borderImageSlice: "1",
          borderImage:
            "linear-gradient(321.29deg, hsl(230.54deg 95.03% 63.21%)  2.01%, hsl(230.54deg 95.03% 63.21%)  30.64%, hsl(230.54deg 95.03% 63.21%)  51.39%, hsl(230.54deg 95.03% 63.21%)  63.7%)",
          borderWidth: "2px",
          borderStyle: "solid",
          "&::after": {},
        },
      },
      MuiDropzoneArea: {
        root: {
          minHeight: "220px",
          borderRadius: "10px !important",
        },
      },
      MuiInputBase: {
        root: {
          color: "#000",
          background: "rgba(0, 0, 0, 0.04)",
          borderRadius: "50px",
          // height: "50px !important",
        },
      },
      MuiTableCell: {
        head: {
          color: "#000",
          fontWeight: "300",
        },
        stickyHeader: {
          top: "0",
          left: "0",
          zIndex: "2",
          position: "relative",
          backgroundColor: "rgba(0, 0, 0, 0.04)",
          boxShadow: "rgb(99 99 85 / 38%) 0px 0px 3px 0px",
        },
        body: {
          backgroundColor: "rgba(0, 0, 0, 0.04)",

          boxShadow: "rgb(99 99 85 / 38%) 0px 0px 3px 0px",
        },
      },
      MuiButton: {
        containedPrimary: {
          color: "#fff",
          filter: "drop-shadow(0px 13px 27px rgba(0, 0, 0, 0.25))",
          padding: "10px 35px",
          fontSize: "14px",
          background: "#F0B90B",
          fontWeight: "500",
          lineHeight: "21px",
          // marginTop: "10px",
          borderRadius: "50px",
          backgroundColor: "#F0B90B",

          "&:hover": {
            //color: "#000",
            color: "#fff",
            // background: "transparent",
            background: "#F0B90B",
            // boxShadow:
            //   "0 1px 0 0 #fe5aeb, 0 -1px 0 0 #f4a91b, 1px 0 0 0 #fe5aeb, -1px 0 0 0 rgb(254 90 235), 1px -1px 0 0 #f4a91b, -1px 1px 0 0 rgb(254 90 235), 1px 1px 0 0 rgb(254 90 235), -1px -1px 0 0 rgb(244 168 26)",
            // backgroundColor: "transparent",
            backgroundColor: "#F0B90B",
          },
        },
        containedSecondary: {
          backgroundColor: "rgba(0, 0, 0, 0.03);",
          padding: "8px 27px",
          filter: "drop-shadow(0px 13px 27px rgba(0, 0, 0, 0.25))",
          fontSize: "14px",
          fontWeight: "500",
          lineHeight: "21px",
          color: "#000000",
          borderRadius: "50px",
          border: "2px solid ",
          borderColor: "rgba(0, 0, 0, 0.03);",
          "@media (max-width: 599px)": {
            fontSize: "13px",
            padding: "4px 17px",
          },
          "&:hover": {
            color: "#000",
            background: "transparent",
            boxShadow:
              "0 1px 0 0 #fe5aeb, 0 -1px 0 0 #f4a91b, 1px 0 0 0 #fe5aeb, -1px 0 0 0 rgb(254 90 235), 1px -1px 0 0 #f4a91b, -1px 1px 0 0 rgb(254 90 235), 1px 1px 0 0 rgb(254 90 235), -1px -1px 0 0 rgb(244 168 26)",
            backgroundColor: "transparent",
          },
        },
        contained: {
          "&.Mui-disabled": {
            backgroundColor: "rgba(0, 0, 0, 0.03) ",
          },
        },
        outlinedPrimary: {
          color: "#000",
          border: "1px solid #000 !important",
          "&:hover": {
            color: "#fff",
            boxShadow: "none !important",
            backgroundColor:
              "hsl(230.54deg 95.03% 63.21%)",
            // backgroundColor: "#51ACED !important",
            // border: "1px solid #51ACED !important",
          },
        },
      },
      MuiPickersCalendarHeader: {
        dayLabel: { color: "#000" },
      },
      MuiPickersClockNumber: { clockNumber: { color: "#000" } },
      MuiPickersDay: {
        day: {
          color: "#000",
        },
      },
      MuiPaginationItem: {
        root: {
          color: "#000",
        },
      },
      MuiPaginationItem: {
        root: {
          color: "#000",
        },
      },
      MuiPaper: {
        // root: { backgroundColor: "rgba(255, 255, 255, 0.03)" },
        // root: { backgroundColor: "rgba(255, 255, 255, 0.03)" },
        elevation2: {
          padding: "15px",
          // backgroundColor: "#171717",
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "none",
        },
      },
      MuiIconButton: {
        root: {
          color: "#000000",
        },
      },

      MuiOutlinedInput: {
        inputMultiline: {
          padding: "1px !important",
        },
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
            boxShadow: "none",
          },
        },
        notchedOutline: {
          background: "rgba(0, 0, 0, 0.07)",
          borderColor: "rgb(230 226 230)",
        },
        input: {
          borderRadius: "10px",
          color: "#000",
          padding: "16px 14px",
          "&:-webkit-autofill": {
            "-webkit-background-clip": "text !important",
            // transitionDelay: "9999s",
            "caret-color": "transparent",
            "-webkit-box-shadow": "0 0 0 100px transparent inset",
            "-webkit-text-fill-color": "#000",
          },
          "&:-internal-autofill-selected": {
            color: "#fff",
          },
        },
      },
    },
    typography: {
      // fontFamily: "'K2D', sans-serif"
    },
    palette: {
      background: {
        sellercard: "#fff",
        default: "#cccccc",
        blur: "rgba(0, 0, 0, 0.03);",
        card: "#F7F7F7",
        form: "rgba(0, 0, 0, 0.03)",
        black: "#ffffff",
        profileBtn: "#fff",
        tab: "#000000",
        faqBox: "rgb(239 238 238)",
        nftBox: "#fef7fa",
      },
      primary: {
        main: "#000000", //black
      },
      secondary: {
        main: "#000000", //black
        icons: "#009900", //white
      },
      text: {
        primary: "#000", //black
        secondary: "#000", //white
        gray: "rgb(0 0 0 / 83%)",
        graydark: "rgba(13, 13, 13, 0.3)",
      },
    },
  },
  {
    name: "DARK",
    overrides: {
      MuiMenu: {
        list: {
          outline: "0",
          background: "#191919",
        },
      },
      MuiDropzoneArea: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.03) !important",
          border: "2px dashed rgba(255, 255, 255, 0.3)",
          borderColor: "rgba(255, 255, 255, 0.3)",
          minHeight: "220px",
          zIndex: "9",
          borderRadius: "10px !important",
        },
      },
      MuiDialog: {
        paper: {
          margin: "32px",
          position: "relative",
          overflowY: "inherit",
          color: "#fff !important",
          borderRadius: "10px !important",
          borderImageSlice: "1",
          borderImage:
            "linear-gradient(321.29deg, hsl(230.54deg 95.03% 63.21%)  2.01%, hsl(230.54deg 95.03% 63.21%)  30.64%, hsl(230.54deg 95.03% 63.21%)  51.39%, hsl(230.54deg 95.03% 63.21%)  63.7%)",
          borderWidth: "2px",
          borderStyle: "solid",
          "&::after": {},
        },
      },
      MuiPickersDay: {
        day: {
          color: "#fff",
        },
      },
      MuiPickersCalendarHeader: {
        dayLabel: { color: "#fff" },
      },
      MuiInputBase: {
        root: {
          color: "#FFFFFF",
          background: "rgba(255, 255, 255, 0.03)",
          borderRadius: "50px",
          // height: "50px !important",
        },
      },
      MuiTableCell: {
        head: {
          color: "#ffffff",
          fontWeight: "300",
        },
        stickyHeader: {
          top: "0",
          left: "0",
          zIndex: "2",
          position: "relative",
          backgroundColor: "#141414",
          boxShadow: "rgb(99 99 85 / 38%) 0px 0px 3px 0px",
        },
        body: {
          backgroundColor: "#141414",
          boxShadow: "rgb(99 99 85 / 38%) 0px 0px 3px 0px",
        },
      },
      MuiButton: {
        containedPrimary: {
          color: "#fff",
          filter: "drop-shadow(0px 13px 27px rgba(0, 0, 0, 0.25))",
          padding: "10px 35px",
          fontSize: "14px",
          background:
            "hsl(230.54deg 95.03% 63.21%)",
          fontWeight: "500",
          lineHeight: "21px",

          borderRadius: "50px",
          backgroundColor: "hsl(230.54deg 95.03% 63.21%)",

          "&:hover": {
            color: "#fff",
            background: "transparent",
            boxShadow:
              "0 1px 0 0 hsl(230.54deg 95.03% 63.21%), 0 -1px 0 0 hsl(230.54deg 95.03% 63.21%), 1px 0 0 0 hsl(230.54deg 95.03% 63.21%), -1px 0 0 0 hsl(230.54deg 95.03% 63.21%), 1px -1px 0 0 hsl(230.54deg 95.03% 63.21%), -1px 1px 0 0 hsl(230.54deg 95.03% 63.21%), 1px 1px 0 0 hsl(230.54deg 95.03% 63.21%), -1px -1px 0 0 hsl(230.54deg 95.03% 63.21%)",
            backgroundColor: "transparent",
          },
        },
        containedSecondary: {
          backgroundColor: "hsl(230.54deg 95.03% 63.21%)",
          padding: "8px 27px",
          filter: "drop-shadow(0px 13px 27px rgba(0, 0, 0, 0.25))",
          fontSize: "14px",
          fontWeight: "500",
          lineHeight: "21px",
          color: "#ffffff",
          borderRadius: "50px",
          border: "2px solid ",
          borderColor: "hsl(230.54deg 95.03% 63.21%)",
          "@media (max-width: 599px)": {
            fontSize: "13px",
            padding: "4px 17px",
          },
          "&:hover": {
            color: "#ffffff",
            background: "transparent",
            boxShadow:
              "0 1px 0 0 hsl(230.54deg 95.03% 63.21%), 0 -1px 0 0 hsl(230.54deg 95.03% 63.21%), 1px 0 0 0 hsl(230.54deg 95.03% 63.21%), -1px 0 0 0 hsl(230.54deg 95.03% 63.21%), 1px -1px 0 0 hsl(230.54deg 95.03% 63.21%), -1px 1px 0 0 hsl(230.54deg 95.03% 63.21%), 1px 1px 0 0 hsl(230.54deg 95.03% 63.21%), -1px -1px 0 0 hsl(230.54deg 95.03% 63.21%) ",
            backgroundColor: "transparent",
          },
        },
        contained: {
          "&.Mui-disabled": {
            backgroundColor: "rgba(255, 255, 255, 0.025) ",
            color: "#ffffff45",
          },
        },
        outlinedPrimary: {
          border: "1px solid rgba(255, 255, 255, 0.1) !important",
          "&:hover": {
            color: "#fff",
            boxShadow: "none !important",
            backgroundColor:
              "linear-gradient(180deg, #FDA645 0%, #FF00CD 100%)",
            // border: "2px solid #51ACED !important",
          },
        },
      },
      MuiPaginationItem: {
        root: {
          color: "#ffffff",
        },
      },
      MuiPaper: {
        root: {
          color: "#fff",
          // backgroundColor: "rgba(255, 255, 255, 0.03)",
          backgroundColor: "#000",
          // backgroundColor: "rgba(255, 255, 255, 0.03)",
          // backdropFilter: "blur(40px)",
        },

        elevation2: {
          padding: "15px",
          backgroundColor: "rgba(255, 255, 255, 0.025)",
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "none",
        },
      },
      MuiIconButton: {
        root: {
          color: "#fff",
        },
      },
      MuiOutlinedInput: {
        inputMultiline: {
          padding: "1px !important",
        },
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
            boxShadow: "none",
          },
        },
        notchedOutline: {
          background: "rgba(255, 255, 255, 0.025)",
          borderColor: "rgba(255, 255, 255, 0.025)",
        },
        input: {
          borderRadius: "10px",
          color: "#fff",
          padding: "16px 14px",
          "&:-webkit-autofill": {
            "-webkit-background-clip": "text !important",
            // transitionDelay: "9999s",
            "caret-color": "transparent",
            "-webkit-box-shadow": "0 0 0 100px transparent inset",
            "-webkit-text-fill-color": "#fff",
          },
          "&:-internal-autofill-selected": {
            color: "#fff",
          },
        },
      },
    },
    typography: {
      fontFamily: "'K2D', sans-serif",
    },
    palette: {
      background: {
        sellercard: "#000000",
        default: "#000000",
        blur: "rgba(255, 255, 255, 0.04);",
        card: "rgba(255, 255, 255, 0.03);",
        form: "rgba(255, 255, 255, 0.025)",
        black: "#060505",
        profileBtn: "#130c09",
        tab: "rgba(255, 255, 255, 0.1)",
        faqBox: "#151414",
        nftBox: "#0c0508",
      },
      primary: {
        main: "#ffffff", //black
      },
      secondary: {
        main: "#FFFFFF", //white
        icons: "#FFFFFF", //white
      },
      text: {
        primary: "#FFFFFF", //white
        secondary: "rgba(255, 255, 255, 0.6)", //white
        gray: "rgba(255, 255, 255, 0.6)",
        graydark: "rgba(255, 255, 255, 0.3)",
      },
    },
  },
];

export const createTheme1 = (config = {}) => {
  let themeOptions = themesOptions.find((theme) => theme.name === config.theme);

  if (!themeOptions) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    [themeOptions] = themesOptions;
  }

  let theme = createTheme(
    _.merge({}, baseOptions, themeOptions, { direction: config.direction })
  );

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
