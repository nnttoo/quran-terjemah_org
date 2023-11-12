import * as React from 'react';

import { DeveloperBoard, Face, IntegrationInstructions, Language, PermDataSetting } from '@mui/icons-material/';
import { AppContext } from '../appContext';
 

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

            icon: <Language />,
            text: bahasa.ppml_pengaturanbahasa,
            page: <></>,
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
 


