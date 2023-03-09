import { useEffect, useState } from "react";
import Shop from "../models";
import { DataService } from "../lib/data";
import ShopList from "../components/shopList";
import { useSearchContext } from "../context/search";
import OverrideHead from "../components/head";

const SearchPage = () => {

    const [shops, setShops] = useState<(Shop | null)[]>(new Array(10).fill(null));
    const { searchQuery } = useSearchContext();

    useEffect(() => {
        DataService.searchShops(searchQuery).then((shops) => setShops(shops.data ?? []));
    }, [searchQuery]);

    return (
        <>
            <OverrideHead title="Buscar tiendas en Honestore" />
            <ShopList shops={shops}></ShopList>
        </>
    );
}

export default SearchPage
