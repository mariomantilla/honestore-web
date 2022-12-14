import Link from 'next/link'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'


export default function AndroidBar() {

    var isMobile = {
        Android: () => navigator.userAgent.match(/Android/i),
        iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
        any: () => (isMobile.Android() || isMobile.iOS())
    };

    return (
        <Paper sx={{ position: "sticky", top: 0, zIndex: 10, display: isMobile.Android() ? 'inherit' : 'none' }} elevation={8}>
            <Container maxWidth="lg" sx={{ padding: "15px 0", display: "flex", gap: 4, alignItems: "center", justifyContent: "center" }}>
                ¿Utilizas Android? Descarga la app, ¡es aun mejor!
                <Button variant="contained"><Link href="/download">Descargar</Link></Button>
            </Container>
        </Paper>
    )
}