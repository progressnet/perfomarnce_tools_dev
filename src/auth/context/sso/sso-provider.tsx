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
  const pathname = usePathname();


  useEffect(() => {
     console.log("provider pathname", pathname )
  }, [pathname])




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


