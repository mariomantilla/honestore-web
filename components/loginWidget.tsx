import Box from '@mui/material/Box'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import * as es from './login_es.json'

export default function LoginWidget() {
    const supabase = useSupabaseClient()

    const origin = typeof window !== "undefined" ? window.location.origin : undefined;

    return (
        <Box sx={{padding: "3rem", maxWidth: "400px"}}>
            <Auth
                supabaseClient={supabase}
                appearance={{theme: ThemeSupa}}
                localization={{variables: es}}
                providers={['google']}
                redirectTo={origin}
            />
        </Box>
    )
}