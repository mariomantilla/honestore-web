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
    updateSearch: (arg0: string) => void,
    tags: Tag[],
    updateTags: (tags: Tag[]) => void,
    view: viewsOptions,
    updateView: (view: viewsOptions) => void
    category: Category | null,
    updateCategory: (category: Category | null) => void,
    extractingParams: boolean
};

const searchContextDefaultValues: searchContextType = {
    searchQuery: '',
    updateSearch: (arg0) => {},
    tags: [],
    updateTags: (tags) => {},
    view: viewsOptions.list,
    updateView: (tags) => {},
    category: null,
    updateCategory: (category) => {},
    extractingParams: true
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
    const [extractingParams, setExtractingParams] = useState<boolean>(true);

    useEffect(() => {
        setSearchQuery(router.query.q ? router.query.q as string : '');
        setTags(allTags.filter(t => router.query.tags?.includes(t.id.toString())));
        const queryCat = allCategories.filter(c => router.query.category == c.id.toString());
        setCategory(queryCat.length ? queryCat[0] : null);
        if (router.query.view === viewsOptions.list || router.query.view === viewsOptions.map) {
            setView(router.query.view);
        }
        setExtractingParams(false);
    }, [router.query]);

    const updateUrl = ({newQuery, newTags, newView, newCat}: {newQuery?: string, newTags?: Tag[], newView?: viewsOptions, newCat?: Category | null}) => {
        let q = encodeURIComponent(newQuery??searchQuery);
        let ts = (newTags??tags).map(t => t.id).join(',');
        let cat = newCat !== undefined ? newCat : category;
        setExtractingParams(true);
        router.push(
            `/search?q=${q}&tags=${ts}&view=${newView??view}&category=${cat?.id??''}`,
            undefined,
            {shallow: router.pathname == '/search'}
        );
    }

    const value = {
        searchQuery,
        updateSearch: (query: string) => {
            setSearchQuery(query);
            updateUrl({newQuery: query})
        },
        tags,
        updateTags: (tags: Tag[]) => {
            setTags(tags);
            updateUrl({newTags: tags})
        },
        view,
        updateView: (view: viewsOptions) => {
            setView(view);
            updateUrl({newView: view})
        },
        category,
        updateCategory: (category: Category | null) => {
            setCategory(category);
            updateUrl({newCat: category});
        },
        extractingParams
    };
    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
}

