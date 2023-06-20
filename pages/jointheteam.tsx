import Typography from "@mui/material/Typography";
import TitlePage from "../components/titlePage";


export default function JoinTheTeamPage() {

    let desc = `
    En Honestore, creemos en un mundo donde cada elección de compra cuenta.
    Nuestro proyecto se centra en reunir a personas comprometidas con la causa de consumir de forma más responsable, 
    creando una red sólida de usuarios y tiendas con un enfoque claro en la sostenibilidad, el cuidado del medio ambiente, 
    los derechos de los trabajadores y el impacto social.

    Explora nuestras opciones de colaboración y encuentra la que mejor se adapte a tus necesidades y valores. 
    `   

    return (
        <TitlePage title={"Únete al equipo"} desc={desc}>
            <Typography sx={{ textAlign: "center" }}>{desc}</Typography>
            <Typography variant="h3" sx={{ padding: "0.5em" }}>Relaciones externas</Typography>
            <Typography>
            Buscamos un colaborador apasionado para Honestore, un proyecto revolucionario en consumo responsable. Únete y ayúdanos a crear una comunidad enfocada en la sostenibilidad.
            Honestore es un proyecto en fase MVP que impulsa el consumo responsable. Estamos construyendo una plataforma para conectar a las personas con tiendas locales y sostenibles que priorizan el medio ambiente y el impacto social.
            </Typography>
            <Typography>
            💡 ¿Cuál sería tu rol? 🤝💼
            </Typography>
            <Typography>
            Honestore está en sus etapas iniciales y estamos buscando un colaborador dedicado para ayudarnos a crecer. Estarías involucrado en actividades de recaudación de fondos, networking y bussiness development. Tener experiencia en el ecosistema de sostenibilidad en español y/o en esas áreas es una ventaja pero no es necesario.
            </Typography>
            <Typography>
            ✉️ Si te interesa, envíanos un mensaje a <a href="mailto:info@honestore.app">info@honestore.app</a>. También puedes compartir esta oportunidad con personas afines que puedan estar interesadas.
            </Typography>
        </TitlePage>
    );
}