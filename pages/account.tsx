import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Center from "../components/center";
import LoginWidget from "../components/loginWidget";
import Divider from "@mui/material/Divider";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


export default function AccountPage() {

    const user = useUser()
    const supabase = useSupabaseClient()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [modified, setModified] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [emailWaitingConfirmation, setEmailWaitingConfirmation] = useState('');


    useEffect(() => {
        setEmail(user?.email??'');
    }, [user]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const updateUser = async () => {
        const { data, error } = await supabase.auth.updateUser({ email: email, password: password != '' ? password : undefined })
        if (error) {
            setOpen(true);
            setErrorMsg(error.message);
        } else {
            setModified(false);
            setPassword('');
            setEmailWaitingConfirmation('Esperando confirmacion de email')
        }
    };

    if (!user) return (
        <Center>
            <LoginWidget />
        </Center>
    )

    return (
        <>
            <Typography variant="h1" component="h1">Mi cuenta</Typography>
            <Center>
                <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField placeholder="Escribe tu email…" variant="filled" color="secondary" label="Email" value={email} onChange={(e) => {setEmail(e.target.value); setModified(true)}} helperText={emailWaitingConfirmation} />
                    <Divider />
                    <TextField placeholder="Elige una nueva contraseña…" variant="filled" color="secondary" label="Nueva contraseña" type="password" value={password} onChange={(e) => {setPassword(e.target.value); setModified(true)}} />
                    <Button variant="contained" onClick={updateUser} disabled={!modified}>Actualizar</Button>
                </Container>
            </Center>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert severity="error">{errorMsg}</Alert>
            </Snackbar>
        </>
    );
}