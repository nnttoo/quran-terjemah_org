
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { AppContext, HomePageInfo } from "./appContext";
import { TopFrame } from "./topframe"; 
import { JsonQuranData } from "../surahtools/jsontypeHelper";
import { getAllSurah } from "../surahtools/surahtools";
import { HomePage } from "./hompage";
import { Box, ThemeProvider, createTheme } from "@mui/material";





export const QuranApp = () => {
  const [qstate, setQstate] = useState<HomePageInfo>({
    pagetype: "home",
    nomorayat: "",
    nomorsurah: "",
  })

  let pagetype = qstate.pagetype;
  const theme = createTheme({
    palette: {
      primary: {
        main: '#082d18',
      },
      secondary: {
        main: '#8d61e4',
      },
      info: {
        main: '#b1561d',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box p={1}>
        <TopFrame />

        {
          pagetype == "home" ? (
            <HomePage />
          ) : (
            <></>
          )
        }
      </Box>
    </ThemeProvider>
  )
}

