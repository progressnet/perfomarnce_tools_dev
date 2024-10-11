import {redirect, useLocation, useNavigate} from "react-router-dom";
import {useMemo, useState, useEffect} from 'react';

import {SSOContext} from "./sso-context";

import type { IUser } from "./sso-context";





type Props = {
  children: React.ReactNode;
};
export function SSOProvider({ children }: Props) {
  const [user, setUser] = useState<IUser | null>(null)
  const [email, setEmail] = useState<string>("")
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate for redirection


  useEffect(() => {
    if(!location.search.includes('email')) return;
    const userEmail = location.search.split('email=')[1];
    setEmail(userEmail)
    localStorage.setItem('email', userEmail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const checkAuthenticated = () => {
    console.log('test')
    const storageEmail = localStorage.getItem('email');
    console.log({storageEmail})
    if (!storageEmail) {
      navigate("/auth/sso/sign-in");
    }
  }
  const memoizedValue = useMemo(
    () => ({
      user,
      setUser,
      email,
      setEmail,
    }),
    [user, setUser]
  );
  return <SSOContext.Provider value={memoizedValue}>{children}</SSOContext.Provider>;
}


