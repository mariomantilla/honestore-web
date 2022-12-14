import Link from 'next/link'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'


export default function AndroidBar() {

    let forceAndroid: boolean =  process.env.FORCE_ANDROID !== undefined;

    var isMobile = {
        Android: () => navigator.userAgent.match(/Android/i) || forceAndroid,
        iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
        any: () => (isMobile.Android() || isMobile.iOS())
    };

    return (
        <Paper sx={{ position: "sticky", top: 0, zIndex: 10, display: isMobile.Android() ? 'inherit' : 'none' }} elevation={8}>
            <Container maxWidth="lg" sx={{ padding: "15px", display: "flex", gap: {xs: 1, sm: 4}, alignItems: "center", justifyContent: "center", flexDirection: {xs: "column", sm: "row"}, textAlign: "center" }}>
                ¿Utilizas Android? Descarga la app, ¡es aun mejor!
                <Button variant="contained"><Link href="/download">Descargar</Link></Button>
            </Container>
        </Paper>
    )
}