import * as React from 'react';
import { Button, Drawer, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import Close from '@mui/icons-material/Close';
import mixpanel from 'mixpanel-browser';
import { useEffect, useState } from 'react';


function CookieBanner() {

  const [open, setOpen] = useState(false);

  const consent = () => {
    mixpanel.opt_in_tracking();
    setOpen(false);
  };

  const dismiss = () => {
    mixpanel.opt_out_tracking();
    localStorage.setItem('disableAnalytics', "1")
    setOpen(false);
  };

  useEffect(() => {
    setOpen(!mixpanel.has_opted_in_tracking() && !localStorage.getItem('disableAnalytics'));
  }, []);

  return (
    <Drawer
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            justifyContent: "center",
            display: 'flex',
            padding: "40px"
          },
        }}
        open={open}
        anchor="bottom"
    >
      <Typography>
      <IconButton sx={{float: "right", marginTop: -3}} onClick={dismiss}><Close /></IconButton>
      ¡Hola! 😊 Sabemos que la privacidad es importante, por eso queremos ser transparentes contigo.
      Utilizamos tecnologías para mejorar tu experiencia en nuestro sitio web y ofrecerte contenido
      adaptado a tus preferencias. Si estás de acuerdo, simplemente haz clic en &quot;Aceptar&quot; y comenzaremos.
      ¡Gracias por visitarnos y por confiar en nosotros! 🌟🔒<br />
      Ver la <Link href="/cookies" style={{textDecoration: "underline"}}>Política de cookies</Link> para saber más o gestionar tu consentimiento<br />
      </Typography>
      <Button variant='contained' sx={{marginTop: "2rem", alignSelf: "center"}} onClick={consent}>Aceptar</Button>
    </Drawer>
  );
}

export default CookieBanner;

