import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React from 'react';
import Divider from '@mui/material/Divider';
import Image from 'next/image'
import banner from '../public/banner-inverted.png'
import Center from '../components/center';
import Search from '@mui/icons-material/Search';
import { Diversity1, NavigateNext, Store } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { buttonStyles } from '../constants';
import NewShops from '../components/newShops';


export default function Home() {

	return (
		<>
			<Center sx={{ display: { xs: 'none', sm: 'flex' } }}>
				<Image src={banner} width={500} priority alt="Honestore, La comunidad de activistas del consumo ético" />
			</Center>
			<Center sx={{ display: { xs: 'flex', sm: 'none' } }}>
				<Image src={banner} width={300} priority alt="Honestore, La comunidad de activistas del consumo ético" />
			</Center>
			<Typography variant='h2' component="h1">La comunidad de activistas del consumo ético</Typography>
			<Typography variant='h4' component="div" sx={{ display: "flex", gap: 2, justifyContent: "center", alignItems: "center", marginBottom: "2rem" }}>
				¿Quieres saber más?
				<IconButton sx={buttonStyles} href="/about" LinkComponent={Link}>
					<NavigateNext />
				</IconButton>
			</Typography>
			<Divider />
			<Box sx={{ padding: "2rem", display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", gap: "1rem" }}>
				<Button variant="contained" startIcon={<Search />} LinkComponent={Link} href="/search" sx={{textAlign: "center"}}>
					Buscar tiendas sostenibles
				</Button>
				<Button variant="contained" startIcon={<Store />} LinkComponent={Link} href="/add_shop" sx={{textAlign: "center"}}>
					¿Tienes una tienda? Anádela
				</Button>
				<Button variant="contained" startIcon={<Diversity1 />} LinkComponent={Link} href="/signup" sx={{textAlign: "center"}}>
					Únete a la comunidad
				</Button>
			</Box>
			<Divider />
			<NewShops sx={{marginTop: "1.5rem"}} />
			<Fab color="primary" aria-label="add" sx={{ position: "fixed", bottom: "2em", right: "2em" }}>
				<Link href="/add_shop" style={{ lineHeight: "normal" }}>
					<AddIcon sx={{ color: "white" }} />
				</Link>
			</Fab>
		</>
	)
}
