import { useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import { SSOContext } from "./sso-context";
import {paths} from "../../../routes/paths";
import axios, { endpoints } from "../../../utils/axios";

import type { IUser } from "./sso-context";

type Props = {
  children: React.ReactNode;
};

export function SSOProvider({ children }: Props) {
  // state:
  const [user, setUser] = useState<IUser | null>(null);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // New state for errors

  // hooks:
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate for redirection



  useEffect(() => {

    const handleUserLogin = async () => {
      console.log('location email: ', location.search.split('email=')[1])
      console.log('storage email: ', localStorage.getItem("email"))
      const locationSearchEmail = location.search.split('email=')[1] || localStorage.getItem("email");

      if(!locationSearchEmail) {
        navigate(paths.auth.sso.signIn)
        return;
      }
      // Fetch email from query if not present in local storage
      if (locationSearchEmail) {
        const res = await handleGetAuthEmail(locationSearchEmail)
        if(!res.success) {
          setError("Error fetching email");
        }
        if(res.success) {
          localStorage.setItem("email",locationSearchEmail)
          setEmail(res.data);
          navigate(paths.dashboard.root)
        }
      }
    }
      handleUserLogin().then(r => r)
  }, [location.search, navigate]);


  const memoizedValue = useMemo(
    () => ({
      user,
      setUser,
      email,
      setEmail,
      error,
      setError,
    }),
    [user, setUser, email, setEmail, error]
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
