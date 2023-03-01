import Box from '@mui/material/Box'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import * as es from './login_es.json'

export default function LoginWidget() {
    const supabase = useSupabaseClient()

    return (
        <Box sx={{padding: "3rem"}}>
            <Auth
                supabaseClient={supabase}
                appearance={{theme: ThemeSupa}}
                localization={{variables: es}}
                providers={['google']}
                redirectTo={window.location.origin}
            />
        </Box>
    )
}