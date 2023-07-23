import Link from 'next/link'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import { useEffect, useState } from 'react';


export default function AndroidBar() {

    const [open, setOpen] = useState(false);

    let forceAndroid: boolean = process.env.NEXT_PUBLIC_FORCE_ANDROID !== undefined;

    var isMobile = {
        Android: () => navigator.userAgent.match(/Android/i) || forceAndroid,
        iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
        any: () => (isMobile.Android() || isMobile.iOS())
    };

    let hide = () => {
        localStorage.setItem('hideAndroidBar', '1');
        setOpen(false);
    }

    useEffect(() => {
        let hideAndroidBar = localStorage.getItem('hideAndroidBar');
        if (!hideAndroidBar) {
            setOpen(true);
        }
    })

    return (
        <Paper sx={{ position: "static", top: 0, zIndex: 10, display: isMobile.Android() && open ? 'inherit' : 'none' }} elevation={8}>
            <Container maxWidth="lg" sx={{ padding: "15px", display: "flex", gap: {xs: 1, sm: 4}, alignItems: "center", justifyContent: "center", flexDirection: {xs: "column", sm: "row"}, textAlign: "center" }}>
                ¿Utilizas Android? !Descarga la app!
                <Button variant="contained" href="/download" LinkComponent={Link}>Descargar</Button>
            </Container>
            <Button onClick={hide}>X</Button>
        </Paper>
    )
}