import { useEffect, useState } from 'react';
import ShopList from '../components/shopList';
import Shop from '../models';
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
import { DataService } from '../lib/data';
import Search from '@mui/icons-material/Search';
import { Diversity1, NavigateNext, Store } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { SxProps } from '@mui/material/styles';
import { theme } from '../constants';


export default function Home() {

	const [shops, setShops] = useState<(Shop | null)[]>(new Array(10).fill(null));

	useEffect(() => {
		DataService.newShops().then((resp) => setShops(resp.data ?? []));
	}, []);

	const buttonStyles: SxProps = {
		backgroundColor: theme.palette.primary.main,
		'&:hover': {
			backgroundColor: theme.palette.primary.dark
		},
		color: "#fff"
	}

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
				<Button variant="contained" startIcon={<Search />} LinkComponent={Link} href="/search">
					Buscar tiendas sostenibles
				</Button>
				<Button variant="contained" startIcon={<Store />} LinkComponent={Link} href="/add_shop">
					¿Tienes una tienda? Anádela
				</Button>
				<Button variant="contained" startIcon={<Diversity1 />} LinkComponent={Link} href="/signup">
					Únete a la comunidad
				</Button>
			</Box>
			<Divider />
			<Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, marginTop: "2rem" }}>
				<Typography variant='h3'>Novedades</Typography>
				<ShopList shops={shops}></ShopList>
			</Box>
			<Fab color="primary" aria-label="add" sx={{ position: "fixed", bottom: "2em", right: "2em" }}>
				<Link href="/add_shop" style={{ lineHeight: "normal" }}>
					<AddIcon sx={{ color: "white" }} />
				</Link>
			</Fab>
		</>
	)
}
