
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import {MySummaryView} from "../../../sections/my-reports";

// ----------------------------------------------------------------------

const metadata = { title: `My Reports - ${CONFIG.appName}` };

export default function MyReports() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <MySummaryView />
    </>
  );
}
