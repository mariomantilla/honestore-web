import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Link from 'next/link'

export default function FourOhFour() {
    return (
        <Container maxWidth="lg">
            <Typography variant="h1" component="h1">Opps, parece que nos hemos perdido</Typography>
            <Typography sx={{ textAlign: "center" }}>No hemos encontrado la página que buscabas, comprueba el enlace o vuelve al inicio.</Typography>
            <Box sx={{display: "flex", justifyContent: "center"}}>
            <Button variant='contained' sx={{ color: "white" }}>
                <Link href="/">
                    Volver
                </Link>
            </Button>
            </Box>
        </Container>

    )
}