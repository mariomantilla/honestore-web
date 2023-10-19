import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Category, Tag } from "../models";
import { useGlobalConfigContext } from "./globalConfig";

export enum viewsOptions {
    "list" = "list",
    "map" = "map"
}

type searchContextType = {
    searchQuery: string;
    tags: Tag[],
    view: viewsOptions,
    category: Category | null,
    updateParams: ({newQuery, newTags, newView, newCat}: {newQuery?: string, newTags?: Tag[], newView?: viewsOptions, newCat?: Category | null}, shallow?: boolean) => void,
    updateUrl: ({newQuery, newTags, newView, newCat}: {newQuery?: string, newTags?: Tag[], newView?: viewsOptions, newCat?: Category | null}, shallow?: boolean) => void
};

const searchContextDefaultValues: searchContextType = {
    searchQuery: '',
    tags: [],
    view: viewsOptions.list,
    category: null,
    updateParams: () => {},
    updateUrl: () => {},
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
    const { tags: allTags, categories: allCategories } = useGlobalConfigContext();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [tags, setTags] = useState<Tag[]>([]);
    const [view, setView] = useState<viewsOptions>(viewsOptions.list);
    const [category, setCategory] = useState<Category | null>(null);

    const updateUrl = ({newQuery, newTags, newView, newCat}: {newQuery?: string, newTags?: Tag[], newView?: viewsOptions, newCat?: Category | null}) => {
        let q = encodeURIComponent(newQuery??searchQuery);
        let ts = (newTags??tags).map(t => t.id).join(',');
        let cat = newCat !== undefined ? newCat : category;
        router.push(
            `/search?q=${q}&tags=${ts}&view=${newView??view}&category=${cat?.id??''}`,
            undefined,
            {shallow: router.pathname == '/search'}
        );
    }

    const updateParams = ({newQuery, newTags, newView, newCat}: {newQuery?: string, newTags?: Tag[], newView?: viewsOptions, newCat?: Category | null}, shallow: boolean = false) => {
        if (newQuery !== undefined) setSearchQuery(newQuery);
        if (newTags !== undefined) setTags(newTags);
        if (newView !== undefined) setView(newView);
        if (newCat !== undefined) setCategory(newCat);
        if (!shallow) updateUrl({newQuery, newTags, newView, newCat});
    }

    useEffect(() => {
        if (allCategories.length && allTags.length && router.pathname == '/search') {
            const newQuery = router.query.q ? router.query.q as string : ''
            const newTags = allTags.filter(t => router.query.tags?.includes(t.id.toString()));
            const queryCat = allCategories.filter(c => router.query.category == c.id.toString());
            const newCat = queryCat.length ? queryCat[0] : null;
            const newView = router.query.view === viewsOptions.map ? viewsOptions.map : viewsOptions.list;
            updateParams({newQuery, newTags, newView, newCat}, true)
        }      
    }, [router.query, allCategories, allTags]);

    const value = {
        searchQuery,
        tags,
        view,
        category,
        updateParams: updateParams,
        updateUrl: updateUrl
    };
    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
}

