import React, { useState } from "react";
import { AppContext } from "../appContext";
import { BookmarkTools } from "./bookmarktools";
import { Avatar, Button, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { Bookmark, Delete, Folder } from "@mui/icons-material";

export const BookMarkRightMenu = () => {


    const [keyRefresh, setKeyRefresh] = useState(0)
    let bookmarkloaded = BookmarkTools.current.loadedData;
    let ctx = AppContext.current;


    return (
        <React.Fragment key={keyRefresh + ""}>
            <b>Bookmarks : </b><br />

            <List  >
                {
                    Object.keys(bookmarkloaded).map((key) => {
                        let cboook = bookmarkloaded[key];

                        return (
                            <ListItem
                                disablePadding
                                secondaryAction={
                                    <IconButton
                                        onClick={() => {
                                            let bm = BookmarkTools.current;
                                            bm.removeBookmark(cboook);
                                            setKeyRefresh(keyRefresh + 1);
                                        }}
                                        edge="end" aria-label="delete">
                                        <Delete />
                                    </IconButton>
                                }
                            >
                                <Button variant="text"

                                    onClick={() => {
                                        ctx.openMenu(false);
                                        ctx.openpage({
                                            pagetype: "surah",
                                            nomorayat: cboook.ayah + "",
                                            nomorsurah: cboook.surahid + "",
                                            scrollTo: cboook.ayah + "",
                                        })
                                    }}

                                    startIcon={<Bookmark />}
                                >
                                    <ListItemText>
                                        {cboook.name + " - " + cboook.ayah}
                                    </ListItemText>
                                </Button>
                            </ListItem> 
                        )
                    })
                }
            </List>
        </React.Fragment>
    )
}