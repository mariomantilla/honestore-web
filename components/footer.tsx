import * as React from 'react';
import Image from 'next/image'
import logo from '../public/banner400.png'
import Box from '@mui/material/Box';


function Footer() {
    return (
    <footer>
        <Box sx={{display: {xs: "none", sm: "block"}}}>
          <Image src={logo} alt="Honestore Logo" />
        </Box>
    </footer>
    );
}

export default Footer;

