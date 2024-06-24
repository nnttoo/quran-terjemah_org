import type { SurahData } from "../../surahtools/dbtype";
import type { WorkerGetAllSurahArg } from "../../surahtools/workre_runner";
import { WebWorkerCore } from "./webworker_core";




type EnglishMap = { [k: string]: string }

export function runGetAllSurah(workercore: WebWorkerCore) {
    function createUniqLink(surahname: string) {
        let slug = surahname.replace(/[^A-z0-9\-]/gi, "").toLowerCase();
        slug = slug.replace("/ /g", "-");
        return slug;
    }

    workercore.runAsWebworker(async (data: WorkerGetAllSurahArg) => {  
        let daftarSurah: SurahData[] = await workercore.fetchToJson("/myfolder/dbfolder/daftar_surah.json");

        let daftarEnglish: EnglishMap | null = null;

        if (data.bahasa == "en") {
            daftarEnglish = await workercore.fetchToJson("/myfolder/dbfolder/daftar_surah_en.json")

        }

        daftarSurah.forEach((s, i) => {

            let terjemah = s.arti_nama_surah;
            if (daftarEnglish != null && daftarEnglish[s.id] != null) {
                terjemah = daftarEnglish[s.id];
            }

            s.arti_nama_surah = terjemah;
            s.slug = createUniqLink(s.nama_surah);
        })
        return daftarSurah;

    })
}

