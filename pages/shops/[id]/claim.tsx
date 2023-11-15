import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useUser } from "@supabase/auth-helpers-react";
import { IKImage } from "imagekitio-react";
import Center from "../../../components/center";
import LoginWidget from "../../../components/loginWidget";
import TitlePage from "../../../components/titlePage";
import { useMessagesContext } from "../../../context/messages";
import { DataService, getShop, getShopsIds } from "../../../lib/data";
import { Shop } from "../../../models";
import { ShopLogo } from "../../../components/shopLogo";

export async function getStaticPaths() {
    let ids: number[] = await getShopsIds();
    return {
        paths: ids?.map((sid) => `/shops/${sid}/claim`) ?? [],
        fallback: true, // can also be true or 'blocking'
    }
}

export async function getStaticProps({ params }: { params: { id: number } }) {
    let shop = await getShop(params.id);
    if (!shop) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            shop: shop
        },

    }
}


export default function ClaimShopPage({ shop }: { shop: Shop }) {

    const user = useUser();
    const { sendMessage } = useMessagesContext();

    if (!shop) return null;

    const handleClaim = () => {
        DataService.claimShop(shop).then((r) => {
            if (!r.error) {
                sendMessage('success', 'Solicitud enviada!');
            }
            else {
                sendMessage('error', 'Error en la solicitud');
            }
        });
    }

    return (
        <TitlePage title={`Reclamar ${shop.name}`}>
            <Center>
                <Avatar alt={shop.name ?? ''} sx={{ height: 200, width: 200, border: "1px solid #ccc", alignSelf: { xs: "center", sm: "inherit" }, marginBlock: 2 }}>
                    <ShopLogo shop={shop} size={200} />
                </Avatar>
                {user ? (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center", maxWidth: "700px", textAlign: "center" }}>
                        <Typography>
                            Estas registrado como <b>{user.email}</b>.
                        </Typography>
                        <Typography>
                            {' '}¿Eres el dueño de este comercio y quieres asociarlo con tu cuenta para poder gestionarlo?
                            {' '}Primero necesitaremos pedirte algunos datos para verificarlo. Para comenzar haz click en &quot;reclamar&quot;
                            {' '}y nos pondremos en contacto contigo al email que aparece arriba para confirmar que tu eres el dueño.
                        </Typography>
                        <Button variant="contained" onClick={handleClaim}>Reclamar {shop.name}</Button>
                    </Box>
                ) : (
                    <>
                        <Typography sx={{ maxWidth: "600px", textAlign: "center" }}>
                            Antes que nada, necesitamos que inices sesión. Si aun no tienes cuenta, crear una es muy sencillo con tu email y una contraseña. También puedes continuar con tu cuenta de Google.
                        </Typography>
                        <LoginWidget />
                    </>
                )}
            </Center>
        </TitlePage>
    )
}