import { DataAyat, SurahData } from "./dbtype"

 

export type JsonQuranData = {
    pagetype : string  
    content: any
    url : string  
}

export type JsonSurahData = Omit<JsonQuranData , "content"> & { 
    content  : {
        dataSurah: SurahData
        listayah: DataAyat[]
        listtafsir: any[]
    } 
}  


export type JsonHomeData = Omit<JsonQuranData , "content"> & { 
    content :  {
        listsurah : SurahData[],
        listtafsir : []

    }
} 
 

