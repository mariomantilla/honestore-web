import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import { Button, Card, CardContent, Container, IconButton, Rating, TextField, Typography, styled } from "@mui/material";
import Fab from "@mui/material/Fab";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteOutlined from "@mui/icons-material/FavoriteOutlined";
import Close from "@mui/icons-material/Close";
import { useState } from "react";
import { DataService } from "../lib/data";

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#FB7168',
    }
});

export default function Feedback() {

    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(3);
    const [comments, setComments] = useState('');
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(false);

    let toggle = () => {
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }

    let send = () => {
        DataService.addFeedback(rating, comments).then((r) => {
            if (!r.error) {
                setSent(true);
            } else {
                setError(true);
            }
        });
    }

    return (
        <div style={{ position: "fixed", bottom: "2em", right: "2em", display: "flex", flexDirection: "column", justifyContent: "end", gap: "1rem", zIndex: 9999 }}>
            <Card sx={{ width: {xs: "100vw", sm: 350}, display: open ? 'unset' : 'none', position: {xs: "absolute", sm: "unset"}, right: {xs: "-2rem", sm: "unset"}, bottom: {xs: "-2rem", sm: "unset"}, height: {xs: "100vh", sm: "unset"} }} elevation={5}>
                <IconButton color="primary" sx={{top: "10px", right: "10px", position: "absolute"}} onClick={() => {setOpen(false)}}>
                    <Close />
                </IconButton>
                <CardContent sx={{ padding: "1.8rem" }}>
                    { 
                        sent ? 
                    <Typography>¡Gracias por tus comentarios!</Typography> : ( error ? 
                    <Typography>Se ha producido un error, disculpa las molestias.</Typography> 
                    : (
                    <>
                    <Typography variant="h4">Dinos qué opinas</Typography>
                    <Container sx={{ textAlign: "center", padding: "1rem" }}>
                        <StyledRating
                            name="rating"
                            defaultValue={3}
                            icon={<Favorite fontSize="inherit" />}
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue || 3);
                            }}
                            emptyIcon={<FavoriteOutlined fontSize="inherit" />}
                        />
                    </Container>
                    <TextField
                        id="comments"
                        label="Dilo con palabras"
                        multiline
                        value={comments}
                        onChange={(event) => {setComments(event.target.value)}}
                        rows={4}
                        sx={{ width: "100%" }}
                        placeholder="¿Qué te parece la plataforma? ¿Cómo podemos mejorar?"
                        variant="filled"
                    />
                    <Container sx={{ textAlign: "right", marginTop: "0.7rem", paddingRight: "0px !important" }}>
                        <Button variant="contained" onClick={send}>Enviar</Button>
                    </Container>
                    </>
                    )) }
                </CardContent>
            </Card>
            <Fab color="primary" aria-label="add" sx={{ marginLeft: "auto" }} onClick={toggle}>
                { open ? <Close sx={{color: "white"}} /> : <ModeCommentOutlined sx={{ color: "white" }} /> }
            </Fab>
        </div>
    );
}