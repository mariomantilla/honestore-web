import { createTheme } from "@mui/material/styles";
import { Open_Sans } from "@next/font/google";

export const BASE_URL: string = 'https://honestore.app';

const openSans = Open_Sans({ subsets: ['latin'] })

export const theme = createTheme({
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
    }
});