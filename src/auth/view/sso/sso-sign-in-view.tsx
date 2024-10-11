import Link from "@mui/material/Link";


export function SSOSignInView() {

  const href = import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_SERVER_SSO_LOGIN_DEV
    : import.meta.env.SSO_LOGIN_PROD;

  return (
        <Link
          sx={{
            display: 'block',
            mt: 3,
            textAlign: 'center',
            backgroundColor: 'black',
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
