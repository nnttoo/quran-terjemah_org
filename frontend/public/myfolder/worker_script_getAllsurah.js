/**
 * @typedef {import("../../src/surahtools/workre_runner").WorkerGetAllSurahArg} Arg 
 * @typedef {import("../../src/surahtools/dbtype").SurahData } SurahData
 */

/**
 * 
 * @typedef {{[k : string] : string}} EnglishMap 
 */

 
function logPrint(msg){
    if(msg == null) return;
    if(typeof msg != "string"){
        msg = JSON.stringify(msg,null,2);
    }

    self.postMessage("LOG:  " + msg);
}

async function fetchToJson(url){
    let txtReponse = await fetch(url);
    let txt = await txtReponse.text();  
    return JSON.parse(txt);
}

function createUniqLink(surahname) {
    let slug = surahname.replace(/[^A-z0-9\-]/gi, "").toLowerCase();
    slug = slug.replace("/ /g","-");
    return slug;
}

/** @param {Arg} data */
async function working(data) { 
 
    let result = null;
    try { 

        /** @type {SurahData[]} */
        let daftarSurah = await fetchToJson("/myfolder/dbfolder/daftar_surah.json");

        
        /** @type {EnglishMap} */
        let daftarEnglish = null;

        if(data.bahasa == "en"){
            daftarEnglish = await fetchToJson("/myfolder/dbfolder/daftar_surah_en.json")
 
        }

        daftarSurah.forEach((s,i)=>{

            let terjemah = s.arti_nama_surah;
            if(daftarEnglish != null && daftarEnglish[s.id] != null){
                terjemah = daftarEnglish[s.id];
            }

            s.arti_nama_surah =terjemah;
            s.slug = createUniqLink(s.nama_surah);
        })

        result = daftarSurah;
        
    } catch (error) {
        result = "error dari webworker : " + error;
    }


    self.postMessage(result);
    self.close();

}

self.addEventListener("message", (data)=>{
    working(data.data);
}); 