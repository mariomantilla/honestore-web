import * as React from 'react';
import { Button, Snackbar } from '@mui/material';
import Link from 'next/link';
import mixpanel from 'mixpanel-browser';
import { useEffect, useState } from 'react';


function CookieBanner() {

  const [open, setOpen] = useState(true);

  const consent = () => {
    // mixpanel.opt_in_tracking();
    setOpen(false);
  };

  useEffect(() => {
    // setOpen(mixpanel.has_opted_out_tracking());
  });

  return (
    <Snackbar
      open={open}
      message={
        <>
          Utilizamos cookies. Informáte en nuestra{" "}
          <Link href="/cookies" style={{textDecoration: "underline"}}>Política de cookies</Link>
        </>
      }
      action={<Button variant='contained' onClick={consent}>Aceptar</Button>}
    />
  );
}

export default CookieBanner;

