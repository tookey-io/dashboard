"use client";

import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  Shadows,
} from "@mui/material/styles";
import { PropsWithChildren, useMemo } from "react";

function ThemeProvider(props: PropsWithChildren<{}>) {
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        shadows: Array(25).fill("none") as Shadows,
        palette: {
          mode: "light",
          primary: {
            main: "#000",
            dark: "#000",
            light: "#e0e4e8",
            contrastText: "#fff",
          },
          secondary: {
            main: "#f50dba",
            contrastText: "#fff",
            dark: "#b0047d",
            light: "#ff9cf3",
          },
        },
        typography: {
          h1: {
            fontFamily: "Mulish",
          },
          h2: {
            fontFamily: "Mulish",
          },
          h3: {
            fontFamily: "Mulish",
          },
          h4: {
            fontFamily: "Mulish",
          },
          h5: {
            fontFamily: "Mulish",
          },
          h6: {
            fontFamily: "Mulish",
          },
          subtitle1: {
            fontFamily: "Mulish",
          },
          subtitle2: {
            fontFamily: "Mulish",
          },
          body1: {
            fontFamily: "Mulish",
          },
          body2: {
            fontFamily: "Mulish",
          },
          button: {
            fontFamily: "Mulish",
            textTransform: "none",
          },
          caption: {
            fontFamily: "Mulish",
          },
          overline: {
            fontFamily: "Mulish",
          },
        },
        shape: {
          borderRadius: 0,
        },
      }),
    []
  );

  return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>;
}

export default ThemeProvider;
