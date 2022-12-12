import * as React from 'react';
import Image from 'next/image'
import logo from '../public/banner.png'


function Footer() {
    return (
    <footer>
        <span>
          <Image src={logo} width="400" alt="Honestore Logo" />
        </span>
    </footer>
    );
}

export default Footer;

