import CircularProgress from "@mui/material/CircularProgress";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import Center from "./center";

export default function Private(props: { children: ReactElement }): ReactElement {

    const sessionContext = useSessionContext();
    const router = useRouter();

    useEffect(() => {
        if (!sessionContext.session) router.push("/login");
    });

    if (sessionContext.isLoading || !sessionContext.session) {
        return (
            <Center>
                <CircularProgress />
            </Center>
        );
    }

    return props.children;
}