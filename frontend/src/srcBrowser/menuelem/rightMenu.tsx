import React, { useState } from "react";
import { daftarQory, QorySelector } from "../audioplayer/qorySelector";
import { BookMarkRightMenu } from "../bookmarktools/bookmarkRightMenu";
import { Box, Divider, Drawer, Link, List, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import { AppContext } from "../appContext";
import { QorySelectorElem } from "./qorySelectorElem";
import { MyBorderRadius } from "./myradius";
import { MenuFooter } from "./footer";



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
            <Box width="300px" p={1} height="100%"> 
                <Box display="flex"  gap={2} flexDirection="column" height="100%">
                    <Box p={1}/>
                    <MyBorderRadius>
                        <QorySelectorElem />
                    </MyBorderRadius>

                    <MyBorderRadius>
                        <BookMarkRightMenu />
                    </MyBorderRadius>
                    <Box flexGrow={1} />
                    <MenuFooter/>

                </Box>
            </Box>

        </Drawer>
    )
}
