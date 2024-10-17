
import {useEffect} from "react";

import {useSSOContext} from "../context/sso/sso-context";
import axios from "../../utils/axios";
import {paths} from "../../routes/paths";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function SSOGuard({ children }: Props) {
  const { email } = useSSOContext();




  // if (isChecking) {
  //   return <SplashScreen />;
  // }

  return <>{children}</>;
}


