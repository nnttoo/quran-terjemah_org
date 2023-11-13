import { createContext } from "react";
import { QorySelector } from "./qorySelector";
import { LatestPlayMark } from "../bookmarktools/latestplay_mark";
import { AppContext } from "../appContext";

export type PlayerListener = {
    onPlay: (() => void) | null,
    onScoll : (()=>void) | null, 
    onPause : (()=>void) | null,
    onLoading : (()=>void) | null,
    onBGDark :((isdark :boolean)=>void) | null,
}
  
type AyahSurahArg = {
    s : string,
    a : string,
    max : number,
}
export type AudioState = "pause" | "play" | "loading"; 

export class PlayerListenerSaver {
    private playerListener: { [k: string]: PlayerListener } = {} 
    private pSaverAudio : HTMLAudioElement | null = null; 

    stopAudio(){
        
        if(this.pSaverAudio != null){
            this.pSaverAudio.pause();
            this.pSaverAudio = null;
        }

        QorySelector.current.onQoriChange = ()=>{};
    }

    playAudio(p : AyahSurahArg){ 
        
        let playerListener = this.getPlayerListener(p);
        if(playerListener == null) {
            console.log("ERROR playerListener null");
            return;
        }


        let qory = QorySelector.current;
        let src = qory.getQoryUrl({
            na : p.a,
            ns : p.s,
        });

        

        playerListener.onLoading?.();

        this.stopAudio();
        this.pSaverAudio = new Audio(src);        
        this.pSaverAudio.addEventListener("ended", () => {

            playerListener.onPause?.();
            playerListener.onBGDark?.(false);
            
            let numAyah = Number(p.a);
            numAyah++;

            if(numAyah <= p.max){
                this.playAudio({
                    s : p.s,
                    a: numAyah + "",
                    max : p.max,
                })
            } else {
                let ctx = AppContext.current;
                let nextSurah = Number(p.s) + 1;

                if(nextSurah <= 114 && ctx.appConfig.appConfigData.allsurahPlay){
                    ctx.openpage({
                        nomorayat : "1",
                        nomorsurah : nextSurah + "",
                        pagetype : "surah",
                        autoPlay : true,

                    })
                }

                
            }
            
            

        })

        this.pSaverAudio.addEventListener("pause", () => {
            playerListener.onPause?.();
            playerListener.onBGDark?.(false);
        })

        this.pSaverAudio.addEventListener("play", () => {
            playerListener.onPlay?.();
            playerListener.onScoll?.();
            playerListener.onBGDark?.(true);

           
        })

        QorySelector.current.onQoriChange = ()=>{
            this.playAudio(p);
        }

        this.pSaverAudio.play();

    }

    getPlayerListener(p: AyahSurahArg) {
        return this.playerListener[p.s + "_" + p.a];
    }

    setPlayerFun(p: {
        na: string,
        ns: string,
        pf: PlayerListener
    }) { 
        
        this.playerListener[p.ns + "_" + p.na] = p.pf;

    } 
}

export const PlayerListenerContext = createContext<PlayerListenerSaver | null>(null);
 