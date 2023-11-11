

export type DataAyat = {
    ID: number,
    SuraID: number,
    VerseID: number,
    AyahText: string,
    Page: number,
    terjemah : string, 
    cttKaki : string,
}
export type SurahData = {
    // CREATE TABLE "daftar_surah" (
    //     `id`	INTEGER PRIMARY KEY AUTOINCREMENT,
    //     `nama_surah`	TEXT,
    //     `jumlah_ayat`	INT,
    //     `tempat_turun`	TEXT, 
    //     `nama_surah_ar`	TEXT,
    //     `arti_nama_surah`	TEXT
    // )

    id: number,
    nama_surah: string,
    jumlah_ayat: number,
    tempat_turun: string,
    nama_surah_ar: string,
    arti_nama_surah: string,
    triIdText: string,
    slug: string,
}
 
export type SurahResult = { 
    listSurah: SurahData[]
}
