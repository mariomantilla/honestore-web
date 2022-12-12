import { SupabaseClient, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react';
import ShopList from '../components/shopList';
import TextField from '@mui/material/TextField';
import Shop from '../models/Shop';

async function getShops(supabase: SupabaseClient, searchQuery: string): Promise<Shop[] | null> {
  console.log('getting shops');
  try {
    let { data, error, status } = await supabase
    .rpc('search_shops', {search: searchQuery});
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
      <TextField id="outlined-basic" fullWidth placeholder="Buscar tiendas y emprendimientos" variant="outlined" onChange={(v) => {setSearchQuery(v.target.value)}} />
      <ShopList shops={shops}></ShopList>
    </>
  )
}
