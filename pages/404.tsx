import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from 'next/link'

export default function FourOhFour() {
    return (
        <Box>
            <h1>Opps, parece que nos hemos perdido</h1>
            <p>
                No hemos encontrado la página que buscabas, comprueba el enlace o vuelve al inicio.
            </p>
            <Button variant='contained' sx={{color: "white"}}>
                <Link href="/">
                    Volver
                </Link>
            </Button>
        </Box>
    )
}