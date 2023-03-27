import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react"
import Center from "../../../components/center";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { IKImage, IKUpload } from "imagekitio-react";
import { useMessagesContext } from "../../../context/messages";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/system/Unstable_Grid";
import dynamic from "next/dynamic";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Tabs from "@mui/material/Tabs";
import { DataService, getShop, getShopsIds } from "../../../lib/data";
import { useRouter } from "next/router";
import { privatePageLayout } from "../../../helpers/privatePageLayout";
import { ValidatedControlledInput } from "../../../components/validatedControlledInput";
import Tab from "@mui/material/Tab";
import TitlePage from "../../../components/titlePage";
import { Shop, UpdateShop } from "../../../models";
import { useUserContext } from "../../../context/userData";


export async function getStaticPaths() {
    let ids: number[] = await getShopsIds();
    return {
        paths: ids?.map((sid) => `/shops/${sid}/edit`) ?? [],
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

const MapWithNoSSR = dynamic(() => import('../../../components/map'), {
    ssr: false,
});


const TabPanel = (props: { children: React.ReactNode, value: string, index: string }) => {
    return props.value === props.index ? (
        <Box sx={{ p: 3 }}>
            {props.children}
        </Box>
    ) : null;
}


const EditShopPage = ({ shop }: { shop: Shop }) => {

    const { sendMessage } = useMessagesContext();
    const { profile } = useUserContext();

    const [tab, setTab] = useState("info");
    const [uploading, setUploading] = useState(false);
    const [logoFileName, setLogoFileName] = useState(shop.logo_path);
    const [shopName, setShopName] = useState(shop.name);
    const [shopDescription, setShopDescription] = useState(shop.description);

    const [online, setOnline] = useState(shop.online);
    const [coordinates, setCoordinates] = useState(DataService.shopCoordinates(shop));

    const [instagram, setInstagram] = useState<string | null>(shop.instagram ?? '');
    const [address, setAddress] = useState<string | null>(shop.address ?? '');
    const [web, setWeb] = useState<string | null>(shop.web) ?? '';
    const [email, setEmail] = useState<string | null>(shop.email ?? '');
    const [phone, setPhone] = useState<string | null>(shop.phone ?? '');
    const [whatsapp, setWhatsapp] = useState<string | null>(shop.whatsapp ?? '');

    const user = useUser();

    if (!user || (profile?.role != 'admin' && user.id != shop.owner)) return null;

    let social_info = [
        {
            label: "Usuario de Instagram",
            value: instagram,
            setFunction: setInstagram,
            pattern: /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.)){0,28}(?:[A-Za-z0-9_]))?)?$/,
            helper: "Sin @"
        },
        {
            label: "Dirección física",
            value: address,
            setFunction: setAddress,
            pattern: /.*/,
            helper: "Para facilitar que te encuentren"
        },
        {
            label: "Web",
            value: web,
            setFunction: setWeb,
            pattern: /^((https?):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
            helper: ""
        },
        {
            label: "Email de contacto",
            value: email,
            setFunction: setEmail,
            pattern: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
            helper: ""
        }, {
            label: "Telefono de contacto",
            value: phone,
            setFunction: setPhone,
            pattern: /^\+?[0-9]{4,20}$/,
            helper: ""
        }, {
            label: "Whatsapp",
            value: whatsapp,
            setFunction: setWhatsapp,
            pattern: /^\+[0-9]{4,20}$/,
            helper: "Incluye la extensión para que funcione correctamente"
        }
    ]

    const invalid = social_info.map((info) => info.value).some((x) => x === null) || shopName == '' || shopDescription == '';

    const handleSubmission = async () => {
        let newData: UpdateShop = {
            name: shopName,
            description: shopDescription,
            location_coordinates: coordinates ? `${coordinates[0]} ${coordinates[1]}` : null,
            web: web,
            instagram: instagram,
            phone: phone,
            online: online,
            address: address,
            email: email,
            whatsapp: whatsapp,
            published: true,
            logo_path: logoFileName
        };
        if (profile?.role == 'admin') newData.owner = null;
        const { data, error } = await DataService.editShop(shop.id, newData);
        if (error) {
            sendMessage("error", error.message);
        } else {
            sendMessage("success", "Tienda editada correctamente");
            fetch('/api/updateShop?id=' + shop.id.toString()).then((res) => res.json());
        }
    }

    return (
        <TitlePage title={`Gestionar ${shop.name}`}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={(e, v) => { setTab(v) }} aria-label="basic tabs example">
                    <Tab label="Información básica" value="info" />
                    <Tab label="Localización" value="location" />
                    <Tab label="Contacto y redes sociales" value="contact" />
                </Tabs>
            </Box>
            <TabPanel value={tab} index="info">
                <Container key="2" maxWidth="md" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Center>
                        <label>
                            <Tooltip title={logoFileName ? 'Haz click para cambiarlo' : 'Haz click para subir tu logo'}>
                                <Avatar sx={{ width: 256, height: 256 }} className="editLogo">
                                    {uploading ? (<CircularProgress />) : logoFileName ? (
                                        <IKImage
                                            path={`shops/${logoFileName}`}
                                            transformation={[{
                                                height: "256px",
                                                width: "256px"
                                            }]}
                                        />) : (
                                        <>Subir logo*</>
                                    )}
                                </Avatar>
                            </Tooltip>
                            <IKUpload
                                useUniqueFileName={true}
                                responseFields={["tags"]}
                                folder={"/shops"}
                                onUploadStart={() => setUploading(true)}
                                onError={(err) => { sendMessage('error', err.message); setUploading(false); }}
                                onSuccess={(res) => { sendMessage('success', "Logo subido correctamente"); setLogoFileName(res.name); setUploading(false); }}
                            />
                        </label>
                    </Center>
                    <TextField
                        variant="filled"
                        label="Nombre de la tienda"
                        required={true}
                        fullWidth
                        value={shopName}
                        onChange={(event) => {
                            setShopName(event.target.value);
                        }}
                    />
                    <TextField
                        variant="filled"
                        multiline
                        minRows={6}
                        label="Describe tu tienda"
                        fullWidth
                        value={shopDescription}
                        onChange={(event) => {
                            setShopDescription(event.target.value);
                        }}
                    />
                </Container>
            </TabPanel>
            <TabPanel value={tab} index="location">
                <Box key="3" sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}>
                    <Center>
                        <Alert severity="info" sx={{ maxWidth: "700px" }}>
                            <b>Cómo rellenar esta sección:</b><br />
                            - Primero, dinos de que tipo de tienda se trata. ¿Vendes sólo online o dispones de una tienda física donde atender clientes?<br />
                            - Segundo, arrastra el marcador en el mapa hasta la ubicación donde se encuentra tu tienda. También puedes hacer click directamente en la posición.
                            {' '}Si no tienes una tienda física, selecciona el centro de tu área de operaciones. De esta manera los usuarios podrán encontrarte
                            {' '}por proximidad incluso si no dispones de un espacio.
                        </Alert>
                    </Center>
                    <Center>
                        <FormControl>
                            <FormLabel id="online-radio-buttons-group-label">¿Qué tipo de tienda és?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="online-radio-buttons-group-label"
                                name="online-radio-buttons-group"
                                value={online}
                                onChange={(e, v) => setOnline(v === "true")}
                            >
                                <FormControlLabel value="true" control={<Radio />} label="Solo venta online" />
                                <FormControlLabel value="false" control={<Radio />} label="Tienda física" />
                            </RadioGroup>
                        </FormControl>
                    </Center>
                    <MapWithNoSSR callback={(coordinates) => setCoordinates([coordinates.lat, coordinates.lng])} locate={false} />
                </Box>
            </TabPanel>
            <TabPanel value={tab} index="contact">
                <Grid container spacing={1.5} key="3">
                    {social_info.map((info, i) => (
                        <Grid xs={12} md={6} key={i}>
                            <ValidatedControlledInput
                                label={info.label}
                                pattern={info.pattern}
                                setValue={info.setFunction}
                                helper={info.helper}
                                initialValue={info.value ?? undefined}
                            />
                        </Grid>
                    ))}
                </Grid>
            </TabPanel>
            <Center sx={{flexDirection: "row", gap: 2}}>
                <Button variant="contained" disabled={invalid} onClick={handleSubmission}>Guardar</Button>
                <Button variant="contained" href={"/shops/"+shop.id.toString()}>Ir a la tienda</Button>
            </Center>
        </TitlePage>
    )
}

EditShopPage.getLayout = privatePageLayout

export default EditShopPage