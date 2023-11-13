import { Box, Button, Grid, MenuItem, Select, Typography } from "@mui/material"
import { AppContext } from "../appContext"
import { myAlertDialogShow } from "../dialog/myalert_dialog";
import { PopupPengaturanController } from "./popup_pentaturan_controller";
import { useState } from "react";
import { JenisBahasa } from "../tools/appconfig";

export const PagePengaturanBahasa = () => {

    let ctx = AppContext.current;
    const bahasa = ctx.bahasa;
    const appconfig = ctx.appConfig;

    const [bhsUi, setBhsUi] = useState(appconfig.appConfigData.bahasaUi);
    const [bhsTerjemah, setBhsTerjemah] = useState(appconfig.appConfigData.bahasaTerjemahan);


    return (
        <Box display="flex" flexDirection="column">
            <Typography variant="body1">
                {bahasa.ppb_bahasaui}
            </Typography>
            <Select
                size="small"
                fullWidth
                value={bhsUi}
                onChange={(v)=>{
                    let curBahasa = v.target.value as JenisBahasa
                    appconfig.appConfigData.bahasaUi = curBahasa
                    ctx.changeBahasa(curBahasa);
                    setBhsUi(curBahasa);
                }}
            >
                
                <MenuItem value="en">{bahasa.ppb_jbahasa_en}</MenuItem>
                <MenuItem value="id">{bahasa.ppb_jbahasa_id}</MenuItem>
            </Select>

            <Typography marginTop={2} variant="body1">
                {bahasa.ppb_bahasaterjemahan}
            </Typography>
            <Select
                value={bhsTerjemah}
                size="small"
                fullWidth

                onChange={(v)=>{
                    
                    let curBahasa = v.target.value as JenisBahasa
                    appconfig.appConfigData.bahasaTerjemahan = curBahasa;
                    setBhsTerjemah(curBahasa);
                }}
            >

                <MenuItem value="en">{bahasa.ppb_jbahasa_en}</MenuItem>
                <MenuItem value="id">{bahasa.ppb_jbahasa_id}</MenuItem>
            </Select>

            <Button 
                onClick={()=>{
                    appconfig.saveAppConfig();
                    PopupPengaturanController.current
                    .closePengaturan();
                    
                    ctx.reloadPage();

                }}
                variant="contained" sx={{marginTop : 2}}>
                {bahasa.ppb_simpan}
            </Button>

        </Box>
    )
}