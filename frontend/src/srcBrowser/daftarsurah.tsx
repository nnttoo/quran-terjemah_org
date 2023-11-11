import React from "react";
import { AppContext } from "./appContext";
import { addZero } from "./tools/addzero";
import { SurahData } from "../surahtools/dbtype";
import { Box, Button, Grid, Stack, Toolbar, Typography } from "@mui/material";

type DaftarSurahProp = {
    daftarSurah: SurahData[],
}

export const DaftarSurah = (props: DaftarSurahProp) => {
    let element: JSX.Element | null = null;
    let listSurahElement: JSX.Element[] = []

    props.daftarSurah.forEach((d) => {
        listSurahElement.push(
            <Grid item lg={4} xl={4} xs={12} sm={6} md={4} >
                <Box boxShadow={2}>
                <Button
                    
                    fullWidth
                    onClick={() => {
                        let ctx = AppContext.current;
 
                        ctx.openpage({
                            pagetype: "surah",
                            nomorayat: "1",
                            nomorsurah: d.id + ""
                        });
                    }}
                    >
                        <Box 
                        
                        display="flex" 
                        justifyContent="stretch" 
                        alignItems="center" 
                        textAlign="left"
                        sx={ { width : "100%"}}> 
                        <Box  >{d.id}</Box>
                        <Box flexGrow={1} marginLeft={2}>
                            <div style={{fontSize : "16px", fontWeight : "bold"}}>{d.nama_surah}</div>
                            <div>{d.arti_nama_surah}</div>
                        </Box>
                        <Box>
                            <div translate="no" 
                            style={{ fontFamily: "suraname" ,   fontSize : "50px"}} 
                            >{addZero(d.id + "", 3)}</div>

                        </Box>
                        

                     </Box>
                </Button>
                </Box>
            </Grid>
        )
    })


    element = (
        <>
            <Grid container spacing={2} marginTop={2}>
                {listSurahElement}
            </Grid>


        </>

    )

    return element;
}
