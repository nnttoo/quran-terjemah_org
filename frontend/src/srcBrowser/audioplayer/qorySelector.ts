function leadingZero(angka: string) {
    while (angka.length < 3) {
        angka = "0" + angka;
    }
    return angka;
}
export type QoryData = {
    url: string,
    nama: string,
    ftype : string,
}
const defDaftarQory: QoryData[] = [

    {
        nama: "Ibrahim Akhdar",
        //url : "/sound/ibrahimakhdar/",
        url: 'https://www.everyayah.com/data/Ibrahim_Akhdar_32kbps/',
        ftype : "mp3"
    },

    {
        nama: "Ghamidi",
        url: "https://www.everyayah.com/data/Ghamadi_40kbps/",
        ftype : "mp3"

    },
    {
        nama: "Hani Rifai",
        url: "https://www.everyayah.com/data/Hani_Rifai_192kbps/",
        ftype : "mp3"
    },
    {
        nama: "Alafasy",
        url: "https://www.everyayah.com/data/Alafasy_64kbps/",
        ftype : "mp3"
    },
    {
        nama: "Abdul Basit Abdul Samad",
        url: "https://www.everyayah.com/data/AbdulSamad_64kbps_QuranExplorer.Com/",
        ftype : "mp3"
    },
    {
        nama: "Abdul Basit Mujawwad",
        url: "https://www.everyayah.com/data/Abdul_Basit_Mujawwad_128kbps/",
        ftype : "mp3"
    },
    {
        nama: "Abdullah Basfar",
        url: "https://www.everyayah.com/data/Abdullah_Basfar_64kbps/",
        ftype : "mp3"
    },
    {
        nama: "Abdurrahmaan As-Sudais",
        url: "https://www.everyayah.com/data/Abdurrahmaan_As-Sudais_192kbps/",
        ftype : "mp3"
    },
    {
        nama: "Ali Jaber",
        url: "https://www.everyayah.com/data/Ali_Jaber_64kbps/",
        ftype : "mp3"
    },
    {
        nama: "Fares Abbad",
        url: "https://www.everyayah.com/data/Fares_Abbad_64kbps/",
        ftype : "mp3"
    },
]


export class QorySelector {
    static current = new QorySelector();
    private daftarQory: QoryData[] | null = null;
    private currentQory: QoryData | null = null;
    onQoriChange: () => void = () => { }

    constructor() {
        this.loadDaftarQori();
        this.loadQorySelected();
    }

    private loadDaftarQori() {
        let nDaftar: QoryData[] | null = null;
        try {
            let localstorage = window.localStorage
            let txtDftarQory = localstorage.getItem("daftarqori");

            nDaftar = JSON.parse(txtDftarQory!);
        } catch (error) {

        }

        if (nDaftar == null || nDaftar.length == 0) {
            nDaftar = defDaftarQory;
        }

        this.daftarQory = nDaftar;
    }

    private checkQorySelected(qUrl: string) {
        let savedQory: QoryData | null = null;
        if (qUrl != null) {
            this.daftarQory!.forEach((d) => {
                if (d.url == qUrl) {
                    savedQory = d;
                }
            })
        }

        if (savedQory == null) {
            savedQory = this.daftarQory![0];
        }

        return savedQory;
    }

    private loadQorySelected() {
        try {

            let localstorage = window.localStorage
            let savedQoryURL = localstorage.getItem("savedqory");


            this.currentQory = this.checkQorySelected(savedQoryURL!);

        } catch (error) {

        }


    }

    resetToDeaultQori(){
        this.daftarQory = defDaftarQory;
    }

    getQory() {
        if (this.currentQory == null) {
            this.currentQory = this.daftarQory![0];
        }

        return this.currentQory;
    }

    getDaftarQory() {
        if (this.daftarQory == null) {
            this.daftarQory = defDaftarQory;
        }

        return this.daftarQory;
    }

    saveDaftarQory(ndaftar: QoryData[], safetoLocalStorage?: boolean) {

        if (ndaftar == null) return;
        if (ndaftar.length == 0) return;


        this.daftarQory = ndaftar;

        let qoruURL = "" ; 
        if(this.currentQory && this.currentQory.url) {
            qoruURL = this.currentQory.url;
        }

        this.currentQory = this.checkQorySelected(qoruURL);
        if (!safetoLocalStorage) return;

        try {

            let localStorage = window.localStorage;
            localStorage.setItem("daftarqori", JSON.stringify(this.daftarQory))
        } catch (error) {

        }
    }

    changeQory(q: QoryData) {
        this.currentQory = q;
        try {

            let localstorage = window.localStorage
            localstorage.setItem("savedqory", q.url);

        } catch (error) {

        }

        if (this.onQoriChange) {
            this.onQoriChange();
        }
    }

    getQoryUrl(a: {
        ns: string,
        na: string,
    }) {

        let qury = this.getQory(); 

        if(!qury.url.endsWith("/") && !qury.url.endsWith("\\")){
           qury.url = qury.url + "/";
        }

        if(!qury.ftype || qury.ftype == ""){
            qury.ftype = "mp3"
        }

        let src = qury.url +
            leadingZero(a.ns) +
            leadingZero(a.na) +
            "." + qury.ftype;


           
        if(!src.startsWith("http")){
            let base64 = btoa(src);
            src = "/sembarang.mp3?arg=" + encodeURIComponent(base64);
        }

        return src;
    }


}