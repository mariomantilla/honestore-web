import { createContext, ReactNode, useContext, useState } from "react";

type messagesContextType = {
    searchQuery: string;
    setSearchQuery: (arg0: string) => void
};

const messagesContextDefaultValues: messagesContextType = {
    searchQuery: '',
    setSearchQuery: () => {},
};

const MessagesContext = createContext<messagesContextType>(messagesContextDefaultValues);

export function useMessagesContext() {
    return useContext(MessagesContext);
}

type Props = {
    children: ReactNode;
};

export function MessagesProvider({ children }: Props) {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const value = {
        searchQuery,
        setSearchQuery,
    };
    return (
        <MessagesContext.Provider value={value}>
            {children}
        </MessagesContext.Provider>
    );
}

