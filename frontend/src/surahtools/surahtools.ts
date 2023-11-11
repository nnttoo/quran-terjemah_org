import { DataAyat, SurahData } from "./dbtype";

 
/**
 * @typedef DataAyat
 * @property {string} no_surah
 * @property {string} no_ayat
 * @property {string} teks_ayat
 * @property {string} tema
 * @property {string} teks_terjemah
 * @property {string} no_fn
 * @property {string} teks_fn
 */


type JSONkemenag = {
    id_ayat : string,
    no_surah : string,
    no_ayat : string,
    teks_ayat : string,
    tema : string,
    teks_terjemah : string,
    no_fn : string,
    teks_fn : string,
}

type JsonKemenagAyahLevel = {[key : string] : JSONkemenag}
type JsonKemenagSurahLevel = {[key : string] : JsonKemenagAyahLevel}

let daftarSurah : SurahData[] | null = null;
let daftarAyah  : JsonKemenagSurahLevel | null = null;

async function textFetch(path : string){
    var response = await  fetch(path);
    return response.text();
}
function createUniqLink(surahname: String) {
    let slug = surahname.replace(/[^A-z0-9\-]/gi, "").toLowerCase();
    slug = slug.replace("/ /g","-");
    return slug;
}
export async function getAllSurah(){
    if(daftarSurah == null){
        let textdaftar = await textFetch("/myfolder/dbfolder/daftar_surah.json");
         
        daftarSurah = JSON.parse(textdaftar);
        if(daftarSurah != null){
            for(let tiapsurah of daftarSurah){
                tiapsurah.slug = createUniqLink(tiapsurah.nama_surah);
            }
        }
        
    }

    return daftarSurah;
}

export async function getAyahById(surahid : string) : Promise<{listayat : DataAyat[]}>{
    let listAyah : DataAyat[] = [];

    if(daftarAyah == null){
        let txt = await textFetch("/myfolder/dbfolder/kemenag.json");
        daftarAyah = JSON.parse(txt);
    }

    let ayahLevel = daftarAyah![surahid];

    for(let keyAyah in ayahLevel){
        let ayah = ayahLevel[keyAyah];

        listAyah.push({
            AyahText : ayah.teks_ayat,
            VerseID :Number (ayah.no_ayat),
            SuraID : Number (ayah.no_surah),
            cttKaki : ayah.teks_fn,
            ID : Number(ayah.id_ayat),
            Page : 0,
            terjemah : ayah.teks_terjemah,

        })
         
    }


    return {
        listayat : listAyah
    }
}

