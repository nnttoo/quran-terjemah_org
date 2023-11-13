import { Box, Typography } from "@mui/material"
import { DataAyat, SurahData } from "../../surahtools/dbtype"
import { BookmarkBut } from "../bookmarktools/bookmarkbut" 
import { AudioState, PlayerListener, PlayerListenerContext, PlayerListenerSaver } from "../audioplayer/ayahPlayerListenerSaver"
import { useContext, useState } from "react"
import { AyahPlayerButton } from "./ayahPlayerBut"

export const AyahListElemChild = (p: {
    dataAyah: DataAyat
    dataSurah: SurahData,  
}) => {
    const [bgDark, setBgDark] = useState(false); 
    let bgcolor = bgDark ? "#eee" : "#fff";

    
    const playerListenerSaver = useContext(PlayerListenerContext);
    (()=>{
        if(playerListenerSaver == null){
            return;
        }

        let playerListener = playerListenerSaver.getPlayerListener({
            a: p.dataAyah.VerseID + "",
            s : p.dataSurah.id + "",
        })

        if(playerListener == null) return;

        playerListener.onBGDark = (isdark)=>{
            setBgDark(isdark);
        }



    })();



    return (
        <Box boxShadow={2} padding={2}
            sx={{backgroundColor : bgcolor}}
        borderRadius={1} margin={2}>
            <Typography 
                fontWeight="bold"
                gutterBottom    
            >
            {`${p.dataSurah.nama_surah} - Ayat : ${p.dataAyah.VerseID}  : `}
            </Typography>
            <Typography
                fontFamily="arabic_quran"
                textAlign="right"
                lineHeight={2.3}
                fontSize="30px"
                fontWeight={900}
                gutterBottom
            >
                {p.dataAyah.AyahText}
            </Typography>
            <Typography>
                <div dangerouslySetInnerHTML={{ __html: p.dataAyah.terjemah }}></div>
            </Typography>
            <Box marginTop={2} display="flex" flexDirection="row"
                justifyContent="center" gap={1}
            >
                <BookmarkBut
                    ayah={p.dataAyah.VerseID}
                    sd={p.dataSurah}
                />

                <AyahPlayerButton
                    nomorAyat={p.dataAyah.VerseID + ""}
                    nomorSurat={p.dataSurah.id + ""} 
                ></AyahPlayerButton> 
            </Box>
        </Box>
    )

}