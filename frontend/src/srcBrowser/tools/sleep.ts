export function sleep(duration:number){
    return new Promise((r)=>{
        setTimeout(function(){
            r(null);
        },duration)
    }) 
}