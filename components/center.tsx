import Box, { BoxProps } from "@mui/material/Box";


export default function Center({ children, ...props }: BoxProps) {
    props.sx = {
        ...{display: "flex", justifyContent: "center", flexDirection: "column", width: "100%", alignItems: "center"},
        ...props.sx
    }
    return (
        <Box {...props}>
            {children}
        </Box>
    )
}