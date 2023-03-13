import LinearProgress from "@mui/material/LinearProgress";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Loader() {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    useEffect(() => {

        const startLoading = (url: string) => setIsLoading(true);
        const endLoading = (url: string) => setIsLoading(false);


        router.events.on("routeChangeStart", startLoading);
        router.events.on("routeChangeComplete", endLoading);
        router.events.on("routeChangeError", endLoading);

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
            router.events.off('routeChangeStart', startLoading)
            router.events.off('routeChangeComplete', endLoading)
            router.events.off('routeChangeError', endLoading)
        }
    }, [router.events])

    return (
        <LinearProgress sx={{ visibility: isLoading ? 'visible' : 'hidden' }} />
    );
}