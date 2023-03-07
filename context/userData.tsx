import { User, useUser } from "@supabase/auth-helpers-react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { DataService } from "../lib/data";

type userContextType = {
    userFavouriteShopsIds: number[];
    addFavourite: (id: number) => void;
    removeFavourite: (id: number) => void;
};

const userContextDefaultValues: userContextType = {
    userFavouriteShopsIds: [],
    addFavourite: (id) => {},
    removeFavourite: (id) => {}
};

const UserContext = createContext<userContextType>(userContextDefaultValues);

export function useUserContext() {
    return useContext(UserContext);
}

type Props = {
    children: ReactNode;
};

export function UserProvider({ children }: Props) {
    
    const user = useUser();
    const [favs, setFavs] = useState<number[]>([]);
    const [userContextValue, setUserContextValue] = useState<userContextType>(userContextDefaultValues);

    useEffect(() => {
        if (user) DataService.getFavourites(user).then((resp) => setFavs(resp.data?.map((s) => s.id)??[]))
    }, [user]);

    useEffect(() => {
        setUserContextValue({
            userFavouriteShopsIds: favs,
            addFavourite: (id) => setFavs(favs.concat([id])),
            removeFavourite: (id) => setFavs(favs.filter((x) => x != id))
        });
    }, [favs]);

    return (
        <UserContext.Provider value={userContextValue}>
            {children}
        </UserContext.Provider>
    );
}

