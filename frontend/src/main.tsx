import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

import * as Wails from "../wailsjs/go/main/App"
import * as WailsRuntime from "../wailsjs/runtime/runtime"
import { AppContext } from './srcBrowser/appContext'
import { Box, ThemeProvider, createTheme } from '@mui/material'
import { TopFrame } from './srcBrowser/topframe'
import { HomePage } from './srcBrowser/hompage'


window.console.log = (data) => {
    if (typeof data == "object") {
        data = JSON.stringify(data, null, 3);
    }
    WailsRuntime.LogPrint("web : " + data);
}

 

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

const QuranApp = ()=>{ 

    useEffect(()=>{

        console.log("in inyobain");

        (async ()=>{
            let asV = await fetch("/kukuru/yuuaeheeheuhuuhu.kk");
            let a = await asV.text();
            console.log(a);
        })()

    },[])

    return (
        <ThemeProvider theme={theme}>
            <Box p={1}>
                <TopFrame />
                <HomePage />                 
            </Box>
        </ThemeProvider>
    )
}

let ctx = AppContext.current = new AppContext();

const container = document.getElementById('qroot')
const root = createRoot(container!)
root.render(
    <React.StrictMode>
        <QuranApp/>
    </React.StrictMode>
)
