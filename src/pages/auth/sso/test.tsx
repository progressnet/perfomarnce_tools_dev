import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import Stack from "@mui/material/Stack";


// ----------------------------------------------------------------------

const metadata = { title: `Sign in - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <Stack>test</Stack>
    </>
  );
}
