import Box from '@mui/material/Box'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa, ViewType } from '@supabase/auth-ui-shared'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BASE_URL, theme } from '../constants'
import { supabase } from '../lib/supabaseClient'
import * as es from './login_es.json'
import Center from './center'

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
    
    const router = useRouter();
    const [origin, setOrigin] = useState<string | undefined>(undefined);

    useEffect(() => {
        setOrigin(BASE_URL + router.asPath);
    }, [router.asPath]);

    return (
        <Box sx={{ padding: "1rem", maxWidth: "400px" }}>
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