import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

import * as Wails from "../wailsjs/go/main/App"
import * as WailsRuntime from "../wailsjs/runtime/runtime"
import { AppContext } from './srcBrowser/appContext'
import { Box, ThemeProvider, createTheme } from '@mui/material'
import { TopFrame } from './srcBrowser/topframe'
import { HomePage } from './srcBrowser/hompage'
import { PopupPengaturan } from './srcBrowser/page_pengaturan/popup_pengaturan'
import { MyAlertDialog } from './srcBrowser/dialog/myalert_dialog'


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

let ctx = AppContext.current = new AppContext();
const QuranApp = ()=>{  

    const [keyreload,setKeyReload] = useState(0);

    ctx.reloadPage = ()=>{
        setKeyReload(keyreload + 1);
    }

    return (
        <ThemeProvider theme={theme} key={keyreload + ""}>
            <Box p={1}>
                <TopFrame />
                <HomePage />                 
            </Box>
            <PopupPengaturan/>
        </ThemeProvider>
    )
}


const container = document.getElementById('qroot')
const root = createRoot(container!)
root.render(
    <React.StrictMode>
        <QuranApp/>
        <MyAlertDialog/>
    </React.StrictMode>
)
