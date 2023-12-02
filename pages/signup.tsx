import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Center from "../components/center";
import LoginWidget from "../components/loginWidget";
import Container from "@mui/material/Container";
import OverrideHead from "../components/head";


export default function LoginPage() {

    const sessionContext = useSessionContext();
    const router = useRouter();

    if (sessionContext.session) router.push("/");

    const title = 'Únete a la Revolución Sostenible: Regístrate Ahora';
    const desc = 'Regístrate para acceder a una comunidad dedicada a la búsqueda de comercios responsables. Descubre productos, tiendas y servicios que transforman tu estilo de vida mientras contribuyes al bienestar del planeta y la sociedad. Sé parte del cambio hacia un mundo más sostenible. ¡Tu elección cuenta!';

    return (<>
        <OverrideHead title={title} description={desc} />
        <Container maxWidth="md">
            <Center sx={{gap: 2}}>
                <Typography variant="h1" component="h1">{title}</Typography>
                <Typography variant="subtitle1" component="h2" sx={{textAlign: "center"}}>{desc}</Typography>
                { sessionContext.isLoading || sessionContext.session ? (
                    <Center>
                        <CircularProgress />
                    </Center>
                ) : <LoginWidget view="sign_up" />}
            </Center>
        </Container>
    </>);
}