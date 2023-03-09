import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useMessagesContext } from "../context/messages";

export default function AlertComponent() {

    const { msgType, message, show, hideMessage} = useMessagesContext();

    return (
        <Snackbar open={show} autoHideDuration={6000} onClose={hideMessage} anchorOrigin={{ vertical: "top", horizontal: "right" }} sx={{marginTop: "70px", maxWidth: "400px"}}>
            <Alert severity={msgType}>{message}</Alert>
        </Snackbar>
    );
}