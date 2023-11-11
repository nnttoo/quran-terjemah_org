import React from "react";
import { AppContext } from "../appContext";
import { BookmarkTools } from "./bookmarktools";
import { SurahData } from "../../surahtools/dbtype";
import { Button, Fab, IconButton } from "@mui/material";
import { BookRounded, BookmarkAdd } from "@mui/icons-material";


type BookmarkButProp = {
    sd: SurahData,
    ayah: number,
}

type BookmarkButState = {
    isbookmarked: boolean
}

export class BookmarkBut extends React.Component<BookmarkButProp, BookmarkButState>{

    checkBookmark() {
        let bookmarkcheck = BookmarkTools.current.getBookMark({
            ayah: this.props.ayah,
            slug: this.props.sd.slug,
        })

        let bookmark = false;
        if (bookmarkcheck != null) {
            bookmark = true;
        }

        this.setState({
            isbookmarked: bookmark,
        })
    }

    componentDidMount(): void {
        this.checkBookmark();
    }

    render(): React.ReactNode {
        let isbookmarked = false;
        if (this.state) {
            isbookmarked = this.state.isbookmarked;
        }


        let cssClassBookmark = "primary";
        if (isbookmarked) {
            cssClassBookmark = "scundary";
        }


        return (
            <Fab color={cssClassBookmark as any} aria-label="add"
                size="small"

                onClick={() => {
                    if (!isbookmarked) {
                        BookmarkTools.current.saveBookmark({
                            ayah: this.props.ayah,
                            name: this.props.sd.nama_surah,
                            slug: this.props.sd.slug,
                            surahid : this.props.sd.id,
                        })
                    } else {
                        BookmarkTools.current.removeBookmark({
                            ayah: this.props.ayah,
                            name: this.props.sd.nama_surah,
                            slug: this.props.sd.slug,
                            
                            surahid : this.props.sd.id,
                        })
                    }


                    this.checkBookmark();
                    let ctx = AppContext.current;
                    ctx.openMenu(true);
                }}
            >
                <BookmarkAdd />
            </Fab>
        )
    }
}