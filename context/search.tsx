import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type searchContextType = {
    searchQuery: string;
    updateSearch: (arg0: string) => void
};

const searchContextDefaultValues: searchContextType = {
    searchQuery: '',
    updateSearch: (srg0) => {},
};

export const SearchContext = createContext<searchContextType>(searchContextDefaultValues);

export function useSearchContext() {
    return useContext(SearchContext);
}

type Props = {
    children: ReactNode;
};

export function SearchProvider({ children }: Props) {

	const router = useRouter();
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        setSearchQuery(router.query.q ? router.query.q as string : '');
    }, [router.query.q]);

    const value = {
        searchQuery,
        updateSearch: (query: string) => {
            setSearchQuery(query);
            let shallow = router.pathname == '/search'
            router.push('/search?q='+query, undefined, {shallow: shallow})
        },
    };
    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
}

