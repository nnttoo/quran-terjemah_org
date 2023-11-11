import React from "react";
import { AppContext } from "./appContext";
import { RightMenu } from "./menuelem/rightMenu";
import { IconButton, AppBar, Toolbar, Box, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";

export class TopFrame extends React.Component {



    render(): React.ReactNode {
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
            <RightMenu  />
            </>
            // <div>
            //     <div className="navbar fixed-top navbar-light bg-white shadow topframe">
            //         <div
            //             onClick={() => {
            //                 let ctx = AppContext.current;
            //                 ctx.openpage({
            //                     nomorayat : "1",
            //                     nomorsurah : "1",
            //                     pagetype : "home",
            //                 })
            //             }}
            //             className="logodantext">

            //             <img src="/style/qrn_logo.png" alt="quran logo" />
            //             <div className="ttl">Quran-Terjemah.org </div>
            //         </div>

            //         <IconButton>
            //             <Menu/>
            //         </IconButton>

            //         <span
            //             onClick={() => {
            //                 ctx.refMenuElem.current?.togleOpenClose();
            //             }}
            //             id="menubutton" className="material-icons">
            //             settings
            //         </span>
            //     </div>
            //     <RightMenu ref={ctx.refMenuElem} />
            // </div>

        )

        // return (
        //     <div className="navbar fixed-top navbar-light bg-light">
        //         <div className="container-fluid">
        //             <div className="navbar-header">
        //                 <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        //                     <span className="sr-only">Toggle navigation</span>
        //                     <span className="icon-bar"></span>
        //                     <span className="icon-bar"></span>
        //                     <span className="icon-bar"></span>
        //                 </button>
        //                 <a className="navbar-brand" href="#">Brand</a>
        //             </div>
        //         </div>
        //     </div>
        // )
    }
}