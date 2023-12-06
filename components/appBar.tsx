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
import { useSearchContext, viewsOptions } from "../context/search";
import { alpha, styled, SxProps } from '@mui/material/styles';
import { InputBase, InputBaseProps } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Map from '@mui/icons-material/Map';
import MenuIcon from '@mui/icons-material/Menu';
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
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useGlobalConfigContext } from '../context/globalConfig';
import Select from '@mui/material/Select';
import { Category } from '../models';
import List from '@mui/icons-material/List';
import Tooltip from '@mui/material/Tooltip';
import { useUserContext } from '../context/userData';
import Box from '@mui/material/Box';


const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	maxWidth: '200px'
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

const menuLinks = [
	// ['Conócenos', '/about'],
	['Mapa', '/search?view=map'],
	['Blog', '/blog'],
	['Para comercios', '/for-shops'],
];

function SearchInput(props: InputBaseProps) {

	const { searchQuery, updateUrl } = useSearchContext();
	const [text, setText] = useState('');

	useEffect(() => {
		setText(searchQuery);
	}, [searchQuery]);

	const buttonStyles: SxProps = {
		backgroundColor: alpha("#fff", .80),
		marginLeft: "-2.5rem",
		'&:hover': {
			backgroundColor: "#fff"
		},
		color: theme.palette.primary.main,
		transition: "opacity 500ms",
		opacity: 1
	}


	return (<Box sx={{display: "flex", flexGrow: 1, gap: 3, alignItems: "center", paddingRight: 2}}>
		<Search>
			<StyledInputBase
				placeholder="Buscar..."
				name='search-bar'
				inputProps={{ 'aria-label': 'buscar' }}
				fullWidth
				value={text}
				onChange={(e) => setText(e.target.value)}
				onKeyDown={(e) => { if (e.key == 'Enter') updateUrl({newQuery: text}) }}
				{...props}
			/>

		</Search>
		<IconButton onClick={() => { updateUrl({newQuery: text}) }} sx={buttonStyles} size={"small"} aria-label="Buscar" >
			<SearchIcon />
		</IconButton>
		<Box sx={{display: {xs: "none", sm: "flex"}, gap: 3}}>
			{menuLinks.map((item, i) => 
				<Link key={i} href={item[1]}>{item[0]}</Link>
			)}
		</Box>
	</Box>
	);

}

const StyledTagsFilter = styled(TextField)(({ theme }) => ({
	'& .MuiInputBase-root': {
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		borderRadius: "5px", //theme.shape.borderRadius,
		padding: theme.spacing(0.5, 1.5, 0.5, 1.5)
	},
	'& .MuiInputBase-input': {
		color: '#ffffff',
		padding: theme.spacing(1, 1, 1, 2),
		transition: theme.transitions.create('width'),
		width: '100%',
		minWidth: "100px !important"
	},
	'& .MuiButtonBase-root': {
		color: "#ffffff"
	},
	'& .MuiOutlinedInput-notchedOutline, .Mui-focused .MuiOutlinedInput-notchedOutline' :{
		borderWidth: 0,
		outline: 0,
	}
}));

const StyledCategoryFilter = styled(Select)(({ theme }) => ({
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	borderRadius: "5px", //theme.shape.borderRadius,
	padding: theme.spacing(0.5, 1.5, 0.5, 1.5),
	'& .MuiInputBase-input': {
		color: '#ffffff',
		padding: theme.spacing(1, 1, 1, 0),
		transition: theme.transitions.create('width'),
		width: '100%',
		minWidth: "100px !important",
		fontSize: '0.9rem'
	},
	'& .MuiButtonBase-root': {
		color: "#ffffff"
	},
	'& .MuiSelect-icon': {
		color: "#ffffff"
	},
	'& .MuiOutlinedInput-notchedOutline, .Mui-focused .MuiOutlinedInput-notchedOutline' :{
		borderWidth: 0,
		outline: 0,
	}
}));

function FiltersBar() {

	const { tags: selectedTags, category, view, updateUrl } = useSearchContext();
	const { tags, categories } = useGlobalConfigContext();
	const router = useRouter();

	const catsById = categories.reduce((result: { [key: string]: Category }, cat) => {
		result[cat.id.toString()] = cat;
		return result;
	}, {});

	return (
		<Container maxWidth="lg" sx={{
			display: router.pathname == '/search' ? "flex" : "none",
			justifyContent: "center",
			paddingBottom: 1,
			flexWrap: "wrap",
			gap: 2
		}}>
			<StyledCategoryFilter
				renderValue={v => v ? catsById[v as string].name : 'Categoría'}
				value={category?.id??''}
				displayEmpty={true}
				name='category-filter'
				onChange={e => {
					updateUrl({
						newCat: e.target.value != '' ? catsById[e.target.value as string] : null
					})
				}}
			>
				<MenuItem value={''}>Todas</MenuItem>
				{categories.map(c => (
					<MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
				))}
			</StyledCategoryFilter>
			<Autocomplete
				multiple
				limitTags={2}
				id="filterByImpact"
				options={tags}
				value={selectedTags}
				onChange={(e, val) => updateUrl({newTags: val})}
				getOptionLabel={(option) => option.name}
				renderInput={(params) => (
					<StyledTagsFilter {...params} name="tags-filter" placeholder="Añadir Filtro" />
				)}
				filterSelectedOptions={true}
				isOptionEqualToValue={(a,b) => a.id == b.id}
				sx={{ minWidth: {sx: "200px", sm: '300px'}}}
			/>
			<Tooltip title={view == viewsOptions.list ? 'Ver mapa' : 'Ver lista' }>
				<Button variant='contained' color='secondary' onClick={() => {
					updateUrl({newView: view == viewsOptions.list ? viewsOptions.map : viewsOptions.list }) 
				}}>
					{ view == viewsOptions.list ? <Map /> : <List /> }
				</Button>
			</Tooltip>
		</Container>
	);
}

function ResponsiveAppBar() {

	const user = useUser()
	const { profile } = useUserContext();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [anchorMainEl, setAnchorMainEl] = useState<null | HTMLElement>(null);
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
	const isMainMenuOpen = Boolean(anchorMainEl);

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleMainMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorMainEl(event.currentTarget);
	};

	const handleMainMenuClose = () => {
		setAnchorMainEl(null);
	};

	const accountMenuId = 'primary-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			id={accountMenuId}
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
					<MenuItem key="shops" onClick={handleMenuClose} component={Link} href="/my_shops">Mis comercios</MenuItem>,
					<Divider key="div2" />,
					<MenuItem key="logout" onClick={() => { handleMenuClose(); supabase.auth.signOut(); }}>Cerrar Sesión</MenuItem>
				]
			) : (
				[
					<MenuItem key="login" onClick={handleOpenLogin}>Inicia sesión</MenuItem>,
					<MenuItem key="singup" component={Link} href="/signup">Crear cuenta</MenuItem>,
					<Divider key="div" />,
					<MenuItem key="addShop" onClick={handleMenuClose} component={Link} href="/add_shop">Añade tu comercio gratis</MenuItem>,
				]
			)}
		</Menu>
	);

	const mainMenuId = 'primary-menu';
	const renderMainMenu = (
		<Menu
			anchorEl={anchorMainEl}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			id={mainMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMainMenuOpen}
			onClose={handleMainMenuClose}
		>
			{menuLinks.map((item, i) => 
				<MenuItem key={i} onClick={handleMainMenuClose} component={Link} href={item[1]}>{item[0]}</MenuItem>
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
			<AppBar position="sticky" sx={{ marginBottom: "1rem" }}>
				<Container maxWidth="lg">
					<Toolbar disableGutters sx={{ gap: 1 }}>
						<Link href="/">
							<Image src={logo} alt="Honestore Logo" width={35} sizes="70px" style={{ margin: "1rem" }} />
						</Link>
						<SearchInput />
						<Button
							variant="contained"
							color="secondary"
							sx={{ display: { xs: "none", md: "inherit" }, flexShrink: 0 }}
							LinkComponent={Link}
							href="/add_shop"
						>
							Añade tu comercio gratis
						</Button>
						<IconButton
							size="large"
							edge="end"
							aria-label="menu de usuario"
							aria-controls={accountMenuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<UserAvatar profile={profile} />
						</IconButton>
						<IconButton
							size="large"
							edge="end"
							aria-label="menu principal"
							aria-controls={mainMenuId}
							aria-haspopup="true"
							onClick={handleMainMenuOpen}
							color="inherit"
							sx={{display: {sx: "inherit", sm: "none"}}}
						>
							<MenuIcon />
						</IconButton>
					</Toolbar>
				</Container>
				<FiltersBar />
				<Loader />
			</AppBar>
			{renderMenu}
			{renderMainMenu}
			{renderLoginModal}
		</>
	);
}
export default ResponsiveAppBar;