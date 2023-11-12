
/**
 * @typedef {import("./worker_db_type").TerjemahEnglish} TerjemahEnglish
 * @typedef {import("./worker_db_type").TerjemahEnglishMapAyah} TerjemahEnglishMapAyah
 * @typedef {import("./worker_db_type").TerjemahEnglishMapSurah} TerjemahEnglishMapSurah
 * @typedef {import("./worker_db_type").JSONkemenag } JSONkemenag
 * 
 * @typedef {import("./worker_db_type").JsonKemenagSurahLevel} JsonKemenagSurahLevel
 * @typedef {import("../../src/surahtools/dbtype").DataAyat} DataAyat
 * @typedef {import("../../src/surahtools/workre_runner").WorkerArgGetSurahById} WorkerArgGetSurahById
 */
function logPrint(msg){
    if(msg == null) return;
    if(typeof msg != "string"){
        msg = JSON.stringify(msg,null,2);
    }

    self.postMessage("LOG:  " + msg);
}
 

/**
 * 
 * @returns {Promise<TerjemahEnglishMapAyah>}
 * @param {string} surahid
 */
async function getEnglishJson(surahid){
    /** @type {TerjemahEnglishMapAyah} */
    let result = {}

    let response = await fetch("/myfolder/dbfolder/quran_en.json");
    let txt = await response.text();

    /** @type {TerjemahEnglish[]} */
    let objResult =  JSON.parse(txt);


    for(let k in objResult){
        let ayat = objResult[k]; 

        let surahIdJson = ayat.SuraID + "";

        if(surahIdJson == surahid){
            result[ayat.VerseID + ""] = ayat;  
        }  

    } 
    return result;
}
 

/**
 * 
 * @param {WorkerArgGetSurahById}  data 
 */
async function working(data) {
 
 
    let result = null;
    try {
        let txtReponse = await fetch("/myfolder/dbfolder/kemenag.json");
        let txt = await txtReponse.text();
        /** @type {DataAyat[]} */
        let listAyah = [];

        /**
         * @type {JsonKemenagSurahLevel}
         */
        let jsonKemenagSurahLevel = JSON.parse(txt);         
        let ayahLevel = jsonKemenagSurahLevel[data.surahid];


        /**
         * @type {TerjemahEnglishMapAyah}
         */
        let jsonEnglish = null;

        if(data.bahasa == "en"){
            jsonEnglish = await getEnglishJson(data.surahid);
        }
 

 
        for (let keyAyah in ayahLevel) {         

            let ayah = ayahLevel[keyAyah];

            if((ayah.no_surah + "") != data.surahid){
                continue;
            }


            let terjemah = ayah.teks_terjemah;
            /** @type {TerjemahEnglish }*/
            let en;

            if(jsonEnglish != null && 
                  (en = jsonEnglish[ayah.no_ayat + ""]) != null && 
                  en.AyahText != null                
                ){

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

        result = listAyah;

    } catch (error) {
        result = "error dari webworker : " + error;
    }


    self.postMessage(result);
    self.close();

}

self.addEventListener("message", (data)=>{
    working(data.data);
}); 