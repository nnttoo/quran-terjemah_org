
export type JSONkemenag = {
    id_ayat : string,
    no_surah : string,
    no_ayat : string,
    teks_ayat : string,
    tema : string,
    teks_terjemah : string,
    no_fn : string,
    teks_fn : string,
}

export type JsonKemenagAyahLevel = {[key : string] : JSONkemenag}
export type JsonKemenagSurahLevel = {[key : string] : JsonKemenagAyahLevel}

export type TerjemahEnglish = {
    AyahText : string, 
    SuraID : number,
    VerseID : number,

} 

export type TerjemahEnglishMapAyah = {[ayah : string] : TerjemahEnglish}
export type TerjemahEnglishMapSurah = {[surah : string] : TerjemahEnglishMapAyah}