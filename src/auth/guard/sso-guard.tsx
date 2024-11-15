
import { Navigate } from "react-router-dom";

import { paths } from "src/routes/paths";

type Props = {
  children: React.ReactNode;
};

export function SSOGuard({ children }: Props) {
  const email = localStorage.getItem('email');

  if (!email) {
    // Redirect to login if no email in localStorage
    return <Navigate to={paths.auth.sso.signIn} />;
  }

  return children;
}

export default SSOGuard;
