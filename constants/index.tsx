import { createTheme, SxProps } from "@mui/material/styles";
import { esES } from '@mui/material/locale';
import { Open_Sans } from "next/font/google";

export const BASE_URL: string = process.env.NEXT_PUBLIC_BASE_URL??'';

const openSans = Open_Sans({ subsets: ['latin'] })

export const imageKitAuthenticationEndpoint = BASE_URL + '/api/imageKitAuth';

export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 700,
            md: 900,
            lg: 1200,
            xl: 1536,
          },
    },
    typography: {
        fontFamily: [
            openSans.style.fontFamily,
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        h1: {
            fontSize: 48,
            textAlign: "center",
        },
        h2: {
            fontSize: 32,
            textAlign: "center",
            marginBottom: "1em",
        },
        h3: {
            fontSize: 24,
        },
        h4: {
            fontSize: 16,
            lineHeight: 1.5,
            fontWeight: 500,
        },
        subtitle1: {
            color: "#444",
            fontWeight: 400,
            lineHeight: 1.7
        }
    },
    palette: {
        primary: {
            main: "#FB7168",
            contrastText: "#FFFFFF"
        },
        secondary: {
            main: "#521E1E",
            // contrastText: "#FFFFFF"
        },
        info: {
            main: "#521E1E"
        }
    }
}, esES);


export const buttonStyles: SxProps = {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark
    },
    color: "#fff"
}