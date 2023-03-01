import Box from "@mui/material/Box";


export default function Center({children}: {children: React.ReactNode | React.ReactNode[] }) {
    return (
        <Box sx={{display: "flex", justifyContent: "center"}}>
            {children}
        </Box>
    )
}