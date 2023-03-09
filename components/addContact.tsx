import Send from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useMessagesContext } from "../context/messages";




export default function AddContact() {

    const { sendMessage } = useMessagesContext();

    async function addContact(e) {
        console.log(e);
        // const response = await fetch("/api/addContact", {
        //     method: "POST",
        //     body: JSON.stringify({ email: email }),
        // });
        // if (response.status == 200) {
        //     sendMessage('success', 'Te has suscrito correctamente, por favor verifica tu email');
        // } else {
        //     sendMessage('error', 'Ha ocurrido un error');
        // }
    }

    return (
        <>
            <TextField
                onChange={(e) => ''/*setEmail(e.target.value)*/}
                fullWidth
                placeholder="Suscribete al newsletter"
                size="small"
                variant="outlined"
                sx={{ marginTop: 2 }}
                InputProps={{ endAdornment: <Button onClick={addContact}><Send /></Button> }}
            />
            <Typography variant="caption">He leído y acepto la <Link href="/privacy">Política de Privaciad</Link></Typography>
        </>
    );
}