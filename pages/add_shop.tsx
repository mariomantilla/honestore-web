import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper"
import { useUser } from "@supabase/auth-helpers-react";
import { useRef, useState } from "react"
import Center from "../components/center";
import LoginWidget from "../components/loginWidget";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { IKImage, IKUpload } from "imagekitio-react";
import { useMessagesContext } from "../context/messages";
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
import Link from "next/link";
import { Autocomplete, Checkbox, Divider, FormGroup, Typography, styled } from "@mui/material";
import { DataService } from "../lib/data";
import { useRouter } from "next/router";
import { ValidatedControlledInput } from "../components/validatedControlledInput";
import { Category, InsertShop, Tag } from "../models";
import { useUserContext } from "../context/userData";
import { socialInfoData } from "../constants/socialInfo";
import { Marker } from "leaflet";
import { useGlobalConfigContext } from "../context/globalConfig";



const MapWithNoSSR = dynamic(() => import('../components/map'), {
    ssr: false,
});

export default function AddShopPage() {

    const { sendMessage } = useMessagesContext();
    const { categories, tags } = useGlobalConfigContext();
    const user = useUser();
    const { profile } = useUserContext();

    const router = useRouter();

    const [activeStep, setActiveStep] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [logoFileName, setLogoFileName] = useState();
    const [shopName, setShopName] = useState('');
    const [shopDescription, setShopDescription] = useState('');

    const [online, setOnline] = useState(false);
    const [coordinates, setCoordinates] = useState<[number, number]>([0, 0]);

    const [instagram, setInstagram] = useState<string | null>('');
    const [address, setAddress] = useState<string | null>('');
    const [web, setWeb] = useState<string | null>('');
    const [email, setEmail] = useState<string | null>('');
    const [phone, setPhone] = useState<string | null>('');
    const [whatsapp, setWhatsapp] = useState<string | null>('');

    const [fieldLat, setFieldLat] = useState<string>('');
    const [fieldLng, setFieldLng] = useState<string>('');

    const [shopCategories, setShopCategories] = useState<Category[]>([]);
    const [shopTags, setShopTags] = useState<Tag[]>([]);

    const locationMarkerRef = useRef<Marker>(null);
    const mapRef = useRef<any>(null);


    const [updating, setUpdating] = useState<boolean>(false);

    const handlePrev = () => {
        setActiveStep(activeStep - 1);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1);
        window.scrollTo({
            top: 0,
            behavior: "auto",
        })
    }

    let social_info = [
        {
            label: socialInfoData.instagram.label,
            value: instagram,
            setFunction: setInstagram,
            pattern: socialInfoData.instagram.pattern,
            helper: socialInfoData.instagram.helper
        },
        {
            label: socialInfoData.address.label,
            value: address,
            setFunction: setAddress,
            pattern: socialInfoData.address.pattern,
            helper: socialInfoData.address.helper
        },
        {
            label: socialInfoData.web.label,
            value: web,
            setFunction: setWeb,
            pattern: socialInfoData.web.pattern,
            helper: socialInfoData.web.helper
        },
        {
            label: socialInfoData.email.label,
            value: email,
            setFunction: setEmail,
            pattern: socialInfoData.email.pattern,
            helper: socialInfoData.email.helper
        }, {
            label: socialInfoData.phone.label,
            value: phone,
            setFunction: setPhone,
            pattern: socialInfoData.phone.pattern,
            helper: socialInfoData.phone.helper
        }, {
            label: socialInfoData.whatsapp.label,
            value: whatsapp,
            setFunction: setWhatsapp,
            pattern: socialInfoData.whatsapp.pattern,
            helper: socialInfoData.whatsapp.helper
        }
    ]

    const socialInvalid = social_info.map((info) => info.value).some((x) => x === null);

    const handleSubmission = async () => {
        let newData: InsertShop = {
            name: shopName,
            description: shopDescription,
            location_coordinates: `${coordinates[0]} ${coordinates[1]}`,
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
        setUpdating(true);
        const { data, error } = await DataService.addShop(newData);
        if (error) {
            sendMessage("error", error.message);
        } else {
            shopCategories.map(async c => {
                await DataService.addCategory(data[0], c);
            })
            shopTags.map(async t => {
                await DataService.addTag(data[0], t);
            })
            sendMessage("success", "Comercio añadido correctamente");
            fetch('/api/updateShop?id=' + data[0].id.toString()).then((res) => {
                router.push(`/shops/${data[0].slug}`);
            });
        }
    }

    let steps = [
        (
            <Box key="1">
                <Center>
                    <Typography variant="h2">Vamos a añadir tu comercio! Sólo 5 pasos.</Typography>
                    {user ? (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
                            Continuar como {user.email}
                            <Button variant="contained" onClick={handleNext}>Siguiente</Button>
                        </Box>
                    ) : (
                        <>
                        <Typography sx={{maxWidth: "600px", textAlign: "center"}}>
                            Antes que nada, necesitamos que inices sesión. Si aun no tienes cuenta, crear una es muy sencillo con tu email y una contraseña. También puedes continuar con tu cuenta de Google.
                        </Typography>
                        <LoginWidget view="sign_up" />
                        </>
                    )}
                </Center>
            </Box>
        ),
        (
            <Container key="2" maxWidth="md" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Center>
                    <label>
                        <Tooltip title={logoFileName ? 'Haz click para cambiarlo' : 'Haz click para subir tu logo'}>
                            <Avatar sx={{ width: 256, height: 256 }} className={logoFileName ? 'editLogo' : ''}>
                                {uploading ? (<CircularProgress />) : logoFileName ? (
                                    <IKImage
                                        width={"256"}
                                        height={"256"}
                                        path={`shops/${logoFileName}`}
                                        transformation={[{
                                            height: "256",
                                            width: "256",
                                            dpr: "2"
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
                    label="Nombre del comercio"
                    required={true}
                    fullWidth
                    value={shopName}
                    onChange={(event) => {
                        setShopName(event.target.value);
                    }}
                />
                <Autocomplete
                    multiple
                    limitTags={2}
                    options={categories}
                    value={shopCategories}
                    onChange={(e, val) => setShopCategories(val)}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                        <TextField {...params} placeholder="Añadir categorías" />
                    )}
                    filterSelectedOptions={true}
                    isOptionEqualToValue={(a,b) => a.id == b.id}
                />
                <TextField
                    variant="filled"
                    multiline
                    minRows={6}
                    label="Describe tu comercio"
                    fullWidth
                    value={shopDescription}
                    onChange={(event) => {
                        setShopDescription(event.target.value);
                    }}
                />
                <Center>
                    <Button variant="contained" onClick={handleNext} disabled={!shopName || !logoFileName}>Siguiente</Button>
                </Center>
            </Container>
        ), (
            <Box key="3" sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}>
                <Center>
                    <Alert severity="info" sx={{ maxWidth: "700px" }}>
                        <b>Cómo rellenar esta sección:</b><br />
                        - Primero, dinos de que tipo de comercio se trata. ¿Vendes sólo online o dispones de un local físico donde atender clientes?<br />
                        - Segundo, arrastra el marcador en el mapa hasta la ubicación donde se encuentra tu comercio. También puedes hacer click directamente en la posición o escribir las coordenadas en los campos latitud y longitud.
                        {' '}Si no tienes una local físico, selecciona el centro de tu área de operaciones. De esta manera los usuarios podrán encontrarte
                        {' '}por proximidad incluso si no dispones de un espacio.
                    </Alert>
                </Center>
                <Center>
                    <FormControl>
                        <FormLabel id="online-radio-buttons-group-label">¿Qué tipo de comercio és?</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="online-radio-buttons-group-label"
                            name="online-radio-buttons-group"
                            value={online}
                            onChange={(e, v) => setOnline(v === "true")}
                        >
                            <FormControlLabel value="true" control={<Radio />} label="Solo venta online" />
                            <FormControlLabel value="false" control={<Radio />} label="Comercio con local físico" />
                        </RadioGroup>
                    </FormControl>
                    <Divider sx={{width: "90%", marginBottom: 1.7, marginTop: 0.3}} />
                    <Box sx={{display: "flex", gap: 1}}>
                        <TextField
                            variant="filled"
                            label={"Latitud"}
                            value={fieldLat??''}
                            onChange={(event) => {
                                setFieldLat(event.target.value)
                            }}
                        />
                        <TextField
                            variant="filled"
                            label={"Longitud"}
                            value={fieldLng??''}
                            onChange={(event) => {
                                setFieldLng(event.target.value);
                            }}
                        />
                        <Button
                            variant="contained"
                            disabled={Number.isNaN(parseFloat(fieldLat)) || Number.isNaN(parseFloat(fieldLng))}
                            onClick={() => {
                                let lat = parseFloat(fieldLat)
                                let lng = parseFloat(fieldLng)
                                if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
                                    setCoordinates([lat, lng]);
                                    locationMarkerRef.current?.setLatLng([lat, lng]);
                                    mapRef.current?.flyTo([lat, lng]);
                                }
                            }}
                        >Ir</Button>
                    </Box>
                </Center>
                <MapWithNoSSR callback={(coordinates) => setCoordinates([coordinates.lat, coordinates.lng])} locationMarker={locationMarkerRef} mapRef={mapRef} />
                <Center sx={{ marginTop: 2 }}>
                    <Button variant="contained" onClick={handleNext} disabled={coordinates.every((x) => x == 0)}>Siguiente</Button>
                </Center>
            </Box>
        ), (
            <>
                <Grid container spacing={1.5} key="3">
                    {social_info.map((info, i) => (
                        <Grid xs={12} md={6} key={i}>
                            <ValidatedControlledInput
                                label={info.label}
                                pattern={info.pattern}
                                setValue={info.setFunction}
                                helper={info.helper}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Center sx={{ marginTop: 2 }}>
                    <Button variant="contained" onClick={handleNext} disabled={socialInvalid}>Siguiente</Button>
                </Center>
            </>
        ), (
            <Box key="4">
                <Center>
                    <Alert severity="info" sx={{ maxWidth: "700px" }}>
                        <b>¿Cuáles son los ámbitos sociales y medioambientales en los que tu comercio destaca?</b><br />
                        Escoje de entre las siguientes opciones las que más se adapten. Recuerda que la información debe ser
                        {' '}veráz, cualquier información falsa va en contra de nuestros <Link href="/terms">Términos y condiciones</Link>.
                        <br />
                    </Alert>
                </Center>
                <Container maxWidth="sm">
                    <FormGroup sx={{padding: 3, gap: 2}}>
                        {tags.map(t => (
                            <FormControlLabel
                                key={t.id}
                                control={<Checkbox checked={shopTags.map(t => t.id).includes(t.id)} onChange={(e, c) => {
                                    const newTags = c ? shopTags.concat([t]) : shopTags.filter(x => x.id!=t.id);
                                    setShopTags(newTags);
                                }} />}
                                label={<Typography><b>{t.name}:</b> {t.description}</Typography>}
                            />
                        ))}
                    </FormGroup>
                </Container>
                <Center sx={{ marginTop: 2 }}>
                    <Button variant="contained" onClick={handleNext}>Siguiente</Button>
                </Center>
            </Box>
        ), (
            <Box key="5">
                <Center>
                    <Typography variant="h2">Listo! Ya hemos terminado</Typography>
                    <Alert severity="warning" sx={{ maxWidth: "700px", textAlign: "justify" }}>
                        <b>Antes de finalizar:</b>
                        {' '}Soy el propietario del comercio y/o tengo autorización para publicar esta información.
                        {' '}Al enviar este formulario entiendo que soy el único responsable de la información que contiene.
                        {' '}He leído y acepto los
                        {' '}<Link href="/terms" target="_blank" rel="noreferrer">Términos y Condiciones</Link> y la
                        {' '}<Link href="/privacy" target="_blank" rel="noreferrer">Política de Privacidad</Link>.
                    </Alert>
                    <Button variant="contained" onClick={handleSubmission} sx={{ marginTop: 3 }}>Aceptar y enviar información</Button>
                </Center>
            </Box>
        )
    ];

    const labels = [
        {l: "Crea un cuenta", o: "o inicia sesión"},
        {l: "Información básica"},
        {l: "Localización"},
        {l: "Contacto y redes sociales"},
        {l: "Sostenibilidad"},
    ]


    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            { updating ? (<Center>
                <Typography variant="h3">Actualizando datos...</Typography>
                <CircularProgress size="5rem" sx={{marginTop: 3}} />
            </Center>) : (
            <>
                <Center sx={{display: {xs: "flex", sm: "none"}}}>
                    { activeStep <5 ? <Typography variant="h3">Paso {activeStep+1} de 5: {labels[activeStep].l}</Typography> : null }
                </Center>
                <Stepper activeStep={activeStep} alternativeLabel sx={{display: {xs: "none", sm: "flex"}}}>
                    { labels.map((l, i) => (
                        <Step key={i}>
                            <StepLabel optional={l.o}>{l.l}</StepLabel>
                        </Step>
                    )) }
                </Stepper>
                <Center>
                    {steps[activeStep]}
                </Center>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    {activeStep > 0 ? (<Button onClick={handlePrev}>Atrás</Button>) : ''}
                </Box>
            </>
            ) }
        </Box>
    )
}