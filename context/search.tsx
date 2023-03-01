import { createContext, ReactNode, useContext, useState } from "react";

type searchContextType = {
    searchQuery: string;
    setSearchQuery: (arg0: string) => void
};

const searchContextDefaultValues: searchContextType = {
    searchQuery: '',
    setSearchQuery: (srg0) => {},
};

const SearchContext = createContext<searchContextType>(searchContextDefaultValues);

export function useSearchContext() {
    return useContext(SearchContext);
}

type Props = {
    children: ReactNode;
};

export function SearchProvider<ReactNode>({ children }: Props) {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const value = {
        searchQuery,
        setSearchQuery,
    };
    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
}

