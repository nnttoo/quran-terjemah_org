import { SurahData } from "../../surahtools/dbtype";
import { Box, Typography } from "@mui/material";
import { addZero } from "../tools/addzero";
import { AyahListElem } from "./ayahListElem";

export const DaftarAyahPage = (prop: {
    nomorayat: string,
    surahdata: SurahData | null,
    scrollToayat: string | null,
}) => {
    if (prop.surahdata == null) {
        return <>Error</>
    }


    return (
        <Box display="flex" flexDirection="column">
            <Typography textAlign="center" >
                <Typography
                    gutterBottom
                    variant="h2"
                    fontSize="24px"
                    fontWeight="bold"
                >
                    {prop.surahdata.nama_surah}
                </Typography>

                <Typography gutterBottom >

                    Turun di : {prop.surahdata.tempat_turun},
                    Jumlah Ayat {prop.surahdata.jumlah_ayat}
                </Typography>

                <Typography
                    fontFamily="suraname"
                    gutterBottom
                    fontSize="90px"
                >

                    {addZero(prop.surahdata.id + "", 3)}
                </Typography>

                <Typography
                    gutterBottom

                >
                    {
                        (prop.surahdata.id != 9 && prop.surahdata.id != 1) ? (
                            <img className="imgbasmalah" src="/myfolder/style/basmalah.svg" />
                        ) : <></>

                    }
                </Typography>


            </Typography>

            <AyahListElem
                scrolltoAyat={prop.scrollToayat}
                surahdata={prop.surahdata}
            ></AyahListElem>
        </Box>
    )

}