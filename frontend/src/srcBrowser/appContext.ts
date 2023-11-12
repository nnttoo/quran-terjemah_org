import React from "react";  
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
    static current : AppContext
}