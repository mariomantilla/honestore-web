import { useUser } from "@supabase/auth-helpers-react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { DataService } from "../lib/data";
import { Profile } from "../models";

type userContextType = {
    userFavouriteShopsIds: number[];
    profile: Profile | null;
    addFavourite: (id: number) => void;
    removeFavourite: (id: number) => void;
    setProfile: (profile: Profile) => void;
};

const userContextDefaultValues: userContextType = {
    userFavouriteShopsIds: [],
    profile: null,
    addFavourite: (id) => {},
    removeFavourite: (id) => {},
    setProfile: (profile) => {}
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
    const [profile, setProfile] = useState<Profile | null>(null);
    const [userContextValue, setUserContextValue] = useState<userContextType>(userContextDefaultValues);

    useEffect(() => {
        if (user) {
            DataService.getFavourites(user).then((resp) => setFavs(resp.data?.map((s) => s.id)??[]))
            DataService.getProfile(user).then((resp) => setProfile(resp.data ? resp.data[0] : null))
        }
    }, [user]);

    useEffect(() => {
        setUserContextValue({
            userFavouriteShopsIds: favs,
            profile: profile,
            addFavourite: (id) => setFavs(favs.concat([id])),
            removeFavourite: (id) => setFavs(favs.filter((x) => x != id)),
            setProfile: setProfile
        });
    }, [favs, profile]);

    return (
        <UserContext.Provider value={userContextValue}>
            {children}
        </UserContext.Provider>
    );
}

