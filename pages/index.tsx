import { SupabaseClient, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react';
import ShopList from '../components/shopList';
import TextField from '@mui/material/TextField';
import Shop from '../models/Shop';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React from 'react';
import Send from '@mui/icons-material/Send';
import Snackbar from '@mui/material/Snackbar';
import Divider from '@mui/material/Divider';


async function getShops(supabase: SupabaseClient, searchQuery: string): Promise<Shop[] | null> {
  try {
    let { data, error, status } = await supabase
      .rpc('search_shops', { search: searchQuery });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.log(error);
    return []
  }
}

export default function Home() {
  const [shops, setShops] = useState<Shop[] | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const supabase = useSupabaseClient();

  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [snackBarMessage, setsnackBarMessage] = React.useState('');

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getShops(supabase, searchQuery).then((shopsData) => setShops(shopsData));
  }, [searchQuery, supabase]);

  async function addContact() {
    const response = await fetch("/api/addContact", {
      method: "POST",
      body: JSON.stringify({ email: email }),
    });
    if (response.status == 200) {
      setsnackBarMessage('Te has suscrito correctamente, por favor verifica tu email');
      setOpen(true);
    } else {
      setsnackBarMessage('Ha ocurrido un error');
      setOpen(true);
    }
  }

  const SendButton = <Button onClick={addContact}><Send /></Button>


  return (
    <>
      <Typography variant='h2' component="h1">La comunidad de activistas del consumo ??tico</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={3}>
          <Typography component="h2" variant="subtitle1" sx={{ marginBottom: 1.3 }}>
            Somos una red de personas y tiendas unidas por cambiar hacia un consumo consciente y basado en valores sociales y medioambientales.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant='contained'><Link href="/about">Saber m??s</Link></Button>
          </Box>
          <TextField id="outlined-basic" onChange={(e) => setEmail(e.target.value)} fullWidth placeholder="Suscribete al newsletter" size="small" variant="outlined" sx={{ marginTop: 2 }} InputProps={{ endAdornment: SendButton }} />
          <Typography variant="caption">He le??do y acepto la <Link href="/privacy">Pol??tica de Privaciad</Link></Typography>
          <Divider sx={{marginTop: 1.5, display: {lg: "none"}}} />
        </Grid>
        <Grid item xs={12} lg={9}>
          <TextField id="outlined-basic" fullWidth placeholder="Buscar tiendas y emprendimientos" variant="outlined" size="small" onChange={(v) => { setSearchQuery(v.target.value) }} />
          <ShopList shops={shops}></ShopList>
        </Grid>
      </Grid>
      <Fab color="primary" aria-label="add" sx={{ position: "fixed", bottom: "2em", right: "2em" }}>
        <Link href="/add_shop" style={{ lineHeight: "normal" }}>
          <AddIcon sx={{ color: "white" }} />
        </Link>
      </Fab>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackBarMessage}
      />
    </>
  )
}
