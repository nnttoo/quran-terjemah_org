import { AppContext } from "../appContext";

 
export class PopupPengaturanController  {
    modalopen = false;
    setModal =  (mo : boolean, menuname? : string)=>{

    }

    

    onClose(){
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
                }
            },200)
 
        })
    }

    static current : PopupPengaturanController ;
}
PopupPengaturanController.current = new PopupPengaturanController();