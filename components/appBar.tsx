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
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase/InputBase';
import IconButton from '@mui/material/IconButton';
import { AccountCircle } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import LoginWidget from './loginWidget';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginRight: "auto",
  width: '100%',
  maxWidth: '500px'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  padding: 0,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

function ResponsiveAppBar() {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { searchQuery, setSearchQuery } = useSearchContext();
  const [loginOpen, setLoginOpen] = React.useState(false);
  const handleOpenLogin = () => { setLoginOpen(true); handleMenuClose(); };
  const handleCloseLogin = () => { setLoginOpen(false); handleMenuClose(); };

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
      <MenuItem onClick={handleOpenLogin}>Inicia sesión</MenuItem>
      <MenuItem onClick={handleOpenLogin}>Crear cuenta</MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}><Link href="/add_shop">Añade tu tienda</Link></MenuItem>
    </Menu>
  );

  const renderLoginModal = (<Modal
    open={loginOpen}
    onClose={handleCloseLogin}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Paper elevation={3}>
      <LoginWidget />
    </Paper>
  </Modal>);

  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 1 }}>
            <Link href="/">
              <Image src={logo} alt="Honestore Logo" width={35} sizes="70px" style={{ margin: "1rem" }} />
            </Link>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Buscar tiendas..."
                inputProps={{ 'aria-label': 'search' }}
                fullWidth
                onChange={(v) => { setSearchQuery(v.target.value) }}
              />
            </Search>
            <Button variant="contained" color="secondary" sx={{display: {xs: "none", sm: "inherit"}, flexShrink: 0}}>
              <Link href="/add_shop">Añade tu tienda</Link>
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
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMenu}
      {renderLoginModal}
    </>
  );
}
export default ResponsiveAppBar;