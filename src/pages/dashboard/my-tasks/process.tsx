import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import {MyTasksProcessView} from "../../../sections/mytasks/processes";



// ----------------------------------------------------------------------

const metadata = { title: `My Timesheet - ${CONFIG.appName}` };

export default function MyTasksProcess() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <MyTasksProcessView />
    </>
  );
}
