import { SupabaseClient, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react';
import ShopList from '../components/shopList';
import TextField from '@mui/material/TextField';
import Shop from '../models/Shop';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Link from 'next/link';


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
      <TextField id="outlined-basic" fullWidth placeholder="Buscar tiendas y emprendimientos" variant="outlined" onChange={(v) => { setSearchQuery(v.target.value) }} />
      <ShopList shops={shops}></ShopList>
      <Fab color="primary" aria-label="add" sx={{position: "fixed", bottom: "2em", right: "2em"}}>
        <Link href="/add_shop" style={{lineHeight:"normal"}}>
        <AddIcon sx={{color: "white"}} />
        </Link>
      </Fab>
    </>
  )
}
