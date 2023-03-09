import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import OverrideHead from "./head";

export default function TitlePage(props: {title: string, desc?: string, children: React.ReactNode | React.ReactNode[] }) {
    return (
        <>
            <OverrideHead title={props.title +' - Honestore'} description={props.desc} />
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <Typography variant="h1" component="h1">{props.title}</Typography>
                <Divider />
                {props.children}
            </Box>
        </>
    );
}