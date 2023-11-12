import React from "react";  
import type { RightMenu } from "./menuelem/rightMenu";  
import { bahasa_id } from "./bahasa/id";
import { bahasa_en } from "./bahasa/en";
export type HomePageInfo = {
    pagetype : "home" | "surah",
    nomorsurah : string,
    nomorayat : string,
    scrollTo? : string,
}

export class AppContext{   

    bahasa = bahasa_en;
    
    openMenu  = (open : boolean)=>{}
    openpage : (pageProp : HomePageInfo)=>void = (q)=>{}; 
    reloadPage = ()=>{
        
    }
    static current : AppContext
}