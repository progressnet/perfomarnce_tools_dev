
import {useEffect} from "react";

import {useSSOContext} from "../context/sso/sso-context";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function SSOGuard({ children }: Props) {
  // const { email } = useSSOContext();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // if (isChecking) {
  //   return <SplashScreen />;
  // }

  return <>{children}</>;
}
