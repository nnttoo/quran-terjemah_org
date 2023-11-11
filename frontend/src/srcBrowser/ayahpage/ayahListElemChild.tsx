import { Box, Typography } from "@mui/material"
import { DataAyat, SurahData } from "../../surahtools/dbtype"
import { BookmarkBut } from "../bookmarktools/bookmarkbut" 
import { AudioState, PlayerListener, PlayerListenerSaver } from "./ayahPlayerListenerSaver"
import { useState } from "react"
import { AyahPlayerButton } from "./ayahPlayerBut"

export const AyahListElemChild = (p: {
    dataAyah: DataAyat
    dataSurah: SurahData,  
}) => {
    const [bgDark, setBgDark] = useState(false); 
    let bgcolor = bgDark ? "#eee" : "#fff";



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
                    onBgDark={(s)=>{
                        setBgDark(s);
                    }}
                ></AyahPlayerButton> 
            </Box>
        </Box>
    )

}