import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import {MyTasksSubProcessView} from "../../../sections/mytasks/subProcesses";



// ----------------------------------------------------------------------

const metadata = { title: `My Timesheet - ${CONFIG.appName}` };

export default function MyTasksSubProcess() {

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <MyTasksSubProcessView />
    </>
  );
}
