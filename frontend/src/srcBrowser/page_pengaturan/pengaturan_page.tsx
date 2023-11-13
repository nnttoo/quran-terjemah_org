import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { PengaturanSidebar } from './pengaturan_sidebar';
import { PengaturanMenuType, pengMenuList, } from './pengaturan_menu_list';
import React, { useEffect, useMemo, useState } from 'react';
import { AppContext } from '../appContext';
import { Height } from '@mui/icons-material';


export const PengaturanPage = (props: {
    menuname: string,
}) => {

    const [listmenu, setListMenu] = useState<PengaturanMenuType[]>(pengMenuList());
    const [menuSelected, setMenuSelected] = React.useState<PengaturanMenuType | null>((() => {
        let menuname = props.menuname;

        if (menuname != "") {
            let selectedMenu: PengaturanMenuType | null = null;
            for (let p of listmenu) {
                if (p.name == menuname) {
                    selectedMenu = p;
                    break;
                }
            }
            if (selectedMenu != null) {
                return selectedMenu;
            }
        }

        if (listmenu.length > 0) {
            return listmenu[0];
        } else {
            return null;
        }
    })());

    const { bahasa } = AppContext.current;


    return (

        <Box sx={{ display: "flex", flexDirection: "row", height: "100%" }} >
            <PengaturanSidebar
                menuselected={menuSelected}
                listmenu={listmenu}
                setManu={(m) => {
                    setMenuSelected(m);
                }} />


            <Box sx={{ flex: 1}} >


                 <Box display="flex" sx={{height : "100%"}} flexDirection="column">
                    <AppBar position="static"  >
                        <Toolbar variant='dense'>
                            <Typography variant="h6">
                                {menuSelected ? menuSelected.text : bahasa.pppp_pengaturan}
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    
                    <Box flex={1} p={2} sx={{overflowY : "auto"}}>  
                        {menuSelected?.page}
                    </Box>
                </Box>  
            
            </Box>
        </Box>
    );
} 
