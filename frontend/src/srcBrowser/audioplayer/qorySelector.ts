function leadingZero(angka: string) {
    while (angka.length < 3) {
        angka = "0" + angka;
    }
    return angka;
}
export type QoryData = {
    url : string,
    nama : string,
}
export const daftarQory : QoryData[] = [

    {
        nama : "Ibrahim Akhdar",
        //url : "/sound/ibrahimakhdar/",
        url :'https://www.everyayah.com/data/Ibrahim_Akhdar_32kbps/',
    },

    {
        nama : "Ghamidi",
        url : "https://www.everyayah.com/data/Ghamadi_40kbps/",

    },
    {
        nama : "Hani Rifai",
        url : "https://www.everyayah.com/data/Hani_Rifai_192kbps/",
    }, 
    {
        nama : "Alafasy",
        url : "https://www.everyayah.com/data/Alafasy_64kbps/",
    }, 
    {
        nama : "Abdul Basit Abdul Samad",
        url : "https://www.everyayah.com/data/AbdulSamad_64kbps_QuranExplorer.Com/",
    }, 
    {
        nama : "Abdul Basit Mujawwad",
        url : "https://www.everyayah.com/data/Abdul_Basit_Mujawwad_128kbps/",
    }, 
    {
        nama : "Abdullah Basfar",
        url : "https://www.everyayah.com/data/Abdullah_Basfar_64kbps/",
    }, 
    {
        nama : "Abdurrahmaan As-Sudais",
        url : "https://www.everyayah.com/data/Abdurrahmaan_As-Sudais_192kbps/",
    }, 
    {
        nama : "Ali Jaber",
        url : "https://www.everyayah.com/data/Ali_Jaber_64kbps/",
    }, 
    {
        nama : "Fares Abbad",
        url : "https://www.everyayah.com/data/Fares_Abbad_64kbps/",
    }, 
]


export class QorySelector{
    static current = new QorySelector();
    currentQory = daftarQory[0];
    onQoriChange : ()=>void = ()=>{}

    constructor(){
        this.loadQory();
    }

    loadQory(){ 
        try {
            
            let localstorage =  window.localStorage
            let savedQoryURL = localstorage.getItem("savedqory"); 
            let savedQory : QoryData | null = null;
            if(savedQoryURL != null){
                daftarQory.forEach((d)=>{
                    if(d.url == savedQoryURL){
                        savedQory = d;
                    }
                })
            }

            if(savedQory != null){
                this.currentQory = savedQory;
            }

        } catch (error) {
            
        }        
        

        return this.currentQory;
    }

    getQory(){
        if(this.currentQory == null){
            this.currentQory = daftarQory[0];
        }

        return this.currentQory;
    }

    changeQory(q : QoryData){
        this.currentQory = q;
        try {
            
            let localstorage =  window.localStorage
            localstorage.setItem("savedqory",q.url);
        
        } catch (error) {
            
        }

        if(this.onQoriChange){
            this.onQoriChange();
        }
    }

    getQoryUrl(a : {
        ns : string,
        na : string,
    }) {

        let qury = this.getQory();
        let src = qury.url +
        leadingZero(a.ns) +
        leadingZero(a.na) +
        ".mp3";

        return src;
    }

     
}