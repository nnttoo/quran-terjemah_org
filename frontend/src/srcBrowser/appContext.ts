import React from "react";  
import type { RightMenu } from "./menuelem/rightMenu";  
import { bahasa_id } from "./bahasa/id";
import { bahasa_en } from "./bahasa/en";
import { AppConfig, JenisBahasa } from "./tools/appconfig";

export type HomePageInfo = {
    pagetype : "home" | "surah",
    nomorsurah : string,
    nomorayat : string,
    scrollTo? : string,
    reqid? : string,
}

export class AppContext{  
    appverion = "1.02";
    appConfig! : AppConfig;
    
    constructor(){
        this.appConfig = new AppConfig();

        let configData = this.appConfig.appConfigData;
       this.changeBahasa(configData.bahasaUi);

    }

    bahasa = bahasa_en;
    changeBahasa(jb : JenisBahasa){
        if(jb == "id"){
            this.bahasa = bahasa_id;
        } else {
            this.bahasa = bahasa_en;
        }
    }
    
    openMenu  = (open : boolean)=>{}
    openpage : (pageProp : HomePageInfo)=>void = (q)=>{}; 
    reloadPage = ()=>{
        
    }


    static current : AppContext
}