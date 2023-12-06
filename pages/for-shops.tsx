import { Box, Button, Chip, Container, Divider, Typography } from "@mui/material";
import OverrideHead from "../components/head";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import connectImage from "../public/images/startup-idea.svg"
import peopleImage from "../public/images/people.svg"
import learnImage from "../public/images/bookshelf.svg"
import Image from "next/image"
import Link from "next/link"
import { faArrowTrendUp, faCircleInfo, faComments, faHeart, faPaperPlane, faPeopleGroup, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../constants";


const ShopsResourcesPage = () => {
    
    const title = "Honestore: Herramientas y recursos para comercios sostenibles";
    const desc = `Descubre gratis nuestras herramientas para colaborar, conectar y crecer de manera sostenible`;

    return (
        <>
        <OverrideHead
            title={title}
            description={desc}
        />
        <Box sx={{display: "flex", flexDirection: "column", gap: 3}}>
        <Container maxWidth="md">
            <Typography variant="h1">Haz crecer tu comercio sostenible y multiplica tu impacto</Typography>
            <Typography variant="subtitle1" sx={{textAlign: "center", marginTop: 2}} component={"h2"}>
                Descubre nuestras herramientas para aumentar tu productividad y tu impacto.
                Simplifica la comunicación con tus clientes, conecta con proveedores alineados con tu negocio
                y encuentra recursos útiles.
            </Typography>
        </Container>
        <Box sx={{display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center"}}>
            <Box sx={{flexBasis: {sx: "100%", sm: "40%"}}}>
                <Image
                    src={connectImage}
                    sizes="100vw"
                    // Make the image display full width
                    style={{
                        width: '100%',
                        height: 'auto',
                        maxWidth: "450px"
                    }}
                    alt="Connecta con proveedores y comercios similares para crear sinergias"
                />
            </Box>
            <Box sx={{display: "flex", flexDirection:"column", gap: 2, flexBasis: {xs: "100%", sm: "60%"}, alignItems: {xs: "center", sm: "unset"}}}>
                <Typography variant="h3">
                    Buscador para empresas: crea sinergias
                </Typography>
                <Typography>
                    Conecta con proveedores comprometidos con la sostenibilidad,
                    encuentra comercios complementarios para colaboraciones estratégicas.
                    Maximiza el impacto positivo de tu negocio al unirte a nuestra red de comercios responsables.
                </Typography>
                <Box sx={{display: "flex", gap: 1, flexWrap: "wrap"}}>
                    <Chip label="Talleres formativos" />
                    <Chip label="Networking" />
                    <Chip label="Medición de impacto" />
                    <Chip label="Envíos en vehículo eléctrico" />
                    <Chip label="Envases retornables" />
                    <Chip label="Y más..." />
                </Box>
                <Box>
                <Button
                    variant="contained"
                    color="secondary"
                    LinkComponent={Link}
                    href="/add_shop"
                >
                    Empezar gratis
                </Button>
                </Box>
            </Box>
        </Box>
        <Divider />
        <Box sx={{display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center", flexDirection: "row-reverse"}}>
            <Box sx={{flexBasis: {sx: "100%", sm: "40%"}}}>
                <Image
                    src={peopleImage}
                    sizes="100vw"
                    // Make the image display full width
                    style={{
                        width: '100%',
                        height: 'auto',
                        maxWidth: "450px"
                    }}
                    alt="Connecta con proveedores y comercios similares para crear sinergias"
                />
            </Box>
            <Box sx={{display: "flex", flexDirection:"column", gap: 2, flexBasis: {xs: "100%", sm: "60%"}, alignItems: {xs: "center", sm: "unset"}}}>
                <Typography variant="h3">
                    Conecta con tu comunidad y hazla crecer
                </Typography>
                <Typography>
                    Envía ofertas y novedades a tus seguidores, responde preguntas y llega a nuevos clientes.
                    Recibe comentarios y sugerencias directamente de tus clientes, todo desde una plataforma única.
                    Optimiza tu presencia sostenible y conquista a tus clientes de manera efectiva.
                </Typography>
                <Box sx={{display: "flex", gap: 3, flexWrap: "wrap"}}>
                    <FontAwesomeIcon icon={faHeart} fontSize={24} height={24} width={24} color={theme.palette.primary.main} />
                    <FontAwesomeIcon icon={faComments} fontSize={24} height={24} color={theme.palette.primary.main} />
                    <FontAwesomeIcon icon={faPaperPlane} fontSize={24} height={24} color={theme.palette.primary.main} />
                    <FontAwesomeIcon icon={faArrowTrendUp} fontSize={24} height={24} color={theme.palette.primary.main} />
                    <FontAwesomeIcon icon={faCircleInfo} fontSize={24} height={24} color={theme.palette.primary.main} />
                    <FontAwesomeIcon icon={faPeopleGroup} fontSize={24} height={24} color={theme.palette.primary.main} />
                    <FontAwesomeIcon icon={faThumbsUp} fontSize={24} height={24} color={theme.palette.primary.main} />
                </Box>
                <Box>
                <Button
                    variant="contained"
                    color="secondary"
                    LinkComponent={Link}
                    href="/add_shop"
                >
                    Registra tu comercio
                </Button>
                </Box>
            </Box>
        </Box>
        <Divider />
        <Box sx={{display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center"}}>
            <Box sx={{flexBasis: {sx: "100%", sm: "40%"}}}>
                <Image
                    src={learnImage}
                    sizes="100vw"
                    // Make the image display full width
                    style={{
                        width: '100%',
                        height: 'auto',
                        maxWidth: "450px"
                    }}
                    alt="Connecta con proveedores y comercios similares para crear sinergias"
                />
            </Box>
            <Box sx={{display: "flex", flexDirection:"column", gap: 2, flexBasis: {xs: "100%", sm: "60%"}, alignItems: {xs: "center", sm: "unset"}}}>
                <Typography variant="h3">
                    Biblioteca de recursos gratuitos
                </Typography>
                <Typography>
                    Guías, calendarios, artículos y contenido útil diseñado para impulsar tu comercio sostenible.
                    Encuentra la información que necesitas para crecer de manera responsable y eficiente.
                    ¡Potencia tu conocimiento y lleva tu negocio al siguiente nivel con Honestore!
                </Typography>
            </Box>
        </Box>
        </Box>
        </>
    );
}

export default ShopsResourcesPage
