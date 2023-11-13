
export async function fetchToJson(url: string) {
    let txtReponse = await fetch(url);
    let txt = await txtReponse.text();
    return JSON.parse(txt);
}

export function logPrint(msg : any){
    if(msg == null) return;
    if(typeof msg != "string"){
        msg = JSON.stringify(msg,null,2);
    } 
    self.postMessage("LOG:  " + msg);
}
export function runAsWebworker(funcore : (arg : any)=>Promise<any>){  
    self.addEventListener("message",async (d)=>{

        let result = "";

        try {
            result = await funcore(d.data);
        } catch (error) {
            logPrint(error);            
        } 

        self.postMessage(result);
        self.close();

    })



} 