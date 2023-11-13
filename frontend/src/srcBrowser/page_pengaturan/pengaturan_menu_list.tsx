import * as React from 'react';

import { DeveloperBoard, Face, Info, IntegrationInstructions, Language, Mosque, PermDataSetting, PlayCircle, Translate } from '@mui/icons-material/';
import { AppContext } from '../appContext';
import { PagePengaturanBahasa } from './page_pengaturan_bahasa';
import { PengaturanQori } from './pengaturan_qori/pengaturan_qory';
import { AboutPage } from './aboutpage';
import { PagePengaturanPlayback } from './page_pengaturan_playback';
 

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

            icon: <Mosque />,
            text: bahasa.pppml_reciter,
            page: <PengaturanQori/>,
            name : "qori",
        }, 

        {

            icon: <PlayCircle />,
            text: bahasa.pppml_playmode,
            page: <PagePengaturanPlayback/>,
            name : "playback",
        }, 
        
        {

            icon: <Info />,
            text: bahasa.pppml_about,
            page: <AboutPage/>,
            name : "about",
        }, 
    ];
}
 


