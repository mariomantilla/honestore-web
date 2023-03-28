import * as React from 'react';
import Image from 'next/image'
import logo from '../public/banner400.png'
import logoSquare from '../public/images/logo2000.jpg'
import playBadge from '../public/google-play-badge.png'
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import Instagram from '@mui/icons-material/Instagram';
import Email from '@mui/icons-material/Email';
import Link from 'next/link';


function Footer() {
  return (
    <footer>
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1, display: "flex", flexWrap: "wrap" }}>
          <Box sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center" }}>
            <Link href="/"><Image src={logo} alt="Honestore Logo" /></Link>
          </Box>
          <Box sx={{ display: { xs: "flex", lg: "none" }, alignItems: "center", flexGrow: 1, justifyContent: {xs: "center"} }}>
            <Image src={logoSquare} width={150} alt="Honestore Logo" />
          </Box>
          <Box sx={{ display: "flex", flexGrow: 1, color: "white", gap: 2.5, alignItems: "center", marginLeft: {xs: 0, lg: 2}, justifyContent: {xs: "center"}}}>
            <Link href="https://instagram.com/honestore.app" target="_blank" rel="noreferrer"><Instagram fontSize='large' /></Link>
            <Link href="mailto:info@honestore.app" target="_blank" rel="noreferrer"><Email fontSize='large' /></Link>
          </Box>
          <Box sx={{display: "flex", flexGrow: 1, justifyContent: "center", alignItems: "center"}}>
            <Link href="/download">
            <Image src={playBadge} width="200" alt="Honestore Logo" />
            </Link>
          </Box>
          <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "column", color: "white", fontSize: 18, gap: 1, textAlign: {xs: "center", sm: "right"}, flexBasis: "max-content", flexShrink: 0}}>
            <Link href="/terms">Términos y condiciones</Link>
            <Link href="/privacy">Política de privacidad</Link>
            <Link href="/feedback">Envíar comentarios</Link>
            <Link href="/add_shop">Incluye tu tienda</Link>
            <Link href="/files/DossierHonestore.pdf">Dossier de prensa</Link>
          </Box>
        </Box>
      </Container>
    </footer>
  );
}

export default Footer;

