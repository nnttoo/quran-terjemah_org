type LatestPlayMarkData = {
    ayah: string,
    surahid : string,
    name: string, 
}
const keyLatestPlay = "latesplay";
export class LatestPlayMark{
    static current = new LatestPlayMark();
    latestPlay: LatestPlayMarkData | null = null;

    private load() {
        try {

            let localstorage = window.localStorage
            let bookmarkstr = localstorage.getItem(keyLatestPlay);
            let listbookmark = JSON.parse(bookmarkstr!);
            if (listbookmark != null)
                this.latestPlay = listbookmark;
        } catch (error) {

        }
    }

    constructor() {
        this.load();
    }

    private saveJson() {
        try {
            

            let strjson = "";
            if(this.latestPlay != null ){
                strjson = JSON.stringify(this.latestPlay);
            }
            let localstorage = window.localStorage
            localstorage.setItem(keyLatestPlay, strjson);
        } catch (error) {

        }
    }

    saveLatestPlay(bd: LatestPlayMarkData) { 
        this.latestPlay = bd;
        this.saveJson();
    } 
 

    getLatestPlay() {
        return this.latestPlay;
    }

}