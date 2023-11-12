import { Box, Button, CircularProgress, Grid, Stack } from "@mui/material"
import React from "react"

export const LoadingPage = (prop: React.PropsWithChildren) => {

    return (
        <Grid
            container
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            spacing={0}
            direction="column"
            boxSizing="border-box"
            alignItems="center"
            justifyContent="center"

        >
            <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                <CircularProgress color="secondary" />
                <CircularProgress color="success" />
                <CircularProgress color="inherit" />
            </Stack>

            <Box marginTop={10}>

                {prop.children}
            </Box>

        </Grid>

    )
}

export const LoadingElement = () => {
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

