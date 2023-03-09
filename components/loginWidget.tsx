import Box from '@mui/material/Box'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa, ViewType } from '@supabase/auth-ui-shared'
import { theme } from '../constants'
import * as es from './login_es.json'

ThemeSupa.honestore = {
    colors: {
        brand: theme.palette.primary.main,
        brandAccent: theme.palette.primary.dark,
    },
    fonts: {
        bodyFontFamily: theme.typography.fontFamily,
        buttonFontFamily: theme.typography.fontFamily,
        inputFontFamily: theme.typography.fontFamily,
        labelFontFamily: theme.typography.fontFamily,
    },
};

export default function LoginWidget({ view }: { view?: ViewType }) {
    const supabase = useSupabaseClient()

    const origin = typeof window !== "undefined" ? window.location.origin : undefined;

    return (
        <Box sx={{ padding: "3rem", maxWidth: "400px" }}>
            <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                theme="honestore"
                localization={{ variables: es }}
                providers={['google']}
                redirectTo={origin}
                view={view}
            />
        </Box>
    )
}