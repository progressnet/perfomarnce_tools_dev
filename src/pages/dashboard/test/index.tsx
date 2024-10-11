
import { CONFIG } from 'src/config-global';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

// ----------------------------------------------------------------------

const metadata = { title: `My Timesheet - ${CONFIG.appName}` };

export default function TestPage() {
  return (
      <Stack>
        <Typography>Test</Typography>
      </Stack>
  );
}
