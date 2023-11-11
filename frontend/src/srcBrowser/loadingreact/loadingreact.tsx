import { CircularProgress, Stack } from "@mui/material";
import React from "react";


export const LoadingReact = ()=>{
    return (
        <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            marginTop={2}
        >
            <CircularProgress color="secondary" />
            <CircularProgress color="success" />
            <CircularProgress color="inherit" />
        </Stack>
    )
}