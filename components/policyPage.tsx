import Typography from "@mui/material/Typography";
import TitlePage from "./titlePage";

export default function PolicyPage({title, desc, lastEdit, children}: {title: string, desc: string, lastEdit: string, children: React.ReactNode | React.ReactNode[] }) {
    return (
        <TitlePage title={title} desc={desc}>
            <Typography sx={{ textAlign: "center" }}>{desc}</Typography>
            <Typography sx={{ textAlign: "center" }}><em>Última modificación: {lastEdit}</em></Typography>
            {children}
        </TitlePage>
    );
}