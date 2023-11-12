import { useEffect, useMemo, useState } from "react";
import { DataAyat, SurahData } from "../../surahtools/dbtype"
import { getAyahById } from "../../surahtools/surahtools";
import { LoadingReact } from "../loadingreact/loadingreact";
import { Box } from "@mui/material";
import {   PlayerListenerContext, PlayerListenerSaver } from "../audioplayer/ayahPlayerListenerSaver";
import { sleep } from "../tools/sleep";
import { AyahListElemChild } from "./ayahListElemChild";


let idWaitingCreator = 0;

export const AyahListElem = (p: {
    surahdata: SurahData | null,
    scrolltoAyat : string | null,
}) => {
    if (p.surahdata == null) {
        return <>EROR</>
    }

    const playerListenerSaver = useMemo(() => new PlayerListenerSaver(), []);

    const [listAyah, setListAyah] = useState<DataAyat[] | null>(null);
    const [maxayahDraw, setMaxAyahDraw] = useState(10);

 

    useEffect(() => {
         
        let ismount = true;
        let waitingId = 0;
        let waitToScroll = async ()=>{
            idWaitingCreator++;
            let myWaitId = idWaitingCreator;
            waitingId = myWaitId;

            while(true){
                if(waitingId != myWaitId){
                    break;
                }

                let pListener = playerListenerSaver.getPlayerListener({
                    a: p.scrolltoAyat!,
                    s : p.surahdata?.id + ""
                })

                if(pListener != null && pListener.onScoll != null){
                    pListener.onScoll(); 

                    break;
                }

                await sleep(200);


            }
        }

        (async () => {
            let listayahIn = await getAyahById(p.surahdata!.id + ""); 
            let listAyahJson = listayahIn.listayat;

            listAyahJson.forEach((v,i)=>{
                playerListenerSaver.setPlayerFun({
                    na : v.VerseID + "",
                    ns : p.surahdata?.id + "",
                    pf : {
                        onLoading : null,
                        onPause : null,
                        onPlay : null,
                        onScoll : null,
                        onBGDark : null,
                    }

                })

            })

            setListAyah(listAyahJson);

            if (listAyahJson.length > 10) {

                let max = maxayahDraw;
                while (max < listAyahJson.length) {
                    await sleep(100) 
                    if (!ismount) { 
                        break;
                    }

                    max = max + 50; 
                    setMaxAyahDraw(max);
                } 

                
            } 

            if(p.scrolltoAyat != null){
                waitToScroll();
            }
        })();

        return () => {
            ismount = false;
            playerListenerSaver.stopAudio();
        }

    }, [])

    if (listAyah == null) {
        return <LoadingReact />
    }

    return (
        <Box> 
            <PlayerListenerContext.Provider value={playerListenerSaver}>
            {
                (() => {
                    let c: JSX.Element[] = [];
                    for (let ayahIndex in listAyah) {

                        if (Number(ayahIndex) > maxayahDraw) {
                            break;
                        }

                        let curAyah = listAyah[ayahIndex];
                        c.push(
                            <AyahListElemChild 
                                key={curAyah.ID + "" + p.surahdata!.id + ""}
                                dataAyah={curAyah} dataSurah={p.surahdata!} />
                        )

                    }

                    return c;

                })()
            } 
            </PlayerListenerContext.Provider>
        </Box>
    )


}