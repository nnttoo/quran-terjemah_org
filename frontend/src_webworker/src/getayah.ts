import { fetchToJson, runAsWebworker } from "./webworker_core";
import type { WorkerArgGetSurahById } from "../../src/surahtools/workre_runner"
import type { JsonKemenagSurahLevel, TerjemahEnglish, TerjemahEnglishMapAyah } from "./worker_db_type";
import type { DataAyat } from "../../src/surahtools/dbtype";

async function getEnglishJson(surahid : string){ 

    let result : {[k : string] : TerjemahEnglish} = {} 
    let objResult : TerjemahEnglish[] =  await fetchToJson("/myfolder/dbfolder/quran_en.json");


    for(let k in objResult){
        let ayat = objResult[k]; 

        let surahIdJson = ayat.SuraID + "";

        if(surahIdJson == surahid){
            result[ayat.VerseID + ""] = ayat;  
        }  

    } 
    return result;
}

runAsWebworker(async (data : WorkerArgGetSurahById) => {
    let kemenagSlevel : JsonKemenagSurahLevel = await fetchToJson("/myfolder/dbfolder/kemenag.json");

    let ayahLevel = kemenagSlevel[data.surahid]; 
    let jsonEnglish : TerjemahEnglishMapAyah | null = null;

    if (data.bahasa == "en") {
        jsonEnglish = await getEnglishJson(data.surahid);
    }

    let listAyah : DataAyat[] = [];


    for (let keyAyah in ayahLevel) {
        let ayah = ayahLevel[keyAyah];
        if ((ayah.no_surah + "") != data.surahid) {
            continue;
        }
        let terjemah = ayah.teks_terjemah; 
        let en : TerjemahEnglish;

        if (jsonEnglish != null &&
            (en = jsonEnglish[ayah.no_ayat + ""]) != null &&
            en.AyahText != null
        ) {

            terjemah = en.AyahText
        }


        //logPrint(terjemah)

        listAyah.push({
            AyahText: ayah.teks_ayat,
            VerseID: Number(ayah.no_ayat),
            SuraID: Number(ayah.no_surah),
            cttKaki: ayah.teks_fn,
            ID: Number(ayah.id_ayat),
            Page: 0,
            terjemah: terjemah,

        })
    }

    return  listAyah;
})