import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from 'react';
import { SSOContext } from "./sso-context";
import type { IUser } from "./sso-context";
import axios, { endpoints } from "../../../utils/axios";
import { paths } from "../../../routes/paths";

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
    const locationSearchEmail = location.search.split('email=')[1];
    const userEmail = localStorage.getItem('email');

    if(locationSearchEmail && !userEmail) {
      fetchEmail(locationSearchEmail ).then(r => r);
      return;
    }
    if(location.pathname !== paths.auth.sso.signIn) {
      console.log('fetch params email', userEmail)
      checkIsAuthenticated(userEmail).then(r => r);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search]);

  const fetchEmail = async (locationSearchEmail: string) => {
    const decryptedEmail = await handleGetAuthEmail(locationSearchEmail);
    if (decryptedEmail.success) {
      setEmail(decryptedEmail.data);
      localStorage.setItem('email', locationSearchEmail);
      setError(null);
      navigate(paths.dashboard.root);
    } else {
      setError(decryptedEmail.error);
    }
  };

  const checkIsAuthenticated = async (storageEmail: string | null) => {
    console.log('checkIsAuthenticated', storageEmail)
    if(storageEmail) {
      const decryptedEmail = await handleGetAuthEmail(storageEmail as string);
      if(decryptedEmail.success) {
        setEmail(decryptedEmail.data);
        setError(null);
      } else {
        setError(decryptedEmail.error);
      }
    } else {
      navigate(paths.auth.sso.signIn);
    }
  }

  const memoizedValue = useMemo(
    () => ({
      user,
      setUser,
      email,
      setEmail,
      error
    }),
    [user, setUser, email, setEmail, error]
  );

  return <SSOContext.Provider value={memoizedValue}>{children}</SSOContext.Provider>;
}

const handleGetAuthEmail = async (encryptedEmail: string) => {
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
