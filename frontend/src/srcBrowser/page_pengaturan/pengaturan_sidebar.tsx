import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import type { PengaturanMenuType } from './pengaturan_menu_list';
import { AppBar, Box, Typography } from '@mui/material';




type MySidebarProp = {
    menuselected: PengaturanMenuType | null,
    setManu: (m: PengaturanMenuType) => void,
    listmenu: PengaturanMenuType[]
}

export const PengaturanSidebar = (props: MySidebarProp) => {

    let menuSelected = props.menuselected;
    let setMenu = (m: PengaturanMenuType) => {
        props.setManu(m);
    }


    const [isdevmode, setIsdevmode] = React.useState(false);



    return (
        <Box
            boxShadow={4}
            display="flex"
            flexDirection="column"
        >

            <Toolbar />

            {
                props.listmenu.map((v) => {
                    if (v.name == "devtools" && !isdevmode) {
                        return <></>
                    }

                    return (
                        <ListItem disablePadding>
                            <ListItemButton

                                sx={{
                                    color: (v.name == menuSelected?.name) ? "primary.main" : "secundary.main",
                                    justifyContent: "center",
                                    minHeight: "50px",
                                    minWidth: 0,
                                }}
                                onClick={() => {
                                    setMenu(v);
                                }}>
                                <ListItemIcon
                                    sx={{
                                        mr: 'auto',
                                        justifyContent: 'center',
                                        minWidth: 0,
                                    }}
                                >
                                    {v.icon}
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                    );
                })
            }
        </Box>
    )
};