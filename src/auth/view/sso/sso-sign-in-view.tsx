import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";


export function SSOSignInView() {

  const href = import.meta.env.VITE_SERVER_MODE === 'development'
    ? import.meta.env.VITE_SERVER_SSO_LOGIN_DEV
    : import.meta.env.VITE_SERVER_SSO_LOGIN_PROD;

  if(import.meta.env.VITE_SERVER_MODE === 'development') {
    return (
        <Link
          sx={{
            display: 'block',
            mt: 3,
            textAlign: 'center',
            backgroundColor: 'primary.dark',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            textDecoration: 'none',
            '&:hover': {
              backgroundColor: 'black',
              color: 'white',
            },
          }}
          href={href}>Sign in</Link>
    );
  }
  if(import.meta.env.VITE_SERVER_MODE !== 'development') {
    return (
      <Stack sx={{height: '100vh'}}>
        <iframe
          src={import.meta.env.VITE_SERVER_SSO_LOGIN_PROD}
          style={{height: '100%', width: '100%', border: 'none'}}
          title="Web View"
        />
      </Stack>
    )
  }

}
