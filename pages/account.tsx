import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Center from "../components/center";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "./_app";
import { privatePageLayout } from "../helpers/privatePageLayout";


const AccountPage: NextPageWithLayout = () => {

    const user = useUser();
    const supabase = useSupabaseClient()
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [modified, setModified] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [emailWaitingConfirmation, setEmailWaitingConfirmation] = useState('');
    const [deleteOpen, setDeleteOpen] = useState(false);
    const handleOpenDelete = () => setDeleteOpen(true);
    const handleCloseDelete = () => setDeleteOpen(false);
    const router = useRouter();

    useEffect(() => {
        setEmail(user?.email??'');
        const getAndSetName = async (id: string) => {
            const { data, error } = await supabase.from('profiles').select('name').eq('id', id);
            if (error) showError(error.message);
            else {
                setName(data[0].name);
            }
        }
        if (user) getAndSetName(user.id);
    }, [user, supabase]);

    const showError = (msg: string) => {
        setOpen(true);
        setErrorMsg(msg);
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleDelete = async () => {
        const { data, error } = await supabase.rpc('deleteUser');
        if (error) {
            showError(error.message);
        } else {
            supabase.auth.signOut();
            router.push("/");
        }
    }

    const updateUser = async () => {
        const { data, error } = await supabase.auth.updateUser({ email: email, password: password != '' ? password : undefined })
        if (error) {
            setOpen(true);
            setErrorMsg(error.message);
        } else {
            setPassword('');
            if (email != user?.email) setEmailWaitingConfirmation('Esperando confirmacion de email');
            const resp = await supabase.from('profiles').update({ name: name }).eq('id', user?.id)
            if (resp.error) {
                setOpen(true);
                setErrorMsg(resp.error.message);
            } else {
                setModified(false);
            }
        }
    };

    const renderDeleteAccountModal = (<Modal
        open={deleteOpen}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper elevation={3} sx={{padding: "2rem"}}>
          <Typography variant="h3" sx={{marginBottom: "1rem"}}>Eliminar cuenta definitivamente</Typography>
          ¡Atención! Esta acción eliminará tu cuenta y todos los datos asociados y no se puede deshacer.
          <Box sx={{display: "flex", gap: 2, justifyContent: "flex-end", marginTop: "2rem"}}>
            <Button onClick={handleDelete}>Eliminar</Button>
            <Button variant="contained" onClick={handleCloseDelete}>Cancelar</Button>
          </Box>
        </Paper>
      </Modal>);

    return (
        <>
            <Typography variant="h1" component="h1">Mi cuenta</Typography>
            <Center>
                <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField placeholder="¿Cómo te gusta que te llamen?" variant="filled" color="secondary" label="Nombre" value={name} onChange={(e) => {setName(e.target.value); setModified(true)}} />
                    <TextField placeholder="Escribe tu email…" variant="filled" color="secondary" label="Email" value={email} onChange={(e) => {setEmail(e.target.value); setModified(true)}} helperText={emailWaitingConfirmation} />
                    <Divider />
                    <TextField placeholder="Elige una nueva contraseña…" variant="filled" color="secondary" label="Nueva contraseña" type="password" value={password} onChange={(e) => {setPassword(e.target.value); setModified(true)}} />
                    <Button variant="contained" onClick={updateUser} disabled={!modified}>Actualizar</Button>
                    <Divider />
                    <div><Button onClick={handleOpenDelete} color="error">Eliminar cuenta</Button></div>
                </Container>
            </Center>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert severity="error">{errorMsg}</Alert>
            </Snackbar>
            {renderDeleteAccountModal}
        </>
    );
}

AccountPage.getLayout = privatePageLayout

export default AccountPage