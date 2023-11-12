import { AppContext } from "../srcBrowser/appContext";
import { DataAyat, SurahData } from "./dbtype";    
import { WorkerArgGetSurahById, WorkerGetAllSurahArg, workerRunner, workerUrlGetAllSurah, workerUrlGetAyahById } from "./workre_runner";

  


 

async function textFetch(path : string){
    var response = await  fetch(path);
    return response.text();
}

export async function getAllSurah(){

    let appConfig = AppContext.current.appConfig.appConfigData;
    let workerResult = await workerRunner<WorkerGetAllSurahArg,SurahData[]>({
        url : workerUrlGetAllSurah,
        data : {
            bahasa : appConfig.bahasaTerjemahan
        }
    }) 
    return workerResult;
}

export async function getAyahById(surahid : string) : Promise<{listayat : DataAyat[]}>{
    
    let appConfig = AppContext.current.appConfig.appConfigData;

    let workerResult = await  workerRunner<WorkerArgGetSurahById,DataAyat[]>({
        url : workerUrlGetAyahById,
        data : {
            surahid : surahid,
            bahasa : appConfig.bahasaTerjemahan
        } 
    })  
 

    return {
        listayat : workerResult!
    }
}

