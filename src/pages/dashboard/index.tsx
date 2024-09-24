import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import {redirect} from "react-router-dom";
// ----------------------------------------------------------------------

const metadata = { title: `Dashboard - ${CONFIG.appName}` };

export default function OverviewAppPage() {
  redirect("/dashboard/pages/cal");
  // return (
  //   <>
  //     <Helmet>
  //       <title> {metadata.title}</title>
  //     </Helmet>
  //
  //   </>
  // );
}
