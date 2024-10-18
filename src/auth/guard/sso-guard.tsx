
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {paths} from "../../routes/paths";
import {useSSOContext} from "../context/sso/sso-context";
import {handleGetAuthEmail} from "../context/sso/sso-provider";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function SSOGuard({ children }: Props) {
  const { email, setEmail, setError} = useSSOContext();


  const navigate = useNavigate();


  useEffect(() => {
    console.log('email in SSO GUARD: ', {email})
    // first time login:
    const storageEmail = localStorage.getItem("email");
    if(email) {
      localStorage.setItem("email", email)
    }
    console.log({storageEmail})
    if(!storageEmail) {

      const checkAuthenticated = async () => {

        if(!storageEmail ) {
          navigate(paths.auth.sso.signIn)
          return;
        }

        const res = await handleGetAuthEmail(storageEmail as string)
        if(!res.success) {
          setError("Error fetching email");
        }
        if(res.success) {
          setEmail(res.data);
        }
      }
      checkAuthenticated().then(r=> r)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, navigate]);


  // if (isChecking) {
  //   return <SplashScreen />;
  // }

  return <>{children}</>;
}


