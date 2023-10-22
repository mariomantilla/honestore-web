import { createContext, ReactNode, useContext, useState } from "react";

type TypesOfMessages = 'success' | 'info' | 'warning' | 'error';

type messagesContextType = {
    msgType: TypesOfMessages;
    message: ReactNode,
    show: boolean,
    sendMessage: (msgType: TypesOfMessages, message: ReactNode) => void,
    hideMessage: (event?: React.SyntheticEvent | Event, reason?: string) => void
};

const messagesContextDefaultValues: messagesContextType = {
    msgType: 'success',
    message: '',
    show: false,
    sendMessage: () => {},
    hideMessage: () => {}
};

const MessagesContext = createContext<messagesContextType>(messagesContextDefaultValues);

export function useMessagesContext() {
    return useContext(MessagesContext);
}

type Props = {
    children: ReactNode;
};

export function MessagesProvider({ children }: Props) {
    const [msgType, setMsgType] = useState<TypesOfMessages>('success');
    const [message, setMessage] = useState<ReactNode>('');
    const [show, setShow] = useState<boolean>(false);

    const value = {
        msgType: msgType,
        message: message,
        show: show,
        sendMessage: (msgType: TypesOfMessages, message: ReactNode) => {
            setMsgType(msgType);
            setMessage(message);
            setShow(true);
        },
        hideMessage: (event?: React.SyntheticEvent | Event, reason?: string) => {
            if (reason === 'clickaway') return;
            setShow(false);
        }
    };
    return (
        <MessagesContext.Provider value={value}>
            {children}
        </MessagesContext.Provider>
    );
}

