import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Head from "next/head";

export default function PolicyPage({title, desc, children}: {title: string, desc: string, children: React.ReactNode | React.ReactNode[] }) {
    const titleText = "Honestore - " + title;
    return (
        <>
            <Head>
                <title>{titleText}</title>
                <meta name="description" content={desc} />
                <meta property="og:title" content={titleText} />
                <meta property="og:description" content={desc} />
            </Head>
            <Container maxWidth="lg">
                <Typography variant="h1" component="h1">{title}</Typography>
                <Typography sx={{ textAlign: "center" }}>{desc}</Typography>
                <Typography sx={{ textAlign: "center" }}><em>Última modificación: 11/11/2022</em></Typography>
            </Container>
            {children}
        </>
    );
}