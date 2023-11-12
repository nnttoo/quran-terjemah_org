import * as React from 'react';

import { DeveloperBoard, Face, IntegrationInstructions, Language, PermDataSetting, Translate } from '@mui/icons-material/';
import { AppContext } from '../appContext';
import { PagePengaturanBahasa } from './page_pengaturan_bahasa';
 

export type PengaturanMenuType = {
    icon: JSX.Element,
    text: String,
    page: JSX.Element,
    name: string,

}
 

export const pengMenuList = (): PengaturanMenuType[] => { 

    const {bahasa} = AppContext.current;

    return [

        {

            icon: <Translate />,
            text: bahasa.pppml_pengaturanbahasa,
            page: <PagePengaturanBahasa/>,
            name : "lang",
        }, 
        
        {

            icon: <DeveloperBoard />,
            text: "Contoh Lagii",
            page: <></>,
            name : "lang",
        }, 
    ];
}
 


