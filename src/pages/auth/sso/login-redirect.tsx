import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import {LoginRedirectHandler} from "../../../auth/LoginRedirectHandler";


// ----------------------------------------------------------------------

const metadata = { title: `Sign in - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <LoginRedirectHandler />
    </>
  );
}
