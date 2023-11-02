"use client";

import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  Shadows,
} from "@mui/material/styles";
import { PropsWithChildren, useMemo } from "react";
import { Mulish } from "next/font/google";

const mulishScript = Mulish({
  subsets: ["cyrillic-ext", "latin-ext"],
  weight: ["300", "400", "600"],
});

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
            fontFamily: mulishScript.style.fontFamily,
          },
          h2: {
            fontFamily: mulishScript.style.fontFamily,
          },
          h3: {
            fontFamily: mulishScript.style.fontFamily,
          },
          h4: {
            fontFamily: mulishScript.style.fontFamily,
          },
          h5: {
            fontFamily: mulishScript.style.fontFamily,
          },
          h6: {
            fontFamily: mulishScript.style.fontFamily,
          },
          subtitle1: {
            fontFamily: mulishScript.style.fontFamily,
          },
          subtitle2: {
            fontFamily: mulishScript.style.fontFamily,
          },
          body1: {
            fontFamily: mulishScript.style.fontFamily,
          },
          body2: {
            fontFamily: mulishScript.style.fontFamily,
          },
          button: {
            fontFamily: mulishScript.style.fontFamily,
            textTransform: "none",
          },
          caption: {
            fontFamily: mulishScript.style.fontFamily,
          },
          overline: {
            fontFamily: mulishScript.style.fontFamily,
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
