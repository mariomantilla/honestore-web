import Typography from "@mui/material/Typography";
import Policy from "../components/policyItem";
import PolicyPage from "../components/policyPage";
import Link from "next/link";
import mixpanel from "mixpanel-browser";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";


export default function PrivacyPage() {

    const [consent, setConsent] = useState(false);

    const removeConsent = () => {
        mixpanel.opt_out_tracking();
        setConsent(false);
    };

    useEffect(() => {
        setConsent(mixpanel.has_opted_in_tracking());
    });

    return (
        <PolicyPage title="Política de Cookies" lastEdit="06/07/2023" desc="Esta Política de Cookies describe el uso de cookies y otros mecanismos de almacenamiento local en Honestore. Al utilizar nuestro sitio web, aceptas el uso de cookies de acuerdo con esta política. Te recomendamos que leas detenidamente esta política para comprender cómo utilizamos las cookies y cómo puedes gestionarlas.">
            <Policy title="¿Qué son las cookies?" id="what">
                <Typography>
                    Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web.
                    Estas cookies contienen información que se utiliza para mejorar tu experiencia de navegación, recordar tus
                    preferencias, analizar el uso del sitio y proporcionar servicios personalizados. También utilizamos otros
                    mecanismos de almacenamiento local similares, como el almacenamiento web y el almacenamiento local de HTML5.
                </Typography>
            </Policy>
            <Policy title="Tipos de cookies utilizadas" id="types">
                <b>Utilizamos dos tipos principales de cookies en nuestro sitio web:</b>
                <ul>
                    <li>
                        Cookies esenciales: Estas cookies son necesarias para el funcionamiento del sitio y te permiten navegar
                        y utilizar nuestras funciones principales, como iniciar sesión en tu cuenta. Sin estas cookies, el sitio
                        web no funcionará correctamente. Esas cookies son usadas con nuestro servicio de backend, Supabase. Nos
                        permiten mantener tu sesión iniciada y recordar tus preferencias durante tu visita al sitio web.
                    </li>
                    <li>
                        Cookies de rendimiento: Utilizamos cookies de rendimiento para recopilar información anónima sobre cómo se
                        utiliza nuestro sitio web, incluidas las páginas visitadas y los enlaces en los que se hace clic.
                        Esta información nos ayuda a analizar y mejorar el rendimiento de nuestro sitio web y proporcionarte
                        una experiencia de usuario mejorada. Se crean con las librerías del servicio de analítica web Mixpanel.
                        Estas cookies nos ayudan a recopilar información estadística sobre el uso del sitio web, como la frecuencia
                        de visitas, las páginas más visitadas y la interacción con el contenido. Esta información puede ser anónima
                        o estar asociada a tu usuario si inicas sesión y se utiliza con el propósito de mejorar nuestro sitio web y
                        comprender mejor las necesidades de nuestros usuarios.
                    </li>
                </ul>
            </Policy>
            <Policy title="Recopilación de datos personales" id="personal-data">
                <Typography>
                    No recopilamos datos personales a través de las cookies. Sin embargo, te informamos de que nuestro
                    servicio de analítica web puede utilizar tu dirección IP para detectar de forma aproximada tu ubicación
                    (ciudad/región), pero esta información no se almacena en nuestras cookies. Tu IP tampoco queda registrada.
                </Typography>
                <Typography>
                Para obtener más información sobre cómo recopilamos, utilizamos y protegemos tus datos personales,
                consulta nuestra <Link href="/privacy">Política de Privacidad</Link>.
                </Typography>
            </Policy>
            <Policy title="Consentimiento y gestión de cookies" id="consent">
                <Typography>
                    Al visitar nuestro sitio web, se te presentará un banner de cookies que te informará sobre el uso de cookies y
                    otros mecanismos de almacenamiento local. Al cerrar el banner o seguir navegando en nuestro sitio, aceptas el
                    uso de cookies de acuerdo con esta política. Iniciando sesión o registrándote aceptas el uso de las cookies
                    necesarias para el funcionamiento de dichas funcionalidades. Mediante el banner puedes también aceptar el eso
                    de otras cookies no esenciales.
                </Typography>
                <Typography>
                    Puedes retirar tu consentimiento para el uso de cookies en cualquier momento o cambiar tus preferencias de
                    cookies en esta misma página. Ten en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad y
                    la experiencia de uso de nuestro sitio web.
                </Typography>
                <Typography>    
                    Estado del consentimiento de cookies: {consent ? <>
                    Si<br />
                    <Button variant="contained" onClick={removeConsent}>Retirar consentimiento</Button>
                    </>: 'No'}
                </Typography>
            </Policy>
            <Policy title="Enlaces a terceros" id="links">
                <Typography>
                    Nuestro sitio web puede contener enlaces a sitios web de terceros. Ten en cuenta que estos sitios web
                    tienen sus propias políticas de cookies y no nos hacemos responsables de sus prácticas. Te recomendamos
                    que consultes las políticas de cookies de dichos sitios web cuando los visites.
                </Typography>
            </Policy>
            <Policy title="Actualizaciones de la política de cookies" id="updates">
                <Typography>
                Nos reservamos el derecho de actualizar esta política de cookies en cualquier momento. Cualquier cambio
                será publicado en nuestro sitio web y se te notificará a través del propio sitio. Te recomendamos que
                consultes esta política periódicamente para estar informado sobre cualquier actualización.
                </Typography>
            </Policy>
            <Policy title="Datos de contacto" id="contactData">
                <Typography>
                    Para cualquier duda, comentario, ejercicio de tus derechos y como responsable del tratamiento de los datos de índole personal conforme al RGPD, por favor contactar con:
                </Typography>
                <Typography>
                    Mario Mantilla Sánchez<br />
                    Carrer Diputacio 342, Barcelona, España<br />
                    08009<br />
                    <a href="mailto:info@honestore.app">info@honestore.app</a>
                </Typography>
            </Policy>
        </PolicyPage>
    );
}