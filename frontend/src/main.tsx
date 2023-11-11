import React, { useEffect, useState } from 'react'
import {createRoot} from 'react-dom/client'
import './style.css'   

import * as Wails from "../wailsjs/go/main/App"
import * as WailsRuntime from "../wailsjs/runtime/runtime"
import { getAllSurah, getAyahById } from './surahtools/surahtools' 
import { AppContext } from './srcBrowser/appContext'
import { QuranApp } from './srcBrowser/quranApp'

const container = document.getElementById('qroot')

const root = createRoot(container!)

window.console.log = (data)=>{ 
    
    if(typeof data == "object"){
        data = JSON.stringify(data, null, 3);
    } 

    WailsRuntime.LogPrint("web : " + data);


}

 

let ctx  = AppContext.current = new AppContext();

root.render(
    <React.StrictMode>
        <QuranApp ></QuranApp>
    </React.StrictMode>
)
