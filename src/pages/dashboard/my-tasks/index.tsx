import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import {MyTasksView} from "../../../sections/mytasks/view";


// ----------------------------------------------------------------------

const metadata = { title: `My Timesheet - ${CONFIG.appName}` };

export default function MyTasks() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <MyTasksView />
    </>
  );
}
