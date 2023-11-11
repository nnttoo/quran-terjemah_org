import { Button, Link, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { MyBorderRadius } from "./myradius"
import * as WailsGo from "../../../wailsjs/go/main/App"
import { Public, Web } from "@mui/icons-material"

const ButtonLink = (prop: { url: string, name: string }) => {
    return (
        <ListItemButton

            onClick={() => {
                WailsGo.OpenUrl(prop.url);
            }}
        >
            <ListItemIcon ><Public /></ListItemIcon>
            <ListItemText ><div style={{ fontSize: "13px" }}>{prop.name}</div></ListItemText>
        </ListItemButton>
    )
}

export const MenuFooter = () => {
    return (
        <MyBorderRadius>
            <>
            <List>
                <ButtonLink
                    name="PT.Oricar Ori Indonesia"
                    url="https://oriindonesia.com"
                />

                <ButtonLink
                    name="Quran-Terjemah.org"
                    url="https://quran-terjemah.org" />
            </List>
            
            <Typography textAlign="center" fontSize="13px">
                Quran-Terjemah App (v-01) 
            </Typography>
            </>
        </MyBorderRadius>
    )
}