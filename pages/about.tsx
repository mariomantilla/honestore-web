import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Head from "next/head";
import Link from "next/link";

import appMockup from "../public/images/mobile.png"
import sinergias from "../public/images/sinergias.jpg"
import appMockup2 from "../public/images/mobile2.png"
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import ResponsiveImage from "../components/responsiveImage";
import Send from '@mui/icons-material/Send';
import React from "react";


export default function AboutPage() {

    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [snackBarMessage, setsnackBarMessage] = React.useState('');

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const desc = `Honestore es un proyecto que nace con la intención de formar una
        comunidad de personas unidas por el propósito de cambiar sus
        hábitos hacia un consumo consciente y basado en valores como el
        respeto al medio ambiente, los derechos humanos y la justicia y el
        impacto social.)`

    async function addContact() {
        const response = await fetch("/api/addContact", {
            method: "POST",
            body: JSON.stringify({ email: email }),
        });
        if (response.status == 200) {
            setsnackBarMessage('Te has suscrito correctamente, por favor verifica tu email');
            setOpen(true);
        } else {
            setsnackBarMessage('Ha ocurrido un error');
            setOpen(true);
        }
    }

    const SendButton = <Button onClick={addContact}><Send /></Button>

    return (
        <>
            <Head>
                <title>Sobre Honestore</title>
                <meta name="description" content={desc} />
                <meta property="og:title" content="Sobre Honestore" />
                <meta property="og:description" content={desc} />
            </Head>
            <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box>
                    <Typography variant="h1" component="h1">Honestore</Typography>
                    <Typography variant="h2" component="h2">La comunidad de activistas del consumo ético</Typography>
                </Box>
                <Divider></Divider>
                <Grid container spacing={2} sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}>
                    <Grid item sm={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
                        <ResponsiveImage image={appMockup} width="500px" alt="Honestore app mock up" />
                    </Grid>
                    <Grid item sm={12} md={6} sx={{ display: "flex", justifyContent: "center", alignItems: { xs: "center", md: "end" }, flexDirection: "column" }}>
                        <Typography variant="h2" component="h2">Juntos, hacemos más</Typography>
                        <Typography variant="h4" sx={{ textAlign: { xs: "center", md: "right" } }} component="div">
                            Somos una red de personas y tiendas unidas por cambiar hacia un consumo consciente y basado en valores sociales y medioambientales.
                        </Typography>
                        <TextField id="outlined-basic" onChange={(e) => setEmail(e.target.value)} fullWidth placeholder="Suscribete al newsletter" size="small" variant="outlined" sx={{ marginTop: 2 }} InputProps={{ endAdornment: SendButton }} />
                        <Typography variant="caption">He leído y acepto la <Link href="/privacy">Política de Privaciad</Link></Typography>
                    </Grid>
                </Grid>
                <Divider></Divider>
                <Grid container spacing={2}>
                    <Grid item sm={12} md={6} sx={{ display: "flex", justifyContent: "center", alignItems: { xs: "center", md: "start" }, flexDirection: "column" }}>
                        <Typography variant="h2" component="h2">Creando sinergias</Typography>
                        <Typography variant="h4" sx={{ textAlign: { xs: "center", md: "left" } }} component="div">
                            Empresas que se ofrecen servicios entre ellas para ser más sustentables y consumidores que colaboran para mejorar sus hábitos de consumo.
                        </Typography>
                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                            <Typography>¿Tienes un emprendimieto sostenible?</Typography>
                            <Button variant='contained'><Link href="/about">Únete</Link></Button>
                        </Box>
                    </Grid>
                    <Grid item sm={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
                        <ResponsiveImage image={sinergias} width="500px" alt="Honestore crea sinergias" />
                    </Grid>
                </Grid>
                <Divider></Divider>
                <Grid container spacing={2} sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}>
                    <Grid item sm={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
                        <ResponsiveImage image={appMockup2} width="400px" alt="Honestore app mock up" />
                    </Grid>
                    <Grid item sm={12} md={6} sx={{ display: "flex", justifyContent: "center", alignItems: { xs: "center", md: "end" }, flexDirection: "column" }}>
                        <Typography variant="h2" component="h2">Buscador de emprendimientos</Typography>
                        <Typography variant="h4" sx={{ textAlign: { xs: "center", md: "right" } }} component="div">
                            Encuentra tiendas cercanas en el mapa, guarda tus preferidas en favoritos,
                            accede a sus datos y redes sociales o compartir la localización a una aplicación de navegación.
                        </Typography>
                        <Box sx={{ display: "flex", gap: 2, marginTop: 3 }}>
                            <Button variant='contained'><Link href="/">Pruébalo en la web</Link></Button>
                            <Button variant='contained'><Link href="/download">Pruébalo en app para Android</Link></Button>
                        </Box>
                    </Grid>
                </Grid>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={snackBarMessage}
                />
            </Container>
        </>
    )
}