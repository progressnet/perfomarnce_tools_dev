//
// import {useEffect} from "react";
// import {useNavigate} from "react-router-dom";
//
// import {paths} from "../../routes/paths";
// import {useSSOContext} from "../context/sso/sso-context";
// import {handleGetAuthEmail} from "../context/sso/sso-provider";
//
// // ----------------------------------------------------------------------
//
// type Props = {
//   children: React.ReactNode;
// };
//
// export function SSOGuard({ children }: Props) {
//   const {setEmail, email} = useSSOContext();
//   const navigate = useNavigate();
//   const storageEmail = localStorage.getItem("email");
//
//   useEffect(() => {
//     if(!storageEmail ) {
//       navigate(paths.auth.sso.signIn)
//     }
//     if(storageEmail && !email) {
//       const handleEmail = async () => {
//         const res = await handleGetAuthEmail(storageEmail)
//         if(res.success) {
//           setEmail(res.data)
//         }
//       }
//       handleEmail().then(r => r)
//
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [storageEmail, navigate]);
//
//
//   return <>{children}</>;
// }
//

import { Navigate } from "react-router-dom";

import { paths } from "src/routes/paths";

type Props = {
  children: React.ReactNode;
};

export function SSOGuard({ children }: Props) {
  const email = localStorage.getItem('email');

  console.log({email})
  if (!email) {
    // Redirect to login if no email in localStorage
    return <Navigate to={paths.auth.sso.signIn} />;
  }

  return children;
}

export default SSOGuard;
