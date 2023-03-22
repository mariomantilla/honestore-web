import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper"
import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react"
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
import { Typography } from "@mui/material";
import { DataService } from "../lib/data";
import { useRouter } from "next/router";

const ValidatedControlledInput = (props: { label: string, pattern: RegExp, setValue: (val: string | null) => void, helper: string }) => {

    const [value, setValue] = useState('');
    const [error, setError] = useState(false);

    return (
        <TextField
            variant="filled"
            helperText={props.helper}
            label={props.label}
            fullWidth
            error={error}
            value={value}
            onChange={(event) => {
                setValue(event.target.value);
                if (event.target.value.match(props.pattern)) {
                    setError(false)
                    props.setValue(event.target.value);
                } else {
                    props.setValue(null);
                    setError(true)
                }
            }}
        />
    );
}

const MapWithNoSSR = dynamic(() => import('../components/map'), {
    ssr: false,
});


export default function AddShopPage() {

    const { sendMessage } = useMessagesContext();

    const router = useRouter();

    const [activeStep, setActiveStep] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [logoFileName, setLogoFileName] = useState();
    const [shopName, setShopName] = useState('');
    const [shopDescription, setShopDescription] = useState('');

    const [online, setOnline] = useState(false);
    const [coordinates, setCoordinates] = useState([0, 0]);

    const [instagram, setInstagram] = useState<string | null>('');
    const [address, setAddress] = useState<string | null>('');
    const [web, setWeb] = useState<string | null>('');
    const [email, setEmail] = useState<string | null>('');
    const [phone, setPhone] = useState<string | null>('');
    const [whatsapp, setWhatsapp] = useState<string | null>('');

    const user = useUser();

    const handlePrev = () => {
        setActiveStep(activeStep - 1);
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    }

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

    const socialInvalid = social_info.map((info) => info.value).some((x) => x === null);

    const handleSubmission = async () => {
        const { data, error } = await DataService.addShop({
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
        });
        if (error) {
            sendMessage("error", error.message);
        } else {
            sendMessage("success", "Tienda añadida correctamente");
            router.push(`/shops/${data[0].id}`);
        }
    }

    let steps = [
        (
            <Box key="1">
                <Center>
                    <Typography variant="h2">Vamos a añadir tu tienda! Sólo 4 pasos.</Typography>
                    {user ? (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
                            Continuar como {user.email}
                            <Button variant="contained" onClick={handleNext}>Siguiente</Button>
                        </Box>
                    ) : (
                        <>
                        <Typography sx={{maxWidth: "600px", textAlign: "center"}}>
                            Antes que nada, necesitamos que inices sesión. Si aun no tienes cuenta crear una es muy sencillo, o puedes continua con tu cuenta de Google.
                        </Typography>
                        <LoginWidget />
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
                            <Avatar sx={{ width: 256, height: 256 }}>
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
                <Center>
                    <Button variant="contained" onClick={handleNext} disabled={!shopName || !logoFileName}>Siguiente</Button>
                </Center>
            </Container>
        ), (
            <Box key="3" sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}>
                <Center>
                    <Alert severity="info" sx={{ maxWidth: "700px" }}>
                        <b>Cómo rellenar esta sección:</b><br />
                        - Primero, dinos de que tipo de tienda se trata. ¿Vendes sólo online o dispones de una tienda física donde atender clientes?<br />
                        - Segundo, arrastra el marcador en el mapa hasta la ubicación donde se encuentra tu tienda.
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
                <MapWithNoSSR callback={(coordinates) => setCoordinates([coordinates.lat, coordinates.lng])} />
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
                    <Typography variant="h2">Listo! Ya hemos terminado</Typography>
                    <Alert severity="warning" sx={{ maxWidth: "700px", textAlign: "justify" }}>
                        <b>Antes de finalizar:</b>
                        {' '}Soy el propietario de la tienda y/o tengo autorización para publicar esta información.
                        {' '}Al enviar este formulario entiendo que me soy el único responsable de la información que contiene.
                        {' '}He leído y acepto los
                        {' '}<Link href="/terms" target="_blank" rel="noreferrer">Términos y Condiciones</Link> y la
                        {' '}<Link href="/privacy" target="_blank" rel="noreferrer">Política de Privacidad</Link>.
                    </Alert>
                    <Button variant="contained" onClick={handleSubmission} sx={{ marginTop: 3 }}>Aceptar y enviar información</Button>
                </Center>
            </Box>
        )
    ];

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                <Step>
                    <StepLabel optional={"o inicia sesión"}>Crea un cuenta</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Información básica</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Localización</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Contacto y redes sociales</StepLabel>
                </Step>
            </Stepper>
            <Center>
                {steps[activeStep]}
            </Center>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                {activeStep > 0 ? (<Button onClick={handlePrev}>Atrás</Button>) : ''}
            </Box>
        </Box>
    )
}