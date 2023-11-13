import React, { useEffect, useState } from "react";
import { AppContext, HomePageInfo } from "./appContext";
import { DaftarSurah } from "./daftarsurah";
import { SurahData } from "../surahtools/dbtype";
import { getAllSurah } from "../surahtools/surahtools";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { DaftarAyahPage } from "./ayahpage/daftarAyah";
import { LoadingReact } from "./loadingreact/loadingreact";

let reqid = 0;
function getReqId(){
    reqid++;
    return reqid;
}


export const HomePage = () => {
    let [pageInfo, setPageInfo] = useState<HomePageInfo | null>(null)
    let [listSurah, setListSurah] = useState<SurahData[] | null>(null)

    let ctx = AppContext.current;
    ctx.openpage = (p) => {
        p.reqid = getReqId() + "";
        setPageInfo({...p});
    }

    let isHome = () => {
        return pageInfo == null || pageInfo.pagetype == "home";
    }

    let getSurahData = ()=>{
        
        if(listSurah == null) return null;

        let nsurahStr = (pageInfo)? pageInfo.nomorsurah : "1";
        let nsurah = Number(nsurahStr);

        for(var surahData of listSurah){
            if(surahData.id == nsurah){
                return surahData;
            }
        } 
        return null;
    }

    useEffect(() => {

        if (isHome()) {
            (async () => {

                let listSurGet = await getAllSurah();
                if (listSurGet != null) {
                    setListSurah(listSurGet);
                } else {
                    console.log("surah null")
                }

            })();
        }


    }, [pageInfo])


    return (
        <Box>
            <CssBaseline />

            <Toolbar />
            {
                listSurah == null ? (
                    <LoadingReact />
                ) : (
                    isHome() ? (
                        <DaftarSurah
                            daftarSurah={listSurah!}
                        ></DaftarSurah>
                    ) : (
                        <DaftarAyahPage
                            key={pageInfo!.nomorayat + pageInfo?.nomorsurah + pageInfo?.scrollTo + pageInfo?.reqid}
                            scrollToayat={pageInfo!.scrollTo ? pageInfo!.scrollTo : null}
                            nomorayat={pageInfo!.nomorayat}
                            surahdata={getSurahData()}
                        ></DaftarAyahPage>
                    )

                ) 
            }


        </Box>
    )
}
