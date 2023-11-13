import React, { useState } from "react";
import { LatestPlayMark } from "./latestplay_mark";
import { AppContext } from "../appContext";
import { Button, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { Bookmark } from "@mui/icons-material";

export const LatestPlayRightMenu = () => {


    let bookmarkloaded = LatestPlayMark.current.latestPlay;
    let ctx = AppContext.current;


    return (
        <React.Fragment >
            <b>{ctx.bahasa.lmm_last_played} : </b><br />
            {bookmarkloaded != null ? (
                <List  >
                    <ListItem
                        disablePadding
                    >
                        <Button variant="text"

                            onClick={() => {
                                ctx.openMenu(false);
                                ctx.openpage({
                                    pagetype: "surah",
                                    nomorayat: bookmarkloaded?.ayah + "",
                                    nomorsurah: bookmarkloaded?.surahid + "",
                                    scrollTo: bookmarkloaded?.ayah + "",
                                })
                            }}

                            startIcon={<Bookmark />}
                        >
                            <ListItemText>
                                {bookmarkloaded.name + " - " + bookmarkloaded.ayah}
                            </ListItemText>
                        </Button>
                    </ListItem>
                </List>
            ) : <></>


            }


        </React.Fragment>
    )
}