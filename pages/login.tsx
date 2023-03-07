import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Center from "../components/center";
import LoginWidget from "../components/loginWidget";


export default function LoginPage() {

    const sessionContext = useSessionContext();
    const router = useRouter();

    if (sessionContext.isLoading || sessionContext.session) {
        if (sessionContext.session) router.push("/");
        return (
            <Center>
                <CircularProgress />
            </Center>
        );
    }

    return (
        <Center>
            <Typography variant="h1" component="h1">Iniciar sesión</Typography>
            <LoginWidget />
        </Center>
    );
}