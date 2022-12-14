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
import Underline from '../components/underline';


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

  useEffect(() => {
    getShops(supabase, searchQuery).then((shopsData) => setShops(shopsData));
  }, [searchQuery, supabase]);



  return (
    <>
      <Typography variant='h2' component="h1">La comunidad de activistas del consumo ético</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={3}>
          <Typography variant='h4' component="div" sx={{marginBottom: 1.3}}><Underline>Sobre Honestore</Underline></Typography>
          <Typography component="h2" variant="subtitle1" sx={{marginBottom: 1.3}}>
            Honestore es un proyecto que nace con la intención de formar una
            comunidad de personas unidas por el propósito de cambiar sus
            hábitos hacia un consumo consciente y basado en valores como el
            respeto al medio ambiente, los derechos humanos y la justicia y el
            impacto social.
          </Typography>
          <Box sx={{display: "flex", justifyContent: "center"}}>
            <Button variant='contained'><Link href="/about">Saber más</Link></Button>
          </Box>
        </Grid>
        <Grid item xs={12} lg={9}>
          <TextField id="outlined-basic" fullWidth placeholder="Buscar tiendas y emprendimientos" variant="outlined" onChange={(v) => { setSearchQuery(v.target.value) }} />
          <ShopList shops={shops}></ShopList>
        </Grid>
      </Grid>
      <Fab color="primary" aria-label="add" sx={{ position: "fixed", bottom: "2em", right: "2em" }}>
        <Link href="/add_shop" style={{ lineHeight: "normal" }}>
          <AddIcon sx={{ color: "white" }} />
        </Link>
      </Fab>
    </>
  )
}
