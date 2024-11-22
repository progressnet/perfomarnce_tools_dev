import { useMemo, useState, useEffect } from 'react';

import { SSOContext } from "./sso-context";
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


