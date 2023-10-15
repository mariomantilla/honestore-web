export const socialInfoData = {
    instagram: {
        label: "Usuario de Instagram",
        pattern: /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.)){0,28}(?:[A-Za-z0-9_]))?)?$/,
        helper: "Sin @"
    },
    address: {
        label: "Dirección física",
        pattern: /.*/,
        helper: "Para facilitar que te encuentren"
    },
    web: {
        label: "Web",
        pattern: /^((https?):\/\/)(www.)?([a-z0-9\-]+(.?))+\.[a-z]+(\/[a-zA-Z0-9#]*\/?)*$/,
        helper: ""
    },
    email: {
        label: "Email de contacto",
        pattern: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
        helper: ""
    },
    phone: {
        label: "Telefono de contacto",
        pattern: /^\+?[0-9]{4,20}$/,
        helper: ""
    },
    whatsapp: {
        label: "Whatsapp",
        pattern: /^(\+[0-9]{4,20})?$/,
        helper: "Incluye la extensión para que funcione correctamente"
    }
}