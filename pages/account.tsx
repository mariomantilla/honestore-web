import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Center from "../components/center";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { use, useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "./_app";
import { privatePageLayout } from "../helpers/privatePageLayout";
import TitlePage from "../components/titlePage";
import { useMessagesContext } from "../context/messages";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import { IKImage, IKUpload } from "imagekitio-react";
import Tooltip from "@mui/material/Tooltip";
import UserAvatar from "../components/userAvatar";
import { useUserContext } from "../context/userData";
import { Profile } from "../models";


const avatarSize = 128;


const AccountPage: NextPageWithLayout = () => {

    const user = useUser();
    const { profile, setProfile } = useUserContext();
    const { sendMessage } = useMessagesContext();
    const supabase = useSupabaseClient()
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [password, setPassword] = useState('');
    const [modifiedUser, setModifiedUser] = useState(false);
    const [modifiedProfile, setModifiedProfile] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [avatarFileName, setAvatarFileName] = useState<string|null>(null);
    const handleOpenDelete = () => setDeleteOpen(true);
    const handleCloseDelete = () => setDeleteOpen(false);
    const router = useRouter();

    useEffect(() => {
        setEmail(user?.email??'');
    }, [user]);

    useEffect(() => {
        if (profile) {
            setName(profile.name??'');
            setAvatarFileName(profile.avatar??'')
            setBio(profile.bio??'')
        }
    }, [profile])


    const handleDelete = async () => {
        const { data, error } = await supabase.rpc('deleteUser');
        if (error) {
            sendMessage('error', error.message);
        } else {
            supabase.auth.signOut();
            router.push("/");
        }
    }

    const updateUser = async () => {
        const { data, error } = await supabase.auth.updateUser({ email: email, password: password != '' ? password : undefined })
        if (error) {
            sendMessage('error', error.message);
        } else {
            setModifiedUser(false);
            setPassword('');
            sendMessage('success', 'Guardado correctamente.'+ (email != user?.email ? ' Recuerda que para cambiar tu email deberás confirmar tu nueva dirección.' : ''));
        }
    };

    const updateProfile = async () => {
        const {data, error} = await supabase.from('profiles').update({ name: name, avatar: avatarFileName, bio: bio }).eq('id', user?.id).select()
        if (error) {
            sendMessage('error', error.message);
        } else {
            setModifiedProfile(false);
            setProfile(data[0] as Profile);
            sendMessage('success', 'Guardado correctamente.');
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

    const mockProfile : Profile | null = profile ? { ...profile,  ...{avatar: avatarFileName} } : null;

    return (
        <TitlePage title="Mi cuenta">
            <Center>
                <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography variant="h3">Datos personales</Typography>
                    <Center sx={{gap: 2}}>
                        <label>
                            <Tooltip title={avatarFileName ? 'Haz click para cambiarlo' : 'Haz click para subir tu foto o avatar'}>
                                <Avatar sx={{ width: avatarSize, height: avatarSize }} className={avatarFileName ? 'editLogo' : ''}>
                                    {uploading ? (<CircularProgress />) : <UserAvatar profile={mockProfile} size={avatarSize} /> }
                                </Avatar>
                            </Tooltip>
                            <IKUpload
                                useUniqueFileName={true}
                                responseFields={["tags"]}
                                folder={"/users"}
                                onUploadStart={() => setUploading(true)}
                                onError={(err) => { sendMessage('error', err.message); setUploading(false); }}
                                onSuccess={(res) => { sendMessage('success', "Foto subida correctamente"); setAvatarFileName(res.name); setUploading(false); setModifiedProfile(true)}}
                            />
                        </label>
                        { !avatarFileName ? <Typography variant="caption">Este es tu avatar por defecto, haz click para subir una foto.</Typography> : <Button onClick={() => {setAvatarFileName(''); setModifiedProfile(true)}}>Eliminar foto</Button>}
                    </Center>
                    <TextField placeholder="Tu nombre público" variant="filled" color="secondary" label="Nombre" value={name} onChange={(e) => {setName(e.target.value); setModifiedProfile(true)}} />
                    <TextField
                        variant="filled"
                        multiline
                        minRows={3}
                        label="Bio"
                        placeholder="Descríbete en pocas palabras"
                        fullWidth
                        value={bio}
                        onChange={(event) => {
                            setModifiedProfile(true);
                            setBio(event.target.value);
                        }}
                    />
                    <Button variant="contained" onClick={updateProfile} disabled={!modifiedProfile}>Actualizar</Button>
                    <Divider />
                    <Typography variant="h3">Datos de la cuenta</Typography>
                    <TextField placeholder="No se mostrará públicamente" variant="filled" color="secondary" label="Email" value={email} onChange={(e) => {setEmail(e.target.value); setModifiedUser(true)}} />
                    <TextField placeholder="Elige una nueva contraseña…" variant="filled" color="secondary" label="Nueva contraseña" type="password" value={password} onChange={(e) => {setPassword(e.target.value); setModifiedUser(true)}} />
                    <Button variant="contained" onClick={updateUser} disabled={!modifiedUser}>Actualizar</Button>
                    <Divider />
                    <div><Button onClick={handleOpenDelete} color="error">Eliminar cuenta</Button></div>
                </Container>
            </Center>
            {renderDeleteAccountModal}
        </TitlePage>
    );
}

AccountPage.getLayout = privatePageLayout

export default AccountPage