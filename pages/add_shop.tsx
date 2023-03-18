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
import { v4 as uuidv4 } from 'uuid';
import { IKImage, IKUpload } from "imagekitio-react";
import { useMessagesContext } from "../context/messages";


export default function AddShopPage() {

    const [activeStep, setActiveStep] = useState(0);
    const [logoFileName, setLogoFileName] = useState();
    const { sendMessage } = useMessagesContext();

    const user = useUser();

    const handlePrev = () => {
        setActiveStep(activeStep - 1);
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    }

    let steps = [
        user ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }} key="1">
                Continuar como {user.email}
                <Center>
                    <Button variant="contained" onClick={handleNext}>Siguiente</Button>
                </Center>
            </Box>
        ) : (<LoginWidget key="1" />),
        (
            <Container key="2" maxWidth="md" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Center>
                    <label>
                        <Avatar sx={{ width: 256, height: 256 }}>
                            {logoFileName ? (
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
                        <IKUpload
                            useUniqueFileName={true}
                            responseFields={["tags"]}
                            folder={"/shops"}
                            onError={(err) => sendMessage('error', err.message)}
                            onSuccess={(res) => {sendMessage('success', "Logo subido correctamente");setLogoFileName(res.name)}}
                        />
                    </label>
                </Center>
                <TextField variant="filled" label="Nombre de la tienda" required={true} fullWidth />
                <TextField variant="filled" multiline minRows={6} label="Describe tu tienda" fullWidth />
            </Container>
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
                    <StepLabel>Contacto y redes sociales</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Confirmación</StepLabel>
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