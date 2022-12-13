import Typography from "@mui/material/Typography";
import Policy from "../components/policyItem";
import PolicyPage from "../components/policyPage";


export default function PrivacyPage() {
    return (
        <PolicyPage title="Política de Privacidad" desc="Tu privacidad es importante para nosotros. En esta página te contamos qué datos recopilamos, que hacemos con ellos y cúales son tus derechos al respecto.">
            <Policy title="Ámbito" id="scope">
                <Typography>
                    Esta Política de Privacidad describe el procesamiento de la información enviada o recolectada
                    a travás del sitio web Honestore.app y la applicación móvil asociada (en la cual se incluye
                    un enlace a esta política). También describe el tratamiento de la información personal recogida
                    offline o a través plataformas de terceros (como formularios de feedback o contacto).
                </Typography>
                <Typography>
                    Esta política solo afecta a los data de carácter <b>personal</b>. Entendemos por información personal aquella
                    información que identifica directa o indirectamente a una persona individual (no incluye información sobre tiendas
                    o negocios), como el nombre/apellidos, dirección postal, email o número de teléfono. También toda información
                    asociada a estos datos personales.
                </Typography>
                <Typography>
                    Por favor ten en cuenta que cuando nos envías información a través de un sitios o plataformas de terceros
                    (por ejemplo un formulario en una página externa, la información puede ser recolectada por el sitio también.
                    La informacion que recogemos nosotros esta cubierta por esta política, y la que recoge el sitio del tercero
                    queda sujeta a las políticas de privacidad de dicho sitio.
                </Typography><Typography>
                    Por favor considera tambíen que nuestro sitio y app pueden contener links a sitios externos fuera de nuestro
                    control y de cuyas políticas de privacidad no somos resonsables. Te recomendamos que prestes atención cuando
                    abandonas este sitio o la app y que leas las políticas de privacidad the otros sitios que puedan estar
                    recopilando información personal
                </Typography><Typography>
                    Ten en cuenta que los datos a los que se refiere esta política en todo caso serán tratados de conformidad con
                    lo dispuesto en las normativas vigentes en protección de datos personales, el Reglamento (UE) 2016/679 de 27
                    de abril de 2016 (RGPD) y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y
                    garantía de los derechos digitales.
                </Typography>
            </Policy>
            <Policy title="¿Qué información recogemos?" id="collectedInfo">
                <Typography>
                    La información que recogemos se receive a través de vías diferentes:
                </Typography>
                <b>Sitio web honestore.app</b>
                <ul>
                    <li>
                        Actualmente no recogemos ningún dato de carácter personal a través
                        del sitio web. Además, No utilizamos cookies de ningún tipo.
                    </li>
                </ul>
                <b>Applicación móvil Honestore</b>
                <ul>
                    <li>Información de registro cuando creas una cuenta en Honestore como tu email y contraseña</li>
                    <li>
                        Localización geográfica, incluyendo localización precisa o aproximada recibida
                        los dispositivos móviles que usan la applicación, o asociada a tu dirección IP
                    </li>
                </ul>

                <b>Formularios en plataformas de terceros (Google Forms)</b>
                <ul>
                    <li>
                        Información de contacto como email y nombre de propietarios de
                        tiendas que quieren incluir información sobre éstas en la applicación
                    </li>
                    <li>
                        Información de contacto como email y nombre de ususatios de la app que quieren
                        informar de alguna indicencia con la applicacion o proporcionar algún tipo de comentario
                    </li>
                </ul>
                <Typography>
                    Por favor consulta la <a href="https://policies.google.com/privacy" rel="noreferrer" target="_blank">pólitca de privacidad</a> de Google Forms para más información.
                </Typography>
            </Policy>
            <Policy title="¿Cómo recogemos la información?" id="how">
                <Typography>
                    La información se recoge a traves de
                </Typography>
                <ul>
                    <li>Formularios dentro de la applicación (cuando te registras en la app)</li>
                    <li>
                        Servicios de terceros a los que autorizas a enviarnos la información
                        (cuando te registras usando Google)
                    </li>
                    <li>
                        Servicios de localización de tu dispositivo movil, si así lo autorizas
                        (cuando buscas tiendas cercanas usando la localización)
                    </li>
                    <li>Servicios de terceros a los que tu envías la información (formularios de contacto)</li>
                </ul>
                <Typography>
                    En todos los casos, nos das el consentimiento expreso para usar esos datos para
                    los fines específicos que se detallan acorde con el artículo 6 del RGPD.
                </Typography>
            </Policy>
            <Policy title="¿Para qué usamos tus datos?" id="forWhat">
                <Typography>
                    Usamos tus datos para
                </Typography>
                <ul>
                    <li>Identificarte en la applicación y ofrerte funciones personalizadas como guardar en favoritos</li>
                    <li>Proporcionarte resultados cercanos a ti (usando tus datos de ubicación)</li>
                    <li>Contactar contigo para solicitar más información sobre fallos o comentarios recibidos enviados por ti</li>
                    <li>
                        Identificate como propietario de una tienda (a través de tu email) para poder
                        hacer cambios en los datos asociados a ella y comunicarnos contigo en relación a ella
                    </li>
                </ul>
                <Typography>
                    Toda la información personal que recolectamos y/o almacenamos sigue el principio
                    de recoger solo los datos necesarios y por el tiempo necesario.
                    Por ejemplo, no guardamos datos de localización una vez que ya se han obtenido
                    los resultados de búsqueda, salvo por logs internos que son eliminados al cabo de unos días.
                    Esta información <b>en ningún caso</b> es compartida con terceros.
                </Typography>
            </Policy>
            <Policy title="Derechos y decisiones" id="rights">
                <Typography>
                    En relación con los datos personales que recogemos, te ofrecemos las siguientes
                    herramientas para controlar cúando y qué datos compartes:
                </Typography>
                <ul>
                    <li>
                        No dar permiso a la applicación para usar tu ubicación, siempre puedes
                        revorcarlo en cualquier momento para dejar de enviar tu ubicación.
                        Ubicaciones anteriores no son guardadas.
                    </li>
                    <li>
                        Eliminar cuenta, dentro de la app tienes la opción de elimiar tu cuenta y sus datos asociados
                    </li>
                </ul>
                <Typography>
                    Además, de acuerdo con el RGPD se considera interesado a la persona cuyos datos personales se
                    procesan, motivo por el cual puede beneficiarse de los derechos reconocidos por esta directiva
                    fundamental sobre protección de datos, que son: el derecho a la información (art. 15), de
                    rectificación (art. 16), de supresión (art. 17), a la limitación del tratamiento (art. 18),
                    de oposición (art. 21), a presentarunareclamación ante unaautoridad de control (art. 77) y
                    a la portabilidad (art. 20). Pare ejercitarlos, por favor contacte con nosotros siguiendo los
                    datos de contacto de la sección <a href="#contactData">Datos de contacto</a>.
                </Typography>
            </Policy>
            <Policy title="Seguridad de los datos" id="security">
                <Typography>
                    Los datos que nos envías a través de la aplicación estan almacenas en Europa y no se transfieren en ningún
                    caso a terceros países. Tomamos las medidas estandar de seguridad para garantizar la privacidad de tu
                    información personal.
                </Typography>
                <Typography>
                    Ten en cuenta que los datos enviados a través de Google Forms se almacenan según se describe en su política de privacidad.
                </Typography>
            </Policy>
            <Policy title="Cambios en esta política" id="changes">
                <Typography>
                    De vez en cuando, es posible que modifiquemos esta política de privacidad para adecuarla
                    a nuevas technologías, practicas industriales, regulaciones, nuevas funcionalidades, etc.
                    Te informaremos de dichos cambios en caso de haberlos y si la ley lo requiere te pediremos
                    tu consentimiento. Dicha notification será podrá ser por email a la dirección que nos hayas
                    proporcionado o publicando una nota sobre dichos cambios en este sitio y en la applicación.
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