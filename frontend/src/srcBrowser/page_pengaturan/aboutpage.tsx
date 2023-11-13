import { Box, Button, Link, Typography } from "@mui/material"
import Markdown from "markdown-to-jsx"
import React from "react"
import { AppContext } from "../appContext" 

import * as WailsGo from "../../../wailsjs/go/main/App"
 
export const AboutPage = () => {

    let ctx = AppContext.current;
    let about = ctx.bahasa.ap_about;

    return (
        <Box>
            <Typography >
            <Markdown options={{
                forceBlock: true,
                createElement: (tag: any, props: any, children: any) => {
                    if (tag == "a") {
                        return (
                        <a  
                        style={{ 
                            cursor : "pointer", 
                            color : "#347deb"
                        }}
                        onClick={()=>{
                            if(props.href){
                                WailsGo.OpenUrl(props.href);
                            }
                        }}
                         >
                            {children}
                        </a>

                        )
                    } else {
                        return React.createElement(tag, props, children);
                    }
                }
            }}>
                {about}
            </Markdown>
            </Typography>
        </Box>
    )
}