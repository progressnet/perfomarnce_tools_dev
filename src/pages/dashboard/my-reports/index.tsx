
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const metadata = { title: `My Reports - ${CONFIG.appName}` };

export default function MyReports() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <div>reports</div>
    </>
  );
}
