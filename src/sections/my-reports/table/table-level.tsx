import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { alpha } from "@mui/system";

type LevelProps = {
  level: string | null;
  color: string;
};

export function TableLevel({ level, color }: LevelProps) {
  return (
    <Stack flexDirection="row" alignItems="center" spacing={1}>
      <Typography variant="subtitle2">Current Level:</Typography>
      <Box
        sx={{
          display: 'inline-flex',
          backgroundColor: alpha(color, 0.1),
          border: `1px solid ${alpha(color, 0.2)}`,
          color,
          padding: '2px 8px', // Add padding if you want more space around the text
          borderRadius: 1, // Optional: rounds the box corners slightly
        }}
      >
        <Typography sx={{ fontSize: '12px'}}>{level?.toUpperCase()}</Typography>
      </Box>
    </Stack>
  );
}
