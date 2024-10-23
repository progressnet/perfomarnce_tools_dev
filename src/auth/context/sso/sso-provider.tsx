import { useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import {setEmailSession} from "../jwt";
import { SSOContext } from "./sso-context";
import {paths} from "../../../routes/paths";
import axios, { endpoints } from "../../../utils/axios";

import type { IUser } from "./sso-context";
import {usePathname} from "../../../routes/hooks";

type Props = {
  children: React.ReactNode;
};

export function SSOProvider({ children }: Props) {
  // state:
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  // hooks:
  const location = useLocation();
  const pathname = usePathname();
  const navigate = useNavigate(); // Use useNavigate for redirection



  useEffect(() => {
    const handleUserLogin = async () => {
      console.log({pathname})
      if(pathname !== "/FinanceFactoryTimesheet") return;
      const locationSearchEmail = location.search.split('email=')[1] ;
      console.log({locationSearchEmail})
      if(!locationSearchEmail) {
        navigate(paths.auth.sso.signIn)
        return;
      }
        const res = await handleGetAuthEmail(locationSearchEmail)
      console.log({res})
        if(!res.success) {
          setError("Error fetching email");
        }
        if(res.success) {
          // setEmail(res.data)
          localStorage.setItem("email",locationSearchEmail)
          navigate(paths.dashboard.root)
        }
      }
      handleUserLogin().then(r => r)
  }, [location.search, navigate, pathname]);


  const memoizedValue = useMemo(
    () => ({
      email,
      setEmail,
      error,
      setError,
    }),
    [ email, setEmail, error]
  );

  return <SSOContext.Provider value={memoizedValue}>{children}</SSOContext.Provider>;
}

export const handleGetAuthEmail = async (encryptedEmail: string) => {
  try {
    const { data } = await axios.get(`${endpoints.auth.email}?email=${encodeURIComponent(encryptedEmail)}`);
    return {
      success: true,
      data: data.email || "",
    };
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
};
