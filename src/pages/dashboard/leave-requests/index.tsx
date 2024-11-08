
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const metadata = { title: `Leave Requests - ${CONFIG.appName}` };

export default function LeaveRequests() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <div>Leave Requests</div>
    </>
  );
}
