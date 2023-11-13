import { useEffect, useMemo, useState } from "react";
import { DataAyat, SurahData } from "../../surahtools/dbtype"
import { getAyahById } from "../../surahtools/surahtools";
import { LoadingReact } from "../loadingreact/loadingreact";
import { Box } from "@mui/material";
import {   PlayerListenerContext, PlayerListenerSaver } from "../audioplayer/ayahPlayerListenerSaver";
import { sleep } from "../tools/sleep";
import { AyahListElemChild } from "./ayahListElemChild";
import { AppContext } from "../appContext";


let idWaitingCreator = 0;
function getIdWaitingCreator(){
    idWaitingCreator++;
    return idWaitingCreator;
}
let currentWaitAutoplayId = 0;
let currentAutoScrollId = 0;
 

export const AyahListElem = (p: {
    surahdata: SurahData | null,
    scrolltoAyat : string | null,
    autoPlay : boolean,
}) => {
    if (p.surahdata == null) {
        return <>EROR</>
    }

    const playerListenerSaver = useMemo(() => new PlayerListenerSaver(), []);
    const [listAyah, setListAyah] = useState<DataAyat[] | null>(null);
    const [maxayahDraw, setMaxAyahDraw] = useState(10);

 

    useEffect(() => {
         
        let ismount = true;

        let waitToScroll = async ()=>{ 
            let myWaitId = getIdWaitingCreator();
            currentAutoScrollId = myWaitId;
            while(true){
                if(currentAutoScrollId != myWaitId){
                    break;
                }

                if(!ismount){
                    break;
                }

                if(p.surahdata == null){
                    return;
                }

                let surahData = p.surahdata!;
                let jumlahAyat = surahData.jumlah_ayat ?   surahData.jumlah_ayat : 0;


                let pListener = playerListenerSaver.getPlayerListener({
                    a: p.scrolltoAyat!,
                    s : p.surahdata?.id + "",
                    max : jumlahAyat,
                })

                if(pListener != null && pListener.onScoll != null){
                    pListener.onScoll(); 
                    pListener.onBGDark?.(true)

                    break;
                }
                await sleep(200);
            }
        }

        let waitAutoPlay = async ()=>{
            let myWaitid = getIdWaitingCreator();
            currentWaitAutoplayId = myWaitid;
            while(currentWaitAutoplayId == myWaitid){
                if(!ismount){
                    break;
                }

                if(p.surahdata == null){
                    return;
                }

                let surahData = p.surahdata!;
                let jumlahAyat = surahData.jumlah_ayat ?   surahData.jumlah_ayat : 0;

                let pListener = playerListenerSaver.getPlayerListener({
                    a: "1",
                    s : p.surahdata?.id + "",
                    max : jumlahAyat
                })
 
                // kalau plistener tidak null dan onplay tidak null
                // berarti halaman sudah tayang
                if(pListener != null && pListener.onPlay != null){
                    playerListenerSaver.playAudio({
                        a : "1",
                        s : p.surahdata?.id + "",
                        max : jumlahAyat,
                    });

                    break;
                }
                await sleep(200);

            }

        }

        let progresiveSetMaxAyah = async (jsonlength : number)=>{
            let max = maxayahDraw;
            while (max < jsonlength) {
                await sleep(100) 
                if (!ismount) { 
                    break;
                }

                max = max + 50; 
                setMaxAyahDraw(max);
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
                progresiveSetMaxAyah(listAyahJson.length); 
            } 

            if(p.scrolltoAyat != null){
                waitToScroll();
            } else if(p.autoPlay) {
                 waitAutoPlay();
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
                                jumlayAyat={
                                    p.surahdata ? (
                                        p.surahdata.jumlah_ayat ? (
                                            p.surahdata.jumlah_ayat
                                        ) : 0
                                    ) : 0
                                }
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