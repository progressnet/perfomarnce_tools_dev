import {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {paths} from "../routes/paths";
import axios, {endpoints} from "../utils/axios";
import {SplashScreen} from "../components/loading-screen";

export function LoginRedirectHandler() {
  const [error, setError] = useState("")
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const locationSearchEmail = location.search.split('email=')[1];
    if (locationSearchEmail) {
      const handleEmail = async () => {
        try {
          const { data } = await axios.get(`${endpoints.auth.email}?email=${encodeURIComponent(locationSearchEmail)}`);
          if (!data.email) {
            console.error(data.error);
            setError('Error decrypting email');
            return;
          }
          localStorage.setItem('email', data.email);
          navigate(paths.dashboard.root);
        } catch(e) {
          setError(e?.message || 'E: Error decrypting email');
        }


      }
      handleEmail().then(r => r);
    } else {
      // Redirect to login if email is missing
      navigate(paths.auth.sso.signIn);
    }
  }, [location, navigate]);

  if(error) {
    return (
      <Stack spacing={2} alignItems="center" justifyContent="center" sx={{height: '100vh', width: '100%'}}>
        <Card  sx={{padding: 2, display: 'flex', flexDirection: "column", alignItems:"center", rowGap: 1}}>
           <Typography>{error}</Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate(paths.auth.sso.signIn)}>
            Go back to login
          </Button>
        </Card>
      </Stack>
    )
  }
  return <SplashScreen />;
}



export default LoginRedirectHandler;
