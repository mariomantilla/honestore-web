import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import logo from '../public/images/logo2000.jpg'
import Link from 'next/link';
import { useSearchContext } from "../context/search";
import { alpha, styled, SxProps } from '@mui/material/styles';
import InputBase, { InputBaseProps } from '@mui/material/InputBase/InputBase';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import LoginWidget from './loginWidget';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import { useEffect, useState } from 'react';
import { theme } from '../constants';
import Loader from './loader';
import UserAvatar from './userAvatar';
import { useUserContext } from '../context/userData';


const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	maxWidth: '500px'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	padding: 0,
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 2),
		transition: theme.transitions.create('width'),
		width: '100%',
	},
}));

function SearchInput(props: InputBaseProps) {

	const { searchQuery, updateSearch } = useSearchContext();
	const [text, setText] = useState('');

	useEffect(() => {
		setText(searchQuery);
	}, [searchQuery]);

	const buttonStyles: SxProps = {
		backgroundColor: alpha("#fff", .80),
		marginLeft: "-1.5rem",
		'&:hover': {
			backgroundColor: "#fff"
		},
		color: theme.palette.primary.main,
		transition: "opacity 500ms",
		opacity: 1
	}


	return (<>
		<Search>
			<StyledInputBase
				placeholder="Buscar tiendas..."
				inputProps={{ 'aria-label': 'buscar' }}
				fullWidth
				value={text}
				onChange={(e) => setText(e.target.value)}
				onKeyDown={(e) => { if (e.key == 'Enter') updateSearch(text) }}
				{...props}
			/>

		</Search>
		<IconButton onClick={() => { updateSearch(text) }} sx={buttonStyles} size={"small"} >
			<SearchIcon />
		</IconButton>
		<Button
			variant="contained"
			color="secondary"
			sx={{ display: { xs: "none", sm: "inherit" }, flexShrink: 0, marginRight: "auto" }}
			LinkComponent={Link}
			href="/search"
		>
			Ver tiendas
		</Button>
	</>
	);

}

function ResponsiveAppBar() {

	const user = useUser()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [loginOpen, setLoginOpen] = useState(false);
	const handleOpenLogin = () => { setLoginOpen(true); handleMenuClose(); };
	const handleCloseLogin = () => { setLoginOpen(false); handleMenuClose(); };
	const router = useRouter();

	supabase.auth.onAuthStateChange((event, session) => {
		if (event == 'PASSWORD_RECOVERY') {
			router.push('/account')
		}
	})

	const isMenuOpen = Boolean(anchorEl);

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			{user ? (
				[
					<MenuItem key="email" sx={{ pointerEvents: 'none' }}>{user.email}</MenuItem>,
					<Divider key="div1" />,
					<MenuItem key="account" onClick={handleMenuClose} component={Link} href="/account">Cuenta</MenuItem>,
					<MenuItem key="favs" onClick={handleMenuClose} component={Link} href="/favourites">Favoritos</MenuItem>,
					<MenuItem key="shops" onClick={handleMenuClose} component={Link} href="/my_shops">Mis tiendas</MenuItem>,
					<Divider key="div2" />,
					<MenuItem key="logout" onClick={() => { handleMenuClose(); supabase.auth.signOut(); }}>Cerrar Sesión</MenuItem>
				]
			) : (
				[
					<MenuItem key="login" onClick={handleOpenLogin}>Inicia sesión</MenuItem>,
					<MenuItem key="singup" onClick={handleOpenLogin}>Crear cuenta</MenuItem>,
					<Divider key="div" />,
					<MenuItem key="addShop" onClick={handleMenuClose} component={Link} href="/add_shop">Añade tu tienda gratis</MenuItem>,
				]
			)}
		</Menu>
	);

	const renderLoginModal = (<Modal
		open={loginOpen}
		onClose={handleCloseLogin}
		aria-labelledby="modal-modal-title"
		aria-describedby="modal-modal-description"
	>
		<Paper elevation={3} sx={{padding: 2}}>
			<LoginWidget />
		</Paper>
	</Modal>);

	return (
		<>
			<AppBar position="sticky" sx={{ marginBottom: "2.5rem" }}>
				<Container maxWidth="lg">
					<Toolbar disableGutters sx={{ gap: 1 }}>
						<Link href="/">
							<Image src={logo} alt="Honestore Logo" width={35} sizes="70px" style={{ margin: "1rem" }} />
						</Link>
						<SearchInput />
						<Button
							variant="contained"
							color="secondary"
							sx={{ display: { xs: "none", sm: "inherit" }, flexShrink: 0 }}
							LinkComponent={Link}
							href="/add_shop"
						>
							Añade tu tienda gratis
						</Button>
						<IconButton
							size="large"
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<UserAvatar uuid={user?.id} />
						</IconButton>
					</Toolbar>
				</Container>
				<Loader />
			</AppBar>
			{renderMenu}
			{renderLoginModal}
		</>
	);
}
export default ResponsiveAppBar;