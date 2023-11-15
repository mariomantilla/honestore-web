import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React from 'react';
import Divider from '@mui/material/Divider';
import Image from 'next/image'
import banner from '../public/banner-inverted.png'
import Center from '../components/center';
import Storefront from '@mui/icons-material/StorefrontTwoTone';
import ShoppingBasketTwoTone from '@mui/icons-material/ShoppingBasketTwoTone';
import NewShops from '../components/newShops';
import Categories from '../components/categories';


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
			<Box sx={{display: "flex", gap: 4, marginBottom: 2, flexDirection: "column"}}>
				<Box sx={{display: "flex", gap: 5, flexDirection: {xs: "column", sm: "row"}}}>
					<Box sx={{display: "flex", flex: "0 1 50%", alignItems: "center", flexDirection: "column", gap: 2}}>
						<Storefront fontSize='large' color='primary' />
						<Typography variant='h3' component="h2" sx={{textAlign: "center"}}>Comercios sostenibles</Typography>
						<Typography sx={{textAlign: "center"}}>
						Aumenta tu visibilidad, conecta con consumidores comprometidos 🤝
						y destaca tus prácticas responsables 📣. Atrae nuevos clientes y construye una
						comunidad que valora tu compromiso con la sostenibilidad 🌱
						</Typography>
						<Button variant='contained' href='/add_shop' LinkComponent={Link}>Añade tu comercio gratis</Button>
					</Box>
					<Box sx={{display: "flex", flex: "0 1 50%", alignItems: "center", flexDirection: "column", gap: 2}}>
						<ShoppingBasketTwoTone fontSize='large' color='primary' />
						<Typography variant='h3' component="h2" sx={{textAlign: "center"}}>Consumidores conscientes</Typography>
						<Typography sx={{textAlign: "center"}}>
						Encuentra comercios sostenibles cerca de ti 🏡. Filtra según tus valores e intereses
						en una comunidad que valora la sostenibilidad 🚴‍♂️. Honestore te lo pone más fácil para consumir de forma consciente 👍
						</Typography>
						<Button variant='contained' href='/search' LinkComponent={Link}>Comienza a buscar</Button>
					</Box>
				</Box>
			</Box>
			<Divider />
			<Categories />
			<Divider />
			<NewShops sx={{marginTop: "1.5rem"}} />
		</>
	)
}
