import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { DataService } from "../lib/data";
import { Category, Tag } from "../models";

type globalConfigContextType = {
    tags: Tag[];
    categories: Category[];
};

const globalConfigDefaultValues: globalConfigContextType = {
    tags: [],
    categories: []
};

const GlobalConfigContext = createContext<globalConfigContextType>(globalConfigDefaultValues);

export function useGlobalConfigContext() {
    return useContext(GlobalConfigContext);
}

type Props = {
    children: ReactNode;
};

export function GlobalConfigProvider({ children }: Props) {
    
    const [tags, setTags] = useState<Tag[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [globalConfigContextValue, setGlobalConfigContextValue] = useState<globalConfigContextType>(globalConfigDefaultValues);

    useEffect(() => {
        DataService.getCategories().then((resp) => setCategories(resp.data??[]))
        DataService.getTags().then((resp) => setTags(resp.data??[]))
    }, []);

    useEffect(() => {
        setGlobalConfigContextValue({
            tags: tags,
            categories: categories
        });
    }, [tags, categories]);

    return (
        <GlobalConfigContext.Provider value={globalConfigContextValue}>
            {children}
        </GlobalConfigContext.Provider>
    );
}

