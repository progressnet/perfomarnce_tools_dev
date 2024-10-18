import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import {SSOSignInView} from "../../../auth/view/sso";

// ----------------------------------------------------------------------

const metadata = { title: `Sign in - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <SSOSignInView />
    </>
  );
}
