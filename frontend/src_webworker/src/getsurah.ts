import * as sleep from "../../src/srcBrowser/tools/sleep"
import type { WorkerGetAllSurahArg } from "../../src/surahtools/workre_runner"
import { fetchToJson, runAsWebworker } from "./webworker_core"
import type { SurahData } from "../../src/surahtools/dbtype"




function createUniqLink(surahname: string) {
    let slug = surahname.replace(/[^A-z0-9\-]/gi, "").toLowerCase();
    slug = slug.replace("/ /g", "-");
    return slug;
}

type EnglishMap = {[k: string] : string}

runAsWebworker(async (data: WorkerGetAllSurahArg) => {
 
    let daftarSurah : SurahData[] = await fetchToJson("/myfolder/dbfolder/daftar_surah.json");


   
    let daftarEnglish : EnglishMap | null = null;

    if (data.bahasa == "en") {
        daftarEnglish = await fetchToJson("/myfolder/dbfolder/daftar_surah_en.json")

    }

    daftarSurah.forEach((s, i) => {

        let terjemah = s.arti_nama_surah;
        if (daftarEnglish != null && daftarEnglish[s.id] != null) {
            terjemah = daftarEnglish[s.id];
        }

        s.arti_nama_surah = terjemah;
        s.slug = createUniqLink(s.nama_surah);
    })

    return  daftarSurah; 
})