import { Box, MenuItem, Select } from "@mui/material"
import React, { useEffect, useState } from "react"
import { QoryData, QorySelector } from "../audioplayer/qorySelector"

export const QorySelectorElem = () => {
    const [sqorydata,setSqoryData] = useState<QoryData | null>(null);

    useEffect(()=>{
        let qoruData = QorySelector.current.getQory();
        setSqoryData(qoruData);

    },[])

    let daftarQory = QorySelector.current.getDaftarQory();
    return (
        <>
            <Box marginBottom={2}>Pembaca (Qari) : </Box>
            <Select
                fullWidth
                size="small"
                value={(()=>{
                    if(setSqoryData == null){
                        return 0;
                    }

                    let qselected = "0";
                    for(let i in daftarQory){
                        let cQory = daftarQory[i];
                        if(sqorydata?.url == cQory.url){
                            qselected = i;
                        }
                    }

                    return qselected;

                })()}

                onChange={(v)=>{
                    let val = Number(v.target.value); 

                    if(daftarQory.length > val){
                        let cq = daftarQory[val];
                        QorySelector.current.changeQory(cq);
                        setSqoryData(cq);
                    }
                     

                }}
            >
                {
                    daftarQory.map((q, indx) => (
                        <MenuItem value={indx}>{q.nama}</MenuItem>
                    ))
                }

            </Select>
        </>
    )
}