
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {useSSOContext} from "../context/sso/sso-context";
import {handleGetAuthEmail} from "../context/sso/sso-provider";
import {paths} from "../../routes/paths";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function SSOGuard({ children }: Props) {
  const { email, setEmail, error, setError, } = useSSOContext();

  const navigate = useNavigate();


  useEffect(() => {
    // first time login:
    const storageEmail = localStorage.getItem("email");
    if(email && !storageEmail) {
      localStorage.setItem("email", email)
    }

    if(!email && !storageEmail) {
      const checkAuthenticated = async () => {
        const localStorageEmail =  localStorage.getItem("email")
        if(!localStorageEmail) {
          navigate(paths.auth.sso.signIn)
          return;
        }

        const res = await handleGetAuthEmail(localStorageEmail as string)
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


