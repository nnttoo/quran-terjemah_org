import { Box } from "@mui/material"

export const MyBorderRadius = (props: {
    children: JSX.Element
}) => {
    return (
        <Box boxShadow={2} p={2} border="1px solid #ccc" borderRadius={1}>
            {props.children}
        </Box>
    )
}