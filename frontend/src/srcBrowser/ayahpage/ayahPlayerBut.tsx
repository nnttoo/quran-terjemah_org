import { AutoMode, Pause, PlayArrow } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { AudioState, PlayerListenerContext } from "../audioplayer/ayahPlayerListenerSaver";
import { useContext, useEffect, useRef, useState } from "react";
function scrollToTargetAdjusted(element: HTMLElement | null) {
    if(element == null) return;
    
    const elementRect = element.getBoundingClientRect();  
    let scrollToY =  elementRect.top + window.scrollY;

    // nah supaya ditengah maka dikurangi window.innerHeight / 2
    scrollToY = scrollToY - (window.innerHeight / 2);

    window.scrollTo({
      top: scrollToY,
      behavior: "smooth",
    }); 
}

export const AyahPlayerButton = (p : { 
    nomorSurat : string,
    nomorAyat : string, 

})=>{

    const [playState,setPlayState] = useState<AudioState>("pause");
    const playerListenerSaver = useContext(PlayerListenerContext);
    const refHtml = useRef<HTMLDivElement>(null);

    (()=>{

        if(playerListenerSaver == null) return;
        let playerListener = playerListenerSaver.getPlayerListener({
            a: p.nomorAyat,
            s : p.nomorSurat,
        })
         
        if(playerListener == null){ 
            return;
        }

        playerListener.onLoading = ()=>{ 
            setPlayState("loading");            
        }
        playerListener.onPause = ()=>{ 
            setPlayState("pause")
        }
        playerListener.onPlay = ()=>{ 
            setPlayState("play");
        }

        playerListener.onScoll = ()=>{ 
            scrollToTargetAdjusted(refHtml.current);
        }
    })(); 

    

    return (
        <div ref={refHtml}>
        <Fab  color="info" aria-label="add"
            size="small"
            onClick={() => {

                if ( playState == "play") { 

                    playerListenerSaver?.stopAudio();
                } else {
 
 
                    playerListenerSaver?.playAudio({
                        a: p.nomorAyat,
                        s : p.nomorSurat,
                    })
                }

            }}

        > {
                playState == "play" ? (
                    <Pause />
                ) : playState == "pause" ? (
                    <PlayArrow />
                ) : (
                    <AutoMode />
                )
            }

        </Fab>
        </div>
    )
}