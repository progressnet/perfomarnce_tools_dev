import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import {MyTasksEntitiesView} from "../../../sections/mytasks/entities";



// ----------------------------------------------------------------------

const metadata = { title: `My Timesheet - ${CONFIG.appName}` };

export default function MyTasksEntities() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <MyTasksEntitiesView />
    </>
  );
}
