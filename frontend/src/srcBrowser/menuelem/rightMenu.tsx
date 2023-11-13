import React, { useState } from "react";
import { QorySelector } from "../audioplayer/qorySelector";
import { BookMarkRightMenu } from "../bookmarktools/bookmarkRightMenu";
import { AppBar, Box, Divider, Drawer, Link, List, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import { AppContext } from "../appContext";
import { QorySelectorElem } from "./qorySelectorElem";
import { MyBorderRadius } from "./myradius";
import { MenuFooter } from "./footer";
import { MenuOpen } from "@mui/icons-material";
import { LatestPlayRightMenu } from "../bookmarktools/latestplay_mark_menu";



export const RightMenu = () => {
    const [draweopen, setDrawerOpen] = useState(false);
    let ctx = AppContext.current;
    ctx.openMenu = (open) => {
        setDrawerOpen(open);
    }
    return (
        <Drawer
            open={draweopen}
            anchor="right"
            onClose={() => {
                setDrawerOpen(false)
            }}
        >
            <Box
                width="300px" height="100%"
                display="flex"
                flexDirection="column">
                <AppBar position="static"  >
                    <Toolbar variant='regular'>
                        <Typography variant="h6">
                            <MenuOpen/>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box flex={1} sx={{
                    overflowY : "auto",
                    padding : 2
                }}>
                     <Box sx={{
                        display : "flex",
                        flexDirection : "column",
                        gap : 2,
                     }}>
                        <MyBorderRadius>
                            <QorySelectorElem />
                        </MyBorderRadius>

                        <MyBorderRadius>
                            <BookMarkRightMenu />
                        </MyBorderRadius> 
                        <MyBorderRadius>
                            <LatestPlayRightMenu/>
                        </MyBorderRadius>
                    </Box>
                </Box>

                <MenuFooter /> 
            </Box>

        </Drawer>
    )
}
