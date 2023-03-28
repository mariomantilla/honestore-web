import Typography from "@mui/material/Typography";
import Policy from "../components/policyItem";
import PolicyPage from "../components/policyPage";


export default function TermsPage() {
    return (
        <PolicyPage title="Términos y condiciones" lastEdit="28/03/2023" desc="Esta página describe y regula el uso de la plataforma y la web y las condiciones en las que se ofrece el servicio. Por favor, léela detenidamente antes usar la app o el sitio web.">
            <Policy title="Ámbito" id="scope">
                <Typography>
                    Honestore es una plataforma de búsqueda de tiendas, negocios, asociaciones, ONGs, etc (tiendas en general)
                    por parte de los usuarios a través de una applicación movil y una web. Para ello, se ofrecen
                    ciertas funcionalidades tanto para los usuarios responsables de las tiendas (añadir tiendas, modificar información,
                    eliminar tiendas...), como para resto de usuarios (búsqueda por palabras, por ubicación, tiendas favoritas...).
                </Typography>
                <Typography>
                    Estos Términos y Condiciones son un contrato entre cualquier usuario (incluídos los responsables de las tiendas)
                    y la plataforma y regulan las condiciones en las que se ofrecen cada uno de los servicios.
                </Typography>
            </Policy>
            <Policy title="Datos de las tiendas" id="shopsData">
                <Typography>
                    La información sobre las tiendas dentro de la plataforma es suministrada o bien por los representantes
                    de las mismos o por fuentes publicas (como perfiles en redes sociales). En los casos en los que la información se obtuvo
                    de fuentes públicas, se indicará, ya que podría ser inexacta o errónea. Para aportar información sobre una tienda
                    deberás tener autorización expresa de la empresa o personas responsables. Además, dicha información deberá:
                </Typography>
                <ul>
                    <li>Ser completa, veráz, exacta y estar actualizada</li>
                    <li>Ser de caracter comercial y/o empresarial, sin contener información personal de ámbito privado</li>
                    <li>No infringir actualmente, ni en el futuro, los derechos de propiedad intelectual, derechos morales, derechos a la confidencialidad u otros derechos de persona alguna</li>
                    <li>Cumplir con todos los requisitos legales aplicables</li>
                </ul>
                <Typography>
                    Además, cuando envías los datos de tu tienda o negocio, nos autorizas a contactarte para verificar los
                    datos o solicitar datos adicionales, y a solicitar, si así se considera necesario, documentación que
                    acredite que tienes autorización expresa del vendedor.
                </Typography>
                <Typography>
                    Honestore se reserva el derecho de eliminar cualquier tienda o parte de la información relativa sin
                    previo aviso a su proprio criterio.
                </Typography>
                <Typography>
                    En caso de detectar un contenido incorrecto o que incumple los presentes Términos y Condiciones,
                    te rogamos que nos contactes a través de <a href="mailto:info@honestore.app">info@honestore.app</a> para que podamos tomar las acciones pertinentes.
                </Typography>
            </Policy>
            <Policy title="Limitaciones de uso" id="limits">
                <Typography>
                    El acceso a la información de la plataforma sólo puede realizarse a través de la app o web. Está
                    prohibido acceder a Honestore de cualquier manera automática y reiterada mediante robots,
                    scripts o arañas que de forma automática realicen múltiples peticiones a los servidores de
                    la plataforma. Está prohibido almacenar la información contenida en Honestore, sin autorización
                    expresa.
                </Typography>
                <Typography>
                    Además, cualquier uso de la plataforma distinto del que se especifica en el apartado <a href="#scope">Ámbito</a> queda prohibido.
                </Typography>
            </Policy>
            <Policy title="Limitación de Responsabilidad" id="responsibility">
                <Typography>
                    La plataforma no tiene control de la información publicada por los usuarios sobre las tiendas,
                    sus datos de contacto, redes sociales, web, logos, fotos,
                    descripciones, o cualquier otro. Por lo tanto la plataforma no se hace responsable
                    de dichos contenidos ni del uso que pueda realizar de ellos, asumiendo el usuario
                    cualquier riesgo derivado del uso de la información.
                </Typography>
                <Typography>
                    La plataforma se compromete con ofrecer el mejor servicio posible dentro de las
                    limitaciones técnicas, economómicas y éticas. Sin embargo, en ningún caso se garantiza
                    el servicio y se reserva el derecho a cesar en cualquier momento y sin previo aviso.
                </Typography>
            </Policy>
        </PolicyPage>
    );
}