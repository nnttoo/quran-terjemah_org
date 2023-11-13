
export type JenisBahasa = "id" | "en"; 
const localStorageKey = "qtAppConfig";

export type AppConfigData = {
    bahasaUi : JenisBahasa
    bahasaTerjemahan : JenisBahasa
    allsurahPlay : boolean,
}
export class AppConfig {

    constructor(){
        this.loadAppConfig();
    }

    appConfigData!: AppConfigData; 

    private loadAppConfig(){
        let wdata = window.localStorage.getItem(localStorageKey);
        let jObj : AppConfigData | null= null; 
        try {
            
            jObj = JSON.parse(wdata!);

        } catch (error) {
            
        }

        if(jObj == null){
            jObj = {} as AppConfigData;
        }

        if(jObj.bahasaTerjemahan == null){
            jObj.bahasaTerjemahan = "id";
        }

        if(jObj.bahasaUi == null){
            jObj.bahasaUi = "en";
        }

        this.appConfigData = jObj;

    }

    saveAppConfig(){
        window.localStorage.setItem(localStorageKey,JSON.stringify(this.appConfigData));
    }

}