
export const workerUrlGetAyahById = "/myfolder/worker_s_getayah.js"
export const workerUrlGetAllSurah = "/myfolder/worker_s_getsurah.js"
export type WorkerArgGetSurahById = {
    surahid : string,
    bahasa : string,
}

export type WorkerGetAllSurahArg = {
    bahasa : string, 
}


export const workerRunner = <T, R>(p: {
    url: string,
    data: T
}) => {

    return new Promise<R | null>((r, x) => {
        let worker = new Worker(p.url)

        worker.addEventListener("error",(e)=>{
            console.log("web worker erro" + e.message) 
        })
        worker.addEventListener("message", (d) => {
            if(typeof d.data == "string" && d.data.startsWith("LOG:")){
                console.log("WEBWORKER : " + d.data);
            } else {
                r(d.data);
            }

           
        })
        worker.postMessage(p.data);
    })
}