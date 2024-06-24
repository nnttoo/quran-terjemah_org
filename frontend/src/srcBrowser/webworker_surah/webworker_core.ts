export class WebWorkerCore {
    docbaseUrl: string = "";

    constructor(docbaseUrl: string) {
        this.docbaseUrl = docbaseUrl;
    }

    async fetchToJson(urlpath: string) {

        var urlAbsolute = new URL(urlpath, this.docbaseUrl).href;

        let txtReponse = await fetch(urlAbsolute);
        let txt = await txtReponse.text();
        return JSON.parse(txt);
    }

    logPrint(msg: any) {
        if (msg == null) return;
        if (typeof msg != "string") {
            msg = JSON.stringify(msg, null, 2);
        }
        self.postMessage("LOG:  " + msg);
    }

    runAsWebworker(funcore: (arg: any) => Promise<any>) {
        self.addEventListener("message", async (d) => {

            let result = "";

            try {
                result = await funcore(d.data);
            } catch (error) {
                this.logPrint(error);
            }

            self.postMessage(result);
            self.close();

        })

    }

}
