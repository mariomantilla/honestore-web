import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Link from 'next/link'
import logoSad from '../public/logo-sad.png'
import Divider from '@mui/material/Divider'
import Image from 'next/image'


export default function FourOhFour() {
    return (
        <Container maxWidth="lg" sx={{display: "flex", flexDirection: "column", gap: "2rem", alignItems: "center"}}>
            <Typography variant="h1" component="h1">Opps, parece que nos hemos perdido</Typography>
            <Divider />
            <Image src={logoSad} width={150} alt="No hay resultados" />
            <Typography>No hemos encontrado la página que buscabas, comprueba el enlace o vuelve al inicio.</Typography>
            <Button variant='contained' LinkComponent={Link} href="/">
                Volver
            </Button>
        </Container>

    )
}