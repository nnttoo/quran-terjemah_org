import { Box, Button, Checkbox, Typography } from "@mui/material"
import { AppContext } from "../appContext"
import {  } from "@mui/icons-material";
import { PopupPengaturanController } from "./popup_pentaturan_controller";
import { useState } from "react";

export const PagePengaturanPlayback = () => {

    let ctx = AppContext.current;
    let bahasa = ctx.bahasa;
    let appconfig = ctx.appConfig;

    const  [allsurah,setAllSurah] = useState(appconfig.appConfigData.allsurahPlay);

    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex"   flexDirection="row">
                <Typography flex={1} variant="body1">
                    {bahasa.ppp_putarsemuasurat}

                </Typography>
                <Checkbox  
                onChange={(x)=>{
                    let nchaced = x.target.checked;
                    setAllSurah(nchaced);
                    appconfig.appConfigData.allsurahPlay = nchaced;
                }}
                checked={allsurah} />
            </Box>

            <Button 
                onClick={()=>{
                    appconfig.saveAppConfig();
                    PopupPengaturanController.current
                    .closePengaturan();
                    
                    ctx.reloadPage();

                }}
                variant="contained" sx={{marginTop : 2}}>
                {bahasa.ppp_simpan}
            </Button>

        </Box>
    )
}