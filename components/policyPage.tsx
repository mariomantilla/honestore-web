import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TitlePage from "./titlePage";

export default function PolicyPage({title, desc, children}: {title: string, desc: string, children: React.ReactNode | React.ReactNode[] }) {
    return (
        <TitlePage title={title} desc={desc}>
            <Typography sx={{ textAlign: "center" }}>{desc}</Typography>
            <Typography sx={{ textAlign: "center" }}><em>Última modificación: 11/11/2022</em></Typography>
            {children}
        </TitlePage>
    );
}