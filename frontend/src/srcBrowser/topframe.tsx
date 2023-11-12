import React from "react";
import { AppContext } from "./appContext";
import { RightMenu } from "./menuelem/rightMenu";
import { IconButton, AppBar, Toolbar, Box, Typography } from "@mui/material";
import { Menu, Settings } from "@mui/icons-material";
import { PopupPengaturanController } from "./page_pengaturan/popup_pentaturan_controller";


export const TopFrame = () => {
    let ctx = AppContext.current;
    return (
        <>
            <AppBar position="fixed"   >
                <Toolbar>
                    <IconButton color="inherit"
                        onClick={() => {
                            ctx.openpage({
                                nomorayat: "1",
                                nomorsurah: "1",
                                pagetype: "home",
                            })
                        }}
                    >
                        <img
                            style={{ width: 40, height: 40 }}
                            src="/myfolder/style/qrn_logo.png" alt="quran logo"

                        />
                        <Typography paddingLeft={2}>Quran-Terjemah.org</Typography>
                    </IconButton>


                    <Box sx={{ flexGrow: 1 }}></Box>
                    <IconButton
                        onClick={()=>{
                            PopupPengaturanController.current
                            .openPengaturan();
                        }}

                         size="large"
                         edge="start"
                         color="inherit"
                         aria-label="menu"
                         sx={{ mr: 2 }}
                    >
                        <Settings/>
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            ctx.openMenu(true);
                        }}

                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <Menu />
                    </IconButton>
                </Toolbar>

            </AppBar>
            <RightMenu />
        </>
    )
} 