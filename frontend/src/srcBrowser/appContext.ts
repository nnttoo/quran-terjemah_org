import React from "react"; 
import type { QrnAudioPlayer } from "./audioplayer/qrnAudioplayer";
import type { RightMenu } from "./menuelem/rightMenu";  
export type HomePageInfo = {
    pagetype : "home" | "surah",
    nomorsurah : string,
    nomorayat : string,
    scrollTo? : string,
}

export class AppContext{   
    openMenu  = (open : boolean)=>{}
    openpage : (pageProp : HomePageInfo)=>void = (q)=>{};

    qrnAudioPlayer : QrnAudioPlayer | null = null;
    static current : AppContext
}