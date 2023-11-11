export function addZero(str : string, jumlah :  number){
    while(str.length < jumlah){
        str = "0"+str;
    }

    return str;
}