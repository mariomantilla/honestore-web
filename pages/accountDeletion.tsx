import Typography from "@mui/material/Typography";
import Policy from "../components/policyItem";
import PolicyPage from "../components/policyPage";
import Link from "next/link";


export default function PrivacyPage() {
    return (
        <PolicyPage title="Eliminación de cuentas" lastEdit="01/12/2023" desc="En esta página te contamos como eliminar tu cuenta y eliminar todos tus datos en caso de que quieras dejarnos.">
                <Typography>
                    En esta página te explicamos como eliminar tu cuenta en Honestore, los pasos a seguir y sus implicaciones.
                    Puedes eliminar tu cuenta tanto desde la web como desde la applicación móvil.
                </Typography>
                <Typography>Pasos a seguir en la web:</Typography>
                <ol>
                    <li>Inicia sesión en la web (puedes hacer click <Link href="/login">aqui</Link>)</li>
                    <li>Haz click en el menu de cuenta (con tu avatar o icono de usuario), y luego en el submenú &quot;Cuenta&quot;</li>
                    <li>En la página de <Link href="/account">administración de cuenta</Link>, dirígete al final de la página y haz click en &quot;Eliminar cuenta&quot;</li>
                </ol>
                <Typography>Pasos a seguir en la app:</Typography>
                <ol>
                    <li>Inicia sesión en la app desde la pestaña de Favoritos (el icono &quot;corazón&quot; en la parte inferior)</li>
                    <li>Una vez iniciada la sesión, haz click en la pestaña &quot;Más&quot; (el icono de tres puntos)</li>
                    <li>Haz click en el button &quot;Eliminar cuenta&quot;</li>
                </ol>
                <Typography>
                    Una vez se complete el proceso, que no debería tardar más de unos segundos,
                    se eliminarán todos tus datos personales y otros datos relativos a tu cuenta.
                    No obstante, el contenido que hayas creado en la plataforma como tiendas o comentarios
                    permanecerán en la plataforma, pero dejarán de estar vinculados a ti (pasarán a ser anónimos).
                </Typography>
                <Typography>
                    Si deseas eliminar también estos datos puedes hacerlo de forma manual antes de eliminar tu cuenta o escribir
                    un email a info@honestore.app. También en caso de duda o problema.
                </Typography>
                <Typography>
                    Finalmente, lamentamos mucho que quieras irte y te echaremos de menos. Si quieres, puedes dejarnos un
                    comentario pulsando en el botón inferior derecho o en este <Link href="/feedback">formulario</Link>.
                </Typography>
        </PolicyPage>
    );
}