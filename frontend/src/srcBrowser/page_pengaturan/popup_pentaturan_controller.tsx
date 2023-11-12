import { AppContext } from "../appContext";

 
export class PopupPengaturanController  {
    modalopen = false;

    
    setModal =  (mo : boolean, menuname? : string)=>{

    }

    

    onCloseListener(){
        this.modalopen = false;
    } 

    openPengaturan(menuname? : string){
        return new Promise((r,x)=>{
            this.modalopen = true; 
            this.setModal(true, menuname); 

            let itv = setInterval(()=>{
                if(!this.modalopen){
                    clearInterval(itv);
                    r(null);
 
                    let ctx = AppContext.current;
                    ctx.reloadPage();
                    console.log("reloadpage")
                }
            },200)
 
        })
    }

    closePengaturan(){
        this.setModal(false,"");
    }

    static current : PopupPengaturanController ;
}
PopupPengaturanController.current = new PopupPengaturanController();